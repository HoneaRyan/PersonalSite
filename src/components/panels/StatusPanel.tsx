import { parseCharacter } from '@/lib/parsers'
import characterMd from '@/content/character.md?raw'

const char = parseCharacter(characterMd)

export function StatusPanel() {
  return (
    <div className="flex flex-col gap-0 h-full">

      {/* Section header */}
      <div className="border-b border-rpg-border px-6 py-3">
        <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
          Character Status
        </span>
      </div>

      <div className="flex flex-col gap-8 p-6">

        {/* Portrait + identity block */}
        <div className="flex gap-6 items-start">

          {/* Portrait placeholder */}
          <div
            className="shrink-0 size-24 border-2 border-rpg-border bg-rpg-panel-alt flex items-center justify-center"
            aria-hidden
          >
            <span className="text-rpg-gold-dim text-2xl font-mono select-none">
              {char.name ? char.name.charAt(0).toUpperCase() : '?'}
            </span>
          </div>

          {/* Name / class / level */}
          <div className="flex flex-col gap-1 pt-1">
            <h1 className="text-rpg-text text-xl font-mono tracking-wide leading-none">
              {char.name || <span className="text-rpg-muted italic">Unknown Hero</span>}
            </h1>

            {char.title && (
              <p className="text-rpg-gold text-xs tracking-[0.25em] uppercase font-mono">
                {char.title}
              </p>
            )}

            {char.characterClass && (
              <p className="text-rpg-magenta text-xs tracking-[0.2em] uppercase font-mono">
                {char.characterClass}
              </p>
            )}

            {char.level && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-rpg-muted text-[10px] tracking-widest font-mono uppercase">LV.</span>
                <span className="text-rpg-gold font-mono text-sm">{char.level}</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-rpg-border" />

        {/* Bio */}
        {char.bio ? (
          <div className="flex flex-col gap-2">
            <span className="text-rpg-muted text-[10px] tracking-[0.3em] uppercase font-mono">
              Description
            </span>
            <p className="text-rpg-text text-sm font-mono leading-relaxed">
              {char.bio}
            </p>
          </div>
        ) : (
          <p className="text-rpg-muted text-xs font-mono italic">
            [ No character description recorded. ]
          </p>
        )}

      </div>
    </div>
  )
}
