export type StarshipSizeCategory =
  | 'Normal'
  | 'Large'
  | 'Huge'
  | 'Gargantuan'
  | 'Gargantuan+1'
  | 'Gargantuan+2'
  | 'Gargantuan+3';

export interface StarshipFrameDef {
  category: StarshipSizeCategory;
  minSize: number;
  maxSize: number;
  defaultSize: number;
  lengthRange: string;
  handling: number;
  topSpeed: number;
  baseToughness: number;
  maxArmor: number;
  wounds: number;
  crew: number;
  energy: number;
  modsPerSize: number;
  costPerSize: number;
  notes: string;
}

export interface StarshipModDef {
  id: string;
  name: string;
  category: 'negative' | 'core' | 'locomotion' | 'personnel' | 'structural';
  slotsCalc: (size: number) => number;
  costCalc: (size: number) => number;
  slotsLabel: string;
  costLabel: string;
  maxAllowed: number; // 0 or 99 = unlimited
  summary: string;
  effect: string;
  toughnessBonus?: number;
  armorBonus?: number;
  handlingBonus?: number;
  speedBonus?: number;
  woundsBonus?: number;
}

export interface StarshipWeaponDef {
  id: string;
  name: string;
  range: string;
  damage: string;
  ap: number;
  rof: number;
  modSlots: number;
  cost: number;
  notes: string;
}

export type WeaponArc = 'Fixed Front' | 'Fixed Rear' | 'Turret' | 'Port (Left)' | 'Starboard (Right)';

export interface InstalledStarshipWeapon {
  id: string;
  weaponDefId: string;
  name: string;
  arc: WeaponArc;
  range: string;
  damage: string;
  ap: number;
  rof: number;
  modSlots: number;
  cost: number;
  notes: string;
}

export interface InstalledStarshipMod {
  id: string;
  modDefId: string;
  name: string;
  category: 'negative' | 'core' | 'locomotion' | 'personnel' | 'structural';
  slots: number;
  cost: number;
  count: number;
  notes?: string;
  toughnessBonus?: number;
  armorBonus?: number;
  handlingBonus?: number;
  speedBonus?: number;
  woundsBonus?: number;
}

export interface StarshipVessel {
  id: string;
  name: string;
  registry: string;
  classModel: string;
  sizeCategory: StarshipSizeCategory;
  size: number;
  handling: number;
  topSpeed: number;
  toughnessBase: number;
  armorBonus: number;
  toughnessTotal: number;
  wounds: number;
  maxWounds: number;
  shields: number;
  maxShields: number;
  crew: number;
  crewCapacity: number;
  energy: number;
  maxEnergy: number;
  cargoCapacity: number; // in cubic feet
  installedMods: InstalledStarshipMod[];
  weapons: InstalledStarshipWeapon[];
  hasFTL: boolean;
  hasAI: boolean;
  aiSkillDie?: number;
  notes: string;
  captainCharacterId?: string;
  updatedAt: number;
}
