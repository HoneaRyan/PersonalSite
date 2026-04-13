import { useEffect, useState } from 'react'
import { parseStats, type StatGroup } from '@/lib/parsers'
import statsMd from '@/content/stats.md?raw'

const groups: StatGroup[] = parseStats(statsMd)

function StatBar({ name, level, notes }: { name: string; level: number; notes: string }) {
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-rpg-text text-xs font-mono tracking-wide">{name}</span>
        <span className="text-rpg-gold-dim text-[10px] font-mono tabular-nums">
          {level}
          {notes && <span className="text-rpg-muted ml-2 italic">{notes}</span>}
        </span>
      </div>
      {/* Track */}
      <div className="relative h-2 bg-rpg-panel-alt border border-rpg-border overflow-hidden">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-rpg-gold transition-all duration-700 ease-out"
          style={{ width: filled ? `${level}%` : '0%' }}
        />
        {/* Tick marks every 25 */}
        {[25, 50, 75].map(tick => (
          <div
            key={tick}
            className="absolute inset-y-0 w-px bg-rpg-border/60"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function StatsPanel() {
  if (!groups.length) {
    return (
      <div className="flex flex-col gap-0 h-full">
        <div className="border-b border-rpg-border px-6 py-3">
          <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
            Skills &amp; Attributes
          </span>
        </div>
        <div className="p-6">
          <p className="text-rpg-muted text-xs font-mono italic">
            [ No attributes recorded. Fill in stats.md to populate this panel. ]
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0 h-full">
      <div className="border-b border-rpg-border px-6 py-3">
        <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
          Skills &amp; Attributes
        </span>
      </div>

      <div className="flex flex-col gap-6 p-6 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <span className="text-rpg-gold-dim text-[10px] tracking-[0.3em] uppercase font-mono border-b border-rpg-border pb-1">
              {group.category}
            </span>
            <div className="flex flex-col gap-3">
              {group.stats.map((stat) => (
                <StatBar key={stat.name} {...stat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
