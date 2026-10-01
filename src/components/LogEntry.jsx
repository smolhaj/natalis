import { useState } from 'react'

// One log entry, rendered the same way wherever the life is read back: the
// Recent view, the Timeline, Search, and "Read this life" on the death screen.
// There were three hand-copied versions of this markup in LifeScreen and they
// had drifted — the world-event context note, which tick.js stores on every
// world entry, was shown in none of them.

/**
 * In Witness mode the character answers the questions, so a log line that
 * ends "What matters most, entering this?" is a question put to nobody. The
 * question is dropped and the answer stands; if the event was nothing but the
 * question ("Which trade will you train in?"), the outcome is the entry.
 */
export function readableEntryText(entry, passive) {
  const text = String(entry?.text ?? '')
  if (!passive || !entry?.isChoice || !entry?.outcome) return text
  const sentences = text.match(/[^.!?…]+[.!?…]+["'”’)]*\s*|[^.!?…]+$/g) ?? [text]
  while (sentences.length && /\?["'”’)]*\s*$/.test(sentences[sentences.length - 1])) sentences.pop()
  return sentences.join('').trim()
}

function ContextToggle({ context }) {
  const [open, setOpen] = useState(false)
  if (!context) return null
  return (
    <span className="block mt-1.5">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-natalis-accent uppercase tracking-[0.12em] hover:underline"
      >
        <span aria-hidden="true" className="text-[9px]">{open ? '▾' : '▸'}</span>
        What was happening
      </button>
      {open && (
        <span className="block mt-1.5 pl-3 border-l border-natalis-rule font-prose text-natalis-dim text-sm leading-relaxed">
          {context}
        </span>
      )}
    </span>
  )
}

const CARD_TONE = (e) =>
  e.isDeath      ? 'bg-zinc-900 border-zinc-800 text-zinc-100' :
  e.isHeadline   ? 'bg-stone-100 border-stone-300 text-stone-700' :
  e.isSoundtrack ? 'bg-violet-50 border-violet-200 text-violet-900' :
  e.isWorld      ? 'bg-natalis-surface border-natalis-rule text-natalis-dim' :
  e.isLetter     ? 'bg-amber-50 border-amber-300 text-stone-800' :
  e.isKey        ? 'bg-natalis-surface border-natalis-border border-l-2 border-l-natalis-text text-natalis-text' :
  'bg-white border-natalis-border text-natalis-dim'

/**
 * @param {object} props
 * @param {object} props.entry      a log entry
 * @param {number} props.birthYear  for entries that predate `year` stamping
 * @param {boolean} props.passive   Witness mode: questions are not shown as questions
 * @param {'card'|'row'} props.variant
 * @param {boolean} props.current   an entry from the year being read now
 * @param {string} props.chapterLabel heading for a phase-transition entry
 */
export default function LogEntry({ entry, birthYear, passive = false, variant = 'card', current = false, chapterLabel = '' }) {
  const year = entry.year ?? ((birthYear ?? 1960) + (entry.age ?? 0))
  const ageLabel = `Age ${entry.age} · ${year}`
  const body = readableEntryText(entry, passive)
  // Passive: a question with nothing around it is replaced by its answer.
  const mainText = body || entry.outcome
  const outcome = body ? entry.outcome : null

  if (entry.isPhaseTransition) {
    return (
      <div className="relative flex items-center my-1">
        <div className="flex-grow border-t border-natalis-border" />
        <div className="mx-3 text-center">
          {chapterLabel && <p className="text-[10px] font-bold uppercase tracking-widest text-natalis-muted mb-0.5">{chapterLabel}</p>}
          <p className="text-xs italic text-natalis-dim leading-snug max-w-xs">{entry.text}</p>
          <p className="text-[10px] text-natalis-muted mt-0.5">{ageLabel}</p>
        </div>
        <div className="flex-grow border-t border-natalis-border" />
      </div>
    )
  }

  const label = entry.isDeath ? ageLabel
    : entry.isHeadline ? `${ageLabel} · in the news`
    : entry.isSoundtrack ? `${ageLabel} · what was playing`
    : entry.isLetter ? `${ageLabel} · a letter`
    : entry.isWorld ? `${ageLabel} · ${entry.worldEventName ?? 'the world'}`
    : ageLabel

  const proseSize = current && !entry.isHeadline && !entry.isSoundtrack ? 'text-prose' : ''

  if (variant === 'row') {
    return (
      <div className={`px-4 py-2.5 text-sm leading-relaxed ${
        entry.isDeath ? 'bg-zinc-900 text-zinc-100' :
        entry.isHeadline ? 'bg-stone-100 text-stone-700' :
        entry.isSoundtrack ? 'bg-violet-50 text-violet-900' :
        entry.isLetter ? 'bg-amber-50 text-stone-800' :
        entry.isKey || entry.isWorld ? 'text-natalis-text' :
        'text-natalis-dim'
      }`}>
        <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-natalis-muted mb-0.5">{label}</span>
        <span className={`font-prose ${entry.isHeadline || entry.isSoundtrack || entry.isLetter ? 'italic' : ''}`}>{mainText}</span>
        {outcome && <span className="block mt-1 pl-2 border-l-2 border-natalis-border text-natalis-dim font-prose">{outcome}</span>}
        {entry.isWorld && <ContextToggle context={entry.context} />}
      </div>
    )
  }

  return (
    <div className={`rounded-xl px-4 py-3 border text-sm leading-relaxed ${CARD_TONE(entry)}`}>
      <div className={`text-[10px] font-medium uppercase tracking-[0.14em] mb-1 ${entry.isDeath ? 'text-zinc-400' : 'text-natalis-muted'}`}>{label}</div>
      <span className={`font-prose ${proseSize} ${entry.isHeadline || entry.isSoundtrack ? 'italic text-sm' : ''} ${entry.isLetter ? 'italic block ml-2 border-l-2 border-amber-300 pl-3' : ''}`}>{mainText}</span>
      {outcome && (
        <span className={`block mt-1.5 pl-3 border-l border-natalis-rule text-natalis-muted font-prose ${proseSize}`}>{outcome}</span>
      )}
      {entry.isWorld && <ContextToggle context={entry.context} />}
    </div>
  )
}
