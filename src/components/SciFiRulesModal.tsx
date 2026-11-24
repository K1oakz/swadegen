import React, { useState } from 'react';
import { VEHICLE_OUT_OF_CONTROL_TABLE, rollOutOfControl, TableResult } from '../utils/scifiCraftRules';

interface SciFiRulesModalProps {
  onClose: () => void;
}

export const SciFiRulesModal: React.FC<SciFiRulesModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'walkers' | 'power_armor' | 'space' | 'tables'>('vehicles');
  const [lastRoll, setLastRoll] = useState<TableResult | null>(null);

  const handleRollOutOfControl = () => {
    setLastRoll(rollOutOfControl());
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          maxHeight: '92vh',
          background: 'linear-gradient(180deg, #131722 0%, #0c0e17 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.45)',
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(245, 158, 11, 0.08)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SAVAGE WORLDS ADVENTURE EDITION
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 950, color: '#fff', margin: '2px 0 0' }}>
              Sci-Fi Companion Rules Reference
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: '#94a3b8',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '10px 22px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderBottom: '1px solid #1e293b',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'vehicles', label: 'Ground & Air Vehicles' },
            { id: 'walkers', label: 'Combat Walkers & Mechs' },
            { id: 'power_armor', label: 'Power Armor & Battlesuits' },
            { id: 'tables', label: 'Out of Control Table' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 800,
                background: activeTab === tab.id ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                color: activeTab === tab.id ? '#fbbf24' : '#94a3b8',
                border: activeTab === tab.id ? '1px solid rgba(245, 158, 11, 0.45)' : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', lineHeight: 1.6, fontSize: '0.88rem', color: '#cbd5e1' }}>
          {/* VEHICLES TAB */}
          {activeTab === 'vehicles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ color: '#fbbf24', margin: '0 0 6px 0', fontSize: '1.15rem' }}>
                Vehicle Operations & Combat Rules
              </h3>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Handling & Driving / Piloting:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  A vehicle's Handling modifier applies to all maneuver checks made with Driving (ground/hovercraft) or Piloting (air/space).
                  A Critical Failure on a maneuver check immediately triggers a roll on the <em>Out of Control Table</em>.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Heavy Armor & Heavy Weapons:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Vehicles marked with <strong>Heavy Armor</strong> cannot be damaged by conventional small arms or standard attacks, regardless of the roll total.
                  Only attacks designated as <strong>Heavy Weapons</strong> (such as autocannons, anti-tank missiles, railguns, and laser cannons) can penetrate their hull.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Ramming & Collisions:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  A driver who intentionally rams an obstacle or vehicle makes an opposed Driving check (+2 if faster, +2 if larger).
                  Damage is calculated using the rammer's Size and Top Speed divided by 10 (e.g., Size 3 vehicle at 60 MPH inflicts 3d6 damage). Both vehicles take damage; the heavier vehicle reduces damage taken by its Size difference.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Wounds & Incapacitation:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Every raise on a damage roll exceeding the vehicle's Toughness inflicts 1 Wound (up to its max wounds, typically 3 to 4).
                  Each Wound imposes a cumulative -1 penalty to Handling and Top Speed (reduced by 10%).
                  When a vehicle suffers its maximum Wounds, it is <strong>Wrecked</strong> or explodes on an Ace on 1d6.
                </p>
              </div>
            </div>
          )}

          {/* WALKERS TAB */}
          {activeTab === 'walkers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ color: '#fbbf24', margin: '0 0 6px 0', fontSize: '1.15rem' }}>
                Combat Walkers & Mechs Rules
              </h3>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Tactical Walker Movement:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Unlike wheeled vehicles, Walkers move using <strong>Pace</strong> in inches/tabletop squares (e.g. Pace 8, Running d6).
                  Walkers ignore Difficult Ground (rubble, marsh, mud, obstacles up to their knee height) without speed penalty.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>360-Degree Torso Twist:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Walkers can twist their upper torso independently of their leg chassis as a free action.
                  This permits arm and torso-mounted weapons to engage targets in any arc (360 degrees) while walking or sprinting in another direction.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Stomp & Melee Attacks:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  A walker can execute a crushing <strong>Stomp</strong> against ground infantry or smaller vehicles:
                  <br />• Scout Walker: Str + d6 (AP 2)
                  <br />• Combat Walker: Str + d8 (AP 4, Heavy Weapon)
                  <br />• Heavy Assault Walker: Str + d10 (AP 6, Heavy Weapon)
                  <br />• Colossus / Titan: Str + d12 (AP 10, Mega-Stomp, Medium Blast Template)
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Jump Jets:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Walkers equipped with Vectored Jump Jets can leap up to 12" horizontally or 6" vertically as part of their movement.
                  Landing on a target inflicts Stomp damage and forces the target to make an Agility check or be knocked Prone and Shaken.
                </p>
              </div>
            </div>
          )}

          {/* POWER ARMOR TAB */}
          {activeTab === 'power_armor' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ color: '#fbbf24', margin: '0 0 6px 0', fontSize: '1.15rem' }}>
                Power Armor & Battlesuits Rules
              </h3>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Wearer Strength Augmentation:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Power armor frames utilize motorized myomer artificial musculature to amplify the pilot's natural physical Strength:
                  <br />• <strong>Scout Exosuit:</strong> +1 Strength die step (e.g. d8 becomes d10; minimum d8).
                  <br />• <strong>Combat Power Armor:</strong> +2 Strength die steps (minimum d10).
                  <br />• <strong>Heavy Assault Battlesuit:</strong> +3 Strength die steps (minimum d12+1).
                  <br />• <strong>Dreadnought / Titan:</strong> +4 Strength die steps (minimum d12+3).
                  <br />This enhanced Strength applies to all melee damage rolls, lifting capacity, and heavy weapon minimum Strength requirements.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Armor & Toughness Coverage:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Power armor covers the entire body (Torso, Arms, Legs, and Head with sealed helmet).
                  The armor bonus stacks with the wearer's Vigor to determine the total Toughness.
                  Heavy Battlesuits grant the <strong>Heavy Armor</strong> quality, protecting the soldier against non-Heavy Weapons.
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Sealed Environmental Life Support:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  All military combat power armor features sealed internal micro-climate regulators.
                  The wearer is completely immune to toxic gases, chemical/biological weapons, vacuum decompression, and extreme thermal conditions for the duration of the suit's oxygen scrubber (typically 8 to 24 hours).
                </p>
              </div>

              <div style={{ background: '#0f172a', padding: 14, borderRadius: 12, border: '1px solid #1e293b' }}>
                <strong style={{ color: '#38bdf8' }}>Integrated Hardpoint Weapons:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                  Weapons installed on forearm mounts, shoulder racks, or wrist locks do not count toward hand encumbrance.
                  The wearer can still use their hands to climb, manipulate equipment, or carry standard carbines while firing integrated suit weapons.
                </p>
              </div>
            </div>
          )}

          {/* OUT OF CONTROL TABLE */}
          {activeTab === 'tables' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.15rem' }}>
                  Out of Control Table (2d6)
                </h3>
                <button
                  onClick={handleRollOutOfControl}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  🎲 Roll 2d6 Table
                </button>
              </div>

              {lastRoll && (
                <div style={{ padding: 14, background: 'rgba(239, 68, 68, 0.15)', borderRadius: 12, border: '1.5px solid #ef4444' }}>
                  <div style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 900 }}>
                    ROLLED {lastRoll.roll}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff', marginTop: 2 }}>
                    {lastRoll.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: 4 }}>
                    {lastRoll.description}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {VEHICLE_OUT_OF_CONTROL_TABLE.map((row) => (
                  <div
                    key={row.roll}
                    style={{
                      padding: '10px 14px',
                      background: '#0f172a',
                      borderRadius: 10,
                      border: '1px solid #1e293b',
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start'
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 9px',
                        borderRadius: 6,
                        background: '#1e293b',
                        color: '#fbbf24',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        flexShrink: 0
                      }}
                    >
                      {row.roll}
                    </span>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{row.title}</strong>
                      <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
                        {row.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
