import {
  AncestryDef,
  ArcaneBackgroundDef,
  ArmorItem,
  AttributeId,
  DieSides,
  EdgeDef,
  HindranceDef,
  PowerDef,
  SkillDef,
  SourceBook,
  SwadeCharacter,
  WeaponItem
} from '../types/swade';

export const SWADE_SOURCE_BOOKS: SourceBook[] = [
  {
    id: 'core',
    name: 'SWADE Core Rules',
    abbr: 'Core',
    icon: '📕',
    description: 'Standard Savage Worlds Adventure Edition Core Rules.'
  },
  {
    id: 'fantasy',
    name: 'Fantasy Companion',
    abbr: 'Fantasy',
    icon: '🧙',
    description: 'High fantasy ancestries (Orcs, Goblins), arcane archers, paladins, and mythic armory.'
  },
  {
    id: 'scifi',
    name: 'Science Fiction Companion',
    abbr: 'Sci-Fi',
    icon: '🚀',
    description: 'Cyborgs, insectoids, laser & plasma rifles, power armor, and cyberware.'
  },
  {
    id: 'horror',
    name: 'Horror Companion',
    abbr: 'Horror',
    icon: '🧛',
    description: 'Dhampirs, gothic monster-hunters, sanity mechanics, and occult relics.'
  },
  {
    id: 'superpowers',
    name: 'Super Powers Companion',
    abbr: 'Super Powers',
    icon: '⚡',
    description: 'Four-color and gritty superhuman archetypes, power points, and mutant powers.'
  },
  {
    id: 'deadlands',
    name: 'Deadlands: The Weird West',
    abbr: 'Deadlands',
    icon: '🤠',
    description: 'Gunslingers, Hucksters, Mad Scientists, Blessed, and Harrowed of the Weird West.'
  },
  {
    id: 'pathfinder',
    name: 'Pathfinder for Savage Worlds',
    abbr: 'Pathfinder',
    icon: '🛡️',
    description: 'Golarion fantasy classes, domains, deities, and core Pathfinder ancestries.'
  }
];

export const DIE_STEPS: DieSides[] = [4, 6, 8, 10, 12];

export const ATTRIBUTE_META: Record<AttributeId, { name: string; short: string; icon: string; color: string; description: string }> = {
  agility: {
    name: 'Agility',
    short: 'AGI',
    icon: '⚡',
    color: '#38bdf8',
    description: 'Nimbleness, dexterity, reflexes, and overall physical coordination.'
  },
  smarts: {
    name: 'Smarts',
    short: 'SMA',
    icon: '🧠',
    color: '#a855f7',
    description: 'Raw intelligence, perception, education, and mental acuity.'
  },
  spirit: {
    name: 'Spirit',
    short: 'SPI',
    icon: '🔥',
    color: '#f59e0b',
    description: 'Inner wisdom, willpower, presence, and unshakeable resolve.'
  },
  strength: {
    name: 'Strength',
    short: 'STR',
    icon: '💪',
    color: '#ef4444',
    description: 'Raw muscle power, melee damage, and carrying capacity.'
  },
  vigor: {
    name: 'Vigor',
    short: 'VIG',
    icon: '🛡️',
    color: '#22c55e',
    description: 'Endurance, resistance to disease/poison, and base Toughness.'
  }
};

