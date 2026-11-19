import React from 'react';
import { AttributeId, DieSides, PlayState, SwadeCharacter } from '../types/swade';
import { ATTRIBUTE_META, SWADE_ANCESTRIES, SWADE_ARCANE_BACKGROUNDS } from '../data/swadeData';
import { calculateDerivedStats, calculateSkillRollModifiers, formatDie } from '../utils/swadeRules';

interface PlayModeViewProps {
  character: SwadeCharacter;
  onUpdateCharacter: (updates: Partial<SwadeCharacter>) => void;
  onRollTrait: (params: {
    label: string;
    dieSides: DieSides;
    skillId?: string;
    isUnskilled?: boolean;
    baseModifier?: number;
    targetNumber?: number;
  }) => void;
  onRollDamage: (params: {
    label: string;
    damageFormula: string;
    bonusRaiseD6?: boolean;
  }) => void;
}

export const PlayModeView: React.FC<PlayModeViewProps> = ({
  character,
  onUpdateCharacter,
  onRollTrait,
  onRollDamage
}) => {
  const derived = calculateDerivedStats(character);
  const ps = character.playState;
  const ancestry = SWADE_ANCESTRIES.find((a) => a.id === character.ancestryId);
  const arcaneBg = SWADE_ARCANE_BACKGROUNDS.find((a) => a.id === character.arcaneBackgroundId);

  const updatePlayState = (updates: Partial<PlayState>) => {
    onUpdateCharacter({
      playState: {
        ...ps,
        ...updates
      }
    });
  };

  const handleSoakRoll = () => {
    if (ps.bennies <= 0) {
      alert('No Bennies remaining to make a Soak roll!');
      return;
    }
    updatePlayState({ bennies: ps.bennies - 1 });
    const ironJawBonus = character.edges.some((e) => e.edgeId === 'iron_jaw') ? 2 : 0;
    const elanBonus = character.edges.some((e) => e.edgeId === 'elan') ? 2 : 0;
    onRollTrait({
      label: 'Soak Roll (Vigor)',
      dieSides: character.attributes.vigor,
      baseModifier: character.attributeModifiers.vigor + ironJawBonus + elanBonus,
      targetNumber: 4
    });
  };

  const handleUnshakeRoll = () => {
    const combatReflexesBonus = character.edges.some((e) => e.edgeId === 'combat_reflexes') ? 2 : 0;
    const constructBonus = character.ancestryId === 'android' ? 2 : 0;
    onRollTrait({
      label: 'Recover from Shaken (Spirit)',
      dieSides: character.attributes.spirit,
      baseModifier: character.attributeModifiers.spirit + combatReflexesBonus + constructBonus,
      targetNumber: 4
    });
  };

  const trainedSkills = character.skills.filter((s) => s.die > 0);
  const unskilledSkills = character.skills.filter((s) => s.die === 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Incapacitated Warning Banner */}
      {(ps.wounds > 3 || ps.fatigue > 2) && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.35), rgba(153, 27, 27, 0.45))',
            border: '2px solid #ef4444',
            borderRadius: 14,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10
          }}
        >
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#fca5a5' }}>
              💀 CHARACTER INCAPACITATED!
            </div>
            <div style={{ fontSize: '0.8rem', color: '#fecaca' }}>
              {ps.wounds > 3
                ? 'Exceeded 3 Wounds — Roll Vigor immediately against Bleeding Out & Injury Table!'
                : 'Exceeded 2 Fatigue — Incapacitated until Fatigue is recovered!'}
            </div>
          </div>
          <button
            onClick={() =>
              onRollTrait({
                label: 'Vigor Roll (Incapacitation / Bleed Out)',
                dieSides: character.attributes.vigor,
                baseModifier: character.attributeModifiers.vigor + (character.edges.some((e) => e.edgeId === 'hard_to_kill') ? Math.min(3, ps.wounds) : 0)
              })
            }
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              background: '#ef4444',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.82rem'
            }}
          >
            🎲 Roll Vigor Save
          </button>
        </div>
      )}

      {/* Top Vital Trackers Grid: Bennies, Wounds, Fatigue, Conditions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12
        }}
      >
        {/* BENNIES & CONVICTION CARD */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            borderRadius: 16,
            padding: 14
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.04em' }}>
              🪙 BENNIES & FORTUNE
            </span>
            <button
              onClick={() => updatePlayState({ bennies: derived.startingBennies })}
              style={{
                fontSize: '0.72rem',
                padding: '3px 8px',
                borderRadius: 6,
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                fontWeight: 700
              }}
            >
              Reset ({derived.startingBennies})
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
            <button
              onClick={() => updatePlayState({ bennies: Math.max(0, ps.bennies - 1) })}
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.08)',
                fontSize: '1.2rem',
                fontWeight: 800
              }}
            >
              −
            </button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>
                {ps.bennies}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Active Bennies</div>
            </div>
            <button
              onClick={() => updatePlayState({ bennies: ps.bennies + 1 })}
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'rgba(245, 158, 11, 0.25)',
                color: '#fbbf24',
                fontSize: '1.2rem',
                fontWeight: 800
              }}
            >
              +
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button
              onClick={handleSoakRoll}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                background: 'rgba(34, 197, 94, 0.16)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: '#4ade80',
                fontSize: '0.76rem',
                fontWeight: 700
              }}
            >
              🛡️ Spend & Roll Soak
            </button>
            <button
              onClick={() => {
                if (ps.shaken && ps.bennies > 0) {
                  updatePlayState({ bennies: ps.bennies - 1, shaken: false });
                } else {
                  updatePlayState({ conviction: !ps.conviction });
                }
              }}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                background: ps.conviction
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'rgba(245, 158, 11, 0.14)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: ps.conviction ? '#110d08' : '#fbbf24',
                fontSize: '0.76rem',
                fontWeight: 800
              }}
            >
              {ps.shaken && ps.bennies > 0
                ? '⚡ Spend to Unshake'
                : ps.conviction
                ? '🔥 Conviction ON (+d6)'
                : '✨ Toggle Conviction'}
            </button>
          </div>
        </div>

        {/* WOUNDS & FATIGUE CARD */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 14
          }}
        >
          {/* Wounds Track */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ef4444' }}>
                🩸 WOUNDS {ps.wounds > 0 && `(-${Math.min(3, ps.wounds)} Penalty)`}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {ps.wounds === 0 ? 'Healthy' : ps.wounds <= 3 ? `${ps.wounds}/3 Wounds` : 'INCAPACITATED'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
              {[0, 1, 2, 3, 4].map((w) => (
                <button
                  key={w}
                  onClick={() => updatePlayState({ wounds: w })}
                  style={{
                    padding: '7px 4px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background:
                      ps.wounds === w
                        ? w === 0
                          ? '#22c55e'
                          : w === 4
                          ? '#991b1b'
                          : '#ef4444'
                        : 'rgba(255, 255, 255, 0.06)',
                    color: ps.wounds === w ? '#fff' : 'var(--text-secondary)',
                    border: ps.wounds === w ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent'
                  }}
                >
                  {w === 0 ? '0' : w === 4 ? 'INC' : `-${w}`}
                </button>
              ))}
            </div>
          </div>

          {/* Fatigue Track */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8' }}>
                😮‍💨 FATIGUE {ps.fatigue > 0 && `(-${Math.min(2, ps.fatigue)} Penalty)`}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {ps.fatigue === 0 ? 'Fresh' : ps.fatigue <= 2 ? `${ps.fatigue}/2 Fatigue` : 'INCAPACITATED'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
              {[0, 1, 2, 3].map((f) => (
                <button
                  key={f}
                  onClick={() => updatePlayState({ fatigue: f })}
                  style={{
                    padding: '7px 4px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background:
                      ps.fatigue === f
                        ? f === 0
                          ? '#22c55e'
                          : f === 3
                          ? '#991b1b'
                          : '#0284c7'
                        : 'rgba(255, 255, 255, 0.06)',
                    color: ps.fatigue === f ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  {f === 0 ? '0' : f === 3 ? 'INC' : `-${f}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COMBAT STATUS CONDITIONS CARD */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 14
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ⚡ COMBAT CONDITIONS
            </span>
            {ps.shaken && (
              <button
                onClick={handleUnshakeRoll}
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: '#f59e0b',
                  color: '#110d08',
                  fontWeight: 800
                }}
              >
                🎲 Roll Spirit to Unshake
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
            <button
              onClick={() => updatePlayState({ shaken: !ps.shaken })}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                fontSize: '0.76rem',
                fontWeight: 700,
                background: ps.shaken ? 'rgba(245, 158, 11, 0.28)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${ps.shaken ? '#f59e0b' : 'var(--border-subtle)'}`,
                color: ps.shaken ? '#fbbf24' : 'var(--text-secondary)',
                textAlign: 'left'
              }}
            >
              💫 Shaken {ps.shaken ? '(ACTIVE)' : ''}
            </button>

            <button
              onClick={() => updatePlayState({ distracted: !ps.distracted })}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                fontSize: '0.76rem',
                fontWeight: 700,
                background: ps.distracted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${ps.distracted ? '#ef4444' : 'var(--border-subtle)'}`,
                color: ps.distracted ? '#fca5a5' : 'var(--text-secondary)',
                textAlign: 'left'
              }}
            >
              😵 Distracted (-2)
            </button>

            <button
              onClick={() => updatePlayState({ vulnerable: !ps.vulnerable })}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                fontSize: '0.76rem',
                fontWeight: 700,
                background: ps.vulnerable ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${ps.vulnerable ? '#a855f7' : 'var(--border-subtle)'}`,
                color: ps.vulnerable ? '#d8b4fe' : 'var(--text-secondary)',
                textAlign: 'left'
              }}
            >
              🎯 Vulnerable (+2 vs)
            </button>

            <button
              onClick={() => updatePlayState({ boundOrEntangled: !ps.boundOrEntangled })}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                fontSize: '0.76rem',
                fontWeight: 700,
                background: ps.boundOrEntangled ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${ps.boundOrEntangled ? '#ef4444' : 'var(--border-subtle)'}`,
                color: ps.boundOrEntangled ? '#fca5a5' : 'var(--text-secondary)',
                textAlign: 'left'
              }}
            >
              ⛓️ Entangled (-2)
            </button>

            <button
              onClick={() => updatePlayState({ aiming: !ps.aiming })}
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                fontSize: '0.76rem',
                fontWeight: 700,
                background: ps.aiming ? 'rgba(34, 197, 94, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${ps.aiming ? '#22c55e' : 'var(--border-subtle)'}`,
                color: ps.aiming ? '#86efac' : 'var(--text-secondary)',
                textAlign: 'left'
              }}
            >
              🔭 Aiming (+2 Ranged)
            </button>

            <button
              onClick={() =>
                onRollTrait({
                  label: `Running Roll (Pace ${derived.pace}" + d${derived.runningDie})`,
                  dieSides: derived.runningDie,
                  baseModifier: derived.pace,
                  targetNumber: 4
                })
              }
              style={{
                padding: '8px 10px',
                borderRadius: 9,
                fontSize: '0.76rem',
                fontWeight: 700,
                background: 'rgba(56, 189, 248, 0.14)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#38bdf8',
                textAlign: 'left'
              }}
            >
              🏃 Roll Run ({derived.pace}+d{derived.runningDie})
            </button>
          </div>
        </div>
      </div>

      {/* ATTRIBUTES & SKILLS ONE-TAP ROLLER */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 14
        }}
      >
        {/* Attributes Panel */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24' }}>
              🎲 ATTRIBUTES (Tap to Roll + Wild Die)
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TN 4</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(Object.keys(ATTRIBUTE_META) as AttributeId[]).map((attr) => {
              const meta = ATTRIBUTE_META[attr];
              const die = character.attributes[attr];
              const mod = character.attributeModifiers[attr] || 0;

              return (
                <button
                  key={attr}
                  onClick={() =>
                    onRollTrait({
                      label: `${meta.name} Check`,
                      dieSides: die,
                      baseModifier: mod
                    })
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: `1px solid ${meta.color}40`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.25rem' }}>{meta.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>{meta.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{meta.description}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '6px 12px',
                      borderRadius: 9,
                      background: `${meta.color}22`,
                      border: `1px solid ${meta.color}`,
                      color: meta.color,
                      fontWeight: 900,
                      fontSize: '0.98rem',
                      flexShrink: 0
                    }}
                  >
                    🎲 {formatDie(die, mod)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trained Skills Panel */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>
              🎯 TRAINED SKILLS ({trainedSkills.length})
            </h3>
            <button
              onClick={() =>
                onRollTrait({
                  label: 'Unskilled Roll',
                  dieSides: 4,
                  isUnskilled: true,
                  baseModifier: 0
                })
              }
              style={{
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-secondary)',
                fontSize: '0.74rem',
                fontWeight: 700
              }}
            >
              🎲 Unskilled (d4-2)
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
              gap: 8
            }}
          >
            {trainedSkills.map((sk) => {
              const attrMeta = ATTRIBUTE_META[sk.linkedAttribute];
              const skillMods = calculateSkillRollModifiers(character, sk.skillId, sk.name);
              return (
                <button
                  key={sk.skillId}
                  onClick={() =>
                    onRollTrait({
                      label: sk.name,
                      skillId: sk.skillId,
                      dieSides: sk.die as DieSides,
                      baseModifier: sk.modifier + (ps.aiming && sk.skillId === 'shooting' ? 2 : 0)
                    })
                  }
                  title={skillMods.breakdown.length > 0 ? skillMods.breakdown.join(' • ') : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 11px',
                    borderRadius: 10,
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: `1px solid ${skillMods.totalMod !== 0 ? (skillMods.totalMod > 0 ? '#38bdf8' : '#ef4444') : 'var(--border-subtle)'}`,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.83rem',
                        fontWeight: 700,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {sk.name}
                    </div>
                    <div style={{ fontSize: '0.66rem', color: attrMeta.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>{attrMeta.short} {sk.isCore ? '• Core' : ''}</span>
                      {skillMods.totalMod !== 0 && (
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            padding: '0 4px',
                            borderRadius: 4,
                            background: skillMods.totalMod > 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                            color: skillMods.totalMod > 0 ? '#38bdf8' : '#ef4444'
                          }}
                        >
                          {skillMods.totalMod > 0 ? `+${skillMods.totalMod}` : skillMods.totalMod} Perk
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 7,
                      background: 'rgba(245, 158, 11, 0.16)',
                      color: '#fbbf24',
                      fontWeight: 900,
                      fontSize: '0.84rem',
                      marginLeft: 6
                    }}
                  >
                    {formatDie(sk.die, sk.modifier)}
                  </span>
                </button>
              );
            })}
          </div>

          {unskilledSkills.length > 0 && (
            <details style={{ marginTop: 12 }}>
              <summary style={{ fontSize: '0.76rem', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
                Show {unskilledSkills.length} Unskilled Skills (d4-2)
              </summary>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginTop: 8
                }}
              >
                {unskilledSkills.map((sk) => (
                  <button
                    key={sk.skillId}
                    onClick={() =>
                      onRollTrait({
                        label: sk.name,
                        skillId: sk.skillId,
                        dieSides: 4,
                        isUnskilled: true,
                        baseModifier: sk.modifier
                      })
                    }
                    style={{
                      padding: '5px 9px',
                      borderRadius: 7,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.73rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {sk.name} (d4-2)
                  </button>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* WEAPONS & COMBAT ACTIONS */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: 16
        }}
      >
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ef4444', marginBottom: 12 }}>
          ⚔️ WEAPONS & ATTACKS
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 10
          }}
        >
          {character.weapons.map((wpn) => {
            const isMelee = wpn.category === 'Melee';
            const skillId = isMelee ? 'fighting' : wpn.category === 'Thrown' ? 'athletics' : 'shooting';
            const linkedSkill = character.skills.find((s) => s.skillId === skillId);
            const hasTrademark = character.edges.some((e) => e.edgeId === 'trademark_weapon');
            const aimBonus = !isMelee && ps.aiming ? 2 : 0;

            return (
              <div
                key={wpn.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 10
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>{wpn.name}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 7px',
                        borderRadius: 6,
                        background: 'rgba(239, 68, 68, 0.18)',
                        color: '#fca5a5',
                        fontWeight: 800
                      }}
                    >
                      Dmg: {wpn.damage} {wpn.ap > 0 ? `(AP ${wpn.ap})` : ''}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 3 }}>
                    Range: {wpn.range} • RoF: {wpn.rof} • Min Str: d{wpn.minStr}
                    {wpn.notes ? ` • ${wpn.notes}` : ''}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                  <button
                    onClick={() =>
                      onRollTrait({
                        label: `${wpn.name} (${linkedSkill?.name || 'Attack'})`,
                        skillId: linkedSkill?.skillId,
                        dieSides: (linkedSkill && linkedSkill.die > 0 ? linkedSkill.die : 4) as DieSides,
                        isUnskilled: !linkedSkill || linkedSkill.die === 0,
                        baseModifier: (linkedSkill?.modifier || 0) + (hasTrademark ? 1 : 0) + aimBonus
                      })
                    }
                    style={{
                      padding: '7px 8px',
                      borderRadius: 8,
                      background: 'rgba(56, 189, 248, 0.16)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#38bdf8',
                      fontSize: '0.74rem',
                      fontWeight: 800
                    }}
                  >
                    🎯 Attack
                  </button>
                  <button
                    onClick={() =>
                      onRollDamage({
                        label: `${wpn.name} Damage`,
                        damageFormula: wpn.damage,
                        bonusRaiseD6: false
                      })
                    }
                    style={{
                      padding: '7px 8px',
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.18)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#fca5a5',
                      fontSize: '0.74rem',
                      fontWeight: 800
                    }}
                  >
                    💥 Damage
                  </button>
                  <button
                    onClick={() =>
                      onRollDamage({
                        label: `${wpn.name} Raise Damage`,
                        damageFormula: wpn.damage,
                        bonusRaiseD6: true
                      })
                    }
                    style={{
                      padding: '7px 8px',
                      borderRadius: 8,
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.45)',
                      color: '#fbbf24',
                      fontSize: '0.74rem',
                      fontWeight: 800
                    }}
                  >
                    🔥 +d6 Raise
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ARCANE POWERS & POWER POINTS (If Arcane Background Active) */}
      {(character.arcaneBackgroundId !== 'none' || character.powers.length > 0) && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: 16,
            padding: 16
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 12
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc' }}>
                ✨ {arcaneBg?.name || 'Arcane Powers'}
              </h3>
              <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                Arcane Skill: {arcaneBg?.arcaneSkillName || 'Spellcasting'}
              </div>
            </div>

            {/* Power Points Tracker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                onClick={() => updatePlayState({ currentPowerPoints: Math.max(0, ps.currentPowerPoints - 1) })}
                style={{
                  padding: '5px 10px',
                  borderRadius: 7,
                  background: 'rgba(255, 255, 255, 0.08)',
                  fontWeight: 800,
                  fontSize: '0.8rem'
                }}
              >
                -1 PP
              </button>
              <div
                style={{
                  padding: '5px 12px',
                  borderRadius: 8,
                  background: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid #a855f7',
                  color: '#e9d5ff',
                  fontWeight: 900,
                  fontSize: '0.88rem'
                }}
              >
                ⚡ {ps.currentPowerPoints} / {derived.maxPowerPoints} PP
              </div>
              <button
                onClick={() =>
                  updatePlayState({
                    currentPowerPoints: Math.min(derived.maxPowerPoints, ps.currentPowerPoints + 5)
                  })
                }
                style={{
                  padding: '5px 10px',
                  borderRadius: 7,
                  background: 'rgba(168, 85, 247, 0.25)',
                  color: '#d8b4fe',
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}
              >
                +5 Recharge
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 10
            }}
          >
            {character.powers.map((pwr) => {
              const arcaneSk = character.skills.find((s) => s.skillId === arcaneBg?.arcaneSkillId);
              const ppCost = parseInt(pwr.powerPoints, 10) || 1;

              return (
                <div
                  key={pwr.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(168, 85, 247, 0.28)',
                    borderRadius: 12,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 8
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>{pwr.name}</span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '2px 8px',
                          borderRadius: 99,
                          background: 'rgba(168, 85, 247, 0.22)',
                          color: '#d8b4fe',
                          fontWeight: 800
                        }}
                      >
                        {pwr.powerPoints} PP
                      </span>
                    </div>
                    {pwr.trapping && (
                      <div style={{ fontSize: '0.74rem', color: '#fbbf24', fontWeight: 600, marginTop: 2 }}>
                        Trapping: {pwr.trapping}
                      </div>
                    )}
                    <div style={{ fontSize: '0.71rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Range: {pwr.range} • Dur: {pwr.duration}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      {pwr.summary}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => {
                        if (ps.currentPowerPoints >= ppCost) {
                          updatePlayState({ currentPowerPoints: ps.currentPowerPoints - ppCost });
                        }
                        onRollTrait({
                          label: `Cast ${pwr.name} (${arcaneSk?.name || 'Arcane'})`,
                          skillId: arcaneSk?.skillId,
                          dieSides: (arcaneSk && arcaneSk.die > 0 ? arcaneSk.die : 4) as DieSides,
                          isUnskilled: !arcaneSk || arcaneSk.die === 0,
                          baseModifier: arcaneSk?.modifier || 0
                        });
                      }}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: 8,
                        background: 'rgba(168, 85, 247, 0.24)',
                        border: '1px solid #a855f7',
                        color: '#e9d5ff',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}
                    >
                      ✨ Cast (-{ppCost} PP)
                    </button>
                    {pwr.damage && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button
                          onClick={() =>
                            onRollDamage({
                              label: `${pwr.name} Damage`,
                              damageFormula: pwr.damage!,
                              bonusRaiseD6: false
                            })
                          }
                          title="Roll Spell Damage"
                          style={{
                            padding: '7px 9px',
                            borderRadius: 8,
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid #ef4444',
                            color: '#fca5a5',
                            fontSize: '0.74rem',
                            fontWeight: 800
                          }}
                        >
                          💥 {pwr.damage}
                        </button>
                        <button
                          onClick={() =>
                            onRollDamage({
                              label: `${pwr.name} Raise Damage`,
                              damageFormula: pwr.damage!,
                              bonusRaiseD6: true
                            })
                          }
                          title="Roll Spell Damage with +1d6 Attack Raise Bonus"
                          style={{
                            padding: '7px 9px',
                            borderRadius: 8,
                            background: 'rgba(245, 158, 11, 0.22)',
                            border: '1px solid rgba(245, 158, 11, 0.55)',
                            color: '#fbbf24',
                            fontSize: '0.74rem',
                            fontWeight: 800
                          }}
                        >
                          🔥 +d6 Raise
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EDGES, HINDRANCES & ANCESTRY TRAITS QUICK REFERENCE */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12
        }}
      >
        {/* Edges */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 14
          }}
        >
          <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fbbf24', marginBottom: 8 }}>
            🏅 EDGES ({character.edges.length})
          </h4>
          {character.edges.length === 0 ? (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No Edges selected yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {character.edges.map((ed, idx) => (
                <div
                  key={`${ed.edgeId}_${idx}`}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 9,
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>{ed.name}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>{ed.summary}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hindrances & Ancestry Traits */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 14
          }}
        >
          <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#f87171', marginBottom: 8 }}>
            ⚠️ HINDRANCES & ANCESTRY ({ancestry?.name})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {character.hindrances.map((h, idx) => (
              <div
                key={`${h.hindranceId}_${idx}`}
                style={{
                  padding: '8px 10px',
                  borderRadius: 9,
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(239, 68, 68, 0.25)'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fca5a5' }}>
                  {h.name} ({h.severity})
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>{h.summary}</div>
              </div>
            ))}
            {ancestry?.traits.map((t, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 10px',
                  borderRadius: 9,
                  background: 'rgba(56, 189, 248, 0.06)',
                  border: '1px solid rgba(56, 189, 248, 0.2)'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#38bdf8' }}>
                  {ancestry.name}: {t.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{t.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
