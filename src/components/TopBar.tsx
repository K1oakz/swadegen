import React from 'react';
import { SwadeCharacter } from '../types/swade';
import {
  calculateAttributePoints,
  calculateDerivedStats,
  calculateEdgeBudget,
  calculateHindrancePointsEarned,
  calculateHindrancePointsSpent,
  calculateSkillPoints
} from '../utils/swadeRules';

interface TopBarProps {
  character: SwadeCharacter;
  totalCharacters: number;
  activeMode: 'roster' | 'builder' | 'play' | 'starships';
  onSetMode: (mode: 'roster' | 'builder' | 'play' | 'starships') => void;
  onOpenRoster: () => void;
  onOpenBackup: () => void;
  onOpenDiceTray: () => void;
  lastRollSummary?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  character,
  totalCharacters,
  activeMode,
  onSetMode,
  onOpenRoster,
  onOpenBackup,
  onOpenDiceTray
}) => {
  const derived = calculateDerivedStats(character);
  const attrPts = calculateAttributePoints(character);
  const skillPts = calculateSkillPoints(character);
  const edgePts = calculateEdgeBudget(character);
  const hindEarned = calculateHindrancePointsEarned(character);
  const hindSpent = calculateHindrancePointsSpent(character);
  const hindUnspent = hindEarned.cappedTotal - hindSpent;

  return (
    <header
      style={{
        background: 'linear-gradient(180deg, #1f1914 0%, #15110e 100%)',
        borderBottom: '1px solid var(--border-strong)',
        paddingTop: 'calc(var(--safe-top) + 10px)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.55)'
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 14px 10px' }}>
        {/* Top Row: Brand + Mode Switch + Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 10
          }}
        >
          {/* Active Character Pill (Tap to switch character) */}
          <button
            onClick={onOpenRoster}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 12px',
              borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid var(--border-strong)',
              textAlign: 'left',
              flex: '1 1 220px',
              minWidth: 0
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)'
              }}
            >
              {character.avatarEmoji || '🎲'}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {character.name}
                </span>
                {character.isWildCard && (
                  <span
                    title="Wild Card"
                    style={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: 99,
                      background: 'rgba(245, 158, 11, 0.22)',
                      color: 'var(--accent-gold-bright)',
                      border: '1px solid rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    ★ WILD CARD
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: '0.73rem',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {derived.rank} ({character.advancesCount} Adv) • {character.concept || 'Adventurer'} • Tap to Switch ({totalCharacters})
              </div>
            </div>
          </button>

          {/* Mode Switcher (Roster, Builder, Play) + Backup + Dice Tray */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                background: 'rgba(0, 0, 0, 0.45)',
                padding: 3,
                borderRadius: 10,
                border: '1px solid var(--border-subtle)'
              }}
            >
              <button
                onClick={() => onSetMode('roster')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background:
                    activeMode === 'roster'
                      ? 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)'
                      : 'transparent',
                  color: activeMode === 'roster' ? '#081a28' : 'var(--text-secondary)'
                }}
              >
                👥 Roster ({totalCharacters})
              </button>
              <button
                onClick={() => onSetMode('builder')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background:
                    activeMode === 'builder'
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'transparent',
                  color: activeMode === 'builder' ? '#120d08' : 'var(--text-secondary)'
                }}
              >
                🛠️ Builder
              </button>
              <button
                onClick={() => onSetMode('play')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background:
                    activeMode === 'play'
                      ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                      : 'transparent',
                  color: activeMode === 'play' ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                ⚔️ Play Sheet
              </button>
              <button
                onClick={() => onSetMode('starships')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background:
                    activeMode === 'starships'
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
                      : 'transparent',
                  color: activeMode === 'starships' ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                🚀 Spaceships
              </button>
            </div>

            <button
              onClick={onOpenDiceTray}
              title="Open Exploding Dice Roller"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '7px 11px',
                borderRadius: 10,
                background: 'rgba(56, 189, 248, 0.14)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#38bdf8',
                fontSize: '0.78rem',
                fontWeight: 700
              }}
            >
              <span>🎲</span>
              <span>Dice</span>
            </button>

            <button
              onClick={onOpenBackup}
              title="Export / Import JSON Backup"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '7px 10px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '0.76rem',
                fontWeight: 600
              }}
            >
              <span>💾</span>
              <span>Backup</span>
            </button>
          </div>
        </div>

        {/* Derived Stats & Creation Budget Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
            gap: 6
          }}
        >
          {/* Pace */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 9,
              padding: '5px 9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>PACE</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8' }}>
              {derived.pace}" <small style={{ fontSize: '0.7rem', opacity: 0.85 }}>(+d{derived.runningDie})</small>
            </span>
          </div>

          {/* Parry */}
          <div
            title={derived.parryBreakdown.join(' | ')}
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 9,
              padding: '5px 9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>PARRY</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24' }}>{derived.parry}</span>
          </div>

          {/* Toughness */}
          <div
            title={derived.toughnessBreakdown.join(' | ')}
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 9,
              padding: '5px 9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOUGHNESS</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#22c55e' }}>
              {derived.toughnessTotal}{' '}
              <small style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                ({derived.armorBonus})
              </small>
            </span>
          </div>

          {activeMode === 'builder' ? (
            <>
              {/* Attribute Points */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: `1px solid ${attrPts.remaining < 0 ? '#ef4444' : attrPts.remaining > 0 ? '#38bdf8' : 'var(--border-subtle)'}`,
                  borderRadius: 9,
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>ATTR PTS</span>
                <span
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    color: attrPts.remaining < 0 ? '#ef4444' : attrPts.remaining > 0 ? '#38bdf8' : '#22c55e'
                  }}
                >
                  {attrPts.spent}/{attrPts.budget}
                </span>
              </div>

              {/* Skill Points */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: `1px solid ${skillPts.remaining < 0 ? '#ef4444' : skillPts.remaining > 0 ? '#38bdf8' : 'var(--border-subtle)'}`,
                  borderRadius: 9,
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>SKILL PTS</span>
                <span
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    color: skillPts.remaining < 0 ? '#ef4444' : skillPts.remaining > 0 ? '#38bdf8' : '#22c55e'
                  }}
                >
                  {skillPts.spent}/{skillPts.budget}
                </span>
              </div>

              {/* Edges & Hindrances */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: `1px solid ${edgePts.remaining < 0 || hindUnspent < 0 ? '#ef4444' : 'var(--border-subtle)'}`,
                  borderRadius: 9,
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>EDGES</span>
                <span
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    color: edgePts.remaining < 0 ? '#ef4444' : edgePts.remaining > 0 ? '#38bdf8' : '#22c55e'
                  }}
                >
                  {edgePts.spent}/{edgePts.budget}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Bennies */}
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  borderRadius: 9,
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 700 }}>BENNIES</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24' }}>
                  🪙 {character.playState.bennies}
                </span>
              </div>

              {/* Active Roll Penalty */}
              <div
                style={{
                  background: derived.activePenalty < 0 ? 'rgba(239, 68, 68, 0.16)' : 'rgba(0, 0, 0, 0.35)',
                  border: `1px solid ${derived.activePenalty < 0 ? '#ef4444' : 'var(--border-subtle)'}`,
                  borderRadius: 9,
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>ROLL MOD</span>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: derived.activePenalty < 0 ? '#ef4444' : '#22c55e'
                  }}
                >
                  {derived.activePenalty === 0 ? '0 (Clean)' : derived.activePenalty}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
