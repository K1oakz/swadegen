import React, { useState } from 'react';
import { DieSides, RollLogEntry, SwadeCharacter } from '../types/swade';
import { DIE_STEPS } from '../data/swadeData';

interface DiceRollerModalProps {
  character: SwadeCharacter;
  rollHistory: RollLogEntry[];
  onClose: () => void;
  onClearHistory: () => void;
  onRollTrait: (params: {
    label: string;
    dieSides: DieSides;
    skillId?: string;
    isUnskilled?: boolean;
    baseModifier?: number;
    targetNumber?: number;
  }) => void;
  onRerollWithBenny: (entry: RollLogEntry) => void;
}

export const DiceRollerModal: React.FC<DiceRollerModalProps> = ({
  character,
  rollHistory,
  onClose,
  onClearHistory,
  onRollTrait,
  onRerollWithBenny
}) => {
  const [customMod, setCustomMod] = useState(0);
  const [targetNumber, setTargetNumber] = useState(4);

  const latestRoll = rollHistory[0];
  const hasElan = character.edges.some((e) => e.edgeId === 'elan');
  const hasNoMercy = character.edges.some((e) => e.edgeId === 'no_mercy');

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 560,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '2px solid var(--border-strong)',
          borderRadius: 20,
          padding: 18,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: '1.08rem', fontWeight: 900, color: '#fbbf24' }}>
              🎲 SAVAGE WORLDS EXPLODING DICE TRAY
            </h3>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              {character.isWildCard
                ? 'Wild Card: Rolls Trait Die + d6 Wild Die (Takes Highest • Aces Explode!)'
                : 'Extra: Rolls Trait Die only (Aces Explode!)'}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'rgba(255, 255, 255, 0.08)',
              fontWeight: 800
            }}
          >
            ✕
          </button>
        </div>

        {/* 1. TOP SPOTLIGHT: LATEST ROLL RESULTS */}
        {latestRoll ? (
          <div
            style={{
              background: latestRoll.isCriticalFailure
                ? 'linear-gradient(135deg, rgba(153, 27, 27, 0.45), rgba(69, 10, 10, 0.6))'
                : latestRoll.raises > 0
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(180, 83, 9, 0.2))'
                : latestRoll.isSuccess
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(20, 83, 45, 0.25))'
                : 'rgba(0, 0, 0, 0.45)',
              border: `2px solid ${
                latestRoll.isCriticalFailure
                  ? '#ef4444'
                  : latestRoll.raises > 0
                  ? '#fbbf24'
                  : latestRoll.isSuccess
                  ? '#22c55e'
                  : 'var(--border-subtle)'
              }`,
              borderRadius: 16,
              padding: 16,
              marginBottom: 14
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                  {latestRoll.characterName} • {latestRoll.rollType === 'damage' ? 'DAMAGE ROLL' : `TARGET NUMBER ${latestRoll.targetNumber}`}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>
                  {latestRoll.label}
                </div>
              </div>

              {/* Result Badge */}
              <div
                className={
                  latestRoll.traitDieResult.acedCount > 0 || (latestRoll.wildDieResult?.acedCount || 0) > 0
                    ? 'ace-badge'
                    : ''
                }
                style={{
                  padding: '5px 12px',
                  borderRadius: 99,
                  fontWeight: 900,
                  fontSize: '0.82rem',
                  background: latestRoll.isCriticalFailure
                    ? '#ef4444'
                    : latestRoll.raises > 0
                    ? '#f59e0b'
                    : latestRoll.isSuccess
                    ? '#22c55e'
                    : 'rgba(255, 255, 255, 0.12)',
                  color: latestRoll.raises > 0 ? '#110d08' : '#fff'
                }}
              >
                {latestRoll.isCriticalFailure
                  ? '💀 CRITICAL FAILURE!'
                  : latestRoll.rollType === 'damage'
                  ? `💥 ${latestRoll.finalTotal} DAMAGE`
                  : latestRoll.raises > 0
                  ? `🔥 SUCCESS + ${latestRoll.raises} RAISE${latestRoll.raises > 1 ? 'S' : ''}!`
                  : latestRoll.isSuccess
                  ? '✅ SUCCESS'
                  : '❌ FAILURE'}
              </div>
            </div>

            {/* Big Final Number & Breakdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                flexWrap: 'wrap',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 700 }}>
                  {latestRoll.rollType === 'damage' ? 'Damage Die 1' : 'Trait Die'} (d{latestRoll.traitDieResult.sides}):{' '}
                  <span style={{ color: '#38bdf8' }}>
                    [{latestRoll.traitDieResult.rolls.join(' + ')}] = {latestRoll.traitDieResult.total}
                  </span>
                  {latestRoll.traitDieResult.acedCount > 0 && (
                    <span style={{ marginLeft: 6, color: '#fbbf24', fontWeight: 900 }}>
                      ⚡ ACED{latestRoll.traitDieResult.acedCount > 1 ? ` x${latestRoll.traitDieResult.acedCount}` : ''}!
                    </span>
                  )}
                </div>

                {latestRoll.usedWildDie && latestRoll.wildDieResult && (
                  <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 700 }}>
                    Wild Die (d6):{' '}
                    <span style={{ color: '#fbbf24' }}>
                      [{latestRoll.wildDieResult.rolls.join(' + ')}] = {latestRoll.wildDieResult.total}
                    </span>
                    {latestRoll.wildDieResult.acedCount > 0 && (
                      <span style={{ marginLeft: 6, color: '#fbbf24', fontWeight: 900 }}>
                        ⚡ ACED x{latestRoll.wildDieResult.acedCount}!
                      </span>
                    )}
                  </div>
                )}

                {latestRoll.extraDiceResults &&
                  latestRoll.extraDiceResults.map((ex, idx) => {
                    const isRaiseDie = latestRoll.rollType === 'damage' &&
                      latestRoll.label.includes('Raise') &&
                      idx === latestRoll.extraDiceResults!.length - 1;
                    const dieLabel = latestRoll.rollType === 'damage'
                      ? (isRaiseDie ? '🔥 Raise Bonus Die' : `Damage Die ${idx + 2}`)
                      : `Bonus Die`;
                    return (
                      <div key={idx} style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 700 }}>
                        {dieLabel} (d{ex.sides}):{' '}
                        <span style={{ color: isRaiseDie ? '#fbbf24' : '#fca5a5' }}>
                          [{ex.rolls.join(' + ')}] = {ex.total}
                        </span>
                        {ex.acedCount > 0 && (
                          <span style={{ marginLeft: 6, color: '#fbbf24', fontWeight: 900 }}>
                            ⚡ ACED{ex.acedCount > 1 ? ` x${ex.acedCount}` : ''}!
                          </span>
                        )}
                      </div>
                    );
                  })}

                {latestRoll.modifierBreakdown.length > 0 && (
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                    Modifiers: {latestRoll.modifierBreakdown.join(' • ')}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>
                  {latestRoll.finalTotal}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  FINAL TOTAL
                </div>
              </div>
            </div>

            {/* Spend Benny to Reroll Button (Not allowed on Critical Failure!) */}
            {!latestRoll.isCriticalFailure && latestRoll.canRerollParams && (
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => onRerollWithBenny(latestRoll)}
                  disabled={character.playState.bennies <= 0}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: 10,
                    background:
                      character.playState.bennies > 0
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : 'rgba(255, 255, 255, 0.06)',
                    color: character.playState.bennies > 0 ? '#110d08' : 'var(--text-muted)',
                    fontWeight: 900,
                    fontSize: '0.82rem'
                  }}
                >
                  🪙 Spend 1 Benny to Reroll ({character.playState.bennies} left)
                  {latestRoll.rollType === 'trait' && hasElan ? ' [+2 Elan Bonus!]' : ''}
                  {latestRoll.rollType === 'damage' && hasNoMercy ? ' [+2 No Mercy Bonus!]' : ''}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '16px 12px',
              color: 'var(--text-muted)',
              fontSize: '0.84rem',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: 14,
              border: '1px dashed var(--border-subtle)',
              marginBottom: 14
            }}
          >
            🎲 Tap any Trait or Weapon on your Character Sheet or use the dice below to roll!
          </div>
        )}

        {/* 2. MIDDLE: QUICK CUSTOM DIE ROLLER */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 14,
            padding: 12,
            marginBottom: 14
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>TN:</span>
              {[4, 5, 6, 7, 8].map((tn) => (
                <button
                  key={tn}
                  onClick={() => setTargetNumber(tn)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background: targetNumber === tn ? '#f59e0b' : 'rgba(255,255,255,0.07)',
                    color: targetNumber === tn ? '#110d08' : 'var(--text-secondary)'
                  }}
                >
                  {tn}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>MOD:</span>
              <button
                onClick={() => setCustomMod(customMod - 1)}
                style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', fontWeight: 800 }}
              >
                −
              </button>
              <span style={{ fontWeight: 900, fontSize: '0.85rem', minWidth: 24, textAlign: 'center' }}>
                {customMod >= 0 ? `+${customMod}` : customMod}
              </span>
              <button
                onClick={() => setCustomMod(customMod + 1)}
                style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', fontWeight: 800 }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            <button
              onClick={() =>
                onRollTrait({
                  label: 'Unskilled Check',
                  dieSides: 4,
                  isUnskilled: true,
                  baseModifier: customMod,
                  targetNumber
                })
              }
              style={{
                padding: '9px 4px',
                borderRadius: 9,
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.76rem',
                fontWeight: 800,
                color: 'var(--text-secondary)'
              }}
            >
              d4-2
            </button>
            {DIE_STEPS.map((d) => (
              <button
                key={d}
                onClick={() =>
                  onRollTrait({
                    label: `Custom d${d} Roll`,
                    dieSides: d,
                    baseModifier: customMod,
                    targetNumber
                  })
                }
                style={{
                  padding: '9px 4px',
                  borderRadius: 9,
                  background: 'rgba(245, 158, 11, 0.18)',
                  border: '1px solid rgba(245, 158, 11, 0.45)',
                  fontSize: '0.84rem',
                  fontWeight: 900,
                  color: '#fbbf24'
                }}
              >
                🎲 d{d}
              </button>
            ))}
          </div>
        </div>

        {/* 3. BOTTOM: ROLL HISTORY LOG */}
        {rollHistory.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                📜 RECENT ROLL LOG ({rollHistory.length})
              </span>
              <button
                onClick={onClearHistory}
                style={{ fontSize: '0.72rem', color: '#fca5a5', fontWeight: 700 }}
              >
                Clear Log
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto' }}>
              {rollHistory.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    padding: '8px 11px',
                    borderRadius: 9,
                    background: idx === 0 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0, 0, 0, 0.3)',
                    border: idx === 0 ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem'
                  }}
                >
                  <div style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>
                    <strong style={{ color: idx === 0 ? '#fbbf24' : '#fff' }}>{item.label}</strong>
                    <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: '0.73rem' }}>
                      (d{item.traitDieResult.sides}: {item.traitDieResult.total}
                      {item.usedWildDie && item.wildDieResult ? ` | Wild: ${item.wildDieResult.total}` : ''})
                    </span>
                  </div>
                  <span
                    style={{
                      fontWeight: 900,
                      whiteSpace: 'nowrap',
                      color: item.isCriticalFailure
                        ? '#ef4444'
                        : item.rollType === 'damage'
                        ? '#fca5a5'
                        : item.raises > 0
                        ? '#fbbf24'
                        : item.isSuccess
                        ? '#4ade80'
                        : 'var(--text-muted)'
                    }}
                  >
                    {item.finalTotal} {item.rollType !== 'damage' && item.raises > 0 ? `(+${item.raises}R)` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
