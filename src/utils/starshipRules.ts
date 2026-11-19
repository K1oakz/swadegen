import {
  StarshipFrameDef,
  StarshipModDef,
  StarshipSizeCategory,
  StarshipVessel,
  InstalledStarshipMod,
  InstalledStarshipWeapon,
  WeaponArc
} from '../types/starship';
import {
  STARSHIP_FRAMES,
  STARSHIP_MODIFICATIONS,
  STARSHIP_WEAPONS_CATALOG,
  ASTROGATION_MISHAPS
} from '../data/starshipData';

export function getFrameDef(category: StarshipSizeCategory): StarshipFrameDef {
  return (
    STARSHIP_FRAMES.find((f) => f.category === category) || STARSHIP_FRAMES[2] // default Huge
  );
}

export interface StarshipCalculatedStats {
  totalModSlots: number;
  spentModSlots: number;
  remainingModSlots: number;
  baseHullCost: number;
  modsCost: number;
  weaponsCost: number;
  totalCost: number;
  finalHandling: number;
  finalTopSpeed: number;
  finalToughness: number;
  finalArmor: number;
  maxWounds: number;
  cargoCapacity: number;
  hasFTL: boolean;
  hasAI: boolean;
}

export function calculateStarshipStats(vessel: StarshipVessel): StarshipCalculatedStats {
  const frame = getFrameDef(vessel.sizeCategory);
  const totalModSlots = vessel.size * frame.modsPerSize;
  const baseHullCost = vessel.size * frame.costPerSize;

  let spentModSlots = 0;
  let modsCost = 0;
  let bonusHandling = 0;
  let bonusSpeed = 0;
  let bonusToughness = 0;
  let bonusArmor = 0;
  let bonusWounds = 0;
  let hasFTL = false;
  let hasAI = false;
  let extraCargoHold = 0;

  for (const mod of vessel.installedMods) {
    spentModSlots += (mod.slots || 0) * (mod.count || 1);
    modsCost += (mod.cost || 0) * (mod.count || 1);
    if (mod.handlingBonus) bonusHandling += mod.handlingBonus * (mod.count || 1);
    if (mod.speedBonus) bonusSpeed += mod.speedBonus * (mod.count || 1);
    if (mod.toughnessBonus) bonusToughness += mod.toughnessBonus * (mod.count || 1);
    if (mod.armorBonus) bonusArmor += mod.armorBonus * (mod.count || 1);
    if (mod.woundsBonus) bonusWounds += mod.woundsBonus * (mod.count || 1);

    if (mod.modDefId === 'ftl_drive') hasFTL = true;
    if (mod.modDefId === 'ai_core') hasAI = true;
    if (mod.modDefId === 'bulk_cargo') extraCargoHold += (vessel.size * 250) * (mod.count || 1);
  }

  let weaponsCost = 0;
  for (const weapon of vessel.weapons) {
    spentModSlots += weapon.modSlots || 0;
    weaponsCost += weapon.cost || 0;
  }

  const remainingModSlots = totalModSlots - spentModSlots;
  const cargoFromRemaining = Math.max(0, remainingModSlots) * 125;
  const totalCargo = cargoFromRemaining + extraCargoHold;

  const totalCost = baseHullCost + modsCost + weaponsCost;

  return {
    totalModSlots,
    spentModSlots,
    remainingModSlots,
    baseHullCost,
    modsCost,
    weaponsCost,
    totalCost,
    finalHandling: frame.handling + bonusHandling,
    finalTopSpeed: frame.topSpeed + bonusSpeed,
    finalToughness: frame.baseToughness + (vessel.armorBonus || 0) + bonusToughness,
    finalArmor: (vessel.armorBonus || 0) + bonusArmor,
    maxWounds: frame.wounds + bonusWounds,
    cargoCapacity: totalCargo,
    hasFTL,
    hasAI
  };
}

export function createBlankStarship(
  category: StarshipSizeCategory = 'Huge',
  name: string = 'Unnamed Starship'
): StarshipVessel {
  const frame = getFrameDef(category);
  const size = frame.defaultSize;
  const baseToughness = frame.baseToughness;
  const maxWounds = frame.wounds;
  const initialEnergy = frame.energy;
  const totalSlots = size * frame.modsPerSize;

  return {
    id: 'starship_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name,
    registry: 'NX-' + Math.floor(1000 + Math.random() * 9000),
    classModel: `${category} Class Vessel`,
    sizeCategory: category,
    size,
    handling: frame.handling,
    topSpeed: frame.topSpeed,
    toughnessBase: baseToughness,
    armorBonus: 4,
    toughnessTotal: baseToughness + 4,
    wounds: 0,
    maxWounds,
    shields: 0,
    maxShields: 0,
    crew: frame.crew,
    crewCapacity: frame.crew * 2,
    energy: initialEnergy,
    maxEnergy: initialEnergy,
    cargoCapacity: totalSlots * 125,
    hasFTL: false,
    hasAI: false,
    notes: 'Newly commissioned starframe ready for outfitting in the orbital drydock.',
    installedMods: [],
    weapons: [],
    updatedAt: Date.now()
  };
}

export function rollAstrogationMishap(): {
  roll: number;
  title: string;
  description: string;
} {
  const roll = Math.floor(Math.random() * 20) + 1;
  let found = ASTROGATION_MISHAPS[ASTROGATION_MISHAPS.length - 1];

  for (const entry of ASTROGATION_MISHAPS) {
    const parts = entry.range.split('–').map((p) => parseInt(p.trim(), 10));
    if (parts.length === 2 && roll >= parts[0] && roll <= parts[1]) {
      found = entry;
      break;
    } else if (parts.length === 1 && roll === parts[0]) {
      found = entry;
      break;
    }
  }

  return {
    roll,
    title: found.title,
    description: found.description
  };
}
