import React, { useState, useMemo } from 'react';
import { BestiarySourcebook, CreatureClassification, CreatureStatBlock } from '../types/bestiary';
import { BESTIARY_CREATURES, SOURCEBOOK_DESCRIPTIONS } from '../data/bestiaryData';

interface BestiaryViewProps {
  onGoHome: () => void;
}

export const BestiaryView: React.FC<BestiaryViewProps> = ({ onGoHome }) => {
  const [selectedSourcebook, setSelectedSourcebook] = useState<string>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [wildCardFilter, setWildCardFilter] = useState<'all' | 'wildcard' | 'extra'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedCreature, setInspectedCreature] = useState<CreatureStatBlock | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sourcebooks: BestiarySourcebook[] = [
    'Core Rules',
    'Fantasy Companion',
    'Sci-Fi Companion',
    'Horror Companion',
    'Super Powers Companion',
    'Savage Pathfinder'
  ];

  const classifications: CreatureClassification[] = [
    'Beast',
    'Undead',
    'Construct',
    'Monstrosity',
    'Alien',
    'Aberration',
    'Demon & Fiend',
    'Humanoid & Folk',
    'Dragon'
  ];

  // Filtering
  const filteredCreatures = useMemo(() => {
    return BESTIARY_CREATURES.filter((c) => {
      if (selectedSourcebook !== 'All' && c.sourcebook !== selectedSourcebook) return false;
      if (selectedClassification !== 'All' && c.classification !== selectedClassification) return false;
      if (wildCardFilter === 'wildcard' && !c.isWildCard) return false;
      if (wildCardFilter === 'extra' && c.isWildCard) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesSub = c.subtitle.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        const matchesAbility = c.abilities.some(
          (a) => a.name.toLowerCase().includes(q) || a.effect.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesSub && !matchesDesc && !matchesAbility) return false;
      }
      return true;
    });
  }, [selectedSourcebook, selectedClassification, wildCardFilter, searchQuery]);

  const handleCopyMarkdown = (creature: CreatureStatBlock) => {
    const text = `### ${creature.name} (${creature.isWildCard ? 'Wild Card' : 'Extra'})\n` +
      `*${creature.subtitle} — ${creature.sourcebook} (${creature.classification})*\n\n` +
      `**Attributes**: Agility ${creature.attributes.agility}, Smarts ${creature.attributes.smarts}, Spirit ${creature.attributes.spirit}, Strength ${creature.attributes.strength}, Vigor ${creature.attributes.vigor}\n` +
      `**Pace**: ${creature.pace} | **Parry**: ${creature.parry} | **Toughness**: ${creature.toughness} (${creature.armor}) | **Size**: ${creature.size >= 0 ? '+' : ''}${creature.size}\n` +
      `**Skills**: ${creature.skills.map((s) => `${s.name} ${s.die}`).join(', ')}\n\n` +
      `**Special Abilities**:\n` +
      creature.abilities.map((a) => `- **${a.name}**: ${a.effect}`).join('\n') +
      (creature.gear ? `\n\n**Gear**: ${creature.gear.join(', ')}` : '') +
      `\n\n${creature.description}`;

    navigator.clipboard.writeText(text);
    setCopiedId(creature.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 14px 60px' }}>
      {/* Top Breadcrumb & Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(30, 20, 16, 0.9) 60%, rgba(15, 12, 10, 0.98) 100%)',
          border: '1.5px solid rgba(234, 88, 12, 0.4)',
          borderRadius: 20,
          padding: '24px 26px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.55)',
          marginBottom: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <button
              onClick={onGoHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <span>← Back to Categories</span>
            </button>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#fb923c',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              SWADE COMPENDIUM REFERENCE
            </span>
          </div>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 950,
              color: '#fff',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}
          >
            Bestiary & Adversaries
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0, maxWidth: 680, lineHeight: 1.45 }}>
            A standalone creature and encounter compendium spanning the Core Rules, Fantasy, Sci-Fi, Horror,
            Super Powers companions, and Savage Pathfinder. Clean stat blocks with no interactive rollers or play state.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(234, 88, 12, 0.3)',
              borderRadius: 12,
              padding: '10px 16px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
              TOTAL FOES
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 950, color: '#fb923c' }}>
              {BESTIARY_CREATURES.length}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid #1e293b',
              borderRadius: 12,
              padding: '10px 16px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
              SOURCEBOOKS
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 950, color: '#f8fafc' }}>
              {sourcebooks.length}
            </div>
          </div>
        </div>
      </div>

      {/* Sourcebook Subcategory Pills */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.06em' }}>
          SELECT SOURCEBOOK SUBCATEGORY
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
          <button
            onClick={() => setSelectedSourcebook('All')}
            style={{
              padding: '9px 16px',
              borderRadius: 12,
              fontSize: '0.82rem',
              fontWeight: 800,
              background: selectedSourcebook === 'All' ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#0f172a',
              color: selectedSourcebook === 'All' ? '#fff' : '#cbd5e1',
              border: selectedSourcebook === 'All' ? '1px solid #fb923c' : '1px solid #1e293b',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: selectedSourcebook === 'All' ? '0 4px 14px rgba(234, 88, 12, 0.35)' : 'none'
            }}
          >
            All Sourcebooks ({BESTIARY_CREATURES.length})
          </button>

          {sourcebooks.map((sb) => {
            const count = BESTIARY_CREATURES.filter((c) => c.sourcebook === sb).length;
            const isSelected = selectedSourcebook === sb;

            return (
              <button
                key={sb}
                onClick={() => setSelectedSourcebook(sb)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 12,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  background: isSelected ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#0f172a',
                  color: isSelected ? '#fff' : '#cbd5e1',
                  border: isSelected ? '1px solid #fb923c' : '1px solid #1e293b',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 4px 14px rgba(234, 88, 12, 0.35)' : 'none'
                }}
              >
                {sb} ({count})
              </button>
            );
          })}
        </div>

        {selectedSourcebook !== 'All' && SOURCEBOOK_DESCRIPTIONS[selectedSourcebook] && (
          <div style={{ fontSize: '0.78rem', color: '#fb923c', marginTop: 6, fontStyle: 'italic' }}>
            {SOURCEBOOK_DESCRIPTIONS[selectedSourcebook]}
          </div>
        )}
      </div>

      {/* Secondary Search & Classification Filters */}
      <div
        style={{
          background: '#0f172a',
          padding: '14px 18px',
          borderRadius: 14,
          border: '1px solid #1e293b',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 240px', minWidth: 200 }}>
            <input
              type="text"
              placeholder="Search creatures, special abilities, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                background: '#070d19',
                border: '1px solid #334155',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Wild Card vs Extra Filter */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {(['all', 'wildcard', 'extra'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setWildCardFilter(tier)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  background: wildCardFilter === tier ? 'rgba(234, 88, 12, 0.25)' : '#070d19',
                  color: wildCardFilter === tier ? '#fb923c' : '#94a3b8',
                  border: wildCardFilter === tier ? '1px solid #ea580c' : '1px solid #1e293b',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tier === 'wildcard' ? 'Wild Cards Only' : tier === 'extra' ? 'Extras Only' : 'All Tiers'}
              </button>
            ))}
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                background: '#1e293b',
                border: '1px solid #334155',
                color: '#94a3b8',
                fontSize: '0.76rem',
                cursor: 'pointer'
              }}
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Classification Filter Bar */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          <button
            onClick={() => setSelectedClassification('All')}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: '0.74rem',
              fontWeight: 800,
              background: selectedClassification === 'All' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: selectedClassification === 'All' ? '#fff' : '#64748b',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            All Types
          </button>
          {classifications.map((cat) => {
            const isSel = selectedClassification === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedClassification(cat)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  background: isSel ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: isSel ? '#fff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#f8fafc' }}>
          Showing {filteredCreatures.length} {filteredCreatures.length === 1 ? 'creature' : 'creatures'}
        </div>
        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
          Click any creature card for expanded details or copy stat block
        </div>
      </div>

      {/* Creatures Grid */}
      {filteredCreatures.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#0f172a',
            borderRadius: 16,
            border: '1px solid #1e293b',
            color: '#64748b'
          }}
        >
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#94a3b8' }}>No Creatures Found</div>
          <div style={{ fontSize: '0.84rem', marginTop: 4 }}>
            Try adjusting your search query, sourcebook selection, or classification filters.
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 16
          }}
        >
          {filteredCreatures.map((creature) => {
            const isCopied = copiedId === creature.id;

            return (
              <div
                key={creature.id}
                onClick={() => setInspectedCreature(creature)}
                style={{
                  background: '#0d1322',
                  border: '1px solid #1e293b',
                  borderRadius: 16,
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  {/* Top Tags */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: 6,
                          background: 'rgba(234, 88, 12, 0.18)',
                          color: '#fb923c',
                          border: '1px solid rgba(234, 88, 12, 0.35)'
                        }}
                      >
                        {creature.sourcebook}
                      </span>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: 6,
                          background: '#1e293b',
                          color: '#94a3b8'
                        }}
                      >
                        {creature.classification}
                      </span>
                    </div>

                    {creature.isWildCard ? (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 900,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: 'rgba(245, 158, 11, 0.25)',
                          color: '#fbbf24',
                          border: '1px solid rgba(245, 158, 11, 0.5)',
                          flexShrink: 0
                        }}
                      >
                        WILD CARD
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: '#1e293b',
                          color: '#64748b',
                          flexShrink: 0
                        }}
                      >
                        EXTRA
                      </span>
                    )}
                  </div>

                  {/* Name and Subtitle */}
                  <div style={{ fontSize: '1.2rem', fontWeight: 950, color: '#f8fafc', lineHeight: 1.2 }}>
                    {creature.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2, marginBottom: 12 }}>
                    {creature.subtitle}
                  </div>

                  {/* Attributes Strip */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      background: '#070d19',
                      borderRadius: 10,
                      padding: '8px 4px',
                      border: '1px solid #1e293b',
                      textAlign: 'center',
                      marginBottom: 12
                    }}
                  >
                    {[
                      { label: 'AGI', val: creature.attributes.agility },
                      { label: 'SMA', val: creature.attributes.smarts },
                      { label: 'SPI', val: creature.attributes.spirit },
                      { label: 'STR', val: creature.attributes.strength },
                      { label: 'VIG', val: creature.attributes.vigor }
                    ].map((att) => (
                      <div key={att.label}>
                        <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 900 }}>{att.label}</div>
                        <div style={{ fontSize: '0.86rem', color: '#f8fafc', fontWeight: 900, marginTop: 1 }}>{att.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Derived Stats Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 6,
                      marginBottom: 12
                    }}
                  >
                    <div style={{ background: '#0a101d', padding: '6px 8px', borderRadius: 8, textAlign: 'center', border: '1px solid #1a2333' }}>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: 800 }}>PACE</div>
                      <div style={{ fontSize: '0.92rem', color: '#38bdf8', fontWeight: 950 }}>{creature.pace}"</div>
                    </div>
                    <div style={{ background: '#0a101d', padding: '6px 8px', borderRadius: 8, textAlign: 'center', border: '1px solid #1a2333' }}>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: 800 }}>PARRY</div>
                      <div style={{ fontSize: '0.92rem', color: '#22c55e', fontWeight: 950 }}>{creature.parry}</div>
                    </div>
                    <div style={{ background: '#0a101d', padding: '6px 8px', borderRadius: 8, textAlign: 'center', border: '1px solid #1a2333' }}>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: 800 }}>TOUGHNESS</div>
                      <div style={{ fontSize: '0.92rem', color: '#fbbf24', fontWeight: 950 }}>
                        {creature.toughness} {creature.armor > 0 ? `(${creature.armor})` : ''}
                      </div>
                    </div>
                    <div style={{ background: '#0a101d', padding: '6px 8px', borderRadius: 8, textAlign: 'center', border: '1px solid #1a2333' }}>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: 800 }}>SIZE</div>
                      <div style={{ fontSize: '0.92rem', color: '#cbd5e1', fontWeight: 950 }}>
                        {creature.size >= 0 ? `+${creature.size}` : creature.size}
                      </div>
                    </div>
                  </div>

                  {/* Skills Summary */}
                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginBottom: 10, lineHeight: 1.4 }}>
                    <strong style={{ color: '#94a3b8' }}>Skills: </strong>
                    {creature.skills.map((s) => `${s.name} ${s.die}`).join(', ')}
                  </div>

                  {/* Top Special Abilities Preview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
                    {creature.abilities.slice(0, 3).map((ab) => (
                      <div key={ab.name} style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.35 }}>
                        <strong style={{ color: '#f8fafc' }}>{ab.name}:</strong> {ab.effect}
                      </div>
                    ))}
                    {creature.abilities.length > 3 && (
                      <div style={{ fontSize: '0.68rem', color: '#fb923c', fontStyle: 'italic', marginTop: 2 }}>
                        +{creature.abilities.length - 3} more special abilities...
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 10,
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyMarkdown(creature);
                    }}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      background: isCopied ? '#22c55e' : '#1e293b',
                      color: isCopied ? '#052e16' : '#94a3b8',
                      border: '1px solid #334155',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {isCopied ? 'Copied!' : 'Copy Stat Block'}
                  </button>

                  <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800 }}>
                    Inspect Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal / Inspection Drawer */}
      {inspectedCreature && (
        <div
          onClick={() => setInspectedCreature(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(5px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0d1322',
              border: '1.5px solid rgba(234, 88, 12, 0.5)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 720,
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 26,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: 18
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: 'rgba(234, 88, 12, 0.2)',
                      color: '#fb923c',
                      border: '1px solid rgba(234, 88, 12, 0.4)'
                    }}
                  >
                    {inspectedCreature.sourcebook}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800 }}>
                    {inspectedCreature.classification} • {inspectedCreature.scale} Scale (Size {inspectedCreature.size >= 0 ? `+${inspectedCreature.size}` : inspectedCreature.size})
                  </span>
                  {inspectedCreature.isWildCard && (
                    <span style={{ fontSize: '0.66rem', fontWeight: 900, padding: '2px 6px', borderRadius: 4, background: '#f59e0b', color: '#110d08' }}>
                      WC
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.15 }}>
                  {inspectedCreature.name}
                </h2>
                <div style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: 2 }}>
                  {inspectedCreature.subtitle}
                </div>
              </div>

              <button
                onClick={() => setInspectedCreature(null)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div style={{ background: '#070d19', padding: '12px 16px', borderRadius: 12, border: '1px solid #1e293b' }}>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {inspectedCreature.description}
              </p>
              {inspectedCreature.tactics && (
                <div style={{ marginTop: 8, fontSize: '0.78rem', color: '#94a3b8' }}>
                  <strong style={{ color: '#fb923c' }}>Tactics: </strong> {inspectedCreature.tactics}
                </div>
              )}
              {inspectedCreature.habitat && (
                <div style={{ marginTop: 4, fontSize: '0.74rem', color: '#64748b' }}>
                  <strong>Habitat: </strong> {inspectedCreature.habitat}
                </div>
              )}
            </div>

            {/* Attributes Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                background: '#070d19',
                borderRadius: 12,
                padding: '10px 8px',
                border: '1.5px solid rgba(234, 88, 12, 0.3)',
                textAlign: 'center'
              }}
            >
              {[
                { label: 'AGILITY', val: inspectedCreature.attributes.agility },
                { label: 'SMARTS', val: inspectedCreature.attributes.smarts },
                { label: 'SPIRIT', val: inspectedCreature.attributes.spirit },
                { label: 'STRENGTH', val: inspectedCreature.attributes.strength },
                { label: 'VIGOR', val: inspectedCreature.attributes.vigor }
              ].map((att) => (
                <div key={att.label}>
                  <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 900 }}>{att.label}</div>
                  <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 950, marginTop: 2 }}>{att.val}</div>
                </div>
              ))}
            </div>

            {/* Derived Combat Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <div style={{ background: '#070d19', padding: '10px 12px', borderRadius: 10, textAlign: 'center', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800 }}>PACE</div>
                <div style={{ fontSize: '1.2rem', color: '#38bdf8', fontWeight: 950 }}>{inspectedCreature.pace}"</div>
              </div>
              <div style={{ background: '#070d19', padding: '10px 12px', borderRadius: 10, textAlign: 'center', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800 }}>PARRY</div>
                <div style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 950 }}>{inspectedCreature.parry}</div>
              </div>
              <div style={{ background: '#070d19', padding: '10px 12px', borderRadius: 10, textAlign: 'center', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800 }}>TOUGHNESS</div>
                <div style={{ fontSize: '1.2rem', color: '#fbbf24', fontWeight: 950 }}>
                  {inspectedCreature.toughness} {inspectedCreature.armor > 0 ? `(${inspectedCreature.armor})` : ''}
                </div>
              </div>
              <div style={{ background: '#070d19', padding: '10px 12px', borderRadius: 10, textAlign: 'center', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800 }}>SIZE & SCALE</div>
                <div style={{ fontSize: '1.2rem', color: '#cbd5e1', fontWeight: 950 }}>
                  {inspectedCreature.size >= 0 ? `+${inspectedCreature.size}` : inspectedCreature.size}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>
                SKILLS
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {inspectedCreature.skills.map((s) => (
                  <span
                    key={s.name}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 8,
                      background: '#070d19',
                      border: '1px solid #1e293b',
                      fontSize: '0.78rem',
                      color: '#cbd5e1',
                      fontWeight: 700
                    }}
                  >
                    {s.name} <strong style={{ color: '#38bdf8' }}>{s.die}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* Special Abilities */}
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                SPECIAL ABILITIES & ATTACKS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {inspectedCreature.abilities.map((ab) => (
                  <div
                    key={ab.name}
                    style={{
                      background: '#070d19',
                      border: '1px solid #1e293b',
                      padding: '10px 14px',
                      borderRadius: 10
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: '0.86rem', color: '#fb923c' }}>
                      {ab.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: 2, lineHeight: 1.4 }}>
                      {ab.effect}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear if present */}
            {inspectedCreature.gear && inspectedCreature.gear.length > 0 && (
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>
                  EQUIPMENT & WEAPONS
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {inspectedCreature.gear.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 10, borderTop: '1px solid #1e293b' }}>
              <button
                onClick={() => handleCopyMarkdown(inspectedCreature)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  background: copiedId === inspectedCreature.id ? '#22c55e' : '#1e293b',
                  color: copiedId === inspectedCreature.id ? '#052e16' : '#fff',
                  border: '1px solid #334155',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {copiedId === inspectedCreature.id ? 'Copied to Clipboard!' : 'Copy Markdown Stat Block'}
              </button>
              <button
                onClick={() => setInspectedCreature(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 10,
                  background: '#ea580c',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
