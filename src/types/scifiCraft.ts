export type SciFiCraftType = 'vehicle' | 'walker' | 'power_armor' | 'starship';

export type VehicleLocomotion =
  | 'Wheeled'
  | 'Tracked'
  | 'Hover / Grav'
  | 'VTOL / Rotor'
  | 'Fixed-Wing Supersonic'
  | 'Submersible / Naval'
  | 'Bipedal Walker'
  | 'Quadruped Walker'
  | 'Powered Exosuit'
  | 'Spaceflight';

export interface CraftFrameDef {
  id: string;
  craftType: SciFiCraftType;
  categoryName: string;
  name: string;
  size: number;
  sizeCategory: string;
  defaultPace?: number;
  runningDie?: number;
  handling: number;
  topSpeed: number; // MPH
  baseToughness: number;
  baseArmor: number;
  maxArmor: number;
  wounds: number;
  crew: number;
  passengers: number;
  energy: number;
  modSlots: number;
  cost: number;
  strengthBonusSteps?: number; // Power Armor strength boost (+1, +2, +3, +4 steps)
  minStrength?: string; // e.g. "d10" or "d12+2"
  isHeavyArmor?: boolean;
  notes: string;
  locomotion: VehicleLocomotion;
}

export interface CraftModDef {
  id: string;
  name: string;
  applicableTypes: SciFiCraftType[];
  category: 'armor' | 'defense' | 'propulsion' | 'sensor' | 'utility' | 'weapon';
  modSlots: number;
  cost: number;
  toughnessBonus?: number;
  armorBonus?: number;
  handlingBonus?: number;
  speedBonus?: number;
  paceBonus?: number;
  woundsBonus?: number;
  shieldsBonus?: number;
  strengthStepsBonus?: number;
  summary: string;
  effect: string;
  isHeavyArmor?: boolean;
}

export type WeaponMountLocation =
  | 'Fixed Front'
  | 'Fixed Rear'
  | 'Turret (360°)'
  | 'Right Arm / Wing'
  | 'Left Arm / Wing'
  | 'Shoulder Mount'
  | 'Forearm / Wrist'
  | 'Port (Left)'
  | 'Starboard (Right)'
  | 'Internal Bay';

export interface CraftWeaponDef {
  id: string;
  name: string;
  applicableTypes: SciFiCraftType[];
  range: string;
  damage: string;
  ap: number;
  rof: number;
  modSlots: number;
  cost: number;
  isHeavyWeapon: boolean;
  notes: string;
}

export interface InstalledCraftWeapon {
  id: string;
  weaponDefId: string;
  name: string;
  mount: WeaponMountLocation;
  range: string;
  damage: string;
  ap: number;
  rof: number;
  modSlots: number;
  cost: number;
  isHeavyWeapon: boolean;
  notes: string;
}

export interface InstalledCraftMod {
  id: string;
  modDefId: string;
  name: string;
  category: 'armor' | 'defense' | 'propulsion' | 'sensor' | 'utility' | 'weapon';
  slots: number;
  cost: number;
  count: number;
  notes?: string;
  toughnessBonus?: number;
  armorBonus?: number;
  handlingBonus?: number;
  speedBonus?: number;
  paceBonus?: number;
  woundsBonus?: number;
  shieldsBonus?: number;
  strengthStepsBonus?: number;
}

export interface SciFiCraft {
  id: string;
  name: string;
  craftType: SciFiCraftType;
  classification: string;
  frameDefId: string;
  registry: string;
  size: number;
  sizeCategory: string;
  locomotion: VehicleLocomotion;
  pace: number;
  runningDie: number;
  handling: number;
  topSpeed: number; // MPH
  toughnessBase: number;
  armor: number;
  toughnessTotal: number;
  isHeavyArmor: boolean;
  wounds: number;
  maxWounds: number;
  shields: number;
  maxShields: number;
  crew: number;
  passengers: number;
  energy: number;
  maxEnergy: number;
  cargo: string;
  installedMods: InstalledCraftMod[];
  weapons: InstalledCraftWeapon[];
  hasFTL?: boolean;
  hasAI?: boolean;
  aiSkillDie?: number;
  hasJumpJets?: boolean;
  strengthBonusSteps?: number; // Power Armor wearer strength steps
  minStrength?: string;
  operatorId?: string; // Pilot or wearer character ID
  notes: string;
  updatedAt: number;
}
