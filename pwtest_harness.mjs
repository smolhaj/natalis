// Temporary beta-test driver. Deleted at end of session.
import { chromium } from 'playwright'
import fs from 'fs'

export const SHOT = '/tmp/claude-0/-home-user-natalis/5b905be3-c0b3-57b7-81d0-a70977543c85/scratchpad'
export const URL = 'http://localhost:5174/natalis/'

export async function launch({ width = 430, height = 932, scale = 2 } = {}) {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    isMobile: width < 500,
    hasTouch: width < 500,
  })
  const page = await ctx.newPage()
  const errors = []
  const consoles = []
  page.on('pageerror', e => { errors.push(`PAGEERROR: ${e.message}\n${(e.stack||'').split('\n').slice(0,4).join('\n')}`) })
  page.on('console', m => {
    if (['error', 'warning'].includes(m.type())) consoles.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('requestfailed', r => consoles.push(`[reqfail] ${r.url()} ${r.failure()?.errorText}`))
  return { browser, ctx, page, errors, consoles }
}

export async function shot(page, name) {
  const p = `${SHOT}/${name}.png`
  await page.screenshot({ path: p, fullPage: false })
  return p
}
export async function shotFull(page, name) {
  const p = `${SHOT}/${name}.png`
  await page.screenshot({ path: p, fullPage: true })
  return p
}

// Detect horizontal page scroll
export async function hscroll(page) {
  return await page.evaluate(() => ({
    docScrollW: document.documentElement.scrollWidth,
    docClientW: document.documentElement.clientWidth,
    bodyScrollW: document.body.scrollWidth,
    inner: window.innerWidth,
  }))
}

// Find overflowing / clipped elements
export async function overflowers(page) {
  return await page.evaluate(() => {
    const out = []
    const vw = window.innerWidth
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) continue
      if (r.right > vw + 1 || r.left < -1) {
        out.push({
          tag: el.tagName, cls: (el.className || '').toString().slice(0, 90),
          left: Math.round(r.left), right: Math.round(r.right),
          text: (el.textContent || '').trim().slice(0, 60),
        })
      }
    }
    return out.slice(0, 25)
  })
}

export function report(name, errors, consoles) {
  const lines = []
  if (errors.length) lines.push(`### ${name} JS ERRORS (${errors.length})`, ...new Set(errors))
  if (consoles.length) lines.push(`### ${name} CONSOLE (${consoles.length})`, ...new Set(consoles))
  return lines.join('\n')
}
