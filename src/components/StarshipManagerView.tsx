import React, { useState, useEffect } from 'react';
import {
  StarshipVessel,
  StarshipSizeCategory,
  InstalledStarshipMod,
  InstalledStarshipWeapon,
  WeaponArc
} from '../types/starship';
import {
  STARSHIP_FRAMES,
  STARSHIP_MODIFICATIONS,
  STARSHIP_WEAPONS_CATALOG,
  STOCK_STARSHIPS
} from '../data/starshipData';
import {
  calculateStarshipStats,
  createBlankStarship,
  getFrameDef,
  rollAstrogationMishap
} from '../utils/starshipRules';
import { CraftWizardModal } from './CraftWizardModal';
import { SciFiRulesModal } from './SciFiRulesModal';
import { STOCK_SCIFI_CRAFT } from '../data/scifiCraftData';
import { convertCraftToVessel, rollOutOfControl, TableResult } from '../utils/scifiCraftRules';

interface StarshipManagerViewProps {
  starships: StarshipVessel[];
  activeStarshipId: string;
  initialSubTab?: 'bridge' | 'shipyard' | 'hangar';
  onSelectStarship: (id: string) => void;
  onUpdateActiveStarship: (updates: Partial<StarshipVessel>) => void;
  onCreateStarship: (vessel: StarshipVessel) => void;
  onDeleteStarship: (id: string) => void;
  onDuplicateStarship: (id: string) => void;
  onRollDamage?: (damageFormula: string, label: string) => void;
  onRollTrait?: (params: { label: string; sides: number; modifier: number; isWildCard: boolean }) => void;
  onGoHome?: () => void;
}

