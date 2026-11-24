import { CraftFrameDef, InstalledCraftMod, InstalledCraftWeapon, SciFiCraft, SciFiCraftType } from '../types/scifiCraft';
import { StarshipVessel } from '../types/starship';
import { CRAFT_FRAMES } from '../data/scifiCraftData';

export interface CalculatedCraftStats {
  totalModSlots: number;
  spentModSlots: number;
  remainingModSlots: number;
  totalCost: number;
  finalToughness: number;
  finalArmor: number;
  finalHandling: number;
  finalTopSpeed: number;
  finalPace: number;
  maxWounds: number;
  maxShields: number;
  isHeavyArmor: boolean;
  strengthBonusSteps: number;
  minStrength?: string;
  hasJumpJets: boolean;
  hasCBRN: boolean;
  hasStealth: boolean;
  hasHUD: boolean;
  hasAutoRepair: boolean;
  hasECM: boolean;
}

export function getCraftFrameDef(frameId: string, craftType?: SciFiCraftType): CraftFrameDef {
  const found = CRAFT_FRAMES.find((f) => f.id === frameId);
  if (found) return found;

  if (craftType) {
    const match = CRAFT_FRAMES.find((f) => f.craftType === craftType);
    if (match) return match;
  }
  return CRAFT_FRAMES[0];
}

export function calculateCraftStats(craft: SciFiCraft): CalculatedCraftStats {
  const frame = getCraftFrameDef(craft.frameDefId, craft.craftType);
  const totalModSlots = frame.modSlots || 8;

  let spentModSlots = 0;
  let modsCost = 0;
  let bonusArmor = 0;
  let bonusToughness = 0;
  let bonusHandling = 0;
  let bonusSpeed = 0;
  let bonusPace = 0;
  let bonusWounds = 0;
  let bonusShields = 0;
  let bonusStrengthSteps = frame.strengthBonusSteps || 0;
  let isHeavyArmor = Boolean(frame.isHeavyArmor);
  let hasJumpJets = Boolean(craft.hasJumpJets);
  let hasCBRN = false;
  let hasStealth = false;
  let hasHUD = false;
  let hasAutoRepair = false;
  let hasECM = false;

  // Mods
  for (const mod of craft.installedMods) {
    const count = mod.count || 1;
    spentModSlots += (mod.slots || 0) * count;
    modsCost += (mod.cost || 0) * count;

    if (mod.armorBonus) bonusArmor += mod.armorBonus * count;
    if (mod.toughnessBonus) bonusToughness += mod.toughnessBonus * count;
    if (mod.handlingBonus) bonusHandling += mod.handlingBonus * count;
    if (mod.speedBonus) bonusSpeed += mod.speedBonus * count;
    if (mod.paceBonus) bonusPace += mod.paceBonus * count;
    if (mod.woundsBonus) bonusWounds += mod.woundsBonus * count;
    if (mod.shieldsBonus) bonusShields += mod.shieldsBonus * count;
    if (mod.strengthStepsBonus) bonusStrengthSteps += mod.strengthStepsBonus * count;

    if (mod.modDefId === 'mod_extra_armor_heavy') isHeavyArmor = true;
    if (mod.modDefId === 'mod_jump_jets') hasJumpJets = true;
    if (mod.modDefId === 'mod_life_support_cbrn') hasCBRN = true;
    if (mod.modDefId === 'mod_chameleon_skin') hasStealth = true;
    if (mod.modDefId === 'mod_tactical_hud') hasHUD = true;
    if (mod.modDefId === 'mod_auto_repair') hasAutoRepair = true;
    if (mod.modDefId === 'mod_ecm_suite') hasECM = true;
  }

  // Weapons cost and slots
  let weaponsCost = 0;
  for (const wpn of craft.weapons) {
    spentModSlots += wpn.modSlots || 0;
    weaponsCost += wpn.cost || 0;
  }

  const finalArmor = frame.baseArmor + bonusArmor;
  const finalToughness = frame.baseToughness + finalArmor;
  const finalHandling = frame.handling + bonusHandling;
  const finalTopSpeed = Math.max(5, frame.topSpeed + bonusSpeed);
  const finalPace = Math.max(2, (frame.defaultPace || 6) + bonusPace);
  const maxWounds = frame.wounds + bonusWounds;
  const maxShields = bonusShields;
  const totalCost = frame.cost + modsCost + weaponsCost;

  return {
    totalModSlots,
    spentModSlots,
    remainingModSlots: totalModSlots - spentModSlots,
    totalCost,
    finalToughness,
    finalArmor,
    finalHandling,
    finalTopSpeed,
    finalPace,
    maxWounds,
    maxShields,
    isHeavyArmor,
    strengthBonusSteps: bonusStrengthSteps,
    minStrength: frame.minStrength,
    hasJumpJets,
    hasCBRN,
    hasStealth,
    hasHUD,
    hasAutoRepair,
    hasECM
  };
}