export const SWADE_ANCESTRIES: AncestryDef[] = [
  {
    id: 'human',
    name: 'Human',
    source: 'core',
    summary: 'Adaptable and ambitious, Humans begin play with one free Novice Edge of their choice.',
    freeEdgeBonus: 1,
    traits: [
      { name: 'Adaptable', description: 'Humans begin play with any one free Novice Edge of their choice (must meet requirements).' }
    ]
  },
  {
    id: 'android',
    name: 'Android',
    source: 'core',
    summary: 'Synthetic beings with artificial bodies, immune to poison and disease, but Bound by Asimovian programming.',
    traits: [
      { name: 'Construct', description: '+2 to recover from being Shaken; ignore 1 point of Wound penalties; do not breathe and immune to disease/poison.' },
      { name: 'Outsider (Minor)', description: '-2 Persuasion with non-synthetic beings; limited legal rights in some settings.' },
      { name: 'Pacifist (Major)', description: 'Asimovian programming prevents harming sentient organics unless reprogrammed.' },
      { name: 'Unnatural', description: 'Healing skill does not work; must be repaired using the Repair skill.' }
    ]
  },
  {
    id: 'aquarian',
    name: 'Aquarian',
    source: 'core',
    summary: 'Amphibious humanoids of the deep seas with natural swim speed, toughness, and low-light vision.',
    toughnessMod: 1,
    skillBonuses: { athletics: 1 },
    traits: [
      { name: 'Aquatic', description: 'Cannot drown in water; Swim Pace equals full Athletics die + Base Pace.' },
      { name: 'Dependency', description: 'Must immerse in water one hour out of every 24 or suffer automatic Fatigue.' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark illumination.' },
      { name: 'Tough', description: 'Hard scales or dense rubbery skin grants +1 Toughness.' }
    ]
  },
  {
    id: 'avion',
    name: 'Avion',
    source: 'core',
    summary: 'Winged folk of the high peaks capable of flight, with keen eyesight and hollow bones.',
    toughnessMod: -1,
    traits: [
      { name: 'Flight', description: 'Fly at Pace 12" with a d6 running die.' },
      { name: 'Frail', description: 'Hollow bones reduce base Toughness by -1.' },
      { name: 'Keen Senses', description: 'Start with a d6 in Notice instead of d4.' }
    ],
    skillBonuses: { notice: 1 }
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    source: 'core',
    summary: 'Stout, resilient mountain folk with d6 Vigor and Low Light Vision, though slower on foot.',
    attributeBonuses: { vigor: 1 },
    paceMod: -1,
    traits: [
      { name: 'Low Light Vision', description: 'Dwarven eyes ignore penalties for Dim and Dark lighting.' },
      { name: 'Reduced Pace', description: 'Base Pace is reduced by 1 (to 5") and running die is d4.' },
      { name: 'Tough', description: 'Dwarves start with a d6 in Vigor instead of a d4 (raising max Vigor to d12+1).' }
    ]
  },
  {
    id: 'elf',
    name: 'Elf',
    source: 'core',
    summary: 'Graceful and long-lived forest dwellers with d6 Agility and Low Light Vision, but clumsy with mechanical tech.',
    attributeBonuses: { agility: 1 },
    traits: [
      { name: 'Agile', description: 'Elves start with a d6 in Agility instead of a d4 (raising max Agility to d12+1).' },
      { name: 'All Thumbs (Minor)', description: '-2 penalty when using mechanical or electronic devices.' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark illumination.' }
    ]
  },
  {
    id: 'half_elf',
    name: 'Half-Elf',
    source: 'core',
    summary: 'Walking between two worlds, Half-Elves inherit either Elven grace (d6 Agility) or Human adaptability (Free Edge).',
    attributeBonuses: { agility: 1 },
    traits: [
      { name: 'Heritage', description: 'Starts with d6 Agility (or switch to a Free Edge in Edges tab).' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark illumination.' },
      { name: 'Outsider (Minor)', description: 'Rarely fully accepted by either humans or elves (-2 Persuasion among rigid societies).' }
    ]
  },
  {
    id: 'half_folk',
    name: 'Half-Folk',
    source: 'core',
    summary: 'Small, cheerful, and remarkably fortunate folk with d6 Spirit and +1 Benny per session.',
    attributeBonuses: { spirit: 1 },
    paceMod: -1,
    toughnessMod: -1,
    sizeMod: -1,
    traits: [
      { name: 'Fortunate', description: 'Half-Folk draw one additional Benny at the start of each game session.' },
      { name: 'Reduced Pace', description: 'Pace is reduced by 1 (to 5") and running die is d4.' },
      { name: 'Size -1', description: 'Standing around 4 feet tall, Half-Folk are Size -1 (reducing Toughness by 1).' },
      { name: 'Spirited', description: 'Start with a d6 in Spirit instead of a d4.' }
    ]
  },
  {
    id: 'rakashan',
    name: 'Rakashan',
    source: 'core',
    summary: 'Feline humanoids with razor claws, agile reflexes, and a predatory streak.',
    attributeBonuses: { agility: 1 },
    traits: [
      { name: 'Agile', description: 'Rakashans begin with a d6 in Agility.' },
      { name: 'Bite/Claws', description: 'Natural weapons that deal Str+d4 damage (AP 2 on a raise).' },
      { name: 'Bloodthirsty (Major)', description: 'Cruel to foes; -4 Charisma/Persuasion among civilized folk.' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark illumination.' },
      { name: 'Racial Enemy', description: 'Bitter enmity with rival species in their native setting.' }
    ]
  },
  {
    id: 'saurian',
    name: 'Saurian',
    source: 'core',
    summary: 'Reptilian warriors with natural bite, keen senses, and natural armor, though sluggish in the cold.',
    skillBonuses: { notice: 1 },
    toughnessMod: 2,
    traits: [
      { name: 'Armor +2', description: 'Scaly hide provides +2 Natural Armor.' },
      { name: 'Bite', description: 'Fanged jaws are natural weapons causing Str+d4 damage.' },
      { name: 'Environmental Weakness (Cold)', description: '-4 penalty to resist Cold effects and +4 damage from cold/ice attacks.' },
      { name: 'Keen Senses', description: 'Saurians begin with a d6 in Notice.' },
      { name: 'Outsider (Minor)', description: 'Cold-blooded demeanor unsettles warm-blooded species.' }
    ]
  },
  {
    id: 'orc',
    name: 'Orc',
    source: 'fantasy',
    summary: 'Brutish and ferocious warriors with d6 Strength and natural Size +1, driven by battle fury.',
    attributeBonuses: { strength: 1 },
    sizeMod: 1,
    toughnessMod: 1,
    traits: [
      { name: 'Brute', description: 'Orcs begin with a d6 in Strength instead of a d4.' },
      { name: 'Size +1', description: 'Large muscular frame grants Size +1 and +1 Toughness.' },
      { name: 'Infravision', description: 'Halves penalties for poor lighting against heat signatures.' },
      { name: 'Outsider (Major)', description: 'Distrusted and feared in civilized towns.' }
    ]
  },
  {
    id: 'goblin',
    name: 'Goblin',
    source: 'fantasy',
    summary: 'Cunning, stealthy subterranean scavengers with d6 Agility, Infravision, and Size -1.',
    attributeBonuses: { agility: 1 },
    sizeMod: -1,
    toughnessMod: -1,
    skillBonuses: { stealth: 1 },
    traits: [
      { name: 'Agile', description: 'Goblins begin with a d6 in Agility.' },
      { name: 'Size -1', description: 'Small stature gives -1 Toughness and Size -1.' },
      { name: 'Infravision', description: 'Halve penalties for darkness when sensing warm bodies.' },
      { name: 'Sneaky', description: 'Starts with d6 in Stealth.' }
    ]
  },
  {
    id: 'cyborg',
    name: 'Cyborg',
    source: 'scifi',
    summary: 'Cybernetically augmented humanoids with cyber-limbs, dermal plating (+2 Armor), and internal batteries.',
    toughnessMod: 2,
    traits: [
      { name: 'Armor +2', description: 'Subdermal composite mesh grants +2 Natural Armor.' },
      { name: 'Enhanced Reflexes', description: 'Start with d6 in Agility or Strength.' },
      { name: 'Battery Dependent', description: 'Must recharge via power cell or grid every 48 hours.' }
    ]
  },
  {
    id: 'insectoid',
    name: 'Insectoid',
    source: 'scifi',
    summary: 'Chitinous multi-limbed beings with natural climbing, 360-degree vision, and communication antennas.',
    toughnessMod: 1,
    skillBonuses: { athletics: 1 },
    traits: [
      { name: 'Chitin Carapace', description: '+1 Toughness from hard natural chitin.' },
      { name: 'Wall Walker', description: 'Can walk on walls and ceilings at half Pace.' },
      { name: 'Compound Eyes', description: '+2 to Notice rolls against visual ambushes.' }
    ]
  },
  {
    id: 'dhampir',
    name: 'Dhampir',
    source: 'horror',
    summary: 'Half-vampiric scions with superhuman vigor, low-light vision, and blood cravings.',
    attributeBonuses: { vigor: 1 },
    traits: [
      { name: 'Undead Heritage', description: 'Starts with d6 in Vigor and Low Light Vision.' },
      { name: 'Bite', description: 'Fangs deal Str+d4 damage; can drain blood from grappled foes.' },
      { name: 'The Thirst (Minor)', description: 'Must consume fresh blood periodically or suffer Fatigue.' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Ancestry',
    source: 'custom',
    summary: 'Define your own custom ancestry or setting race using custom attribute, skill, and derived stat modifiers.',
    traits: [
      { name: 'Custom Heritage', description: 'Use the Derived Stats modifiers and Edges tab to configure your custom racial traits.' }
    ]
  }
];

export const SWADE_SKILLS: SkillDef[] = [
  { id: 'academics', name: 'Academics', linkedAttribute: 'smarts', isCore: false, description: 'Liberal arts, history, literature, archeology, and humanities.' },
  { id: 'athletics', name: 'Athletics', linkedAttribute: 'agility', isCore: true, description: 'Climbing, jumping, swimming, throwing, catching, and grappling.' },
  { id: 'battle', name: 'Battle', linkedAttribute: 'smarts', isCore: false, description: 'Mass combat strategy, tactics, and military logistics.' },
  { id: 'boating', name: 'Boating', linkedAttribute: 'agility', isCore: false, description: 'Sailing, rowing, and piloting watercraft.' },
  { id: 'common_knowledge', name: 'Common Knowledge', linkedAttribute: 'smarts', isCore: true, description: 'General knowledge of a character’s world, local culture, and etiquette.' },
  { id: 'driving', name: 'Driving', linkedAttribute: 'agility', isCore: false, description: 'Controlling ground vehicles, hovercraft, and mounts with wheels/treads.' },
  { id: 'electronics', name: 'Electronics', linkedAttribute: 'smarts', isCore: false, description: 'Operating and understanding sophisticated electronic devices and sensors.' },
  { id: 'faith', name: 'Faith', linkedAttribute: 'spirit', isCore: false, description: 'Arcane skill for Arcane Background (Miracles).' },
  { id: 'fighting', name: 'Fighting', linkedAttribute: 'agility', isCore: false, description: 'Unarmed and armed melee combat; determines base Parry (2 + half die).' },
  { id: 'focus', name: 'Focus', linkedAttribute: 'spirit', isCore: false, description: 'Arcane skill for Arcane Background (Gifted).' },
  { id: 'gambling', name: 'Gambling', linkedAttribute: 'smarts', isCore: false, description: 'Games of chance, dice, cards, and cheating at the table.' },
  { id: 'hacking', name: 'Hacking', linkedAttribute: 'smarts', isCore: false, description: 'Coding, programming, and breaking into computer networks.' },
  { id: 'healing', name: 'Healing', linkedAttribute: 'smarts', isCore: false, description: 'Treating Wounds within the Golden Hour, curing disease/poison, and forensics.' },
  { id: 'intimidation', name: 'Intimidation', linkedAttribute: 'spirit', isCore: false, description: 'Frightening or coercing opponents via threats and presence.' },
  { id: 'language', name: 'Language', linkedAttribute: 'smarts', isCore: false, description: 'Fluency in an additional spoken and written language.' },
  { id: 'notice', name: 'Notice', linkedAttribute: 'smarts', isCore: true, description: 'General awareness, perception, searching, and reading body language.' },
  { id: 'occult', name: 'Occult', linkedAttribute: 'smarts', isCore: false, description: 'Lore of the supernatural, monsters, curses, and arcane rituals.' },
  { id: 'performance', name: 'Performance', linkedAttribute: 'spirit', isCore: false, description: 'Acting, singing, dancing, storytelling, and musical instruments.' },
  { id: 'persuasion', name: 'Persuasion', linkedAttribute: 'spirit', isCore: true, description: 'Convincing others through diplomacy, charm, deception, or negotiation.' },
  { id: 'piloting', name: 'Piloting', linkedAttribute: 'agility', isCore: false, description: 'Flying aircraft, jetpacks, helicopters, and spaceships.' },
  { id: 'psionics', name: 'Psionics', linkedAttribute: 'smarts', isCore: false, description: 'Arcane skill for Arcane Background (Psionics).' },
  { id: 'repair', name: 'Repair', linkedAttribute: 'smarts', isCore: false, description: 'Fixing mechanical gear, vehicles, weapons, and locks.' },
  { id: 'research', name: 'Research', linkedAttribute: 'smarts', isCore: false, description: 'Finding information in libraries, newspapers, records, or the internet.' },
  { id: 'riding', name: 'Riding', linkedAttribute: 'agility', isCore: false, description: 'Mounting, controlling, and fighting from horseback or beasts.' },
  { id: 'science', name: 'Science', linkedAttribute: 'smarts', isCore: false, description: 'Biology, chemistry, physics, geology, and mathematics.' },
  { id: 'shooting', name: 'Shooting', linkedAttribute: 'agility', isCore: false, description: 'Precision with bows, pistols, rifles, and mounted energy weapons.' },
  { id: 'spellcasting', name: 'Spellcasting', linkedAttribute: 'smarts', isCore: false, description: 'Arcane skill for Arcane Background (Magic).' },
  { id: 'stealth', name: 'Stealth', linkedAttribute: 'agility', isCore: true, description: 'Moving silently, hiding in shadows, and pickpocketing.' },
  { id: 'survival', name: 'Survival', linkedAttribute: 'smarts', isCore: false, description: 'Tracking, foraging for food/water, and navigating the wilderness.' },
  { id: 'taunt', name: 'Taunt', linkedAttribute: 'smarts', isCore: false, description: 'Ridiculing, humiliating, or provoking foes in a Test of Wills.' },
  { id: 'thievery', name: 'Thievery', linkedAttribute: 'agility', isCore: false, description: 'Picking locks, cracking safes, disarming traps, and sleight of hand.' },
  { id: 'weird_science', name: 'Weird Science', linkedAttribute: 'smarts', isCore: false, description: 'Arcane skill for Arcane Background (Weird Science).' }
];

export const SWADE_HINDRANCES: HindranceDef[] = [
  { id: 'all_thumbs', name: 'All Thumbs', severity: 'Minor', summary: '-2 to use mechanical/electronic devices; Critical Failure breaks them.', effect: '-2 using mechanical/electronic devices' },
  { id: 'anemic', name: 'Anemic', severity: 'Minor', summary: '-2 Vigor when resisting Fatigue (disease, poison, environment).', effect: '-2 Vigor vs Fatigue' },
  { id: 'arrogant', name: 'Arrogant', severity: 'Major', summary: 'Must dominate the toughest foe in combat and flaunt superiority.', effect: 'Seeks the main threat in battle' },
  { id: 'bad_eyes', name: 'Bad Eyes', severity: 'Minor/Major', summary: '-1 (Minor) or -2 (Major) to all Trait rolls dependent on vision over 5" away.', effect: '-1/-2 visual Trait rolls without glasses' },
  { id: 'bad_luck', name: 'Bad Luck', severity: 'Major', summary: 'The hero gets one less Benny per game session than normal.', effect: '-1 Starting Benny' },
  { id: 'big_mouth', name: 'Big Mouth', severity: 'Minor', summary: 'Unable to keep secrets; blurts out private plans at bad times.', effect: 'Loose lips sink ships' },
  { id: 'blind', name: 'Blind', severity: 'Major', summary: '-6 to all tasks requiring vision; gains a free Edge to compensate.', effect: '-6 vision tasks, +1 Free Edge' },
  { id: 'bloodthirsty', name: 'Bloodthirsty', severity: 'Major', summary: 'Never takes prisoners unless under strict supervision.', effect: 'No mercy in combat' },
  { id: 'cautious', name: 'Cautious', severity: 'Minor', summary: 'Demands detailed planning and avoids rash action.', effect: 'Overplans before acting' },
  { id: 'clueless', name: 'Clueless', severity: 'Major', summary: '-1 to Common Knowledge and Notice rolls.', effect: '-1 Common Knowledge & Notice' },
  { id: 'clumsy', name: 'Clumsy', severity: 'Major', summary: '-2 to Athletics and Stealth rolls.', effect: '-2 Athletics & Stealth' },
  { id: 'code_of_honor', name: 'Code of Honor', severity: 'Major', summary: 'Keeps their word, protects the helpless, and fights fairly.', effect: 'Chivalrous moral code' },
  { id: 'curious', name: 'Curious', severity: 'Major', summary: 'Must investigate every mystery, closed door, or dark secret.', effect: 'Driven to investigate mysteries' },
  { id: 'death_wish', name: 'Death Wish', severity: 'Minor', summary: 'Wants to die after completing one specific epic goal.', effect: 'Reckless pursuit of a goal' },
  { id: 'delusional', name: 'Delusional', severity: 'Minor/Major', summary: 'Believes something strange or utterly implausible.', effect: 'Strong strange belief' },
  { id: 'doubting_thomas', name: 'Doubting Thomas', severity: 'Minor', summary: 'Rationalizes away the supernatural even when staring right at it.', effect: 'Skeptical of supernatural' },
  { id: 'driven', name: 'Driven', severity: 'Minor/Major', summary: 'Personal ambition shapes every decision they make.', effect: 'Personal goal overrides caution' },
  { id: 'elderly', name: 'Elderly', severity: 'Major', summary: 'Pace -1, -1 to Agility, Strength, and Vigor rolls; +5 Skill Points for Smarts skills.', effect: 'Pace -1, -1 AGI/STR/VIG, +5 Smarts skill pts' },
  { id: 'enemy', name: 'Enemy', severity: 'Minor/Major', summary: 'Someone out there wants the character ruined or dead.', effect: 'Recurring nemesis' },
  { id: 'greedy', name: 'Greedy', severity: 'Minor/Major', summary: 'Obsessed with wealth, loot, and getting a bigger share.', effect: 'Measures worth in gold/credits' },
  { id: 'habit', name: 'Habit', severity: 'Minor/Major', summary: 'Addiction or annoying compulsion; Major causes Fatigue without it.', effect: 'Physical or mental dependency' },
  { id: 'hard_of_hearing', name: 'Hard of Hearing', severity: 'Minor/Major', summary: '-4 to Notice sounds (Minor) or completely Deaf (Major).', effect: '-4 sound Notice rolls' },
  { id: 'heroic', name: 'Heroic', severity: 'Major', summary: 'Never says no to a person in need, regardless of danger or pay.', effect: 'Always helps those in distress' },
  { id: 'hesitant', name: 'Hesitant', severity: 'Minor', summary: 'Draw two Action Cards in combat and act on the lowest (unless a Joker).', effect: 'Draw 2 Action Cards, take lowest' },
  { id: 'illiterate', name: 'Illiterate', severity: 'Minor', summary: 'Cannot read or write in any language.', effect: 'Unable to read or write' },
  { id: 'impulsive', name: 'Impulsive', severity: 'Major', summary: 'Leaps before looking; rarely stops to formulate a plan.', effect: 'Acts without thinking' },
  { id: 'jealous', name: 'Jealous', severity: 'Minor/Major', summary: 'Envies the accomplishments or attention of others.', effect: 'Covetous and insecure' },
  { id: 'loyal', name: 'Loyal', severity: 'Minor', summary: 'Never leaves a friend behind; will risk life for comrades.', effect: 'Fiercely devoted to allies' },
  { id: 'mean', name: 'Mean', severity: 'Minor', summary: 'Ill-tempered and disagreeable (-1 Persuasion).', effect: '-1 Persuasion rolls' },
  { id: 'mild_mannered', name: 'Mild Mannered', severity: 'Minor', summary: '-2 to Intimidation rolls.', effect: '-2 Intimidation' },
  { id: 'mute', name: 'Mute', severity: 'Major', summary: 'Cannot speak; communicates via gestures, writing, or sign language.', effect: 'Cannot speak aloud' },
  { id: 'obese', name: 'Obese', severity: 'Minor', summary: 'Size +1 (Toughness +1), Pace -1, running die d4, treat Str as one die lower for armor.', effect: 'Size +1, Toughness +1, Pace -1' },
  { id: 'obligation', name: 'Obligation', severity: 'Minor/Major', summary: 'Weekly commitment of 20 (Minor) or 40+ (Major) hours to a patron or duty.', effect: 'Bound by duty or schedule' },
  { id: 'one_arm', name: 'One Arm', severity: 'Major', summary: '-4 to tasks requiring two hands (such as climbing or two-handed weapons).', effect: '-4 to two-handed tasks' },
  { id: 'one_eye', name: 'One Eye', severity: 'Major', summary: '-2 to all Trait rolls requiring depth perception (ranged attacks, driving, jumping).', effect: '-2 depth perception tasks' },
  { id: 'outsider', name: 'Outsider', severity: 'Minor/Major', summary: '-2 Persuasion with locals; Major also strips legal rights.', effect: '-2 Persuasion with non-kin' },
  { id: 'overconfident', name: 'Overconfident', severity: 'Major', summary: 'Believes there is no foe they cannot defeat or challenge they cannot beat.', effect: 'Never backs down from a challenge' },
  { id: 'pacifist', name: 'Pacifist', severity: 'Minor/Major', summary: 'Fights only in self-defense (Minor) or refuses to harm living things (Major).', effect: 'Abhors lethal violence' },
  { id: 'phobia', name: 'Phobia', severity: 'Minor/Major', summary: '-1 (Minor) or -2 (Major) to all Trait rolls in the presence of their fear.', effect: '-1/-2 Trait rolls near phobia' },
  { id: 'poverty', name: 'Poverty', severity: 'Minor', summary: 'Starts with half funds ($250) and loses half of remaining wealth each week.', effect: 'Half starting funds, money slips away' },
  { id: 'quirk', name: 'Quirk', severity: 'Minor', summary: 'Minor personal foible or eccentricity that occasionally causes trouble.', effect: 'Distinctive roleplay quirk' },
  { id: 'ruthless', name: 'Ruthless', severity: 'Minor/Major', summary: 'Does whatever it takes to achieve their goals.', effect: 'Coldly pragmatic' },
  { id: 'secret', name: 'Secret', severity: 'Minor/Major', summary: 'Hiding something dangerous that would cause disgrace or death if exposed.', effect: 'Dangerous hidden truth' },
  { id: 'shamed', name: 'Shamed', severity: 'Minor/Major', summary: 'Haunted by a past disgrace or failure.', effect: 'Burdened by past dishonor' },
  { id: 'slow', name: 'Slow', severity: 'Minor/Major', summary: 'Pace -1, running die d4 (Minor); or Pace -2, -2 Athletics & resisting Athletics (Major).', effect: 'Reduced movement speed' },
  { id: 'small', name: 'Small', severity: 'Minor', summary: 'Size -1 and Toughness -1.', effect: 'Size -1, Toughness -1' },
  { id: 'stubborn', name: 'Stubborn', severity: 'Minor', summary: 'Always wants their way and never admits when they are wrong.', effect: 'Refuses to admit mistakes' },
  { id: 'suspicious', name: 'Suspicious', severity: 'Minor/Major', summary: 'Paranoid; -2 on Support rolls from allies if Major.', effect: 'Distrusts others; Major: -2 ally Support' },
  { id: 'thin_skinned', name: 'Thin Skinned', severity: 'Minor/Major', summary: '-2 (Minor) or -4 (Major) when resisting Taunt rolls.', effect: '-2/-4 resisting Taunt' },
  { id: 'tongue_tied', name: 'Tongue-Tied', severity: 'Major', summary: '-1 to Intimidation, Performance, Persuasion, and Taunt rolls.', effect: '-1 social skills' },
  { id: 'ugly', name: 'Ugly', severity: 'Minor/Major', summary: '-1 (Minor) or -2 (Major) to Persuasion rolls.', effect: '-1/-2 Persuasion' },
  { id: 'vengeful', name: 'Vengeful', severity: 'Minor/Major', summary: 'Holds grudges and demands payback for every slight.', effect: 'Seeks retribution for wrongs' },
  { id: 'vow', name: 'Vow', severity: 'Minor/Major', summary: 'Sworn oath to a deity, order, cause, or group.', effect: 'Sacred oath of service' },
  { id: 'wanted', name: 'Wanted', severity: 'Minor/Major', summary: 'Hunted by authorities for past crimes (real or framed).', effect: 'Bounty on their head' },
  { id: 'yellow', name: 'Yellow', severity: 'Major', summary: '-2 to Fear checks and resisting Intimidation.', effect: '-2 Fear & Intimidation checks' },
  { id: 'young', name: 'Young', severity: 'Minor/Major', summary: 'fewer attribute/skill points at creation, but starts with extra Benny each session.', effect: '+1 Benny per session' }
];

export const SWADE_EDGES: EdgeDef[] = [
  // BACKGROUND EDGES
  {
    id: 'alertness',
    name: 'Alertness',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: '+2 to all Notice rolls to hear, see, or otherwise sense the world.'
  },
  {
    id: 'ambidextrous',
    name: 'Ambidextrous',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Ignore the -2 Off-Hand penalty; stack Parry bonuses when dual-wielding.'
  },
  {
    id: 'arcane_background',
    name: 'Arcane Background',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'Unlocks supernatural powers and Power Points (choose your Arcane Background in the Powers tab).'
  },
  {
    id: 'arcane_resistance',
    name: 'Arcane Resistance',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: '+2 Armor against damaging powers and +2 to resist opposing power effects.'
  },
  {
    id: 'aristocrat',
    name: 'Aristocrat',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: '+2 to Common Knowledge and Networking with high society; starts with extra wealth/status.'
  },
  {
    id: 'attractive',
    name: 'Attractive',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Vigor d6+',
    minAttributes: { vigor: 6 },
    summary: '+1 to Performance and Persuasion rolls (+2 with Very Attractive).'
  },
  {
    id: 'berserk',
    name: 'Berserk',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'After being Shaken or Wounded, Smarts roll to go Berserk (+1 Str die, +2 Toughness, ignore 1 Wound penalty, Wild Attacks, -2 Parry).'
  },
  {
    id: 'brave',
    name: 'Brave',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+',
    minAttributes: { spirit: 6 },
    summary: '+2 to Fear checks and subtract 2 from Fear Table rolls.'
  },
  {
    id: 'brawny',
    name: 'Brawny',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d6+, Vigor d6+',
    minAttributes: { strength: 6, vigor: 6 },
    toughnessBonus: 1,
    maxLoadMultiplier: 8,
    summary: 'Size +1 (and +1 Toughness); treat Strength as one die higher for Encumbrance and Minimum Strength.'
  },
  {
    id: 'brute',
    name: 'Brute',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d6+, Vigor d6+',
    minAttributes: { strength: 6, vigor: 6 },
    summary: 'Link Athletics to Strength instead of Agility; increase Short Range of thrown items by +1.'
  },
  {
    id: 'charismatic',
    name: 'Charismatic',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'One free reroll on Persuasion rolls.'
  },
  {
    id: 'elan',
    name: 'Elan',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: '+2 to any Trait roll when spending a Benny to reroll (including Soak rolls).'
  },
  {
    id: 'fame',
    name: 'Fame',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: '+1 Persuasion when recognized by friendly fans; double performance fees.'
  },
  {
    id: 'fast_healer',
    name: 'Fast Healer',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Vigor d8+',
    minAttributes: { vigor: 8 },
    summary: '+2 to Vigor rolls for natural healing; roll every 3 days instead of 5.'
  },
  {
    id: 'fleet_footed',
    name: 'Fleet-Footed',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d6+',
    minAttributes: { agility: 6 },
    paceBonus: 2,
    runningDieBonus: 1,
    summary: 'Pace +2 and increase running die one step (d6 to d8).'
  },
  {
    id: 'linguist',
    name: 'Linguist',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+',
    minAttributes: { smarts: 6 },
    summary: 'Character begins with a number of languages equal to half their Smarts die at d6.'
  },
  {
    id: 'luck',
    name: 'Luck',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    benniesBonus: 1,
    summary: '+1 Benny at the start of each game session.'
  },
  {
    id: 'great_luck',
    name: 'Great Luck',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Luck',
    benniesBonus: 1,
    summary: '+2 total bonus Bennies at the start of each game session.'
  },
  {
    id: 'quick',
    name: 'Quick',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Discard and redraw Action Cards of 5 or lower until you get a 6 or higher.'
  },
  {
    id: 'rich',
    name: 'Rich',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'Starts with 3x starting funds ($1,500) and high annual income.'
  },

  // COMBAT EDGES
  {
    id: 'block',
    name: 'Block',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fighting d8+',
    minSkills: { fighting: 8 },
    parryBonus: 1,
    summary: '+1 Parry and ignore 1 point of Gang Up bonus against you.'
  },
  {
    id: 'improved_block',
    name: 'Improved Block',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Block',
    minSkills: { fighting: 8 },
    parryBonus: 1,
    summary: 'Additional +1 Parry (+2 total) and ignore 2 points of Gang Up bonus.'
  },
  {
    id: 'brawler',
    name: 'Brawler',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d8+, Vigor d8+',
    minAttributes: { strength: 8, vigor: 8 },
    toughnessBonus: 1,
    summary: 'Toughness +1; unarmed attacks deal Str+d4 damage (or increase natural weapon die one step).'
  },
  {
    id: 'bruiser',
    name: 'Bruiser',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Brawler',
    minAttributes: { strength: 8, vigor: 8 },
    toughnessBonus: 1,
    summary: 'Additional +1 Toughness; increase unarmed damage die one more step (and bonus damage die to d8).'
  },
  {
    id: 'calculating',
    name: 'Calculating',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d8+',
    minAttributes: { smarts: 8 },
    summary: 'When your Action Card is Five or less, ignore up to 2 points of penalties on one action that turn.'
  },
  {
    id: 'combat_reflexes',
    name: 'Combat Reflexes',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned',
    summary: '+2 to Spirit rolls when attempting to recover from being Shaken or Stunned.'
  },
  {
    id: 'counterattack',
    name: 'Counterattack',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fighting d8+',
    minSkills: { fighting: 8 },
    summary: 'Free Fighting attack at -2 once per round against one adjacent foe who failed a Fighting roll against you.'
  },
  {
    id: 'dead_shot',
    name: 'Dead Shot',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Wild Card, Athletics or Shooting d8+',
    requiresWildCard: true,
    summary: 'When dealt a Joker, double total damage from the first successful Shooting or Athletics (throwing) attack.'
  },
  {
    id: 'dodge',
    name: 'Dodge',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Attackers subtract 2 from Ranged attack rolls against you; +2 to Evade area attacks.'
  },
  {
    id: 'double_tap',
    name: 'Double Tap',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Shooting d6+',
    minSkills: { shooting: 6 },
    summary: '+1 to Shooting roll and +1 damage with semi-auto firearms at cost of 1 extra round of ammo.'
  },
  {
    id: 'extraction',
    name: 'Extraction',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'One adjacent opponent does not get a free attack when you withdraw from melee.'
  },
  {
    id: 'feint',
    name: 'Feint',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Fighting d8+',
    minSkills: { fighting: 8 },
    summary: 'May choose to make targets resist Fighting Tests with Smarts instead of Agility.'
  },
  {
    id: 'first_strike',
    name: 'First Strike',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Free Fighting attack once per round against one foe who moves adjacent to you.'
  },
  {
    id: 'frenzy',
    name: 'Frenzy',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fighting d8+',
    minSkills: { fighting: 8 },
    summary: 'Roll a second Fighting die alongside your Wild Die in one melee attack per turn.'
  },
  {
    id: 'hard_to_kill',
    name: 'Hard to Kill',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'Ignore Wound penalties when making Vigor rolls to avoid Bleeding Out or knockout.'
  },
  {
    id: 'iron_jaw',
    name: 'Iron Jaw',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Vigor d8+',
    minAttributes: { vigor: 8 },
    summary: '+2 to Soak rolls and Vigor rolls to avoid knockout blows.'
  },
  {
    id: 'level_headed',
    name: 'Level Headed',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Smarts d8+',
    minAttributes: { smarts: 8 },
    summary: 'Draw an additional Action Card in combat and choose which one to use.'
  },
  {
    id: 'marksman',
    name: 'Marksman',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Athletics or Shooting d8+',
    summary: 'If you do not move during your turn, ignore up to 2 points of Shooting/Throwing penalties (or gain +1 Aim).'
  },
  {
    id: 'martial_artist',
    name: 'Martial Artist',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Fighting d6+',
    minSkills: { fighting: 6 },
    summary: 'Unarmed Fighting +1; hands and feet count as Natural Weapons dealing Str+d4 damage.'
  },
  {
    id: 'mighty_blow',
    name: 'Mighty Blow',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Wild Card, Fighting d8+',
    minSkills: { fighting: 8 },
    requiresWildCard: true,
    summary: 'When dealt a Joker, double total damage on your first successful Fighting roll.'
  },
  {
    id: 'nerves_of_steel',
    name: 'Nerves of Steel',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Wild Card, Vigor d8+',
    minAttributes: { vigor: 8 },
    requiresWildCard: true,
    summary: 'Ignore 1 point of Wound penalties (2 points with Improved Nerves of Steel).'
  },
  {
    id: 'no_mercy',
    name: 'No Mercy',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned',
    summary: '+2 damage when spending a Benny to reroll a damage roll.'
  },
  {
    id: 'rapid_fire',
    name: 'Rapid Fire',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Shooting d6+',
    minSkills: { shooting: 6 },
    summary: 'Increase Rate of Fire by 1 for one Shooting attack per turn with any weapon capable of RoF 1+.'
  },
  {
    id: 'rock_and_roll',
    name: 'Rock and Roll!',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Shooting d8+',
    minSkills: { shooting: 8 },
    summary: 'Ignore the -2 Recoil penalty when firing weapons with RoF 2+ if you do not move.'
  },
  {
    id: 'sweep',
    name: 'Sweep',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d8+, Fighting d8+',
    minAttributes: { strength: 8 },
    minSkills: { fighting: 8 },
    summary: 'Attack all adjacent enemies within weapon reach at -2 (no allies hit).'
  },
  {
    id: 'trademark_weapon',
    name: 'Trademark Weapon',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, d8+ in Fighting, Shooting, or Athletics',
    summary: '+1 to Fighting, Shooting, or Athletics rolls with one specific unique weapon, and +1 Parry while readied.'
  },
  {
    id: 'two_fisted',
    name: 'Two-Fisted',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Ignore the -2 Multi-Action penalty when making one melee attack with each hand.'
  },
  {
    id: 'two_gun_kid',
    name: 'Two-Gun Kid',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Ignore the -2 Multi-Action penalty when making one ranged/thrown attack with each hand.'
  },

  // LEADERSHIP EDGES
  {
    id: 'command',
    name: 'Command',
    category: 'Leadership',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+',
    minAttributes: { smarts: 6 },
    summary: 'Allies within 5" Command Range add +1 to Spirit rolls to recover from being Shaken or Vigor vs Stunned.'
  },
  {
    id: 'fervor',
    name: 'Fervor',
    category: 'Leadership',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Spirit d8+, Command',
    minAttributes: { spirit: 8 },
    summary: 'Extras within Command Range add +1 to their Fighting damage rolls.'
  },
  {
    id: 'hold_the_line',
    name: 'Hold the Line!',
    category: 'Leadership',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Smarts d8+, Command',
    minAttributes: { smarts: 8 },
    summary: 'Extras within Command Range add +1 to their Toughness.'
  },
  {
    id: 'inspire',
    name: 'Inspire',
    category: 'Leadership',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Command',
    summary: 'Once per turn, roll Battle to grant +1 (+2 on a raise) to one Trait for all allies in Command Range.'
  },
  {
    id: 'natural_leader',
    name: 'Natural Leader',
    category: 'Leadership',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Spirit d8+, Command',
    minAttributes: { spirit: 8 },
    summary: 'Leadership Edges now apply to Wild Cards in Command Range as well as Extras.'
  },
  {
    id: 'tactician',
    name: 'Tactician',
    category: 'Leadership',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Smarts d8+, Command, Battle d6+',
    minAttributes: { smarts: 8 },
    minSkills: { battle: 6 },
    summary: 'Roll Battle at start of combat; deal 1 Action Card (2 on raise) to share with allies during the fight.'
  },

  // POWER EDGES
  {
    id: 'artificer',
    name: 'Artificer',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Arcane Background',
    requiresArcane: true,
    summary: 'Can imbue powers into temporary Arcane Devices that others can activate.'
  },
  {
    id: 'channeling',
    name: 'Channeling',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Arcane Background',
    requiresArcane: true,
    summary: 'Reduce Power Point cost by 1 whenever you get a raise on your arcane skill activation roll.'
  },
  {
    id: 'new_powers',
    name: 'New Powers',
    category: 'Power',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Arcane Background',
    requiresArcane: true,
    summary: 'Character learns 2 new powers from their available Arcane Background list.'
  },
  {
    id: 'power_points',
    name: 'Power Points',
    category: 'Power',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Arcane Background',
    requiresArcane: true,
    powerPointsBonus: 5,
    summary: 'Grants +5 additional Power Points (may be taken once per Rank).'
  },
  {
    id: 'power_surge',
    name: 'Power Surge',
    category: 'Power',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Wild Card, Arcane Background, Arcane Skill d8+',
    requiresArcane: true,
    requiresWildCard: true,
    summary: 'Recover 10 Power Points whenever dealt a Joker in combat.'
  },
  {
    id: 'rapid_recharge',
    name: 'Rapid Recharge',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Spirit d6+, Arcane Background',
    minAttributes: { spirit: 6 },
    requiresArcane: true,
    summary: 'Recover 10 Power Points per hour instead of 5 (20/hour with Improved Rapid Recharge).'
  },
  {
    id: 'soul_drain',
    name: 'Soul Drain',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Arcane Background, Spirit d8+',
    minAttributes: { spirit: 8 },
    requiresArcane: true,
    summary: 'Suffer a level of Fatigue to immediately gain 5 Power Points (10 with a raise on Spirit).'
  },
  {
    id: 'wizard',
    name: 'Wizard',
    category: 'Power',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Arcane Background (Magic), Smarts d8+, Spellcasting d6+',
    minAttributes: { smarts: 8 },
    minSkills: { spellcasting: 6 },
    requiresArcane: true,
    summary: 'Spend 1 extra Power Point to change a spell’s Trapping on the fly.'
  },

  // PROFESSIONAL EDGES
  {
    id: 'ace',
    name: 'Ace',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Ignore 2 points of penalties to Boating, Driving, and Piloting rolls; may spend Bennies to Soak for vehicles.'
  },
  {
    id: 'acrobat',
    name: 'Acrobat',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+, Athletics d8+',
    minAttributes: { agility: 8 },
    minSkills: { athletics: 8 },
    parryBonus: 1,
    summary: 'Free reroll on acrobatic Athletics rolls; Combat Acrobat adds +1 Parry when unencumbered.'
  },
  {
    id: 'assassin',
    name: 'Assassin',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+, Fighting d6+, Stealth d8+',
    minAttributes: { agility: 8 },
    minSkills: { fighting: 6, stealth: 8 },
    summary: '+2 to damage rolls whenever the foe is Vulnerable or the Assassin has The Drop.'
  },
  {
    id: 'investigator',
    name: 'Investigator',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d8+, Research d8+',
    minAttributes: { smarts: 8 },
    minSkills: { research: 8 },
    summary: '+2 to Research and certain Notice rolls when searching through clues, records, or crime scenes.'
  },
  {
    id: 'jack_of_all_trades',
    name: 'Jack-of-All-Trades',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d10+',
    minAttributes: { smarts: 10 },
    summary: 'Study or observe a task to gain d4 (or d6 on a raise) in any Smarts-linked skill until replaced.'
  },
  {
    id: 'mcgyver',
    name: 'McGyver',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+, Repair d6+, Notice d8+',
    minAttributes: { smarts: 6 },
    minSkills: { repair: 6, notice: 8 },
    summary: 'Quickly improvise temporary tools, weapons, or explosives from available parts with no tool penalty.'
  },
  {
    id: 'mr_fix_it',
    name: 'Mr. Fix It',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d8+, Repair d8+',
    minAttributes: { smarts: 8 },
    minSkills: { repair: 8 },
    summary: '+2 to Repair rolls; halves repair time on a raise.'
  },
  {
    id: 'scholar',
    name: 'Scholar',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Research d8+',
    minSkills: { research: 8 },
    summary: '+2 to any one knowledge skill (Academics, Occult, or Science) of your choice.'
  },
  {
    id: 'soldier',
    name: 'Soldier',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d6+, Vigor d6+',
    minAttributes: { strength: 6, vigor: 6 },
    summary: 'Strength counts as one die higher for Encumbrance/Min Str; reroll Vigor checks vs environmental hazards.'
  },
  {
    id: 'thief',
    name: 'Thief',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+, Stealth d6+, Thievery d6+',
    minAttributes: { agility: 8 },
    minSkills: { stealth: 6, thievery: 6 },
    summary: '+1 to Thievery, urban climbing Athletics, and urban Stealth rolls.'
  },
  {
    id: 'woodsman',
    name: 'Woodsman',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+, Survival d8+',
    minAttributes: { spirit: 6 },
    minSkills: { survival: 8 },
    summary: '+2 to Survival and wilderness Stealth rolls.'
  },

  // SOCIAL EDGES
  {
    id: 'bolster',
    name: 'Bolster',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'A successful Support roll for an ally also removes their Distracted or Vulnerable state.'
  },
  {
    id: 'common_bond',
    name: 'Common Bond',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Wild Card, Spirit d8+',
    minAttributes: { spirit: 8 },
    requiresWildCard: true,
    summary: 'May freely give your personal Bennies to any ally you can communicate with.'
  },
  {
    id: 'connections',
    name: 'Connections',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'Call upon a network of contacts (guild, agency, syndicate) for favors, gear, or backup.'
  },
  {
    id: 'humiliate',
    name: 'Humiliate',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Taunt d8+',
    minSkills: { taunt: 8 },
    summary: 'Free reroll when making Taunt rolls.'
  },
  {
    id: 'menacing',
    name: 'Menacing',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Bloodthirsty, Mean, Ruthless, or Ugly',
    summary: '+2 to Intimidation rolls.'
  },
  {
    id: 'provoke',
    name: 'Provoke',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Taunt d6+',
    minSkills: { taunt: 6 },
    summary: 'On a raise with a Taunt Test, the target suffers -2 to attack anyone other than you.'
  },
  {
    id: 'rabble_rouser',
    name: 'Rabble-Rouser',
    category: 'Social',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'Once per turn, affect all foes in a Medium Blast Template with an Intimidation or Taunt Test.'
  },
  {
    id: 'reliable',
    name: 'Reliable',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'Free reroll whenever making a Support roll for an ally.'
  },
  {
    id: 'streetwise',
    name: 'Streetwise',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+',
    minAttributes: { smarts: 6 },
    summary: '+2 to Common Knowledge and criminal Networking rolls in shady circles.'
  },
  {
    id: 'strong_willed',
    name: 'Strong Willed',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: '+2 to resist Smarts or Spirit-based Tests (Intimidation, Taunt, Persuasion).'
  },

  // WEIRD EDGES
  {
    id: 'beast_bond',
    name: 'Beast Bond',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'Hero may spend their own Bennies for animals under their control.'
  },
  {
    id: 'beast_master',
    name: 'Beast Master',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'Animals will not attack you first; you gain a loyal animal companion.'
  },
  {
    id: 'champion',
    name: 'Champion',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+, Fighting d6+',
    minAttributes: { spirit: 8 },
    minSkills: { fighting: 6 },
    summary: '+2 damage and +2 Toughness against supernatural creatures of evil (or good).'
  },
  {
    id: 'chi',
    name: 'Chi',
    category: 'Weird',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Martial Warrior',
    summary: 'Once per combat, reroll a failed attack, force an enemy to reroll an attack against you, or add +d6 to unarmed damage.'
  },
  {
    id: 'danger_sense',
    name: 'Danger Sense',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'Notice roll at -2 to detect ambushes, traps, or surprise disasters just before they strike.'
  },
  {
    id: 'healer',
    name: 'Healer',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: '+2 to all Healing rolls (both mundane and magical).'
  },
  {
    id: 'liquid_courage',
    name: 'Liquid Courage',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Vigor d8+',
    minAttributes: { vigor: 8 },
    summary: 'Drinking alcohol increases Vigor one die step and ignores 1 Wound penalty for 1 hour.'
  },
  {
    id: 'scavenger',
    name: 'Scavenger',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Luck',
    summary: 'Once per encounter, suddenly find a needed piece of mundane equipment or ammo close at hand.'
  },

  // LEGENDARY EDGES
  {
    id: 'followers',
    name: 'Followers',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Wild Card',
    requiresWildCard: true,
    summary: 'Attracts 5 loyal Soldier followers who serve the hero.'
  },
  {
    id: 'professional',
    name: 'Professional',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, d12 in selected Trait',
    summary: 'Increases a single d12 Attribute or Skill to d12+1 (Expert increases to d12+2).'
  },
  {
    id: 'sidekick',
    name: 'Sidekick',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Wild Card',
    requiresWildCard: true,
    summary: 'Hero gains a Novice Wild Card sidekick.'
  },
  {
    id: 'tough_as_nails',
    name: 'Tough as Nails',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Vigor d8+',
    minAttributes: { vigor: 8 },
    summary: 'Hero can take 4 Wounds before becoming Incapacitated (5 with Tougher than Nails).'
  },
  {
    id: 'weapon_master',
    name: 'Weapon Master',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Fighting d12+',
    minSkills: { fighting: 12 },
    parryBonus: 1,
    summary: 'Parry +1 and melee bonus damage die increases from d6 to d8 (+2 Parry and d10 with Master of Arms).'
  }
];

export const SWADE_ARCANE_BACKGROUNDS: ArcaneBackgroundDef[] = [
  {
    id: 'none',
    name: 'None (Mundane Hero)',
    arcaneSkillId: '',
    arcaneSkillName: 'None',
    startingPowers: 0,
    startingPowerPoints: 0,
    summary: 'Relies on steel, grit, technology, and skill rather than supernatural powers.'
  },
  {
    id: 'magic',
    name: 'Arcane Background (Magic)',
    arcaneSkillId: 'spellcasting',
    arcaneSkillName: 'Spellcasting (Smarts)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Wizards, sorcerers, and mages who weave raw arcane energy through study or runes.'
  },
  {
    id: 'miracles',
    name: 'Arcane Background (Miracles)',
    arcaneSkillId: 'faith',
    arcaneSkillName: 'Faith (Spirit)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Champions, priests, and paladins who channel divine blessings from higher powers.'
  },
  {
    id: 'psionics',
    name: 'Arcane Background (Psionics)',
    arcaneSkillId: 'psionics',
    arcaneSkillName: 'Psionics (Smarts)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Telepaths and psychokinetics who unlock the latent power of their own minds.'
  },
  {
    id: 'weird_science',
    name: 'Arcane Background (Weird Science)',
    arcaneSkillId: 'weird_science',
    arcaneSkillName: 'Weird Science (Smarts)',
    startingPowers: 2,
    startingPowerPoints: 15,
    summary: 'Mad inventors and artificers who craft impossible gadgets powered by arcane gizmos.'
  },
  {
    id: 'gifted',
    name: 'Arcane Background (Gifted)',
    arcaneSkillId: 'focus',
    arcaneSkillName: 'Focus (Spirit)',
    startingPowers: 1,
    startingPowerPoints: 15,
    summary: 'Heroes born with a natural knack, minor superpower, or innate mystical talent.'
  }
];

export const SWADE_POWERS: PowerDef[] = [
  { id: 'arcane_protection', name: 'Arcane Protection', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts', duration: '5', summary: 'Foes subtract 2 (4 on raise) from arcane skill rolls and damage directed at the target.' },
  { id: 'Armor', name: 'Armor', rankRequired: 'Novice', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Grants +2 Armor (+4 on a raise) that stacks with worn armor.' },
  { id: 'banish', name: 'Banish', rankRequired: 'Veteran', powerPoints: '3', range: 'Smarts', duration: 'Instant', summary: 'Opposed Spirit roll to send extraplanar entities back to their native plane or Shaken.' },
  { id: 'barrier', name: 'Barrier', rankRequired: 'Seasoned', powerPoints: '2+', range: 'Smarts', duration: '5', summary: 'Creates a solid wall of ice, stone, bone, or force (Hardness 10).' },
  { id: 'beast_friend', name: 'Beast Friend', rankRequired: 'Novice', powerPoints: 'Special', range: 'Smarts', duration: '10 mins', summary: 'Communicate with and guide natural beasts.' },
  { id: 'blast', name: 'Blast', rankRequired: 'Seasoned', powerPoints: '3', range: 'Smarts x2', duration: 'Instant', damage: '2d6', summary: 'Medium Blast Template area attack dealing 2d6 damage (3d6 on a raise).' },
  { id: 'blind', name: 'Blind', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Target must make Vigor-2 (-4 on raise) or suffer -2/-4 to all vision tasks.' },
  { id: 'Farsight', name: 'Farsight', rankRequired: 'Seasoned', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Halve range penalties for ranged attacks (and double range increments on a raise).' },
  { id: 'bolt', name: 'Bolt', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts x2', duration: 'Instant', damage: '2d6', summary: 'Hurls a missile of energy, fire, ice, or force dealing 2d6 damage (3d6 on a raise; +1 PP for 3d6 base).' },
  { id: 'boost_lower_trait', name: 'Boost/Lower Trait', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: '5', summary: 'Increases an ally’s Trait by 1 die type (2 on a raise) or lowers a foe’s Trait.' },
  { id: 'burrow', name: 'Burrow', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: '5', summary: 'Target can meld into the earth and move underground at half Pace (full Pace on raise).' },
  { id: 'burst', name: 'Burst', rankRequired: 'Novice', powerPoints: '2', range: 'Cone Template', duration: 'Instant', damage: '2d6', summary: 'Cone Template wave of flame, frost, or force dealing 2d6 damage (3d6 on a raise).' },
  { id: 'confusion', name: 'Confusion', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts x2', duration: 'Instant', summary: 'Targets in area make Smarts-2 (-4 on raise) or become Distracted and Vulnerable.' },
  { id: 'damage_field', name: 'Damage Field', rankRequired: 'Seasoned', powerPoints: '4', range: 'Touch', duration: '5', damage: '2d4', summary: 'Wreathes target in thorns, fire, or lightning causing 2d4 damage (2d6 on raise) to adjacent strikers.' },
  { id: 'darksight', name: 'Darksight', rankRequired: 'Novice', powerPoints: '1', range: 'Touch', duration: '1 hour', summary: 'Ignore up to 4 points of illumination penalties (6 points on a raise).' },
  { id: 'deflection', name: 'Deflection', rankRequired: 'Novice', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Attackers must subtract 2 from melee OR ranged attacks against the target (both on a raise).' },
  { id: 'detect_conceal_arcana', name: 'Detect/Conceal Arcana', rankRequired: 'Novice', powerPoints: '2', range: 'Sight', duration: '5', summary: 'Sense supernatural energy, invisible creatures, or mask magical items.' },
  { id: 'disguise', name: 'Disguise', rankRequired: 'Seasoned', powerPoints: '2', range: 'Touch', duration: '10 mins', summary: 'Illusionary appearance of another person within 1 Size level.' },
  { id: 'dispel', name: 'Dispel', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts', duration: 'Instant', summary: 'Opposed arcane skill roll to terminate an active enemy power or suppress an arcane device.' },
  { id: 'elemental_manipulation', name: 'Elemental Manipulation', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts', duration: '5', summary: 'Perform minor elemental cantrips with air, earth, fire, or water.' },
  { id: 'empathy', name: 'Empathy', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts', duration: '5', summary: 'Opposed vs Spirit; gain +1 (+2 on raise) to Intimidation, Performance, Persuasion, and Taunt vs target.' },
  { id: 'entangle', name: 'Entangle', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Restrains target in vines, webs, or chains; target is Entangled (Bound on a raise).' },
  { id: 'environmental_protection', name: 'Environmental Protection', rankRequired: 'Novice', powerPoints: '2', range: 'Touch', duration: '1 hour', summary: 'Breathe underwater/vacuum and reduce environmental damage by 4 (6 on raise).' },
  { id: 'fear', name: 'Fear', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Targets in Large Blast Template make a Fear check (at -2 on a raise).' },
  { id: 'fly', name: 'Fly', rankRequired: 'Veteran', powerPoints: '3', range: 'Touch', duration: '5', summary: 'Target flies at Pace 12" (Pace 24" on a raise).' },
  { id: 'growth_shrink', name: 'Growth/Shrink', rankRequired: 'Seasoned', powerPoints: '2+', range: 'Smarts', duration: '5', summary: 'Increase or decrease Size, Strength, and Toughness for every 2 PP spent.' },
  { id: 'havoc', name: 'Havoc', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Targets in Cone or MBT are thrown 2d6" away and Distracted if they fail Strength roll.' },
  { id: 'healing', name: 'Healing', rankRequired: 'Novice', powerPoints: '3', range: 'Touch', duration: 'Instant', summary: 'Removes 1 Wound (2 on a raise) that is less than one hour old.' },
  { id: 'illusion', name: 'Illusion', rankRequired: 'Novice', powerPoints: '3', range: 'Smarts', duration: '5', summary: 'Creates visual and auditory illusions that can Distract or Test foes.' },
  { id: 'intangibility', name: 'Intangibility', rankRequired: 'Heroic', powerPoints: '5', range: 'Touch', duration: '5', summary: 'Target becomes incorporeal, able to pass through walls and immune to non-magical physical attacks.' },
  { id: 'invisibility', name: 'Invisibility', rankRequired: 'Seasoned', powerPoints: '5', range: 'Touch', duration: '5', summary: 'Target is translucent (-4 to be noticed or attacked; -6 on a raise).' },
  { id: 'light_darkness', name: 'Light/Darkness', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: '10 mins / 5', summary: 'Creates bright illumination or a cloud of pitch darkness (-4 vision) in a Large Blast Template.' },
  { id: 'mind_link', name: 'Mind Link', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts', duration: '30 mins', summary: 'Telepathic connection between two individuals up to 1 mile apart (5 miles on raise).' },
  { id: 'mind_reading', name: 'Mind Reading', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Opposed vs Smarts to learn surface thoughts and get one truthful answer.' },
  { id: 'puppet', name: 'Puppet', rankRequired: 'Veteran', powerPoints: '3', range: 'Smarts', duration: '5', summary: 'Opposed vs Spirit to seize full mental control of a target.' },
  { id: 'relief', name: 'Relief', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts', duration: 'Instant', summary: 'Removes Shaken, Distracted, or Vulnerable (or 1 Fatigue level on a raise/extra PP).' },
  { id: 'resurrection', name: 'Resurrection', rankRequired: 'Heroic', powerPoints: '30', range: 'Touch', duration: 'Instant', summary: 'Brings a deceased character back to life with 3 Wounds and 2 Fatigue.' },
  { id: 'sloth_speed', name: 'Sloth/Speed', rankRequired: 'Seasoned', powerPoints: '2', range: 'Smarts', duration: '5', summary: 'Doubles target’s Pace and running die (or halves an enemy’s movement).' },
  { id: 'slumber', name: 'Slumber', rankRequired: 'Seasoned', powerPoints: '2', range: 'Smarts', duration: '1 hour', summary: 'Targets in Medium Blast Template make Spirit-2 on raise or fall fast asleep.' },
  { id: 'smite', name: 'Smite', rankRequired: 'Novice', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Increases a weapon’s damage by +2 (+4 on a raise) and makes it count as magical.' },
  { id: 'sound_silence', name: 'Sound/Silence', rankRequired: 'Novice', powerPoints: '1', range: 'Smarts x2', duration: 'Instant / 5', summary: 'Project phantom sounds up to 100 decibels or mute all sound in a Large Blast Template.' },
  { id: 'speak_language', name: 'Speak Language', rankRequired: 'Novice', powerPoints: '1', range: 'Touch', duration: '10 mins', summary: 'Speak, read, and write any sapient language.' },
  { id: 'stun', name: 'Stun', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Target makes Vigor roll (-2 on raise) or is Stunned.' },
  { id: 'summon_ally', name: 'Summon Ally', rankRequired: 'Novice', powerPoints: '2+', range: 'Smarts', duration: '5', summary: 'Conjures a loyal servant, elemental, or spirit guardian to fight for the caster.' },
  { id: 'telekinesis', name: 'Telekinesis', rankRequired: 'Seasoned', powerPoints: '5', range: 'Smarts x2', duration: '5', damage: 'Str+d6', summary: 'Move objects or wield weapons mentally with d10 Strength (d12 on a raise).' },
  { id: 'teleport', name: 'Teleport', rankRequired: 'Seasoned', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Instantly vanish and reappear up to 12" away (24" on a raise).' },
  { id: 'wall_walker', name: 'Wall Walker', rankRequired: 'Novice', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Walk on walls and ceilings at half Pace (full Pace on a raise).' },
  { id: 'warrior_s_gift', name: "Warrior's Gift", rankRequired: 'Seasoned', powerPoints: '4', range: 'Touch', duration: '5', summary: 'Temporarily grants the target any one Combat Edge they meet the Rank for (ignore 1 Rank on raise).' },
  { id: 'zombie', name: 'Zombie', rankRequired: 'Veteran', powerPoints: '3/corpse', range: 'Smarts', duration: '1 hour', summary: 'Animates corpses as loyal undead skeletons or zombies.' }
];

export const SWADE_WEAPONS_CATALOG: Omit<WeaponItem, 'id' | 'equipped'>[] = [
  // Melee
  { name: 'Unarmed / Fists', category: 'Melee', damage: 'Str', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 0, cost: 0, notes: 'Natural Attack' },
  { name: 'Dagger / Knife', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 25, notes: 'Can be thrown' },
  { name: 'Short Sword / Cutlass', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 2, cost: 100 },
  { name: 'Long Sword / Katana', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 3, cost: 300 },
  { name: 'Great Sword / Battle Axe', category: 'Melee', damage: 'Str+d10', ap: 2, range: 'Melee', rof: 1, minStr: 10, parryMod: 0, weight: 6, cost: 400, notes: 'AP 2, Two hands' },
  { name: 'Rapier', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: 1, weight: 2, cost: 150, notes: 'Parry +1' },
  { name: 'Spear / Quarterstaff', category: 'Melee', damage: 'Str+d6', ap: 0, range: '3/6/12', rof: 1, minStr: 6, parryMod: 1, weight: 3, cost: 100, notes: 'Parry +1 (Two hands), Reach 1' },
  { name: 'Warhammer / Mace', category: 'Melee', damage: 'Str+d6', ap: 1, range: 'Melee', rof: 1, minStr: 6, weight: 2, cost: 150, notes: 'AP 1 vs Rigid Armor' },
  { name: 'Molecular Sword (Sci-Fi)', category: 'Melee', damage: 'Str+d8+2', ap: 4, range: 'Melee', rof: 1, minStr: 6, weight: 2, cost: 500, notes: 'AP 4' },
  // Ranged (Fantasy / Primitive)
  { name: 'Short Bow', category: 'Ranged', damage: '2d6', ap: 0, range: '12/24/48', rof: 1, minStr: 6, weight: 2, cost: 150 },
  { name: 'Long Bow / Compound Bow', category: 'Ranged', damage: '2d6', ap: 1, range: '15/30/60', rof: 1, minStr: 8, weight: 3, cost: 250, notes: 'AP 1' },
  { name: 'Crossbow (Hand-Drawn)', category: 'Ranged', damage: '2d6', ap: 2, range: '15/30/60', rof: 1, minStr: 6, weight: 5, cost: 250, notes: 'AP 2, Reload 1' },
  // Ranged (Black Powder / Western / Modern / Sci-Fi)
  { name: 'Flintlock Pistol', category: 'Ranged', damage: '2d6+1', ap: 0, range: '5/10/20', rof: 1, minStr: 4, weight: 3, cost: 150, notes: 'Reload 3' },
  { name: 'Colt Peacemaker (.45)', category: 'Ranged', damage: '2d6+1', ap: 1, range: '12/24/48', rof: 1, minStr: 4, weight: 2, cost: 200, notes: 'Revolver, AP 1' },
  { name: '9mm Semi-Auto Pistol', category: 'Ranged', damage: '2d6', ap: 1, range: '12/24/48', rof: 1, minStr: 4, weight: 2, cost: 200, notes: '17 Shots, Semi-Auto' },
  { name: 'Heavy Revolver (.357)', category: 'Ranged', damage: '2d6+1', ap: 2, range: '12/24/48', rof: 1, minStr: 6, weight: 3, cost: 250, notes: 'AP 2' },
  { name: 'Pump Action Shotgun', category: 'Ranged', damage: '3d6', ap: 0, range: '12/24/48', rof: 1, minStr: 6, weight: 8, cost: 150, notes: '+2 Shooting, 1-3d6 by range' },
  { name: 'Winchester Lever Rifle', category: 'Ranged', damage: '2d8', ap: 2, range: '24/48/96', rof: 1, minStr: 6, weight: 7, cost: 300, notes: 'AP 2' },
  { name: 'Submachine Gun (MP5)', category: 'Ranged', damage: '2d6', ap: 1, range: '12/24/48', rof: 3, minStr: 6, weight: 7, cost: 350, notes: 'RoF 3, 3-Round Burst' },
  { name: 'Assault Rifle (M16/AK47)', category: 'Ranged', damage: '2d8', ap: 2, range: '24/48/96', rof: 3, minStr: 6, weight: 8, cost: 450, notes: 'RoF 3, AP 2' },
  { name: 'Laser Pistol', category: 'Ranged', damage: '2d6', ap: 2, range: '15/30/60', rof: 1, minStr: 4, weight: 2, cost: 250, notes: 'No Recoil, Cauterize' },
  { name: 'Laser Rifle', category: 'Ranged', damage: '3d6', ap: 2, range: '30/60/120', rof: 3, minStr: 6, weight: 5, cost: 500, notes: 'RoF 3, No Recoil' }
];

export const SWADE_ARMOR_CATALOG: Omit<ArmorItem, 'id' | 'equipped'>[] = [
  { name: 'Cloth / Heavy Duster', type: 'Armor', armorBonus: 1, parryBonus: 0, minStr: 4, weight: 4, cost: 50, notes: 'Light protection' },
  { name: 'Leather Jacket / Armor', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 8, cost: 100, notes: 'Torso, arms, legs' },
  { name: 'Chain Hauberk (Mail)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 15, cost: 300, notes: 'Covers torso, arms, legs' },
  { name: 'Plate Corselet', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 10, weight: 25, cost: 400, notes: 'Heavy plate torso' },
  { name: 'Kevlar Vest (Modern)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 5, cost: 250, notes: '+4 vs bullets, negates 4 AP' },
  { name: 'Tactical Body Armor', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 8, weight: 12, cost: 500, notes: 'Ceramic trauma plates' },
  { name: 'Infantry Battle Suit (Sci-Fi)', type: 'Armor', armorBonus: 6, parryBonus: 0, minStr: 8, weight: 15, cost: 800, notes: 'Sealed HUD suit' },
  { name: 'Small Shield (Buckler)', type: 'Shield', armorBonus: 0, parryBonus: 1, coverBonus: 0, minStr: 4, weight: 4, cost: 50, notes: 'Parry +1' },
  { name: 'Medium Shield', type: 'Shield', armorBonus: 0, parryBonus: 2, coverBonus: 2, minStr: 6, weight: 8, cost: 100, notes: 'Parry +2, Cover -2 vs Ranged' },
  { name: 'Large / Riot Shield', type: 'Shield', armorBonus: 0, parryBonus: 3, coverBonus: 4, minStr: 8, weight: 12, cost: 200, notes: 'Parry +3, Cover -4 vs Ranged' }
];

export const INITIAL_SKILLS_TEMPLATE = () =>
  SWADE_SKILLS.map((sk) => ({
    skillId: sk.id,
    name: sk.name,
    linkedAttribute: sk.linkedAttribute,
    isCore: sk.isCore,
    die: (sk.isCore ? 4 : 0) as DieSides | 0,
    modifier: 0
  }));

export const SAMPLE_CHARACTERS: SwadeCharacter[] = [
  {
    id: 'char_valeria_stormblade',
    name: 'Valeria Stormblade',
    concept: 'Disgraced Knight & Eldritch Duelist',
    setting: 'Fantasy / Pathfinder SWADE',
    ancestryId: 'human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: {
      agility: 8,
      smarts: 6,
      spirit: 6,
      strength: 8,
      vigor: 6
    },
    attributeModifiers: {
      agility: 0,
      smarts: 0,
      spirit: 0,
      strength: 0,
      vigor: 0
    },
    skills: SWADE_SKILLS.map((sk) => {
      const map: Record<string, DieSides> = {
        athletics: 6,
        common_knowledge: 4,
        fighting: 8,
        intimidation: 6,
        notice: 6,
        persuasion: 4,
        riding: 6,
        spellcasting: 6,
        stealth: 4,
        survival: 4
      };
      return {
        skillId: sk.id,
        name: sk.name,
        linkedAttribute: sk.linkedAttribute,
        isCore: sk.isCore,
        die: map[sk.id] ?? (sk.isCore ? 4 : 0),
        modifier: 0
      };
    }),
    hindrances: [
      {
        hindranceId: 'code_of_honor',
        name: 'Code of Honor',
        severity: 'Major',
        summary: 'Keeps her word, protects the helpless, and fights fairly.'
      },
      {
        hindranceId: 'loyal',
        name: 'Loyal',
        severity: 'Minor',
        summary: 'Never leaves a comrade behind.'
      },
      {
        hindranceId: 'vow',
        name: 'Vow',
        severity: 'Minor',
        summary: 'Sworn to reclaim her family’s stolen runeblade.'
      }
    ],
    hindranceAllocation: {
      attributes: 1,
      edges: 1,
      skills: 0,
      wealth: 0
    },
    edges: [
      {
        edgeId: 'arcane_background',
        name: 'Arcane Background',
        category: 'Background',
        rankRequired: 'Novice',
        summary: 'Unlocks supernatural powers and Power Points.',
        source: 'Ancestry'
      },
      {
        edgeId: 'sweep',
        name: 'Sweep',
        category: 'Combat',
        rankRequired: 'Novice',
        summary: 'Attack all adjacent enemies within weapon reach at -2.',
        source: 'Hindrance'
      }
    ],
    arcaneBackgroundId: 'magic',
    maxPowerPointsMod: 0,
    powers: [
      {
        id: 'pwr_1',
        powerId: 'smite',
        name: 'Smite',
        trapping: 'Crackling Storm Lightning along the blade',
        powerPoints: '2',
        range: 'Touch',
        duration: '5',
        summary: 'Increases a weapon’s damage by +2 (+4 on a raise).'
      },
      {
        id: 'pwr_2',
        powerId: 'bolt',
        name: 'Bolt',
        trapping: 'Arc of Thunder',
        powerPoints: '1',
        range: 'Smarts x2',
        duration: 'Instant',
        damage: '2d6',
        summary: 'Hurls a bolt of lightning dealing 2d6 damage (3d6 on a raise).'
      },
      {
        id: 'pwr_3',
        powerId: 'deflection',
        name: 'Deflection',
        trapping: 'Swirling Gale Winds',
        powerPoints: '2',
        range: 'Touch',
        duration: '5',
        summary: 'Attackers subtract 2 from melee or ranged attacks.'
      }
    ],
    weapons: [
      {
        id: 'wpn_1',
        name: 'Long Sword',
        category: 'Melee',
        damage: 'Str+d8',
        ap: 0,
        range: 'Melee',
        rof: 1,
        minStr: 8,
        weight: 3,
        cost: 300,
        equipped: true
      },
      {
        id: 'wpn_2',
        name: 'Dagger',
        category: 'Melee',
        damage: 'Str+d4',
        ap: 0,
        range: '3/6/12',
        rof: 1,
        minStr: 4,
        weight: 1,
        cost: 25,
        equipped: true
      }
    ],
    armor: [
      {
        id: 'arm_1',
        name: 'Chain Hauberk (Mail)',
        type: 'Armor',
        armorBonus: 3,
        parryBonus: 0,
        minStr: 8,
        weight: 15,
        cost: 300,
        equipped: true
      },
      {
        id: 'arm_2',
        name: 'Medium Shield',
        type: 'Shield',
        armorBonus: 0,
        parryBonus: 2,
        coverBonus: 2,
        minStr: 6,
        weight: 8,
        cost: 100,
        equipped: true
      }
    ],
    gear: [
      { id: 'gr_1', name: 'Adventurer’s Pack & Bedroll', quantity: 1, weight: 5, cost: 25 },
      { id: 'gr_2', name: 'Healer’s Poultice Kit', quantity: 2, weight: 1, cost: 25 }
    ],
    currency: 125,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: {
      bornAHero: false,
      moreSkillPoints: false,
      unarmoredHero: false
    },
    sourceBooks: ['core', 'fantasy'],
    playState: {
      wounds: 0,
      maxWounds: 3,
      fatigue: 0,
      bennies: 3,
      currentPowerPoints: 10,
      shaken: false,
      distracted: false,
      vulnerable: false,
      boundOrEntangled: false,
      conviction: false,
      aiming: false
    },
    backstory: 'Once a Knight of the Silver Spire, Valeria now wanders the borderlands seeking the cultists who framed her order.',
    notes: 'Remember to cast Smite before charging into melee!',
    avatarEmoji: '⚔️',
    updatedAt: Date.now()
  },
  {
    id: 'char_silas_mccrae',
    name: 'Silas "Deadeye" McCrae',
    concept: 'Bounty Hunter & Hexslinger',
    setting: 'Deadlands / Weird West',
    ancestryId: 'human',
    isWildCard: true,
    advancesCount: 4,
    advancesList: [
      { number: 1, rank: 'Novice', type: 'Edge', description: 'Quick (Redraw cards 5 or lower)' },
      { number: 2, rank: 'Novice', type: 'Skills', description: 'Raised Shooting to d10' },
      { number: 3, rank: 'Novice', type: 'Attribute', description: 'Raised Agility to d10' },
      { number: 4, rank: 'Seasoned', type: 'Edge', description: 'Marksman (+1 Aim / ignore 2 pts penalty)' }
    ],
    attributes: {
      agility: 10,
      smarts: 6,
      spirit: 8,
      strength: 6,
      vigor: 6
    },
    attributeModifiers: {
      agility: 0,
      smarts: 0,
      spirit: 0,
      strength: 0,
      vigor: 0
    },
    skills: SWADE_SKILLS.map((sk) => {
      const map: Record<string, DieSides> = {
        athletics: 6,
        common_knowledge: 4,
        fighting: 6,
        gambling: 6,
        intimidation: 8,
        notice: 8,
        persuasion: 4,
        riding: 6,
        shooting: 10,
        stealth: 6,
        survival: 6
      };
      return {
        skillId: sk.id,
        name: sk.name,
        linkedAttribute: sk.linkedAttribute,
        isCore: sk.isCore,
        die: map[sk.id] ?? (sk.isCore ? 4 : 0),
        modifier: 0
      };
    }),
    hindrances: [
      {
        hindranceId: 'vengeful',
        name: 'Vengeful',
        severity: 'Major',
        summary: 'Holds grudges and demands payback for every slight.'
      },
      {
        hindranceId: 'grim',
        name: 'Mean',
        severity: 'Minor',
        summary: 'Ill-tempered and disagreeable (-1 Persuasion).'
      },
      {
        hindranceId: 'habit',
        name: 'Habit (Cigars)',
        severity: 'Minor',
        summary: 'Always chewing on a frontier cheroot.'
      }
    ],
    hindranceAllocation: {
      attributes: 1,
      edges: 1,
      skills: 0,
      wealth: 0
    },
    edges: [
      {
        edgeId: 'two_gun_kid',
        name: 'Two-Gun Kid',
        category: 'Combat',
        rankRequired: 'Novice',
        summary: 'Ignore the -2 Multi-Action penalty when firing one ranged weapon in each hand.',
        source: 'Ancestry'
      },
      {
        edgeId: 'dead_shot',
        name: 'Dead Shot',
        category: 'Combat',
        rankRequired: 'Novice',
        summary: 'Double ranged damage on your first hit when dealt a Joker.',
        source: 'Hindrance'
      },
      {
        edgeId: 'quick',
        name: 'Quick',
        category: 'Background',
        rankRequired: 'Novice',
        summary: 'Discard and redraw Action Cards of 5 or lower.',
        source: 'Advance'
      },
      {
        edgeId: 'marksman',
        name: 'Marksman',
        category: 'Combat',
        rankRequired: 'Seasoned',
        summary: 'Ignore up to 2 points of Shooting penalties if you do not move.',
        source: 'Advance'
      }
    ],
    arcaneBackgroundId: 'none',
    maxPowerPointsMod: 0,
    powers: [],
    weapons: [
      {
        id: 'wpn_colt_1',
        name: 'Twin Colt Peacemakers (.45)',
        category: 'Ranged',
        damage: '2d6+1',
        ap: 1,
        range: '12/24/48',
        rof: 1,
        minStr: 4,
        weight: 4,
        cost: 400,
        equipped: true,
        notes: 'AP 1, Matched Pair'
      },
      {
        id: 'wpn_winchester',
        name: 'Winchester Lever Rifle',
        category: 'Ranged',
        damage: '2d8',
        ap: 2,
        range: '24/48/96',
        rof: 1,
        minStr: 6,
        weight: 7,
        cost: 300,
        equipped: true,
        notes: 'AP 2'
      },
      {
        id: 'wpn_bowie',
        name: 'Bowie Knife',
        category: 'Melee',
        damage: 'Str+d4',
        ap: 0,
        range: '3/6/12',
        rof: 1,
        minStr: 4,
        weight: 1,
        cost: 25,
        equipped: true
      }
    ],
    armor: [
      {
        id: 'arm_duster',
        name: 'Reinforced Trail Duster',
        type: 'Armor',
        armorBonus: 1,
        parryBonus: 0,
        minStr: 4,
        weight: 4,
        cost: 50,
        equipped: true
      }
    ],
    gear: [
      { id: 'gr_ammo', name: '.45 Ammo Box (50 rounds)', quantity: 2, weight: 2, cost: 20 },
      { id: 'gr_poker', name: 'Marked Deck of Cards', quantity: 1, weight: 0.5, cost: 10 }
    ],
    currency: 340,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: {
      bornAHero: false,
      moreSkillPoints: false,
      unarmoredHero: false
    },
    sourceBooks: ['core', 'fantasy'],
    playState: {
      wounds: 0,
      maxWounds: 3,
      fatigue: 0,
      bennies: 3,
      currentPowerPoints: 0,
      shaken: false,
      distracted: false,
      vulnerable: false,
      boundOrEntangled: false,
      conviction: false,
      aiming: false
    },
    backstory: 'Tracks outlaws and abominations across the Weird West with a pair of silver-inlaid Peacemakers.',
    notes: 'Two-Gun Kid lets Silas fire both Peacemakers with zero Multi-Action penalty!',
    avatarEmoji: '🤠',
    updatedAt: Date.now() - 3600000
  }
];
