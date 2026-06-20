#!/usr/bin/env python3
"""
Split src/data/flags.js into 6 category-based files plus an index.js.

Category mapping (actual → target file):
  identity:   trauma, identity, psychological, formative, behavior, childhood,
              resilience, adversity, moral, experience, spiritual, spirituality,
              faith, reflection, values, survival, rights, opportunity
  geographic: displacement, migration, immigration, place, urban, environment,
              environmental, conflict, world_event, history, disaster, climate
  economic:   economic, economics, labor, labour, career, occupation, financial,
              education, technology, arc
  health:     health, loss, grief, death
  relationships: relationship, relationships, family, community, social, gender,
                 discrimination
  political:  political, historical, military, persecution, religion, cultural,
              legal, criminal_justice, legacy
"""

import re
import os

INPUT = '/home/user/natalis/src/data/flags.js'
OUT_DIR = '/home/user/natalis/src/data/flags'

# Map from actual category values → target file key
CATEGORY_MAP = {
    # identity.js
    'trauma': 'identity',
    'identity': 'identity',
    'psychological': 'identity',
    'formative': 'identity',
    'behavior': 'identity',
    'childhood': 'identity',
    'resilience': 'identity',
    'adversity': 'identity',
    'moral': 'identity',
    'experience': 'identity',
    'spiritual': 'identity',
    'spirituality': 'identity',
    'faith': 'identity',
    'reflection': 'identity',
    'values': 'identity',
    'survival': 'identity',
    'rights': 'identity',
    'opportunity': 'identity',

    # geographic.js
    'displacement': 'geographic',
    'migration': 'geographic',
    'immigration': 'geographic',
    'place': 'geographic',
    'urban': 'geographic',
    'environment': 'geographic',
    'environmental': 'geographic',
    'conflict': 'geographic',
    'world_event': 'geographic',
    'history': 'geographic',
    'disaster': 'geographic',
    'climate': 'geographic',

    # economic.js
    'economic': 'economic',
    'economics': 'economic',
    'labor': 'economic',
    'labour': 'economic',
    'career': 'economic',
    'occupation': 'economic',
    'financial': 'economic',
    'education': 'economic',
    'technology': 'economic',
    'arc': 'economic',

    # health.js
    'health': 'health',
    'loss': 'health',
    'grief': 'health',
    'death': 'health',

    # relationships.js
    'relationship': 'relationships',
    'relationships': 'relationships',
    'family': 'relationships',
    'community': 'relationships',
    'social': 'relationships',
    'gender': 'relationships',
    'discrimination': 'relationships',

    # political.js
    'political': 'political',
    'historical': 'political',
    'military': 'political',
    'persecution': 'political',
    'religion': 'political',
    'cultural': 'political',
    'legal': 'political',
    'criminal_justice': 'political',
    'legacy': 'political',
    'achievement': 'political',  # achievements tend to be socio-political milestones
}

FILE_NAMES = {
    'identity': 'identity.js',
    'geographic': 'geographic.js',
    'economic': 'economic.js',
    'health': 'health.js',
    'relationships': 'relationships.js',
    'political': 'political.js',
}

EXPORT_NAMES = {
    'identity': 'IDENTITY_FLAGS',
    'geographic': 'GEOGRAPHIC_FLAGS',
    'economic': 'ECONOMIC_FLAGS',
    'health': 'HEALTH_FLAGS',
    'relationships': 'RELATIONSHIP_FLAGS',
    'political': 'POLITICAL_FLAGS',
}


def find_matching_brace(text, start):
    """
    Given text[start] == '{', find the index of the matching '}'.
    Handles strings (single/double quoted), single-line comments.
    Returns index of char AFTER the closing brace.
    """
    assert text[start] == '{', f"Expected '{{' at position {start}, got {text[start]!r}"
    depth = 1
    i = start + 1
    n = len(text)
    while i < n and depth > 0:
        c = text[i]
        if c == '{':
            depth += 1
            i += 1
        elif c == '}':
            depth -= 1
            i += 1
        elif c == '/' and i + 1 < n and text[i+1] == '/':
            # single-line comment: skip to newline
            end = text.find('\n', i)
            i = end + 1 if end != -1 else n
        elif c in ('"', "'", '`'):
            # string literal: skip to matching quote
            quote = c
            i += 1
            while i < n:
                if text[i] == '\\':
                    i += 2  # escape sequence
                elif text[i] == quote:
                    i += 1
                    break
                else:
                    i += 1
        else:
            i += 1
    return i  # position after the closing '}'


