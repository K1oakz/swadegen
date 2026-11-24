import React from 'react';
import { SwadeCharacter } from '../types/swade';
import { StarshipVessel } from '../types/starship';
import { calculateDerivedStats } from '../utils/swadeRules';
import { calculateStarshipStats } from '../utils/starshipRules';

interface HomeHubViewProps {
  characters: SwadeCharacter[];
  activeCharacter: SwadeCharacter;
  starships: StarshipVessel[];
  activeStarship: StarshipVessel;
  onEnterCharacters: (mode?: 'roster' | 'builder' | 'play') => void;
  onEnterVehicles: (subTab?: 'bridge' | 'shipyard' | 'hangar') => void;
  onCreateCharacter: () => void;
  onOpenDiceTray: () => void;
  onOpenBackup: () => void;
}

export const HomeHubView: React.FC<HomeHubViewProps> = ({
  characters,
  activeCharacter,
  starships,
  activeStarship,
  onEnterCharacters,
  onEnterVehicles,
  onCreateCharacter,
  onOpenDiceTray,
  onOpenBackup
}) => {
  const charDerived = calculateDerivedStats(activeCharacter);
  const shipStats = calculateStarshipStats(activeStarship);

  const wildCardsCount = characters.filter((c) => c.isWildCard).length;
  const extrasCount = characters.filter((c) => !c.isWildCard).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100, margin: '0 auto', padding: '10px 0 40px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(30, 25, 20, 0.85) 60%, rgba(14, 23, 38, 0.95) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.4)',
          borderRadius: 20,
          padding: '28px 24px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.55)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 900,
              color: 'var(--accent-gold-bright)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 6
            }}
          >
            SAVAGE WORLDS ADVENTURE EDITION
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 950,
              color: '#fff',
              margin: '0 0 8px 0',
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            Command & Roster Hub
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Select an operational category below to manage your roster of Wild Cards and Extras,
            or step into the shipyard to commission and crew space vessels.
          </p>
        </div>

        {/* Quick Utility Launchers */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={onOpenDiceTray}
            style={{
              padding: '10px 16px',
              borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              fontWeight: 800,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <span>Dice Tray</span>
          </button>
          <button
            onClick={onOpenBackup}
            style={{
              padding: '10px 16px',
              borderRadius: 12,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <span>Backup & Sync</span>
          </button>
        </div>
      </div>

      {/* Main Categories Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20
        }}
      >
        {/* ========================================= */}
        {/* CATEGORY 1: CHARACTERS                   */}
        {/* ========================================= */}
        <div
          style={{
            background: 'linear-gradient(180deg, #1f1a14 0%, #15110d 100%)',
            border: '2px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 20,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
            gap: 18
          }}
        >
          <div>
            {/* Header Badge & Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#fbbf24',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(245, 158, 11, 0.4)'
                }}
              >
                CORE & SCI-FI HEROES
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {characters.length} Registered
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>
              Characters
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.45 }}>
              Hero creation, compendium sourcebooks, race/robot options, edges, hindrances, powers, and live play sheets with exploding dice rolls.
            </p>

            {/* Quick Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 16
              }}
            >
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '8px 12px'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Wild Cards
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fbbf24' }}>
                  {wildCardsCount}
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '8px 12px'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Extras
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#94a3b8' }}>
                  {extrasCount}
                </div>
              </div>
            </div>

            {/* Active Character Spotlight */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-strong)',
                borderRadius: 14,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #2a221b 0%, #1a1511 100%)',
                  border: '1.5px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: 'var(--accent-gold-bright)',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                {activeCharacter.avatarImage ? (
                  <img
                    src={activeCharacter.avatarImage}
                    alt={activeCharacter.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>{activeCharacter.name.trim().charAt(0).toUpperCase() || 'H'}</span>
                )}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: '0.96rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeCharacter.name}
                  </span>
                  {activeCharacter.isWildCard && (
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24' }}>
                      WC
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {charDerived.rank} • {activeCharacter.concept || 'Adventurer'}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 3 }}>
                  Pace {charDerived.pace}" • Parry {charDerived.parry} • Toughness {charDerived.toughnessTotal} ({charDerived.armorBonus})
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => onEnterCharacters('roster')}
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#110d08',
                fontWeight: 900,
                fontSize: '0.86rem',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
              }}
            >
              Open Character Roster
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                onClick={() => onEnterCharacters('play')}
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'rgba(239, 68, 68, 0.16)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Play Sheet
              </button>
              <button
                onClick={onCreateCharacter}
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                + Create Hero
              </button>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* CATEGORY 2: VEHICLES & STARSHIPS          */}
        {/* ========================================= */}
        <div
          style={{
            background: 'linear-gradient(180deg, #0e1726 0%, #090e18 100%)',
            border: '2px solid rgba(14, 165, 233, 0.35)',
            borderRadius: 20,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
            gap: 18
          }}
        >
          <div>
            {/* Header Badge & Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: 'rgba(14, 165, 233, 0.2)',
                  color: '#38bdf8',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(14, 165, 233, 0.4)'
                }}
              >
                SCI-FI COMPANION
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>
                {starships.length} in Fleet
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#f8fafc', margin: '0 0 6px 0' }}>
              Vehicles & Starships
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0 0 16px 0', lineHeight: 1.45 }}>
              Starship customization from Small fighters to World Ships. Install deflector shields, weapon batteries with firing arcs, hyperspace astrogation, and run bridge consoles.
            </p>

            {/* Quick Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 16
              }}
            >
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid #1e293b',
                  borderRadius: 10,
                  padding: '8px 12px'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                  Flagship Frame
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#38bdf8' }}>
                  {activeStarship.sizeCategory}
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid #1e293b',
                  borderRadius: 10,
                  padding: '8px 12px'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                  Weapon Mounts
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fca5a5' }}>
                  {activeStarship.weapons.length} Active
                </div>
              </div>
            </div>

            {/* Active Starship Spotlight */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #1e293b',
                borderRadius: 14,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                  border: '1.5px solid #38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.35)'
                }}
              >
                SHIP
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: '0.96rem', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeStarship.name}
                  </span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
                    {activeStarship.registry || 'FLAGSHIP'}
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2 }}>
                  {activeStarship.classModel} • Size {activeStarship.size}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 3 }}>
                  Toughness {shipStats.finalToughness} ({shipStats.finalArmor}) • Handling {shipStats.finalHandling >= 0 ? `+${shipStats.finalHandling}` : shipStats.finalHandling} • Shields {activeStarship.shields}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => onEnterVehicles('hangar')}
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.86rem',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)'
              }}
            >
              Open Fleet Hangar
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                onClick={() => onEnterVehicles('bridge')}
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'rgba(14, 165, 233, 0.16)',
                  border: '1px solid rgba(14, 165, 233, 0.4)',
                  color: '#38bdf8',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Bridge Console
              </button>
              <button
                onClick={() => onEnterVehicles('shipyard')}
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'rgba(245, 158, 11, 0.16)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  color: '#fbbf24',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Shipyard Customizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
