import React, { useState } from 'react';
import {
  CraftFrameDef,
  CraftModDef,
  CraftWeaponDef,
  InstalledCraftMod,
  InstalledCraftWeapon,
  SciFiCraft,
  SciFiCraftType,
  VehicleLocomotion,
  WeaponMountLocation
} from '../types/scifiCraft';
import {
  CRAFT_FRAMES,
  CRAFT_MODIFICATIONS,
  CRAFT_WEAPONS,
  SWADE_VEHICLE_SIZES,
  getVehicleSizeDef,
  getValidSizesForType,
  getCraftTypeSizeLabel,
  VehicleSizeDef
} from '../data/scifiCraftData';
import { calculateCraftStats } from '../utils/scifiCraftRules';

interface CraftWizardModalProps {
  initialType?: SciFiCraftType;
  onClose: () => void;
  onCommission: (newCraft: SciFiCraft) => void;
}

export const CraftWizardModal: React.FC<CraftWizardModalProps> = ({
  initialType = 'vehicle',
  onClose,
  onCommission
}) => {
  const [step, setStep] = useState<number>(1);
  const [craftType, setCraftType] = useState<SciFiCraftType>(initialType);

  const getDefaultSizeForType = (type: SciFiCraftType): number => {
    switch (type) {
      case 'power_armor':
        return 1;
      case 'walker':
        return 4;
      case 'starship':
        return 4;
      case 'vehicle':
      default:
        return 3;
    }
  };

  const [selectedSize, setSelectedSize] = useState<number>(getDefaultSizeForType(initialType));
  const selectedSizeDef = getVehicleSizeDef(selectedSize);

  const validSizes = getValidSizesForType(craftType);
  const currentSizeIndex = validSizes.indexOf(selectedSize);
  const canStepDown = currentSizeIndex > 0;
  const canStepUp = currentSizeIndex !== -1 && currentSizeIndex < validSizes.length - 1;

  const handleStepDown = () => {
    if (canStepDown) {
      handleSelectSize(validSizes[currentSizeIndex - 1]);
    }
  };

  const handleStepUp = () => {
    if (canStepUp) {
      handleSelectSize(validSizes[currentSizeIndex + 1]);
    }
  };

  // Locomotion & Chassis Architecture
  const defaultLocomotionForType = (type: SciFiCraftType): VehicleLocomotion => {
    switch (type) {
      case 'walker':
        return 'Bipedal Walker';
      case 'power_armor':
        return 'Powered Exosuit';
      case 'starship':
        return 'Spaceflight';
      default:
        return 'Hover / Grav';
    }
  };

  const [selectedLocomotion, setSelectedLocomotion] = useState<VehicleLocomotion>(defaultLocomotionForType(initialType));
  const [selectedHeavyArmor, setSelectedHeavyArmor] = useState<boolean>(selectedSizeDef.isHeavyArmor);
  const [selectedJumpJets, setSelectedJumpJets] = useState<boolean>(initialType === 'walker');
  const [selectedStrengthSteps, setSelectedStrengthSteps] = useState<number>(
    selectedSize <= 0 ? 1 : selectedSize === 1 ? 2 : selectedSize === 2 ? 3 : 4
  );

  const [craftName, setCraftName] = useState('');
  const [registry, setRegistry] = useState(`REG-${Math.floor(100 + Math.random() * 900)}`);
  const [roleConcept, setRoleConcept] = useState('');

  // Installed Upgrades & Weapons
  const [installedMods, setInstalledMods] = useState<InstalledCraftMod[]>([]);
  const [installedWeapons, setInstalledWeapons] = useState<InstalledCraftWeapon[]>([]);

  // Weapon adding state
  const [selectedWeaponDefId, setSelectedWeaponDefId] = useState<string>(CRAFT_WEAPONS[0].id);
  const [selectedMount, setSelectedMount] = useState<WeaponMountLocation>('Fixed Front');

  // Handle Size change
  const handleSelectSize = (sz: number) => {
    setSelectedSize(sz);
    const newDef = getVehicleSizeDef(sz);
    setSelectedHeavyArmor(newDef.isHeavyArmor);
    if (craftType === 'power_armor') {
      setSelectedStrengthSteps(sz <= 0 ? 1 : sz === 1 ? 2 : sz === 2 ? 3 : 4);
    }
  };

  // Sync category
  const handleSelectCraftType = (type: SciFiCraftType) => {
    setCraftType(type);
    setSelectedLocomotion(defaultLocomotionForType(type));
    const sizesForType = getValidSizesForType(type);
    let newSize = selectedSize;
    if (!sizesForType.includes(selectedSize)) {
      newSize = getDefaultSizeForType(type);
      setSelectedSize(newSize);
    }
    const newDef = getVehicleSizeDef(newSize);
    setSelectedHeavyArmor(newDef.isHeavyArmor);
    if (type === 'walker') {
      setSelectedJumpJets(true);
    } else if (type === 'power_armor') {
      setSelectedJumpJets(false);
      setSelectedStrengthSteps(newSize <= 0 ? 1 : newSize === 1 ? 2 : newSize === 2 ? 3 : 4);
    }
    setInstalledMods([]);
    setInstalledWeapons([]);
  };

  // Draft craft for live calculations
  const draftCraft: SciFiCraft = {
    id: 'draft',
    name: craftName.trim() || `${selectedSizeDef.sizeCategory} ${craftType.replace('_', ' ')}`,
    craftType,
    classification: `${selectedSizeDef.sizeCategory} ${selectedLocomotion}`,
    frameDefId: 'custom',
    registry: registry.trim() || 'REG-001',
    size: selectedSizeDef.size,
    sizeCategory: selectedSizeDef.sizeCategory,
    locomotion: selectedLocomotion,
    pace: selectedSizeDef.defaultPace || 8,
    runningDie: selectedSizeDef.runningDie || 6,
    handling: selectedSizeDef.defaultHandling,
    topSpeed: selectedSizeDef.topSpeed,
    toughnessBase: selectedSizeDef.baseToughness,
    armor: selectedSizeDef.baseArmor,
    toughnessTotal: selectedSizeDef.baseToughness + selectedSizeDef.baseArmor,
    isHeavyArmor: selectedHeavyArmor,
    wounds: 0,
    maxWounds: selectedSizeDef.wounds,
    shields: 0,
    maxShields: 0,
    crew: selectedSizeDef.crew,
    passengers: selectedSizeDef.passengers,
    energy: Math.max(2, selectedSizeDef.size * 2),
    maxEnergy: Math.max(2, selectedSizeDef.size * 2),
    cargo: roleConcept || selectedSizeDef.typicalExamples,
    installedMods,
    weapons: installedWeapons,
    strengthBonusSteps: craftType === 'power_armor' ? selectedStrengthSteps : undefined,
    minStrength:
      craftType === 'power_armor'
        ? selectedStrengthSteps === 1
          ? 'd8'
          : selectedStrengthSteps === 2
          ? 'd10'
          : selectedStrengthSteps === 3
          ? 'd12+1'
          : 'd12+3'
        : undefined,
    hasJumpJets: selectedJumpJets,
    notes: roleConcept || `Built on Size ${selectedSize} (${selectedSizeDef.sizeCategory}) chassis.`,
    updatedAt: Date.now()
  };

  // Attach dynamic totalModSlots and baseCost for calculateCraftStats
  (draftCraft as any).totalModSlots = selectedSizeDef.modSlots;
  (draftCraft as any).baseCost = selectedSizeDef.cost;

  const stats = calculateCraftStats(draftCraft);

  // Mod toggling
  const handleToggleMod = (modDef: CraftModDef) => {
    const existingIdx = installedMods.findIndex((m) => m.modDefId === modDef.id);
    if (existingIdx >= 0) {
      setInstalledMods(installedMods.filter((_, idx) => idx !== existingIdx));
    } else {
      if (stats.remainingModSlots < modDef.modSlots) {
        alert(`Not enough modification slots available (Needs ${modDef.modSlots}, has ${stats.remainingModSlots}).`);
        return;
      }
      const newInstalled: InstalledCraftMod = {
        id: `mod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        modDefId: modDef.id,
        name: modDef.name,
        category: modDef.category,
        slots: modDef.modSlots,
        cost: modDef.cost,
        count: 1,
        armorBonus: modDef.armorBonus,
        toughnessBonus: modDef.toughnessBonus,
        handlingBonus: modDef.handlingBonus,
        speedBonus: modDef.speedBonus,
        paceBonus: modDef.paceBonus,
        woundsBonus: modDef.woundsBonus,
        shieldsBonus: modDef.shieldsBonus,
        strengthStepsBonus: modDef.strengthStepsBonus
      };
      setInstalledMods([...installedMods, newInstalled]);
    }
  };

  // Weapon adding
  const handleAddWeapon = () => {
    const wpnDef = CRAFT_WEAPONS.find((w) => w.id === selectedWeaponDefId);
    if (!wpnDef) return;

    if (stats.remainingModSlots < wpnDef.modSlots) {
      alert(`Not enough modification slots for this weapon (Needs ${wpnDef.modSlots}, has ${stats.remainingModSlots}).`);
      return;
    }

    const newWpn: InstalledCraftWeapon = {
      id: `wpn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      weaponDefId: wpnDef.id,
      name: wpnDef.name,
      mount: selectedMount,
      range: wpnDef.range,
      damage: wpnDef.damage,
      ap: wpnDef.ap,
      rof: wpnDef.rof,
      modSlots: wpnDef.modSlots,
      cost: wpnDef.cost,
      isHeavyWeapon: wpnDef.isHeavyWeapon,
      notes: wpnDef.notes
    };
    setInstalledWeapons([...installedWeapons, newWpn]);
  };

  const handleRemoveWeapon = (id: string) => {
    setInstalledWeapons(installedWeapons.filter((w) => w.id !== id));
  };

  const handleFinishCommission = () => {
    const finalCraft: SciFiCraft = {
      ...draftCraft,
      id: `craft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: craftName.trim() || `${selectedSizeDef.sizeCategory} ${craftType.replace('_', ' ')} #${Math.floor(10 + Math.random() * 90)}`,
      armor: stats.finalArmor,
      toughnessTotal: stats.finalToughness,
      handling: stats.finalHandling,
      topSpeed: stats.finalTopSpeed,
      pace: stats.finalPace,
      maxWounds: stats.maxWounds,
      maxShields: stats.maxShields,
      shields: stats.maxShields,
      isHeavyArmor: stats.isHeavyArmor,
      strengthBonusSteps: craftType === 'power_armor' ? selectedStrengthSteps : undefined,
      hasJumpJets: selectedJumpJets || stats.hasJumpJets,
      updatedAt: Date.now()
    };
    onCommission(finalCraft);
    onClose();
  };

  // Applicable mods and weapons
  const applicableMods = CRAFT_MODIFICATIONS.filter((m) => m.applicableTypes.includes(craftType));
  const applicableWeapons = CRAFT_WEAPONS.filter((w) => w.applicableTypes.includes(craftType));

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
          maxWidth: 980,
          maxHeight: '94vh',
          background: 'linear-gradient(180deg, #161a23 0%, #0c0f17 100%)',
          border: '1.5px solid rgba(56, 189, 248, 0.45)',
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
            padding: '18px 24px',
            borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(14, 165, 233, 0.08)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SAVAGE WORLDS SCI-FI COMPANION
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 950, color: '#fff', margin: '2px 0 0' }}>
              Vehicle & Craft Creation Wizard
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

        {/* Step Progress Pills */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '12px 24px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderBottom: '1px solid #1e293b',
            overflowX: 'auto'
          }}
        >
          {[
            { num: 1, label: '1. Size & Locomotion' },
            { num: 2, label: '2. Name & Identity' },
            { num: 3, label: '3. Weapons & Hardpoints' },
            { num: 4, label: '4. Mods & Upgrades' },
            { num: 5, label: '5. Review & Commission' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: '0.78rem',
                fontWeight: 800,
                background: step === s.num ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: step === s.num ? '#38bdf8' : '#64748b',
                border: step === s.num ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* STEP 1: VEHICLE CLASSIFICATION, SIZE & ARCHITECTURE */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* PROMPT 1: CHOOSE CRAFT TYPE */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                  STEP 1 — PROMPT 1: CRAFT CLASSIFICATION
                </div>
                <label style={{ fontSize: '1.15rem', fontWeight: 950, color: '#f8fafc', display: 'block', marginBottom: 12 }}>
                  Select Craft Classification
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                  {[
                    { id: 'vehicle', title: 'Vehicle', desc: 'Ground, Hover, APCs, Tanks & Aircraft' },
                    { id: 'walker', title: 'Walker (Mech)', desc: 'Bipedal & Quadruped Combat Mechs' },
                    { id: 'power_armor', title: 'Power Armor', desc: 'Exosuits & Heavy Battlesuits' },
                    { id: 'starship', title: 'Starship', desc: 'Corvettes, Shuttles & Interceptors' }
                  ].map((c) => {
                    const isSelected = craftType === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectCraftType(c.id as SciFiCraftType)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: 14,
                          textAlign: 'left',
                          background: isSelected
                            ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(3, 105, 161, 0.35) 100%)'
                            : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '2px solid #38bdf8' : '1px solid #1e293b',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 4px 14px rgba(56, 189, 248, 0.25)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontWeight: 950, fontSize: '1rem', color: isSelected ? '#38bdf8' : '#f8fafc' }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: isSelected ? '#bae6fd' : '#94a3b8', marginTop: 4, lineHeight: 1.35 }}>
                          {c.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PROMPT 2: CHOOSE SIZE (ONLY VALID SIZES FOR SELECTED TYPE) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      STEP 1 — PROMPT 2: VEHICLE SIZE
                    </div>
                    <label style={{ fontSize: '1.1rem', fontWeight: 950, color: '#f8fafc', display: 'block', margin: '2px 0 0' }}>
                      {getCraftTypeSizeLabel(craftType, selectedSize)} (Size {selectedSize} • {selectedSizeDef.sizeCategory})
                    </label>
                  </div>

                  {/* Size Stepper Button bounded to validSizes */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#0f172a', padding: '4px 8px', borderRadius: 10, border: '1px solid #1e293b' }}>
                    <button
                      type="button"
                      onClick={handleStepDown}
                      disabled={!canStepDown}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: '#1e293b',
                        border: '1px solid #334155',
                        color: !canStepDown ? '#475569' : '#fff',
                        fontWeight: 900,
                        cursor: !canStepDown ? 'not-allowed' : 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 900, fontSize: '0.88rem', color: '#38bdf8', minWidth: 65, textAlign: 'center' }}>
                      Size {selectedSize}
                    </span>
                    <button
                      type="button"
                      onClick={handleStepUp}
                      disabled={!canStepUp}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: '#1e293b',
                        border: '1px solid #334155',
                        color: !canStepUp ? '#475569' : '#fff',
                        fontWeight: 900,
                        cursor: !canStepUp ? 'not-allowed' : 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Filtered Clickable Size Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginBottom: 14 }}>
                  {SWADE_VEHICLE_SIZES.filter((sz) => validSizes.includes(sz.size)).map((sz) => {
                    const isSelected = selectedSize === sz.size;
                    const archetypeLabel = getCraftTypeSizeLabel(craftType, sz.size);
                    return (
                      <button
                        key={sz.size}
                        type="button"
                        onClick={() => handleSelectSize(sz.size)}
                        style={{
                          padding: '10px 8px',
                          borderRadius: 12,
                          textAlign: 'center',
                          background: isSelected
                            ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.1) 100%)'
                            : 'rgba(0, 0, 0, 0.35)',
                          border: isSelected ? '2px solid #38bdf8' : '1px solid #1e293b',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 4px 14px rgba(56, 189, 248, 0.25)' : 'none'
                        }}
                      >
                        <div style={{ fontWeight: 950, fontSize: '1rem', color: isSelected ? '#38bdf8' : '#f8fafc' }}>
                          Size {sz.size}
                        </div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: isSelected ? '#7dd3fc' : '#94a3b8', marginTop: 2 }}>
                          {archetypeLabel}
                        </div>
                        <div style={{ fontSize: '0.66rem', color: '#64748b', marginTop: 3 }}>
                          Tough {sz.baseToughness} ({sz.baseArmor}) • {sz.modSlots} Mods
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Size Metrics Card */}
                <div
                  style={{
                    background: 'rgba(14, 165, 233, 0.08)',
                    border: '1.5px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: 14,
                    padding: '14px 18px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 12
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                      BASE TOUGHNESS
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#22c55e' }}>
                      {selectedSizeDef.baseToughness} ({selectedSizeDef.baseArmor})
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Max Armor {selectedSizeDef.maxArmor}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                      MAX WOUNDS
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#f87171' }}>
                      {selectedSizeDef.wounds} Wounds
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Structure</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                      MOD SLOTS
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fbbf24' }}>
                      {selectedSizeDef.modSlots} Slots
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Customization</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                      CREW / PASSENGERS
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8' }}>
                      {selectedSizeDef.crew} / {selectedSizeDef.passengers}
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Capacity</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                      BASE HULL COST
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#e2e8f0' }}>
                      ${selectedSizeDef.cost.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Credits</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: 8, fontStyle: 'italic' }}>
                  Typical {selectedSizeDef.sizeCategory} craft in Sci-Fi Companion: <strong>{selectedSizeDef.typicalExamples}</strong>
                </div>
              </div>

              {/* PROMPT 3: LOCOMOTION & SPECIAL ARCHITECTURE */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', display: 'block', marginBottom: 10, letterSpacing: '0.05em' }}>
                  PROMPT 3: DRIVE & SPECIAL ARCHITECTURE
                </label>

                {/* Locomotion Options */}
                <div style={{ background: '#0f172a', padding: 16, borderRadius: 14, border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                    Locomotion / Drive Architecture
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {craftType === 'vehicle' ? (
                      <>
                        {['Hover / Grav', 'Wheeled', 'Tracked', 'VTOL / Rotor', 'Fixed-Wing Supersonic', 'Submersible / Naval'].map((loco) => (
                          <button
                            key={loco}
                            type="button"
                            onClick={() => setSelectedLocomotion(loco as VehicleLocomotion)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: 8,
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              background: selectedLocomotion === loco ? 'rgba(56, 189, 248, 0.25)' : '#1e293b',
                              color: selectedLocomotion === loco ? '#38bdf8' : '#cbd5e1',
                              border: selectedLocomotion === loco ? '1px solid #38bdf8' : '1px solid #334155',
                              cursor: 'pointer'
                            }}
                          >
                            {loco}
                          </button>
                        ))}
                      </>
                    ) : craftType === 'walker' ? (
                      <>
                        {['Bipedal Walker', 'Quadruped Walker'].map((loco) => (
                          <button
                            key={loco}
                            type="button"
                            onClick={() => setSelectedLocomotion(loco as VehicleLocomotion)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: 8,
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              background: selectedLocomotion === loco ? 'rgba(168, 85, 247, 0.25)' : '#1e293b',
                              color: selectedLocomotion === loco ? '#c084fc' : '#cbd5e1',
                              border: selectedLocomotion === loco ? '1px solid #a855f7' : '1px solid #334155',
                              cursor: 'pointer'
                            }}
                          >
                            {loco}
                          </button>
                        ))}
                      </>
                    ) : craftType === 'power_armor' ? (
                      <div style={{ padding: '8px 12px', background: 'rgba(245, 158, 11, 0.12)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.8rem', color: '#fbbf24' }}>
                        Powered Exoskeleton Harness with Motorized Myomer Servos
                      </div>
                    ) : (
                      <div style={{ padding: '8px 12px', background: 'rgba(56, 189, 248, 0.12)', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.8rem', color: '#38bdf8' }}>
                        Sublight Impulse Thrusters & Atmospheric Lift
                      </div>
                    )}
                  </div>

                  {/* Special Features based on Category */}
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 14, alignItems: 'center' }}>
                    {/* Heavy Armor Toggle */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#f8fafc', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedHeavyArmor}
                        onChange={(e) => setSelectedHeavyArmor(e.target.checked)}
                        style={{ width: 16, height: 16, accentColor: '#38bdf8' }}
                      />
                      <span>
                        Heavy Armor Rating (Immune to non-Heavy Weapons)
                      </span>
                    </label>

                    {/* Walker Jump Jets */}
                    {craftType === 'walker' && (
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#f8fafc', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedJumpJets}
                          onChange={(e) => setSelectedJumpJets(e.target.checked)}
                          style={{ width: 16, height: 16, accentColor: '#a855f7' }}
                        />
                        <span>
                          Vectored Jump Jets (12" Leaps & Stomp attack)
                        </span>
                      </label>
                    )}

                    {/* Power Armor Strength Steps */}
                    {craftType === 'power_armor' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 800 }}>WEARER STRENGTH BOOST:</span>
                        {[1, 2, 3, 4].map((stepCount) => (
                          <button
                            key={stepCount}
                            type="button"
                            onClick={() => setSelectedStrengthSteps(stepCount)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 6,
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              background: selectedStrengthSteps === stepCount ? 'rgba(245, 158, 11, 0.25)' : '#1e293b',
                              color: selectedStrengthSteps === stepCount ? '#fbbf24' : '#94a3b8',
                              border: selectedStrengthSteps === stepCount ? '1px solid #fbbf24' : '1px solid #334155',
                              cursor: 'pointer'
                            }}
                          >
                            +{stepCount} Steps ({stepCount === 1 ? 'd8' : stepCount === 2 ? 'd10' : stepCount === 3 ? 'd12+1' : 'd12+3'})
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: NAME & IDENTITY */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 600 }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Vessel / Suit Call-Sign or Name
                </label>
                <input
                  type="text"
                  placeholder={`e.g. ${selectedSizeDef.sizeCategory} ${craftType.replace('_', ' ')}`}
                  value={craftName}
                  onChange={(e) => setCraftName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Hull Registration / Serial Code
                </label>
                <input
                  type="text"
                  value={registry}
                  onChange={(e) => setRegistry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Tactical Role / Operational Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Specialized in urban combat, reconnaissance, or heavy planetary drops."
                  value={roleConcept}
                  onChange={(e) => setRoleConcept(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: WEAPONS & HARDPOINTS */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Add Weapon Bar */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: 16,
                  borderRadius: 14,
                  border: '1px solid #1e293b',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  alignItems: 'flex-end'
                }}
              >
                <div style={{ flex: '1 1 240px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: 4 }}>
                    SELECT WEAPON
                  </label>
                  <select
                    value={selectedWeaponDefId}
                    onChange={(e) => setSelectedWeaponDefId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: '#0f172a',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 700
                    }}
                  >
                    {applicableWeapons.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.damage}, AP {w.ap}, {w.modSlots} Slots)
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ flex: '1 1 180px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: 4 }}>
                    MOUNT LOCATION
                  </label>
                  <select
                    value={selectedMount}
                    onChange={(e) => setSelectedMount(e.target.value as WeaponMountLocation)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: '#0f172a',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 700
                    }}
                  >
                    {craftType === 'power_armor' ? (
                      <>
                        <option value="Forearm / Wrist">Forearm / Wrist</option>
                        <option value="Shoulder Mount">Shoulder Mount</option>
                        <option value="Right Arm / Wing">Right Hand Weapon</option>
                      </>
                    ) : craftType === 'walker' ? (
                      <>
                        <option value="Right Arm / Wing">Right Arm Hardpoint</option>
                        <option value="Left Arm / Wing">Left Arm Hardpoint</option>
                        <option value="Shoulder Mount">Torso / Shoulder Rack</option>
                        <option value="Turret (360°)">360° Torso Mount</option>
                      </>
                    ) : (
                      <>
                        <option value="Fixed Front">Fixed Front</option>
                        <option value="Turret (360°)">Turret (360°)</option>
                        <option value="Fixed Rear">Fixed Rear</option>
                        <option value="Port (Left)">Port (Left)</option>
                        <option value="Starboard (Right)">Starboard (Right)</option>
                      </>
                    )}
                  </select>
                </div>

                <button
                  onClick={handleAddWeapon}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#120d08',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  + Install Weapon
                </button>
              </div>

              {/* Installed Weapons List */}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                  Installed Weapons ({installedWeapons.length})
                </div>
                {installedWeapons.length === 0 ? (
                  <div style={{ padding: 18, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px dashed #334155', color: '#64748b', fontSize: '0.82rem', textAlign: 'center' }}>
                    No weapons installed. Select a weapon above to mount on this chassis.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                    {installedWeapons.map((wpn) => (
                      <div
                        key={wpn.id}
                        style={{
                          padding: '12px 14px',
                          background: '#0f172a',
                          borderRadius: 12,
                          border: '1px solid #1e293b',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#fff' }}>
                            {wpn.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: 2 }}>
                            Mount: {wpn.mount} • Range: {wpn.range}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>
                            Dmg: <strong style={{ color: '#f87171' }}>{wpn.damage}</strong> (AP {wpn.ap}) • Slots: {wpn.modSlots}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveWeapon(wpn.id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 8,
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#f87171',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: MODS & UPGRADES */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                Select Systems & Modifications (Available Slots: {stats.remainingModSlots})
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                {applicableMods.map((mod) => {
                  const isInstalled = installedMods.some((m) => m.modDefId === mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => handleToggleMod(mod)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        background: isInstalled ? 'rgba(56, 189, 248, 0.14)' : '#0f172a',
                        border: isInstalled ? '1.5px solid #38bdf8' : '1px solid #1e293b',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 8
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 900, fontSize: '0.88rem', color: isInstalled ? '#38bdf8' : '#fff' }}>
                            {mod.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 3 }}>
                            {mod.summary}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: 6,
                            background: isInstalled ? '#38bdf8' : '#1e293b',
                            color: isInstalled ? '#081a28' : '#94a3b8',
                            flexShrink: 0
                          }}
                        >
                          {mod.modSlots} {mod.modSlots === 1 ? 'Slot' : 'Slots'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        Cost: ${mod.cost.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & COMMISSION */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: 20,
                  borderRadius: 16,
                  border: '1.5px solid rgba(56, 189, 248, 0.4)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase' }}>
                      {craftType.replace('_', ' ').toUpperCase()} SPECIFICATION
                    </span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#fff', margin: '2px 0 0' }}>
                      {craftName.trim() || `${selectedSizeDef.sizeCategory} ${craftType.replace('_', ' ')}`}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      Registry: {registry} • Size {selectedSizeDef.size} ({selectedSizeDef.sizeCategory}) • {selectedLocomotion}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800 }}>ESTIMATED COST</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 950, color: '#fbbf24' }}>
                      ${stats.totalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Key Derived Stats Ribbon */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8, marginBottom: 16 }}>
                  <div style={{ background: '#0f172a', padding: '8px 10px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800 }}>TOUGHNESS</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#22c55e' }}>
                      {stats.finalToughness} ({stats.finalArmor}) {selectedHeavyArmor ? 'HA' : ''}
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '8px 10px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800 }}>
                      {craftType === 'walker' || craftType === 'power_armor' ? 'PACE' : 'SPEED'}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#38bdf8' }}>
                      {craftType === 'walker' || craftType === 'power_armor' ? `${stats.finalPace}"` : `${stats.finalTopSpeed} MPH`}
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '8px 10px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800 }}>HANDLING</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: stats.finalHandling >= 0 ? '#22c55e' : '#ef4444' }}>
                      {stats.finalHandling >= 0 ? `+${stats.finalHandling}` : stats.finalHandling}
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '8px 10px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800 }}>WOUNDS</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#f87171' }}>
                      {stats.maxWounds} Max
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '8px 10px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800 }}>SHIELDS</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#a78bfa' }}>
                      {stats.maxShields} HP
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '8px 10px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800 }}>MOD SLOTS</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: stats.remainingModSlots < 0 ? '#ef4444' : '#fbbf24' }}>
                      {stats.spentModSlots}/{stats.totalModSlots}
                    </div>
                  </div>
                </div>

                {craftType === 'power_armor' && (
                  <div style={{ padding: '8px 12px', background: 'rgba(167, 139, 250, 0.12)', borderRadius: 8, border: '1px solid rgba(167, 139, 250, 0.3)', marginBottom: 12, fontSize: '0.8rem', color: '#c4b5fd' }}>
                    <strong>Power Armor Wearer Enhancement:</strong> +{selectedStrengthSteps} Strength die steps {selectedStrengthSteps === 1 ? '(Min d8)' : selectedStrengthSteps === 2 ? '(Min d10)' : selectedStrengthSteps === 3 ? '(Min d12+1)' : '(Min d12+3)'}
                  </div>
                )}

                {/* Weapons & Mods Installed Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>
                      Weapons ({installedWeapons.length})
                    </div>
                    {installedWeapons.length === 0 ? (
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>None</span>
                    ) : (
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.78rem', color: '#cbd5e1' }}>
                        {installedWeapons.map((w) => (
                          <li key={w.id}>
                            <strong>{w.name}</strong> ({w.damage}, {w.mount})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>
                      Upgrades ({installedMods.length})
                    </div>
                    {installedMods.length === 0 ? (
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>None</span>
                    ) : (
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.78rem', color: '#cbd5e1' }}>
                        {installedMods.map((m) => (
                          <li key={m.id}>
                            <strong>{m.name}</strong>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.4)'
          }}
        >
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            style={{
              padding: '9px 16px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: step === 1 ? '#475569' : '#fff',
              fontWeight: 800,
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.84rem'
            }}
          >
            ← Previous
          </button>

          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
            Step {step} of 5
          </div>

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                padding: '9px 20px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: '#fff',
                fontWeight: 900,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.84rem',
                boxShadow: '0 4px 14px rgba(14, 165, 233, 0.35)'
              }}
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={handleFinishCommission}
              style={{
                padding: '10px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#fff',
                fontWeight: 950,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: '0 4px 18px rgba(34, 197, 94, 0.4)'
              }}
            >
              ✓ Commission into Hangar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
