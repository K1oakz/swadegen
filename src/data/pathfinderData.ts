import {
  AncestryDef,
  ArcaneBackgroundDef,
  ArmorItem,
  AttributeId,
  CharacterSkill,
  DieSides,
  EdgeDef,
  GearItem,
  HindranceDef,
  PowerDef,
  SwadeCharacter,
  WeaponItem
} from '../types/swade';

export const PF_ANCESTRIES: AncestryDef[] = [
  {
    id: 'pf_dwarf',
    name: 'Dwarf (Pathfinder)',
    source: 'pathfinder',
    summary: 'Stern, hardy mountain folk with Darkvision, Iron Constitution, Stonecunning, d6 Vigor, and greater carrying strength, though slower on foot.',
    attributeBonuses: { vigor: 1 },
    paceMod: -1,
    traits: [
      { name: 'Darkvision', description: 'Ignore penalties for Illumination up to 10" (20 yards).' },
      { name: 'Iron Constitution', description: '+1 to resist poison and +1 when resisting or recovering from powers or power-like abilities.' },
      { name: 'Reduced Pace', description: 'Decrease Pace by 1 (to 5") and reduce the running die by one die type (to d4).' },
      { name: 'Stonecunning', description: 'Free action Notice roll at +2 within 10 feet of unusual stonework such as traps and hidden doors.' },
      { name: 'Tough', description: 'Start with d6 Vigor (max d12+1). Treat Strength as one die type higher for Encumbrance and Minimum Strength for armor/equipment (stacks with Brawny).' }
    ]
  },
  {
    id: 'pf_elf',
    name: 'Elf (Pathfinder)',
    source: 'pathfinder',
    summary: 'Long-lived, graceful, and intellect-gifted forest dwellers with d6 Agility, d6 Smarts, d6 Notice, Low Light Vision, and Elven Magic, but Slender (-1 Toughness & -1 Vigor).',
    attributeBonuses: { agility: 1, smarts: 1 },
    skillBonuses: { notice: 1 },
    toughnessMod: -1,
    traits: [
      { name: 'Agile', description: 'Start with d6 Agility instead of d4 (max d12+1).' },
      { name: 'Elven Magic', description: 'Free reroll when rolling to resist enemy powers.' },
      { name: 'Intelligence', description: 'Start with d6 Smarts instead of d4 (max d12+1).' },
      { name: 'Keen Senses', description: 'Start with d6 Notice instead of d4 (max d12+1).' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Slender', description: '-1 Toughness and -1 to Vigor rolls.' }
    ]
  },
  {
    id: 'pf_gnome',
    name: 'Gnome (Pathfinder)',
    source: 'pathfinder',
    summary: 'Fey-rooted tricksters with innate Gnome Magic cantrips (+1 PP), d6 Notice, d6 Vigor, Low Light Vision, and Size -1.',
    attributeBonuses: { vigor: 1 },
    skillBonuses: { notice: 1 },
    paceMod: -1,
    sizeMod: -1,
    toughnessMod: -1,
    traits: [
      { name: 'Gnome Magic', description: 'Cast cantrips for light, sound, telekinesis, and beast friend using Smarts (or arcane skill); +1 Power Point.' },
      { name: 'Keen Senses', description: 'Start with d6 Notice instead of d4 (max d12+1).' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Obsessive', description: 'Start with d4 in any one Smarts-related skill of choice.' },
      { name: 'Reduced Pace', description: 'Decrease Pace by 1 (to 5") and reduce the running die by one die type (to d4).' },
      { name: 'Size -1', description: 'Standing ~3.5 feet tall, Gnomes reduce Size and Toughness by 1.' },
      { name: 'Tough', description: 'Start with d6 Vigor instead of d4 (max d12+1).' }
    ]
  },
  {
    id: 'pf_half_elf',
    name: 'Half-Elf (Pathfinder)',
    source: 'pathfinder',
    summary: 'Versatile heirs of two worlds with Elven Magic, Low Light Vision, and starting d6 Flexibility in any one Attribute.',
    traits: [
      { name: 'Elven Magic', description: 'Free reroll when rolling to resist enemy powers.' },
      { name: 'Flexibility', description: 'Start with a d6 in any one Attribute instead of d4 (does not increase Attribute maximum).' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark Illumination.' }
    ]
  },
  {
    id: 'pf_half_orc',
    name: 'Half-Orc (Pathfinder)',
    source: 'pathfinder',
    summary: 'Powerful and intimidating warriors with d6 Strength, d4 Intimidation, Darkvision, and +1 Toughness, though viewed as Outsiders.',
    attributeBonuses: { strength: 1 },
    skillBonuses: { intimidation: 1 },
    toughnessMod: 1,
    traits: [
      { name: 'Darkvision', description: 'Ignore penalties for Illumination up to 10" (20 yards).' },
      { name: 'Intimidating', description: 'Start with d4 in Intimidation (increases max Intimidation to d12+1).' },
      { name: 'Orc Ferocity', description: '+1 Toughness from sheer grit.' },
      { name: 'Outsider (Minor)', description: '-2 to Persuasion rolls among suspicious cultures.' },
      { name: 'Strong', description: 'Start with d6 Strength instead of d4 (max d12+1).' }
    ]
  },
  {
    id: 'pf_halfling',
    name: 'Halfling (Pathfinder)',
    source: 'pathfinder',
    summary: 'Nimble, observant, and extraordinarily lucky small folk with d6 Agility, d6 Athletics, d6 Notice, and the Luck Edge.',
    attributeBonuses: { agility: 1 },
    skillBonuses: { athletics: 1, notice: 1 },
    paceMod: -1,
    sizeMod: -1,
    toughnessMod: -1,
    traits: [
      { name: 'Agile', description: 'Start with d6 Agility instead of d4 (max d12+1).' },
      { name: 'Keen Senses', description: 'Start with d6 Notice instead of d4 (max d12+1).' },
      { name: 'Lucky', description: 'Gain the Luck Edge (+1 Benny per session, even for Extras).' },
      { name: 'Reduced Pace', description: 'Decrease Pace by 1 (to 5") and reduce the running die by one die type (to d4).' },
      { name: 'Size -1', description: 'Small stature reduces Size and Toughness by 1.' },
      { name: 'Sure-Footed', description: 'Start with d6 Athletics instead of d4 (max d12+1).' }
    ]
  },
  {
    id: 'pf_human',
    name: 'Human (Pathfinder)',
    source: 'pathfinder',
    summary: 'Ambitious and driven, Savage Pathfinder Humans start with one free Edge and a d6 in any one Attribute.',
    freeEdgeBonus: 1,
    traits: [
      { name: 'Adaptability', description: 'Start with one free Edge (must meet requirements) and a d6 in any one Attribute instead of d4 (does not raise max).' }
    ]
  }
];

export const PF_HINDRANCES: HindranceDef[] = [
  {
    id: 'pf_cant_swim',
    name: "Can't Swim",
    severity: 'Minor',
    summary: '-2 to Athletics rolls when swimming; each inch moved in water costs 3" of Pace.',
    effect: '-2 swimming Athletics; 3" Pace per 1" in water',
    source: 'pathfinder'
  },
  {
    id: 'pf_timid',
    name: 'Timid',
    severity: 'Major',
    summary: '-2 to Fear checks and resisting Intimidation.',
    effect: '-2 Fear checks & resisting Intimidation',
    source: 'pathfinder'
  }
];

export const PF_EDGES: EdgeDef[] = [
  // =========================================================================
  // CLASS EDGES (11 Core Classes × 4 Tiers = 44 Edges)
  // =========================================================================
  // --- BARBARIAN ---
  {
    id: 'pf_barbarian',
    name: 'Barbarian',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d6+, Vigor d6+',
    minAttributes: { strength: 6, vigor: 6 },
    paceBonus: 2,
    summary: 'Armor Restriction (Medium), Fast (+2 Pace), and Rage (+1 Str die step, mandatory Wild Attack, ignore 2 Wound penalties & Fatigue for 5 rounds).',
    source: 'pathfinder'
  },
  {
    id: 'pf_powerful_blow',
    name: 'Powerful Blow',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Barbarian',
    requiredEdges: ['pf_barbarian'],
    summary: 'Savage Wild Attacks cause +4 damage instead of +2.',
    source: 'pathfinder'
  },
  {
    id: 'pf_intimidating_glare',
    name: 'Intimidating Glare',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Barbarian',
    requiredEdges: ['pf_barbarian'],
    summary: 'Make an Intimidation roll as a limited free action when dealt a Jack or better in combat (ignores Repetition).',
    source: 'pathfinder'
  },
  {
    id: 'pf_strength_surge',
    name: 'Strength Surge',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Barbarian',
    requiredEdges: ['pf_barbarian'],
    summary: 'Strength increases two die types when raging instead of one (can exceed ancestral limit).',
    source: 'pathfinder'
  },

  // --- BARD ---
  {
    id: 'pf_bard',
    name: 'Bard',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+, Common Knowledge d6+',
    minAttributes: { spirit: 6 },
    minSkills: { common_knowledge: 6 },
    summary: 'Arcane Background (Bard) using Performance (10 PP, 3 powers), Armor Interference (Light), and Sharp Tongued (use Performance for Taunt).',
    source: 'pathfinder'
  },
  {
    id: 'pf_inspire_heroics',
    name: 'Inspire Heroics',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Bard',
    requiredEdges: ['pf_bard'],
    summary: 'Once per encounter as a limited free action, gain 5 Inspiration tokens to grant allies rerolls.',
    source: 'pathfinder'
  },
  {
    id: 'pf_countersong',
    name: 'Countersong',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Bard',
    requiredEdges: ['pf_bard'],
    summary: 'Allies within 5" gain a free reroll when resisting or recovering from enemy spell effects.',
    source: 'pathfinder'
  },
  {
    id: 'pf_dirge_of_doom',
    name: 'Dirge of Doom',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Bard',
    requiredEdges: ['pf_bard'],
    summary: 'Enemy Wild Cards within 10" subtract 2 from their totals when spending a Benny.',
    source: 'pathfinder'
  },

  // --- CLERIC ---
  {
    id: 'pf_cleric',
    name: 'Cleric',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+, Occult d6+',
    minAttributes: { spirit: 6 },
    minSkills: { occult: 6 },
    summary: 'Arcane Background (Cleric) using Faith (10 PP, healing + 2 powers + Deity Domain), Channel Energy (healing at Range Spirit + Additional Recipients), Vow (Major).',
    source: 'pathfinder'
  },
  {
    id: 'pf_destroy_undead',
    name: 'Destroy Undead',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Cleric',
    requiredEdges: ['pf_cleric'],
    summary: 'Spend 2 PP as an action for a Medium Blast Template pulse; undead within must roll Spirit or take a Wound.',
    source: 'pathfinder'
  },
  {
    id: 'pf_favored_powers_cleric',
    name: 'Favored Powers (Cleric)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Cleric',
    requiredEdges: ['pf_cleric'],
    summary: 'Limited free action to ignore up to 2 points of penalties when casting healing, sanctuary, or smite.',
    source: 'pathfinder'
  },
  {
    id: 'pf_divine_mastery_cleric',
    name: 'Divine Mastery (Cleric)',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Cleric',
    requiredEdges: ['pf_cleric'],
    summary: 'Gain access to Epic Power Modifiers for all Cleric powers.',
    source: 'pathfinder'
  },

  // --- DRUID ---
  {
    id: 'pf_druid',
    name: 'Druid',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+, Survival d6+',
    minAttributes: { spirit: 6 },
    minSkills: { survival: 6 },
    summary: 'Arcane Background (Druid) using Faith (10 PP, 3 powers from Cleric + Nature Domain), Armor Interference (Light/Metal), Nature Bond, Nature Sense, Secret Language (Druidic), Wilderness Stride.',
    source: 'pathfinder'
  },
  {
    id: 'pf_wild_shape',
    name: 'Wild Shape',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Druid',
    requiredEdges: ['pf_druid'],
    summary: 'Gain shape change power with 1-hour Duration and cast it as if one Rank higher.',
    source: 'pathfinder'
  },
  {
    id: 'pf_favored_powers_druid',
    name: 'Favored Powers (Druid)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Druid',
    requiredEdges: ['pf_druid'],
    summary: 'Limited free action to ignore up to 2 points of penalties when casting entangle, smite, or protection.',
    source: 'pathfinder'
  },
  {
    id: 'pf_divine_mastery_druid',
    name: 'Divine Mastery (Druid)',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Druid',
    requiredEdges: ['pf_druid'],
    summary: 'Gain access to Epic Power Modifiers for all Druid powers.',
    source: 'pathfinder'
  },

  // --- FIGHTER ---
  {
    id: 'pf_fighter',
    name: 'Fighter',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Strength d6+, Athletics, Fighting, or Shooting d6+',
    minAttributes: { strength: 6 },
    summary: 'Martial Flexibility: once per encounter as a limited free action, gain the benefits of any qualifying Combat Edge for 5 rounds.',
    source: 'pathfinder'
  },
  {
    id: 'pf_deadly_blow',
    name: 'Deadly Blow',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fighter',
    requiredEdges: ['pf_fighter'],
    summary: 'Add +1 damage to all successful Athletics (throwing), Fighting, or Shooting attacks.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_martial_flexibility',
    name: 'Improved Martial Flexibility',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Fighter',
    requiredEdges: ['pf_fighter'],
    summary: 'Gain the benefits of two Combat Edges with Martial Flexibility.',
    source: 'pathfinder'
  },
  {
    id: 'pf_martial_prowess',
    name: 'Martial Prowess',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Fighter',
    requiredEdges: ['pf_fighter'],
    summary: 'Free reroll on any failed Athletics (throwing), Fighting, or Shooting roll.',
    source: 'pathfinder'
  },

  // --- MONK ---
  {
    id: 'pf_monk',
    name: 'Monk',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d6+, Spirit d6+, Fighting d6+',
    minAttributes: { agility: 6, spirit: 6 },
    minSkills: { fighting: 6 },
    summary: 'Armor Restriction (Any), Stunning Fist (Vigor or Stunned), and Unarmed Strike (always armed, Str+d4 natural damage).',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_powers_monk',
    name: 'Mystic Powers (Monk)',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Monk',
    requiredEdges: ['pf_monk'],
    summary: '10 dedicated PP to automatically cast self-only boost Trait (Agi, Ath, Fight, or Stealth), deflection, smite, and speed.',
    source: 'pathfinder'
  },
  {
    id: 'pf_great_ki',
    name: 'Great Ki',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Monk, Mystic Powers (Monk)',
    requiredEdges: ['pf_monk', 'pf_mystic_powers_monk'],
    summary: "Expands Mystic Powers to include boost Trait (Strength), protection, speed, wall walker, and warrior's gift.",
    source: 'pathfinder'
  },
  {
    id: 'pf_wholeness_of_body',
    name: 'Wholeness of Body',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Monk, Mystic Powers (Monk)',
    requiredEdges: ['pf_monk', 'pf_mystic_powers_monk'],
    summary: 'Spend 2 PP to make a Soak roll without spending a Benny.',
    source: 'pathfinder'
  },

  // --- PALADIN ---
  {
    id: 'pf_paladin',
    name: 'Paladin',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+, Strength d6+, Vow (Minor or Major)',
    minAttributes: { spirit: 6, strength: 6 },
    summary: 'Aura of Courage (+1 Fear checks within 10"), Code of Honor, Detect Evil, and Smite Evil (free reroll on failed attacks vs chosen evil foe per encounter).',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_powers_paladin',
    name: 'Mystic Powers (Paladin)',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Paladin',
    requiredEdges: ['pf_paladin'],
    summary: '10 dedicated PP to cast boost Trait (Fighting, Strength, Vigor — self), healing, relief, and smite (self).',
    source: 'pathfinder'
  },
  {
    id: 'pf_mercy',
    name: 'Mercy',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Paladin',
    requiredEdges: ['pf_paladin'],
    summary: 'Remove Distracted, Vulnerable, or Shaken from an ally within Range of Spirit.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mount',
    name: 'Mount',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Paladin',
    requiredEdges: ['pf_paladin'],
    summary: 'Gain a loyal Wild Card light or heavy warhorse mount.',
    source: 'pathfinder'
  },

  // --- RANGER ---
  {
    id: 'pf_ranger',
    name: 'Ranger',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Athletics/Fighting/Shooting d6+, Survival d6+',
    minSkills: { survival: 6 },
    summary: 'Armor Restriction (Medium), Favored Enemy (+2 Fighting/Shooting/Survival/Notice vs chosen type), Favored Terrain, and Wilderness Stride.',
    source: 'pathfinder'
  },
  {
    id: 'pf_quarry',
    name: 'Quarry',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Ranger',
    requiredEdges: ['pf_ranger'],
    summary: 'Choose an additional Favored Enemy and Favored Terrain type.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_powers_ranger',
    name: 'Mystic Powers (Ranger)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Ranger',
    requiredEdges: ['pf_ranger'],
    summary: "10 dedicated PP to cast beast friend, boost Trait (Ath, Fight, Shoot — self), entangle, and warrior's gift (self).",
    source: 'pathfinder'
  },
  {
    id: 'pf_master_hunter',
    name: 'Master Hunter',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Ranger',
    requiredEdges: ['pf_ranger'],
    summary: 'Add +1d6 damage to successful Athletics (throwing), Fighting, or Shooting attacks against Favored Enemies.',
    source: 'pathfinder'
  },

  // --- ROGUE ---
  {
    id: 'pf_rogue',
    name: 'Rogue',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d6+, Notice d6+, Stealth d6+',
    minAttributes: { agility: 6 },
    minSkills: { notice: 6, stealth: 6 },
    summary: 'Armor Restriction (Light) and Sneak Attack (+1d6 damage when attacking with The Drop or against Vulnerable foes).',
    source: 'pathfinder'
  },
  {
    id: 'pf_trap_sense',
    name: 'Trap Sense',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Rogue',
    requiredEdges: ['pf_rogue'],
    summary: 'Notice roll to detect traps before springing them; ignore up to 2 points of penalties disarming with Thievery.',
    source: 'pathfinder'
  },
  {
    id: 'pf_uncanny_reflexes',
    name: 'Uncanny Reflexes',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Rogue',
    requiredEdges: ['pf_rogue'],
    summary: 'Ignore -2 Agility penalty to Evasion attempts and may attempt to Evade area effects that normally disallow it.',
    source: 'pathfinder'
  },
  {
    id: 'pf_opportunist',
    name: 'Opportunist',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Rogue',
    requiredEdges: ['pf_rogue'],
    summary: 'Free attack against a foe who withdraws from melee even with Extraction (targets without Extraction count as Vulnerable).',
    source: 'pathfinder'
  },

  // --- SORCERER ---
  {
    id: 'pf_sorcerer',
    name: 'Sorcerer',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+, Spirit d6+',
    minAttributes: { smarts: 6, spirit: 6 },
    summary: 'Arcane Background (Sorcerer) using Spirit-linked Spellcasting (15 PP, 2 powers), Armor Interference (Any), and chosen Bloodline.',
    source: 'pathfinder'
  },
  {
    id: 'pf_favored_powers_sorcerer',
    name: 'Favored Powers (Sorcerer)',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Sorcerer',
    requiredEdges: ['pf_sorcerer'],
    summary: 'Limited free action to ignore up to 2 points of penalties when casting bolt, elemental manipulation, or protection.',
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_mastery_sorcerer',
    name: 'Arcane Mastery (Sorcerer)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Sorcerer',
    requiredEdges: ['pf_sorcerer'],
    summary: 'Gain access to Epic Power Modifiers for Sorcerer powers.',
    source: 'pathfinder'
  },
  {
    id: 'pf_advanced_bloodline',
    name: 'Advanced Bloodline',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Sorcerer',
    requiredEdges: ['pf_sorcerer'],
    summary: "Gain your Sorcerer Bloodline's Advanced Form ability.",
    source: 'pathfinder'
  },

  // --- WIZARD ---
  {
    id: 'pf_wizard',
    name: 'Wizard',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+, Occult d6+',
    minAttributes: { smarts: 6 },
    minSkills: { occult: 6 },
    summary: 'Arcane Background (Wizard) using Spellcasting (10 PP, 3 powers), Arcane Bond (object +1 Spellcasting or familiar), Armor Interference (Any), School, Spellbooks.',
    source: 'pathfinder'
  },
  {
    id: 'pf_favored_powers_wizard',
    name: 'Favored Powers (Wizard)',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Wizard',
    requiredEdges: ['pf_wizard'],
    summary: 'Limited free action to ignore up to 2 points of penalties when casting arcane protection, deflection, or dispel.',
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_mastery_wizard',
    name: 'Arcane Mastery (Wizard)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Wizard',
    requiredEdges: ['pf_wizard'],
    summary: 'Gain access to Epic Power Modifiers for Wizard powers.',
    source: 'pathfinder'
  },
  {
    id: 'pf_eldritch_inspiration',
    name: 'Eldritch Inspiration',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Wizard',
    requiredEdges: ['pf_wizard'],
    summary: 'Spend a Benny to cast any power of your Rank or lower (even if not in spellbook) at a -2 penalty.',
    source: 'pathfinder'
  },

  // =========================================================================
  // PRESTIGE EDGES (10 Paths × 3 Tiers = 30 Edges)
  // =========================================================================
  {
    id: 'pf_arcane_archer',
    name: 'Arcane Archer',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB or Mystic Powers, Shooting d8+',
    requiresArcane: true,
    minSkills: { shooting: 8 },
    summary: 'Enhance arrows for +1 Shooting and damage, or imbue arrows with an arcane Trapping.',
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_archer_ii',
    name: 'Arcane Archer II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Arcane Archer',
    requiredEdges: ['pf_arcane_archer'],
    summary: 'Empower an arrow to pass through physical barriers, or split it into a Hail of Arrows covering a Large Blast Template.',
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_archer_iii',
    name: 'Arcane Archer III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Arcane Archer II',
    requiredEdges: ['pf_arcane_archer_ii'],
    summary: 'Imbue an arrow with an area-of-effect power once per turn, or fire Death Arrow once per day (Shaken/Wounded target makes Vigor roll or dies).',
    source: 'pathfinder'
  },

  {
    id: 'pf_arcane_trickster',
    name: 'Arcane Trickster',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB or Mystic Powers, Sneak Attack, Thievery d8+',
    requiresArcane: true,
    minSkills: { thievery: 8 },
    summary: 'Ranged Legerdemain (Thievery at Range 5" at -2) and Impromptu Attack (Sneak Attack once per encounter without Drop or Vulnerable).',
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_trickster_ii',
    name: 'Arcane Trickster II',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Arcane Trickster',
    requiredEdges: ['pf_arcane_trickster'],
    summary: 'Invisible Thief: once per day automatically cast invisibility for 1 PP with an automatic raise (no roll).',
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_trickster_iii',
    name: 'Arcane Trickster III',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Arcane Trickster II',
    requiredEdges: ['pf_arcane_trickster_ii'],
    summary: "Surprise Spells: your damaging spells benefit from Sneak Attack bonus damage.",
    source: 'pathfinder'
  },

  {
    id: 'pf_assassin',
    name: 'Assassin (Pathfinder)',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Sneak Attack',
    summary: 'Death Attack: if attacking with The Drop and causing at least 1 Wound, victim must make a Vigor roll or die.',
    source: 'pathfinder'
  },
  {
    id: 'pf_assassin_ii',
    name: 'Assassin II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Assassin (Pathfinder)',
    requiredEdges: ['pf_assassin'],
    summary: 'Hide in Plain Sight (-4 to be seen while stationary) and Resistance to Poison (+4 to resist poison).',
    source: 'pathfinder'
  },
  {
    id: 'pf_assassin_iii',
    name: 'Assassin III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Assassin II',
    requiredEdges: ['pf_assassin_ii'],
    summary: 'Angel of Death (crumble slain victim to dust, preventing resurrection) and Swift Death (once per day gain The Drop on a chosen foe).',
    source: 'pathfinder'
  },

  {
    id: 'pf_dragon_disciple',
    name: 'Dragon Disciple',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB or Mystic Powers, Occult d6+',
    requiresArcane: true,
    minSkills: { occult: 6 },
    summary: 'Breath Attack: once per encounter unleash a Cone Template breath weapon for 3d6 damage plus draconic Trapping effects.',
    source: 'pathfinder'
  },
  {
    id: 'pf_dragon_disciple_ii',
    name: 'Dragon Disciple II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Dragon Disciple',
    requiredEdges: ['pf_dragon_disciple'],
    summary: 'Wings: grow draconic wings granting Flight at Pace 8.',
    source: 'pathfinder'
  },
  {
    id: 'pf_dragon_disciple_iii',
    name: 'Dragon Disciple III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Dragon Disciple II',
    requiredEdges: ['pf_dragon_disciple_ii'],
    summary: 'Dragon Form: twice per day transform into a dragon matching your bloodline.',
    source: 'pathfinder'
  },

  {
    id: 'pf_duelist',
    name: 'Duelist',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Agility d8+, Fighting d8+',
    minAttributes: { agility: 8 },
    minSkills: { fighting: 8 },
    summary: 'Surgical Strike (+2 damage with light/finesse weapons) and Parry (Defend before acting for +6 Parry).',
    source: 'pathfinder'
  },
  {
    id: 'pf_duelist_ii',
    name: 'Duelist II',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Duelist',
    requiredEdges: ['pf_duelist'],
    summary: "Crippling Strike: reduce foe's Pace by 2 until healed.",
    source: 'pathfinder'
  },
  {
    id: 'pf_duelist_iii',
    name: 'Duelist III',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Duelist II',
    requiredEdges: ['pf_duelist_ii'],
    summary: 'Deflect Arrows: -2 penalty to hit you with physical ranged attacks.',
    source: 'pathfinder'
  },

  {
    id: 'pf_eldritch_knight',
    name: 'Eldritch Knight',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB or Mystic Powers, Fighting d8+',
    requiresArcane: true,
    minSkills: { fighting: 8 },
    summary: 'Eldritch Recharge: regain 1 Power Point whenever you score a raise on an attack or arcane skill roll.',
    source: 'pathfinder'
  },
  {
    id: 'pf_eldritch_knight_ii',
    name: 'Eldritch Knight II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Eldritch Knight',
    requiredEdges: ['pf_eldritch_knight'],
    summary: 'Eldritch Strike: spend 2 PP after making an attack to add +2 to the attack total.',
    source: 'pathfinder'
  },
  {
    id: 'pf_eldritch_knight_iii',
    name: 'Eldritch Knight III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Eldritch Knight II',
    requiredEdges: ['pf_eldritch_knight_ii'],
    summary: "Improved Eldritch Strike: spend 2 PP after a successful attack to increase damage by +2.",
    source: 'pathfinder'
  },

  {
    id: 'pf_loremaster',
    name: 'Loremaster',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Smarts d8+, 2 Knowledge/Arcane skills d8+',
    minAttributes: { smarts: 8 },
    summary: 'Lore: free reroll on Academics, Common Knowledge, Occult, or Science rolls.',
    source: 'pathfinder'
  },
  {
    id: 'pf_loremaster_ii',
    name: 'Loremaster II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Loremaster',
    requiredEdges: ['pf_loremaster'],
    summary: 'Secret: gain an ability from any core Class Edge.',
    source: 'pathfinder'
  },
  {
    id: 'pf_loremaster_iii',
    name: 'Loremaster III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Loremaster II',
    requiredEdges: ['pf_loremaster_ii'],
    summary: 'Greater Lore: gain any 2 new powers available in the campaign.',
    source: 'pathfinder'
  },

  {
    id: 'pf_mystic_theurge',
    name: 'Mystic Theurge',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Two Arcane Backgrounds (e.g., Cleric/Wizard)',
    requiresArcane: true,
    summary: 'Combined Spells: cast two spells at once, rolling an arcane skill for each along with the Wild Die.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_theurge_ii',
    name: 'Mystic Theurge II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Mystic Theurge',
    requiredEdges: ['pf_mystic_theurge'],
    summary: 'Spell Synergy: reduce Power Point cost of each spell when using Combined Spells.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_theurge_iii',
    name: 'Mystic Theurge III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Mystic Theurge II',
    requiredEdges: ['pf_mystic_theurge_ii'],
    summary: 'Spell Synthesis: add +1 to each spell roll total when using Combined Spells.',
    source: 'pathfinder'
  },

  {
    id: 'pf_pathfinder_chronicler',
    name: 'Pathfinder Chronicler',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Survival d6+, Common Knowledge or Occult d8+',
    minSkills: { survival: 6 },
    summary: 'Pathfinding: increase overland travel speed by 10% and possibly avoid random enemy encounters.',
    source: 'pathfinder'
  },
  {
    id: 'pf_pathfinder_chronicler_ii',
    name: 'Pathfinder Chronicler II',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Pathfinder Chronicler',
    requiredEdges: ['pf_pathfinder_chronicler'],
    summary: 'Epic Tales: tell an inspiring tale while resting to grant the party a Benny.',
    source: 'pathfinder'
  },
  {
    id: 'pf_pathfinder_chronicler_iii',
    name: 'Pathfinder Chronicler III',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Pathfinder Chronicler II',
    requiredEdges: ['pf_pathfinder_chronicler_ii'],
    summary: 'Call Down the Legends: summon 5 Shades of ancient heroes for one hour.',
    source: 'pathfinder'
  },

  {
    id: 'pf_shadowdancer',
    name: 'Shadowdancer',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Performance d6+, Stealth d8+, Thievery d6+',
    minSkills: { performance: 6, stealth: 8, thievery: 6 },
    summary: 'Greater Darkvision: see clearly even in pitch black or magical darkness.',
    source: 'pathfinder'
  },
  {
    id: 'pf_shadowdancer_ii',
    name: 'Shadowdancer II',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Shadowdancer',
    requiredEdges: ['pf_shadowdancer'],
    summary: 'Shadow Cloak: free Soak roll at -2 whenever in Dim or Dark illumination.',
    source: 'pathfinder'
  },
  {
    id: 'pf_shadowdancer_iii',
    name: 'Shadowdancer III',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Shadowdancer II',
    requiredEdges: ['pf_shadowdancer_ii'],
    summary: 'Mystic Powers (Shadow Force): 10 dedicated PP to cast blast, illusion, summon ally (shade only), or teleport (self only).',
    source: 'pathfinder'
  },

  // =========================================================================
  // SAVAGE PATHFINDER-SPECIFIC & IMPROVED EDGES
  // =========================================================================
  // Background
  {
    id: 'pf_imp_arcane_resistance',
    name: 'Improved Arcane Resistance',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Arcane Resistance',
    requiredEdges: ['arcane_resistance'],
    summary: 'Enemy arcane abilities suffer -4 penalty against you and magical damage is reduced by 4.',
    source: 'pathfinder'
  },
  {
    id: 'pf_very_attractive',
    name: 'Very Attractive',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Attractive',
    requiredEdges: ['attractive'],
    summary: '+2 to Performance and Persuasion rolls.',
    source: 'pathfinder'
  },
  {
    id: 'pf_famous',
    name: 'Famous',
    category: 'Background',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fame',
    requiredEdges: ['fame'],
    summary: '+2 Persuasion when recognized; 5x or more usual fee for Performance.',
    source: 'pathfinder'
  },

  // Combat
  {
    id: 'pf_imp_counterattack',
    name: 'Improved Counterattack',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Counterattack',
    requiredEdges: ['counterattack'],
    summary: 'Make a free Fighting attack against up to three failed melee attacks against you per turn.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_extraction',
    name: 'Improved Extraction',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Extraction',
    requiredEdges: ['extraction'],
    summary: 'Up to three adjacent foes do not get free attacks when you withdraw from close combat.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_first_strike',
    name: 'Improved First Strike',
    category: 'Combat',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, First Strike',
    requiredEdges: ['first_strike'],
    summary: 'Free Fighting attack against up to three foes per round when they move within Reach.',
    source: 'pathfinder'
  },
  {
    id: 'pf_formation_fighter',
    name: 'Formation Fighter',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Fighting d8+',
    minSkills: { fighting: 8 },
    summary: 'Increase Gang Up bonus by +1 when fighting alongside allies (max +4).',
    source: 'pathfinder'
  },
  {
    id: 'pf_free_runner',
    name: 'Free Runner',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Ignore Difficult Ground penalties on foot and add +2 to Athletics (climbing) rolls.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_frenzy',
    name: 'Improved Frenzy',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Frenzy',
    requiredEdges: ['frenzy'],
    summary: 'Roll a second Fighting die with up to two melee attacks per turn.',
    source: 'pathfinder'
  },
  {
    id: 'pf_giant_killer',
    name: 'Giant Killer',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran',
    summary: '+1d6 damage when attacking creatures three Sizes larger than you or more.',
    source: 'pathfinder'
  },
  {
    id: 'pf_harder_to_kill',
    name: 'Harder to Kill',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Hard to Kill',
    requiredEdges: ['hard_to_kill'],
    summary: 'Roll a die if the hero perishes; even if Incapacitated, they survive somehow on a favorable result.',
    source: 'pathfinder'
  },
  {
    id: 'pf_improvisational_fighter',
    name: 'Improvisational Fighter',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Smarts d6+',
    minAttributes: { smarts: 6 },
    summary: 'Ignore the -2 penalty when attacking with improvised weapons.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_level_headed',
    name: 'Improved Level Headed',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Level Headed',
    requiredEdges: ['level_headed'],
    summary: 'Draw two additional Action Cards each round in combat and choose which to use.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_nerves_of_steel',
    name: 'Improved Nerves of Steel',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Nerves of Steel',
    requiredEdges: ['nerves_of_steel'],
    summary: 'Ignore up to two levels of Wound penalties.',
    source: 'pathfinder'
  },
  {
    id: 'pf_rapid_reload',
    name: 'Rapid Reload',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Shooting d6+',
    minSkills: { shooting: 6 },
    summary: 'Reduce the Reload value of a ranged weapon by 1.',
    source: 'pathfinder'
  },
  {
    id: 'pf_rapid_shot',
    name: 'Rapid Shot',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Shooting d6+',
    minSkills: { shooting: 6 },
    summary: 'Increase Rate of Fire by 1 for one Shooting attack per turn (bow or crossbow).',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_rapid_shot',
    name: 'Improved Rapid Shot',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Rapid Shot',
    requiredEdges: ['pf_rapid_shot'],
    summary: 'Increase Rate of Fire by 1 for up to two Shooting attacks per turn.',
    source: 'pathfinder'
  },
  {
    id: 'pf_steady_hands',
    name: 'Steady Hands',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Ignore Unstable Platform penalties and reduce running attack penalty to -1.',
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_sweep',
    name: 'Improved Sweep',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Sweep',
    requiredEdges: ['sweep'],
    summary: "Strike all targets in a two-handed weapon's Reach without the -2 Sweep penalty.",
    source: 'pathfinder'
  },
  {
    id: 'pf_imp_trademark_weapon',
    name: 'Improved Trademark Weapon',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Trademark Weapon',
    requiredEdges: ['trademark_weapon'],
    parryBonus: 1,
    summary: 'Increases Trademark Weapon attack and Parry bonus to +2 total while readied.',
    source: 'pathfinder'
  },
  {
    id: 'pf_two_weapon_fighting',
    name: 'Two-Weapon Fighting',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Make one extra Fighting or Athletics (throwing) roll with a second weapon in your off-hand at no Multi-Action penalty.',
    source: 'pathfinder'
  },

  // Leadership
  {
    id: 'pf_command_presence',
    name: 'Command Presence',
    category: 'Leadership',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Command',
    requiredEdges: ['command'],
    summary: 'Increase Command Range from 5" to 10" (20 yards).',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_tactician',
    name: 'Master Tactician',
    category: 'Leadership',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Tactician',
    requiredEdges: ['tactician'],
    summary: 'Draw and distribute two extra Action Cards each round to allied Extras in Command Range.',
    source: 'pathfinder'
  },

  // Power
  {
    id: 'pf_arcane_armor',
    name: 'Arcane Armor',
    category: 'Power',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Arcane Interference',
    requiresArcane: true,
    summary: 'Improve your Armor Interference category by one step (e.g., Any to Light, or Light to Medium).',
    source: 'pathfinder'
  },
  {
    id: 'pf_concentration',
    name: 'Concentration',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB or Mystic Powers',
    requiresArcane: true,
    summary: 'Double the base Duration of non-Instant powers.',
    source: 'pathfinder'
  },
  {
    id: 'pf_holy_unholy_warrior',
    name: 'Holy/Unholy Warrior',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB or Mystic Powers, Vow',
    requiresArcane: true,
    summary: 'Spend 1 to 4 Power Points to add +1 to +4 to a Soak roll.',
    source: 'pathfinder'
  },

  // Professional
  {
    id: 'pf_combat_acrobat',
    name: 'Combat Acrobat',
    category: 'Professional',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Acrobat',
    requiredEdges: ['acrobat'],
    summary: 'Attackers suffer -1 to hit you with both ranged and melee attacks.',
    source: 'pathfinder'
  },
  {
    id: 'pf_born_in_the_saddle',
    name: 'Born in the Saddle',
    category: 'Professional',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d8+, Riding d6+',
    minAttributes: { agility: 8 },
    minSkills: { riding: 6 },
    summary: "Free reroll on all Riding rolls; increase your mount's Pace by +2 and its running die one step.",
    source: 'pathfinder'
  },
  {
    id: 'pf_troubadour',
    name: 'Troubadour',
    category: 'Professional',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Common Knowledge d6+, Performance d8+',
    minSkills: { common_knowledge: 6, performance: 8 },
    summary: '+2 to Common Knowledge rolls; may use Performance in place of Battle for Leadership Edges.',
    source: 'pathfinder'
  },

  // Social
  {
    id: 'pf_retort',
    name: 'Retort',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Taunt d6+',
    minSkills: { taunt: 6 },
    summary: 'A raise when resisting a Taunt or Intimidation attack makes the foe Distracted.',
    source: 'pathfinder'
  },
  {
    id: 'pf_iron_will',
    name: 'Iron Will',
    category: 'Social',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Brave, Strong Willed',
    requiredEdges: ['brave', 'strong_willed'],
    summary: 'Strong Willed +2 bonus also applies to resisting and recovering from supernatural powers.',
    source: 'pathfinder'
  },
  {
    id: 'pf_work_the_room',
    name: 'Work the Room',
    category: 'Social',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d8+',
    minAttributes: { spirit: 8 },
    summary: 'Once per turn, roll a second die when Supporting via Performance or Persuasion and apply it to an extra ally.',
    source: 'pathfinder'
  },
  {
    id: 'pf_work_the_crowd',
    name: 'Work the Crowd',
    category: 'Social',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Work the Room',
    requiredEdges: ['pf_work_the_room'],
    summary: 'As Work the Room, up to twice per turn.',
    source: 'pathfinder'
  },

  // Legendary
  {
    id: 'pf_expert',
    name: 'Expert',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Professional in affected Trait',
    requiredEdges: ['professional'],
    summary: "Increases chosen Professional Trait and its limit by one additional step.",
    source: 'pathfinder'
  },
  {
    id: 'pf_master',
    name: 'Master',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, Expert in affected Trait',
    requiresWildCard: true,
    requiredEdges: ['pf_expert'],
    summary: 'Your Wild Die increases to a d10 when rolling the chosen Expert Trait.',
    source: 'pathfinder'
  },
  {
    id: 'pf_tougher_than_nails',
    name: 'Tougher than Nails',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Tough as Nails, Vigor d12+',
    minAttributes: { vigor: 12 },
    requiredEdges: ['tough_as_nails'],
    summary: 'Hero can take up to five Wounds before being Incapacitated (max Wound penalty remains -3).',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_of_arms',
    name: 'Master of Arms',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Legendary, Weapon Master',
    requiredEdges: ['weapon_master'],
    parryBonus: 1,
    summary: 'Increase Parry by an additional +1 and Fighting bonus damage die becomes d10.',
    source: 'pathfinder'
  }
];

export const PF_ARCANE_BACKGROUNDS: ArcaneBackgroundDef[] = [
  {
    id: 'pf_bard',
    name: 'Arcane Background (Bard)',
    arcaneSkillId: 'performance',
    arcaneSkillName: 'Performance (Spirit)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Bards weave arcane song and lore using Performance (Spirit). Armor Interference (Light).',
    source: 'pathfinder'
  },
  {
    id: 'pf_cleric',
    name: 'Arcane Background (Cleric)',
    arcaneSkillId: 'faith',
    arcaneSkillName: 'Faith (Spirit)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Clerics start with healing + 2 Cleric/Domain powers using Faith (Spirit), plus Channel Energy.',
    source: 'pathfinder'
  },
  {
    id: 'pf_druid',
    name: 'Arcane Background (Druid)',
    arcaneSkillId: 'faith',
    arcaneSkillName: 'Faith (Spirit)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Druids draw primal spells from the Cleric & Nature Domain lists using Faith (Spirit). Armor Interference (Light/Metal).',
    source: 'pathfinder'
  },
  {
    id: 'pf_sorcerer',
    name: 'Arcane Background (Sorcerer)',
    arcaneSkillId: 'spellcasting',
    arcaneSkillName: 'Spellcasting (Spirit)',
    startingPowers: 2,
    startingPowerPoints: 15,
    summary: 'Inborn magic linked to Spirit instead of Smarts; gains a Sorcerer Bloodline. Armor Interference (Any).',
    source: 'pathfinder'
  },
  {
    id: 'pf_wizard',
    name: 'Arcane Background (Wizard)',
    arcaneSkillId: 'spellcasting',
    arcaneSkillName: 'Spellcasting (Smarts)',
    startingPowers: 3,
    startingPowerPoints: 10,
    summary: 'Scholarly arcane casters with Spellbooks, Arcane Bond, and optional School Specialization. Armor Interference (Any).',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_monk',
    name: 'Mystic Powers (Monk)',
    arcaneSkillId: 'focus',
    arcaneSkillName: 'Automatic / Self (Monk Ki)',
    startingPowers: 4,
    startingPowerPoints: 10,
    summary: 'Dedicated 10 PP to cast self-only boost Trait (Agi, Ath, Fight, Stealth), deflection, smite, and speed.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_paladin',
    name: 'Mystic Powers (Paladin)',
    arcaneSkillId: 'faith',
    arcaneSkillName: 'Automatic / Self (Paladin)',
    startingPowers: 4,
    startingPowerPoints: 10,
    summary: 'Dedicated 10 PP to cast boost Trait (Fight, Str, Vig — self), healing, relief, and smite (self).',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_ranger',
    name: 'Mystic Powers (Ranger)',
    arcaneSkillId: 'faith',
    arcaneSkillName: 'Automatic / Self (Ranger)',
    startingPowers: 4,
    startingPowerPoints: 10,
    summary: "Dedicated 10 PP to cast beast friend, boost Trait (Ath, Fight, Shoot — self), entangle, and warrior's gift (self).",
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_shadowdancer',
    name: 'Mystic Powers (Shadow Force)',
    arcaneSkillId: 'focus',
    arcaneSkillName: 'Automatic / Shadow Force',
    startingPowers: 4,
    startingPowerPoints: 10,
    summary: 'Dedicated 10 PP for Shadowdancer III to cast blast, illusion, summon ally (shade), and teleport (self).',
    source: 'pathfinder'
  }
];

export const PF_POWERS: PowerDef[] = [
  { id: 'pf_conjure_item', name: 'Conjure Item', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: '1 hour', summary: 'Conjures a non-magical object weighing up to 1 lb per 2 Power Points.', source: 'pathfinder' },
  { id: 'pf_curse', name: 'Curse', rankRequired: 'Seasoned', powerPoints: '5', range: 'Touch', duration: 'Special', summary: 'Inflicts a lasting supernatural curse on an opponent.', source: 'pathfinder' },
  { id: 'pf_divination', name: 'Divination', rankRequired: 'Seasoned', powerPoints: '5', range: 'Self', duration: '5 mins', summary: 'Caster communes with spirits or higher powers to ask questions.', source: 'pathfinder' },
  { id: 'pf_drain_power_points', name: 'Drain Power Points', rankRequired: 'Veteran', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Opposed arcane skill roll to drain d6 Power Points from an enemy caster.', source: 'pathfinder' },
  { id: 'pf_locate', name: 'Locate', rankRequired: 'Novice', powerPoints: '3', range: 'Self', duration: '10 mins', summary: 'Senses the direction and distance to a specific object or creature.', source: 'pathfinder' },
  { id: 'pf_mind_wipe', name: 'Mind Wipe', rankRequired: 'Veteran', powerPoints: '3', range: 'Smarts', duration: 'Instant', summary: 'Removes or alters a target’s memories.', source: 'pathfinder' },
  { id: 'pf_object_reading', name: 'Object Reading', rankRequired: 'Seasoned', powerPoints: '2', range: 'Touch', duration: 'Special', summary: 'Reveals impressions of an object’s past owners and history (more detail with a raise).', source: 'pathfinder' },
  { id: 'pf_planar_binding', name: 'Planar Binding', rankRequired: 'Veteran', powerPoints: '8', range: 'Smarts', duration: 'Instant', summary: 'Summons and binds an outsider or extraplanar creature to perform a service.', source: 'pathfinder' },
  { id: 'pf_plane_shift', name: 'Plane Shift', rankRequired: 'Veteran', powerPoints: '5', range: 'Smarts', duration: '5', summary: 'Transports the caster and allies to another plane of existence.', source: 'pathfinder' },
  { id: 'pf_protection', name: 'Protection', rankRequired: 'Novice', powerPoints: '2', range: 'Smarts', duration: '5', summary: 'Grants +2 Armor on a success, or +2 Toughness on a raise (stacks with worn armor).', source: 'pathfinder' },
  { id: 'pf_sanctuary', name: 'Sanctuary', rankRequired: 'Novice', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Foes must succeed on a Spirit roll to attack the protected target.', source: 'pathfinder' },
  { id: 'pf_scrying', name: 'Scrying', rankRequired: 'Seasoned', powerPoints: '3', range: 'Self', duration: '5', summary: 'Caster sees and hears a distant target and its immediate surroundings remotely.', source: 'pathfinder' },
  { id: 'pf_shape_change', name: 'Shape Change', rankRequired: 'Novice', powerPoints: 'Special', range: 'Self', duration: '5', summary: 'Caster transforms into an animal or creature based on Rank and PP spent.', source: 'pathfinder' },
  { id: 'pf_time_stop', name: 'Time Stop', rankRequired: 'Heroic', powerPoints: '8', range: 'Smarts', duration: 'Instant', summary: 'Briefly halts time so the caster takes an additional turn (4 actions with a raise).', source: 'pathfinder' },
  { id: 'pf_wish', name: 'Wish', rankRequired: 'Legendary', powerPoints: '20', range: 'Smarts', duration: 'Instant', summary: 'Alters reality to grant an edge, raise a trait, restore fate, gain wealth, or rewind time.', source: 'pathfinder' }
];

export const PF_WEAPONS_CATALOG: Omit<WeaponItem, 'id' | 'equipped'>[] = [
  // Melee Weapons (pp. 111)
  { name: 'Axe, Hand (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: '3/6/12', rof: 1, minStr: 6, weight: 3, cost: 6, notes: 'Can be thrown', source: 'pathfinder' },
  { name: 'Axe, Battle (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 6, cost: 10, source: 'pathfinder' },
  { name: 'Axe, Great (PF)', category: 'Melee', damage: 'Str+d10', ap: 3, range: 'Melee', rof: 1, minStr: 10, parryMod: -1, weight: 12, cost: 20, notes: 'AP 3, Parry -1, Two Hands', source: 'pathfinder' },
  { name: 'Club, Light (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 2, cost: 1, source: 'pathfinder' },
  { name: 'Club, Heavy (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 5, cost: 2, source: 'pathfinder' },
  { name: 'Dagger / Knife (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 2, notes: 'Can be thrown', source: 'pathfinder' },
  { name: 'Flail (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 5, cost: 8, notes: 'Ignores shield bonus', source: 'pathfinder' },
  { name: 'Flail, Heavy (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 10, cost: 15, notes: 'Ignores shield bonus, Two Hands', source: 'pathfinder' },
  { name: 'Falchion (PF)', category: 'Melee', damage: 'Str+d8', ap: 1, range: 'Melee', rof: 1, minStr: 8, weight: 8, cost: 75, notes: 'AP 1, +1 damage if used Two Hands', source: 'pathfinder' },
  { name: 'Glaive (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 10, cost: 8, notes: 'Reach 1, Two Hands', source: 'pathfinder' },
  { name: 'Guisarme (PF)', category: 'Melee', damage: 'Str+d6', ap: 1, range: 'Melee', rof: 1, minStr: 6, weight: 12, cost: 9, notes: 'AP 1, Reach 1, Two Hands', source: 'pathfinder' },
  { name: 'Halberd (PF)', category: 'Melee', damage: 'Str+d8', ap: 1, range: 'Melee', rof: 1, minStr: 8, weight: 12, cost: 10, notes: 'AP 1, Reach 1, Two Hands', source: 'pathfinder' },
  { name: 'Katana (PF)', category: 'Melee', damage: 'Str+d6+1', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 3, cost: 50, notes: 'Two Hands', source: 'pathfinder' },
  { name: 'Lance (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 10, cost: 10, notes: 'AP 2 when charging, Reach 2, mounted only', source: 'pathfinder' },
  { name: 'Mace, Light (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 4, cost: 5, source: 'pathfinder' },
  { name: 'Mace, Heavy (PF)', category: 'Melee', damage: 'Str+d8', ap: 1, range: 'Melee', rof: 1, minStr: 8, weight: 8, cost: 12, notes: 'AP 1', source: 'pathfinder' },
  { name: 'Morningstar (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 6, cost: 8, source: 'pathfinder' },
  { name: 'Maul (PF)', category: 'Melee', damage: 'Str+d10', ap: 2, range: 'Melee', rof: 1, minStr: 10, weight: 10, cost: 12, notes: 'AP 2, Two Hands, +2 damage to break objects', source: 'pathfinder' },
  { name: 'Pike (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 18, cost: 20, notes: 'AP 1 when set, Reach 2, Two Hands', source: 'pathfinder' },
  { name: 'Rapier (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: 1, weight: 2, cost: 20, notes: 'Parry +1', source: 'pathfinder' },
  { name: 'Ranseur (PF)', category: 'Melee', damage: 'Str+d6', ap: 1, range: 'Melee', rof: 1, minStr: 6, weight: 12, cost: 10, notes: 'AP 1, Reach 1', source: 'pathfinder' },
  { name: 'Sap (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 1, cost: 2, notes: 'Nonlethal damage', source: 'pathfinder' },
  { name: 'Scimitar (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 4, cost: 15, source: 'pathfinder' },
  { name: 'Scythe (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 10, cost: 18, notes: 'Two Hands', source: 'pathfinder' },
  { name: 'Sickle (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 2, cost: 3, source: 'pathfinder' },
  { name: 'Spear, Short (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: '4/8/16', rof: 1, minStr: 6, weight: 3, cost: 1, notes: 'One-handed, can be thrown', source: 'pathfinder' },
  { name: 'Spear (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: '3/6/12', rof: 1, minStr: 6, parryMod: 1, weight: 6, cost: 2, notes: 'Reach 1, Parry +1 if used Two Hands', source: 'pathfinder' },
  { name: 'Spiked Chain (PF)', category: 'Melee', damage: 'Str+d6', ap: 1, range: 'Melee', rof: 1, minStr: 6, weight: 6, cost: 8, notes: 'AP 1, ignores shield bonus, Two Hands', source: 'pathfinder' },
  { name: 'Staff / Quarterstaff (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: 1, weight: 4, cost: 0, notes: 'Parry +1, Reach 1, Two Hands', source: 'pathfinder' },
  { name: 'Starknife (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, parryMod: 1, weight: 3, cost: 28, notes: 'Parry +1, can be thrown', source: 'pathfinder' },
  { name: 'Sword, Bastard (PF)', category: 'Melee', damage: 'Str+d8', ap: 1, range: 'Melee', rof: 1, minStr: 8, weight: 6, cost: 35, notes: 'AP 1, +1 damage if used Two Hands', source: 'pathfinder' },
  { name: 'Sword, Great (PF)', category: 'Melee', damage: 'Str+d10', ap: 2, range: 'Melee', rof: 1, minStr: 10, weight: 8, cost: 50, notes: 'AP 2, Two Hands', source: 'pathfinder' },
  { name: 'Sword, Long (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 4, cost: 15, source: 'pathfinder' },
  { name: 'Sword, Short (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 2, cost: 10, source: 'pathfinder' },
  { name: 'Trident (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: '3/6/12', rof: 1, minStr: 6, weight: 4, cost: 15, notes: 'Reach 1, can be thrown', source: 'pathfinder' },
  { name: 'Warhammer (PF)', category: 'Melee', damage: 'Str+d6', ap: 1, range: 'Melee', rof: 1, minStr: 6, weight: 5, cost: 12, notes: 'AP 1', source: 'pathfinder' },
  { name: 'Whip (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: -1, weight: 2, cost: 5, notes: 'Parry -1, Reach 2, Entangles on raise instead of bonus damage', source: 'pathfinder' },

  // Ranged & Thrown Weapons (p. 110)
  { name: 'Bolas (PF)', category: 'Thrown', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 2, cost: 5, notes: 'Entangles on raise (Hardness 8)', source: 'pathfinder' },
  { name: 'Blowgun (PF)', category: 'Ranged', damage: 'd4-2', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 2, source: 'pathfinder' },
  { name: 'Bow, Short (PF)', category: 'Ranged', damage: '2d6', ap: 0, range: '12/24/48', rof: 1, minStr: 6, weight: 2, cost: 30, source: 'pathfinder' },
  { name: 'Bow, Long (PF)', category: 'Ranged', damage: '2d6', ap: 1, range: '15/30/60', rof: 1, minStr: 8, weight: 3, cost: 75, notes: 'AP 1', source: 'pathfinder' },
  { name: 'Bow, Composite (PF)', category: 'Ranged', damage: 'Str+d6', ap: 1, range: '12/24/48', rof: 1, minStr: 6, weight: 3, cost: 100, notes: 'AP 1', source: 'pathfinder' },
  { name: 'Crossbow, Hand (PF)', category: 'Ranged', damage: '2d4', ap: 0, range: '5/10/20', rof: 1, minStr: 4, weight: 2, cost: 20, notes: 'Reload 1, one-handed', source: 'pathfinder' },
  { name: 'Crossbow, Hand Repeating (PF)', category: 'Ranged', damage: '2d4', ap: 0, range: '5/10/20', rof: 1, minStr: 4, weight: 3, cost: 160, notes: 'Reload 1 for 5-bolt case or 1 bolt', source: 'pathfinder' },
  { name: 'Crossbow, Light (PF)', category: 'Ranged', damage: '2d6', ap: 2, range: '10/20/40', rof: 1, minStr: 6, weight: 5, cost: 35, notes: 'AP 2, Reload 1, hand-drawn', source: 'pathfinder' },
  { name: 'Crossbow, Light Repeating (PF)', category: 'Ranged', damage: '2d6', ap: 2, range: '10/20/40', rof: 1, minStr: 6, weight: 8, cost: 250, notes: 'AP 2, Reload 1 for 5-bolt case', source: 'pathfinder' },
  { name: 'Crossbow, Heavy (PF)', category: 'Ranged', damage: '2d8', ap: 2, range: '15/30/60', rof: 1, minStr: 6, weight: 8, cost: 50, notes: 'AP 2, Reload 2 (windlass)', source: 'pathfinder' },
  { name: 'Crossbow, Heavy Repeating (PF)', category: 'Ranged', damage: '2d8', ap: 2, range: '15/30/60', rof: 1, minStr: 8, weight: 12, cost: 400, notes: 'AP 2, Reload 2 for 5-bolt case', source: 'pathfinder' },
  { name: 'Net, Weighted (PF)', category: 'Thrown', damage: '0', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 8, cost: 20, notes: 'Hit Entangles target (Hardness 10)', source: 'pathfinder' },
  { name: 'Shuriken (PF)', category: 'Thrown', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 0.1, cost: 1, source: 'pathfinder' },
  { name: 'Sling (PF)', category: 'Thrown', damage: 'Str+d4', ap: 0, range: '4/8/16', rof: 1, minStr: 4, weight: 1, cost: 0, notes: 'Uses Athletics (throwing)', source: 'pathfinder' },

  // Alchemical Weapons (p. 113)
  { name: 'Acid Flask (PF)', category: 'Thrown', damage: '2d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 10, notes: 'SBT; 2d4 hit + 2d4-2 next turn unless washed off', source: 'pathfinder' },
  { name: "Alchemist's Fire (PF)", category: 'Thrown', damage: '2d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 20, notes: 'SBT, Heavy Weapon; 2d4 + 2d4-2 next turn, may catch fire', source: 'pathfinder' },
  { name: 'Holy Water (PF)', category: 'Thrown', damage: '2d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 25, notes: 'SBT vs Undead & Evil creatures (2d4 + 2d4-2 next turn)', source: 'pathfinder' },
  { name: 'Smokestick (PF)', category: 'Special', damage: '0', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 0.1, cost: 20, notes: 'MBT thick smoke (Dark illumination) for 1 min', source: 'pathfinder' },
  { name: 'Tanglefoot Bag (PF)', category: 'Thrown', damage: '0', ap: 0, range: '1/2/4', rof: 1, minStr: 4, weight: 4, cost: 50, notes: 'Size <=3 target Distracted 5 rds + Athletics or Entangled', source: 'pathfinder' },
  { name: 'Thunderstone (PF)', category: 'Thrown', damage: '0', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 30, notes: 'MBT; Vigor roll or Shaken & deafened 1 hour', source: 'pathfinder' }
];

export const PF_ARMOR_CATALOG: Omit<ArmorItem, 'id' | 'equipped'>[] = [
  // Light
  { name: 'Leather / Studded Leather Tunic (PF)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 11, cost: 20, notes: 'Light; covers torso & arms', source: 'pathfinder' },
  { name: 'Leather / Studded Leather Leggings (PF)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 8, cost: 20, notes: 'Light; covers legs', source: 'pathfinder' },
  { name: 'Leather Cap (PF)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 1, cost: 10, notes: 'Light; covers head', source: 'pathfinder' },
  // Medium
  { name: 'Chain / Scale Shirt (PF)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 22, cost: 100, notes: 'Medium; covers torso & arms', source: 'pathfinder' },
  { name: 'Chain / Scale Leggings (PF)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 10, cost: 100, notes: 'Medium; covers legs', source: 'pathfinder' },
  { name: 'Chain Hood / Helm (PF)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 3, cost: 50, notes: 'Medium; covers head', source: 'pathfinder' },
  // Heavy
  { name: 'Plate Breastplate (PF)', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 10, weight: 30, cost: 500, notes: 'Heavy; covers torso', source: 'pathfinder' },
  { name: 'Plate Vambraces (PF)', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 10, weight: 10, cost: 250, notes: 'Heavy; covers arms', source: 'pathfinder' },
  { name: 'Plate Greaves (PF)', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 10, weight: 10, cost: 500, notes: 'Heavy; covers legs', source: 'pathfinder' },
  { name: 'Heavy Plate Helm (PF)', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 10, weight: 4, cost: 250, notes: 'Heavy; covers head', source: 'pathfinder' },
  { name: 'Heavy Plate Helm, Enclosed (PF)', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 10, weight: 8, cost: 300, notes: 'Heavy; covers head, -1 vision Notice', source: 'pathfinder' },
  // Barding
  { name: 'Leather Barding (Horse Armor)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 8, weight: 50, cost: 300, notes: 'Horse armor', source: 'pathfinder' },
  { name: 'Chain Barding (Horse Armor)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 10, weight: 110, cost: 500, notes: 'Horse armor', source: 'pathfinder' },
  { name: 'Plate Barding (Horse Armor)', type: 'Armor', armorBonus: 4, parryBonus: 0, minStr: 12, weight: 130, cost: 5000, notes: 'Horse armor', source: 'pathfinder' },
  // Shields
  { name: 'Light Shield (PF)', type: 'Shield', armorBonus: 0, parryBonus: 1, coverBonus: 0, minStr: 6, weight: 4, cost: 5, notes: 'Parry +1; protects vs half attackers on same Action Card', source: 'pathfinder' },
  { name: 'Medium Shield (PF)', type: 'Shield', armorBonus: 0, parryBonus: 2, coverBonus: 2, minStr: 8, weight: 8, cost: 9, notes: 'Parry +2, Cover -2', source: 'pathfinder' },
  { name: 'Heavy Shield (PF)', type: 'Shield', armorBonus: 0, parryBonus: 2, coverBonus: 4, minStr: 10, weight: 12, cost: 20, notes: 'Parry +2, Cover -4, -1 Pace', source: 'pathfinder' }
];

export const PF_GEAR_CATALOG: Omit<GearItem, 'id'>[] = [
  { name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, notes: 'Backpack, bedroll, candle, chalk, clothing, flint & steel, grappling hook, bullseye lantern, mirror, rope, oil, shovel, soap, 3 torches, waterskin, whetstone, 1 wk meals', source: 'pathfinder' },
  { name: 'Backpack (Empty)', quantity: 1, weight: 2, cost: 2, notes: 'Halves effective weight of contents', source: 'pathfinder' },
  { name: "Climber's Kit", quantity: 1, weight: 10, cost: 80, notes: 'Ignore up to 2 points of climbing penalties', source: 'pathfinder' },
  { name: 'Disguise Kit', quantity: 1, weight: 8, cost: 50, notes: 'Free reroll on Performance rolls while disguised', source: 'pathfinder' },
  { name: "Healer's Kit", quantity: 1, weight: 1, cost: 50, notes: '-1 Healing without it', source: 'pathfinder' },
  { name: "Thieves' Tools", quantity: 1, weight: 1, cost: 30, notes: '-2 Thievery without them', source: 'pathfinder' },
  { name: 'Spell Component Pouch', quantity: 1, weight: 2, cost: 5, source: 'pathfinder' },
  { name: 'Spellbook, Wizard (Blank)', quantity: 1, weight: 3, cost: 15, source: 'pathfinder' },
  { name: 'Holy Symbol, Silver', quantity: 1, weight: 1, cost: 25, source: 'pathfinder' },
  { name: 'Musical Instrument', quantity: 1, weight: 3, cost: 5, source: 'pathfinder' },
  { name: 'Antitoxin Vial', quantity: 1, weight: 0.5, cost: 110, notes: '+4 bonus to resist poison for 1 hour', source: 'pathfinder' },
  { name: 'Everburning Torch', quantity: 1, weight: 1, cost: 50, notes: 'Permanently enchanted light, emits no heat', source: 'pathfinder' },
  { name: 'Sunrod', quantity: 1, weight: 1, cost: 2, notes: 'Normal light in 30 ft radius for 6 hrs, counts as sunlight', source: 'pathfinder' },
  { name: 'Tindertwig', quantity: 1, weight: 0.1, cost: 1, notes: 'Lights torches/flammables in a single action', source: 'pathfinder' },
  { name: 'Caltrops (1 Batch)', quantity: 1, weight: 2, cost: 1, notes: 'Covers SBT; Difficult Ground, Athletics or Shaken', source: 'pathfinder' },
  { name: 'Grappling Hook', quantity: 1, weight: 4, cost: 2, source: 'pathfinder' },
  { name: 'Rope, Silk (20 yds)', quantity: 1, weight: 5, cost: 10, source: 'pathfinder' },
  { name: 'Lantern, Bullseye (10" cone)', quantity: 1, weight: 3, cost: 12, source: 'pathfinder' },
  { name: 'Lantern, Hooded (6" radius)', quantity: 1, weight: 2, cost: 7, source: 'pathfinder' },
  { name: 'Spyglass', quantity: 1, weight: 1, cost: 1000, notes: 'Notice +2 at range', source: 'pathfinder' },
  { name: 'Manacles', quantity: 1, weight: 2, cost: 15, source: 'pathfinder' },
  { name: 'Armor Spikes', quantity: 1, weight: 10, cost: 50, notes: '+1 damage when Crushing while Grappling', source: 'pathfinder' },
  { name: 'Shield Spikes', quantity: 1, weight: 5, cost: 20, notes: '+1 damage when bashing with shield', source: 'pathfinder' },
  { name: 'Gauntlet, Locked', quantity: 1, weight: 5, cost: 8, notes: '+1 Strength vs Disarm', source: 'pathfinder' }
];

// ============================================================================
// REFERENCE TABLES (DEITIES, DOMAINS, BLOODLINES, SPECIAL MATERIALS, MAGIC ITEMS)
// ============================================================================

export interface PfDeityDef {
  name: string;
  alignment: 'Good' | 'Neutral' | 'Evil';
  concerns: string;
  domains: string[];
}

export const PF_DEITIES: PfDeityDef[] = [
  { name: 'Abadar', alignment: 'Neutral', concerns: 'Cities, law, merchants, wealth', domains: ['Earth', 'Nobility', 'Protection', 'Travel'] },
  { name: 'Asmodeus', alignment: 'Evil', concerns: 'Contracts, pride, slavery, tyranny', domains: ['Evil', 'Fire', 'Magic', 'Trickery'] },
  { name: 'Calistria', alignment: 'Neutral', concerns: 'Lust, revenge, trickery', domains: ['Knowledge', 'Luck', 'Trickery'] },
  { name: 'Cayden Cailean', alignment: 'Good', concerns: 'Ale, bravery, freedom, wine', domains: ['Good', 'Strength', 'Travel'] },
  { name: 'Desna', alignment: 'Good', concerns: 'Dreams, luck, stars, travelers', domains: ['Good', 'Luck', 'Travel'] },
  { name: 'Erastil', alignment: 'Good', concerns: 'Family, farming, hunting, trade', domains: ['Animal', 'Community', 'Good', 'Plant'] },
  { name: 'Gorum', alignment: 'Neutral', concerns: 'Battle, strength, weapons', domains: ['Destruction', 'Glory', 'Strength', 'War'] },
  { name: 'Gozreh', alignment: 'Neutral', concerns: 'Nature, the sea, weather', domains: ['Air', 'Animal', 'Plant', 'Water', 'Weather'] },
  { name: 'Iomedae', alignment: 'Good', concerns: 'Honor, justice, rulership, valor', domains: ['Glory', 'Good', 'Sun', 'War'] },
  { name: 'Irori', alignment: 'Neutral', concerns: 'History, knowledge, self-perfection', domains: ['Healing', 'Knowledge', 'Rune', 'Strength'] },
  { name: 'Lamashtu', alignment: 'Evil', concerns: 'Madness, monsters, nightmares', domains: ['Evil', 'Madness', 'Strength', 'Trickery'] },
  { name: 'Nethys', alignment: 'Neutral', concerns: 'Magic', domains: ['Destruction', 'Knowledge', 'Magic', 'Protection', 'Rune'] },
  { name: 'Norgorber', alignment: 'Evil', concerns: 'Greed, murder, poison, secrets', domains: ['Death', 'Evil', 'Knowledge', 'Trickery'] },
  { name: 'Pharasma', alignment: 'Neutral', concerns: 'Birth, death, fate, prophecy', domains: ['Death', 'Healing', 'Knowledge', 'Water'] },
  { name: 'Rovagug', alignment: 'Evil', concerns: 'Destruction, disaster, wrath', domains: ['Destruction', 'Evil', 'War', 'Weather'] },
  { name: 'Sarenrae', alignment: 'Good', concerns: 'Healing, honesty, redemption, sun', domains: ['Fire', 'Glory', 'Good', 'Healing', 'Sun'] },
  { name: 'Shelyn', alignment: 'Good', concerns: 'Art, beauty, love, music', domains: ['Air', 'Good', 'Luck', 'Protection'] },
  { name: 'Torag', alignment: 'Good', concerns: 'The forge, protection, strategy', domains: ['Earth', 'Good', 'Protection'] },
  { name: 'Urgathoa', alignment: 'Evil', concerns: 'Disease, gluttony, undeath', domains: ['Death', 'Evil', 'Magic', 'Strength', 'War'] },
  { name: 'Zon-Kuthon', alignment: 'Evil', concerns: 'Darkness, envy, loss, pain', domains: ['Death', 'Destruction', 'Evil'] }
];

export interface PfDomainDef {
  name: string;
  aspects: string;
  deities: string;
  powers: string[];
}

export const PF_DOMAINS: PfDomainDef[] = [
  { name: 'Civilization (Community, Nobility)', aspects: 'Cities, towns, legacy, lineage', deities: 'Abadar, Erastil', powers: ['Barrier', 'Disguise', 'Environmental Protection', 'Locate', 'Mind Link', 'Protection', 'Puppet', 'Speak Language', 'Summon Ally', "Warrior's Gift"] },
  { name: 'Death', aspects: 'Birth, fate, prophecy, repose', deities: 'Norgorber, Pharasma, Urgathoa, Zon-Kuthon', powers: ['Blind', 'Bolt', 'Curse', 'Damage Field', 'Drain Power Points', 'Fear', 'Mind Wipe', 'Planar Binding', 'Protection', 'Zombie'] },
  { name: 'Destruction (Evil, Madness)', aspects: 'Destruction, hate, madness, violence', deities: 'Asmodeus, Gorum, Lamashtu, Nethys, Norgorber, Rovagug, Urgathoa, Zon-Kuthon', powers: ['Bolt', 'Confusion', 'Curse', 'Damage Field', 'Deflection', 'Drain Power Points', 'Fear', 'Stun', 'Summon Ally', 'Zombie'] },
  { name: 'Elemental (Air, Earth, Fire, Water)', aspects: 'Air, cold, earth, fire, heat, water', deities: 'Abadar, Asmodeus, Gozreh, Pharasma, Sarenrae, Shelyn, Torag', powers: ['Barrier', 'Blast', 'Burrow', 'Burst', 'Damage Field', 'Deflection', 'Elemental Manipulation', 'Environmental Protection', 'Havoc', 'Intangibility'] },
  { name: 'Glory (Good, Healing)', aspects: 'Healing, love, mercy, peace', deities: 'Cayden Cailean, Desna, Erastil, Gorum, Iomedae, Irori, Pharasma, Sarenrae, Shelyn, Torag', powers: ['Arcane Protection', 'Barrier', 'Beast Friend', 'Burst', 'Damage Field', 'Deflection', 'Fly', 'Growth/Shrink', 'Sloth/Speed', 'Summon Ally'] },
  { name: 'Knowledge', aspects: 'Literacy, history, revealing secrets', deities: 'Calistria, Irori, Nethys, Norgorber, Pharasma', powers: ['Arcane Protection', 'Detect/Conceal Arcana', 'Drain Power Points', 'Locate', 'Mind Link', 'Mind Reading', 'Object Reading', 'Protection', 'Scrying', 'Speak Language'] },
  { name: 'Luck', aspects: 'Chance, fortune, losing, winning', deities: 'Calistria, Desna, Shelyn', powers: ['Blind', 'Confusion', 'Curse', 'Deflection', 'Disguise', 'Drain Power Points', 'Illusion', 'Mind Reading', 'Object Reading', 'Puppet'] },
  { name: 'Magic (Rune)', aspects: 'Arcane power, reality, runes', deities: 'Asmodeus, Irori, Nethys, Urgathoa', powers: ['Blast', 'Detect/Conceal Arcana', 'Elemental Manipulation', 'Environmental Protection', 'Havoc', 'Planar Binding', 'Plane Shift', 'Protection', 'Scrying', 'Summon Ally'] },
  { name: 'Nature (Animal, Plant, Weather)', aspects: 'Animals, plants, weather, seas', deities: 'Erastil, Gozreh, Rovagug', powers: ['Barrier', 'Beast Friend', 'Burst', 'Elemental Manipulation', 'Entangle', 'Environmental Protection', 'Protection', 'Shape Change', 'Summon Ally', 'Wall Walker'] },
  { name: 'Protection', aspects: 'Protection, care-giving, shelter', deities: 'Abadar, Nethys, Shelyn, Torag', powers: ['Arcane Protection', 'Barrier', 'Deflection', 'Detect/Conceal Arcana', 'Environmental Protection', 'Intangibility', 'Invisibility', 'Puppet', 'Protection', 'Summon Ally'] },
  { name: 'Strength', aspects: 'Brawn, champions, contest', deities: 'Cayden Cailean, Gorum, Irori, Lamashtu, Urgathoa', powers: ['Arcane Protection', 'Burrow', 'Drain Power Points', 'Growth/Shrink', 'Havoc', 'Protection', 'Sloth/Speed', 'Stun', 'Wall Walker', "Warrior's Gift"] },
  { name: 'Sun', aspects: 'Light, radiance, warmth, life', deities: 'Iomedae, Sarenrae', powers: ['Blind', 'Bolt', 'Confusion', 'Damage Field', 'Drain Power Points', 'Environmental Protection', 'Fly', 'Illusion', 'Protection', 'Stun'] },
  { name: 'Travel', aspects: 'Freedom, liberation, wanderlust', deities: 'Abadar, Cayden Cailean, Desna', powers: ['Deflection', 'Environmental Protection', 'Fly', 'Intangibility', 'Locate', 'Plane Shift', 'Scrying', 'Sloth/Speed', 'Speak Language', 'Teleport'] },
  { name: 'Trickery', aspects: 'Chance, deception, secrets, stealth', deities: 'Asmodeus, Calistria, Lamashtu, Norgorber', powers: ['Blind', 'Confusion', 'Deflection', 'Detect/Conceal Arcana', 'Disguise', 'Illusion', 'Invisibility', 'Puppet', 'Speak Language', 'Time Stop'] },
  { name: 'War', aspects: 'Battle, bravery, victory', deities: 'Gorum, Iomedae, Rovagug, Urgathoa', powers: ['Barrier', 'Blast', 'Blind', 'Confusion', 'Deflection', 'Fear', 'Sloth/Speed', 'Stun', 'Summon Ally', "Warrior's Gift"] }
];

export interface PfBloodlineDef {
  name: string;
  baseAbility: string;
  advancedAbility: string;
}

export const PF_BLOODLINES: PfBloodlineDef[] = [
  { name: 'Aberrant', baseAbility: '+1 Toughness, Reach +1 (applies to attacks and spell origin/range); bolt/blast/burst must use Lingering Damage for +1 PP instead of +2.', advancedAbility: 'Never Surprised, immune to The Drop unless Bound, and +1 additional Toughness.' },
  { name: 'Abyssal', baseAbility: 'Environmental resistance to electricity, +1 Toughness, and claws dealing Str+d4 damage.', advancedAbility: 'Summon ally costs 2 fewer PP (min 1) and summoned entities cause Fear; gain environmental resistance to cold and fire.' },
  { name: 'Arcane', baseAbility: 'Form an Arcane Bond with a Bonded Object (+1 Spellcasting when worn/held) or a magical Familiar.', advancedAbility: 'Free reroll on any failed Spellcasting roll.' },
  { name: 'Celestial', baseAbility: 'Bolt, blast, and burst deal +2 damage to evil creatures (stacks with Champion); environmental resistance to cold and acid.', advancedAbility: 'Extend/hide angel wings as a free action for Flight at Pace 12.' },
  { name: 'Destined', baseAbility: 'Gain one additional Benny at the start of each session.', advancedAbility: 'Start each session with two extra Bennies instead of one.' },
  { name: 'Draconic', baseAbility: 'Claws (Str+d4), scaly skin (Armor +2), and +1 damage to powers matching your draconic Trapping.', advancedAbility: 'Claws gain AP +2 and gain environmental resistance matching your dragon bloodline.' },
  { name: 'Elemental', baseAbility: 'Environmental resistance to chosen element plus: Air (Flight Pace 6), Earth (Burrowing Pace 6), Fire (+2 fire spell damage), or Water (enemies Hindered by powers).', advancedAbility: 'Once per encounter unleash a 3d6 Cone Template elemental blast (may be Evaded).' },
  { name: 'Fey', baseAbility: 'Ignore Difficult Terrain in the wilderness and Laughing Touch (Touch Attack makes target Distracted).', advancedAbility: 'Targets of lingering powers (blind, lower Trait, stun, etc.) subtract 2 from recovery rolls.' },
  { name: 'Infernal', baseAbility: 'Environmental resistance to fire, immunity to poison, and +1 damage to attack powers with a fire Trapping.', advancedAbility: 'Extend/hide bat wings as a free action for Flight at Pace 12.' },
  { name: 'Undead', baseAbility: 'Environmental resistance to cold and +1 to Soak rolls.', advancedAbility: 'Gain full Undead ability plus Outsider (Major) and Ugly (Major).' }
];

export interface PfSpecialMaterialDef {
  name: string;
  cost: string;
  effect: string;
}

export const PF_SPECIAL_MATERIALS: PfSpecialMaterialDef[] = [
  { name: 'Masterwork', cost: '+300 gp (weapon/shield), +150 gp/piece (armor), +6 gp/unit (ammo)', effect: 'Weapons gain +1 AP; armor/shields reduce Minimum Strength by one die step (min d4); ammo ignores 1 pt of Long/Extreme Range penalty.' },
  { name: 'Adamantine', cost: '+3,000 gp (weapon), +3,000 gp per Armor pt (armor) — includes Masterwork', effect: 'Weapons/ammo gain +1 AP (stacks with Masterwork). Armor ignores up to 2 points of AP.' },
  { name: 'Cold Iron', cost: '2x normal cost (plus +300 gp if Masterwork)', effect: 'Triggers cold iron Weakness on certain demons and fey; increases weapon Hardness by +2.' },
  { name: 'Darkwood', cost: '+10 gp per original lb on top of Masterwork price', effect: 'Half normal weight and +2 Hardness (or +2 Toughness for vehicle hulls).' },
  { name: 'Dragonhide', cost: '+2,500 gp over equivalent normal armor (counts as Masterwork)', effect: 'Grants base armor (+2 to +4) plus +4 Armor against the breath-weapon element of the dragon.' },
  { name: 'Mithral', cost: '100x normal (weapons/shields) or 10x normal (armor) + Masterwork', effect: 'Reduces Minimum Strength by one die step (stacks with Masterwork), halves weight, and counts as silver.' },
  { name: 'Alchemical Silver', cost: '10x normal weapon cost', effect: 'Affects creatures with a Weakness to silver (such as lycanthropes).' }
];

export const PF_MAGIC_ITEM_RULES = {
  usage: [
    'Active Powers are Actions: Items requiring a Trait roll take an action unless noted; Critical Failure causes Fatigue (and drains 1 charge if charged).',
    'Edges & Abilities: If an item grants an Edge or Monstrous Ability you already have, it grants the improved version if one exists.',
    'Minor & Major Powers: Minor powers activate at standard success; Major powers activate with a raise (no roll, lasts full Duration, cannot be maintained).',
    'Stacking: Trait bonuses from two sources do not stack (use highest) and do not count toward Trait advancement limits, though they affect Parry/Toughness.',
    'Body Slots: Wear at most one magic item per slot (head, eyes, shoulders, neck, chest, belt, wrists, hands, feet) and up to two magic rings.'
  ],
  wealthByRank: [
    { rank: 'Novice (Creation)', wealth: '300 gp (+600 gp per Hindrance point spent on wealth)' },
    { rank: 'Seasoned', wealth: '10,000 gp' },
    { rank: 'Veteran', wealth: '40,000 gp' },
    { rank: 'Heroic', wealth: '150,000 gp' },
    { rank: 'Legendary', wealth: '500,000 gp' }
  ],
  settingDifferences: [
    'Free Class Edge: Every hero starts with a free Class Edge (or Background/Professional Edge if preferred).',
    'Four Wound Cap: Maximum Wound penalty is capped at -3 (Tough as Nails / Harder to Kill interact with Savage Pathfinder rules).',
    'Skills & Edges: Research is folded into Academics; Two-Weapon Fighting merges melee & thrown off-hand attacks; Sweep requires a two-handed weapon.',
    'Shields: Protect against half of attackers (rounded up) on the same Action Card unless flanked by allies or in a superior position.'
  ]
};

// ============================================================================
// ICONIC PATH SAMPLE CHARACTERS (Novice Starting Profiles from Core Rules)
// ============================================================================

const PF_BASE_SKILLS: Array<{ id: string; name: string; linkedAttribute: AttributeId; isCore: boolean }> = [
  { id: 'academics', name: 'Academics', linkedAttribute: 'smarts', isCore: false },
  { id: 'athletics', name: 'Athletics', linkedAttribute: 'agility', isCore: true },
  { id: 'battle', name: 'Battle', linkedAttribute: 'smarts', isCore: false },
  { id: 'boating', name: 'Boating', linkedAttribute: 'agility', isCore: false },
  { id: 'common_knowledge', name: 'Common Knowledge', linkedAttribute: 'smarts', isCore: true },
  { id: 'driving', name: 'Driving', linkedAttribute: 'agility', isCore: false },
  { id: 'electronics', name: 'Electronics', linkedAttribute: 'smarts', isCore: false },
  { id: 'faith', name: 'Faith', linkedAttribute: 'spirit', isCore: false },
  { id: 'fighting', name: 'Fighting', linkedAttribute: 'agility', isCore: false },
  { id: 'focus', name: 'Focus', linkedAttribute: 'spirit', isCore: false },
  { id: 'gambling', name: 'Gambling', linkedAttribute: 'smarts', isCore: false },
  { id: 'hacking', name: 'Hacking', linkedAttribute: 'smarts', isCore: false },
  { id: 'healing', name: 'Healing', linkedAttribute: 'smarts', isCore: false },
  { id: 'intimidation', name: 'Intimidation', linkedAttribute: 'spirit', isCore: false },
  { id: 'language', name: 'Language', linkedAttribute: 'smarts', isCore: false },
  { id: 'notice', name: 'Notice', linkedAttribute: 'smarts', isCore: true },
  { id: 'occult', name: 'Occult', linkedAttribute: 'smarts', isCore: false },
  { id: 'performance', name: 'Performance', linkedAttribute: 'spirit', isCore: false },
  { id: 'persuasion', name: 'Persuasion', linkedAttribute: 'spirit', isCore: true },
  { id: 'piloting', name: 'Piloting', linkedAttribute: 'agility', isCore: false },
  { id: 'psionics', name: 'Psionics', linkedAttribute: 'smarts', isCore: false },
  { id: 'repair', name: 'Repair', linkedAttribute: 'smarts', isCore: false },
  { id: 'research', name: 'Research', linkedAttribute: 'smarts', isCore: false },
  { id: 'riding', name: 'Riding', linkedAttribute: 'agility', isCore: false },
  { id: 'science', name: 'Science', linkedAttribute: 'smarts', isCore: false },
  { id: 'shooting', name: 'Shooting', linkedAttribute: 'agility', isCore: false },
  { id: 'spellcasting', name: 'Spellcasting', linkedAttribute: 'smarts', isCore: false },
  { id: 'stealth', name: 'Stealth', linkedAttribute: 'agility', isCore: true },
  { id: 'survival', name: 'Survival', linkedAttribute: 'smarts', isCore: false },
  { id: 'taunt', name: 'Taunt', linkedAttribute: 'smarts', isCore: false },
  { id: 'thievery', name: 'Thievery', linkedAttribute: 'agility', isCore: false },
  { id: 'weird_science', name: 'Weird Science', linkedAttribute: 'smarts', isCore: false }
];

const makeSkills = (overrides: Record<string, number>): CharacterSkill[] =>
  PF_BASE_SKILLS.map((s) => ({
    skillId: s.id,
    name: s.name,
    linkedAttribute: s.linkedAttribute,
    isCore: s.isCore,
    die: (overrides[s.id] !== undefined ? overrides[s.id] : s.isCore ? 4 : 0) as DieSides | 0,
    modifier: 0
  }));

export const PF_SAMPLE_CHARACTERS: SwadeCharacter[] = [
  {
    id: 'pf_iconic_amiri',
    name: 'Amiri',
    concept: 'Iconic Path Barbarian',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 8, smarts: 4, spirit: 6, strength: 10, vigor: 8 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeSkills({
      athletics: 6,
      common_knowledge: 4,
      fighting: 8,
      intimidation: 6,
      notice: 6,
      persuasion: 4,
      riding: 4,
      shooting: 6,
      stealth: 4,
      survival: 4
    }),
    hindrances: [
      { hindranceId: 'bloodthirsty', name: 'Bloodthirsty', severity: 'Major', summary: 'Never takes prisoners unless under direct supervision.' },
      { hindranceId: 'death_wish', name: 'Death Wish', severity: 'Minor', summary: 'Expects a noble death in glorious battle.' },
      { hindranceId: 'poverty', name: 'Poverty', severity: 'Minor', summary: 'Spends freely whenever chance provides.' }
    ],
    hindranceAllocation: { attributes: 1, edges: 0, skills: 2, wealth: 0 },
    edges: [
      { edgeId: 'pf_barbarian', name: 'Barbarian', category: 'Class', rankRequired: 'Novice', summary: 'Armor Restriction (Medium), Fast (+2 Pace), and Rage.', source: 'Creation' },
      { edgeId: 'brute', name: 'Brute', category: 'Background', rankRequired: 'Novice', summary: 'Links Athletics to Strength; +1/+2/+4 thrown ranges.', source: 'Ancestry' }
    ],
    arcaneBackgroundId: 'none',
    maxPowerPointsMod: 0,
    powers: [],
    weapons: [
      { id: 'pf_wpn_amiri_sword', name: 'Bastard Sword (Oversized)', category: 'Melee', damage: 'Str+d8', ap: 1, range: 'Melee', rof: 1, minStr: 8, weight: 6, cost: 35, equipped: true, notes: 'AP 1, +1 dmg two-handed', source: 'pathfinder' },
      { id: 'pf_wpn_amiri_bow', name: 'Short Bow', category: 'Ranged', damage: '2d6', ap: 0, range: '12/24/48', rof: 1, minStr: 6, weight: 2, cost: 30, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_amiri_axe', name: 'Hand Axe', category: 'Melee', damage: 'Str+d6', ap: 0, range: '3/6/12', rof: 1, minStr: 6, weight: 3, cost: 6, equipped: true, source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_amiri_leather', name: 'Studded Leather Tunic & Leggings', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 19, cost: 40, equipped: true, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_amiri_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_amiri_arrows', name: 'Arrows (20)', quantity: 1, weight: 3, cost: 1, source: 'pathfinder' }
    ],
    currency: 9,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 0, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'Fiery of heart and fierce in battle, Amiri carries an oversized frost-giant bastard sword across Golarion.',
    notes: 'Languages: Common, Goblin, Halfling. Iconic Path Barbarian (Core Rules p. 45).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 2400000
  },
  {
    id: 'pf_iconic_valeros',
    name: 'Valeros',
    concept: 'Iconic Path Fighter',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 8, smarts: 6, spirit: 6, strength: 8, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeSkills({
      athletics: 6,
      common_knowledge: 4,
      fighting: 8,
      intimidation: 6,
      notice: 4,
      persuasion: 4,
      riding: 4,
      shooting: 8,
      stealth: 6,
      survival: 4
    }),
    hindrances: [
      { hindranceId: 'impulsive', name: 'Impulsive', severity: 'Major', summary: 'Acts on impulse in battle.' },
      { hindranceId: 'loyal', name: 'Loyal', severity: 'Minor', summary: 'Fiercely loyal to adventuring companions.' },
      { hindranceId: 'habit', name: 'Habit (Ale)', severity: 'Minor', summary: 'Easy-come, easy-go fondness for taverns.' }
    ],
    hindranceAllocation: { attributes: 1, edges: 1, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_fighter', name: 'Fighter', category: 'Class', rankRequired: 'Novice', summary: 'Martial Flexibility: gain a Combat Edge once per encounter.', source: 'Creation' },
      { edgeId: 'ambidextrous', name: 'Ambidextrous', category: 'Background', rankRequired: 'Novice', summary: 'Ignore -2 off-hand penalty.', source: 'Ancestry' },
      { edgeId: 'brawny', name: 'Brawny', category: 'Background', rankRequired: 'Novice', summary: 'Size +1 (+1 Toughness) and +1 Str step for Load/Min Str.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'none',
    maxPowerPointsMod: 0,
    powers: [],
    weapons: [
      { id: 'pf_wpn_val_long', name: 'Long Sword (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 4, cost: 15, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_val_short', name: 'Short Sword (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 2, cost: 10, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_val_bow', name: 'Long Bow (PF)', category: 'Ranged', damage: '2d6', ap: 1, range: '15/30/60', rof: 1, minStr: 8, weight: 3, cost: 75, equipped: true, notes: 'AP 1', source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_val_scale', name: 'Scale Mail Shirt (PF)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 22, cost: 100, equipped: true, source: 'pathfinder' },
      { id: 'pf_arm_val_legs', name: 'Leather Leggings (PF)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 8, cost: 20, equipped: false, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_val_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_val_arrows', name: 'Arrows (20)', quantity: 1, weight: 3, cost: 1, source: 'pathfinder' }
    ],
    currency: 29,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 0, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'A two-sword mercenary and loyal companion who takes an easy-come, easy-go approach to life and fortune.',
    notes: 'Languages: Common, Dwarven, Elven, Sylvan. Iconic Path Fighter (Core Rules p. 55).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 1800000
  },
  {
    id: 'pf_iconic_lini',
    name: 'Lini',
    concept: 'Iconic Path Druid',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_gnome',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 6, smarts: 6, spirit: 8, strength: 6, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeSkills({
      athletics: 6,
      common_knowledge: 6,
      faith: 8,
      fighting: 6,
      healing: 4,
      intimidation: 4,
      notice: 6,
      persuasion: 4,
      riding: 4,
      stealth: 4,
      survival: 8
    }),
    hindrances: [
      { hindranceId: 'all_thumbs', name: 'All Thumbs', severity: 'Minor', summary: '-2 using mechanical or technological devices.' },
      { hindranceId: 'quirk', name: 'Quirk (Collects sticks)', severity: 'Minor', summary: 'Collects sticks from every forest she visits.' },
      { hindranceId: 'vow', name: 'Vow (Major — Defend the wilds)', severity: 'Major', summary: 'Sworn to protect wild places and nature.' }
    ],
    hindranceAllocation: { attributes: 0, edges: 2, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_druid', name: 'Druid', category: 'Class', rankRequired: 'Novice', summary: 'Arcane Background (Druid) using Faith, Nature Bond, Nature Sense, Wilderness Stride.', source: 'Creation' },
      { edgeId: 'beast_master', name: 'Beast Master', category: 'Weird', rankRequired: 'Novice', summary: 'Companion: Droogami the Snow Leopard (Large Cat).', source: 'Hindrance' },
      { edgeId: 'new_powers', name: 'New Powers', category: 'Power', rankRequired: 'Novice', summary: 'Learns 2 additional powers.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'pf_druid',
    maxPowerPointsMod: 0,
    powers: [
      { id: 'pf_lini_p1', powerId: 'beast_friend', name: 'Beast Friend', trapping: 'Animal Empathy', powerPoints: 'Special', range: 'Smarts', duration: '10 mins', summary: 'Communicate with and guide natural beasts.' },
      { id: 'pf_lini_p2', powerId: 'elemental_manipulation', name: 'Elemental Manipulation', trapping: 'Primal Elements', powerPoints: '1', range: 'Smarts', duration: '5', summary: 'Minor cantrips of air, earth, fire, or water.' },
      { id: 'pf_lini_p3', powerId: 'entangle', name: 'Entangle', trapping: 'Grasping Roots & Vines', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Restrains targets in vines (Bound on raise).' },
      { id: 'pf_lini_p4', powerId: 'environmental_protection', name: 'Environmental Protection', trapping: 'Oak Bark & Wind', powerPoints: '2', range: 'Touch', duration: '1 hour', summary: 'Protects from harsh environments and reduces hazard damage.' },
      { id: 'pf_lini_p5', powerId: 'pf_protection', name: 'Protection', trapping: 'Barkskin', powerPoints: '2', range: 'Smarts', duration: '5', summary: '+2 Armor on success (+2 Toughness on raise).' }
    ],
    weapons: [
      { id: 'pf_wpn_lini_sickle', name: 'Sickle (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 2, cost: 3, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_lini_sling', name: 'Sling (PF)', category: 'Thrown', damage: 'Str+d4', ap: 0, range: '4/8/16', rof: 1, minStr: 4, weight: 1, cost: 0, equipped: true, notes: 'Uses Athletics (throwing)', source: 'pathfinder' },
      { id: 'pf_wpn_lini_thunder', name: 'Thunderstone (PF)', category: 'Thrown', damage: '0', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 30, equipped: true, notes: 'MBT; Vigor or Shaken & deafened 1 hr', source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_lini_leather', name: 'Soft Leather Tunic & Pants (PF)', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 19, cost: 40, equipped: true, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_lini_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_lini_pouch', name: 'Spell Component Pouch', quantity: 1, weight: 2, cost: 5, source: 'pathfinder' },
      { id: 'pf_gr_lini_stones', name: 'Sling Stones (20)', quantity: 1, weight: 1, cost: 0, source: 'pathfinder' }
    ],
    currency: 39,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 11, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'A gnome druid who prefers the company of her snow leopard Droogami to other humanoids and collects sticks from every forest.',
    notes: 'Companion: Droogami the Snow Leopard (Large Cat). Languages: Common, Druidic, Elven, Gnome, Sylvan. Iconic Path Druid (Core Rules p. 53).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 1200000
  }
];