export function createBlankCraft(
  name: string,
  craftType: SciFiCraftType,
  frameId: string
): SciFiCraft {
  const frame = getCraftFrameDef(frameId, craftType);
  const stats = calculateCraftStats({
    id: '',
    name,
    craftType,
    classification: frame.name,
    frameDefId: frame.id,
    registry: `REG-${Math.floor(100 + Math.random() * 900)}`,
    size: frame.size,
    sizeCategory: frame.sizeCategory,
    locomotion: frame.locomotion,
    pace: frame.defaultPace || 6,
    runningDie: frame.runningDie || 6,
    handling: frame.handling,
    topSpeed: frame.topSpeed,
    toughnessBase: frame.baseToughness,
    armor: frame.baseArmor,
    toughnessTotal: frame.baseToughness + frame.baseArmor,
    isHeavyArmor: Boolean(frame.isHeavyArmor),
    wounds: 0,
    maxWounds: frame.wounds,
    shields: 0,
    maxShields: 0,
    crew: frame.crew,
    passengers: frame.passengers,
    energy: frame.energy,
    maxEnergy: frame.energy,
    cargo: 'Standard Stowage',
    installedMods: [],
    weapons: [],
    notes: frame.notes,
    updatedAt: Date.now()
  });

  return {
    id: `craft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    craftType,
    classification: frame.name,
    frameDefId: frame.id,
    registry: `REG-${Math.floor(100 + Math.random() * 900)}`,
    size: frame.size,
    sizeCategory: frame.sizeCategory,
    locomotion: frame.locomotion,
    pace: stats.finalPace,
    runningDie: frame.runningDie || 6,
    handling: stats.finalHandling,
    topSpeed: stats.finalTopSpeed,
    toughnessBase: frame.baseToughness,
    armor: stats.finalArmor,
    toughnessTotal: stats.finalToughness,
    isHeavyArmor: stats.isHeavyArmor,
    wounds: 0,
    maxWounds: stats.maxWounds,
    shields: stats.maxShields,
    maxShields: stats.maxShields,
    crew: frame.crew,
    passengers: frame.passengers,
    energy: frame.energy,
    maxEnergy: frame.energy,
    cargo: 'Standard Stowage',
    installedMods: [],
    weapons: [],
    strengthBonusSteps: stats.strengthBonusSteps,
    minStrength: stats.minStrength,
    hasJumpJets: stats.hasJumpJets,
    notes: frame.notes,
    updatedAt: Date.now()
  };
}

// ============================================================================
// SCI-FI COMPANION OUT OF CONTROL & CRITICAL HIT TABLES
// ============================================================================

export interface TableResult {
  roll: number;
  title: string;
  description: string;
}

export const VEHICLE_OUT_OF_CONTROL_TABLE: TableResult[] = [
  {
    roll: 2,
    title: 'Major Collision / Rollover',
    description: 'The vehicle rolls or collides violently! Vehicle and all passengers suffer 3d6 damage (Heavy Armor protects vehicle).'
  },
  {
    roll: 3,
    title: 'Spinout',
    description: 'The craft spins out of control. It moves 1d6" in its current direction, turns 180°, and is Shaken / comes to a halt.'
  },
  {
    roll: 4,
    title: 'Skid / Slide',
    description: 'The vehicle slides 1d4" perpendicular to direction of travel. Everyone inside must make an Agility roll or be Distracted.'
  },
  {
    roll: 5,
    title: 'Systems Overheat',
    description: 'Drive system strains under pressure. Top speed is halved until an engineer makes a successful Repair roll.'
  },
  {
    roll: 6,
    title: 'Sudden Stall',
    description: 'Engine sputters and stalls out. The vehicle stops dead; starting it back up requires an action and an Agility/Piloting roll.'
  },
  {
    roll: 7,
    title: 'Minor Skid',
    description: 'Tires screech or repulsors flare. The pilot is Distracted for the remainder of this combat round.'
  },
  {
    roll: 8,
    title: 'Glancing Impact',
    description: 'Scrapes terrain or an obstacle. Vehicle takes 2d4 damage; crew is unaffected.'
  },
  {
    roll: 9,
    title: 'Weapon Mount Jolt',
    description: 'Violent motion jars weapon linkages. All weapon attacks suffer -2 until the start of the next turn.'
  },
  {
    roll: 10,
    title: 'Shield Flicker / Breached',
    description: 'Energy surge causes active shields to collapse and drain 1d6 shield points.'
  },
  {
    roll: 11,
    title: 'Tailspin / Violent Drift',
    description: 'The vehicle fishtails violently. Passengers must succeed on an Athletics roll or suffer a Level of Fatigue from whiplash.'
  },
  {
    roll: 12,
    title: 'Catastrophic Wreck',
    description: 'The craft flips, crashes into a structure, or explodes! 4d6 damage to vehicle and crew; catch fire on a 1 on 1d6.'
  }
];

export function rollOutOfControl(): TableResult {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const sum = d1 + d2;
  return VEHICLE_OUT_OF_CONTROL_TABLE.find((t) => t.roll === sum) || VEHICLE_OUT_OF_CONTROL_TABLE[5];
}

export function convertCraftToVessel(craft: SciFiCraft): StarshipVessel {
  return {
    id: craft.id,
    name: craft.name,
    registry: craft.registry,
    classModel: craft.classification,
    sizeCategory: (craft.sizeCategory as any) || 'Normal',
    size: craft.size,
    handling: craft.handling,
    topSpeed: craft.topSpeed,
    toughnessBase: craft.toughnessBase,
    armorBonus: craft.armor,
    toughnessTotal: craft.toughnessTotal,
    wounds: craft.wounds,
    maxWounds: craft.maxWounds,
    shields: craft.shields,
    maxShields: craft.maxShields,
    crew: craft.crew,
    crewCapacity: craft.crew + craft.passengers,
    energy: craft.energy,
    maxEnergy: craft.maxEnergy,
    cargoCapacity: 50,
    installedMods: craft.installedMods.map((m) => ({
      id: m.id,
      modDefId: m.modDefId,
      name: m.name,
      category:
        m.category === 'armor' || m.category === 'defense'
          ? 'structural'
          : m.category === 'propulsion'
          ? 'locomotion'
          : 'core',
      slots: m.slots,
      cost: m.cost,
      count: m.count,
      toughnessBonus: m.toughnessBonus,
      armorBonus: m.armorBonus,
      handlingBonus: m.handlingBonus,
      speedBonus: m.speedBonus,
      woundsBonus: m.woundsBonus
    })),
    weapons: craft.weapons.map((w) => ({
      id: w.id,
      weaponDefId: w.weaponDefId,
      name: w.name,
      arc: (w.mount.includes('Rear')
        ? 'Fixed Rear'
        : w.mount.includes('Turret')
        ? 'Turret'
        : 'Fixed Front') as any,
      range: w.range,
      damage: w.damage,
      ap: w.ap,
      rof: w.rof,
      modSlots: w.modSlots,
      cost: w.cost,
      notes: `${w.mount} • ${w.notes || ''}`
    })),
    hasFTL: Boolean(craft.hasFTL),
    hasAI: Boolean(craft.hasAI),
    notes: craft.notes,
    updatedAt: craft.updatedAt,
    craftType: craft.craftType,
    locomotion: craft.locomotion,
    pace: craft.pace,
    runningDie: craft.runningDie,
    strengthBonusSteps: craft.strengthBonusSteps,
    minStrength: craft.minStrength,
    isHeavyArmor: craft.isHeavyArmor,
    hasJumpJets: craft.hasJumpJets
  };
}
