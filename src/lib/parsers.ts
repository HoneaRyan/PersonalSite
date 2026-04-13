// ── Types ────────────────────────────────────────────────────────────────────

export interface Character {
  name: string
  title: string
  level: string
  characterClass: string
  bio: string
}

export interface Stat {
  name: string
  level: number   // 0–100
  notes: string
}

export interface StatGroup {
  category: string
  stats: Stat[]
}

export type Tier = 'Novice' | 'Adept' | 'Expert' | 'Master'

export interface Skill {
  name: string
  tier: Tier | string
  description: string
}

export interface Quest {
  name: string
  status: 'Active' | 'Completed' | 'Abandoned' | string
  description: string
  tech: string[]
  link: string
}

export interface QuestLog {
  active: Quest[]
  completed: Quest[]
  abandoned: Quest[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strip HTML comments */
function stripComments(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, '')
}

/**
 * Split a markdown string into sections by a heading prefix (e.g. '##').
 * Returns a map of heading text → content below it (until the next same-level heading).
 */
function parseSections(md: string, level: number): Record<string, string> {
  const prefix = '#'.repeat(level) + ' '
  const lines = md.split('\n')
  const result: Record<string, string> = {}
  let currentKey = ''
  const buffer: string[] = []

  const flush = () => {
    if (currentKey) result[currentKey] = buffer.join('\n').trim()
    buffer.length = 0
  }

  for (const line of lines) {
    if (line.startsWith(prefix) && !line.startsWith(prefix + '#')) {
      flush()
      currentKey = line.slice(prefix.length).trim()
    } else {
      buffer.push(line)
    }
  }
  flush()
  return result
}

/** Pull a `- **Key:** Value` field from a block of text */
function extractField(block: string, key: string): string {
  const re = new RegExp(`\\*\\*${key}[^*]*\\*\\*:?\\s*(.+)?`, 'i')
  const m = block.match(re)
  return m?.[1]?.trim() ?? ''
}

// ── Parsers ───────────────────────────────────────────────────────────────────

export function parseCharacter(raw: string): Character {
  const md = stripComments(raw)
  const sections = parseSections(md, 2)
  return {
    name:           sections['Name']  ?? '',
    title:          sections['Title'] ?? '',
    level:          sections['Level'] ?? '',
    characterClass: sections['Class'] ?? '',
    bio:            sections['Bio']   ?? '',
  }
}

export function parseStats(raw: string): StatGroup[] {
  const md = stripComments(raw)
  const sections = parseSections(md, 2)
  const groups: StatGroup[] = []

  for (const [category, content] of Object.entries(sections)) {
    if (category === 'Stats') continue
    const stats: Stat[] = []
    for (const line of content.split('\n')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean)
      if (parts.length < 2) continue
      const [name, levelStr, notes = ''] = parts
      if (!name || name.startsWith('-') || name.toLowerCase() === 'stat') continue
      const level = parseInt(levelStr, 10)
      if (isNaN(level)) continue
      stats.push({ name, level: Math.min(100, Math.max(0, level)), notes })
    }
    if (stats.length) groups.push({ category, stats })
  }

  return groups
}

export function parseSkills(raw: string): Skill[] {
  const md = stripComments(raw)
  const sections = parseSections(md, 3)
  const skills: Skill[] = []

  for (const [name, content] of Object.entries(sections)) {
    const tier  = extractField(content, 'Tier')
    const description = extractField(content, 'Description')
    if (!name || name === 'Skill List') continue
    skills.push({ name, tier: tier || 'Novice', description })
  }

  return skills
}

function parseQuestBlock(name: string, content: string): Quest {
  const description = extractField(content, 'Description')
  const techRaw     = extractField(content, 'Inventory \\(Tech Used\\)') ||
                      extractField(content, 'Rewards \\(Tech Used\\)')   ||
                      extractField(content, 'Tech Used')
  const tech = techRaw
    ? techRaw.split(',').map(t => t.trim()).filter(Boolean)
    : []
  const link = extractField(content, 'Link')
  const status = extractField(content, 'Status')
  return { name, status, description, tech, link }
}

export function parseQuests(raw: string): QuestLog {
  const md = stripComments(raw)
  const h2 = parseSections(md, 2)
  const log: QuestLog = { active: [], completed: [], abandoned: [] }

  const parseGroup = (sectionText: string): Quest[] => {
    const quests: Quest[] = []
    const h3 = parseSections(sectionText, 3)
    for (const [name, content] of Object.entries(h3)) {
      if (!name || name.startsWith('[')) continue
      quests.push(parseQuestBlock(name, content))
    }
    return quests
  }

  if (h2['Active Quests'])    log.active    = parseGroup(h2['Active Quests'])
  if (h2['Completed Quests']) log.completed = parseGroup(h2['Completed Quests'])
  if (h2['Abandoned Quests']) log.abandoned = parseGroup(h2['Abandoned Quests'])

  return log
}
