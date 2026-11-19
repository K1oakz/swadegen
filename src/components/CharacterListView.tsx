import React, { useState } from 'react';
import { AttributeId, RankName, SwadeCharacter } from '../types/swade';
import { ATTRIBUTE_META, SWADE_ANCESTRIES } from '../data/swadeData';
import { calculateDerivedStats } from '../utils/swadeRules';

interface CharacterListViewProps {
  characters: SwadeCharacter[];
  activeCharacterId: string;
  onSelectCharacter: (id: string, mode: 'play' | 'builder') => void;
  onCreateBlank: () => void;
  onDuplicateCharacter: (char: SwadeCharacter) => void;
  onDeleteCharacter: (id: string) => void;
  onOpenBackup: () => void;
}

export const CharacterListView: React.FC<CharacterListViewProps> = ({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onCreateBlank,
  onDuplicateCharacter,
  onDeleteCharacter,
  onOpenBackup
}) => {
  const [search, setSearch] = useState('');
  const [rankFilter, setRankFilter] = useState<'All' | RankName>('All');
  const [tierFilter, setTierFilter] = useState<'All' | 'WildCard' | 'Extra'>('All');

  const filteredCharacters = characters.filter((c) => {
    const derived = calculateDerivedStats(c);
    if (rankFilter !== 'All' && derived.rank !== rankFilter) return false;
    if (tierFilter === 'WildCard' && !c.isWildCard) return false;
    if (tierFilter === 'Extra' && c.isWildCard) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const nameMatch = c.name.toLowerCase().includes(q);
      const conceptMatch = (c.concept || '').toLowerCase().includes(q);
      const settingMatch = (c.setting || '').toLowerCase().includes(q);
      return nameMatch || conceptMatch || settingMatch;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Hero Welcome Header & Action Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(180, 83, 9, 0.22) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.45)',
          borderRadius: 20,
          padding: '22px 20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SAVAGE WORLDS ADVENTURE EDITION
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 950, color: '#fff', marginTop: 2, marginBottom: 4 }}>
              ⚔️ HEROES & WILD CARDS ROSTER
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: 640 }}>
              Manage your characters, launch interactive Play Sheets with the exploding dice roller, or build a new Wild Card from scratch.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={onCreateBlank}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '11px 18px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#120d08',
                fontWeight: 900,
                fontSize: '0.88rem',
                border: 'none',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
              }}
            >
              ➕ Create New Character
            </button>

            <button
              onClick={onOpenBackup}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.82rem'
              }}
            >
              📥 Backup & Sync
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: 18,
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters by name, concept, or setting..."
            style={{
              flex: '1 1 260px',
              maxWidth: 420,
              padding: '9px 13px',
              borderRadius: 10,
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.82rem'
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>RANK:</span>
            {(['All', 'Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRankFilter(r)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  background: rankFilter === r ? '#f59e0b' : 'rgba(0, 0, 0, 0.35)',
                  color: rankFilter === r ? '#120d08' : 'var(--text-secondary)',
                  border: rankFilter === r ? '1px solid #fbbf24' : '1px solid var(--border-subtle)'
                }}
              >
                {r}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>TIER:</span>
            {(['All', 'WildCard', 'Extra'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                style={{
                  padding: '5px 9px',
                  borderRadius: 8,
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  background: tierFilter === t ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 0, 0, 0.35)',
                  color: tierFilter === t ? '#38bdf8' : 'var(--text-secondary)',
                  border: tierFilter === t ? '1px solid #38bdf8' : '1px solid var(--border-subtle)'
                }}
              >
                {t === 'WildCard' ? '★ Wild Cards' : t === 'Extra' ? '☆ Extras' : 'All Tiers'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Characters Count Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
          Showing {filteredCharacters.length} of {characters.length} Hero{characters.length > 1 ? 'es' : ''}
        </div>
      </div>

      {/* Character Cards Grid */}
      {filteredCharacters.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: 16,
            padding: '40px 20px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🔍</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>No Characters Found</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 16 }}>
            No hero in your roster matches the current search or filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setRankFilter('All');
              setTierFilter('All');
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.08)',
              fontWeight: 800,
              fontSize: '0.8rem'
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: 14
          }}
        >
          {filteredCharacters.map((char) => {
            const derived = calculateDerivedStats(char);
            const anc = SWADE_ANCESTRIES.find((a) => a.id === char.ancestryId);
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                style={{
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, rgba(30, 24, 18, 0.95) 100%)'
                    : 'var(--bg-card)',
                  border: `1.5px solid ${isActive ? '#f59e0b' : 'var(--border-subtle)'}`,
                  borderRadius: 18,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 12,
                  boxShadow: isActive ? '0 8px 24px rgba(245, 158, 11, 0.2)' : 'none',
                  transition: 'all 0.18s ease'
                }}
              >
                {/* Card Header: Avatar + Name + Concept + Badges */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.35)'
                      }}
                    >
                      {char.avatarEmoji || '🎲'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 900,
                            color: '#fff',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {char.name}
                        </h3>
                        {isActive && (
                          <span
                            style={{
                              fontSize: '0.64rem',
                              fontWeight: 900,
                              padding: '2px 6px',
                              borderRadius: 99,
                              background: '#f59e0b',
                              color: '#110d08'
                            }}
                          >
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: '#fbbf24',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginTop: 1
                        }}
                      >
                        {char.concept || 'Adventurer'}
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {anc?.name || 'Human'} • {derived.rank} ({char.advancesCount} Adv)
                        {char.setting ? ` • ${char.setting}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Attributes Strip */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: 4,
                      marginTop: 12,
                      padding: '8px 6px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: 10,
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      textAlign: 'center'
                    }}
                  >
                    {(['agility', 'smarts', 'spirit', 'strength', 'vigor'] as AttributeId[]).map((attr) => {
                      const meta = ATTRIBUTE_META[attr];
                      const die = char.attributes[attr];
                      const mod = char.attributeModifiers[attr];
                      return (
                        <div key={attr}>
                          <div style={{ fontSize: '0.62rem', color: meta.color, fontWeight: 900 }}>
                            {meta.short}
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#fff', marginTop: 1 }}>
                            d{die}{mod !== 0 ? (mod > 0 ? `+${mod}` : mod) : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vitals Summary Strip */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 8,
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: 8,
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <div>Pace: <span style={{ color: '#fff' }}>{derived.pace}"</span></div>
                    <div>Parry: <span style={{ color: '#38bdf8' }}>{derived.parry}</span></div>
                    <div>Toughness: <span style={{ color: '#4ade80' }}>{derived.toughnessTotal} ({derived.armorBonus})</span></div>
                    <div>Bennies: <span style={{ color: '#fbbf24' }}>🪙 {char.playState.bennies}</span></div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingTop: 10,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <button
                    onClick={() => onSelectCharacter(char.id, 'play')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      padding: '8px 10px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.35)'
                    }}
                  >
                    ⚔️ Play Sheet
                  </button>

                  <button
                    onClick={() => onSelectCharacter(char.id, 'builder')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      padding: '8px 10px',
                      borderRadius: 10,
                      background: 'rgba(245, 158, 11, 0.16)',
                      border: '1px solid rgba(245, 158, 11, 0.45)',
                      color: '#fbbf24',
                      fontSize: '0.8rem',
                      fontWeight: 800
                    }}
                  >
                    🛠️ Edit / Build
                  </button>

                  <button
                    onClick={() => onDuplicateCharacter(char)}
                    title="Duplicate character"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    📋
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${char.name}? This cannot be undone.`)) {
                        onDeleteCharacter(char.id);
                      }
                    }}
                    title="Delete character"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      color: '#fca5a5',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
