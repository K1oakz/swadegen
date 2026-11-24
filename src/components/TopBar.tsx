import React from 'react';
import { SwadeCharacter } from '../types/swade';
import { StarshipVessel } from '../types/starship';
import {
  calculateAttributePoints,
  calculateDerivedStats,
  calculateEdgeBudget,
  calculateHindrancePointsEarned,
  calculateHindrancePointsSpent,
  calculateSkillPoints
} from '../utils/swadeRules';
import { calculateStarshipStats } from '../utils/starshipRules';

interface TopBarProps {
  character: SwadeCharacter;
  totalCharacters: number;
  activeMode: 'home' | 'roster' | 'builder' | 'play' | 'starships';
  onSetMode: (mode: 'home' | 'roster' | 'builder' | 'play' | 'starships') => void;
  onGoHome: () => void;
  onOpenRoster: () => void;
  onOpenBackup: () => void;
  onOpenDiceTray: () => void;
  lastRollSummary?: string;
  activeStarship?: StarshipVessel;
  totalStarships?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  character,
  totalCharacters,
  activeMode,
  onSetMode,
  onGoHome,
  onOpenRoster,
  onOpenBackup,
  onOpenDiceTray,
  activeStarship
}) => {
  // 1. HOME HUB MODE: Minimal, brand-focused header
  if (activeMode === 'home') {
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                  color: '#1a1105',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)'
                }}
              >
                SW
              </span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.01em' }}>
                  SWADE FORGE
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Savage Worlds Adventure Edition Companion
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={onOpenDiceTray}
                title="Open Exploding Dice Roller"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 12px',
                  borderRadius: 10,
                  background: 'rgba(56, 189, 248, 0.14)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#38bdf8',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Dice Tray
              </button>
              <button
                onClick={onOpenBackup}
                title="Export / Import JSON Backup"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Backup & Sync
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // 2. VEHICLES / STARSHIPS MODE: Vehicle-only top bar with Home button
  if (activeMode === 'starships') {
    const shipStats = activeStarship ? calculateStarshipStats(activeStarship) : null;
    return (
      <header
        style={{
          background: 'linear-gradient(180deg, #18141f 0%, #100d17 100%)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.35)',
          paddingTop: 'calc(var(--safe-top) + 10px)',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.55)'
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 14px 10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              flexWrap: 'wrap',
              marginBottom: shipStats ? 10 : 0
            }}
          >
            {/* Back Home Button + Ship info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 240px', minWidth: 0 }}>
              <button
                onClick={onGoHome}
                title="Return to Main Categories"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <span>← Home</span>
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '5px 12px',
                  borderRadius: 12,
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  minWidth: 0,
                  flex: 1
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    color: '#c4b5fd',
                    flexShrink: 0
                  }}
                >
                  V
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {activeStarship?.name || 'Starship Vessel'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: 99,
                        background: 'rgba(139, 92, 246, 0.25)',
                        color: '#c4b5fd',
                        border: '1px solid rgba(139, 92, 246, 0.45)'
                      }}
                    >
                      VEHICLES
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {activeStarship
                      ? `${activeStarship.classModel} (${activeStarship.sizeCategory}) • Registry: ${activeStarship.registry}`
                      : 'Sci-Fi Vehicle Manager'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
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
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Dice Tray
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
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Backup
              </button>
            </div>
          </div>

          {/* Vehicle Stats Ribbon */}
          {shipStats && activeStarship && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: 6
              }}
            >
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
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>SIZE</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#a78bfa' }}>
                  {activeStarship.size} ({activeStarship.sizeCategory})
                </span>
              </div>
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
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>HANDLING</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: shipStats.finalHandling >= 0 ? '#22c55e' : '#ef4444' }}>
                  {shipStats.finalHandling >= 0 ? `+${shipStats.finalHandling}` : shipStats.finalHandling}
                </span>
              </div>
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
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOP SPEED</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#38bdf8' }}>
                  {shipStats.finalTopSpeed} MPH
                </span>
              </div>
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
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOUGHNESS</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#22c55e' }}>
                  {shipStats.finalToughness}{' '}
                  <small style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>({shipStats.finalArmor})</small>
                </span>
              </div>
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
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>WOUNDS</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: activeStarship.wounds > 0 ? '#ef4444' : '#22c55e' }}>
                  {activeStarship.wounds} / {shipStats.maxWounds}
                </span>
              </div>
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
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>MOD SLOTS</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: shipStats.remainingModSlots < 0 ? '#ef4444' : '#fbbf24' }}>
                  {shipStats.spentModSlots}/{shipStats.totalModSlots}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // 3. CHARACTERS MODE (roster, builder, play): Focus on character stats with Home button and character-only mode switch
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
        {/* Top Row: Back Home + Active Character Pill + Character Modes + Actions */}
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
          {/* Back Home Button + Character Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 240px', minWidth: 0 }}>
            <button
              onClick={onGoHome}
              title="Return to Main Categories"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 12px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <span>← Home</span>
            </button>

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
                minWidth: 0,
                flex: 1,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #2a221b 0%, #1a1511 100%)',
                  border: '1px solid var(--border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.05rem',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                {character.avatarImage ? (
                  <img
                    src={character.avatarImage}
                    alt={character.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>
                    {character.name.trim().charAt(0).toUpperCase() || 'H'}
                  </span>
                )}
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
                      WILD CARD
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
                  {derived.rank} ({character.advancesCount} Adv) • {character.concept || 'Adventurer'} • Switch ({totalCharacters})
                </div>
              </div>
            </button>
          </div>

          {/* Mode Switcher: Character Views Only */}
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
                  color: activeMode === 'roster' ? '#081a28' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Roster ({totalCharacters})
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
                  color: activeMode === 'builder' ? '#120d08' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Builder
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
                  color: activeMode === 'play' ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Play Sheet
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
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Dice Tray</span>
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
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
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
                  {character.playState.bennies}
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
