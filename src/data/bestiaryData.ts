import { CreatureStatBlock } from '../types/bestiary';

export const BESTIARY_CREATURES: CreatureStatBlock[] = [
  // ==========================================================================
  // SWADE CORE RULES
  // ==========================================================================
  {
    id: 'core_dire_wolf',
    name: 'Dire Wolf',
    subtitle: 'Apex Canine Predator',
    sourcebook: 'Core Rules',
    classification: 'Beast',
    isWildCard: false,
    size: 1,
    scale: 'Large',
    pace: 10,
    parry: 6,
    toughness: 8,
    armor: 1,
    attributes: {
      agility: 'd8',
      smarts: 'd4 (A)',
      spirit: 'd6',
      strength: 'd8',
      vigor: 'd8'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Bite',
        effect: 'Str+d6 damage, AP 1.'
      },
      {
        name: 'Fleet-Footed',
        effect: 'Pace 10, d10 running die.'
      },
      {
        name: 'Pack Tactics',
        effect: 'Gains a +1 bonus to Gang Up rolls beyond the normal maximum.'
      },
      {
        name: 'Size +1',
        effect: 'Stands nearly 5 feet at the shoulder and weighs over 250 lbs.'
      },
      {
        name: 'Thick Fur',
        effect: '+1 Armor against all attacks.'
      }
    ],
    description: 'Enormous, primeval wolves that stalk frozen forests, tundra, and mountainous borderlands in coordinated hunting packs.',
    tactics: 'Dire wolves encircle prey, harrying from flanks to maximize Gang Up bonuses before bringing down isolated targets.',
    habitat: 'Cold forests, tundras, and alpine highlands.'
  },
  {
    id: 'core_orc_warrior',
    name: 'Orc Warrior',
    subtitle: 'Brutal Tribal Raider',
    sourcebook: 'Core Rules',
    classification: 'Humanoid & Folk',
    isWildCard: false,
    size: 1,
    scale: 'Normal',
    pace: 6,
    parry: 5,
    toughness: 9,
    armor: 2,
    attributes: {
      agility: 'd6',
      smarts: 'd4',
      spirit: 'd6',
      strength: 'd8',
      vigor: 'd8'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd6' },
      { name: 'Shooting', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Size +1',
        effect: 'Orcs are broad-shouldered and thick-muscled, standing over six feet tall.'
      },
      {
        name: 'Infravision',
        effect: 'Halves penalties for Illumination when targeting warm-blooded prey.'
      },
      {
        name: 'Resilient',
        effect: 'Orcs can take one Wound before being Incapacitated.'
      }
    ],
    gear: ['Crude Battleaxe (Str+d8, AP 1)', 'Leather & Ringmail Jerkin (+2 Armor)', 'Compound Bow (Range 12/24/48, Damage 2d6)'],
    description: 'Fierce, warlike humanoids driven by combat mastery, tribal conquest, and survival of the strongest.',
    tactics: 'Orcs rush into melee with terrifying war cries, relying on brute strength and heavy axes to cleave shields.',
    habitat: 'Wastelands, cavern networks, rugged foothills, and frontier border regions.'
  },
  {
    id: 'core_orc_chieftain',
    name: 'Orc Chieftain',
    subtitle: 'Warlord of the Horde',
    sourcebook: 'Core Rules',
    classification: 'Humanoid & Folk',
    isWildCard: true,
    size: 1,
    scale: 'Normal',
    pace: 6,
    parry: 7,
    toughness: 11,
    armor: 3,
    attributes: {
      agility: 'd8',
      smarts: 'd6',
      spirit: 'd8',
      strength: 'd10',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Battle', die: 'd8' },
      { name: 'Fighting', die: 'd10' },
      { name: 'Intimidation', die: 'd10' },
      { name: 'Notice', die: 'd6' },
      { name: 'Shooting', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Command',
        effect: '+1 to recover from Shaken for all allied extras within 5" (10 yards).'
      },
      {
        name: 'Fervor',
        effect: '+1 to melee damage rolls for all allied troops in Command range.'
      },
      {
        name: 'Sweep',
        effect: 'May attack all adjacent foes at a -2 Fighting penalty.'
      },
      {
        name: 'Size +1',
        effect: 'Imposing, scar-covered warlord weighing over 300 lbs.'
      },
      {
        name: 'Hard to Kill',
        effect: 'Ignores wound penalties when making Vigor rolls to avoid Bleeding Out.'
      }
    ],
    gear: ['Great Greataxe (Str+d10, AP 2, Two Hands, Parry -1)', 'Hardened Chain Hauberk (+3 Armor)', 'Throwing Axes (Range 3/6/12, Damage Str+d6)'],
    description: 'Veteran warlord who rules through undisputed dominance, tactical cunning, and brutal martial prowess.',
    tactics: 'Commands foot soldiers into pinning positions, then charges the opposing commander with sweeping two-handed cleaves.',
    habitat: 'Tribal encampments, fortress citadels, and war camps.'
  },
  {
    id: 'core_goblin_skulker',
    name: 'Goblin Skulker',
    subtitle: 'Cunning Tunnel Ambusher',
    sourcebook: 'Core Rules',
    classification: 'Humanoid & Folk',
    isWildCard: false,
    size: -1,
    scale: 'Small',
    pace: 6,
    parry: 5,
    toughness: 4,
    armor: 1,
    attributes: {
      agility: 'd8',
      smarts: 'd6',
      spirit: 'd6',
      strength: 'd4',
      vigor: 'd6'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd6' },
      { name: 'Shooting', die: 'd8' },
      { name: 'Stealth', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Infravision',
        effect: 'Halves penalties for Illumination when targeting warm-blooded prey.'
      },
      {
        name: 'Size -1',
        effect: 'Small stature; attackers suffer -1 to hit at range.'
      },
      {
        name: 'Sneak Attack',
        effect: '+2 damage when attacking a target that is Vulnerable or caught by surprise.'
      }
    ],
    gear: ['Short Spear / Dagger (Str+d4)', 'Short Bow (Range 12/24/48, Damage 2d6)', 'Scraps of Hide Armor (+1 Armor)'],
    description: 'Wily, wiry subterranean raiders who rely on numbers, traps, poisoned arrows, and pitch-black tunnels.',
    tactics: 'Fires volleys from darkness, retreats through crevices too small for medium heroes, and ambushes stragglers.',
    habitat: 'Subterranean warrens, abandoned mine shafts, and gloomy woodlands.'
  },
  {
    id: 'core_ogre',
    name: 'Ogre',
    subtitle: 'Monstrous Brute',
    sourcebook: 'Core Rules',
    classification: 'Monstrosity',
    isWildCard: false,
    size: 3,
    scale: 'Large',
    pace: 7,
    parry: 5,
    toughness: 11,
    armor: 1,
    attributes: {
      agility: 'd6',
      smarts: 'd4',
      spirit: 'd6',
      strength: 'd12+1',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd8' },
      { name: 'Notice', die: 'd4' }
    ],
    abilities: [
      {
        name: 'Size +3',
        effect: 'Over 9 feet tall and 900 lbs. Toughness +3; attacks against it are at +1.'
      },
      {
        name: 'Reach 1',
        effect: 'Long arms and massive clubs allow attacking targets up to 1" (2 yards) away.'
      },
      {
        name: 'Sweep',
        effect: 'May strike all adjacent opponents with its club at a -2 Fighting penalty.'
      },
      {
        name: 'Thick Blubber & Hide',
        effect: '+1 Armor.'
      }
    ],
    gear: ['Tree-Trunk Great Club (Str+d8, AP 1, Reach 1)', 'Crude Hide Kilt (+1 Armor)'],
    description: 'Towering, ravenous hulks possessing immense raw physical strength and primitive, gluttonous instincts.',
    tactics: 'Charges straight into enemy ranks, swinging tree-limb clubs horizontally to shatter multiple foes at once.',
    habitat: 'Mountain passes, swamp hollows, and ruins.'
  },
  {
    id: 'core_skeleton',
    name: 'Skeleton',
    subtitle: 'Animated Bone Warrior',
    sourcebook: 'Core Rules',
    classification: 'Undead',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 7,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: 'd8',
      smarts: 'd4',
      spirit: 'd4',
      strength: 'd6',
      vigor: 'd6'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd4' },
      { name: 'Shooting', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Undead',
        effect: '+2 Toughness; +2 to recover from Shaken; immune to poison, disease, bleeding out, and Called Shots (except Head).'
      },
      {
        name: 'Bony Anatomy',
        effect: 'Piercing attacks and firearms suffer -4 damage; blunt/crushing attacks deal normal damage.'
      },
      {
        name: 'Fearless',
        effect: 'Mindless constructs immune to Fear and Intimidation tests.'
      }
    ],
    gear: ['Rusty Scimitar / Shortsword (Str+d6)', 'Rusted Buckler (+1 Parry)'],
    description: 'Bones of long-dead warriors held together by necromantic force, obeying simple relentless commands.',
    tactics: 'Advances without hesitation, ignores casualties, and fights until shattered to bone dust.',
    habitat: 'Tombs, crypts, ancient battlefields, and necromancers\' sanctums.'
  },
  {
    id: 'core_zombie',
    name: 'Walking Dead (Zombie)',
    subtitle: 'Relentless Corpse',
    sourcebook: 'Core Rules',
    classification: 'Undead',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 4,
    parry: 4,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: 'd6',
      smarts: 'd4',
      spirit: 'd4',
      strength: 'd6',
      vigor: 'd6'
    },
    skills: [
      { name: 'Athletics', die: 'd4' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd4' }
    ],
    abilities: [
      {
        name: 'Undead',
        effect: '+2 Toughness; +2 to recover from Shaken; immune to poison, disease, bleeding, and Called Shots (except Head).'
      },
      {
        name: 'Weak Spot: Head',
        effect: 'Called shots to the head deal +4 damage as normal.'
      },
      {
        name: 'Fear (-0)',
        effect: 'Anyone encountering walking corpses must make a Fear test.'
      },
      {
        name: 'Claws & Teeth',
        effect: 'Str+d4 damage.'
      }
    ],
    description: 'Shambling reanimated dead driven by a hunger for living flesh or bonded to a dark necromantic summoner.',
    tactics: 'Overwhelms by sheer relentless weight of numbers, swarming around survivors to drag them down.',
    habitat: 'Graveyards, crypts, cursed ruins, and post-apocalyptic wastelands.'
  },
  {
    id: 'core_ghost',
    name: 'Ghost / Spectre',
    subtitle: 'Tormented Incorporeal Spirit',
    sourcebook: 'Core Rules',
    classification: 'Undead',
    isWildCard: true,
    size: 0,
    scale: 'Normal',
    pace: 6,
    parry: 6,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: 'd6',
      smarts: 'd6',
      spirit: 'd10',
      strength: 'd6',
      vigor: 'd6'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd10' },
      { name: 'Notice', die: 'd8' },
      { name: 'Stealth', die: 'd12' }
    ],
    abilities: [
      {
        name: 'Ethereal',
        effect: 'Immune to non-magical physical attacks. Can pass freely through walls and solid barriers.'
      },
      {
        name: 'Fear (-2)',
        effect: 'Witnessing this spectral horror requires a Spirit roll at -2.'
      },
      {
        name: 'Corrupting Chilling Touch',
        effect: 'Touch attack deals Spirit die (d10) damage, ignoring non-magical armor.'
      },
      {
        name: 'Energy Drain',
        effect: 'A victim suffering a Wound from the ghost must succeed at a Vigor roll or lose 1 die type in Strength.'
      },
      {
        name: 'Flight',
        effect: 'Pace 6, can hover and float vertically.'
      }
    ],
    description: 'Restless wraith anchored to the mortal realm by violent death, unfinished vengeance, or an ancient curse.',
    tactics: 'Phases through floorboards and stone walls to strike characters from unexpected angles, chilling their life force.',
    habitat: 'Haunted manors, ruined keeps, catacombs, and execution sites.'
  },
  {
    id: 'core_vampire',
    name: 'Vampire (Master)',
    subtitle: 'Immortal Lord of the Night',
    sourcebook: 'Core Rules',
    classification: 'Undead',
    isWildCard: true,
    size: 0,
    scale: 'Normal',
    pace: 8,
    parry: 8,
    toughness: 11,
    armor: 2,
    attributes: {
      agility: 'd10',
      smarts: 'd10',
      spirit: 'd10',
      strength: 'd12+2',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd10' },
      { name: 'Fighting', die: 'd10' },
      { name: 'Intimidation', die: 'd10' },
      { name: 'Notice', die: 'd10' },
      { name: 'Persuasion', die: 'd10' },
      { name: 'Stealth', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Undead',
        effect: '+2 Toughness; +2 to recover from Shaken; immune to disease, poison, and drowning.'
      },
      {
        name: 'Fast Regeneration',
        effect: 'Makes a natural Vigor roll every round to heal damage unless caused by fire, sunlight, or holy water.'
      },
      {
        name: 'Mist Form',
        effect: 'May turn into a cloud of mist as a free action, becoming immune to all non-magical physical damage.'
      },
      {
        name: 'Fangs & Claws',
        effect: 'Str+d8 damage, AP 2.'
      },
      {
        name: 'Blood Drain',
        effect: 'Drains 1 Vigor level per round from pinned or helpless victims, healing 1 Wound per round drained.'
      },
      {
        name: 'Weaknesses',
        effect: 'Sunlight deals 4d6 damage per round. A wooden stake through the heart paralyzes; decapitation slays.'
      }
    ],
    description: 'Sophisticated yet predatory immortal who has mastered dark arcana and rules over thralls from gothic castles.',
    tactics: 'Uses supernatural charm and darkness to isolate heroes, tearing into melee with blinding agility and claws.',
    habitat: 'Gothic castles, underground sepulchers, and aristocratic estates.'
  },
  {
    id: 'core_werewolf',
    name: 'Werewolf',
    subtitle: 'Lycanthrope Beast',
    sourcebook: 'Core Rules',
    classification: 'Monstrosity',
    isWildCard: true,
    size: 1,
    scale: 'Normal',
    pace: 8,
    parry: 7,
    toughness: 10,
    armor: 2,
    attributes: {
      agility: 'd8',
      smarts: 'd6',
      spirit: 'd8',
      strength: 'd12+1',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Intimidation', die: 'd10' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      {
        name: 'Invulnerability',
        effect: 'Can only be Shaken by non-silver weapons; only Silver weapons, magic, or fire cause Wounds.'
      },
      {
        name: 'Claws & Bite',
        effect: 'Str+d8 damage, AP 2.'
      },
      {
        name: 'Fast Regeneration',
        effect: 'Makes a natural Vigor roll every round to heal a Wound (cannot heal silver wounds).'
      },
      {
        name: 'Fear (-2)',
        effect: 'Terrifying bestial roar forces a Spirit roll at -2.'
      },
      {
        name: 'Infectious Bite',
        effect: 'Victims slain or badly wounded must make a Vigor roll or contract Lycanthropy on the full moon.'
      }
    ],
    description: 'A cursed human cursed to transform beneath the full moon into an eight-foot bipedal wolf-man of pure bloodlust.',
    tactics: 'Leaps into combat with furious pounces, shrugging off standard weapons while savaging targets with silver claws.',
    habitat: 'Dark woodlands, moorlands, and secluded rustic villages.'
  },
  {
    id: 'core_red_dragon',
    name: 'Red Dragon (Adult)',
    subtitle: 'Apex Wyrm of Fire',
    sourcebook: 'Core Rules',
    classification: 'Dragon',
    isWildCard: true,
    size: 7,
    scale: 'Huge',
    pace: 8,
    parry: 8,
    toughness: 21,
    armor: 6,
    attributes: {
      agility: 'd8',
      smarts: 'd10',
      spirit: 'd12',
      strength: 'd12+6',
      vigor: 'd12'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd10' },
      { name: 'Intimidation', die: 'd12' },
      { name: 'Notice', die: 'd10' },
      { name: 'Occult', die: 'd8' },
      { name: 'Persuasion', die: 'd8' }
    ],
    abilities: [
      {
        name: 'Breath Weapon (Fire)',
        effect: 'Cone Template, 4d6 damage, Heavy Weapon. Targets catch fire.'
      },
      {
        name: 'Bite & Claws',
        effect: 'Str+d8 damage, AP 4, Heavy Weapon, Reach 2.'
      },
      {
        name: 'Flight',
        effect: 'Pace 16 (MPH 35), can hover and dive.'
      },
      {
        name: 'Heavy Scaled Armor (+6)',
        effect: 'Impervious to non-Heavy Weapons or non-armor-piercing attacks.'
      },
      {
        name: 'Fear (-4)',
        effect: 'The awe-inspiring majesty of an adult dragon forces Spirit rolls at -4.'
      },
      {
        name: 'Tail Slap',
        effect: 'May strike targets in rear arc for Str+d6 damage, Reach 3.'
      },
      {
        name: 'Size +7',
        effect: 'Huge scale (+2 to hit it); gains +7 Toughness and can take 4 Wounds.'
      }
    ],
    description: 'Ancient, greedy, and terrifyingly intelligent draconic titan that hoards mountains of gold inside volcanic lairs.',
    tactics: 'Opens combat with sweeping strafing runs of dragonfire, landing to crush cavalry and warriors with sweeps and tail lashes.',
    habitat: 'Volcanic calderas, cavernous mountain vaults, and subterranean magma chambers.'
  },

  // ==========================================================================
  // FANTASY COMPANION
  // ==========================================================================
  {
    id: 'fc_lich_lord',
    name: 'Lich Lord',
    subtitle: 'Archmage of the Undying',
    sourcebook: 'Fantasy Companion',
    classification: 'Undead',
    isWildCard: true,
    size: 0,
    scale: 'Normal',
    pace: 6,
    parry: 7,
    toughness: 14,
    armor: 4,
    attributes: {
      agility: 'd8',
      smarts: 'd12+2',
      spirit: 'd12',
      strength: 'd8',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Intimidation', die: 'd12' },
      { name: 'Notice', die: 'd10' },
      { name: 'Occult', die: 'd12+2' },
      { name: 'Spellcasting', die: 'd12+2' }
    ],
    abilities: [
      {
        name: 'Undead',
        effect: '+2 Toughness; immune to poison, disease, drowning, and called shots (except head).'
      },
      {
        name: 'Soul Phylactery',
        effect: 'If destroyed, reforms at its hidden soul phylactery within 1d10 days unless the phylactery is shattered.'
      },
      {
        name: 'Paralyzing Touch',
        effect: 'Touch attack deals Str+d6 plus victim must succeed at Vigor -2 or be Paralyzed for 1 hour.'
      },
      {
        name: 'Master Necromancer',
        effect: '50 Power Points; knows Bolt, Blast, Havoc, Dispel, Zombie, Puppet, Teleport, and Deflection.'
      },
      {
        name: 'Fear Aura (-3)',
        effect: 'A chilling aura of death forces all who approach within 10" to roll Fear at -3.'
      }
    ],
    gear: ['Robes of the Necromancer (+4 Armor)', 'Staff of the Desolator (Str+d6, +1 to Spellcasting)'],
    description: 'An ancient mortal wizard who traded their mortality for eternal unlife through dark forbidden rituals.',
    tactics: 'Casts defensive wards and summons walls of skeletons before devastating hero ranks with maximized death blasts.',
    habitat: 'Necropolises, sunken spires, and obsidian towers.'
  },
  {
    id: 'fc_beholder_evil_eye',
    name: 'Evil Eye (Sphere of Many Eyes)',
    subtitle: 'Aberrant Arcane Tyrant',
    sourcebook: 'Fantasy Companion',
    classification: 'Aberration',
    isWildCard: true,
    size: 3,
    scale: 'Large',
    pace: 6,
    parry: 6,
    toughness: 13,
    armor: 3,
    attributes: {
      agility: 'd8',
      smarts: 'd12',
      spirit: 'd10',
      strength: 'd8',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd12' },
      { name: 'Shooting', die: 'd10' },
      { name: 'Occult', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Central Anti-Magic Eye',
        effect: 'Projects a 90° cone of anti-magic out to 25". All spells and magical items inside are suppressed.'
      },
      {
        name: '10 Eyestalk Beams',
        effect: 'May fire up to 3 random eye rays per turn without multi-action penalty: Disintegration (4d6 AP 10), Telekinesis, Charm, Sleep, Fear, and Death.'
      },
      {
        name: 'All-Around Vision',
        effect: 'Eyestalks cover 360 degrees; cannot be flanked or backstabbed.'
      },
      {
        name: 'Levitation',
        effect: 'Floats effortlessly with Pace 6 and vertical maneuvering.'
      },
      {
        name: 'Bite',
        effect: 'Str+d6 damage, AP 2.'
      }
    ],
    description: 'A floating bulbous orb dominated by a huge cyclopean central eye and a crown of writhing ocular stalks.',
    tactics: 'Suppresses enemy spellcasters with its central eye while firing targeted disintegration rays at melee combatants.',
    habitat: 'Underdark caverns, abyssal labyrinths, and arcane strongholds.'
  },
  {
    id: 'fc_chimera',
    name: 'Chimera',
    subtitle: 'Three-Headed Hybrid Monstrosity',
    sourcebook: 'Fantasy Companion',
    classification: 'Monstrosity',
    isWildCard: false,
    size: 3,
    scale: 'Large',
    pace: 8,
    parry: 7,
    toughness: 12,
    armor: 2,
    attributes: {
      agility: 'd8',
      smarts: 'd6 (A)',
      spirit: 'd8',
      strength: 'd12',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Intimidation', die: 'd8' },
      { name: 'Notice', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Three Heads',
        effect: 'Lion head bites (Str+d8), Goat head gores (Str+d6, AP 2), Dragon head breathes fire (Cone Template, 3d6).'
      },
      {
        name: 'Three Actions',
        effect: 'The chimera may take three independent actions per turn with no multi-action penalty.'
      },
      {
        name: 'Flight',
        effect: 'Leathery dragon wings grant Pace 10.'
      },
      {
        name: 'Size +3',
        effect: 'Massive hybrid beast standing 9 feet tall.'
      }
    ],
    description: 'A hideous, chaotic fusion of lion, goat, and red dragon born from ancient primordial curses.',
    tactics: 'Flies over adventuring groups, raining fire from above before diving down to bite and gore simultaneously.',
    habitat: 'Craggy peaks, badlands, and scorched wilderness.'
  },
  {
    id: 'fc_basilisk',
    name: 'Basilisk',
    subtitle: 'Eight-Legged Stone-Gazer',
    sourcebook: 'Fantasy Companion',
    classification: 'Beast',
    isWildCard: false,
    size: 2,
    scale: 'Large',
    pace: 5,
    parry: 6,
    toughness: 11,
    armor: 3,
    attributes: {
      agility: 'd6',
      smarts: 'd4 (A)',
      spirit: 'd8',
      strength: 'd10',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd8' },
      { name: 'Stealth', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Petrifying Gaze',
        effect: 'Anyone meeting the basilisk\'s gaze within 10" must make a Vigor roll at -2 or begin turning to stone (Paralyzed, permanently petrified if failed a second time).'
      },
      {
        name: 'Poisonous Bite',
        effect: 'Str+d6 damage plus Lethal Poison (Vigor roll or suffer immediate Incapacitation).'
      },
      {
        name: 'Scaled Carapace',
        effect: '+3 Armor from petrified reptilian scales.'
      }
    ],
    description: 'A heavy, eight-legged serpentine lizard whose eerie golden gaze turns flesh to brittle limestone.',
    tactics: 'Lurks among the lifelike stone statues of previous victims, staring directly into the eyes of approaching adventurers.',
    habitat: 'Subterranean caverns, petrified forests, and ancient catacombs.'
  },

  // ==========================================================================
  // SCI-FI COMPANION
  // ==========================================================================
  {
    id: 'scifi_xenomorph_apex',
    name: 'Xenomorph Apex Stalker',
    subtitle: 'Perfect Organism',
    sourcebook: 'Sci-Fi Companion',
    classification: 'Alien',
    isWildCard: true,
    size: 1,
    scale: 'Normal',
    pace: 10,
    parry: 8,
    toughness: 12,
    armor: 4,
    attributes: {
      agility: 'd12',
      smarts: 'd8',
      spirit: 'd10',
      strength: 'd12+1',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd12' },
      { name: 'Fighting', die: 'd10' },
      { name: 'Intimidation', die: 'd10' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd12+2' }
    ],
    abilities: [
      {
        name: 'Acid Blood (3d6 AP 10)',
        effect: 'Whenever the creature suffers a Wound from an adjacent attack, acid sprays in a Small Blast Template dealing 3d6 damage and melting armor.'
      },
      {
        name: 'Wall Walker',
        effect: 'Can walk on walls and ceilings at full Pace without making Athletics rolls.'
      },
      {
        name: 'Barbed Tail Strike',
        effect: 'Str+d8 damage, AP 4, Reach 1.'
      },
      {
        name: 'Inner Jaws',
        effect: 'Called shot to head with grapple deals Str+d10 AP 6 damage.'
      },
      {
        name: 'Environmental Immunity',
        effect: 'Immune to vacuum, toxic atmospheres, and extreme sub-zero temperatures.'
      },
      {
        name: 'Chitin Armor (+4)',
        effect: 'Hardened silicon-chitin exoskeleton deflects kinetic rounds.'
      }
    ],
    description: 'An engineered bio-weapon of peerless lethality, equipped with silicon plating, acid blood, and biomechanical senses.',
    tactics: 'Stalks through ceiling maintenance conduits, striking lone sentries from vents and dragging them into the darkness.',
    habitat: 'Derelict spacecraft, terraforming stations, and infested hive worlds.'
  },
  {
    id: 'scifi_combat_automaton',
    name: 'Combat Automaton / War Droid',
    subtitle: 'Autonomous Heavy Sentry',
    sourcebook: 'Sci-Fi Companion',
    classification: 'Construct',
    isWildCard: false,
    size: 2,
    scale: 'Large',
    pace: 6,
    parry: 6,
    toughness: 14,
    armor: 6,
    attributes: {
      agility: 'd8',
      smarts: 'd8',
      spirit: 'd8',
      strength: 'd12',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Notice', die: 'd10' },
      { name: 'Shooting', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Construct',
        effect: '+2 to recover from Shaken; ignores 1 point of Wound penalties; immune to poison, disease, and morale tests.'
      },
      {
        name: 'Heavy Armor (+6)',
        effect: 'Ceramic-tungsten composite plates are immune to non-Heavy Weapons.'
      },
      {
        name: 'Target Lock Matrix',
        effect: '+2 to hit designated priority targets after the first round of observation.'
      },
      {
        name: 'Twin Integrated 25mm Autocannons',
        effect: 'Range 50/100/200, Damage 3d8, RoF 3, AP 4, Heavy Weapon.'
      },
      {
        name: 'Crushing Hydraulic Claws',
        effect: 'Str+d8 damage, AP 4.'
      }
    ],
    description: 'A nine-foot-tall bipedal armored battle droid armed with twin rotary autocannons and algorithmic target tracking.',
    tactics: 'Advances steadily in support of mechanized infantry, laying down suppressive fire with its high-velocity cannons.',
    habitat: 'Military research labs, starports, fortress complexes, and orbital shipyards.'
  },
  {
    id: 'scifi_cyberscavenger',
    name: 'Cyberscavenger Raider',
    subtitle: 'Wired Wasteland Outlaw',
    sourcebook: 'Sci-Fi Companion',
    classification: 'Humanoid & Folk',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 8,
    parry: 6,
    toughness: 9,
    armor: 3,
    attributes: {
      agility: 'd8',
      smarts: 'd6',
      spirit: 'd6',
      strength: 'd8',
      vigor: 'd8'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Notice', die: 'd6' },
      { name: 'Repair', die: 'd8' },
      { name: 'Shooting', die: 'd8' },
      { name: 'Stealth', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Wired Reflexes',
        effect: 'Level 1 initiative booster: deals an extra Action card and acts on the best.'
      },
      {
        name: 'Subdermal Armor (+3)',
        effect: 'Woven titanium mesh under the skin grants +3 Armor.'
      },
      {
        name: 'Cyber-Eye Optics',
        effect: 'Eliminates penalties for Dim and Dark lighting; built-in digital rangefinder.'
      }
    ],
    gear: ['Pulse Laser Carbine (Range 24/48/96, Damage 3d6, AP 4, RoF 2)', 'Vibro-Knife (Str+d6, AP 4)', 'Scavenged Powered Exosuit Harness'],
    description: 'Desperate outlaws who graft discarded combat cyberware into their bodies to survive barren salvage frontiers.',
    tactics: 'Utilizes cover and hyper-reflexes to execute hit-and-run ambushes against trade convoys.',
    habitat: 'Junkyard moons, irradiated space hulks, and planetary badlands.'
  },
  {
    id: 'scifi_psionic_parasite',
    name: 'Psionic Mind Parasite',
    subtitle: 'Cerebral Puppetmaster',
    sourcebook: 'Sci-Fi Companion',
    classification: 'Alien',
    isWildCard: true,
    size: -2,
    scale: 'Small',
    pace: 5,
    parry: 4,
    toughness: 4,
    armor: 0,
    attributes: {
      agility: 'd8',
      smarts: 'd12',
      spirit: 'd12',
      strength: 'd4',
      vigor: 'd6'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd4' },
      { name: 'Notice', die: 'd10' },
      { name: 'Psionics', die: 'd12+2' },
      { name: 'Stealth', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Host Infestation (Puppet)',
        effect: 'Can burrow onto a victim\'s spinal cord, taking full control of the body as per the Puppet power with a permanent duration.'
      },
      {
        name: 'Mind Blast',
        effect: 'Telepathic wave forces all targets in a Medium Blast Template to make a Spirit roll at -2 or be Stunned.'
      },
      {
        name: 'Size -2',
        effect: 'Resembles a bioluminescent centipede or jellyfish; -2 to be hit at range.'
      }
    ],
    description: 'A pale, multi-legged neural cephalopod capable of taking complete control of intelligent organic sentients.',
    tactics: 'Remains hidden inside an infected host, revealing itself only when forced to jump onto a new powerful host.',
    habitat: 'Derelict cryo-ships, alien temples, and quarantine facilities.'
  },

  // ==========================================================================
  // HORROR COMPANION
  // ==========================================================================
  {
    id: 'horror_shoggoth',
    name: 'Elder Shoggoth',
    subtitle: 'Amorphous Protoplasmic Abomination',
    sourcebook: 'Horror Companion',
    classification: 'Aberration',
    isWildCard: true,
    size: 5,
    scale: 'Huge',
    pace: 7,
    parry: 6,
    toughness: 18,
    armor: 4,
    attributes: {
      agility: 'd6',
      smarts: 'd8',
      spirit: 'd12',
      strength: 'd12+5',
      vigor: 'd12'
    },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Intimidation', die: 'd12+2' },
      { name: 'Notice', die: 'd10' }
    ],
    abilities: [
      {
        name: 'Mind-Shattering Terror (-4)',
        effect: 'Witnessing a shifting mass of eyes, teeth, and bubbling slime forces a Fear test at -4.'
      },
      {
        name: 'Amorphous Anatomy',
        effect: 'No distinct organs or anatomy; immune to Called Shots, piercing damage bonus, and decapitation.'
      },
      {
        name: 'Engulf & Crush',
        effect: 'May flow over targets in a Large Blast Template; victims suffer 3d6 crushing damage per round.'
      },
      {
        name: 'Pseudopod Slap',
        effect: 'Str+d8 damage, Reach 3, Heavy Weapon.'
      },
      {
        name: 'Size +5',
        effect: 'Weighs dozens of tons; gains +5 Toughness and Huge scale (+2 to be hit).'
      }
    ],
    description: 'A terrifying, shifting mound of black iridescence and pustules, chanting alien phonemes as it crushes everything.',
    tactics: 'Oozes relentlessly forward, rolling over barricades and engulfing entire squads into its acidic digestive mass.',
    habitat: 'Antarctic vaults, sunken oceanic ruins, and cosmic voids.'
  },
  {
    id: 'horror_wendigo',
    name: 'Wendigo',
    subtitle: 'Hunger of the Frozen Dark',
    sourcebook: 'Horror Companion',
    classification: 'Monstrosity',
    isWildCard: true,
    size: 2,
    scale: 'Large',
    pace: 10,
    parry: 8,
    toughness: 13,
    armor: 2,
    attributes: {
      agility: 'd10',
      smarts: 'd8',
      spirit: 'd10',
      strength: 'd12+2',
      vigor: 'd12'
    },
    skills: [
      { name: 'Athletics', die: 'd10' },
      { name: 'Fighting', die: 'd10' },
      { name: 'Intimidation', die: 'd12' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd12' }
    ],
    abilities: [
      {
        name: 'Blizzard Aura',
        effect: 'Freezing gale surrounds the creature out to 10"; visibility is reduced to Pitch Black and foes suffer 2d6 cold damage every minute.'
      },
      {
        name: 'Cannibal Hunger / Claws',
        effect: 'Str+d10 damage, AP 3; ignores thick winter clothing and armor.'
      },
      {
        name: 'Fear (-3)',
        effect: 'Howling scream forces Spirit rolls at -3.'
      },
      {
        name: 'Fast Regeneration',
        effect: 'Heals 1 Wound per round unless damage was inflicted by fire.'
      },
      {
        name: 'Weakness: Fire',
        effect: 'Suffers +4 damage from fire-based attacks.'
      }
    ],
    description: 'An emaciated, antlered monstrosity born from cannibalism during bitter sub-zero starvation.',
    tactics: 'Summons howling blizzards to blind expeditions, mimicking lost voices before snatching members one by one.',
    habitat: 'Deep northern boreal forests and blizzard-swept mountain peaks.'
  },
  {
    id: 'horror_cultist_zealot',
    name: 'Cultist Zealot',
    subtitle: 'Disciple of the Outer Gods',
    sourcebook: 'Horror Companion',
    classification: 'Humanoid & Folk',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 1,
    attributes: {
      agility: 'd6',
      smarts: 'd6',
      spirit: 'd8',
      strength: 'd6',
      vigor: 'd6'
    },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd6' },
      { name: 'Occult', die: 'd8' },
      { name: 'Shooting', die: 'd6' }
    ],
    abilities: [
      {
        name: 'Fanatic',
        effect: 'Will leap in front of attacks to protect their cult leader or summoned abomination.'
      },
      {
        name: 'Frenzied Sacrifice',
        effect: 'Gains +2 to Fighting and damage when bleeding or down to low health.'
      }
    ],
    gear: ['Ceremonial Kris Dagger (Str+d4, AP 1)', '.38 Snub Revolver (Range 10/20/40, Damage 2d6)', 'Occult Robes (+1 Armor)'],
    description: 'A deranged mortal whose sanity has been stripped away by forbidden grimoires and cosmic entities.',
    tactics: 'Swarms intruders with reckless disregard for life, seeking to complete the ritual before authorities arrive.',
    habitat: 'Abandoned basements, bayou altars, and derelict subway stations.'
  },

  // ==========================================================================
  // SUPER POWERS COMPANION
  // ==========================================================================
  {
    id: 'super_nemesis_warlord',
    name: 'Apex Supervillain',
    subtitle: 'Class-4 Metahuman Conqueror',
    sourcebook: 'Super Powers Companion',
    classification: 'Humanoid & Folk',
    isWildCard: true,
    size: 1,
    scale: 'Normal',
    pace: 8,
    parry: 8,
    toughness: 17,
    armor: 6,
    attributes: {
      agility: 'd10',
      smarts: 'd10',
      spirit: 'd10',
      strength: 'd12+4',
      vigor: 'd12'
    },
    skills: [
      { name: 'Athletics', die: 'd10' },
      { name: 'Fighting', die: 'd10' },
      { name: 'Focus', die: 'd12' },
      { name: 'Intimidation', die: 'd12' },
      { name: 'Notice', die: 'd8' }
    ],
    abilities: [
      {
        name: 'Kinetic Energy Blast',
        effect: 'Range 24/48/96, Damage 4d6, AP 8, Heavy Weapon, RoF 2.'
      },
      {
        name: 'Force Field (+6 Armor)',
        effect: 'Personal electromagnetic force field absorbs kinetic and energy attacks.'
      },
      {
        name: 'Super Strength (d12+4)',
        effect: 'Can lift tanks and tear open reinforced vault doors effortlessly.'
      },
      {
        name: 'Supersonic Flight',
        effect: 'Pace 24 (60 MPH), with rapid evasive maneuvers.'
      },
      {
        name: 'Uncanny Toughness',
        effect: 'Suffers 1 less Wound from all area-effect and explosive attacks.'
      }
    ],
    description: 'An arrogant metahuman overlord possessing devastating telekinetic blasts, invulnerable shields, and vast ambition.',
    tactics: 'Levitates above the battlefield, bombarding superheroes with concussive energy before closing for crushing melee strikes.',
    habitat: 'Orbital sky-citadels, secret volcano bases, and metropolitan rooftops.'
  },
  {
    id: 'super_gene_abomination',
    name: 'Gene-Spliced Abomination',
    subtitle: 'Escaped Biotech Experiment',
    sourcebook: 'Super Powers Companion',
    classification: 'Construct',
    isWildCard: false,
    size: 2,
    scale: 'Large',
    pace: 9,
    parry: 7,
    toughness: 13,
    armor: 3,
    attributes: {
      agility: 'd10',
      smarts: 'd4',
      spirit: 'd8',
      strength: 'd12+2',
      vigor: 'd10'
    },
    skills: [
      { name: 'Athletics', die: 'd10' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Notice', die: 'd8' }
    ],
    abilities: [
      {
        name: 'Multi-Limb Frenzy',
        effect: 'Has four muscular arms; may make two Fighting attacks per turn with no multi-action penalty.'
      },
      {
        name: 'Bone Claws',
        effect: 'Str+d8 damage, AP 3.'
      },
      {
        name: 'Acid Spit',
        effect: 'Range 6/12/24, Damage 2d8, AP 4.'
      },
      {
        name: 'Super Leap',
        effect: 'Leaps up to 12" vertically or horizontally as part of its movement.'
      }
    ],
    description: 'A terrifying amalgamation of human DNA, gorilla muscle fibers, and reptile scales produced in a black-budget laboratory.',
    tactics: 'Leaps across rooftops and alleyways, spitting acid to soften targets before ripping them apart with multiple arms.',
    habitat: 'Clandestine corporate laboratories, sewers, and industrial alleys.'
  }
];

export const SOURCEBOOK_DESCRIPTIONS: Record<string, string> = {
  'Core Rules': 'Universal fantasy, modern, horror, and classic pulp creatures from the Savage Worlds Adventure Edition core rules.',
  'Fantasy Companion': 'Archmages, aberrations, legendary beasts, and mythical monsters from fantasy settings.',
  'Sci-Fi Companion': 'Extraterrestrial apex predators, mechanized war droids, cybernetic raiders, and psionic parasites.',
  'Horror Companion': 'Cosmic dread, elder terrors, gothic night-stalkers, and unrelenting undead.',
  'Super Powers Companion': 'Metahuman nemeses, mutagenic abominations, and four-color super-threats.'
};
