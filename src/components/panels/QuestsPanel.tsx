import { parseQuests, type Quest } from '@/lib/parsers'
import { cn } from '@/lib/utils'
import questsMd from '@/content/quests.md?raw'

const log = parseQuests(questsMd)

const STATUS_STYLES: Record<string, string> = {
  Active:    'text-rpg-gold border-rpg-gold/60 bg-rpg-gold/10',
  Completed: 'text-rpg-text border-rpg-border bg-rpg-panel-alt',
  Abandoned: 'text-rpg-muted border-rpg-muted/40 bg-rpg-panel',
}

const STATUS_DOT: Record<string, string> = {
  Active:    'bg-rpg-gold animate-pulse',
  Completed: 'bg-rpg-text/60',
  Abandoned: 'bg-rpg-muted/50',
}

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES['Completed']
  return (
    <span className={cn('text-[9px] tracking-[0.2em] uppercase font-mono border px-1.5 py-0.5', style)}>
      {status}
    </span>
  )
}

function QuestCard({ quest }: { quest: Quest }) {
  const dot = STATUS_DOT[quest.status] ?? STATUS_DOT['Completed']
  return (
    <div className="border border-rpg-border bg-rpg-panel/60 p-4 flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <span className={cn('size-1.5 rounded-full shrink-0 mt-1', dot)} aria-hidden />
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-rpg-text text-sm font-mono tracking-wide">{quest.name}</span>
            <StatusBadge status={quest.status} />
          </div>
          {quest.description && (
            <p className="text-rpg-muted text-xs font-mono leading-relaxed">{quest.description}</p>
          )}
          {quest.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {quest.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] tracking-wider font-mono uppercase text-rpg-muted border border-rpg-border/60 px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {quest.link && (
            <a
              href={quest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rpg-gold-dim text-[10px] font-mono hover:text-rpg-gold transition-colors"
            >
              ↗ {quest.link}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function QuestSection({
  label,
  quests,
}: {
  label: string
  quests: Quest[]
}) {
  if (!quests.length) return null
  return (
    <div className="flex flex-col gap-2">
      <span className="text-rpg-gold-dim text-[10px] tracking-[0.3em] uppercase font-mono border-b border-rpg-border pb-1">
        {label}
      </span>
      <div className="flex flex-col gap-2">
        {quests.map((q) => (
          <QuestCard key={q.name} quest={q} />
        ))}
      </div>
    </div>
  )
}

export function QuestsPanel() {
  const total = log.active.length + log.completed.length + log.abandoned.length

  if (!total) {
    return (
      <div className="flex flex-col gap-0 h-full">
        <div className="border-b border-rpg-border px-6 py-3">
          <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
            Quest Log
          </span>
        </div>
        <div className="p-6">
          <p className="text-rpg-muted text-xs font-mono italic">
            [ No quests recorded. Fill in quests.md to populate this panel. ]
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0 h-full">
      <div className="border-b border-rpg-border px-6 py-3 flex items-center justify-between">
        <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
          Quest Log
        </span>
        <span className="text-rpg-muted text-[10px] font-mono">
          {log.active.length > 0 && (
            <span className="text-rpg-gold">{log.active.length} active</span>
          )}
          {log.active.length > 0 && log.completed.length > 0 && (
            <span className="mx-1">·</span>
          )}
          {log.completed.length > 0 && `${log.completed.length} completed`}
        </span>
      </div>

      <div className="flex flex-col gap-6 p-6 overflow-y-auto">
        <QuestSection label="Active Quests"    quests={log.active}    />
        <QuestSection label="Completed Quests" quests={log.completed} />
        <QuestSection label="Abandoned Quests" quests={log.abandoned} />
      </div>
    </div>
  )
}