export const StarshipManagerView: React.FC<StarshipManagerViewProps> = ({
  starships,
  activeStarshipId,
  initialSubTab,
  onSelectStarship,
  onUpdateActiveStarship,
  onCreateStarship,
  onDeleteStarship,
  onDuplicateStarship,
  onRollDamage,
  onRollTrait,
  onGoHome
}) => {
  const [subTab, setSubTab] = useState<'bridge' | 'shipyard' | 'hangar'>(initialSubTab || 'bridge');
  const [modFilter, setModFilter] = useState<'all' | 'negative' | 'core' | 'locomotion' | 'personnel' | 'structural'>('all');
  const [selectedWeaponDefId, setSelectedWeaponDefId] = useState<string>(STARSHIP_WEAPONS_CATALOG[0].id);
  const [selectedWeaponArc, setSelectedWeaponArc] = useState<WeaponArc>('Fixed Front');
  const [lastAstrogationResult, setLastAstrogationResult] = useState<{ roll: number; title: string; description: string } | null>(null);
  const [customWeaponName, setCustomWeaponName] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [hangarFilter, setHangarFilter] = useState<'all' | 'vehicle' | 'walker' | 'power_armor' | 'starship'>('all');
  const [lastOutOfControl, setLastOutOfControl] = useState<TableResult | null>(null);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const currentShip: StarshipVessel =
    starships.find((s) => s.id === activeStarshipId) ||
    starships[0] ||
    STOCK_STARSHIPS[0];

  const stats = calculateStarshipStats(currentShip);
  const currentFrame = getFrameDef(currentShip.sizeCategory);

  // --- Handlers for Shipyard Modifications ---
  const handleAddMod = (modDefId: string) => {
    const modDef = STARSHIP_MODIFICATIONS.find((m) => m.id === modDefId);
    if (!modDef) return;

    const existingIdx = currentShip.installedMods.findIndex((m) => m.modDefId === modDefId);
    if (existingIdx >= 0) {
      if (modDef.maxAllowed > 0 && currentShip.installedMods[existingIdx].count >= modDef.maxAllowed) {
        alert(`Maximum ${modDef.maxAllowed} of ${modDef.name} allowed on this vessel.`);
        return;
      }
      const updated = [...currentShip.installedMods];
      updated[existingIdx] = {
        ...updated[existingIdx],
        count: updated[existingIdx].count + 1
      };
      onUpdateActiveStarship({ installedMods: updated });
    } else {
      const slots = modDef.slotsCalc(currentShip.size);
      const cost = modDef.costCalc(currentShip.size);
      const newInstalled: InstalledStarshipMod = {
        id: 'mod_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        modDefId: modDef.id,
        name: modDef.name,
        category: modDef.category,
        slots,
        cost,
        count: 1,
        handlingBonus: modDef.handlingBonus,
        speedBonus: modDef.speedBonus,
        toughnessBonus: modDef.toughnessBonus,
        armorBonus: modDef.armorBonus,
        woundsBonus: modDef.woundsBonus
      };
      onUpdateActiveStarship({ installedMods: [...currentShip.installedMods, newInstalled] });
    }
  };

  const handleRemoveMod = (modDefId: string) => {
    const existingIdx = currentShip.installedMods.findIndex((m) => m.modDefId === modDefId);
    if (existingIdx < 0) return;

    const updated = [...currentShip.installedMods];
    if (updated[existingIdx].count > 1) {
      updated[existingIdx] = {
        ...updated[existingIdx],
        count: updated[existingIdx].count - 1
      };
      onUpdateActiveStarship({ installedMods: updated });
    } else {
      onUpdateActiveStarship({
        installedMods: currentShip.installedMods.filter((m) => m.modDefId !== modDefId)
      });
    }
  };

  // --- Handlers for Weapons ---
  const handleInstallWeapon = () => {
    const weaponDef = STARSHIP_WEAPONS_CATALOG.find((w) => w.id === selectedWeaponDefId);
    if (!weaponDef) return;

    const newWeapon: InstalledStarshipWeapon = {
      id: 'wep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      weaponDefId: weaponDef.id,
      name: customWeaponName.trim() ? customWeaponName.trim() : `${weaponDef.name} (${selectedWeaponArc})`,
      arc: selectedWeaponArc,
      range: weaponDef.range,
      damage: weaponDef.damage,
      ap: weaponDef.ap,
      rof: weaponDef.rof,
      modSlots: weaponDef.modSlots,
      cost: weaponDef.cost,
      notes: weaponDef.notes
    };

    onUpdateActiveStarship({ weapons: [...currentShip.weapons, newWeapon] });
    setCustomWeaponName('');
  };

  const handleRemoveWeapon = (weaponId: string) => {
    onUpdateActiveStarship({
      weapons: currentShip.weapons.filter((w) => w.id !== weaponId)
    });
  };

  // --- Frame & Size Change ---
  const handleSizeChange = (newSize: number) => {
    const clampedSize = Math.max(currentFrame.minSize, Math.min(currentFrame.maxSize, newSize));
    onUpdateActiveStarship({ size: clampedSize });
  };

  const handleFrameChange = (newCat: StarshipSizeCategory) => {
    const targetFrame = getFrameDef(newCat);
    onUpdateActiveStarship({
      sizeCategory: newCat,
      size: targetFrame.defaultSize,
      handling: targetFrame.handling,
      topSpeed: targetFrame.topSpeed,
      toughnessBase: targetFrame.baseToughness,
      maxWounds: targetFrame.wounds
    });
  };

  // --- Astrogation Mishap Roll ---
  const handleAstrogationRoll = () => {
    const result = rollAstrogationMishap();
    setLastAstrogationResult(result);
  };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Starship Header & Flagship Selector */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0e1726 0%, #090e18 100%)',
          borderRadius: 16,
          padding: '16px 20px',
          border: '1px solid #1e293b',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 260 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background:
                currentShip.craftType === 'walker'
                  ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
                  : currentShip.craftType === 'power_armor'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : currentShip.craftType === 'vehicle'
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '0.06em',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
            }}
          >
            {currentShip.craftType === 'walker'
              ? 'MECH'
              : currentShip.craftType === 'power_armor'
              ? 'ARMOR'
              : currentShip.craftType === 'vehicle'
              ? 'VEH'
              : 'SHIP'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  margin: 0,
                  color: '#f8fafc',
                  letterSpacing: '0.02em'
                }}
              >
                {currentShip.name}
              </h1>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background:
                    currentShip.craftType === 'walker'
                      ? 'rgba(168, 85, 247, 0.2)'
                      : currentShip.craftType === 'power_armor'
                      ? 'rgba(245, 158, 11, 0.2)'
                      : currentShip.craftType === 'vehicle'
                      ? 'rgba(16, 185, 129, 0.2)'
                      : 'rgba(56, 189, 248, 0.15)',
                  color:
                    currentShip.craftType === 'walker'
                      ? '#c084fc'
                      : currentShip.craftType === 'power_armor'
                      ? '#fbbf24'
                      : currentShip.craftType === 'vehicle'
                      ? '#34d399'
                      : '#38bdf8',
                  border: '1px solid currentColor'
                }}
              >
                {currentShip.craftType ? currentShip.craftType.toUpperCase().replace('_', ' ') : currentShip.registry || 'FLAGSHIP'}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 3 }}>
              {currentShip.classModel} • Size {currentShip.size} ({currentShip.sizeCategory}) • Registry: {currentShip.registry}
            </div>
          </div>
        </div>

        {/* Sub-Tab Navigation Pill & Home Return & Wizards */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {onGoHome && (
            <button
              onClick={onGoHome}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                fontSize: '0.82rem',
                fontWeight: 800,
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer'
              }}
            >
              ← Home
            </button>
          )}

          <button
            onClick={() => setIsWizardOpen(true)}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              fontSize: '0.82rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)'
            }}
          >
            ✨ Commission Wizard
          </button>

          <button
            onClick={() => setIsRulesOpen(true)}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              fontSize: '0.82rem',
              fontWeight: 800,
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              cursor: 'pointer'
            }}
          >
            📖 Sci-Fi Rules
          </button>

          <div
            style={{
              display: 'flex',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: 4,
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <button
              onClick={() => setSubTab('bridge')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 800,
                background:
                  subTab === 'bridge'
                    ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
                    : 'transparent',
                color: subTab === 'bridge' ? '#ffffff' : '#94a3b8',
                boxShadow: subTab === 'bridge' ? '0 2px 8px rgba(14, 165, 233, 0.35)' : 'none'
              }}
            >
              Bridge Console
            </button>
            <button
              onClick={() => setSubTab('shipyard')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 800,
                background:
                  subTab === 'shipyard'
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'transparent',
                color: subTab === 'shipyard' ? '#0f172a' : '#94a3b8',
                boxShadow: subTab === 'shipyard' ? '0 2px 8px rgba(245, 158, 11, 0.35)' : 'none'
              }}
            >
              Shipyard Customizer
            </button>
            <button
              onClick={() => setSubTab('hangar')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 800,
                background:
                  subTab === 'hangar'
                    ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
                    : 'transparent',
                color: subTab === 'hangar' ? '#ffffff' : '#94a3b8',
                boxShadow: subTab === 'hangar' ? '0 2px 8px rgba(168, 85, 247, 0.35)' : 'none'
              }}
            >
              Fleet Hangar ({starships.length})
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SUB-TAB 1: BRIDGE CONSOLE (PLAY & TACTICAL OPERATIONS) */}
      {/* ======================================================== */}
      {subTab === 'bridge' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick Stats Banner */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 12
            }}
          >
            {/* 1. Toughness */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: '12px 14px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                Toughness
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>
                {currentShip.toughnessTotal || stats.finalToughness} ({currentShip.armorBonus || stats.finalArmor}) {currentShip.isHeavyArmor ? 'HA' : ''}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Base {currentShip.toughnessBase} + Armor {currentShip.armorBonus || stats.finalArmor}
              </div>
            </div>

            {/* 2. Handling / Agility */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: '12px 14px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                Handling
              </div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: (currentShip.handling ?? stats.finalHandling) >= 0 ? '#4ade80' : '#f87171'
                }}
              >
                {(currentShip.handling ?? stats.finalHandling) >= 0
                  ? `+${currentShip.handling ?? stats.finalHandling}`
                  : (currentShip.handling ?? stats.finalHandling)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {currentShip.craftType === 'walker' || currentShip.craftType === 'power_armor' ? 'Mobility Mod' : 'Driving / Piloting Mod'}
              </div>
            </div>

            {/* 3. Speed or Tactical Pace */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: '12px 14px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                {currentShip.craftType === 'walker' || currentShip.craftType === 'power_armor' ? 'Tactical Pace' : 'Top Speed'}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fbbf24' }}>
                {currentShip.craftType === 'walker' || currentShip.craftType === 'power_armor'
                  ? `${currentShip.pace || 8}"`
                  : `${currentShip.topSpeed || stats.finalTopSpeed} MPH`}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {currentShip.craftType === 'walker' || currentShip.craftType === 'power_armor'
                  ? `Running: +d${currentShip.runningDie || 6}`
                  : currentShip.locomotion || 'Standard Locomotion'}
              </div>
            </div>

            {/* 4. Special System: Jump Jets / Strength / FTL */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: '12px 14px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                {currentShip.craftType === 'power_armor'
                  ? 'Strength Boost'
                  : currentShip.craftType === 'walker'
                  ? 'Jump Jets'
                  : currentShip.craftType === 'vehicle'
                  ? 'Drive Type'
                  : 'FTL Hyperdrive'}
              </div>
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginTop: 4
                }}
              >
                {currentShip.craftType === 'power_armor'
                  ? `+${currentShip.strengthBonusSteps || 2} Steps`
                  : currentShip.craftType === 'walker'
                  ? currentShip.hasJumpJets ? 'EQUIPPED' : 'STANDARD LEGS'
                  : currentShip.craftType === 'vehicle'
                  ? currentShip.locomotion || 'WHEELED'
                  : stats.hasFTL ? 'ONLINE' : 'NONE'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {currentShip.craftType === 'power_armor'
                  ? currentShip.minStrength ? `Min ${currentShip.minStrength}` : 'Augmented'
                  : currentShip.craftType === 'walker'
                  ? 'All-Terrain Leaps'
                  : currentShip.craftType === 'vehicle'
                  ? 'Propulsion'
                  : 'Hyperspace Transit'}
              </div>
            </div>

            {/* 5. Capacity / Crew */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: '12px 14px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                Crew & Capacity
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#e2e8f0', marginTop: 3 }}>
                {currentShip.crew || 1} {currentShip.crewCapacity ? `/ ${currentShip.crewCapacity}` : ''}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {currentShip.craftType === 'power_armor' ? 'Wearer Size 0/+1' : 'Operators'}
              </div>
            </div>
          </div>

          {/* Hull Integrity (Wounds) & Deflector Shields Tracker */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 16
            }}
          >
            {/* Wounds / Hull Damage */}
            <div
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800 }}>
                    Hull Integrity & Wounds
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Critical Vehicle Damage Table at max wounds ({stats.maxWounds})
                  </div>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: currentShip.wounds > 0 ? '#ef4444' : '#22c55e' }}>
                  {currentShip.wounds} / {stats.maxWounds}
                </div>
              </div>

              {/* Wounds track boxes */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {Array.from({ length: stats.maxWounds }).map((_, idx) => {
                  const isWounded = idx < currentShip.wounds;
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        onUpdateActiveStarship({
                          wounds: isWounded ? idx : idx + 1
                        })
                      }
                      style={{
                        flex: 1,
                        height: 38,
                        borderRadius: 8,
                        border: `2px solid ${isWounded ? '#ef4444' : '#334155'}`,
                        background: isWounded
                          ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                          : 'rgba(30, 41, 59, 0.5)',
                        color: isWounded ? '#ffffff' : '#64748b',
                        fontWeight: 900,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isWounded ? `WOUND ${idx + 1}` : idx + 1}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  disabled={currentShip.wounds <= 0}
                  onClick={() => onUpdateActiveStarship({ wounds: Math.max(0, currentShip.wounds - 1) })}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#e2e8f0',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  - Repair 1 Wound
                </button>
                <button
                  disabled={currentShip.wounds >= stats.maxWounds}
                  onClick={() => onUpdateActiveStarship({ wounds: Math.min(stats.maxWounds, currentShip.wounds + 1) })}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #ef4444',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  + Hull Breach (+1 Wound)
                </button>
              </div>
            </div>

            {/* Force Field Shields Tracker */}
            <div
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800 }}>
                    Deflector Force Field (Shields)
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Absorbs incoming damage before penetrating hull armor
                  </div>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>
                  {currentShip.shields} / {currentShip.maxShields || Math.floor(currentShip.size / 2)}
                </div>
              </div>

              {/* Shields Bar */}
              <div
                style={{
                  width: '100%',
                  height: 20,
                  borderRadius: 10,
                  background: 'rgba(30, 41, 59, 0.8)',
                  overflow: 'hidden',
                  border: '1px solid #334155',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        (currentShip.shields / (currentShip.maxShields || Math.max(1, Math.floor(currentShip.size / 2)))) *
                          100
                      )
                    )}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
                    boxShadow: '0 0 12px rgba(56, 189, 248, 0.6)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  disabled={currentShip.shields <= 0}
                  onClick={() => onUpdateActiveStarship({ shields: Math.max(0, currentShip.shields - 1) })}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #38bdf8',
                    background: 'rgba(56, 189, 248, 0.1)',
                    color: '#38bdf8',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  -1 Shield Hit
                </button>
                <button
                  onClick={() =>
                    onUpdateActiveStarship({
                      shields: Math.min(
                        currentShip.maxShields || Math.max(1, Math.floor(currentShip.size / 2)),
                        currentShip.shields + 1
                      )
                    })
                  }
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #22c55e',
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: '#22c55e',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  +1 Recharge
                </button>
                <button
                  onClick={() =>
                    onUpdateActiveStarship({
                      shields: currentShip.maxShields || Math.max(1, Math.floor(currentShip.size / 2))
                    })
                  }
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#e2e8f0',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  Full Recharge
                </button>
              </div>
            </div>
          </div>

          {/* Tactical Weapons Battery (Live Fire directly into Dice Tray) */}
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 14,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
                  Tactical Weapons Battery
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Equipped weapon mounts with targeting arcs. Tap to roll damage with exploding dice!
                </div>
              </div>
              <button
                onClick={() => setSubTab('shipyard')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid #f59e0b',
                  background: 'rgba(245, 158, 11, 0.12)',
                  color: '#fbbf24',
                  fontWeight: 700,
                  fontSize: '0.78rem'
                }}
              >
                + Modify Weapons in Shipyard
              </button>
            </div>

            {currentShip.weapons.length === 0 ? (
              <div
                style={{
                  padding: '30px 20px',
                  textAlign: 'center',
                  background: 'rgba(30, 41, 59, 0.3)',
                  borderRadius: 10,
                  border: '1px dashed #334155',
                  color: '#94a3b8'
                }}
              >
                No ship weapons currently installed. Switch to the <strong>Shipyard Customizer</strong> to mount lasers, missiles, or particle cannons.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
                {currentShip.weapons.map((wep) => (
                  <div
                    key={wep.id}
                    style={{
                      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      border: '1px solid #334155',
                      borderRadius: 12,
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 10
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#f8fafc' }}>
                          {wep.name}
                        </div>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 6,
                            background:
                              wep.arc === 'Turret'
                                ? 'rgba(168, 85, 247, 0.2)'
                                : 'rgba(14, 165, 233, 0.2)',
                            color: wep.arc === 'Turret' ? '#c084fc' : '#38bdf8',
                            border: `1px solid ${
                              wep.arc === 'Turret' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(14, 165, 233, 0.4)'
                            }`
                          }}
                        >
                          {wep.arc}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <div><strong>Range:</strong> {wep.range}</div>
                        <div><strong>Damage:</strong> <span style={{ color: '#fbbf24', fontWeight: 800 }}>{wep.damage}</span></div>
                        <div><strong>AP:</strong> {wep.ap}</div>
                        <div><strong>RoF:</strong> {wep.rof}</div>
                      </div>
                      {wep.notes && (
                        <div style={{ fontSize: '0.73rem', color: '#94a3b8', marginTop: 4 }}>
                          {wep.notes}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      <button
                        onClick={() => {
                          if (onRollDamage) {
                            onRollDamage(wep.damage, `${currentShip.name} - ${wep.name} (AP ${wep.ap})`);
                          } else {
                            alert(`Firing ${wep.name}! Formula: ${wep.damage} (AP ${wep.ap})`);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 14px',
                          borderRadius: 8,
                          border: 'none',
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                        }}
                      >
                        Fire! ({wep.damage} AP {wep.ap})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tactical Maneuvers & Out of Control Mishap Console for Vehicles/Walkers/Armor */}
          {currentShip.craftType && currentShip.craftType !== 'starship' ? (
            <div
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
                    Tactical Maneuver & Out of Control Console
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Critical maneuver failures and collision resolution (Sci-Fi Companion rules)
                  </div>
                </div>
                <button
                  onClick={() => setLastOutOfControl(rollOutOfControl())}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid #ef4444',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.35)'
                  }}
                >
                  🎲 Roll Out of Control (2d6)
                </button>
              </div>

              {lastOutOfControl && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#ef4444',
                      padding: '2px 10px',
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    2d6: {lastOutOfControl.roll}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#f87171', fontSize: '0.95rem' }}>
                      {lastOutOfControl.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: 3 }}>
                      {lastOutOfControl.description}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Evasive Maneuver</div>
                  <div style={{ fontWeight: 800, color: '#e2e8f0' }}>-2 to be hit; -2 to own attacks</div>
                </div>
                <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Tactical Ramming</div>
                  <div style={{ fontWeight: 800, color: '#e2e8f0' }}>Opposed Driving/Piloting • Damage: Size × (MPH/10)</div>
                </div>
                {currentShip.craftType === 'walker' && (
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Mech Stomp Action</div>
                    <div style={{ fontWeight: 800, color: '#e2e8f0' }}>Str+d8 AP 4 (Heavy Weapon) • Targets vs Agility</div>
                  </div>
                )}
                {currentShip.craftType === 'power_armor' && (
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Powered Strength Attack</div>
                    <div style={{ fontWeight: 800, color: '#e2e8f0' }}>Boosts user Strength by +{currentShip.strengthBonusSteps || 2} steps</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
          /* Astrogation & Hyperdrive Navigation Console for Starships */
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 14,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
                  Astrogation & Hyperspace Transit
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  FTL coordinates computation and Sci-Fi Companion Astrogation Mishaps table
                </div>
              </div>
              <button
                onClick={handleAstrogationRoll}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #0ea5e9',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.35)'
                }}
              >
                Roll Astrogation Mishap (d20)
              </button>
            </div>

            {lastAstrogationResult && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12
                }}
              >
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: '#ef4444',
                    padding: '2px 10px',
                    borderRadius: 8,
                    background: 'rgba(239, 68, 68, 0.2)'
                  }}
                >
                  d20: {lastAstrogationResult.roll}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#f87171', fontSize: '0.95rem' }}>
                    Mishap: {lastAstrogationResult.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: 3 }}>
                    {lastAstrogationResult.description}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
              <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Standard System Transit</div>
                <div style={{ fontWeight: 800, color: '#e2e8f0' }}>1d6 × 10 Hours (Sublight)</div>
              </div>
              <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Interstellar Hyperlane</div>
                <div style={{ fontWeight: 800, color: '#e2e8f0' }}>1d6 Days (Piloting Roll)</div>
              </div>
              <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Deep Galaxy Crossing</div>
                <div style={{ fontWeight: 800, color: '#e2e8f0' }}>2d6 Weeks (Astrogation -2)</div>
              </div>
            </div>
          </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: ORBITAL SHIPYARD (BUILDER & CUSTOMIZER)       */}
      {/* ======================================================== */}
      {subTab === 'shipyard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Ship Identity & Size Frame Selector */}
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 14,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
              Starframe Dimensions & Specs
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Vessel Name
                </label>
                <input
                  type="text"
                  value={currentShip.name}
                  onChange={(e) => onUpdateActiveStarship({ name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Registry Code
                </label>
                <input
                  type="text"
                  value={currentShip.registry}
                  onChange={(e) => onUpdateActiveStarship({ registry: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Class / Model
                </label>
                <input
                  type="text"
                  value={currentShip.classModel}
                  onChange={(e) => onUpdateActiveStarship({ classModel: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Frame Class Buttons */}
            <div>
              <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                Frame Size Classification (SWADE Sci-Fi Companion p. 144)
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {STARSHIP_FRAMES.map((f) => {
                  const isSelected = currentShip.sizeCategory === f.category;
                  return (
                    <button
                      key={f.category}
                      onClick={() => handleFrameChange(f.category)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: `1px solid ${isSelected ? '#38bdf8' : '#334155'}`,
                        background: isSelected ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
                        color: isSelected ? '#38bdf8' : '#cbd5e1',
                        cursor: 'pointer'
                      }}
                    >
                      {f.category} ({f.minSize}–{f.maxSize})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Stepper & Armor Stepper */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              <div style={{ background: '#1e293b', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.88rem' }}>Hull Size: {currentShip.size}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Range: {currentFrame.minSize} to {currentFrame.maxSize} • {currentFrame.lengthRange}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      disabled={currentShip.size <= currentFrame.minSize}
                      onClick={() => handleSizeChange(currentShip.size - 1)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border: '1px solid #475569',
                        background: '#334155',
                        color: '#fff',
                        fontWeight: 900
                      }}
                    >
                      -
                    </button>
                    <button
                      disabled={currentShip.size >= currentFrame.maxSize}
                      onClick={() => handleSizeChange(currentShip.size + 1)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border: '1px solid #475569',
                        background: '#334155',
                        color: '#fff',
                        fontWeight: 900
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ background: '#1e293b', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.88rem' }}>Armor: +{currentShip.armorBonus}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Max for frame: {currentFrame.maxArmor} • Toughness total: {stats.finalToughness}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      disabled={currentShip.armorBonus <= 0}
                      onClick={() => onUpdateActiveStarship({ armorBonus: Math.max(0, currentShip.armorBonus - 1) })}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border: '1px solid #475569',
                        background: '#334155',
                        color: '#fff',
                        fontWeight: 900
                      }}
                    >
                      -
                    </button>
                    <button
                      disabled={currentShip.armorBonus >= currentFrame.maxArmor}
                      onClick={() => onUpdateActiveStarship({ armorBonus: Math.min(currentFrame.maxArmor, currentShip.armorBonus + 1) })}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border: '1px solid #475569',
                        background: '#334155',
                        color: '#fff',
                        fontWeight: 900
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mod Slots Budget & Total Ship Value HUD */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: `2px solid ${stats.remainingModSlots < 0 ? '#ef4444' : '#0ea5e9'}`,
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                Modification Slots Budget
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: '1.7rem', fontWeight: 900, color: stats.remainingModSlots < 0 ? '#ef4444' : '#38bdf8' }}>
                  {stats.spentModSlots} / {stats.totalModSlots}
                </span>
                <span style={{ fontSize: '0.85rem', color: stats.remainingModSlots < 0 ? '#f87171' : '#4ade80', fontWeight: 700 }}>
                  ({stats.remainingModSlots >= 0 ? `${stats.remainingModSlots} Available` : `${Math.abs(stats.remainingModSlots)} OVER BUDGET!`})
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>
                {stats.remainingModSlots > 0
                  ? `Unused slots convert to ${stats.cargoCapacity.toLocaleString()} ft³ of Cargo Hold.`
                  : 'Negative modifications refund mod slots back to the vessel!'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Shipyard Valuation
              </div>
              <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fbbf24', marginTop: 2 }}>
                ${stats.totalCost.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>
                Hull: ${stats.baseHullCost.toLocaleString()} • Mods: ${stats.modsCost.toLocaleString()} • Weapons: ${stats.weaponsCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Installed Modifications List */}
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 14,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800 }}>
                Installed Modifications ({currentShip.installedMods.length})
              </h3>
            </div>

            {currentShip.installedMods.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                No modifications installed yet. Select from the catalog below.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                {currentShip.installedMods.map((mod) => (
                  <div
                    key={mod.id}
                    style={{
                      background: '#1e293b',
                      borderRadius: 10,
                      padding: '10px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid #334155'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#f8fafc' }}>
                        {mod.name} {mod.count > 1 ? `(x${mod.count})` : ''}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Slots: {mod.slots * mod.count} • Cost: ${((mod.cost || 0) * mod.count).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => handleRemoveMod(mod.modDefId)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: '1px solid #ef4444',
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#ef4444',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleAddMod(mod.modDefId)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: '1px solid #38bdf8',
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modifications Catalog Browser */}
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 14,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800 }}>
                Modifications Catalog (SWADE Sci-Fi Companion)
              </h3>
              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(['all', 'negative', 'core', 'locomotion', 'personnel', 'structural'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setModFilter(cat)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      border: `1px solid ${modFilter === cat ? '#f59e0b' : '#334155'}`,
                      background: modFilter === cat ? 'rgba(245, 158, 11, 0.2)' : '#1e293b',
                      color: modFilter === cat ? '#fbbf24' : '#cbd5e1',
                      cursor: 'pointer'
                    }}
                  >
                    {cat === 'negative' ? 'Negative' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {STARSHIP_MODIFICATIONS.filter((m) => modFilter === 'all' || m.category === modFilter).map((mod) => {
                const slotsCost = mod.slotsCalc(currentShip.size);
                const credCost = mod.costCalc(currentShip.size);
                const installed = currentShip.installedMods.find((im) => im.modDefId === mod.id);

                return (
                  <div
                    key={mod.id}
                    style={{
                      background: mod.category === 'negative' ? 'rgba(69, 10, 10, 0.3)' : '#1e293b',
                      border: `1px solid ${
                        mod.category === 'negative' ? 'rgba(239, 68, 68, 0.3)' : '#334155'
                      }`,
                      borderRadius: 10,
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#f8fafc' }}>
                          {mod.name}
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '1px 6px',
                            borderRadius: 4,
                            background:
                              slotsCost < 0
                                ? 'rgba(34, 197, 94, 0.2)'
                                : 'rgba(56, 189, 248, 0.2)',
                            color: slotsCost < 0 ? '#4ade80' : '#38bdf8'
                          }}
                        >
                          {slotsCost < 0 ? `+${Math.abs(slotsCost)} SLOTS` : `${slotsCost} SLOTS`}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: 4 }}>
                        {mod.summary}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>
                        {mod.effect}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: credCost < 0 ? '#4ade80' : '#fbbf24' }}>
                        {credCost < 0 ? `Discount -$${Math.abs(credCost).toLocaleString()}` : `$${credCost.toLocaleString()}`}
                      </span>
                      <button
                        onClick={() => handleAddMod(mod.id)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 6,
                          border: 'none',
                          background:
                            mod.category === 'negative'
                              ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                              : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.74rem',
                          cursor: 'pointer'
                        }}
                      >
                        + Install {installed ? `(${installed.count})` : ''}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weapons Outfitter Station */}
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 14,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800 }}>
              Outfitting Station: Mount Starship Weapon
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Select Weapon
                </label>
                <select
                  value={selectedWeaponDefId}
                  onChange={(e) => setSelectedWeaponDefId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  {STARSHIP_WEAPONS_CATALOG.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.damage}, {w.modSlots} Slots, ${w.cost.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Mount Arc Position
                </label>
                <select
                  value={selectedWeaponArc}
                  onChange={(e) => setSelectedWeaponArc(e.target.value as WeaponArc)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Fixed Front">Fixed Front (Fore)</option>
                  <option value="Fixed Rear">Fixed Rear (Aft)</option>
                  <option value="Turret">Turret (360° Arc)</option>
                  <option value="Port (Left)">Port (Left Broadside)</option>
                  <option value="Starboard (Right)">Starboard (Right Broadside)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Custom Mount Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dorsal Battery"
                  value={customWeaponName}
                  onChange={(e) => setCustomWeaponName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleInstallWeapon}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)'
                }}
              >
                + Mount Weapon to Vessel
              </button>
            </div>

            {/* List of currently mounted weapons with Remove option */}
            {currentShip.weapons.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, marginBottom: 8 }}>
                  Mounted Weapons:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
                  {currentShip.weapons.map((w) => (
                    <div
                      key={w.id}
                      style={{
                        background: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: 8,
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.84rem' }}>{w.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                          {w.damage} (AP {w.ap}) • {w.modSlots} Slots • ${w.cost.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveWeapon(w.id)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: '1px solid #ef4444',
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#ef4444',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        Dismount
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: FLEET HANGAR (SHIP LIST & FLEET MANAGEMENT)   */}
      {/* ======================================================== */}
      {subTab === 'hangar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc', fontWeight: 900 }}>
                Hangar Bay & Motor Pool
              </h2>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Commission, customize, and deploy Vehicles, Walkers, Power Armor, and Starships
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsWizardOpen(true)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                }}
              >
                ✨ Commission Wizard
              </button>

              <button
                onClick={() => setIsRulesOpen(true)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1px solid rgba(245, 158, 11, 0.45)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                📖 Sci-Fi Rules
              </button>
            </div>
          </div>

          {/* Hangar Category Filter Pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', background: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 12 }}>
            {[
              { id: 'all', label: `All Hangar (${starships.length})` },
              { id: 'vehicle', label: `Vehicles (${starships.filter(s => s.craftType === 'vehicle').length})` },
              { id: 'walker', label: `Walkers & Mechs (${starships.filter(s => s.craftType === 'walker').length})` },
              { id: 'power_armor', label: `Power Armor (${starships.filter(s => s.craftType === 'power_armor').length})` },
              { id: 'starship', label: `Starships (${starships.filter(s => !s.craftType || s.craftType === 'starship').length})` }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setHangarFilter(f.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  background: hangarFilter === f.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: hangarFilter === f.id ? '#38bdf8' : '#94a3b8',
                  border: hangarFilter === f.id ? '1px solid #38bdf8' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Quick Stock Template Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', background: '#0f172a', padding: '10px 14px', borderRadius: 10, border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800 }}>QUICK TEMPLATES:</span>
            {STOCK_SCIFI_CRAFT.map((stock) => (
              <button
                key={stock.id}
                onClick={() => {
                  const vessel = convertCraftToVessel({
                    ...stock,
                    id: `craft_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                    name: `${stock.name} #${Math.floor(10 + Math.random() * 90)}`
                  });
                  onCreateStarship(vessel);
                  onSelectStarship(vessel.id);
                  setSubTab('bridge');
                }}
                style={{
                  padding: '5px 11px',
                  borderRadius: 6,
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#cbd5e1',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                + {stock.name} ({stock.craftType.replace('_', ' ')})
              </button>
            ))}
          </div>

          {/* Ship Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
            {starships
              .filter((ship) => {
                if (hangarFilter === 'all') return true;
                if (hangarFilter === 'starship') return !ship.craftType || ship.craftType === 'starship';
                return ship.craftType === hangarFilter;
              })
              .map((ship) => {
              const shipStats = calculateStarshipStats(ship);
              const isActive = ship.id === currentShip.id;

              return (
                <div
                  key={ship.id}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #0e1e38 0%, #0c1526 100%)'
                      : '#0f172a',
                    border: `2px solid ${isActive ? '#38bdf8' : '#1e293b'}`,
                    borderRadius: 14,
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 12,
                    boxShadow: isActive ? '0 8px 24px rgba(56, 189, 248, 0.2)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#f8fafc' }}>
                          {ship.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2 }}>
                          {ship.registry || 'UNREGISTERED'} • {ship.classModel}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background:
                            ship.craftType === 'walker'
                              ? 'rgba(168, 85, 247, 0.2)'
                              : ship.craftType === 'power_armor'
                              ? 'rgba(245, 158, 11, 0.2)'
                              : ship.craftType === 'vehicle'
                              ? 'rgba(16, 185, 129, 0.2)'
                              : 'rgba(56, 189, 248, 0.15)',
                          color:
                            ship.craftType === 'walker'
                              ? '#c084fc'
                              : ship.craftType === 'power_armor'
                              ? '#fbbf24'
                              : ship.craftType === 'vehicle'
                              ? '#34d399'
                              : '#38bdf8',
                          border: '1px solid currentColor'
                        }}
                      >
                        {ship.craftType ? ship.craftType.toUpperCase().replace('_', ' ') : `Size ${ship.size} (${ship.sizeCategory})`}
                      </span>
                    </div>

                    {/* Ship Stats Pills */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
                      <div style={{ background: '#1e293b', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.66rem', color: '#94a3b8', textTransform: 'uppercase' }}>Toughness</div>
                        <div style={{ fontWeight: 900, color: '#38bdf8', fontSize: '0.96rem' }}>
                          {ship.toughnessTotal || shipStats.finalToughness} ({ship.armorBonus || shipStats.finalArmor}) {ship.isHeavyArmor ? 'HA' : ''}
                        </div>
                      </div>
                      <div style={{ background: '#1e293b', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.66rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                          {ship.craftType === 'walker' || ship.craftType === 'power_armor' ? 'Pace' : 'Top Speed'}
                        </div>
                        <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: '0.96rem' }}>
                          {ship.craftType === 'walker' || ship.craftType === 'power_armor' ? `${ship.pace || 8}"` : `${ship.topSpeed || shipStats.finalTopSpeed} MPH`}
                        </div>
                      </div>
                      <div style={{ background: '#1e293b', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.66rem', color: '#94a3b8', textTransform: 'uppercase' }}>Wounds</div>
                        <div style={{ fontWeight: 900, color: ship.wounds > 0 ? '#ef4444' : '#22c55e', fontSize: '0.96rem' }}>
                          {ship.wounds} / {ship.maxWounds || shipStats.maxWounds}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: 10 }}>
                      Shields: {ship.shields} • Weapons: {ship.weapons.length} • Mods: {ship.installedMods.length} {ship.strengthBonusSteps ? `• Wearer Str: +${ship.strengthBonusSteps}` : ''}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        onSelectStarship(ship.id);
                        setSubTab('bridge');
                      }}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: 'none',
                        background: isActive
                          ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
                          : '#334155',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      {isActive ? 'Open Bridge' : 'Set Active'}
                    </button>

                    <button
                      onClick={() => {
                        onSelectStarship(ship.id);
                        setSubTab('shipyard');
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #475569',
                        background: '#1e293b',
                        color: '#cbd5e1',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      Customizer
                    </button>

                    <button
                      onClick={() => onDuplicateStarship(ship.id)}
                      title="Duplicate Vessel"
                      style={{
                        padding: '8px 10px',
                        borderRadius: 8,
                        border: '1px solid #475569',
                        background: '#1e293b',
                        color: '#cbd5e1',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      Copy
                    </button>

                    {starships.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to decommission ${ship.name}?`)) {
                            onDeleteStarship(ship.id);
                          }
                        }}
                        title="Decommission Vessel"
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          border: '1px solid #ef4444',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Commissioning Wizard Modal */}
      {isWizardOpen && (
        <CraftWizardModal
          onClose={() => setIsWizardOpen(false)}
          onCommission={(newCraft) => {
            const vessel = convertCraftToVessel(newCraft);
            onCreateStarship(vessel);
            onSelectStarship(vessel.id);
            setSubTab('bridge');
          }}
        />
      )}

      {/* Sci-Fi Companion Rules Modal */}
      {isRulesOpen && (
        <SciFiRulesModal onClose={() => setIsRulesOpen(false)} />
      )}
    </div>
  );
};
