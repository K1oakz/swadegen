export type BestiarySourcebook =
  | 'Core Rules'
  | 'Fantasy Companion'
  | 'Sci-Fi Companion'
  | 'Horror Companion'
  | 'Super Powers Companion';

export type CreatureClassification =
  | 'Beast'
  | 'Undead'
  | 'Construct'
  | 'Monstrosity'
  | 'Alien'
  | 'Aberration'
  | 'Demon & Fiend'
  | 'Humanoid & Folk'
  | 'Dragon';

export interface CreatureAbility {
  name: string;
  effect: string;
}

export interface CreatureStatBlock {
  id: string;
  name: string;
  subtitle: string;
  sourcebook: BestiarySourcebook;
  classification: CreatureClassification;
  isWildCard: boolean;
  size: number;
  scale: 'Tiny' | 'Small' | 'Normal' | 'Large' | 'Huge' | 'Gargantuan';
  pace: string | number;
  parry: number;
  toughness: number;
  armor: number;
  attributes: {
    agility: string;
    smarts: string;
    spirit: string;
    strength: string;
    vigor: string;
  };
  skills: { name: string; die: string }[];
  abilities: CreatureAbility[];
  gear?: string[];
  description: string;
  tactics?: string;
  habitat?: string;
}
