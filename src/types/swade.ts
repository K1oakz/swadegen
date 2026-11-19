export type DieSides = 4 | 6 | 8 | 10 | 12;

export type AttributeId = 'agility' | 'smarts' | 'spirit' | 'strength' | 'vigor';

export type RankName = 'Novice' | 'Seasoned' | 'Veteran' | 'Heroic' | 'Legendary';

export type HindranceSeverity = 'Minor' | 'Major';

export type EdgeCategory =
  | 'Background'
  | 'Combat'
  | 'Leadership'
  | 'Power'
  | 'Professional'
  | 'Social'
  | 'Weird'
  | 'Legendary';

export type ArcaneBackgroundId =
  | 'none'
  | 'magic'
  | 'miracles'
  | 'psionics'
  | 'shamanism'
  | 'weird_science'
  | 'gifted';

export interface SourceBook {
  id: string;
  name: string;
  abbr: string;
  icon: string;
  description: string;
}

export interface AncestryTrait {
  name: string;
  description: string;
}

export interface AncestryDef {
  id: string;
  name: string;
  source: string;
  summary: string;
  freeEdgeBonus?: number;
  attributeBonuses?: Partial<Record<AttributeId, number>>; // +1 step = start at d6
  skillBonuses?: Record<string, number>; // skillId -> bonus steps
  paceMod?: number;
  parryMod?: number;
  toughnessMod?: number;
  sizeMod?: number;
  traits: AncestryTrait[];
}

export interface HindranceDef {
  id: string;
  name: string;
  severity: 'Minor' | 'Major' | 'Minor/Major';
  summary: string;
  effect: string;
  source?: string;
}

export interface SelectedHindrance {
  hindranceId: string;
  name: string;
  severity: HindranceSeverity;
  summary: string;
  notes?: string;
}

export interface HindranceAllocation {
  attributes: number; // Each costs 2 pts (+1 Attribute point)
  edges: number;      // Each costs 2 pts (+1 Edge)
  skills: number;     // Each costs 1 pt (+1 Skill point)
  wealth: number;     // Each costs 1 pt (+$1,000 starting funds)
}

export interface SkillDef {
  id: string;
  name: string;
  linkedAttribute: AttributeId;
  isCore: boolean;
  description: string;
}

export interface CharacterSkill {
  skillId: string;
  name: string;
  linkedAttribute: AttributeId;
  isCore: boolean;
  die: DieSides | 0; // 0 = Unskilled (d4-2)
  modifier: number;
  specialty?: string;
}

export interface EdgeDef {
  id: string;
  name: string;
  category: EdgeCategory;
  rankRequired: RankName;
  requirementsText: string;
  minAttributes?: Partial<Record<AttributeId, DieSides>>;
  minSkills?: Record<string, DieSides>;
  requiresArcane?: boolean;
  requiresWildCard?: boolean;
  summary: string;
  source?: string;
  parryBonus?: number;
  toughnessBonus?: number;
  paceBonus?: number;
  runningDieBonus?: number;
  benniesBonus?: number;
  powerPointsBonus?: number;
  maxLoadMultiplier?: number;
}

export interface SelectedEdge {
  edgeId: string;
  name: string;
  category: EdgeCategory;
  rankRequired: RankName;
  summary: string;
  notes?: string;
  source?: 'Creation' | 'Ancestry' | 'Hindrance' | 'Advance';
}

export interface ArcaneBackgroundDef {
  id: ArcaneBackgroundId;
  name: string;
  arcaneSkillId: string;
  arcaneSkillName: string;
  startingPowers: number;
  startingPowerPoints: number;
  summary: string;
}

export interface PowerDef {
  id: string;
  name: string;
  rankRequired: RankName;
  powerPoints: string;
  range: string;
  duration: string;
  summary: string;
  damage?: string;
  source?: string;
}

export interface CharacterPower {
  id: string;
  powerId: string;
  name: string;
  trapping: string;
  powerPoints: string;
  range: string;
  duration: string;
  summary: string;
  damage?: string;
}