def parse_flags(content):
    """
    Parse the FLAG_REGISTRY object from flags.js.
    Returns a list of (flag_name, flag_body_text, target_file) in order.

    Handles both bare identifier keys (foo_bar:) and quoted keys ('1971_war_lived':).
    """
    # Find start of FLAG_REGISTRY
    start_match = re.search(r'export const FLAG_REGISTRY = \{', content)
    if not start_match:
        raise ValueError("Could not find FLAG_REGISTRY in file")

    # The opening brace of FLAG_REGISTRY
    brace_start = content.index('{', start_match.start())
    # The content inside FLAG_REGISTRY ends where the outer brace closes
    # We'll work on the slice from after the opening brace
    inner_start = brace_start + 1

    flags = []
    unknown_categories = set()

    i = inner_start
    n = len(content)

    # Key patterns:
    # 1. Bare identifier:   foo_bar: {
    # 2. Quoted identifier: 'foo': {  or "foo": {
    KEY_PATTERN = re.compile(
        r"""(?x)
        \s*                          # leading whitespace
        (?:
            '([^']+)'                # group 1: single-quoted key
            |
            "([^"]+)"                # group 2: double-quoted key
            |
            ([a-zA-Z_][a-zA-Z0-9_]*)  # group 3: bare identifier
        )
        \s*:\s*\{                    # followed by colon and opening brace
        """
    )

    while i < n:
        # Skip single-line comments
        if content[i] == '/' and i + 1 < n and content[i+1] == '/':
            end = content.find('\n', i)
            if end == -1:
                break
            i = end + 1
            continue

        # Skip whitespace
        if content[i] in ' \t\n\r':
            i += 1
            continue

        # Check for end of FLAG_REGISTRY (closing brace at top level)
        if content[i] == '}':
            break

        # Try to match a key
        m = KEY_PATTERN.match(content, i)
        if not m:
            i += 1
            continue

        # Determine the flag name
        flag_name = m.group(1) or m.group(2) or m.group(3)

        # The opening brace for this flag's value is at m.end() - 1
        brace_pos = m.end() - 1
        assert content[brace_pos] == '{', f"Expected '{{' at {brace_pos} for flag {flag_name!r}"

        # Find the matching closing brace
        end_pos = find_matching_brace(content, brace_pos)
        flag_body = content[brace_pos:end_pos]

        # Extract category from flag_body
        cat_match = re.search(r"category:\s*'([^']+)'", flag_body)
        if not cat_match:
            category_val = 'identity'  # fallback
        else:
            category_val = cat_match.group(1)

        target_file = CATEGORY_MAP.get(category_val)
        if target_file is None:
            unknown_categories.add(category_val)
            target_file = 'identity'  # fallback

        # Determine if the key needs quoting in output
        if re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', flag_name):
            key_repr = flag_name
        else:
            key_repr = f"'{flag_name}'"

        flags.append((key_repr, flag_body, target_file, category_val))

        # Advance past this entry
        # Skip optional trailing comma
        i = end_pos
        while i < n and content[i] in ' \t\r\n,':
            i += 1

    if unknown_categories:
        print(f"WARNING: Unknown categories (mapped to identity): {sorted(unknown_categories)}")

    return flags


def main():
    with open(INPUT, 'r', encoding='utf-8') as f:
        content = f.read()

    flags = parse_flags(content)
    print(f"Parsed {len(flags)} flags total")

    # Group by target file
    groups = {k: [] for k in FILE_NAMES}
    for key_repr, flag_body, target_file, cat_val in flags:
        groups[target_file].append((key_repr, flag_body, cat_val))

    for k, v in groups.items():
        print(f"  {FILE_NAMES[k]}: {len(v)} flags")

    # Create output directory
    os.makedirs(OUT_DIR, exist_ok=True)

    # Write each category file
    for file_key, flag_list in groups.items():
        export_name = EXPORT_NAMES[file_key]
        filename = os.path.join(OUT_DIR, FILE_NAMES[file_key])

        lines = []
        lines.append('/**')
        lines.append(f' * {export_name} — {file_key} flags for the natalis flag system.')
        lines.append(' * Auto-split from src/data/flags.js by scripts/split_flags.py')
        lines.append(' */')
        lines.append(f'export const {export_name} = {{')
        lines.append('')

        for key_repr, flag_body, cat_val in flag_list:
            lines.append(f'  {key_repr}: {flag_body},')
            lines.append('')

        lines.append('}')
        lines.append('')

        with open(filename, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))

        print(f"Wrote {filename} ({len(flag_list)} flags)")

    # Write index.js
    index_path = os.path.join(OUT_DIR, 'index.js')
    index_content = '''\
/**
 * src/data/flags/index.js
 *
 * Re-exports all category flag registries as a unified FLAG_REGISTRY.
 * Import FLAG_REGISTRY from this file instead of src/data/flags.js.
 *
 * Category files:
 *   identity.js      — trauma, identity, resilience, adversity, moral, experience,
 *                      psychological, formative, spiritual, faith, behavior, values, etc.
 *   geographic.js    — displacement, migration, conflict, world_event, place, climate, etc.
 *   economic.js      — economic, labor, career, education, technology, occupation, etc.
 *   health.js        — health, loss, grief, death
 *   relationships.js — relationship, family, community, social, gender, discrimination
 *   political.js     — political, historical, military, cultural, legal, religion,
 *                      persecution, achievement, criminal_justice, legacy
 */

import { IDENTITY_FLAGS } from './identity.js'
import { GEOGRAPHIC_FLAGS } from './geographic.js'
import { ECONOMIC_FLAGS } from './economic.js'
import { HEALTH_FLAGS } from './health.js'
import { RELATIONSHIP_FLAGS } from './relationships.js'
import { POLITICAL_FLAGS } from './political.js'

export const FLAG_REGISTRY = {
  ...IDENTITY_FLAGS,
  ...GEOGRAPHIC_FLAGS,
  ...ECONOMIC_FLAGS,
  ...HEALTH_FLAGS,
  ...RELATIONSHIP_FLAGS,
  ...POLITICAL_FLAGS,
}

export {
  IDENTITY_FLAGS,
  GEOGRAPHIC_FLAGS,
  ECONOMIC_FLAGS,
  HEALTH_FLAGS,
  RELATIONSHIP_FLAGS,
  POLITICAL_FLAGS,
}
'''
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)

    print(f"Wrote {index_path}")
    print("Done!")


if __name__ == '__main__':
    main()
