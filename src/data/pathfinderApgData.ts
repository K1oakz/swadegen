import {
  AncestryDef,
  ArcaneBackgroundDef,
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

// ============================================================================
// ANCESTRIES (APG pp. 8-17)
// ============================================================================

export const PF_APG_ANCESTRIES: AncestryDef[] = [
  {
    id: 'pf_aasimar',
    name: 'Aasimar (Pathfinder)',
    source: 'pathfinder',
    summary: 'Celestial-touched mortals with Darkvision, d6 Spirit, d6 Persuasion, Daylight innate light, and Outsider nature.',
    attributeBonuses: { spirit: 1 },
    skillBonuses: { persuasion: 1 },
    traits: [
      { name: 'Darkvision', description: 'Ignore penalties for Illumination up to 10" (20 yards).' },
      { name: 'Diplomatic', description: 'Start with a d6 in Persuasion instead of d4 (increases maximum Persuasion to d12+1).' },
      { name: 'Daylight', description: 'Once per day as a limited free action, cast minor light as an Innate Power.' },
      { name: 'Native Outsider', description: 'Creature Type is Outsider rather than Humanoid.' },
      { name: 'Spirited', description: 'Start with a d6 in Spirit instead of d4 (increases maximum Spirit to d12+1).' }
    ]
  },
  {
    id: 'pf_catfolk',
    name: 'Catfolk (Pathfinder)',
    source: 'pathfinder',
    summary: "Lithe feline explorers with d6 Agility, Sprinter (d8 running die), Low Light Vision, and Cat's Luck.",
    attributeBonuses: { agility: 1 },
    traits: [
      { name: 'Agile', description: 'Start with a d6 in Agility instead of d4 (increases maximum Agility to d12+1).' },
      { name: "Cat's Luck", description: 'Gain a free reroll on failed Evasion rolls.' },
      { name: 'Low Light Vision', description: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Sprinter', description: 'Increase running die by one die type (to d8).' }
    ]
  },
  {
    id: 'pf_dhampir',
    name: 'Dhampir (Pathfinder)',
    source: 'pathfinder',
    summary: 'Half-living vampire progeny with d6 Agility, Night Vision, Detect Undead, and Undead Resistance, but Light Sensitive and -1 Toughness.',
    attributeBonuses: { agility: 1 },
    toughnessMod: -1,
    traits: [
      { name: 'Agile', description: 'Start with a d6 in Agility instead of d4 (increases maximum Agility to d12+1).' },
      { name: 'Detect Undead', description: 'As a limited action, sense undead within 20" (40 yards); as a limited free action, learn count and relative power.' },
      { name: 'Light Sensitive', description: 'Suffer -1 on Trait rolls requiring sight while in bright light.' },
      { name: 'Night Vision', description: 'Ignore all penalties for Illumination.' },
      { name: 'Reduced Vitality', description: 'Suffer -1 Toughness.' },
      { name: 'Undead Resistance', description: 'Free reroll to resist contracting diseases and immune to Energy Drain.' }
    ]
  },
  {
    id: 'pf_goblin',
    name: 'Goblin (Pathfinder)',
    source: 'pathfinder',
    summary: 'Nimble, mischievous small humanoids with d8 Agility, d6 Stealth, d4 Riding, Darkvision, and Size -1, though mistrusted.',
    attributeBonuses: { agility: 2 },
    skillBonuses: { riding: 1, stealth: 1 },
    sizeMod: -1,
    toughnessMod: -1,
    traits: [
      { name: 'Agile', description: 'Start with a d8 in Agility instead of d4 (increases maximum Agility to d12+2).' },
      { name: 'Capable Rider', description: 'Start with a d4 in Riding.' },
      { name: 'Darkvision', description: 'Ignore penalties for Illumination up to 10" (20 yards).' },
      { name: 'Outsider (Major)', description: 'Subtract 2 from all Persuasion rolls among non-goblin cultures.' },
      { name: 'Size -1', description: 'Roughly three feet tall; reduce Size and Toughness by 1.' },
      { name: 'Sneaky', description: 'Start with a d6 in Stealth instead of d4 (increases maximum Stealth to d12+1).' }
    ]
  },
  {
    id: 'pf_tiefling',
    name: 'Tiefling (Pathfinder)',
    source: 'pathfinder',
    summary: 'Fiend-blooded outcasts with d6 Agility, d6 Smarts, Darkvision, Darkness, Fiendish Sorcery, and Native Outsider.',
    attributeBonuses: { agility: 1, smarts: 1 },
    traits: [
      { name: 'Agile', description: 'Start with a d6 in Agility instead of d4 (increases maximum Agility to d12+1).' },
      { name: 'Darkvision', description: 'Ignore penalties for Illumination up to 10" (20 yards).' },
      { name: 'Darkness', description: 'Once per day as a limited free action, cast minor darkness as an Innate Power.' },
      { name: 'Fiendish Sorcery', description: 'Sorcerers with Abyssal or Infernal bloodlines reduce the Rank Requirement for Advanced Bloodline to Veteran.' },
      { name: 'Intelligence', description: 'Start with a d6 in Smarts instead of d4 (increases maximum Smarts to d12+1).' },
      { name: 'Native Outsider', description: 'Creature Type is Outsider rather than Humanoid.' },
      { name: 'Outsider (Minor)', description: 'Subtract 2 from all Persuasion rolls among suspicious cultures.' }
    ]
  }
];

// ============================================================================
// HINDRANCES (APG pp. 33-35)
// ============================================================================

export const PF_APG_HINDRANCES: HindranceDef[] = [
  {
    id: 'pf_ancestral_weakness',
    name: 'Ancestral Weakness',
    severity: 'Minor/Major',
    summary: 'Choose Fire, Cold, or Electricity: suffer +2 damage (Minor) or +4 damage (Major) from attacks of that type.',
    effect: '+2/+4 damage from chosen elemental type',
    source: 'pathfinder'
  },
  {
    id: 'pf_bitter',
    name: 'Bitter',
    severity: 'Major',
    summary: 'Other characters suffer -2 to mundane and magical healing rolls on you (does not affect natural healing).',
    effect: '-2 to others healing this character',
    source: 'pathfinder'
  },
  {
    id: 'pf_constricted',
    name: 'Constricted',
    severity: 'Minor',
    summary: 'Gain Armor Restriction (Medium) on one Class Edge, or worsen existing Armor Restriction by one step (to Any max).',
    effect: 'Gain or worsen Armor Restriction',
    source: 'pathfinder'
  },
  {
    id: 'pf_favored_class',
    name: 'Favored Class',
    severity: 'Minor/Major',
    summary: 'Minor: +1 die step Trait req for other Class/Prestige Edges. Major: only one core Class Edge and no Prestige Edges.',
    effect: 'Restricts multiclassing & Prestige Edges',
    source: 'pathfinder'
  },
  {
    id: 'pf_fey_taken',
    name: 'Fey-Taken',
    severity: 'Minor',
    summary: '-2 penalty on rolls to resist disease, poison, and spells, abilities, or opposed Tests from Fey.',
    effect: '-2 vs disease, poison, and Fey',
    source: 'pathfinder'
  },
  {
    id: 'pf_helpless',
    name: 'Helpless',
    severity: 'Minor/Major',
    summary: 'Whenever an ally in sight suffers a Wound, become Distracted (Minor), or Distracted and Vulnerable (Major).',
    effect: 'Distracted/Vulnerable when allies take Wounds',
    source: 'pathfinder'
  },
  {
    id: 'pf_loner',
    name: 'Loner',
    severity: 'Major',
    summary: 'This character never benefits from Gang Up bonuses.',
    effect: 'No Gang Up bonuses',
    source: 'pathfinder'
  },
  {
    id: 'pf_magical_klutz',
    name: 'Magical Klutz',
    severity: 'Minor',
    summary: 'Activating a magic item is a limited action instead of an action (or disallows Multi-Action if already limited).',
    effect: 'Activating magic items becomes limited',
    source: 'pathfinder'
  },
  {
    id: 'pf_meticulous',
    name: 'Meticulous',
    severity: 'Minor',
    summary: 'Suffer -4 penalty on untrained skill rolls instead of the usual -2.',
    effect: '-4 on untrained skill rolls',
    source: 'pathfinder'
  },
  {
    id: 'pf_mundane_vision',
    name: 'Mundane Vision',
    severity: 'Minor',
    summary: 'Requires racial Low-Light or Darkvision; character loses that supernatural vision.',
    effect: 'Loses Low-Light Vision / Darkvision',
    source: 'pathfinder'
  },
  {
    id: 'pf_oblivious',
    name: 'Oblivious',
    severity: 'Minor',
    summary: 'Character still takes half damage even on a successful Evasion roll.',
    effect: 'Half damage on successful Evasion',
    source: 'pathfinder'
  },
  {
    id: 'pf_short_sighted',
    name: 'Short Sighted',
    severity: 'Minor/Major',
    summary: 'Minor: cannot spend Conviction for extra uses of 1/encounter/session/day abilities. Major: Conviction die is d4.',
    effect: 'Reduces Conviction utility or die size',
    source: 'pathfinder'
  },
  {
    id: 'pf_spooked',
    name: 'Spooked',
    severity: 'Minor',
    summary: 'Must make a Fear check (-2 if target innately has Fear) whenever perceiving a Fey, Outsider, or Undead within 10".',
    effect: 'Fear checks near Fey, Outsiders & Undead',
    source: 'pathfinder'
  },
  {
    id: 'pf_tainted_spirit',
    name: 'Tainted Spirit',
    severity: 'Major',
    summary: 'Immediately after combat ends, make a Vigor roll or suffer Fatigue lasting until 24 hours pass without combat.',
    effect: 'Vigor roll or Fatigued after combat',
    source: 'pathfinder'
  },
  {
    id: 'pf_umbral_unmasking',
    name: 'Umbral Unmasking',
    severity: 'Minor',
    summary: 'You cast no shadow or a monstrous shadow; observers who notice it suffer a worse initial reaction.',
    effect: 'Uncanny/missing shadow harms reactions',
    source: 'pathfinder'
  },
  {
    id: 'pf_warded_against_nature',
    name: 'Warded Against Nature',
    severity: 'Minor',
    summary: 'Animals will not willingly approach within 10" unless persuaded; -2 penalty on rolls to control animals including Riding.',
    effect: '-2 Riding & animal control; beasts shy away',
    source: 'pathfinder'
  }
];

// ============================================================================
// ARCANE BACKGROUNDS (APG pp. 38-63, 101-103)
// ============================================================================

export const PF_APG_ARCANE_BACKGROUNDS: ArcaneBackgroundDef[] = [
  {
    id: 'pf_alchemist',
    name: 'Arcane Background (Alchemist)',
    arcaneSkillId: 'alchemy',
    arcaneSkillName: 'Alchemy (Smarts)',
    startingPowers: 2,
    startingPowerPoints: 10,
    summary: 'Infuses Extracts using Alchemy (Smarts), brews Bombs & Mutagens, and identifies potions. Armor Interference (Light).',
    source: 'pathfinder'
  },
  {
    id: 'pf_oracle',
    name: 'Arcane Background (Oracle)',
    arcaneSkillId: 'faith',
    arcaneSkillName: 'Faith (Spirit)',
    startingPowers: 2,
    startingPowerPoints: 15,
    summary: 'Vessels of divine mystery with Faith (Spirit), 15 PP, a Curse, and a Mystery (+2 bonus Mystery powers regardless of Rank). Armor Interference (Medium).',
    source: 'pathfinder'
  },
  {
    id: 'pf_summoner',
    name: 'Arcane Background (Summoner)',
    arcaneSkillId: 'spellcasting',
    arcaneSkillName: 'Spellcasting (Smarts)',
    startingPowers: 2,
    startingPowerPoints: 10,
    summary: 'Links souls with a customizable Outsider Eidolon and casts via Spellcasting (starts with summon ally + 1 power). Armor Interference (Light).',
    source: 'pathfinder'
  },
  {
    id: 'pf_witch',
    name: 'Arcane Background (Witch)',
    arcaneSkillId: 'spellcasting',
    arcaneSkillName: 'Spellcasting (Smarts)',
    startingPowers: 2,
    startingPowerPoints: 10,
    summary: 'Draws patron magic via a Spellbook-Familiar and wields Hexes using Spellcasting (Smarts). Armor Interference (Any).',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_inquisitor',
    name: 'Mystic Powers (Inquisitor)',
    arcaneSkillId: 'spirit',
    arcaneSkillName: 'Automatic / Self (Inquisitor)',
    startingPowers: 4,
    startingPowerPoints: 10,
    summary: 'Dedicated 10 PP for Inquisitor Veteran Edge to cast boost Trait (Intimidation, Notice, Survival — self), darksight (self), detect/conceal arcana (self), and dispel as limited free actions.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_rogue',
    name: 'Mystic Powers (Rogue)',
    arcaneSkillId: 'spirit',
    arcaneSkillName: 'Automatic / Self (Rogue)',
    startingPowers: 4,
    startingPowerPoints: 10,
    summary: 'Dedicated 10 PP for Rogue Seasoned Edge to cast boost Trait (Athletics, Stealth, Thievery — self), darksight (self), sound/silence, and wall walker (self) as limited free actions.',
    source: 'pathfinder'
  }
];

// ============================================================================
// EDGES (APG pp. 36-84)
// ============================================================================

export const PF_APG_EDGES: EdgeDef[] = [
  // --- BACKGROUND EDGES (13) ---
  {
    id: 'pf_angel_wings',
    name: 'Angel Wings',
    category: 'Background',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Aasimar',
    summary: 'Grows gleaming feathered wings granting Special Ability Flight: Pace 6.',
    source: 'pathfinder'
  },
  {
    id: 'pf_armor_of_the_pit',
    name: 'Armor of the Pit',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Tiefling',
    toughnessBonus: 2,
    summary: 'Protective scaly skin grants Armor +2 and Environmental Resistance to cold, electricity, or fire (pick one).',
    source: 'pathfinder'
  },
  {
    id: 'pf_attuned_to_the_wild',
    name: 'Attuned to the Wild',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Elf',
    summary: 'Select a Ranger terrain type: while inside it, make a natural healing roll every 24 hours at +2.',
    source: 'pathfinder'
  },
  {
    id: 'pf_blood_drinker',
    name: 'Blood Drinker',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Dhampir',
    summary: 'As a limited action, drink the blood of a living Humanoid to immediately make a natural healing roll.',
    source: 'pathfinder'
  },
  {
    id: 'pf_burn_burn_burn',
    name: 'Burn! Burn! Burn!',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Goblin, Thievery d6+',
    minSkills: { thievery: 6 },
    summary: "+2 damage with non-power fire (torches, bombs, alchemist's fire) and +1 to rolls to ignite fires.",
    source: 'pathfinder'
  },
  {
    id: 'pf_casual_illusionist',
    name: 'Casual Illusionist',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Gnome',
    summary: 'Spend up to 4 PP to add +1 per PP spent to Thievery, Persuasion, or deception rolls.',
    source: 'pathfinder'
  },
  {
    id: 'pf_celestial_servant',
    name: 'Celestial Servant',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Aasimar, Beast Master or similar ability',
    summary: 'Animal companion becomes a Magical Beast with Armor +2, Night Vision, and Paladin Smite Evil (at your Rank).',
    source: 'pathfinder'
  },
  {
    id: 'pf_claw_pounce',
    name: 'Claw Pounce',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Catfolk, Claws, Agility d6+, Strength d6+',
    minAttributes: { agility: 6, strength: 6 },
    summary: 'Charge and make a Wild Attack with Natural Weapons to add +4 damage instead of +2.',
    source: 'pathfinder'
  },
  {
    id: 'pf_deepsight',
    name: 'Deepsight',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Darkvision or Low Light Vision',
    summary: 'Replaces current Low Light Vision or Darkvision with Night Vision.',
    source: 'pathfinder'
  },
  {
    id: 'pf_lucky_halfling',
    name: 'Lucky Halfling',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Halfling, Common Bond',
    requiredEdges: ['common_bond'],
    summary: 'Spend a Benny to allow an ally to reroll a Trait or damage roll with a +2 bonus (does not stack with Elan).',
    source: 'pathfinder'
  },
  {
    id: 'pf_nimble_striker',
    name: 'Nimble Striker',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Catfolk, Sprinter ability, Agility d8+',
    minAttributes: { agility: 8 },
    summary: 'Suffer no -2 running penalty when taking only a single action during your turn.',
    source: 'pathfinder'
  },
  {
    id: 'pf_razor_tusk',
    name: 'Razor Tusk',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Half-Orc',
    summary: 'Gains a bite Natural Attack dealing Str+d6 damage.',
    source: 'pathfinder'
  },
  {
    id: 'pf_shatterspell',
    name: 'Shatterspell',
    category: 'Background',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Dwarf',
    summary: 'As a limited action, make a Fighting Test opposed by a caster’s arcane skill to dispel an active power on a target.',
    source: 'pathfinder'
  },

  // --- NEW CLASS EDGES: ALCHEMIST (4) ---
  {
    id: 'pf_alchemist',
    name: 'Alchemist',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+',
    minAttributes: { smarts: 6 },
    summary: 'Arcane Background (Alchemist) using Alchemy (10 PP, 2 Touch Extracts), Armor Interference (Light), Alchemical ID, Bombs (2 PP, 10", 2d6 SBT), & Mutagens.',
    source: 'pathfinder'
  },
  {
    id: 'pf_discovery',
    name: 'Discovery',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Alchemist (once per Rank)',
    requiredEdges: ['pf_alchemist'],
    summary: 'Gain one Discovery: Extend Potion, Fast Bombs, Dilution, or Feral Mutagen (Str+d6 Claw & Bite, +2 Intimidation).',
    source: 'pathfinder'
  },
  {
    id: 'pf_advanced_discovery',
    name: 'Advanced Discovery',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Alchemist (once per Rank)',
    requiredEdges: ['pf_alchemist'],
    summary: 'Gain one Advanced Discovery: Combine Extracts, Eternal Youth, Instant Alchemy, or Delayed Bomb.',
    source: 'pathfinder'
  },
  {
    id: 'pf_grand_discovery',
    name: 'Grand Discovery',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Alchemist',
    requiredEdges: ['pf_alchemist'],
    summary: "Gain one Grand Discovery: Fast Healing (Fast Regeneration), Elixir of Life, Philosopher's Stone (1/month), or Eternal Potion.",
    source: 'pathfinder'
  },

  // --- NEW CLASS EDGES: CAVALIER (5) ---
  {
    id: 'pf_cavalier',
    name: 'Cavalier',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Agility d6+, Fighting d6+, Riding d6+',
    minAttributes: { agility: 6 },
    minSkills: { fighting: 6, riding: 6 },
    summary: 'Gains Cavalier Mount (Hardy->Resilient->Very Resilient->WC), Challenge (1/encounter limited action, 24"), Mighty Charge (+1 dmg die mounted), and Order (Minor Vow).',
    source: 'pathfinder'
  },
  {
    id: 'pf_banner',
    name: 'Banner',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Cavalier',
    requiredEdges: ['pf_cavalier'],
    summary: 'Allies within 10" of visible banner get free Fear rerolls and reroll running die 1/turn; wave (limited action) clears Distracted/Vulnerable.',
    source: 'pathfinder'
  },
  {
    id: 'pf_order_ability',
    name: 'Order Ability',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Cavalier',
    requiredEdges: ['pf_cavalier'],
    summary: 'Unlocks your Cavalier Order’s special Order Ability (Steal Glory, Aid Allies, Shield of the Liege, Stem the Tide, Calling, or Mounted Mastery).',
    source: 'pathfinder'
  },
  {
    id: 'pf_demanding_challenge',
    name: 'Demanding Challenge',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Cavalier',
    requiredEdges: ['pf_cavalier'],
    summary: 'Within 5" of your challenged foe, spend a Benny immediately after the foe spends one to negate its effect.',
    source: 'pathfinder'
  },
  {
    id: 'pf_supreme_charge',
    name: 'Supreme Charge',
    category: 'Class',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Cavalier Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_cavalier'],
    summary: 'Once per encounter when making a mounted charge attack with a lance, double the damage dealt.',
    source: 'pathfinder'
  },

  // --- NEW CLASS EDGES: INQUISITOR (6) ---
  {
    id: 'pf_inquisitor',
    name: 'Inquisitor',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Athletics or Fighting or Shooting d6+, Occult d4+',
    minSkills: { occult: 4 },
    summary: 'Armor Restriction (Medium), Judgment (5 tokens 1/encounter for +2/-2 Trait or dmg vs judged foe), and Monster Lore (free reroll to ID abilities/weaknesses).',
    source: 'pathfinder'
  },
  {
    id: 'pf_bane',
    name: 'Bane',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Inquisitor',
    requiredEdges: ['pf_inquisitor'],
    summary: 'Once per encounter (limited free action), imbue wielded weapon with Bane (+2 AP, +1 damage die step) for 5 rounds.',
    source: 'pathfinder'
  },
  {
    id: 'pf_brand',
    name: 'Brand',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Inquisitor',
    requiredEdges: ['pf_inquisitor'],
    summary: 'Limited action touch marks target with a magical brand; glows like a torch within 6" of your faith symbol, making bearer Distracted.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_powers_inquisitor',
    name: 'Mystic Powers (Inquisitor)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Inquisitor',
    requiredEdges: ['pf_inquisitor'],
    summary: '10 dedicated PP (limited free action): cast boost Trait (Intimidation, Notice, Survival — self), darksight (self), detect/conceal arcana (self), and dispel.',
    source: 'pathfinder'
  },
  {
    id: 'pf_exploit_weakness',
    name: 'Exploit Weakness',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Inquisitor',
    requiredEdges: ['pf_inquisitor'],
    summary: 'Attacks trigger any Environmental Weakness; causing at least 1 Wound disables the target’s Fast Regeneration for the encounter.',
    source: 'pathfinder'
  },
  {
    id: 'pf_true_judgment',
    name: 'True Judgment',
    category: 'Class',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Inquisitor Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_inquisitor'],
    summary: 'Declare True Judgment (limited free action); spending a Judgment Token on a wounding hit forces a Vigor roll or target dies; judgment may transfer on resolution.',
    source: 'pathfinder'
  },

  // --- NEW CLASS EDGES: ORACLE (4) ---
  {
    id: 'pf_oracle',
    name: 'Oracle',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Spirit d6+',
    minAttributes: { spirit: 6 },
    summary: 'Arcane Background (Oracle) using Faith (15 PP, 2 powers + 2 Mystery powers), Armor Interference (Medium), Curse, and Mystery.',
    source: 'pathfinder'
  },
  {
    id: 'pf_revelation',
    name: 'Revelation',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Oracle',
    requiredEdges: ['pf_oracle'],
    summary: 'Cast one of your known Mystery powers as a limited free action.',
    source: 'pathfinder'
  },
  {
    id: 'pf_divine_mastery_oracle',
    name: 'Divine Mastery (Oracle)',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Oracle',
    requiredEdges: ['pf_oracle'],
    summary: "Unlocks access to all Epic Power Modifiers for your oracle powers.",
    source: 'pathfinder'
  },
  {
    id: 'pf_greater_revelation',
    name: 'Greater Revelation',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Oracle',
    requiredEdges: ['pf_oracle'],
    summary: "Unlock your Oracle Mystery's Greater Revelation signature ability (Battlecry, Form of Flame, Energy Body, Storm, Lightning Breath, etc.).",
    source: 'pathfinder'
  },

  // --- NEW CLASS EDGES: SUMMONER (7) ---
  {
    id: 'pf_summoner',
    name: 'Summoner',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+, Occult d6+',
    minAttributes: { smarts: 6 },
    minSkills: { occult: 6 },
    summary: 'Arcane Background (Summoner) using Spellcasting (10 PP, summon ally + 1 power), Armor Interference (Light), and bonded Outsider Eidolon (3 Evolution Pts).',
    source: 'pathfinder'
  },
  {
    id: 'pf_extra_evolution',
    name: 'Extra Evolution',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Summoner (once per Rank)',
    requiredEdges: ['pf_summoner'],
    summary: 'Grants your Eidolon 3 additional Evolution Points.',
    source: 'pathfinder'
  },
  {
    id: 'pf_makers_call',
    name: "Maker's Call",
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Summoner',
    requiredEdges: ['pf_summoner'],
    summary: 'As a limited free action, call your summoned Eidolon to your side or swap positions with it.',
    source: 'pathfinder'
  },
  {
    id: 'pf_summoners_call',
    name: "Summoner's Call",
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Summoner',
    requiredEdges: ['pf_summoner'],
    summary: "When summoning your Eidolon, boost its Agility, Strength, and Vigor by one die type for 10 minutes.",
    source: 'pathfinder'
  },
  {
    id: 'pf_life_bond',
    name: 'Life Bond',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Summoner',
    requiredEdges: ['pf_summoner'],
    summary: 'Transfer Wounds you would suffer directly to your summoned Eidolon while it has at least 1 Wound remaining.',
    source: 'pathfinder'
  },
  {
    id: 'pf_aspect',
    name: 'Aspect',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Summoner',
    requiredEdges: ['pf_summoner'],
    summary: "Divert up to half of your Eidolon's Evolution Points to apply physical evolutions directly to yourself.",
    source: 'pathfinder'
  },
  {
    id: 'pf_twin_eidolon',
    name: 'Twin Eidolon',
    category: 'Class',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Summoner Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_summoner'],
    summary: 'Once per encounter (limited action), transform into your Eidolon for 5 rounds (+1 PP to extend), copying its physical traits & evolutions.',
    source: 'pathfinder'
  },

  // --- NEW CLASS EDGES: WITCH (5) ---
  {
    id: 'pf_witch',
    name: 'Witch',
    category: 'Class',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Smarts d6+, Occult d4+',
    minAttributes: { smarts: 6 },
    minSkills: { occult: 4 },
    summary: 'Arcane Background (Witch) using Spellcasting (10 PP, 2 powers), Armor Interference (Any), Familiar (stores spells), and 1 Witch Hex.',
    source: 'pathfinder'
  },
  {
    id: 'pf_additional_hex',
    name: 'Additional Hex',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Witch (once per Rank)',
    requiredEdges: ['pf_witch'],
    summary: 'Learn an additional Witch Hex (Agony, Augment, Blight, Cackle, Charm, Evil Eye, or Healing).',
    source: 'pathfinder'
  },
  {
    id: 'pf_major_hex',
    name: 'Major Hex',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Witch (once per Rank)',
    requiredEdges: ['pf_witch'],
    summary: "Gain a Major Hex: Hag's Eye, Nightmares, Vision, Waxen Image, or Weather Control.",
    source: 'pathfinder'
  },
  {
    id: 'pf_arcane_mastery_witch',
    name: 'Arcane Mastery (Witch)',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Witch',
    requiredEdges: ['pf_witch'],
    summary: "Unlocks access to all Epic Power Modifiers for your witch spells.",
    source: 'pathfinder'
  },
  {
    id: 'pf_grand_hex',
    name: 'Grand Hex',
    category: 'Class',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Witch Hexes',
    requiresWildCard: true,
    requiredEdges: ['pf_witch'],
    summary: 'Unlock a Grand Hex: Death Curse, Eternal Slumber, or Forced Reincarnation.',
    source: 'pathfinder'
  },

  // --- ADDITIONAL CLASS EDGES FOR EXISTING CLASSES (12, APG pp. 64-65) ---
  {
    id: 'pf_aura_of_justice',
    name: 'Aura of Justice',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Paladin',
    requiredEdges: ['pf_paladin'],
    summary: 'Limited free action: spend 2 uses of Smite Evil to grant 1 use of Smite Evil to all allies within 5" until their next turn.',
    source: 'pathfinder'
  },
  {
    id: 'pf_cockatrice_strike',
    name: 'Cockatrice Strike',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Monk, Spirit d8+, Fighting d8+',
    minAttributes: { spirit: 8 },
    minSkills: { fighting: 8 },
    requiredEdges: ['pf_monk'],
    summary: 'Limited action unarmed strike vs Vulnerable, Stunned, Bound, or Incap foe: Shaking/Wounding petrifies target (Vigor at -2 on raise).',
    source: 'pathfinder'
  },
  {
    id: 'pf_crossblooded',
    name: 'Crossblooded',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Sorcerer',
    requiredEdges: ['pf_sorcerer'],
    summary: 'Gain a second Sorcerer Bloodline and its base abilities; may take Advanced Bloodline an additional time.',
    source: 'pathfinder'
  },
  {
    id: 'pf_disruptive_rage',
    name: 'Disruptive Rage',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Barbarian, Spirit d8+, Occult d6+',
    minAttributes: { spirit: 8 },
    minSkills: { occult: 6 },
    requiredEdges: ['pf_barbarian'],
    summary: 'Gets a free attack against any enemy who casts a spell or miracle within the barbarian’s Reach.',
    source: 'pathfinder'
  },
  {
    id: 'pf_extra_domain',
    name: 'Extra Domain',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Arcane Background (Miracles) or Cleric',
    summary: "Select one additional Domain from your deity's list, gaining access to its spell list and +1 power from that domain.",
    source: 'pathfinder'
  },
  {
    id: 'pf_favored_powers_school',
    name: 'Favored Powers (School)',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Sorcerer or Wizard (choose school set)',
    summary: 'Limited free action: ignore up to 2 points of penalties when casting powers from one chosen school set (Abjurer, Conjurer, Diviner, Enchanter, Evoker, Illusionist, Necromancer, or Transmuter).',
    source: 'pathfinder'
  },
  {
    id: 'pf_hunters_bond',
    name: "Hunter's Bond",
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Ranger',
    requiredEdges: ['pf_ranger'],
    summary: 'Once per encounter (limited free action), share your Favored Enemy bonus vs one target with allies within 5" for 5 rounds.',
    source: 'pathfinder'
  },
  {
    id: 'pf_inspire_greatness',
    name: 'Inspire Greatness',
    category: 'Class',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Bard, Inspire Heroics',
    requiredEdges: ['pf_bard', 'pf_inspire_heroics'],
    summary: 'Gain 3 additional Inspiration Tokens whenever using Inspire Heroics.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mystic_powers_rogue',
    name: 'Mystic Powers (Rogue)',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Rogue',
    requiredEdges: ['pf_rogue'],
    summary: '10 dedicated PP (limited free action): cast boost Trait (Athletics, Stealth, Thievery — self), darksight (self), sound/silence, and wall walker (self).',
    source: 'pathfinder'
  },
  {
    id: 'pf_quivering_palm',
    name: 'Quivering Palm',
    category: 'Class',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Monk, Fighting d10+',
    minSkills: { fighting: 10 },
    requiredEdges: ['pf_monk'],
    summary: '1/day unarmed hit on a living biological target can be triggered up to 1 week later as a free action (Vigor roll or immediately Bleeding Out).',
    source: 'pathfinder'
  },
  {
    id: 'pf_timeless_body',
    name: 'Timeless Body',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Druid, Vigor d8+',
    minAttributes: { vigor: 8 },
    requiredEdges: ['pf_druid'],
    summary: 'Cease physically aging (still die of natural lifespan) and gain immunity to all poisons and diseases.',
    source: 'pathfinder'
  },
  {
    id: 'pf_weapon_specialization',
    name: 'Weapon Specialization',
    category: 'Class',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fighter',
    requiredEdges: ['pf_fighter'],
    summary: 'Choose one weapon type: get a free damage reroll if an attack with that weapon fails to at least Shake the target.',
    source: 'pathfinder'
  },

  // --- COMBAT EDGES (15, APG pp. 66-68) ---
  {
    id: 'pf_armor_training',
    name: 'Armor Training',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Armor Restriction (Any, Light, or Medium)',
    summary: 'Decrease Armor Restriction by one category (e.g., Any -> Light, Light -> Medium, Medium -> None).',
    source: 'pathfinder'
  },
  {
    id: 'pf_covering_defense',
    name: 'Covering Defense',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'When taking the Defend maneuver while wielding a shield, extend your shield’s Parry and Cover bonuses to an adjacent ally.',
    source: 'pathfinder'
  },
  {
    id: 'pf_crippling_attack',
    name: 'Crippling Attack',
    category: 'Combat',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Trademark Weapon',
    requiredEdges: ['trademark_weapon'],
    summary: 'Getting a raise with your Trademark Weapon halves the target’s Pace for 5 rounds (flying foes must pass Athletics to stay aloft).',
    source: 'pathfinder'
  },
  {
    id: 'pf_crossbow_mastery',
    name: 'Crossbow Mastery',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Rapid Reload, Shooting d8+',
    minSkills: { shooting: 8 },
    requiredEdges: ['pf_rapid_reload'],
    summary: 'Reload any crossbow as a limited free action and use your crossbow in melee as a heavy club.',
    source: 'pathfinder'
  },
  {
    id: 'pf_eldritch_claws',
    name: 'Eldritch Claws',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Claws, Fighting d6+',
    minSkills: { fighting: 6 },
    summary: 'Claw attacks mimic adamantine, cold iron, silver, or magic for Weaknesses and Environmental Weaknesses.',
    source: 'pathfinder'
  },
  {
    id: 'pf_feral_claws',
    name: 'Feral Claws',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Claws, Strength d6+',
    minAttributes: { strength: 6 },
    summary: 'Your claw attacks gain +2 AP and increase their damage die by one die type.',
    source: 'pathfinder'
  },
  {
    id: 'pf_rending_claws',
    name: 'Rending Claws',
    category: 'Combat',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Feral Claws, Strength d8+',
    minAttributes: { strength: 8 },
    requiredEdges: ['pf_feral_claws'],
    summary: 'Your claw attacks inflict Rending damage (bleeding Wounds until Vigor raise or Healing roll).',
    source: 'pathfinder'
  },
  {
    id: 'pf_heroic_defiance',
    name: 'Heroic Defiance',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Vigor d8+',
    minAttributes: { vigor: 8 },
    summary: 'Once per encounter automatically remove Bound, Entangled, Distracted, or Vulnerable (and may spend a Benny to repeat in same encounter).',
    source: 'pathfinder'
  },
  {
    id: 'pf_missile_shield',
    name: 'Missile Shield',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran',
    summary: 'When aware and wielding a shield against non-spell, non-Heavy-Weapon ranged attacks, add the shield’s Parry bonus to Toughness.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mounted_shield',
    name: 'Mounted Shield',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'While mounted, add your shield’s defensive bonuses against melee and ranged attacks to your mount as well.',
    source: 'pathfinder'
  },
  {
    id: 'pf_point_blank_master',
    name: 'Point Blank Master',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Shooting d10+',
    minSkills: { shooting: 10 },
    summary: 'Fire any personal ranged weapon in melee combat using standard TN 4 instead of the opponent’s Parry.',
    source: 'pathfinder'
  },
  {
    id: 'pf_shadow_strike',
    name: 'Shadow Strike',
    category: 'Combat',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Sneak Attack, Fighting d6+',
    minSkills: { fighting: 6 },
    summary: 'Trigger Sneak Attack while in Dim, Dark, or Pitch Darkness even without Vulnerable or The Drop.',
    source: 'pathfinder'
  },
  {
    id: 'pf_touch_of_serenity',
    name: 'Touch of Serenity',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Spirit d8+, Unarmed Strike, Fighting d8+',
    minAttributes: { spirit: 8 },
    minSkills: { fighting: 8 },
    summary: 'Once per encounter on a Fighting hit, forfeit damage to bar foe from hostile actions until end of your next turn and end any active Rage.',
    source: 'pathfinder'
  },
  {
    id: 'pf_tripping_strike',
    name: 'Tripping Strike',
    category: 'Combat',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Fighting d8+',
    minSkills: { fighting: 8 },
    summary: 'Targets Shaken or Wounded by your Fighting attack are also knocked prone.',
    source: 'pathfinder'
  },
  {
    id: 'pf_under_and_over',
    name: 'Under and Over',
    category: 'Combat',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Size -1 or smaller, Athletics d8+',
    minSkills: { athletics: 8 },
    summary: 'When an enemy at least 3 Sizes larger misses you with Fighting, it must make an Agility roll at -2 or fall prone and Vulnerable.',
    source: 'pathfinder'
  },

  // --- LEADERSHIP & POWER EDGES (3, APG pp. 68-69) ---
  {
    id: 'pf_team_up',
    name: 'Team Up',
    category: 'Leadership',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Smarts d8+, Command, Natural Leader',
    minAttributes: { smarts: 8 },
    requiredEdges: ['command', 'natural_leader'],
    summary: 'Once per turn, let one ally in Command Range take an extra limited action or limited free action on their next turn.',
    source: 'pathfinder'
  },
  {
    id: 'pf_bouncing_spells',
    name: 'Bouncing Spells',
    category: 'Power',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Arcane Background (Any)',
    requiresArcane: true,
    summary: 'If a single-target spell is resisted or the target is Immune, spend 2 PP to redirect the spell to another target in Range (1/casting).',
    source: 'pathfinder'
  },
  {
    id: 'pf_disruptive_spells',
    name: 'Disruptive Spells',
    category: 'Power',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Arcane Background (Any)',
    requiresArcane: true,
    summary: 'Enemies affected by your spells must pass a Smarts roll to activate any Innate or Mystic Powers until the end of their next turn.',
    source: 'pathfinder'
  },

  // --- PRESTIGE EDGES (23, APG pp. 69-75) ---
  {
    id: 'pf_battle_herald',
    name: 'Battle Herald',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Cavalier or Paladin, Command, Persuasion d6+, Intimidation d4+',
    minSkills: { persuasion: 6, intimidation: 4 },
    requiredEdges: ['command'],
    summary: 'Inspiring Command (1/encounter limited free action, 5 rds in Command Range): +2 Toughness, ignore 1 Wound/Fatigue penalty, or +2 Fighting dmg.',
    source: 'pathfinder'
  },
  {
    id: 'pf_battle_herald_ii',
    name: 'Battle Herald II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Battle Herald',
    requiredEdges: ['pf_battle_herald'],
    summary: 'Voice of Authority: as a limited action, grant allies in Command Range any one of your Combat Edges for 5 rounds (ignore Reqs).',
    source: 'pathfinder'
  },
  {
    id: 'pf_battle_herald_iii',
    name: 'Battle Herald III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Battle Herald II',
    requiredEdges: ['pf_battle_herald_ii'],
    summary: 'Last Stand: 1/encounter (action), all allies in Command Range make an immediate natural healing roll ignoring 1 Wound penalty.',
    source: 'pathfinder'
  },
  {
    id: 'pf_holy_vindicator',
    name: 'Holy Vindicator',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Channel Energy ability (e.g., Cleric), Occult d6+',
    minSkills: { occult: 6 },
    summary: 'Stigmata: bleed for 5 rds (limited free action) for +2 to all mundane & magical healing rolls; gain 1 Fatigue when it ends.',
    source: 'pathfinder'
  },
  {
    id: 'pf_holy_vindicator_ii',
    name: 'Holy Vindicator II',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Holy Vindicator',
    requiredEdges: ['pf_holy_vindicator'],
    summary: 'Bloodfire: add Spirit die to Fighting damage while bleeding; always use Spirit when checking weapon Min Str.',
    source: 'pathfinder'
  },
  {
    id: 'pf_holy_vindicator_iii',
    name: 'Holy Vindicator III',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Holy Vindicator II',
    requiredEdges: ['pf_holy_vindicator_ii'],
    summary: 'Bloodrain: while stigmata bleed, project a Selective MBT minor damage field; foes inside lose the Hardy ability.',
    source: 'pathfinder'
  },
  {
    id: 'pf_horizon_walker',
    name: 'Horizon Walker',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Survival d6+',
    minSkills: { survival: 6 },
    summary: 'Gains Favored Terrain (incl. planar terrains); Terrain Mastery (limited free action) gives allies within 5" a free Athletics, Notice, Stealth, or Survival reroll.',
    source: 'pathfinder'
  },
  {
    id: 'pf_horizon_walker_ii',
    name: 'Horizon Walker II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Horizon Walker',
    requiredEdges: ['pf_horizon_walker'],
    summary: 'Terrain Dominance: permanent terrain/planar benefits matching your Favored Terrain (e.g., Env. Res Cold/Fire, Wall Walker, Darkvision, Aquatic, Armor +2).',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_chymist',
    name: 'Master Chymist',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Alchemist',
    requiredEdges: ['pf_alchemist'],
    summary: 'Mutagenic Form: 1/encounter free action to transform with Mutagen effect (no PP spent) and gain Nightvision in mutagenic form.',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_chymist_ii',
    name: 'Master Chymist II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Master Chymist',
    requiredEdges: ['pf_master_chymist'],
    summary: 'Brutality: Fighting attacks deal +2 damage while in mutagenic form.',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_chymist_iii',
    name: 'Master Chymist III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Master Chymist II',
    requiredEdges: ['pf_master_chymist_ii'],
    summary: 'Advanced Mutagen: choose Furious Mutagen (+1 die & AP 2 on claws/bite), Growth Mutagen (Size +1 & +1 Str step), or Restoring Change (free natural healing roll).',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_spy',
    name: 'Master Spy',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Notice d6+, Persuasion d8+, Performance d6+',
    minSkills: { notice: 6, persuasion: 8, performance: 6 },
    summary: 'Master of Disguise: disguise under 1 minute, reduce cross-ancestry/gender/size penalties by 2, and cast minor conceal arcana on self/gear at will.',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_spy_ii',
    name: 'Master Spy II',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Master Spy',
    requiredEdges: ['pf_master_spy'],
    summary: 'Superficial Knowledge: ignore up to 2 points of penalties on Smarts-based skill checks involving your cover identity.',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_spy_iii',
    name: 'Master Spy III',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Master Spy II',
    requiredEdges: ['pf_master_spy_ii'],
    summary: 'Assumption: touch a creature to copy its aura; immune to mind reading and divination/locate powers misdirect to the copied target.',
    source: 'pathfinder'
  },
  {
    id: 'pf_nature_warden',
    name: 'Nature Warden',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Beast Master, Survival d4+, Faith d6+ or Mystic Powers (Paladin/Ranger)',
    minSkills: { survival: 4 },
    requiredEdges: ['beast_master'],
    summary: 'Survivalist: pick a terrain for +1 Parry, free Survival/Notice rerolls, and ignore natural Difficult Ground & Hazards.',
    source: 'pathfinder'
  },
  {
    id: 'pf_nature_warden_ii',
    name: 'Nature Warden II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Nature Warden',
    requiredEdges: ['pf_nature_warden'],
    summary: 'Iron Paw: powers targeting you can also target your bonded companion; companion deals +2 Natural Weapon damage.',
    source: 'pathfinder'
  },
  {
    id: 'pf_nature_warden_iii',
    name: 'Nature Warden III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Nature Warden II',
    requiredEdges: ['pf_nature_warden_ii'],
    summary: 'Companion Soul: companion gets free Spirit rerolls; 1/day scry through companion up to 1 hr; revive slain companion via 8-hr ritual.',
    source: 'pathfinder'
  },
  {
    id: 'pf_rage_prophet',
    name: 'Rage Prophet',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, AB (Miracles or Oracle), Rage ability (Barbarian), Occult d4+',
    minSkills: { occult: 4 },
    summary: 'Rage Caster: cast spells while Raging and add +2 to opposed spell rolls while Raging.',
    source: 'pathfinder'
  },
  {
    id: 'pf_rage_prophet_ii',
    name: 'Rage Prophet II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Rage Prophet',
    requiredEdges: ['pf_rage_prophet'],
    summary: 'Raging Spellstrength: while Raging, cast self-only spells as limited free actions.',
    source: 'pathfinder'
  },
  {
    id: 'pf_rage_prophet_iii',
    name: 'Rage Prophet III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Rage Prophet II',
    requiredEdges: ['pf_rage_prophet_ii'],
    summary: 'Spirit Warrior: while Raging, add +2 to Trait rolls against Fey, Outsider, Undead, or incorporeal creatures.',
    source: 'pathfinder'
  },
  {
    id: 'pf_stalwart_defender',
    name: 'Stalwart Defender',
    category: 'Prestige',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Nerves of Steel, no Armor Restriction or Interference',
    requiredEdges: ['nerves_of_steel'],
    parryBonus: 1,
    summary: 'Defensive Stance (1/encounter, 5 rds, limited free action): +1 Parry, +1 Str/Vig step, -2 Pace & cannot run; Fatigue on ending.',
    source: 'pathfinder'
  },
  {
    id: 'pf_stalwart_defender_ii',
    name: 'Stalwart Defender II',
    category: 'Prestige',
    rankRequired: 'Veteran',
    requirementsText: 'Veteran, Stalwart Defender',
    requiredEdges: ['pf_stalwart_defender'],
    summary: 'Last Word: 1/day in Defensive Stance when Incapacitated, make one melee attack (ignoring Wounds) treated as dealt a Joker.',
    source: 'pathfinder'
  },
  {
    id: 'pf_stalwart_defender_iii',
    name: 'Stalwart Defender III',
    category: 'Prestige',
    rankRequired: 'Heroic',
    requirementsText: 'Heroic, Stalwart Defender II',
    requiredEdges: ['pf_stalwart_defender_ii'],
    summary: 'Bulwark: in Defensive Stance, enemy raises against you grant only bonus damage (never trigger Shaken, Stunning Fist, etc.).',
    source: 'pathfinder'
  },

  // --- SOCIAL & WEIRD EDGES (3, APG pp. 75-76) ---
  {
    id: 'pf_swift_support',
    name: 'Swift Support',
    category: 'Social',
    rankRequired: 'Seasoned',
    requirementsText: 'Seasoned, Smarts d8+',
    minAttributes: { smarts: 8 },
    summary: 'If dealt a face card or Joker, you may Support an ally as a limited free action.',
    source: 'pathfinder'
  },
  {
    id: 'pf_duck_and_cover',
    name: 'Duck and Cover',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice',
    summary: 'Choose an ally before rolling Evasion: if neither rolls a Critical Failure, both use the higher Evasion total rolled.',
    source: 'pathfinder'
  },
  {
    id: 'pf_smash',
    name: 'Smash',
    category: 'Weird',
    rankRequired: 'Novice',
    requirementsText: 'Novice, Half-Orc, Strength d10+',
    minAttributes: { strength: 10 },
    summary: 'Character can Ace melee damage rolls when attempting to destroy inanimate objects.',
    source: 'pathfinder'
  },

  // --- LEGENDARY CLASS CAPSTONES & MYTHIC SLAYER (11, APG pp. 76-78) ---
  {
    id: 'pf_holy_champion',
    name: 'Holy Champion',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Paladin Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_paladin'],
    toughnessBonus: 2,
    summary: 'Gain +2 Toughness; hitting an Evil Outsider with Smite Evil can trigger banish using your attack roll.',
    source: 'pathfinder'
  },
  {
    id: 'pf_deadly_performance',
    name: 'Deadly Performance',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Bard Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_bard'],
    summary: '1/encounter Performance vs Spirit within 5": target is Stunned if it wins, or immediately Incapacitated if it loses.',
    source: 'pathfinder'
  },
  {
    id: 'pf_home_ground',
    name: 'Home Ground',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Druid Edges, Spirit d8+',
    requiresWildCard: true,
    minAttributes: { spirit: 8 },
    requiredEdges: ['pf_druid'],
    summary: 'Spend a Benny to recover all PP (1/encounter) while in your Home Ground; concentrate 10 mins to ask 3 questions about it from anywhere.',
    source: 'pathfinder'
  },
  {
    id: 'pf_master_strike',
    name: 'Master Strike',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Rogue Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_rogue'],
    summary: 'Wounding Sneak Attacks force a Vigor roll or put victim to sleep (1d4 hrs), Paralyze, or Slay them.',
    source: 'pathfinder'
  },
  {
    id: 'pf_mythic_slayer',
    name: 'Mythic Slayer',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary',
    requiresWildCard: true,
    summary: 'Ignore the Unstoppable ability on a face card; on a Joker, opponents cannot make Soak rolls against your attacks.',
    source: 'pathfinder'
  },
  {
    id: 'pf_perfect_body',
    name: 'Perfect Body',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Monk Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_monk'],
    summary: 'Become an Outsider, speak all languages, and gain +4 Toughness against nonmagical attacks.',
    source: 'pathfinder'
  },
  {
    id: 'pf_seen_it_before',
    name: 'Seen it Before',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Ranger Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_ranger'],
    summary: 'Add +4 to Evade, resist, or recover from any of your Favored Enemy’s powers or special abilities.',
    source: 'pathfinder'
  },
  {
    id: 'pf_unique_bloodline',
    name: 'Unique Bloodline',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Sorcerer Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_sorcerer'],
    summary: 'Select an additional Sorcerer Bloodline and gain both its base and Advanced Bloodline benefits.',
    source: 'pathfinder'
  },
  {
    id: 'pf_unstoppable_rage',
    name: 'Unstoppable Rage',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Barbarian Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_barbarian'],
    summary: 'Gain the Unstoppable creature ability while Raging.',
    source: 'pathfinder'
  },
  {
    id: 'pf_veteran_of_endless_war',
    name: 'Veteran of Endless War',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Fighter Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_fighter'],
    summary: 'Enemies gain no attack or damage benefit when Wild Attacking you (though they still become Vulnerable).',
    source: 'pathfinder'
  },
  {
    id: 'pf_well_prepared',
    name: 'Well Prepared',
    category: 'Legendary',
    rankRequired: 'Legendary',
    requirementsText: 'Wild Card, Legendary, 2+ Wizard Edges',
    requiresWildCard: true,
    requiredEdges: ['pf_wizard'],
    summary: 'Spend +1 PP to cast an action power as a limited free action (usable while Shaken and with no Multi-Action penalty).',
    source: 'pathfinder'
  }
];

// ============================================================================
// POWERS & COMPLEX CANTRIPS (APG pp. 91-100)
// ============================================================================

export const PF_APG_POWERS: PowerDef[] = [
  {
    id: 'pf_create_pit',
    name: 'Create Pit',
    rankRequired: 'Seasoned',
    powerPoints: '2',
    range: 'Smarts',
    duration: '5',
    summary: 'Conjures an 8-yard deep MBT extradimensional pit; targets in/adjacent must Evade (-2 on raise) or fall for 2d6+2 damage. Modifiers: Soft Ground (+1), Spiked (+1), Deep (+2).',
    damage: '2d6+2',
    source: 'pathfinder'
  },
  {
    id: 'pf_lock_unlock',
    name: 'Lock/Unlock',
    rankRequired: 'Novice',
    powerPoints: '1',
    range: 'Smarts',
    duration: 'Perm / Inst',
    summary: 'Magically seals doors/chests (-4 to pick; magic-only on raise) or uses arcane skill in place of Thievery/Repair to open locks and disarm traps.',
    source: 'pathfinder'
  },
  {
    id: 'pf_magic_jar',
    name: 'Magic Jar',
    rankRequired: 'Heroic',
    powerPoints: '5',
    range: 'Smarts',
    duration: '5 hours',
    summary: "Stores caster's soul in an enchanted vessel and possesses targets (opposed Spirit), keeping caster's Smarts, Spirit & Edges.",
    source: 'pathfinder'
  },
  {
    id: 'pf_summon_monster',
    name: 'Summon Monster',
    rankRequired: 'Novice',
    powerPoints: 'Special (2-10)',
    range: 'Smarts',
    duration: '5',
    summary: 'Conjures loyal celestial or fiendish beasts, elementals, demons, or devils acting on your Action Card (e.g., Fire Beetle 2, Wolf 3, Succubus 6, Glabrezu 10).',
    source: 'pathfinder'
  },
  {
    id: 'pf_summon_natures_ally',
    name: "Summon Nature's Ally",
    rankRequired: 'Novice',
    powerPoints: 'Special (2-11)',
    range: 'Smarts',
    duration: '5',
    summary: 'Channels beasts, giants, elementals, fey (Pixie, Satyr), or magical beasts (Griffon, Manticore, Purple Worm 11) to serve for the duration.',
    source: 'pathfinder'
  },
  {
    id: 'pf_summon_planar_ally',
    name: 'Summon Planar Ally',
    rankRequired: 'Novice',
    powerPoints: 'Special (3-13)',
    range: 'Smarts',
    duration: '5',
    summary: 'Calls extraplanar servants matching your deity/alignment (Archons, Aasimar, Barghests, Demons, Devils, Night Hag, Pit Fiend 13, Balor 12).',
    source: 'pathfinder'
  },
  // Complex Cantrips (APG pp. 99-100; 2 selected on gaining AB, +1 per New Powers; 0 PP, no raises/modifiers)
  {
    id: 'pf_cantrip_feather_fall',
    name: 'Feather Fall (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Smarts',
    duration: '5',
    summary: 'Complex Cantrip: slows falling speed to 60 ft/round and negates all falling damage while active.',
    source: 'pathfinder'
  },
  {
    id: 'pf_cantrip_mage_hand',
    name: 'Mage Hand (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Smarts',
    duration: '1 minute',
    summary: 'Complex Cantrip: telekinetically lift and propel an unattended object up to 5 lbs (3" per limited free action).',
    source: 'pathfinder'
  },
  {
    id: 'pf_cantrip_mending',
    name: 'Mending (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Smarts',
    duration: 'Instant',
    summary: 'Complex Cantrip: 10-minute ritual repairs a damaged (not destroyed) non-magical object weighing up to 50 lbs.',
    source: 'pathfinder'
  },
  {
    id: 'pf_cantrip_minor_bolt',
    name: 'Minor Bolt (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Smarts',
    duration: 'Instant',
    summary: 'Complex Cantrip: energy burst with no Range penalties (still affected by Cover & Illumination) dealing 2d4 damage.',
    damage: '2d4',
    source: 'pathfinder'
  },
  {
    id: 'pf_cantrip_prestidigitation',
    name: 'Prestidigitation (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Smarts',
    duration: '1 hour',
    summary: 'Complex Cantrip: perform minor tricks—lift 1 lb, clean/color/soil, chill/warm/flavor, or conjure fragile crude trinkets.',
    source: 'pathfinder'
  },
  {
    id: 'pf_cantrip_sending',
    name: 'Sending (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Special',
    duration: 'Instant',
    summary: 'Complex Cantrip: 10-minute ritual sends a 25-word message across any distance (5% cross-planar fail chance) with immediate reply.',
    source: 'pathfinder'
  },
  {
    id: 'pf_cantrip_stabilize',
    name: 'Stabilize (Cantrip)',
    rankRequired: 'Novice',
    powerPoints: '0',
    range: 'Smarts',
    duration: 'Instant',
    summary: 'Complex Cantrip: grants a living Bleeding Out creature +2 on its next Vigor roll to stop Bleeding Out.',
    source: 'pathfinder'
  }
];

// ============================================================================
// APG PERSONAL WEAPONS & ALCHEMICAL WEAPONS (APG pp. 87-89)
// ============================================================================

export const PF_APG_WEAPONS_CATALOG: Omit<WeaponItem, 'id' | 'equipped'>[] = [
  { name: 'Battle Aspergillum (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 4, cost: 5, notes: 'Holds holy water (3 attacks); +2 damage vs foes affected by holy water', source: 'pathfinder' },
  { name: 'Bill (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 11, cost: 11, notes: 'Brace, Reach 1, Two Hands, +1 Parry when using Defend', source: 'pathfinder' },
  { name: 'Brass Knuckles (PF)', category: 'Melee', damage: 'Str', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 1, cost: 1, notes: 'Wearer counts as armed; free reroll to conceal', source: 'pathfinder' },
  { name: 'Glaive-Guisarme (PF)', category: 'Melee', damage: 'Str+d10', ap: 2, range: 'Melee', rof: 1, minStr: 10, weight: 10, cost: 12, notes: 'AP 2, Brace, Reach 1, Two Hands', source: 'pathfinder' },
  { name: 'Lucerne Hammer (PF)', category: 'Melee', damage: 'Str+d12', ap: 3, range: 'Melee', rof: 1, minStr: 12, parryMod: -2, weight: 12, cost: 15, notes: 'AP 3, Reach 1, Two Hands, Parry -2', source: 'pathfinder' },
  { name: 'Mancatcher (PF)', category: 'Melee', damage: 'Str', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 10, cost: 15, notes: 'Reach 2, Two Hands; hit prevents target moving away until opposed Str win', source: 'pathfinder' },
  { name: 'Double Crossbow (PF)', category: 'Ranged', damage: '2d8', ap: 2, range: '15/30/60', rof: 1, minStr: 8, weight: 18, cost: 300, notes: 'AP 2; Shoot at -2 to fire both bolts (3d8); Reload 3 (both) or 2 (one)', source: 'pathfinder' },
  { name: 'Pilum (PF)', category: 'Thrown', damage: 'Str+d6', ap: 0, range: '3/6/12', rof: 1, minStr: 6, weight: 4, cost: 5, notes: 'Head breaks off; raise lodges in shield negating shield bonus until removed', source: 'pathfinder' },
  // APG Alchemical Weapons (p. 89)
  { name: 'Alkali Flask (PF)', category: 'Thrown', damage: '2d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 15, notes: 'SBT; affects oozes & acid-based creatures as acid (harmless to others)', source: 'pathfinder' },
  { name: 'Flash Powder (PF)', category: 'Thrown', damage: '0', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 0.1, cost: 50, notes: 'SBT; creatures blinded (as blind spell) until end of next turn', source: 'pathfinder' },
  { name: 'Liquid Ice (PF)', category: 'Thrown', damage: '2d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 2, cost: 40, notes: 'SBT cold damage, or freezes liquids/surfaces over 1d6 rounds', source: 'pathfinder' },
  { name: 'Smoke Pellet (PF)', category: 'Thrown', damage: '0', ap: 0, range: '3/6/9', rof: 1, minStr: 4, weight: 0.1, cost: 25, notes: 'SBT smoke cloud (like smokestick) lasting 1 round', source: 'pathfinder' }
];

// ============================================================================
// APG GEAR, AMMUNITION & ALCHEMICAL ITEMS (APG pp. 86-89)
// ============================================================================

export const PF_APG_GEAR_CATALOG: Omit<GearItem, 'id'>[] = [
  { name: 'Chalkboard', quantity: 1, weight: 2, cost: 1, source: 'pathfinder' },
  { name: 'Earplugs', quantity: 1, weight: 0, cost: 0.03, notes: 'Free reroll to resist hearing effects; -2 on hearing rolls', source: 'pathfinder' },
  { name: 'Bomb Launcher', quantity: 1, weight: 0.5, cost: 10, notes: 'Increases thrown bomb Short Range by +2" (consumed on use)', source: 'pathfinder' },
  { name: 'Marbles (Bag)', quantity: 1, weight: 2, cost: 0.1, notes: 'Creates Difficult Ground in a Small Blast Template', source: 'pathfinder' },
  { name: 'Scroll Case (holds 2 scrolls)', quantity: 1, weight: 0.5, cost: 1, source: 'pathfinder' },
  { name: 'Signal Horn', quantity: 1, weight: 2, cost: 1, source: 'pathfinder' },
  { name: 'Smoked Goggles', quantity: 1, weight: 0, cost: 10, notes: 'Free reroll vs sight effects; -2 sight rolls & foes have Light Cover', source: 'pathfinder' },
  { name: 'Swarmsuit', quantity: 1, weight: 10, cost: 20, notes: 'Pace -2; +4 Armor vs swarms', source: 'pathfinder' },
  { name: 'Weak Magnet', quantity: 1, weight: 0.5, cost: 0.5, source: 'pathfinder' },
  { name: 'Weapon Cord', quantity: 1, weight: 0, cost: 0.1, notes: 'Retrieve dropped attached weapon as a limited free action', source: 'pathfinder' },
  { name: 'Animal Cage, Small', quantity: 1, weight: 60, cost: 15, source: 'pathfinder' },
  { name: 'Animal Cage, Medium', quantity: 1, weight: 240, cost: 30, source: 'pathfinder' },
  { name: 'Animal Cage, Large', quantity: 1, weight: 960, cost: 60, source: 'pathfinder' },
  { name: 'Dog Sled', quantity: 1, weight: 300, cost: 20, source: 'pathfinder' },
  { name: 'Loaded Dice', quantity: 1, weight: 0, cost: 25, notes: 'Notice at -2 to spot tampering', source: 'pathfinder' },
  { name: 'Marked Cards', quantity: 1, weight: 1, cost: 1, notes: 'Notice at -2 to spot markings', source: 'pathfinder' },
  { name: 'Abacus', quantity: 1, weight: 2, cost: 2, source: 'pathfinder' },
  { name: "Alchemist's Kit", quantity: 1, weight: 5, cost: 25, notes: 'Required for brewing Extracts and crafting alchemical items', source: 'pathfinder' },
  { name: 'Bear Trap', quantity: 1, weight: 10, cost: 2, notes: '2d6 damage; captured prey must pass Strength check to escape', source: 'pathfinder' },
  { name: 'Compass', quantity: 1, weight: 0.5, cost: 10, source: 'pathfinder' },
  { name: 'Drill (1" head)', quantity: 1, weight: 1, cost: 5, source: 'pathfinder' },
  { name: "Fortune-Teller's Deck (Common)", quantity: 1, weight: 0.5, cost: 1, source: 'pathfinder' },
  { name: "Fortune-Teller's Deck (Quality)", quantity: 1, weight: 1, cost: 25, source: 'pathfinder' },
  { name: 'Arrows, Flight (20)', quantity: 1, weight: 2, cost: 2, notes: 'Increases bow Range by +2" but lowers one damage die one step', source: 'pathfinder' },
  { name: 'Arrows, Smoke (20)', quantity: 1, weight: 3, cost: 10, notes: 'No damage; SBT lowers Illumination by one level for 2 rounds', source: 'pathfinder' },
  { name: "Alchemist's Kindness", quantity: 1, weight: 0, cost: 10, notes: 'Eliminates hangover within 10 minutes', source: 'pathfinder' },
  { name: 'Bloodblock', quantity: 1, weight: 0, cost: 25, notes: 'Crafting -2; ends Rending attack & Bleeding Out', source: 'pathfinder' },
  { name: 'Nushadir', quantity: 1, weight: 1, cost: 10, notes: 'Neutralizes 1 cu. ft. of standing acid in 1 minute', source: 'pathfinder' },
  { name: 'Smelling Salts', quantity: 1, weight: 1, cost: 25, notes: 'Crafting -2, 12 uses; grants Spirit roll to wake from magical or mundane sleep', source: 'pathfinder' },
  { name: 'Weapon Blanch, Adamantine', quantity: 1, weight: 0.5, cost: 100, notes: 'Crafting -2; coats 1 weapon/10 ammo so next hit triggers Adamantine Weakness', source: 'pathfinder' },
  { name: 'Weapon Blanch, Cold Iron', quantity: 1, weight: 0.5, cost: 20, notes: 'Coats 1 weapon/10 ammo so next hit triggers Cold Iron Weakness', source: 'pathfinder' },
  { name: 'Weapon Blanch, Silver', quantity: 1, weight: 0.5, cost: 5, notes: 'Coats 1 weapon/10 ammo so next hit triggers Silver Weakness', source: 'pathfinder' }
];

// ============================================================================
// APG REFERENCE DATA (Rules Updates, Alternate Ancestries, Class Trees, Magic Items)
// ============================================================================

export interface PfApgRuleUpdate {
  title: string;
  summary: string;
}

export const PF_APG_RULES_UPDATES: PfApgRuleUpdate[] = [
  {
    title: 'Armor Restriction & Armor Interference (Updated)',
    summary: 'Armor Restriction (Type): While wearing armor or using shields heavier than the listed type, you cannot use ANY abilities granted by that Edge or Edges requiring it. Armor Interference (Type): Arcane skill rolls suffer -4 AND other abilities of that Edge (and dependent Edges) are disabled.'
  },
  {
    title: 'Villainous Conviction',
    summary: 'Important Wild Card villains gain Conviction whenever they succeed at a significant goal or the heroes fail in a task tied to their scheme, incentivizing decisive hero action.'
  },
  {
    title: 'Bound & Entangled Updates',
    summary: 'Destroying an entanglement with an appropriate weapon hits automatically (Wild Attack +2 allowed); typical ropes/webs/nets have Hardness 4. Freeing yourself removes Entangled, though area-effect restraints must still be escaped individually.'
  },
  {
    title: 'Powers with Touch Limitation',
    summary: 'When a power takes the Touch Limitation, it costs a minimum of 1 PP (never 0) and is activated with a single arcane skill roll (requiring only a Touch Attack of Fighting or Athletics to hit when unwilling).'
  },
  {
    title: 'New Power Modifiers (APG Ch. 4)',
    summary: 'Dispel: Remove Curse (+2 PP) ignores -2 vs curse and ends cursed items. Environmental Protection: Planar Adaptation (+2 PP) negates planar hazards (1 hr). Protection: Shield Other (+1 PP) lets caster intercept ally Wounds with free Soak reroll. Smite: Spiritual Weapon (+2 PP) creates ranged energy weapon (Spr+d4 / Spr+d6). Sound/Silence: Alarm (+1/+2 PP) wards object/5" area 10 hrs. Elemental Manipulation adds Power (+3) & Weather (+5); Entangle adds Tough (+1, Hardness 10) & Deadly (+4); Telekinesis adds Power (+3).'
  }
];

export interface PfAltAncestryGroup {
  ancestry: string;
  options: Array<{ name: string; replaces: string; effect: string }>;
}

export const PF_APG_ALTERNATE_ANCESTRIES: PfAltAncestryGroup[] = [
  {
    ancestry: 'Aasimar',
    options: [
      { name: 'Celestial Crusader', replaces: 'Diplomatic', effect: 'Gain Favored Enemy (Outsider) as per the Ranger Class Edge.' },
      { name: 'Exalted Resistance', replaces: 'Spirited', effect: 'Gain the Arcane Resistance Edge even without meeting Requirements.' },
      { name: 'Halo', replaces: 'Darkvision', effect: 'Daylight manifests as a golden halo granting a free reroll on Tests vs evil creatures.' }
    ]
  },
  {
    ancestry: 'Catfolk',
    options: [
      { name: "Cat's Claws", replaces: 'Agile', effect: 'Gain retractable claws dealing Str+d4 Natural Weapon damage.' },
      { name: 'Nimble Faller', replaces: 'Sprinter', effect: 'Land on feet when taking fall damage and reduce falling damage by 1d6+1.' },
      { name: 'Scent', replaces: 'Low Light Vision', effect: 'Ignore up to 4 points of penalties attacking foes hidden by magical darkness, invisibility, or similar effects.' }
    ]
  },
  {
    ancestry: 'Dhampir',
    options: [
      { name: 'Dayborn', replaces: 'Light Sensitive & Night Vision', effect: 'Unhindered by bright light; replaces Night Vision with Low Light Vision.' },
      { name: 'Fangs', replaces: 'Undead Resistance', effect: 'Gain a bite Natural Weapon dealing Str+d4 damage.' },
      { name: 'Vampiric Empathy', replaces: 'Detect Undead', effect: 'Communicate with bats, rats, and wolves with a free reroll on failed Persuasion rolls with them.' }
    ]
  },
  {
    ancestry: 'Goblin',
    options: [
      { name: 'Eat Anything', replaces: 'Capable Rider', effect: 'Free reroll on Survival checks to forage and +2 Vigor when consuming toxic substances.' },
      { name: 'Hard Head, Big Teeth', replaces: 'Sneaky', effect: 'Gain a bite Natural Weapon dealing Str+d4 damage.' },
      { name: 'Over-Sized Ears', replaces: 'Capable Rider', effect: 'Start with a d6 in Notice instead of d4 (increases maximum Notice to d12+1).' }
    ]
  },
  {
    ancestry: 'Tiefling',
    options: [
      { name: 'Fiendish Sprinter', replaces: 'Intelligence', effect: 'Gain the Fleet-Footed Edge.' },
      { name: 'Prehensile Tail', replaces: 'Fiendish Sorcery', effect: 'Retrieve stowed objects carried on your person as a free action.' },
      { name: 'Vestigial Wings', replaces: 'Fiendish Sorcery', effect: 'Fly at Pace 6 (Vigor roll at end of each round spent flying or suffer Fatigue).' }
    ]
  },
  {
    ancestry: 'Dwarf (Expanded)',
    options: [
      { name: 'Minesight', replaces: 'Darkvision', effect: 'Gain Night Vision, but automatically Shaken in bright light and -1 sight rolls while in bright light.' },
      { name: 'Rock Stepper', replaces: 'Stonecunning', effect: 'Ignore Difficult Ground caused by rubble, broken ground, steep stairs, or similar rocky terrain.' },
      { name: 'Stonesinger', replaces: 'Stonecunning', effect: '+2 to arcane skill total when spending a Benny to reroll a power with an earth or stone Trapping.' }
    ]
  },
  {
    ancestry: 'Elf (Expanded)',
    options: [
      { name: 'Desert Runner', replaces: 'Elven Magic', effect: 'Free reroll to avoid Fatigue/Exhaustion from forced marches, thirst, starvation, or heat/cold.' },
      { name: 'Dreamspeaker', replaces: 'Keen Senses', effect: '+1 to resist sleep deprivation Fatigue; send a remembered dream message nightly to a known sleeper.' },
      { name: 'Urbanite', replaces: 'Keen Senses', effect: 'Free reroll when Networking in urban environments.' }
    ]
  },
  {
    ancestry: 'Gnome (Expanded)',
    options: [
      { name: 'Eternal Hope', replaces: 'Keen Senses', effect: 'Add +1 to Fear checks.' },
      { name: 'Gift of Tongues', replaces: 'Obsessive', effect: 'Learn two additional languages of choice.' },
      { name: 'Warden of Nature', replaces: 'Obsessive', effect: 'Gain +1 Parry against Aberrations, Oozes, and Vermin.' }
    ]
  },
  {
    ancestry: 'Half-Elf (Expanded)',
    options: [
      { name: 'Drow Magic', replaces: 'Elven Magic', effect: 'Gain 1 PP and cast darkness using Smarts (or your arcane skill).' },
      { name: 'Wary', replaces: '(No base replacement; adds Minor Suspicious)', effect: 'Free reroll when deceiving others or detecting lies; gain Suspicious (Minor) without Hindrance points.' }
    ]
  },
  {
    ancestry: 'Half-Orc (Expanded)',
    options: [
      { name: 'Sacred Tattoo', replaces: 'Orc Ferocity', effect: 'Gain one extra Novice power the first time you take an Arcane Background.' },
      { name: 'Scavenger', replaces: 'Intimidating', effect: '+1 Notice to find traps/hidden objects, spot spoiled food, or identify potions by taste.' },
      { name: 'Skilled', replaces: 'Darkvision', effect: 'Start with 14 skill points instead of 12.' }
    ]
  },
  {
    ancestry: 'Halfling (Expanded)',
    options: [
      { name: 'Adaptable Luck', replaces: 'Lucky', effect: 'Once per session, spend a Benny to reroll a Critical Failure.' },
      { name: 'Fleet of Foot', replaces: 'Keen Senses', effect: 'Draw 1 extra Action Card in Quick Chases and ignore Pace reductions from Wound penalties.' },
      { name: 'Low Blow', replaces: 'Sure-Footed', effect: 'Gain +2 AP when attacking creatures at least 3 Sizes larger than yourself.' }
    ]
  }
];

export const PF_APG_COMMON_NAMES: Array<{ ancestry: string; male: string; female: string }> = [
  { ancestry: 'Aasimar', male: 'Aritian, Beltin, Cernan, Cronwier, Eran, Ilamin, Maudril, Okrin, Parant, Tural, Wyran, Zaigan', female: 'Arken, Arsinoe, Davina, Drinma, Imesah, Masozi, Nijena, Niramour, Ondrea, Rhialla, Valtyra' },
  { ancestry: 'Catfolk', male: 'Carruth, Drewan, Ferus, Gerran, Nyktan, Rouqar, Zithembe', female: 'Alyara, Duline, Hoya, Jilyana, Milah, Miniri, Siphelele, Tiyeri' },
  { ancestry: 'Dhampir', male: 'Keep human birth name (+ event or birthplace surname)', female: 'Keep human birth name (+ event or birthplace surname)' },
  { ancestry: 'Goblin', male: 'Boorgub, Gogmurch, Rotfoot, Zobmaggle', female: 'Geedra, Goomluga, Hoglob, Luckums' },
  { ancestry: 'Tiefling', male: 'Baru, Dellisar, Maldrek, Molos, Sarvin, Shoremoth, Temerith, Voren, Zoren', female: 'Allizsah, Indranna, Kasidra, Kilarra, Mellisan, Mordren, Nisha' }
];

export const PF_APG_ALCHEMIST_FEATURES = {
  bombsAndMutagens: [
    'Bombs: Limited action, 2 PP, Alchemy roll, Range 10", 2d6 SBT (+1 PP -> 3d6; +1 PP -> MBT; Critical Failure empties chemicals until resupplied).',
    'Extracts: Prepared in 1 hour with formulae book & kit (PP spent on drinking/use); powers with Range > Touch must take Touch Limitation.',
    'Mutagens (1 hr, 2 PP, 1 active): Grants +1 Toughness plus chosen boost — Strength (+2 Str & melee dmg / -2 Academics, Common Knowledge, Occult, Repair, Science, arcane), Agility (-1 incoming direct attacks / -2 Healing, Notice, Survival, Taunt), or Vigor (+2 Vigor / -2 Battle, Gambling, Performance, Persuasion).'
  ],
  discoveries: [
    { tier: 'Discovery (S)', name: 'Extend Potion', effect: 'Double Duration of any potion, extract, or mutagen (> Instant).' },
    { tier: 'Discovery (S)', name: 'Fast Bombs', effect: 'Spend +1 PP to mix & throw a bomb as an action instead of a limited action.' },
    { tier: 'Discovery (S)', name: 'Dilution', effect: '1/day split one potion/elixir into 2 doses for 25% market gp value.' },
    { tier: 'Discovery (S)', name: 'Feral Mutagen', effect: 'Mutagens grow claws & fangs (Str+d6) and grant +2 Intimidation.' },
    { tier: 'Advanced (V)', name: 'Combine Extracts', effect: '1/day combine two formulae into one extract activated with a single roll.' },
    { tier: 'Advanced (V)', name: 'Eternal Youth', effect: 'Immune to aging penalties and cancels the Elderly Hindrance.' },
    { tier: 'Advanced (V)', name: 'Instant Alchemy', effect: 'Limited action + Alchemy roll creates any mundane alchemical item instantly.' },
    { tier: 'Advanced (V)', name: 'Delayed Bomb', effect: 'Set bomb timer up to 10 rounds; may reclaim PP or disarm via Thievery / dispel.' },
    { tier: 'Grand (H)', name: 'Fast Healing', effect: 'Gain the Fast Regeneration ability (even while Incapacitated).' },
    { tier: 'Grand (H)', name: 'Elixir of Life', effect: '1/day brew (25,000 gp, 1 hr) a resurrection elixir or drink to auto-revive within 5 days.' },
    { tier: 'Grand (H)', name: "Philosopher's Stone", effect: '1/month craft a Philosopher’s Stone (Hardness 14; transmutes metals or creates Oil of Life) at no cost.' },
    { tier: 'Grand (H)', name: 'Eternal Potion', effect: 'Keep one non-Instant potion effect active permanently until replaced or dispelled.' }
  ]
};

export interface PfCavalierOrderDef {
  name: string;
  edicts: string;
  challenge: string;
  orderAbility: string;
}

export const PF_APG_CAVALIER_ORDERS: PfCavalierOrderDef[] = [
  { name: 'Order of the Cockatrice', edicts: 'Always put self-interest, prestige, and equal/greater loot shares first.', challenge: '+2 damage to Fighting attacks against challenged target.', orderAbility: 'Steal Glory: 1/round make a free attack when an ally attacks a foe in your Reach.' },
  { name: 'Order of the Dragon', edicts: 'Remain fiercely loyal, protect allies, and defend the group’s honor.', challenge: 'Limited action grants allies +2 Fighting against your challenged target until end of round.', orderAbility: 'Aid Allies: Allies you Support also add your Support bonus to their Parry for the round.' },
  { name: 'Order of the Lion', edicts: 'Protect sovereign’s life/realm above all and obey their commands.', challenge: 'Challenged target is Distracted whenever you are within 10".', orderAbility: 'Shield of the Liege: Redirect any melee or ranged attack targeting an adjacent ally to yourself.' },
  { name: 'Order of the Shield', edicts: 'Protect common folk, give charity, and never harm the defenseless.', challenge: '+2 on opposed Tests against your challenged target.', orderAbility: 'Stem the Tide: 1/round free attack when an enemy enters Reach; hit stops movement & makes them Vulnerable.' },
  { name: 'Order of the Star', edicts: 'Protect chosen faith, adhere to its tenets, and aid its clergy.', challenge: 'Challenged target subtracts 2 from arcane skill rolls.', orderAbility: 'Calling: 1/encounter limited free action prayer grants +2 to one Trait for 5 rounds.' },
  { name: 'Order of the Sword', edicts: 'Uphold chivalry, courage, mercy, justice, and your liege’s honor.', challenge: 'Free reroll on failed Fighting rolls against your challenged target.', orderAbility: 'Mounted Mastery: Add mount’s Strength die to mounted charge damage instead of +4.' }
];

export const PF_APG_ORACLE_CURSES: Array<{ name: string; summary: string }> = [
  { name: 'Clouded Vision', summary: 'Cannot see beyond 5" (no Bad Eyes/Blind); gains Blindsense 5" (ignores invisibility, illusion, Illumination).' },
  { name: 'Deaf', summary: 'Gains Hard of Hearing (Major); gains Innate Power: major detect arcana (self only).' },
  { name: 'Haunted', summary: 'Retrieving stowed items is an action & dropped items scatter d6"; Innate Power: minor fly (levitate up/down only).' },
  { name: 'Lame', summary: '-2 Pace (no Slow/Fleet-Footed); ignores 1 Fatigue penalty and Wound Pace reductions.' },
  { name: 'Tongues', summary: 'Choose 2 planar/exotic languages: only understand/speak those in stress/combat; Innate Power: minor speak language (self).' },
  { name: 'Wasting', summary: 'Slowly rotting body: gains Ugly (Minor) and Immunity to Disease.' }
];

export interface PfOracleMysteryDef {
  name: string;
  deities: string;
  powers: string[];
  greaterRevelation: string;
}

export const PF_APG_ORACLE_MYSTERIES: PfOracleMysteryDef[] = [
  { name: 'Battle', deities: 'Cayden Cailean, Gorum, Iomedae, Rovagug', powers: ['Barrier', 'Deflection', 'Growth/Shrink', 'Stun'], greaterRevelation: 'Battlecry: 1/encounter limited action gives allies within 12" +1 to Trait rolls for 5 rounds.' },
  { name: 'Bones', deities: 'Norgorber, Pharasma, Urgathoa', powers: ['Bolt', 'Damage Field', 'Fear', 'Zombie'], greaterRevelation: 'Soul Siphon: Limited action Faith roll within Smarts inflicts Energy Drain (Spirit or Vigor).' },
  { name: 'Flame', deities: 'Asmodeus, Sarenrae', powers: ['Burst', 'Darksight', 'Environmental Protection', 'Smite'], greaterRevelation: 'Form of Flame: 1/encounter become Fire Elemental (10 rds), Fire Immune + Major Damage Field (5 rds), or Fiery Wings (Pace 12, 10 mins).' },
  { name: 'Heavens', deities: 'Desna, Gozreh, Pharasma, Sarenrae', powers: ['Banish', 'Confusion', 'Divination', 'Fly'], greaterRevelation: 'Mantle of Moonlight: Lycanthropy immunity + Touch Attack to force shapechange or toggle Rage 1/encounter.' },
  { name: 'Life', deities: 'Gozreh, Pharasma, Sarenrae', powers: ['Healing', 'Light/Darkness', 'Relief', 'Sanctuary'], greaterRevelation: 'Energy Body: 1/encounter Elemental form (5 rds), MBT light, 2d4 dmg to undead inside, and -1 PP cost on healing.' },
  { name: 'Lore', deities: 'Abadar, Irori, Nethys', powers: ['Detect/Conceal Arcana', 'Speak Language', 'Locate', 'Time Stop'], greaterRevelation: 'Spontaneous Symbology: Spend a Benny to cast any power of your Rank or lower once without learning it.' },
  { name: 'Nature', deities: 'Erastil, Gozreh', powers: ['Beast Friend', 'Elemental Manipulation', 'Shape Change', "Summon Nature's Ally"], greaterRevelation: 'Spirit of Nature: Gain Fast Regeneration until Incapacitated.' },
  { name: 'Stone', deities: 'Abadar, Gorum, Torag', powers: ['Barrier', 'Burrow', 'Create Pit', 'Protection'], greaterRevelation: 'Steelbreaker Skin: 1/encounter (5 rds) attacking weapons take 1d6 + up to 3d6 dmg (spend PP); negates hit if weapon shatters.' },
  { name: 'Waves', deities: 'Gozreh, Pharasma', powers: ['Barrier', 'Environmental Protection', 'Havoc', 'Intangibility'], greaterRevelation: 'Storm: 1/day conjure half-mile 5-round outdoor storm (24" vis, -1 Illum) + 2d6 LBT hailstorm limited free action.' },
  { name: 'Wind', deities: 'Gozreh, Shelyn', powers: ['Deflection', 'Fly', 'Havoc', 'Elemental Manipulation'], greaterRevelation: 'Lightning Breath: Limited action Stream Template minor burst (or spend 2 PP for major burst).' }
];

export const PF_APG_EIDOLON_EVOLUTIONS = {
  baseForms: [
    'Biped: Agility d6, Smarts d4, Spirit d6, Strength d6, Vigor d6; Pace 7, Parry 5, Toughness 6 (1); Bash (Str+d4), Limbs (Arms & Legs).',
    'Quadruped: Same Traits; Pace 8, Parry 5, Toughness 6 (1); Bite (Str+d4), Limbs (Legs x2).',
    'Serpentine: Same Traits; Pace 6, Parry 5, Toughness 6 (1); Bash (Tail, Str+d4, Reach 1), Climb (Wall Walker 6), Limbs (Tail).'
  ],
  evolutions: [
    { rank: 'Novice', cost: '2 (+1)', name: 'Aquatic', summary: 'Native swimmer, cannot drown, swims at Pace (+4 Pace for +1 pt).' },
    { rank: 'Novice', cost: '1–2', name: 'Armor Piercing', summary: 'One Natural Weapon (Bite, Claws, Hooves, Horns) gains AP 2 (AP 4 for 2 pts).' },
    { rank: 'Novice', cost: '2', name: 'Attribute Increase', summary: 'Increase one attribute by one die type (4 pts if Huge).' },
    { rank: 'Novice', cost: '1', name: 'Bash / Bite / Hooves / Horns', summary: 'Str+d4 Natural Attack (Horns +4 dmg on 5" charge).' },
    { rank: 'Novice', cost: '1', name: 'Burrow / Climb', summary: 'Gains Burrow or Wall Walker at regular Pace.' },
    { rank: 'Novice', cost: '2', name: 'Claws', summary: 'Requires Arms/Legs; Str+d4 Claws.' },
    { rank: 'Novice', cost: '1', name: 'Environmental Resistance', summary: 'Resistance to acid, cold, electricity, or fire (repeatable).' },
    { rank: 'Novice', cost: '1', name: 'Improved Damage', summary: 'Increase one Natural Weapon damage die by one step.' },
    { rank: 'Novice', cost: '1', name: 'Improved Natural Armor', summary: '+2 Armor (take up to twice per Rank).' },
    { rank: 'Novice', cost: '1', name: 'Limbs (Legs / Arms / Tail)', summary: 'Extra Legs (+1 Pace), Arms (wield weapons), or Tail (enables Stinger).' },
    { rank: 'Novice', cost: '2', name: 'Mount', summary: 'Size +2, +1 Strength/Vigor step, +4 Pace.' },
    { rank: 'Novice', cost: '2', name: 'New Edge', summary: 'Gain any non-Class Edge meeting requirements.' },
    { rank: 'Novice', cost: '1', name: 'Reach', summary: '+1 Reach on one attack (up to 3 times per attack form).' },
    { rank: 'Novice', cost: '3', name: 'Rend', summary: 'Requires Claws/Pincers; victims bleed on Vigor failure each turn.' },
    { rank: 'Novice', cost: '2', name: 'Skilled', summary: '+1 step to 1 skill >= linked Attr, or +1 step to 2 skills < linked Attr.' },
    { rank: 'Novice', cost: '1', name: 'Stinger', summary: 'Requires Tail; Str+d4, AP 2.' },
    { rank: 'Novice', cost: '3', name: 'Swallow Whole', summary: 'Requires Bite; swallows smaller targets (Evasion / -2 Vigor).' },
    { rank: 'Novice', cost: '2', name: 'Swat', summary: 'Ignores up to 4 points of Scale penalties.' },
    { rank: 'Seasoned', cost: '3', name: 'Blindsense', summary: 'Ignores invisibility, illusion, and all Illumination penalties.' },
    { rank: 'Seasoned', cost: '4 (+1)', name: 'Breath Weapon', summary: 'Cone or Stream 3d6 elemental damage (1/encounter +1 use per pt, max 3).' },
    { rank: 'Seasoned', cost: '1–2', name: 'Energy Attacks', summary: 'Limited action charges attacks for +2 (+4 for 2 pts) elemental dmg for 5 rds.' },
    { rank: 'Seasoned', cost: '2–4', name: 'Flight', summary: 'Winged Flight Pace 6 (3 pts -> Pace 12; 4 pts -> magical wingless Flight).' },
    { rank: 'Seasoned', cost: '2', name: 'Grab', summary: 'Free grapple (+2 on raise) when Shaking/Wounding same/smaller foe.' },
    { rank: 'Seasoned', cost: '3', name: 'Immunity', summary: 'Immune to acid, cold, electricity, or fire.' },
    { rank: 'Seasoned', cost: '4', name: 'Large', summary: 'Size 4, +2 Str/Vig steps, +2 Armor (Reach 1 if Biped).' },
    { rank: 'Seasoned', cost: '2', name: 'Pincers / Pounce / Trample', summary: 'Pincers (Str+d4, free Grab reroll), Pounce (Quadruped +4 Wild Attack), Trample (Str+d6/d8).' },
    { rank: 'Seasoned', cost: '1–5', name: 'Poison', summary: 'Mild toxin on Bite/Sting (+2 Knockout/Lethal; +2 Vigor -2).' },
    { rank: 'Seasoned', cost: '2–4', name: 'Tentacle', summary: '2 Tentacle actions Reach 2, Str+d4 (4 actions for 4 pts).' },
    { rank: 'Seasoned', cost: '3', name: 'Web', summary: 'Requires Climb; shoot Hardness 8 webbing up to 24".' },
    { rank: 'Veteran', cost: '3', name: 'Fast Healing', summary: 'Fast Regeneration (Vigor roll every round even while Incap).' },
    { rank: 'Veteran', cost: '3–6', name: 'Frightful Presence', summary: 'Gains Fear (or Fear -2 for 6 pts).' },
    { rank: 'Veteran', cost: '6', name: 'Huge (Req. Large)', summary: 'Size 8, +2 Str/Vig steps, +2 Armor, Reach 1 (2 if Biped).' }
  ]
};

export const PF_APG_WITCH_HEXES: Array<{ tier: string; name: string; effect: string }> = [
  { tier: 'Hex', name: 'Agony', effect: 'Limited action opposed Spirit within Smarts -> Distracted or Vulnerable (both on raise).' },
  { tier: 'Hex', name: 'Augment', effect: 'Cast curse or fly as a limited free action (does not grant powers).' },
  { tier: 'Hex', name: 'Blight', effect: 'Wither plants in 2x Smarts radius, or Touch Spellcasting (-4 Toughness on Animal/Plant until Spirit roll).' },
  { tier: 'Hex', name: 'Cackle', effect: 'Free action cackle: Distracted/Vulnerable foes within 10" cannot clear those conditions.' },
  { tier: 'Hex', name: 'Charm / Evil Eye / Healing', effect: 'Cast beast friend & puppet (Charm), boost/lower Trait & slumber (Evil Eye), or healing & relief (Healing) as limited free actions.' },
  { tier: 'Major Hex', name: "Hag's Eye", effect: 'Create invisible flying eyeball (Flight 6) within Smarts up to 10 mins/day.' },
  { tier: 'Major Hex', name: 'Nightmares', effect: 'Curse target within 2x Smarts: Spirit -2 or suffer sleepless Fatigue until passing roll.' },
  { tier: 'Major Hex', name: 'Vision', effect: '1-min touch grants cryptic glimpse of target’s future (cannot target self).' },
  { tier: 'Major Hex', name: 'Waxen Image', effect: 'Gain puppet; mold wax effigy (limited action) to cast puppet at any distance (+2 if visible).' },
  { tier: 'Major Hex', name: 'Weather Control', effect: 'Cast elemental manipulation with Weather Epic Modifier 1/day at 0 PP.' },
  { tier: 'Grand Hex', name: 'Death Curse', effect: 'Action within 5": Spirit check or take 1 Fatigue/rd until Incap then Vigor or die (success = 3d6 AP Heavy dmg).' },
  { tier: 'Grand Hex', name: 'Eternal Slumber', effect: 'Limited action Spellcasting Touch Attack (or poisoned dish): Spirit (-2 on raise) or sleep until wish / witch slain.' },
  { tier: 'Grand Hex', name: 'Forced Reincarnation', effect: 'Spellcasting within Smarts vs Spirit (-2 on raise) slays and reincarnates victim on d100 ancestry table.' }
];

export const PF_APG_ENCHANTMENTS: Array<{ kind: 'Armor & Shield' | 'Weapon'; name: string; pts: number; cost: string; craft: string; effect: string }> = [
  { kind: 'Armor & Shield', name: 'Champion', pts: 1, cost: '4,000 gp', craft: 'Deflection', effect: 'Armor only (good creatures with Challenge or Smite Evil): challenged/smited target suffers -2 melee attacks vs wearer.' },
  { kind: 'Armor & Shield', name: 'Determination', pts: 2, cost: '30,000 gp', craft: 'Healing', effect: 'Grants the Nerves of Steel Edge while worn/borne.' },
  { kind: 'Armor & Shield', name: 'Jousting', pts: 1, cost: '3,750 gp', craft: 'Boost Trait', effect: 'Armor only: +2 to Riding rolls.' },
  { kind: 'Armor & Shield', name: 'Righteous', pts: 2, cost: '27,000 gp', craft: 'Boost Trait, growth', effect: 'Armor only (non-Evil): 1/day limited action grow Size +3 (+3 Str steps, +3 Toughness) for 5 rounds.' },
  { kind: 'Weapon', name: 'Allying', pts: 1, cost: '4,000 gp', craft: 'Illusion', effect: 'Melee only: grants Formation Fighter Edge while used.' },
  { kind: 'Weapon', name: 'Dueling', pts: 2, cost: '14,000 gp', craft: 'Boost Trait', effect: '1-hand Melee only: grants Quick Edge while drawn & free reroll on Disarm/Called Shot on held items.' },
  { kind: 'Weapon', name: 'Huntsman', pts: 1, cost: '4,000 gp', craft: 'Boost Trait', effect: '+1 to Survival (Tracking) rolls while held.' },
  { kind: 'Weapon', name: 'Transformative', pts: 1, cost: '10,000 gp', craft: 'Conjure item', effect: 'Melee only: reshapes into any other melee weapon of matching shape & handedness on command.' }
];

export interface PfApgMagicItemDef {
  category: 'Armor & Shields' | 'Weapons' | 'Rings' | 'Rods' | 'Staves' | 'Wondrous Items' | 'Cursed Items';
  name: string;
  price: string;
  weight: string;
  craft: string;
  summary: string;
}

export const PF_APG_MAGIC_ITEMS: PfApgMagicItemDef[] = [
  // Armor & Shields (APG pp. 107-108)
  { category: 'Armor & Shields', name: 'Armor of Insults', price: '16,175 gp', weight: '20 lbs', craft: 'Confusion; 7,675 gp', summary: 'Leather (+3, Aegis). 1/day limited action taunts foes within 10" (Spirit or forced to attack wearer for 5 rounds).' },
  { category: 'Armor & Shields', name: 'Battlement Shield', price: '16,180 gp', weight: '45 lbs', craft: 'Barrier; 8,180 gp', summary: 'Heavy shield (Deflecting). 1/day action transforms into a 10x10x1 ft masonry battlement wall with arrow slits.' },
  { category: 'Armor & Shields', name: 'Boneless Leather', price: '12,160 gp', weight: '15 lbs', craft: 'Disguise; 6,160 gp', summary: 'Leather (+3/+5 vs blades, Aegis). Wearer is never Distracted or Vulnerable from Bound/Entangled.' },
  { category: 'Armor & Shields', name: "Buccaneer's Breastplate", price: '23,850 gp', weight: '30 lbs', craft: 'Env. protection; 12,100 gp', summary: 'Breastplate (+5, Aegis). Water-walk at normal Pace; rises rapidly if donned underwater.' },
  { category: 'Armor & Shields', name: 'Folding Plate', price: '12,650 gp', weight: '—', craft: 'Conjure item; 7,650 gp', summary: 'Brooch that unfolds as an action into full Plate Armor (+4, Aegis) when unarmored.' },
  { category: 'Armor & Shields', name: 'Fortress Shield', price: '19,180 gp', weight: '45 lbs', craft: 'Barrier; 9,680 gp', summary: 'Heavy shield (Arrow Deflecting). Limited action encloses bearer in an airtight 1-inch iron cube (Hardness 13).' },
  { category: 'Armor & Shields', name: 'Giant-Hide Armor', price: '39,165–76,665 gp', weight: '25 lbs', craft: 'Shape change; 19,660–38,415 gp', summary: 'Hide (+3, Aegis, Fortification). 1/day limited action grow to matched Giant size for 15 mins.' },
  // Weapons (pp. 108-110)
  { category: 'Weapons', name: 'Beaststrike Club', price: '7,300 gp', weight: '3 lbs', craft: 'Smite; 3,800 gp', summary: 'Heavy club (Str+d6+1, AP 1, Damaging) morphing into beast parts; Wild Shape spend 2 PP for +1 die.' },
  { category: 'Weapons', name: 'Blade of Binding', price: '12,350 gp', weight: '8 lbs', craft: 'Telekinesis; 6,350 gp', summary: 'Greatsword (Str+d10, AP 3, Accurate). On hit vs <= Size, wrap foe in chains (Entangled / Bound on raise).' },
  { category: 'Weapons', name: 'Boulderhead Mace', price: '6,812 gp', weight: '8 lbs', craft: 'Barrier; 3,652 gp', summary: 'Heavy mace (Str+d8, AP 2, Accurate). 1/day launch head as SBT boulder rolling 60 ft (3d6+5 Trample, Evade).' },
  { category: 'Weapons', name: 'Dustburst Bullet', price: '196 gp', weight: '—', craft: 'Damage field; 98 gp', summary: 'Sling bullet (Damaging) creating a 1d6-round SBT dust cloud imposing major blind.' },
  { category: 'Weapons', name: 'Guarding Blade', price: '65,310 gp', weight: '2 lbs', craft: 'Telekinesis; 32,810 gp', summary: 'Short sword (Str+d6, AP 1, Accurate, Dancing) automatically guards unconscious/sleeping wielder for 5 rds.' },
  { category: 'Weapons', name: 'Lance of Jousting', price: '4,310 gp', weight: '10 lbs', craft: 'Boost Trait; 2,105 gp', summary: 'Lance (Str+d8+1, AP 3, Reach 2, Damaging). Hits force mounted foes to pass Riding (-2 on raise) or dismount prone.' },
  { category: 'Weapons', name: 'Ricochet Hammer', price: '20,301 gp', weight: '2 lbs', craft: 'Telekinesis; 10,301 gp', summary: 'Returning throwing hammer (3/6/12, Str+d6, AP 1) ricocheting across multiple targets with Multi-Actions.' },
  { category: 'Weapons', name: 'Shieldsplitter Lance', price: '18,310 gp', weight: '10 lbs', craft: 'Smite; 9,310 gp', summary: 'Lance (Str+d8+1, AP 3, Reach 2, Keen). Raises deal full damage to opponent’s shield as well.' },
  { category: 'Weapons', name: 'Searing / Sizzling Arrow', price: '1,516 gp', weight: '—', craft: 'Bolt; 758 gp', summary: 'Elemental (Fire or Acid) arrow dealing +1d6 burn/acid damage per round for 3 rounds unless pulled.' },
  { category: 'Weapons', name: 'Sparkwake Starknife', price: '21,324 gp', weight: '3 lbs', craft: 'Burst; 10,824 gp', summary: 'Starknife (3/6/12, Str+d4, AP 1, Electric, Light). 1/day limited action transforms into 4d6 lightning bolt (Evade).' },
  { category: 'Weapons', name: 'Sword of Subtlety', price: '22,310 gp', weight: '2 lbs', craft: 'Deflection; 11,310 gp', summary: 'Short sword (Str+d6, AP 1, Accurate). Enables Sneak Attack whenever having +2+ Gang Up bonus.' },
  { category: 'Weapons', name: 'Undercutter Axe', price: '23,310 gp', weight: '6 lbs', craft: 'Lower Trait; 11,810 gp', summary: 'Battleaxe (Str+d8+1, AP 1, Bane Giant, Damaging). 1/day Fighting raise inflicts raise-level lower Strength.' },
  // Rings (pp. 111-112)
  { category: 'Rings', name: 'Dungeon Ring (Jailer / Prisoner)', price: '16,000 / 250 gp', weight: '—', craft: 'Locate; 8,000 / 125 gp', summary: 'Jailer continuously locates prisoners wearing linked iron Prisoner Rings (cannot be removed by prisoner).' },
  { category: 'Rings', name: 'Ring of Delayed Doom', price: '45,000 gp', weight: '—', craft: 'Healing; 22,500 gp', summary: '9 garnets: free action expends garnet to delay Distracted, Energy Drain, Paralyzed, Rending, Stunned, or Vulnerable for 1 min.' },
  { category: 'Rings', name: 'Ring of Maniacal Devices', price: '5,000 gp', weight: '—', craft: 'Boost Trait; 2,500 gp', summary: 'Ignore up to 2 points of penalties when crafting or disabling traps and locks (including Unskilled).' },
  { category: 'Rings', name: 'Ring of Mind Shielding', price: '8,000 gp', weight: '—', craft: 'Mind wipe; 4,000 gp', summary: 'Wearer is immune to mind-reading and alignment-detection effects.' },
  { category: 'Rings', name: 'Ring of Retribution', price: '15,000 gp', weight: '—', craft: 'Blast; 7,500 gp', summary: '1/day limited action detonates in 4d6+4 fire LBT (Evade); indestructible.' },
  { category: 'Rings', name: 'Ring of X-Ray Vision', price: '25,000 gp', weight: '—', craft: 'Detect arcana; 12,500 gp', summary: 'See through 1 ft stone / 1 in metal / 3 ft wood at 4" Range (10 mins daily -> Fatigue per additional 10 mins).' },
  // Rods & Staves (pp. 112-114)
  { category: 'Rods', name: 'Rod of Bouncing', price: '32,500 gp', weight: '5 lbs', craft: '16,250 gp', summary: '1/encounter redirect a resisted or Immune single-target spell to another valid target in Range.' },
  { category: 'Rods', name: 'Rod of Flame Extinguishing', price: '15,000 gp', weight: '5 lbs', craft: '7,500 gp', summary: '10 daily charges: extinguish mundane MBT fire free or spend 1-2 charges for LBT/magical flames.' },
  { category: 'Rods', name: 'Rod of Improved Metamagic (Minor/Major)', price: '18,000 / 64,000 gp', weight: '5 lbs', craft: '9,000 / 32,000 gp', summary: 'Reduce Power Modifier cost by 2 (1/day Minor, 3/day Major).' },
  { category: 'Rods', name: 'Rod of Mercy', price: '5,500 gp', weight: '5 lbs', craft: '2,750 gp', summary: 'Causes cast spells to inflict non-lethal damage.' },
  { category: 'Rods', name: 'Rod of Withering', price: '25,000 gp', weight: '5 lbs', craft: '12,500 gp', summary: 'Light mace dealing no dmg; Touch Attack inflicts Energy Drain (Str or Vig; permanent on raise unless Vigor resists).' },
  { category: 'Staves', name: 'Staff of Bolstering', price: '20,800 gp', weight: '5 lbs', craft: 'Listed powers; 10,400 gp', summary: '10 charges (Smarts/Spellcasting): boost Trait (Vig/Fight/Shoot/Str, 1 chg) or smite (1 chg).' },
  { category: 'Staves', name: 'Staff of Cackling Wrath', price: '23,600 gp', weight: '5 lbs', craft: 'Listed powers; 11,800 gp', summary: '10 charges (Smarts/Spellcasting): blind, empathy, stun (1 chg) or baleful polymorph, curse (2 chg).' },
  { category: 'Staves', name: 'Staff of Obstacles', price: '25,800 gp', weight: '5 lbs', craft: 'Listed powers; 12,900 gp', summary: '10 charges (Smarts/Spellcasting): deflection (1), barrier Fire/Ice (2), barrier Stone (3).' },
  { category: 'Staves', name: 'Staff of Souls', price: '16,400 gp', weight: '5 lbs', craft: 'Listed powers; 8,200 gp', summary: '10 charges (Spirit/Faith): mind link (1), detect undead (1), divination (1).' },
  { category: 'Staves', name: 'Staff of Stealth', price: '18,400 gp', weight: '5 lbs', craft: 'Listed powers; 9,200 gp', summary: '10 charges (Smarts/Spellcasting): conceal arcana, disguise (1), invisibility (2/3).' },
  { category: 'Staves', name: 'Staff of Vision', price: '41,250 gp', weight: '5 lbs', craft: 'Listed powers; 20,625 gp', summary: '10 charges (Smarts/Spellcasting): darksight, detect arcana, farsight (1), scrying (2), object reading (3).' },
  // Wondrous Items (pp. 114-118)
  { category: 'Wondrous Items', name: 'All Tools Vest', price: '1,800 gp', weight: '5 lbs', craft: 'Conjure item; 900 gp', summary: '1/day produce all standard crafting tools needed for a task for 24 hrs.' },
  { category: 'Wondrous Items', name: 'Amulet of Spell Cunning', price: '10,000 gp', weight: '1 lb', craft: 'Drain Power Points; 5,000 gp', summary: 'Wizard Bonded Object: reduces opposition school spell PP cost by 1 (-2 roll still applies).' },
  { category: 'Wondrous Items', name: 'Apple of Eternal Sleep', price: '2,500 gp', weight: '—', craft: 'Eternal Sleep Hex; 1,125 gp', summary: 'Bite forces Spirit roll or eternal sleep (dispel -2, wish, or royal kiss wakes).' },
  { category: 'Wondrous Items', name: 'Boots of Friendly Terrain', price: '2,400 gp', weight: '1 lb', craft: 'Boost Trait; 1,200 gp', summary: 'Grants Ranger a matched Favored Terrain (or +1 Action Card if already Favored).' },
  { category: 'Wondrous Items', name: 'Bottle of Messages', price: '300 gp', weight: '1 lb', craft: 'Sound; 150 gp', summary: 'Captures 25 spoken words and releases them upon uncorking or shattering.' },
  { category: 'Wondrous Items', name: 'Campfire Bead', price: '720 gp', weight: '—', craft: 'Fire power; 200 gp', summary: 'Free action turns bead into an 8-hour campfire (recharges after 2x burn time).' },
  { category: 'Wondrous Items', name: 'Cauldron of Plenty', price: '15,000 gp', weight: '25 lbs', craft: 'Conjure item; 7,500 gp', summary: '1/day feed 36 people; 1/week serve heroes’ feast for 12 granting each a Benny.' },
  { category: 'Wondrous Items', name: 'Cauldron of Resurrection', price: '33,000 gp', weight: '35 lbs', craft: 'Resurrection; 16,500 gp', summary: '1/day with 10,000 gp herbs restores one dead Medium creature as resurrection.' },
  { category: 'Wondrous Items', name: 'Cauldron of Seeing', price: '42,000 gp', weight: '5 lbs', craft: 'Locate; 21,000 gp', summary: 'Scry across any distance as per locate when filled with liquid.' },
  { category: 'Wondrous Items', name: 'Cauldron of the Dead', price: '30,000 gp', weight: '35 lbs', craft: 'Zombie; 15,000 gp', summary: 'Animates corpses placed inside as permanent zombies (25 gp/corpse; control up to 12).' },
  { category: 'Wondrous Items', name: 'Clamor Box', price: '2,000 gp', weight: '2 lbs', craft: 'Sound; 1,000 gp', summary: 'Programmed delay (1 rd–20 min) plays battle, fire, massacre, or riot noises for 2d6 rounds.' },
  { category: 'Wondrous Items', name: 'Construct Channel Brick', price: '10,000 gp', weight: '1 lb', craft: 'Conjure item; 5,000 gp', summary: 'Lets Channel Energy repair constructs and objects (raise needed for magic items).' },
  { category: 'Wondrous Items', name: 'Flying Ointment', price: '2,250 gp', weight: '1 lb', craft: 'Fly; 1,125 gp', summary: 'Skin ointment grants fly for up to 9 hours.' },
  { category: 'Wondrous Items', name: 'Helm of Fearsome Mien', price: '5,000 gp', weight: '4 lbs', craft: 'Boost Trait; 2,500 gp', summary: 'Allows Intimidating Glare Edge on any Action Card of Eight or higher.' },
  { category: 'Wondrous Items', name: 'Horn of Antagonism', price: '20,000 gp', weight: '4 lbs', craft: 'Smite; 10,000 gp', summary: '1/day Favored Enemy within 10" must make a Vigor roll or become Stunned.' },
  { category: 'Wondrous Items', name: 'Horn of the Huntmaster', price: '5,000 gp', weight: '5 lbs', craft: "Warrior's gift; 2,500 gp", summary: '1/day Ranger limited action shares full Favored Enemy bonus with allies within 5" for 1 minute.' },
  { category: 'Wondrous Items', name: "Lord's Banner (Crusades / Swiftness / Terror)", price: '100k / 10k / 56k gp', weight: '3 lbs', craft: "Warrior's gift", summary: 'Mounted/planted banner: blocks undead & +2 Parry vs undead (Crusades), forced march Fatigue rerolls within 1 mi (Swiftness), or Fear check within 5" (Terror).' },
  { category: 'Wondrous Items', name: 'Manacles of Cooperation', price: '2,000 gp', weight: '3 lbs', craft: 'Empathy; 1,000 gp', summary: 'Bound prisoner complies with reasonable requests unless passing a Spirit check.' },
  { category: 'Wondrous Items', name: 'Moon Circlet', price: '20,000 gp', weight: '5 lbs', craft: 'Darksight; 10,000 gp', summary: 'Darkvision; ignores Arcane Resistance on waxing/full moon, worsens it on waning/new moon; removing causes Fatigue.' },
  { category: 'Wondrous Items', name: 'Muleback Cords', price: '1,000 gp', weight: '0.25 lb', craft: 'Boost Trait; 500 gp', summary: 'Treats Strength as one die step higher when determining Encumbrance.' },
  { category: 'Wondrous Items', name: 'Philter of Love', price: '3,000 gp', weight: '—', craft: 'Empathy; 1,500 gp', summary: 'Drinker falls permanently in love/adoration with first being perceived (remove via wish or Remove Curse).' },
  { category: 'Wondrous Items', name: 'Sheath of Bladestealth', price: '5,000 gp', weight: '2 lbs', craft: 'Invisibility; 2,500 gp', summary: 'Both sheath and any slashing blade inside become invisible until drawn.' },
  { category: 'Wondrous Items', name: 'Silver Smite Bracelet', price: '16,000 gp', weight: '1 lb', craft: 'Smite; 8,000 gp', summary: 'Grants Paladins one additional use of Smite Evil per encounter.' },
  { category: 'Wondrous Items', name: 'Sniper Goggles', price: '20,000 gp', weight: '1 lb', craft: 'Farsight; 10,000 gp', summary: 'Grants wearer continuous benefits of major farsight.' },
  // Cursed Items (pp. 119-120)
  { category: 'Cursed Items', name: "Buffoon's Sword", price: 'Cursed', weight: '2 lbs', craft: 'Sword of subtlety', summary: 'Imposes -2 Stealth and Spirit -2 to lie or use subterfuge.' },
  { category: 'Cursed Items', name: 'Cannibal Ring', price: 'Cursed', weight: '—', craft: 'Ring of sustenance', summary: 'After 7 days forces hourly food/water checks and cannibalistic urges.' },
  { category: 'Cursed Items', name: 'Cloak of Immolation', price: 'Cursed', weight: '1 lb', craft: 'Any cloak', summary: 'Bursts into continuous d6 flames when worn until curse is broken.' },
  { category: 'Cursed Items', name: 'Crown of Blindness', price: 'Cursed', weight: '1 lb', craft: 'Headband / moon circlet', summary: 'Afflicts wearer with the Blind Hindrance.' },
  { category: 'Cursed Items', name: 'Hat of Hatreds', price: 'Cursed', weight: '—', craft: 'Hat of disguise', summary: 'Disguises wearer as whatever hostile creatures nearby want most to harm.' },
  { category: 'Cursed Items', name: 'Ring of Truth', price: 'Cursed', weight: '—', craft: 'Ring of mind shielding', summary: 'Prevents telling deliberate lies; Spirit -4 to avoid answering direct questions truthfully.' },
  { category: 'Cursed Items', name: 'Rod of Arson', price: 'Cursed', weight: '5 lbs', craft: 'Rod of flame extinguishing', summary: 'Absorbs flames (-Distracted 24h) and forces Spirit roll near flammables or ignite them.' },
  { category: 'Cursed Items', name: 'Stone of Weight (Loadstone)', price: 'Cursed', weight: '—', craft: 'Ioun stone / good luck', summary: "Halves possessor's base Pace (rounded up) until curse is removed." }
];

export interface PfApgArtifactEntry {
  tier: 'Minor' | 'Major';
  name: string;
  weight: string;
  summary: string;
  destruction: string;
}

export const PF_APG_ARTIFACTS: PfApgArtifactEntry[] = [
  {
    tier: 'Minor',
    name: 'Beacon of True Faith',
    weight: '2 lbs',
    summary: 'Electrum torch burning forever: allies within 5" gain minor deflection vs evil (Good bearer), or bearer gets minor deflection & 2/day major bolt vs good (Evil bearer).',
    destruction: 'Destroyed if its bearer renounces their deity to willingly embrace the opposite alignment.'
  },
  {
    tier: 'Minor',
    name: 'Knucklebone of Fickle Fortune',
    weight: '—',
    summary: 'Hovering d20 artifact that applies 20 wild cosmic/cursed effects on roll (from losing last Advance or 10d6+6 dmg to +1 Traits,Luck Edge, Raise every 2, or auto-revive).',
    destruction: 'Disappears if the Eha-Zah rune (20) is rolled on 20 consecutive rolls.'
  },
  {
    tier: 'Minor',
    name: 'Perfect Golden Lute',
    weight: '3 lbs',
    summary: '+4 Performance (non-arcane); grants Countersong & Dirge of Doom Edges; Bards add +2 Performance when activating bardic powers.',
    destruction: 'Shatters if no music is played within 1,000 miles for a day, or if its bearer is slain by a bard power.'
  },
  {
    tier: 'Minor',
    name: 'Spindle of Perfect Knowledge',
    weight: '—',
    summary: 'Diamond Ioun Stone acting as major headband of mental superiority (+2 to two Smarts skills, comprehend/speak all languages, mind reading/link d8).',
    destruction: 'Worn by a mindless creature for one continuous year.'
  },
  {
    tier: 'Minor',
    name: 'Talisman of Reluctant Wishes',
    weight: '1 lb',
    summary: 'Spirit -2 on pickup (or acts as Loadstone & deals 5d6 on discard). Success/raise grants wishes equal to Spirit die; warns within 20 ft of traps.',
    destruction: 'Wish for its destruction (using the talisman or wish spell), exploding for 5d6 damage.'
  },
  {
    tier: 'Major',
    name: 'Bottle of the Bound',
    weight: '4 lbs',
    summary: 'Holds 666 bound fiends summoned with secret Words of Opening, Binding, and Banishment (acts as automatic summon ally evil servant).',
    destruction: 'All 666 bound fiends must be slain/banished, then the empty brass bottle smashed with a holy weapon.'
  },
  {
    tier: 'Major',
    name: 'Cloud Castle of the Storm King',
    weight: '—',
    summary: 'Flying Pace 50 citadel atop a storm cloud (holds 300 creatures); Legendary master (Occult d10+) gains Major darkness, lock, illusion, barrier, and Storm of Vengeance.',
    destruction: 'Dissipated only by the most turbulent winds on the Plane of Air.'
  },
  {
    tier: 'Major',
    name: 'Fork of the Forgotten One',
    weight: '12 lbs',
    summary: 'Ranseur (Str+d6+1, AP 4, Reach 2, Fire, Accurate, Brutal, Damaging, Keen); +4 Persuasion/Intimidation, 3/day major bolt; non-evil touchers must turn evil or die (Vigor -4).',
    destruction: 'Legendary Paladin touches it and chooses death without resisting.'
  },
  {
    tier: 'Major',
    name: 'The Moaning Diamond',
    weight: '4 lbs',
    summary: '3/day reshape 5,000 cu. ft. of earth/stone (elemental manipulation); 1/day summon a permanent elder earth elemental.',
    destruction: 'Crushed simultaneously by elemental princes of Air, Fire, and Water where dust never touches stone.'
  },
  {
    tier: 'Major',
    name: 'The Shield of the Sun',
    weight: '2 lbs',
    summary: 'Large shield (Arrow Deflection, Reflecting) granting Mystic Powers (Paladin), Arcane Resistance, & environmental protection (-4 Traits for Evil wielders).',
    destruction: 'Cast into the Well of Eternal Night in the Plane of Shadow by a good-aligned character.'
  }
];

export const PF_APG_INTELLIGENT_ITEMS = {
  overview: 'Permanent magic items (<1%) can possess Smarts & Spirit (d4-d12), Empathy/Speech/Telepathy, senses out to 5"-20", alignment (non-matching wielders take Energy Drain, 2x at Ego 20-29, 3x at Ego 30+), powers, and Special Purposes (+2 Ego, +4 more if opposed). Base price +500 gp plus enhancements.',
  attributesTable: [
    { die: 'd4', price: '—', ego: '—' },
    { die: 'd6', price: '+1,000 gp', ego: '+2' },
    { die: 'd8', price: '+2,000 gp', ego: '+3' },
    { die: 'd10', price: '+4,000 gp', ego: '+4' },
    { die: 'd12', price: '+8,000 gp', ego: '+5' }
  ],
  sensesTable: [
    { ability: 'Empathy / Senses 5"', price: '—', ego: '—' },
    { ability: 'Speech / Senses 10" / Darkvision', price: '+500 gp', ego: '—' },
    { ability: 'Senses 20"', price: '+1,000 gp', ego: '—' },
    { ability: 'Telepathy / Read Language', price: '+1,000 gp', ego: '+1' },
    { ability: 'Blindsense', price: '+5,000 gp', ego: '+1' }
  ],
  egoModifierTable: [
    { ego: '0–5', spiritMod: '—' },
    { ego: '6–10', spiritMod: '-1' },
    { ego: '11–15', spiritMod: '-2' },
    { ego: '16–20', spiritMod: '-3' },
    { ego: '21+', spiritMod: '-4' }
  ]
};

// ============================================================================
// APG ICONIC PATH SAMPLE CHARACTERS (Novice Profiles)
// ============================================================================

const APG_BASE_SKILLS: Array<{ id: string; name: string; linkedAttribute: AttributeId; isCore: boolean }> = [
  { id: 'academics', name: 'Academics', linkedAttribute: 'smarts', isCore: false },
  { id: 'alchemy', name: 'Alchemy', linkedAttribute: 'smarts', isCore: false },
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

const makeApgSkills = (overrides: Record<string, number>): CharacterSkill[] =>
  APG_BASE_SKILLS.map((s) => ({
    skillId: s.id,
    name: s.name,
    linkedAttribute: s.linkedAttribute,
    isCore: s.isCore,
    die: (overrides[s.id] !== undefined ? overrides[s.id] : s.isCore ? 4 : 0) as DieSides | 0,
    modifier: 0
  }));

export const PF_APG_SAMPLE_CHARACTERS: SwadeCharacter[] = [
  {
    id: 'pf_iconic_damiel',
    name: 'Damiel',
    concept: 'Iconic Path Alchemist',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_elf',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 8, smarts: 8, spirit: 6, strength: 6, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeApgSkills({
      alchemy: 8,
      athletics: 8,
      common_knowledge: 6,
      fighting: 8,
      notice: 6,
      occult: 4,
      persuasion: 6,
      stealth: 6,
      thievery: 6
    }),
    hindrances: [
      { hindranceId: 'pf_favored_class', name: 'Favored Class', severity: 'Minor', summary: 'Committed strictly to Alchemist progression (+1 die Trait req for other Class/Prestige Edges).' },
      { hindranceId: 'impulsive', name: 'Impulsive', severity: 'Minor', summary: 'Leaps before looking.' }
    ],
    hindranceAllocation: { attributes: 0, edges: 1, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_alchemist', name: 'Alchemist', category: 'Class', rankRequired: 'Novice', summary: 'AB (Alchemist) using Alchemy, Bombs, Extracts & Mutagens.', source: 'Creation' },
      { edgeId: 'calculating', name: 'Calculating', category: 'Combat', rankRequired: 'Novice', summary: 'Ignore up to 2 pts of Multi-Action penalties on Action Cards of 5 or less.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'pf_alchemist',
    maxPowerPointsMod: 0,
    powers: [
      { id: 'pf_damiel_p1', powerId: 'deflection', name: 'Deflection', trapping: 'Translucent Extract', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Attackers suffer -2 (-4 raise) to hit wearer.' },
      { id: 'pf_damiel_p2', powerId: 'pf_shape_change', name: 'Shape Change', trapping: 'Metamorphic Draught', powerPoints: 'Special', range: 'Touch', duration: '5', summary: 'Transforms drinker into animal or monster.' }
    ],
    weapons: [
      { id: 'pf_wpn_dam_rapier', name: 'Rapier (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: 1, weight: 2, cost: 20, equipped: true, notes: 'Parry +1', source: 'pathfinder' },
      { id: 'pf_wpn_dam_dagger', name: 'Dagger / Knife (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 2, equipped: true, source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_dam_leather', name: 'Leather Jacket & Leggings', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 19, cost: 40, equipped: true, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_dam_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_dam_alkit', name: "Alchemist's Kit", quantity: 1, weight: 5, cost: 25, source: 'pathfinder' },
      { id: 'pf_gr_dam_book', name: 'Formulae Book', quantity: 1, weight: 3, cost: 15, source: 'pathfinder' },
      { id: 'pf_gr_dam_potion', name: 'Potion of Minor Protection', quantity: 1, weight: 0.5, cost: 50, source: 'pathfinder' }
    ],
    currency: 48,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 10, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'Damiel Morgethai lives with a fractured mind after his alchemical transformation, chasing volatile thrills and fleeting remorse.',
    notes: 'Languages: Common, Draconic, Elven, Goblin, Sylvan. Iconic Path Alchemist (APG p. 39).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 1000000
  },
  {
    id: 'pf_iconic_alain',
    name: 'Alain',
    concept: 'Iconic Path Cavalier',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 8, smarts: 6, spirit: 6, strength: 8, vigor: 8 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeApgSkills({
      athletics: 6,
      battle: 4,
      common_knowledge: 4,
      fighting: 8,
      notice: 6,
      persuasion: 6,
      riding: 6,
      shooting: 6,
      stealth: 4,
      survival: 4
    }),
    hindrances: [
      { hindranceId: 'impulsive', name: 'Impulsive', severity: 'Minor', summary: 'Leaps headlong into trouble.' },
      { hindranceId: 'stubborn', name: 'Stubborn', severity: 'Minor', summary: 'Insists on getting his way.' },
      { hindranceId: 'vengeful', name: 'Vengeful', severity: 'Minor', summary: 'Settles slights through personal retribution.' },
      { hindranceId: 'vow', name: 'Vow (Order of the Cockatrice)', severity: 'Major', summary: 'Pledged to serve his personal stature and order.' }
    ],
    hindranceAllocation: { attributes: 2, edges: 0, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_cavalier', name: 'Cavalier', category: 'Class', rankRequired: 'Novice', summary: 'Order of the Cockatrice: Challenge (+2 dmg), Mighty Charge, Cavalier Mount.', source: 'Creation' },
      { edgeId: 'command', name: 'Command', category: 'Leadership', rankRequired: 'Novice', summary: '+1 to troops recovering from Shaken or Stunned in Command Range.', source: 'Ancestry' }
    ],
    arcaneBackgroundId: 'none',
    maxPowerPointsMod: 0,
    powers: [],
    weapons: [
      { id: 'pf_wpn_alain_sword', name: 'Long Sword (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 4, cost: 15, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_alain_lance', name: 'Lance (PF)', category: 'Melee', damage: 'Str+d8', ap: 0, range: 'Melee', rof: 1, minStr: 8, weight: 10, cost: 10, equipped: true, notes: 'AP 2 on charge, Reach 2, mounted only', source: 'pathfinder' },
      { id: 'pf_wpn_alain_xbow', name: 'Light Crossbow (PF)', category: 'Ranged', damage: '2d6', ap: 2, range: '10/20/40', rof: 1, minStr: 6, weight: 5, cost: 35, equipped: true, notes: 'AP 2, Reload 1', source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_alain_scale', name: 'Scale Tunic (+3)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 22, cost: 100, equipped: true, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_alain_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_alain_bolts', name: 'Crossbow Bolts (10)', quantity: 1, weight: 1, cost: 1, source: 'pathfinder' },
      { id: 'pf_gr_alain_mount', name: 'Heavy Pony & Riding Saddle', quantity: 1, weight: 0, cost: 60, source: 'pathfinder' }
    ],
    currency: 30,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 0, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'A disgraced royal-blooded sellsword and merciless battlefield tactician riding under the Order of the Cockatrice.',
    notes: 'Languages: Common, Elven, Orc, Varisian. Iconic Path Cavalier (APG p. 43).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 900000
  },
  {
    id: 'pf_iconic_imrijka',
    name: 'Imrijka',
    concept: 'Iconic Path Inquisitor',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_half_orc',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 8, smarts: 6, spirit: 8, strength: 6, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeApgSkills({
      athletics: 6,
      common_knowledge: 6,
      fighting: 6,
      intimidation: 6,
      notice: 6,
      occult: 4,
      persuasion: 6,
      shooting: 8,
      stealth: 4,
      survival: 4
    }),
    hindrances: [
      { hindranceId: 'obligation', name: 'Obligation (Orphans)', severity: 'Minor', summary: 'Sends aid back to her Lepidstadt orphanage.' },
      { hindranceId: 'ruthless', name: 'Ruthless', severity: 'Minor', summary: 'Does whatever is required to fulfill Pharasma’s judgment.' },
      { hindranceId: 'stubborn', name: 'Stubborn', severity: 'Minor', summary: 'Relentless once her mind is set.' },
      { hindranceId: 'vow', name: 'Vow (Inquisitor)', severity: 'Minor', summary: 'Root out undead and enemies of Pharasma.' }
    ],
    hindranceAllocation: { attributes: 1, edges: 1, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_inquisitor', name: 'Inquisitor', category: 'Class', rankRequired: 'Novice', summary: 'Armor Restriction (Medium), Judgment (5 tokens), and Monster Lore.', source: 'Creation' },
      { edgeId: 'elan', name: 'Elan', category: 'Background', rankRequired: 'Novice', summary: '+2 when spending a Benny to reroll a Trait roll.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'none',
    maxPowerPointsMod: 0,
    powers: [],
    weapons: [
      { id: 'pf_wpn_imr_morningstar', name: 'Morningstar (PF)', category: 'Melee', damage: 'Str+d6', ap: 0, range: 'Melee', rof: 1, minStr: 6, weight: 6, cost: 8, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_imr_bow', name: 'Short Bow (PF)', category: 'Ranged', damage: '2d6', ap: 0, range: '12/24/48', rof: 1, minStr: 6, weight: 2, cost: 30, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_imr_dagger', name: 'Dagger (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 2, equipped: true, source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_imr_scale', name: 'Scale Breastplate (+3)', type: 'Armor', armorBonus: 3, parryBonus: 0, minStr: 8, weight: 22, cost: 100, equipped: true, source: 'pathfinder' },
      { id: 'pf_arm_imr_shield', name: 'Light Wooden Shield', type: 'Shield', armorBonus: 0, parryBonus: 1, minStr: 6, weight: 4, cost: 5, equipped: false, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_imr_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_imr_arrows', name: 'Arrows (20)', quantity: 1, weight: 3, cost: 1, source: 'pathfinder' },
      { id: 'pf_gr_imr_symbol', name: 'Silver Holy Symbol (Pharasma)', quantity: 1, weight: 1, cost: 25, source: 'pathfinder' },
      { id: 'pf_gr_imr_hw', name: 'Holy Water', quantity: 1, weight: 1, cost: 25, source: 'pathfinder' },
      { id: 'pf_gr_imr_manacles', name: 'Manacles (x2)', quantity: 2, weight: 4, cost: 30, source: 'pathfinder' },
      { id: 'pf_gr_imr_sunrod', name: 'Sunrod', quantity: 1, weight: 1, cost: 2, source: 'pathfinder' }
    ],
    currency: 48,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 0, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'Raised in a Lepidstadt orphanage, Imrijka hunts horrors across Ustalav in the name of Pharasma.',
    notes: 'Languages: Celestial, Common, Giant, Orc. Iconic Path Inquisitor (APG p. 47).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 800000
  },
  {
    id: 'pf_iconic_alahazra',
    name: 'Alahazra',
    concept: 'Iconic Path Oracle',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 6, smarts: 6, spirit: 10, strength: 4, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeApgSkills({
      athletics: 6,
      common_knowledge: 4,
      faith: 10,
      fighting: 4,
      healing: 6,
      notice: 6,
      occult: 6,
      persuasion: 6,
      stealth: 4
    }),
    hindrances: [
      { hindranceId: 'bad_luck', name: 'Bad Luck', severity: 'Major', summary: 'Starts with 1 fewer Benny per session.' },
      { hindranceId: 'loyal', name: 'Loyal', severity: 'Minor', summary: 'Motherly devotion to her companions.' },
      { hindranceId: 'poverty', name: 'Poverty', severity: 'Minor', summary: 'Gives freely and keeps little wealth.' }
    ],
    hindranceAllocation: { attributes: 1, edges: 1, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_oracle', name: 'Oracle', category: 'Class', rankRequired: 'Novice', summary: 'Mystery of Flame & Clouded Vision Curse (+2 Mystery powers, Faith arcane skill, 15 PP).', source: 'Creation' },
      { edgeId: 'new_powers', name: 'New Powers', category: 'Power', rankRequired: 'Novice', summary: 'Learns 2 additional powers.', source: 'Ancestry' },
      { edgeId: 'power_surge', name: 'Power Surge', category: 'Power', rankRequired: 'Novice', summary: 'Recover 10 PP when dealt a Joker in combat.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'pf_oracle',
    maxPowerPointsMod: 0,
    powers: [
      { id: 'pf_alah_p1', powerId: 'burst', name: 'Burst (Mystery)', trapping: 'Sacred Flame', powerPoints: '2', range: 'Cone/Stream', duration: 'Instant', summary: '2d6 fire cone (3d6 on raise).' },
      { id: 'pf_alah_p2', powerId: 'detect_conceal_arcana', name: 'Detect/Conceal Arcana', trapping: 'Second Sight', powerPoints: '2', range: 'Smarts', duration: '5', summary: 'Senses or masks supernatural auras.' },
      { id: 'pf_alah_p3', powerId: 'environmental_protection', name: 'Environmental Protection', trapping: 'Desert Mantle', powerPoints: '2', range: 'Touch', duration: '1 hour', summary: 'Shields targets from hazardous heat and elements.' },
      { id: 'pf_alah_p4', powerId: 'havoc', name: 'Havoc', trapping: 'Mirage Blast', powerPoints: '2', range: 'Smarts', duration: 'Instant', summary: 'Hurls and Distracts foes in MBT.' },
      { id: 'pf_alah_p5', powerId: 'healing', name: 'Healing', trapping: 'Warm Radiance', powerPoints: '3', range: 'Touch', duration: 'Instant', summary: 'Removes Wounds within the Golden Hour.' },
      { id: 'pf_alah_p6', powerId: 'smite', name: 'Smite (Mystery)', trapping: 'Cleansing Fire', powerPoints: '2', range: 'Touch', duration: '5', summary: '+2 weapon damage (+4 on raise).' }
    ],
    weapons: [
      { id: 'pf_wpn_alah_staff', name: 'Quarterstaff (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: 1, weight: 4, cost: 0, equipped: true, notes: 'Parry +1, Reach 1, Two Hands', source: 'pathfinder' },
      { id: 'pf_wpn_alah_sling', name: 'Sling (PF)', category: 'Thrown', damage: 'Str+d4', ap: 0, range: '4/8/16', rof: 1, minStr: 4, weight: 1, cost: 0, equipped: true, source: 'pathfinder' }
    ],
    armor: [
      { id: 'pf_arm_alah_leather', name: 'Leather Tunic & Leggings', type: 'Armor', armorBonus: 2, parryBonus: 0, minStr: 6, weight: 19, cost: 40, equipped: true, source: 'pathfinder' }
    ],
    gear: [
      { id: 'pf_gr_alah_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_alah_stones', name: 'Sling Stones (10)', quantity: 1, weight: 1, cost: 0, source: 'pathfinder' }
    ],
    currency: 60,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 2, currentPowerPoints: 15, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'Seer of the Flame Mystery bearing Clouded Vision, Alahazra watches over her companions like a stern mother.',
    notes: 'Curse: Clouded Vision (Blindsense 5"). Languages: Common, Draconic, Elven, Sylvan. Iconic Path Oracle (APG p. 49).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 700000
  },
  {
    id: 'pf_iconic_balazar',
    name: 'Balazar',
    concept: 'Iconic Path Summoner',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_gnome',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 6, smarts: 8, spirit: 8, strength: 4, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeApgSkills({
      athletics: 4,
      common_knowledge: 6,
      fighting: 6,
      healing: 4,
      notice: 6,
      occult: 8,
      persuasion: 4,
      riding: 4,
      shooting: 4,
      spellcasting: 8,
      stealth: 4,
      survival: 4
    }),
    hindrances: [
      { hindranceId: 'enemy', name: 'Enemy (Nexian wizards)', severity: 'Major', summary: 'Hunted by powerful arcanists from Nex.' },
      { hindranceId: 'poverty', name: 'Poverty', severity: 'Minor', summary: 'Careless with coins.' },
      { hindranceId: 'secret', name: 'Secret (White hair origin)', severity: 'Minor', summary: 'Guards the mystery of his shock-white hair.' }
    ],
    hindranceAllocation: { attributes: 0, edges: 2, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_summoner', name: 'Summoner', category: 'Class', rankRequired: 'Novice', summary: 'AB (Summoner) with Spellcasting & Eidolon companion Padrig.', source: 'Creation' },
      { edgeId: 'pf_extra_evolution', name: 'Extra Evolution', category: 'Class', rankRequired: 'Novice', summary: 'Grants Padrig +3 Evolution Points.', source: 'Hindrance' },
      { edgeId: 'new_powers', name: 'New Powers', category: 'Power', rankRequired: 'Novice', summary: 'Learns 2 additional powers.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'pf_summoner',
    maxPowerPointsMod: 0,
    powers: [
      { id: 'pf_bal_p1', powerId: 'summon_ally', name: 'Summon Ally', trapping: 'Planar Pact', powerPoints: 'Special', range: 'Smarts', duration: '5', summary: 'Manifests conjured servants or speeds Eidolon.' },
      { id: 'pf_bal_p2', powerId: 'deflection', name: 'Deflection', trapping: 'Aetheric Ward', powerPoints: '2', range: 'Touch', duration: '5', summary: 'Protects bearer or Padrig from strikes.' },
      { id: 'pf_bal_p3', powerId: 'healing', name: 'Healing', trapping: 'Planar Mending', powerPoints: '3', range: 'Touch', duration: 'Instant', summary: 'Mends wounds on self or Eidolon.' },
      { id: 'pf_bal_p4', powerId: 'pf_summon_monster', name: 'Summon Monster', trapping: 'Extradimensional Gate', powerPoints: 'Special', range: 'Smarts', duration: '5', summary: 'Calls celestial or fiendish creatures to fight.' }
    ],
    weapons: [
      { id: 'pf_wpn_bal_club', name: 'Light Club (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, weight: 2, cost: 1, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_bal_dagger', name: 'Dagger (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 2, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_bal_hxbow', name: 'Hand Crossbow (PF)', category: 'Ranged', damage: '2d4', ap: 0, range: '5/10/20', rof: 1, minStr: 4, weight: 2, cost: 20, equipped: true, source: 'pathfinder' }
    ],
    armor: [],
    gear: [
      { id: 'pf_gr_bal_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_bal_bolts', name: 'Hand Crossbow Bolts (10)', quantity: 1, weight: 1, cost: 1, source: 'pathfinder' },
      { id: 'pf_gr_bal_sunrod', name: 'Sunrod (x3)', quantity: 3, weight: 3, cost: 6, source: 'pathfinder' },
      { id: 'pf_gr_bal_scroll', name: 'Scroll of Bolt', quantity: 1, weight: 0, cost: 150, source: 'pathfinder' }
    ],
    currency: 20,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 3, currentPowerPoints: 11, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'Secretive gnome arcanist bound by soul-rune to his loyal outsider enforcer, Padrig.',
    notes: 'Eidolon: Padrig. Languages: Common, Gnome, Goblin, Kelish, Orc, Sylvan. Iconic Path Summoner (APG p. 53).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 600000
  },
  {
    id: 'pf_iconic_feiya',
    name: 'Feiya',
    concept: 'Iconic Path Witch',
    setting: 'Savage Pathfinder (Golarion)',
    ancestryId: 'pf_human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: { agility: 6, smarts: 8, spirit: 8, strength: 6, vigor: 6 },
    attributeModifiers: { agility: 0, smarts: 0, spirit: 0, strength: 0, vigor: 0 },
    skills: makeApgSkills({
      athletics: 4,
      common_knowledge: 6,
      fighting: 4,
      healing: 6,
      intimidation: 6,
      notice: 6,
      occult: 6,
      persuasion: 4,
      spellcasting: 8,
      stealth: 4
    }),
    hindrances: [
      { hindranceId: 'driven', name: 'Driven (Find parents)', severity: 'Major', summary: 'Relentlessly seeks the truth about her missing parents.' },
      { hindranceId: 'enemy', name: 'Enemy (Crones)', severity: 'Minor', summary: 'Pursued by hostile coven crones.' },
      { hindranceId: 'loyal', name: 'Loyal', severity: 'Minor', summary: 'Fiercely protective of true friends.' }
    ],
    hindranceAllocation: { attributes: 1, edges: 1, skills: 0, wealth: 0 },
    edges: [
      { edgeId: 'pf_witch', name: 'Witch', category: 'Class', rankRequired: 'Novice', summary: 'Evil Eye Hex & Fox Familiar; Spellcasting (Smarts), 10 PP.', source: 'Creation' },
      { edgeId: 'alertness', name: 'Alertness', category: 'Background', rankRequired: 'Novice', summary: '+2 Notice rolls.', source: 'Ancestry' },
      { edgeId: 'luck', name: 'Luck', category: 'Background', rankRequired: 'Novice', summary: '+1 Benny per session.', source: 'Hindrance' }
    ],
    arcaneBackgroundId: 'pf_witch',
    maxPowerPointsMod: 0,
    powers: [
      { id: 'pf_feiya_p1', powerId: 'boost_lower_trait', name: 'Boost/Lower Trait', trapping: 'Evil Eye Hex', powerPoints: '3', range: 'Smarts', duration: '5', summary: 'Raises or lowers any Trait.' },
      { id: 'pf_feiya_p2', powerId: 'pf_protection', name: 'Protection', trapping: 'Warding Charm', powerPoints: '2', range: 'Smarts', duration: '5', summary: '+2 Armor (+2 Toughness on raise).' }
    ],
    weapons: [
      { id: 'pf_wpn_feiya_staff', name: 'Quarterstaff (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: 'Melee', rof: 1, minStr: 4, parryMod: 1, weight: 4, cost: 0, equipped: true, notes: 'Parry +1, Reach 1, Two Hands', source: 'pathfinder' },
      { id: 'pf_wpn_feiya_dagger', name: 'Dagger (PF)', category: 'Melee', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 1, cost: 2, equipped: true, source: 'pathfinder' },
      { id: 'pf_wpn_feiya_darts', name: 'Darts / Shuriken x4 (PF)', category: 'Thrown', damage: 'Str+d4', ap: 0, range: '3/6/12', rof: 1, minStr: 4, weight: 0.4, cost: 4, equipped: true, source: 'pathfinder' }
    ],
    armor: [],
    gear: [
      { id: 'pf_gr_feiya_kit', name: "Adventurer's Kit", quantity: 1, weight: 10, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_feiya_heal', name: "Healer's Kit", quantity: 1, weight: 1, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_feiya_pouch', name: 'Spell Component Pouch', quantity: 1, weight: 2, cost: 5, source: 'pathfinder' },
      { id: 'pf_gr_feiya_tangle', name: 'Tanglefoot Bag', quantity: 1, weight: 4, cost: 50, source: 'pathfinder' },
      { id: 'pf_gr_feiya_scroll', name: '2x Scroll of Bolt & Iron Pot', quantity: 1, weight: 2, cost: 150, source: 'pathfinder' }
    ],
    currency: 24,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: { bornAHero: false, moreSkillPoints: false, unarmoredHero: false, freeClassEdge: true },
    sourceBooks: ['core', 'pathfinder'],
    playState: { wounds: 0, maxWounds: 3, fatigue: 0, bennies: 4, currentPowerPoints: 10, shaken: false, distracted: false, vulnerable: false, boundOrEntangled: false, conviction: false, aiming: false },
    backstory: 'Raised on the edges of civilization with her white fox familiar Daji, Feiya searches for her lost parents.',
    notes: 'Hex: Evil Eye; Familiar: Daji (Fox). Languages: Aklo, Common, Celestial, Elven, Sylvan. Iconic Path Witch (APG p. 61).',
    avatarEmoji: '',
    avatarImage: '',
    updatedAt: Date.now() - 500000
  }
];