export interface WeaponItem {
  id: string;
  name: string;
  category: 'Melee' | 'Ranged' | 'Thrown' | 'Special';
  damage: string; // e.g., "Str+d6", "2d6", "2d8"
  ap: number;
  range: string; // e.g., "Melee", "12/24/48"
  rof: number;
  minStr: DieSides;
  parryMod?: number;
  weight: number;
  cost: number;
  equipped: boolean;
  notes?: string;
  source?: string;
}

export interface ArmorItem {
  id: string;
  name: string;
  type: 'Armor' | 'Shield';
  armorBonus: number; // adds to Toughness if Armor
  parryBonus: number; // adds to Parry if Shield
  coverBonus?: number;
  minStr: DieSides;
  weight: number;
  cost: number;
  equipped: boolean;
  notes?: string;
  source?: string;
}

export interface GearItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  cost: number;
  notes?: string;
  source?: string;
}

export interface AdvanceEntry {
  number: number; // 1, 2, 3...
  rank: RankName;
  type: 'Edge' | 'Skills' | 'Attribute' | 'Hindrance' | 'Other';
  description: string;
}

export interface SettingRulesConfig {
  bornAHero: boolean;       // +1 free Edge at creation, ignore Rank reqs at creation
  moreSkillPoints: boolean; // 15 base skill points instead of 12
  unarmoredHero: boolean;   // +2 Toughness when wearing no armor
}

export interface PlayState {
  wounds: number;          // 0 to 3 (4 = Incapacitated)
  maxWounds: number;       // default 3 for Wild Card
  fatigue: number;         // 0 to 2 (3 = Incapacitated)
  bennies: number;         // default 3 (+ Luck/Great Luck)
  currentPowerPoints: number;
  shaken: boolean;
  distracted: boolean;     // -2 to all Trait rolls
  vulnerable: boolean;     // +2 to actions/attacks against character
  boundOrEntangled: boolean;
  conviction: boolean;     // +d6 to all Trait & Damage rolls when active
  aiming: boolean;         // +2 Shooting/Athletics(throwing) or ignore 4 pts penalty
}

export interface SwadeCharacter {
  id: string;
  name: string;
  concept: string;
  setting: string;
  ancestryId: string;
  customAncestryName?: string;
  isWildCard: boolean;
  advancesCount: number;
  advancesList: AdvanceEntry[];
  attributes: Record<AttributeId, DieSides>;
  attributeModifiers: Record<AttributeId, number>;
  skills: CharacterSkill[];
  hindrances: SelectedHindrance[];
  hindranceAllocation: HindranceAllocation;
  edges: SelectedEdge[];
  arcaneBackgroundId: ArcaneBackgroundId;
  maxPowerPointsMod: number;
  powers: CharacterPower[];
  weapons: WeaponItem[];
  armor: ArmorItem[];
  gear: GearItem[];
  currency: number;
  customPaceMod: number;
  customParryMod: number;
  customToughnessMod: number;
  customSizeMod: number;
  settingRules: SettingRulesConfig;
  sourceBooks?: string[];
  playState: PlayState;
  backstory: string;
  notes: string;
  avatarEmoji: string;
  updatedAt: number;
}

export interface DieExplosionResult {
  sides: number;
  rolls: number[];
  total: number;
  acedCount: number;
}

export interface RollLogEntry {
  id: string;
  timestamp: number;
  characterName: string;
  label: string;
  skillId?: string;
  rollType: 'trait' | 'damage' | 'running' | 'custom';
  traitDieResult: DieExplosionResult;
  wildDieResult?: DieExplosionResult;
  extraDiceResults?: DieExplosionResult[]; // e.g., weapon damage dice or conviction d6
  convictionResult?: DieExplosionResult;
  usedWildDie: boolean;
  modifier: number;
  modifierBreakdown: string[];
  finalTotal: number;
  targetNumber: number;
  isCriticalFailure: boolean;
  isSuccess: boolean;
  raises: number;
  canRerollParams?: {
    label: string;
    rollType: 'trait' | 'damage' | 'running' | 'custom';
    dieSides: DieSides;
    isUnskilled?: boolean;
    baseModifier?: number;
    targetNumber?: number;
    damageFormula?: string;
    bonusRaiseD6?: boolean;
  };
}
