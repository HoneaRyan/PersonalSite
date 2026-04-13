import { parseSkills, type Skill, type Tier } from '@/lib/parsers'
import { cn } from '@/lib/utils'
import skillsMd from '@/content/skills.md?raw'

const skills: Skill[] = parseSkills(skillsMd)

const TIER_ORDER: Tier[] = ['Master', 'Expert', 'Adept', 'Novice']

const TIER_STYLES: Record<string, string> = {
  Master: 'text-rpg-navy bg-rpg-gold border-rpg-gold',
  Expert: 'text-rpg-navy bg-rpg-magenta border-rpg-magenta',
  Adept:  'text-rpg-text bg-rpg-panel-alt border-rpg-border',
  Novice: 'text-rpg-muted bg-rpg-panel border-rpg-border',
}

const TIER_DOT: Record<string, string> = {
  Master: 'bg-rpg-gold',
  Expert: 'bg-rpg-magenta',
  Adept:  'bg-rpg-text/50',
  Novice: 'bg-rpg-muted',
}

function TierBadge({ tier }: { tier: string }) {
  const style = TIER_STYLES[tier] ?? TIER_STYLES['Novice']
  return (
    <span className={cn('text-[9px] tracking-[0.2em] uppercase font-mono border px-1.5 py-0.5', style)}>
      {tier}
    </span>
  )
}

function SkillRow({ skill }: { skill: Skill }) {
  const dot = TIER_DOT[skill.tier] ?? TIER_DOT['Novice']
  return (
    <div className="flex flex-col gap-1.5 border-b border-rpg-border/50 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className={cn('size-1.5 rounded-full shrink-0', dot)} aria-hidden />
        <span className="text-rpg-text text-sm font-mono tracking-wide flex-1">{skill.name}</span>
        <TierBadge tier={skill.tier} />
      </div>
      {skill.description && (
        <p className="text-rpg-muted text-xs font-mono leading-relaxed pl-4">
          {skill.description}
        </p>
      )}
    </div>
  )
}

export function SkillsPanel() {
  if (!skills.length) {
    return (
      <div className="flex flex-col gap-0 h-full">
        <div className="border-b border-rpg-border px-6 py-3">
          <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
            Abilities &amp; Mastery
          </span>
        </div>
        <div className="p-6">
          <p className="text-rpg-muted text-xs font-mono italic">
            [ No abilities recorded. Fill in skills.md to populate this panel. ]
          </p>
        </div>
      </div>
    )
  }

  // Sort by tier (Master first)
  const sorted = [...skills].sort(
    (a, b) => TIER_ORDER.indexOf(a.tier as Tier) - TIER_ORDER.indexOf(b.tier as Tier)
  )

  return (
    <div className="flex flex-col gap-0 h-full">
      <div className="border-b border-rpg-border px-6 py-3 flex items-center justify-between">
        <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
          Abilities &amp; Mastery
        </span>
        <span className="text-rpg-muted text-[10px] font-mono">
          {skills.length} acquired
        </span>
      </div>

      <div className="flex flex-col gap-3 p-6 overflow-y-auto">
        {sorted.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}
