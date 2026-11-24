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
  // SCI-FI COMPANION (OFFICIAL SWADE SCIENCE FICTION COMPANION BESTIARY)
  // ==========================================================================
  {
    id: "scifi_acid_pitcher",
    name: "Acid Pitcher",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 6,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d4" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Acid", effect: "Creatures who are Bound or Entangled by an acid pitcher\u2019s tentacles take 2d6 acid damage at the start of their turn." },
      { name: "Camouflage", effect: "Acid pitchers blend in with the ground and other plants, granting them +2 to Stealth rolls when perfectly still." },
      { name: "Dug In", effect: "The heart of the plant lies deep underground and is normally unreachable. Its tentacles may be attacked normally (see Savage Worlds), and if severed the plant can no longer grapple effectively and withdraws into the soil." },
      { name: "Plant", effect: "Immune to paralysis, poison, puppet, slumber, Stun; doesn\u2019t sleep." },
      { name: "Tentacles (1)", effect: "Reach 1. Acid pitchers have six thick fronds which collectively function as one tentacle." }
    ],
    
    description: "These carnivorous plants look something across, and set down into the ground. Filling sensing ground vibrations, but only to a"
  },
  {
    id: "scifi_aerial_stalker",
    name: "Aerial Stalker",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 7,
    scale: "Large",
    pace: "\u2014",
    parry: 6,
    toughness: 15,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12+9",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Acid", effect: "Creatures who are Bound or Entangled by an aerial stalker\u2019s tentacles take 2d6 acid damage at the start of their turn." },
      { name: "Flight", effect: "Pace 6." },
      { name: "Immunity", effect: "Immune to acid-based attacks." },
      { name: "Size 7 (Large)", effect: "An aerial stalker\u2019s \"body\" is a gasbag roughly the size of a truck." },
      { name: "Tentacles (4)", effect: "Four tentacle actions and Reach 6. Tentacles deal Str+d4 damage." },
      { name: "Very Resilient", effect: "Aerial stalkers can take two additional Wounds before being Incapacitated." }
    ],
    
    description: "These peculiar, lighter-than-air creatures live in the atmosphere of some worlds, consuming airborne animals and insects. Eventually they become large enough to attack creatures on the ground, seizing them in massive tentacles coated with acidic digestive enzymes."
  },
  {
    id: "scifi_apex",
    name: "Apex",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 7,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 17,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12+6",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Thick hide." },
      { name: "Bite", effect: "Str+d8" },
      { name: "Electroreception", effect: "Apexes sense electrical signals, ignoring Illumination, Stealth, and invisibility penalties. They can be \"blinded\" with a strong electrical shock, however." },
      { name: "Hardy", effect: "A second Shaken result does not cause a Wound." },
      { name: "Size 7 (Large)", effect: "These animals are nearly 40 feet long and weigh about five tons." },
      { name: "Swat", effect: "Ignore 4 points of Scale penalties when attacking creatures smaller than itself." }
    ],
    
    description: "This massive creature measures 40 feet long from the tip of its snout to the end of its thick tail, and stands over 12' high at the medial shoulder. It travels mainly on its medial and hind legs, leaving its smaller, but powerful forelegs free for grasping and tearing its victims. An apex is a solitary but relentless hunter, often pursuing its prey for hours or even days, sometimes only relenting if another, less challenging meal presents itself."
  },
  {
    id: "scifi_aquarian",
    name: "Aquarian",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Taunt", die: "d6" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 6." },
      { name: "Atmospheric Dependency", effect: "Aquarians need to breathe water in order to survive. Those without a rebreather (or spacesuit if the pressure is too low) must make a Vigor check every round or suffer a Fatigue level that can lead to death. Recovery is only possible when the character receives water at standard pressure and one Fatigue level is recovered every 10 minutes." },
      { name: "Poisonous Touch", effect: "With a successful unarmed attack, the aquarian may opt to target the victim with Paralyzing Poison (see Savage Worlds)." },
      { name: "Toughness +1", effect: "Life in the depths makes aquarians resilient." }
    ],
    gear: ["Molecular spear (Str+d6+2, AP 3, Reach 1, Parry +1 if used two-handed)"],
    description: "This profile includes most types of water- dwelling humanoids, such as those from aquatic planets."
  },
  {
    id: "scifi_arc_beetle",
    name: "Arc Beetle",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 6,
    parry: 5,
    toughness: 11,
    armor: 3,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d10",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Armor +3", effect: "Thick shell." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Electricity", effect: "Arc beetles fire bolts of electricity from their antennae. This attack uses Shooting. Range 6/12/24, Damage 3d6, AP 2." },
      { name: "Size 2", effect: "Arc beetles are over 6\u2019 long and 4\u2019 high." }
    ],
    
    description: "Arc beetles are armored insects with a distinctive yellow and blue striped shell. Protruding from their forehead are two long antennae that crackle with bioelectrical energy and can throw bolts of electricity to a range of over 45 yards."
  },
  {
    id: "scifi_assassin",
    name: "Assassin",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d10",
      smarts: "d6",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d8" }, { name: "Thievery", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), power short sword (Str+d6, powered), laser rifle (Range 30/60/120, Damage 3d6, RoF 3, AP 2, Cauterize, No Recoil, Overcharge)", "\u008f MASTER ASSASSIN"],
    description: "Assassins are hired killers. They may be loners or belong to an organized guild or government agency. What they generally have in common is a lack of scruples about killing for money, though a rare few might slay in the name of a cause\u2014righteous or not."
  },
  {
    id: "scifi_master_assassin",
    name: "Master Assassin",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 9,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d10",
      smarts: "d8",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d12" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d12" }, { name: "Thievery", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), energy sword (Str+d8 (I), AP 4, HW), laser rifle (Range 30/60/120, Damage 3d6, RoF 3, AP 2, Cauterize, No Recoil, Overcharge)", "Installed cyberware: Face changer, skill bonus (enhanced reflexes, Fighting +2), skill bonus (targeting eye, Shooting +2)"],
    description: ""
  },
  {
    id: "scifi_assimilator",
    name: "Assimilator",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 8,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Battle", die: "d4" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Hacking", die: "d6" }, { name: "Healing", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d6" }, { name: "Repair", die: "d6" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Assimilated", effect: "+ 2 Toughness; +2 to recover from being Shaken; no additional damage from Called Shots; ignores 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison. Immune to Fear, Intimidation, and Taunt." },
      { name: "Hive Mind", effect: "Can communicate with other assimilators within 5\" (10 yards)." },
      { name: "Inhuman", effect: "Assimilators are not subject to Strain or side effects from cyberware." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the assimilator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." }
    ],
    gear: ["Blaster rifle (Range 25/50/100, Damage 3d6+2, AP 2)", "Installed cyberware: Attribute increase (all attributes), enhanced hearing, enhanced vision, hardy, redundant organs, targeting system, threat analyzer, integrated gear (blaster rifle)"],
    description: "Assimilators are an emotionless, calculating, coldly efficient species of cybernetic organisms. They multiply by capturing enemies and then forcibly incorporating\u2014 \"assimilating\"\u2014them into the colony in a harrowing operation which infuses their body with a variety of crude cybernetic enhancements, breaking their mind and spirit in the process. The new member becomes linked to the collective hive mind, and can share and access knowledge with other members of the colony. Any intelligent creature can be made into an assimilator by increasing each of its attributes one die type and adding the following Special Abilities. Assimilators also lose all Hindrances but retain any Edges and skills. Regardless of species, assimilators appear pale and lifeless as though freshly dead, and are completely expressionless. Assimilators are coldly rational and do not understand emotions, nor do they understand abstract concepts like metaphors, honor, fate, etc. to recover from being Shaken; no additional damage from Called Shots; ignores 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison. Immune to Fear, Intimidation, and Taunt. assimilators within 5\" (10 yards). and other sensors ignore Illumination penalties. If it scans as an action, the assimilator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards. This profile is for a typical assimilator, who performs a variety of functions for the colony."
  },
  {
    id: "scifi_avion",
    name: "Avion",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 5,
    parry: 5,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Taunt", die: "d6" }],
    abilities: [
      { name: "Flight", effect: "Pace 6." },
      { name: "Frail", effect: "\u22121 Toughness." },
      { name: "Reduced Pace", effect: "Pace \u20131 and running die reduced one step on the ground." }
    ],
    gear: ["Body armor (+4), blaster pistol (Range 12/24/48, Damage 2d6+2, AP 2), vibro blade (Str+d6+d4, AP 2)"],
    description: "Avions are winged humanoids who dwell on gas giants, planets with low gravity, or other lofty environments."
  },
  {
    id: "scifi_avrok",
    name: "Avrok",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 6,
    scale: "Large",
    pace: 6,
    parry: 6,
    toughness: 15,
    armor: 2,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+2",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d12" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d8" }, { name: "Survival", die: "d8" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 12." },
      { name: "Armor +2", effect: "Thick hide." },
      { name: "Bite", effect: "Strength+d8." },
      { name: "Shake", effect: "If the beast hits with a raise on a bite attack, it shakes its powerful head back and forth violently, dealing +2d6 bonus damage instead of the usual +1d6." },
      { name: "Size 6 (Large)", effect: "Avroks measure 35\u2019." }
    ],
    
    description: "The avrok is a massive crocodilian creature found on more primitive worlds with plentiful game."
  },
  {
    id: "scifi_barbed_tongue_lizard",
    name: "Barbed-Tongue Lizard",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 10,
    parry: 8,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d4",
      strength: "d12+1",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d12" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d8." },
      { name: "Fleet-Footed", effect: "d10 running die." },
      { name: "Low Light Vision", effect: "No penalties for Dim and Dark lighting." },
      { name: "Size 4 (Large)", effect: "Barbed-tongues weigh 2000 pounds." },
      { name: "Tongue", effect: "Str+d4, Reach 2. The tongue is tipped with bony barbs that deliver a pain-causing poison. Anyone Shaken or Wounded must make a Vigor roll or be Stunned." }
    ],
    
    description: "Barbed-tongue lizards get their name from the sharp bony \u201cteeth\u201d at the end of their long tongue. The barbs deliver a poison which causes immense pain but little physical harm. Some aggressive species use this to stun and eat their prey, while others use it to escape. Barbed-tongue lizards have dark red scales they can flush with blood to turn bright red and startle potential threats."
  },
  {
    id: "scifi_batspider",
    name: "Batspider",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 5,
    toughness: 2,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "1",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Backbiter", effect: "If a batspider has Surprise, it flies onto its opponent\u2019s back and attacks with The Drop. The victim suffers a \u22122 penalty to attack the creature until it\u2019s Shaken or Wounded, at which point it detaches and attacks normally (or flees)." },
      { name: "Flight", effect: "Pace 8." },
      { name: "Poison Bite (\u22122)", effect: "Batspiders can\u2019t cause true damage with their bite and thus can\u2019t penetrate armor, but they seek out bare skin or light clothing, making a Called Shot if necessary. With a successful Fighting roll as a Touch Attack (+2) they manage to bite and deliver their poison. Victims must make a Vigor roll at \u22122 (\u22124 if it hit with a raise) or suffer 2d4 damage at the start of each subsequent round." },
      { name: "Size \u22123 (Very Small)", effect: "Batspiders are six inches in diameter." },
      { name: "Wall Walker", effect: "Batspiders can move across vertical or horizontal surfaces at their Pace." }
    ],
    
    description: "Batspiders are a species of flying arachnids. Each spider is about six inches across with two sets of bat-like wings extending from its back. Batspiders commonly dwell in forests or jungles, swooping down from trees to land on their prey\u2019s back. They are often found as solitary hunters, though sometimes as many as a dozen gather together. They never form true swarms."
  },
  {
    id: "scifi_bleeder_rabbit",
    name: "Bleeder Rabbit",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 1,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d10",
      strength: "d4",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d10" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +1", effect: "Scaly skin." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Rending Attack", effect: "Victims Shaken or Wounded by a bite must make a Vigor roll as a free action at the beginning of each next turn until they roll a raise, suffering a Wound with each failure." },
      { name: "Size \u22121", effect: "Bleeders stand 3\u2019 in height." }
    ],
    
    description: "Imagine a rabbit the size of a small child covered with scaly skin like that of an armadillo. Then enlarge its teeth to the length of an adult human\u2019s index finger. That\u2019s a bleeder rabbit\u2014or bleeder bunny as some crews prefer. Despite their relatively small size, bleeder bunnies can kill much larger prey with a single bite. Their saliva acts as an anticoagulant, preventing the deep wound from clotting. All the bunny has to do is make one bite, then flee to a safe distance and wait for its prey to slowly bleed to death."
  },
  {
    id: "scifi_bone_spider",
    name: "Bone Spider",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 6,
    armor: 2,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Armor +2", effect: "Bony shell." },
      { name: "Bite", effect: "Str+d6." },
      { name: "Fear (\u22122)", effect: "They are nightmarish creatures." },
      { name: "Paralysis", effect: "Anyone Shaken or Wounded by a bone spider must make a Vigor roll or be paralyzed for 2d6 rounds." },
      { name: "Size \u22122 (Small)", effect: "Bone spiders are the same size as human heads with 12-inch-long legs." }
    ],
    
    description: "Bone spiders are nightmarish creatures from desolate worlds. They have bodies the size of a man\u2019s head, 12-inch-long legs, and are covered in black, segmented, bony armor. At the end of their extendable jaws are four sharp fangs surrounding a circular mouth filled with teeth capable of cutting through bone. It\u2019s a flesh eater and willing to attack opponents much larger than itself."
  },
  {
    id: "scifi_bounty_hunter",
    name: "Bounty Hunter",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }, { name: "Taunt", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), blaster rifle (Range 25/50/100, Damage 3d6+2, AP 2), molecular knife (Str+d4+2, AP 2), 3\u00d7 stun grenades, stun baton (Str+d4, stun charge), handcuffs, commlink", "\u008f ELITE BOUNTY HUNTER"],
    description: "Bounty hunters serve as a form of intergalactic police, hunting down criminals where governments have no jurisdiction. Some respect local laws and cooperate with law enforcement agencies. Others use whatever methods they deem necessary to catch their quarry."
  },
  {
    id: "scifi_elite_bounty_hunter",
    name: "Elite Bounty Hunter",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d8" }, { name: "Driving", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d8" }, { name: "Piloting", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }, { name: "Taunt", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), blaster rifle (Range 25/50/100, Damage 3d6+2, AP 2), molecular knife (Str+d4+2, AP 2), 3\u00d7 stun grenades, stun baton (Str+d4, stun charge), handcuffs, commlink"],
    description: ""
  },
  {
    id: "scifi_brain_eater",
    name: "Brain Eater",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 6,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d10" }, { name: "Stealth", die: "d12" }],
    abilities: [
      { name: "Armor +2", effect: "Hard, plastic-like carapace." },
      { name: "Bite", effect: "Str+d4. +2 to Athletics and Strength rolls made to grapple." },
      { name: "Immunity", effect: "Acid." },
      { name: "Low Light Vision", effect: "Ignore penalties for Dim and Dark Illumination." },
      { name: "Mimicry", effect: "Observers are at \u22124 on Notice rolls to distinguish a brain eater from a real helmet." },
      { name: "Poison (\u22122)", effect: "Brain eaters inject their prey with a numbing agent that prevents them from speaking but allows them to move and act normally (though with no memory of the attack). After a number of hours equal to half the victim\u2019s Smarts, they perish." },
      { name: "Size \u22123 (Very Small)", effect: "The typical brain eater is the same size, shape, and weight as an astronaut\u2019s helmet." },
      { name: "Slow Regeneration", effect: "A brain eater makes a natural healing roll once per day to recover from its Wounds." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." },
      { name: "Very Resilient", effect: "Brain eaters can take two Wounds before being Incapacitated." }
    ],
    
    description: "These nightmarish creatures look, to the casual eye, exactly like a space helmet. But when placed on the head they clamp their jaw down on the unsuspecting victim and stun them with a powerful numbing agent. As if sleepwalking, the victim can continue to move around for a few hours and even perform tasks\u2014all while the horror gradually digests his brain! When the victim finally dies, the brain eater releases the body and skitters off on tiny, retractable legs to find a new hiding place and repeat the process. How these things evolved, or where they came from, remains a mystery. In fact, the mere existence of these horrors is heavily disputed, though just about every pub in the space lanes has a jockey who swears he knew a guy who knew a guy, etc. Brain eaters that take on other forms\u2014such as gloves, spacesuits, sleeping bags, or even entire rooms\u2014might certainly exist."
  },
  {
    id: "scifi_brainiac",
    name: "Brainiac",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Battle", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d6" }, { name: "Science", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Taunt", die: "d6" }],
    abilities: [
      { name: "Atmospheric Dependency", effect: "Brainiacs treat all atmospheres (other than their own) as Hazardous. Those without a spacesuit or rebreather must make a Vigor roll every hour or suffer Fatigue." },
      { name: "Sickly", effect: "Brainiacs are especially susceptible to foreign diseases. They subtract 2 from any Vigor roll made to resist or recover from disease." },
      { name: "Size \u22121", effect: "Brainiacs are four feet tall." },
      { name: "Squishy", effect: "Brainiacs have tender bodies and exposed brains. Their Toughness is reduced by 1." },
      { name: "Tentacles (4)", effect: "In their true form brainiacs have four tentacle actions and Reach 1." }
    ],
    gear: ["Armored spacesuit (+4), laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge), personal force field (+4), atmosphere recycler"],
    description: "The aliens called \"brainiacs\" have a different name for their own species, but earned their nickname from their terrifying appearance\u2014 akin to a zombie with an outsized, external brain\u2014and their borderline sadistic aggression. In their normal form they look like humanoids inside specially built spacesuits. However, if the suit is damaged, the brainiacs reveal their true shape: an octopus-like creature comprised of a huge brain, bulbous eyestalks, and a dozen whiplike tentacles. Brainiac spacecraft are shaped like discs or manta rays, and their infantry-support walkers (see page 179) utilize three tall legs. In some campaigns, brainiacs might also employ Psionics or Weird Science devices."
  },
  {
    id: "scifi_bristled_gorer",
    name: "Bristled Gorer",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Tusks", effect: "Str+d6." }
    ],
    
    description: "Bristled gorers are herbivores that use their four sharp tusks to dig up roots and tubers. Although predominantly flat, their teeth and jaws are more than capable of crushing thick fibers. They are quadrupedal and covered in short fur, which stands on end when the creature is startled, and almost doubles its effective size. The flesh of a gorer is extremely tasty, and native beings hunt them. Despite being herbivorous, gorers are aggressive when provoked and their tusks are quite capable of slicing through flesh and bone."
  },
  {
    id: "scifi_citizen",
    name: "Citizen",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Items appropriate to their trade", "Some have a simple firearm or knife (Str+d4)"],
    description: "Citizens are crafters, miners, shop owners, farmers, and far more. They know their trade and have little interest in much else. They tend to stick to their business and their families."
  },
  {
    id: "scifi_corporate_executive",
    name: "Corporate Executive",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Academics", die: "d6" }, { name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Research", die: "d6" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }, { name: "Taunt", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Suit, personal data device"],
    description: "Corporate executives keep the wheels of industry turning\u2014and have a taste for money and power. In dangerous worlds, most are attended by at least one bodyguard."
  },
  {
    id: "scifi_senior_executive",
    name: "Senior Executive",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Academics", die: "d8" }, { name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d8" }, { name: "Research", die: "d8" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d6" }, { name: "Taunt", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Expensive suit, personal data device"],
    description: "Senior executives are decision makers at the highest levels within their corporation, including the chief executive officer, chief financial officer, and various other top- ranking chairpersons. They are well-educated, business savvy, and highly driven."
  },
  {
    id: "scifi_creature_from_the_id",
    name: "Creature From The Id",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 3,
    scale: "Large",
    pace: 6,
    parry: 7,
    toughness: 10,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d10",
      strength: "d12+8",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Bite", effect: "A hit with this attack causes Energy Drain (Smarts)." },
      { name: "Claws", effect: "The claws of an id monster deal no physical damage, but the target becomes Shaken on a successful hit, or Stunned with a raise." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Invisible", effect: "Id monsters are invisible in their natural state. A character may detect the invisible presence if he has a reason to look and makes a Notice roll at \u22126. Once detected, he may attack the thing at \u22126. These creatures radiate heat, so thermal or infravision eliminates their invisibility penalty." },
      { name: "Invulnerability", effect: "Non-psionic attacks cause no damage, though they can Shake the creature. Multiple Shaken results from non-psionic attacks do not result in a Wound." },
      { name: "Size 3", effect: "Id creatures stand 10\u2019 tall." },
      { name: "Weakness (Psionics)", effect: "Id monsters suffer normal damage from psionic attacks." }
    ],
    
    description: "Id monsters are created when a psionicist dies from extreme backlash. The entities somehow take physical form and seek out other psionicists\u2014which they slay and feed on (just the brain). If they can be seen, creatures from the id take on a muted and much larger aspect of their creator."
  },
  {
    id: "scifi_cyber_dog",
    name: "Cyber Dog",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 10,
    parry: 5,
    toughness: 6,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d6",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d10" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Armor +2", effect: "Subdermal plates." },
      { name: "Bite", effect: "Str+d8. Enhanced jaw muscles." },
      { name: "Enhanced Senses", effect: "+2 to Notice rolls." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." },
      { name: "Leg Enhancements", effect: "Pace 10. Cyberenhanced dogs roll a d10 when running instead of a d6." },
      { name: "Size \u22121", effect: "The heads of these canines come to an average human\u2019s waist." }
    ],
    gear: ["Installed cyberware: Armor (subdermal plates, +2), infravision, leg enhancements, enhanced vision (cybereyes)"],
    description: "Cyber-enhanced dogs are typically larger canines such as Rottweilers, Doberman Pinschers, or German Shepherds augmented with cybernetics to improve their use as guard and attack dogs."
  },
  {
    id: "scifi_cyborg_commando",
    name: "Cyborg Commando",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 8,
    toughness: 17,
    armor: 10,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d12",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d10" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Combat armor (+6), 4\u00d7 frag grenades, laser rifle (Range 30/60/120, Damage 3d6, RoF 3, AP 2, Cauterize, No Recoil, Overcharge), chain sword (2d6+4)", "Installed cyberware: Adrenal surge, 2\u00d7 Armor (subdermal plates, +4), attribute increase (Strength), skill bonus (targeting eye, Shooting +2)"],
    description: "Cyborgs, short for cybernetic organism, are part-human and part-machine. This particular example is a modified soldier built for special operations and combat."
  },
  {
    id: "scifi_daniken",
    name: "Daniken",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 8,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d12",
      spirit: "d12",
      strength: "d8",
      vigor: "d10"
    },
    skills: [{ name: "Academics", die: "d10" }, { name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d10" }, { name: "Electronics", die: "d10" }, { name: "Fighting", die: "d4" }, { name: "Healing", die: "d10" }, { name: "Notice", die: "d10" }, { name: "Persuasion", die: "d10" }, { name: "Piloting", die: "d10" }, { name: "Psionics", die: "d12" }, { name: "Repair", die: "d10" }, { name: "Research", die: "d10" }, { name: "Science", die: "d12" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Survival", die: "d8" }],
    abilities: [
      { name: "Fast Regeneration", effect: "May attempt a natural healing roll every round, even if Incapacitated, until slain." },
      { name: "Size 1", effect: "Danikens are taller than the average human." },
      { name: "Telepathy", effect: "A daniken can communicate mentally with any sapient lifeform within 12\" (24 yards) regardless of language." },
      { name: "Unstoppable", effect: "Takes a maximum of one Wound (after Soaking) from any damaging attack unless the attacker\u2019s Action Card is a Joker." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." },
      { name: "Very Resilient", effect: "Can take two additional Wounds." }
    ],
    gear: ["Items appropriate to their mission", "Few carry weapons beyond an EMP baton (Str+d4, EMP) but some daniken civilizations may be more warlike"],
    description: "Some scholars believe the Earth was visited by beings from distant worlds eons ago. These visitors\u2014collectively called \"danikens\" in honor of the author of the classic book, Chariots of the Gods?\u2014helped early humans with advancements in technology, architecture, astronomy, and science. In exchange, the young Terran civilizations revered them as gods, even immortalizing their alien benefactors in paintings and sculpture. What happened afterward varies. Perhaps the danikens left Earth, vowing to return when humanity passed a certain developmental milestone. Or maybe they were wiped out by some unforeseen threat, like Earthly viruses, an old enemy that followed them, or just the natural decline of a dying species. In settings where the old myths are true, some danikens might remain, hibernating in long-buried spacecraft under the desert, deep in the jungle, or on the Moon. Or they might be thriving elsewhere in the universe, ready to return upon receiving a special signal. Their return could help humanity leap for the stars\u2014or might trigger a cosmic war against an ancient alien empire. Danikens are peaceful, thin humanoids with uncanny features and a regal demeanor. Their cultural aesthetic strongly resembles that of one (or more) civilizations from antiquity, such as ancient Egyptians, Greeks, Polynesians, Aztecs, Mayans, Mesopotamians, Scythians, Tibetans, Norse, etc. The Setneru (see page 278) are ideal candidates. In some settings, danikens might not be so benevolent, or a renegade individual might turn out to be a more cruel and vengeful god."
  },
  {
    id: "scifi_darkraptor",
    name: "Darkraptor",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 6,
    toughness: 6,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Thick hide." },
      { name: "Bite/Claws", effect: "Str+d8, AP 2." },
      { name: "Echolocation", effect: "Darkraptors suffer no penalties for Illumination, even in Pitch Darkness." },
      { name: "Flight", effect: "Pace 24." },
      { name: "Size \u22121", effect: "Raptors weigh just over 100 pounds and are the size of wolves." },
      { name: "Weakness (Sunlight)", effect: "Darkraptors have no natural protection from ultraviolet light. They take 2d4 damage per round when exposed to sunlight (or extremely powerful UV lights) until they are ash. If the darkraptor is behind Cover, apply the Cover penalty to damage as well." }
    ],
    
    description: "Found on worlds with eccentric orbits, long sidereal periods, or which are tidally locked with their stars, darkraptors are carnivores adapted for long periods of darkness. During the day they roost in caverns, ruins, or other dark places. At sunset they emerge in huge ravenous flocks to take advantage of their prey\u2019s limited vision. Darkraptors are slightly smaller than the average human with leathery wings and anvil-shaped heads. Their limbs end in razor- sharp claws."
  },
  {
    id: "scifi_dark_sider",
    name: "Dark Sider",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 7,
    toughness: 12,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Battle", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d4" }, { name: "Science", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Ethereal", effect: "May pass through objects; cannot be harmed by nonmagical attacks; may choose between being invisible (\u22126 penalty to hit) or visible. Magic items, weapons, and supernatural powers affect them normally." }
    ],
    gear: ["Medium battle armor (+6), 2\u00d7 frag grenades, disintegrator pistol (Range 3/6/12, Damage 3d10), vibro blade (Str+d6+d4, AP 2)"],
    description: "There is a mirror universe which overlays our own. Just like our universe, this \"Dark Universe\" is home to countless species of alien life forms. Chief among them are the dark siders, humanoid spacefarers who have colonized much of their universe already. They want more\u2014they want our universe\u2014 but they can't touch us. Yet. They are taking steps to bring the two universes closer. They exploit any phenomenon which opens a gap, or special individuals with the power to perceive the other universe. Since dark siders technically exist in another dimension, albeit one that \"echoes\" into our own, there is no consistent way to communicate with them. In fact, both parties are unable to properly see their opponents, except as gravitational anomalies such as ripples or lensing. But they deal real damage to one another\u2014even if, to observers, it appears they are battling invisible opponents! The use of specialized gravitational, dimensional, or even magical sensors might be able to bypass this mutual intangibility, or at least mitigate the penalties, but such tools are rare and expensive. The dark siders\u2019 priority is developing such tools for themselves to open the path for their future conquests. Nobody\u2014at least not from this universe\u2014 knows what a dark sider looks like. Interacting with one is like encountering a ghost, albeit one that is quite real and highly skilled in combat."
  },
  {
    id: "scifi_death_worm",
    name: "Death Worm",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 9,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d8 (A)",
      spirit: "d6",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Armor +2", effect: "Hard, scaly skin." },
      { name: "Bite", effect: "Str+d6." },
      { name: "Burrow (8)", effect: "Death worms can move through sand and soft soil at full Pace and may attack from below." },
      { name: "Death Bolt", effect: "Instead of biting, the death worm can fire an internally generated electrical charge strong enough to stop a man\u2019s heart or fry electrical systems in a vehicle. This attack uses Shooting. The worm may do this from just beneath the earth, giving it Near Total Cover (\u22128). Range 3/6/12, Damage 4d6, AP 10." },
      { name: "Size 2", effect: "Death worms measure 10\u2019 in length and are 1\u2019 in diameter." }
    ],
    
    description: "The death worm is longer than a human is tall, is covered in flexible sand-yellow scales, lives beneath the soft sand of its desert home, and has the ability to kill a grown man at a distance."
  },
  {
    id: "scifi_decapitator",
    name: "Decapitator",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 6,
    parry: 6,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+2",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Ambush", effect: "If a decapitator Surprises its prey, it also has The Drop. It makes a Called Shot to the head." },
      { name: "Brachiation", effect: "Decapitators can move at their full Pace in trees or similar environments and don\u2019t normally need to make Athletics (climbing) rolls." },
      { name: "Scythes", effect: "Str+d10, AP 4." },
      { name: "Size 2", effect: "Decapitators weigh over 1000 pounds." }
    ],
    
    description: "Decapitators are large simian-like creatures, similar in size to Terran gorillas, but with extended arms ending in sickle-shaped, sharpened bones. They hang from branches by their prehensile feet waiting for prey to pass beneath. When it does, they slash with their scythe-like arms, aiming for the head."
  },
  {
    id: "scifi_deep_diver",
    name: "Deep Diver",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 6,
    toughness: 8,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+4",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 10." },
      { name: "Barotrauma", effect: "A deep diver that successfully grapples dives on its next turn, descending 10\" (20 yards) each round and causing a level of Fatigue that can lead to death for every 10\" (20 yards) descended. A character in sealed, pressurized armor ignores the Fatigue, and semi- or aquatic characters only suffer a level of Fatigue for every 50\" (100 yards) submerged." },
      { name: "Bite", effect: "Str+d6." },
      { name: "Pressure Resistant", effect: "Deep divers are immune to the effects of rapid pressure change." }
    ],
    
    description: "Rather than trying to bite their prey to death, these sturgeon-like fish use their jaws to get a firm grip, then dive (or rise) to a depth where the pressure is deadly to their prey."
  },
  {
    id: "scifi_deep_space_worm",
    name: "Deep Space Worm",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 12,
    scale: "Gargantuan",
    pace: 8,
    parry: 5,
    toughness: 26,
    armor: 6,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d10",
      strength: "d12+12",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +6", effect: "Heavy Armor; extremely thick hide." },
      { name: "Bite", effect: "Str+d10" },
      { name: "Burrow (16)", effect: "Deep space worms can tunnel easily through solid rock." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Size 12 (Gargantuan)", effect: "The average adult deep space worm is 100 feet long and weighs hundreds of tons." },
      { name: "Swallow Whole", effect: "Anyone hit by a bite attack must make an Evasion roll or be Swallowed Whole. At the end of the creature\u2019s subsequent turns, anyone swallowed must make a Vigor roll at \u22122 or take a Wound from the crushing gullet and acidic bile. Shaking, Wounding, or otherwise provoking the creature may result in opportunities to escape with an Athletics roll." },
      { name: "Unstoppable", effect: "Takes a maximum of one Wound (after Soaking) from any damaging attack unless the attacker\u2019s Action Card is a Joker." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." }
    ],
    
    description: "Just like a maggot inside an apple, deep space worms hitch rides on asteroids or comets and bore into them, slowly consuming them from within. Often the only outward clue is a single large cave entrance. But even though their primary diet are minerals, crystals, and raw elements, deep space worms are more than happy to digest the occasional spacecraft or team of unsuspecting astronauts who wander into their labyrinth of tunnels. If the massive worms completely hollow out their habitat, they can survive a short jaunt to other nearby asteroids. Otherwise they can hibernate for eons, waiting for their home to drift somewhere more accommodating. Careful mapping with (expensive!) seismographic equipment can reveal deep space worm tunnels from the surface. The profile below is for an average adult deep space worm, but given a sufficient food source they can grow many times this size. Some planets have terrestrial cousins evolved to fit their new environment."
  },
  {
    id: "scifi_diplomat_politician",
    name: "Diplomat/Politician",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Academics", die: "d8" }, { name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d10" }, { name: "Research", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, personal data device"],
    description: "In a universe inhabited by numerous alien species, it is the diplomats who stop (and sometimes cause) interplanetary wars and broker trade agreements between cultures. Most diplomats have a small staff of aides who accompany them everywhere they go."
  },
  {
    id: "scifi_dragon",
    name: "Dragon",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 5,
    toughness: 6,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +1", effect: "Scaly hide." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Explode", effect: "When a boomer dragon is killed, its organs rupture in a Large Blast Template. Everyone within is automatically hit by the boomer's breath weapon." },
      { name: "Fiery Breath", effect: "Boomer dragons breathe fire for 3d6 damage. This uses the Cone Template and may be Evaded." }
    ],
    
    description: "The name started as a reference to old fairy tales by interstellar travelers and stuck. It applies to all reptiles of human size or larger found throughout the galaxy. Most \"dragons\" are simply foul-tempered critters that are quick to bite with jagged teeth, but a few have developed spit attacks\u2014from acid to actual fire. These reptiles can spit a jet of fire by mixing volatile chemicals in special glands. Unfortunately, this pressurized gland is also unstable, \"booming\" when the creature dies."
  },
  {
    id: "scifi_haze_dragon",
    name: "Haze Dragon",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 4,
    toughness: 7,
    armor: 1,
    attributes: {
      agility: "d4",
      smarts: "d6 (A)",
      spirit: "d6",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Intimidation", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +1", effect: "Scaly hide." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Poison Breath", effect: "Haze dragons can eject a cloud of poisonous gas (any type, usually Mild) in a Cone Template centered directly in front of them. See Poison in Savage Worlds. This may be Evaded." }
    ],
    
    description: "Spending their days lounging near geothermal vents, haze dragons can exhale a cloud of poisonous gas to knock out prey."
  },
  {
    id: "scifi_snapdragon",
    name: "Snapdragon",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 1,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Armor +1", effect: "Scaly hide." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Spit Acid", effect: "Snapdragons can spit acid in a Stream Template. Targets splattered with acid suffer 3d6 damage. This may be Evaded. Unless washed off with at least a gallon of water (or a similar basic liquid) the acid deals 3d4 damage for the next two rounds." }
    ],
    
    description: "Evolution granted these dragons a sac of concentrated acid\u2014useful for both hunting prey and driving off predators. They also tend to have vestigial wings with bright coloring, fan-like crests, or other vivid markings."
  },
  {
    id: "scifi_draken",
    name: "Draken",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 5,
    parry: 5,
    toughness: 12,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Gruff", effect: "Subtract 2 from Persuasion rolls." },
      { name: "Hard Head", effect: "Counts as Horns and deals Str+d4 damage." },
      { name: "Slow", effect: "Reduce Pace by 1 and running die to d4." },
      { name: "Toughness +2", effect: "Draken are tough and resilient." }
    ],
    gear: ["Body armor (+4), laser rifle (Range 30/60/120, Damage 3d6, RoF 3, AP 2, Cauterize, No Recoil, Overcharge), molecular knife (Str+d4+2, AP 2), 2\u00d7 frag grenades"],
    description: "Draken are a warlike culture of temperamental, turtle-like beings. The following profile is for a typical draken warrior without specialized armor."
  },
  {
    id: "scifi_drendrit",
    name: "Drendrit",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 4,
    toughness: 1,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4",
      spirit: "d6",
      strength: "d4",
      vigor: "d4"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Healing", die: "d4" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d4" }, { name: "Repair", die: "d4" }, { name: "Research", die: "d4" }, { name: "Science", die: "d4" }, { name: "Stealth", die: "d4" }, { name: "Survival", die: "d4" }],
    abilities: [
      { name: "Braid", effect: "Multiple drendrits can \"braid\" together, combining their consciousness and abilities. For every drendrit combining to form a colony, modify the base profile with the following: Gain an Edge: The drendrit gains a new Edge. It must meet any prerequisites first. Increase" },
      { name: "Size \u22123 (Very Small)", effect: "An individual drendrit is six feet long but only a few inches across, and weighs 15 pounds." }
    ],
    
    description: "One of the most unusual species in the known galaxy are the drendrits, pseudo-vegetable polyps from a low-gravity forested world. Drendrit polyps are omnivorous invertebrates with limited intelligence, but multiple drendrits can \"braid\" together to form a colony. Their combined intellect and shared knowledge make them an accomplished\u2014even brilliant\u2014unit on par with any other sentient galactic beings. Drendrits communicate chemically with one another, but can vibrate (just like vocal cords) to \"speak\" other languages\u2014though the sound they produce is eerie and not always easy to understand."
  },
  {
    id: "scifi_drone",
    name: "Drone",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: "\u2014",
    parry: 2,
    toughness: 12,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "1",
      vigor: "\u2014"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Electronics", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Piloting", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Armor +4", effect: "Reinforced body." },
      { name: "Fearless", effect: "The operator is far away, and thus immune to Fear and Intimidation." },
      { name: "Flight", effect: "Pace 24 (16 MPH). Battle drones may hover in place." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the operator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Size 1", effect: "Battle drones are 8\u2019 long and weigh 400 pounds, though some might be much larger\u2014even the size of vehicles." },
      { name: "Weakness (Remote Control)", effect: "An EMP or equipment designed to jam the operator\u2019s connection Incapacitates a drone and it crashes." }
    ],
    gear: ["Varies", "Usually a Gatling laser (Range 50/100/200, Damage 3d6+4 (I), AP 4, RoF 4, Cauterize, Heavy Weapon, No Recoil, Overcharge) or a missile launcher with eight light missiles (Range 100/200/400, Damage 6d6 (III), AP 16, RoF 4, Heavy Weapon, Guided, SBT)"],
    description: "Drones are vehicles guided remotely by an operator, and often deployed as guards, scouts, or expendable soldiers. They use the operator\u2019s Piloting skill. The examples below assume an average \"jockey,\" but an elite operator might have much higher skills. For autonomous drones, use the rules for robots (see Chapter Six). These mid-sized drones are capable of carrying heavy ordinance into battle. They can loiter over an area and deliver devastating firepower with deadly precision."
  },
  {
    id: "scifi_combat_drone",
    name: "Combat Drone",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 2,
    toughness: 6,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d4",
      vigor: "\u2014"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Electronics", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Piloting", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Reinforced body." },
      { name: "Fearless", effect: "The operator is far away, and thus immune to Fear and Intimidation." },
      { name: "Flight", effect: "Pace 12 (8 MPH). Combat drones may hover in place." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the operator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Size \u22121", effect: "Combat drones usually weigh 50 pounds and can fold to a compact size." },
      { name: "Weakness (Remote Control)", effect: "An EMP or equipment designed to jam the operator\u2019s connection Incapacitates a drone and it crashes." }
    ],
    gear: ["Varies", "Usually a laser SMG (Range 15/30/60, Damage 2d6, AP 2, RoF 4, Cauterize, No Recoil, Overcharge)"],
    description: "Combat drones are small aerial platforms designed to assist soldiers in small skirmishes, deliver small objects, flank enemies, or perform recon in risky areas to avoid endangering flesh-and-blood soldiers. Combat drones geared specifically for scouting have Stealth d8 and a Flight Pace of 16, but no onboard weapons."
  },
  {
    id: "scifi_dwarf_space",
    name: "Dwarf, Space",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 7,
    parry: 4,
    toughness: 7,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d4",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Gambling", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d4" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Increased Strain", effect: "+2 maximum Strain for cyberware." },
      { name: "Reduced Pace", effect: "Space dwarves\u2019 short legs reduce their Pace by 1 and their running die by one die type." }
    ],
    gear: ["Spacesuit (+1, if in space), matter disintegrator", "Installed cyberware: Adrenal surge, leg enhancement, mule, enhanced vision, toxin filters"],
    description: "\"Space dwarves\" (a term they strongly dislike) are native to rocky, mountainous worlds where they build extensive cities underground. This makes them well-suited to a life as asteroid miners in remote colonies."
  },
  {
    id: "scifi_earthquake_beast",
    name: "Earthquake Beast",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 12,
    scale: "Gargantuan",
    pace: 6,
    parry: 4,
    toughness: 21,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12+12",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d4" }],
    abilities: [
      { name: "Armor +2", effect: "Thick scaly hides." },
      { name: "Earthquake", effect: "Characters within 12\" (24 yards) of a moving earthquake beast must make an Agility roll each round (a free action) or fall prone. A Critical Failure means the character is Stunned as well!" },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Resilient", effect: "Can take one additional Wound." },
      { name: "Size 12 (Gargantuan)", effect: "Earthquake beasts weigh as much as 500 tons." },
      { name: "Slow Nervous System", effect: "The earthquake beast\u2019s slow nervous system means it barely registers pain and shock. It adds +2 to recover from being Shaken and ignores all Wound penalties." },
      { name: "Stomp", effect: "Str+d10." },
      { name: "Swat", effect: "Ignores up to 4 points of Scale penalties when attacking creatures smaller than itself." },
      { name: "Tail Lash", effect: "Str+d4. The creature may make a free attack against up to two foes to its side or rear at no penalty." }
    ],
    
    description: "Earthquake beasts are enormous, long- necked herbivores, similar to the diplodocus, but with six legs and a tail almost half the length of their body. They weigh so much that when they walk, the ground literally shakes. They are notoriously stupid and shortsighted. Once they make their minds up to go somewhere, they walk through everything in their path\u2014including buildings, vehicles, and creatures too slow to clear their stride."
  },
  {
    id: "scifi_elf_space",
    name: "Elf, Space",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Healing", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Spellcasting", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }],
    abilities: [
      { name: "Low Light Vision", effect: "Elves ignore penalties for Dim and Dark lighting." }
    ],
    gear: ["Light battle armor (+4), force sword (Str+2d6, AP 2), pulse pistol (Range 10/20/40, Damage 2d6, Overcharge), medi-gel"],
    description: "Much like their counterparts from fantasy settings, space elves are slender, graceful beings with pointed ears and\u2014if it exists in the setting\u2014an innate connection to magic. They often live on worlds with elegant cities that co-exist in harmony with the natural environment. If they have achieved starfaring ability, they craft magnificent, aesthetically pleasing craft that appear fragile to outsiders\u2014 until they effortlessly shrug off attacks! \"Dark\" elves in the far reaches of space are deadly efficient. They might be ruthless reavers preying on the space lanes or form draconian empires that seek to dominate \"lesser\" civilizations. The following profile is for a typical space elf warrior with magical abilities."
  },
  {
    id: "scifi_eliminator",
    name: "Eliminator",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 16,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d12+2",
      vigor: "d12+2"
    },
    skills: [{ name: "Academics", die: "d8" }, { name: "Athletics", die: "d8" }, { name: "Battle", die: "d6" }, { name: "Boating", die: "d6" }, { name: "Common Knowledge", die: "d10" }, { name: "Driving", die: "d8" }, { name: "Electronics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Hacking", die: "d10" }, { name: "Intimidation", die: "d10" }, { name: "Language (All)", die: "d8" }, { name: "Notice", die: "d10" }, { name: "Persuasion", die: "d10" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }, { name: "Thievery", die: "d8" }],
    abilities: [
      { name: "Armor +6", effect: "Sturdy, reinforced body." },
      { name: "Construct", effect: "+2 to recover from being Shaken; ignores 1 point of Wound penalties; doesn\u2019t breathe or suffer from disease or poison." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Resilient", effect: "Can take one additional Wound." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the eliminator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Targeting", effect: "Negates 2 points of Range or Unstable Platform penalties." },
      { name: "Unstoppable", effect: "Takes a maximum of one Wound (after Soaking) from any damaging attack unless the attacker\u2019s Action Card is a Joker." }
    ],
    
    description: "Eliminators are robots designed for one purpose: to eliminate a target. Until they achieve this goal, nothing short of complete destruction can stop one. Equipped with advanced sensors, an exhaustive database, vocal synthesizers, artificial intelligence, and a state-of-the-art CPU, eliminators can overcome nearly any obstacle between themselves and their targets. Eliminators are often used as foot soldiers, a task for which they are ruthlessly efficient, but are sometimes sent on solitary missions against high-value targets. These are almost always Wild Cards. These eliminators generally appear as metallic skeletons, though some are covered with a synthetic skin which allows them to avoid scrutiny while \"hunting.\""
  },
  {
    id: "scifi_eliminator_mk_ii",
    name: "Eliminator Mk Ii",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 6,
    toughness: 12,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d12+2",
      vigor: "d12+2"
    },
    skills: [{ name: "Academics", die: "d8" }, { name: "Athletics", die: "d8" }, { name: "Battle", die: "d6" }, { name: "Boating", die: "d6" }, { name: "Common Knowledge", die: "d10" }, { name: "Driving", die: "d8" }, { name: "Electronics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Hacking", die: "d10" }, { name: "Intimidation", die: "d10" }, { name: "Language (All)", die: "d8" }, { name: "Notice", die: "d10" }, { name: "Persuasion", die: "d10" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d10" }, { name: "Survival", die: "d8" }, { name: "Thievery", die: "d8" }],
    abilities: [
      { name: "Armor +2", effect: "Sturdy, reinforced body." },
      { name: "Construct", effect: "+2 to recover from being Shaken; ignores 1 point of Wound penalties; doesn\u2019t breathe or suffer from disease or poison." },
      { name: "Fast Regeneration", effect: "Mk II eliminators may attempt a natural healing roll every round, even if Incapacitated, unless their Wounds were caused by extreme sources of heat or cold." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Liquid Construction", effect: "Immune to Called Shots; may change shape (but not Size) as a limited free action." },
      { name: "Resilient", effect: "Can take one additional Wound." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the eliminator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Targeting", effect: "Negates 2 points of Range or Unstable Platform penalties." },
      { name: "Unstoppable", effect: "Eliminators take a maximum of one Wound per attack no matter how many Wounds would normally be caused (after Soak rolls are made)." }
    ],
    
    description: "Taking advantage of further advancements in technology, these eliminators are made of a high-tech metal alloy which can act as both a fluid or a solid at the expense of durability."
  },
  {
    id: "scifi_emotor",
    name: "Emotor",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 3,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4",
      spirit: "d6",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Psionics", die: "d10" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Crystallize Emotions", effect: "Each emotor has 1d4 crystallized emotions protruding from its body. Removing them requires complex surgery (which most hunters don\u2019t bother with) or killing the creature (which is much easier). Emotion crystals are consumed for the powerful effect of the emotion and have a Duration of 10 minutes. Some examples are included below, but the GM is encouraged to devise her own list of extra emotions. Anger: The user immediately goes Berserk (per the Edge) and cannot attempt to calm himself until the crystal has run its course. Calm: The user draws an extra initiative card. This stacks with Level Headed. However, he also suffers \u22122 to Persuasion rolls. Compassion: The user gains the Heroic Hindrance and the same benefit granted by a successful casting of the empathy power (normal casting only, with no raise or Power Modifiers). Courage: The consumer gains +2 to Fear checks, but also gains the Overconfident Hindrance. Fear: The user makes Fear checks at \u22122 and any rolls on the Fear Table are made at +2. The spike of adrenaline also grants him the Nerves of Steel Edge (or Improved Nerves of Steel if he already has it). Hatred: The user gains the Bloodthirsty Hindrance, but also gains +2 to resist Spirit-based Tests. Love: The user gains the Charismatic Edge and the Pacifist (Major) Hindrance." },
      { name: "Size \u22122 (Small)", effect: "Emotors are the size of lemurs." }
    ],
    
    description: "Emotors are semi-sentient, psionic creatures resembling furless lemurs. They have the unusual ability to crystallize their emotion into solid form. How and why they do this is a mystery, but they are hunted for their \u201cemotion crystals,\u201d which fetch high prices on the black market."
  },
  {
    id: "scifi_energy_elemental",
    name: "Energy Elemental",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d10",
      strength: "d8",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d10" }],
    abilities: [
      { name: "Atomic Attack", effect: "Atomic elementals can fire a wave of energy using a Cone Template, or fire balls of energy using any other size template, up to 50\" distant (100 yards) at no Range penalty. This uses their Shooting skill and causes 5d10 damage against a target\u2019s weakest Armor. Any creature Shaken or Wounded by the attack must make a Vigor roll or suffer radiation sickness (see Savage Worlds)." },
      { name: "Atomic Aura", effect: "At the end of its movement, and at the creature\u2019s will, all adjacent creatures suffer 3d10 damage from the elemental\u2019s intense heat and radiation. Any creature Shaken or Wounded by the attack must make a Vigor roll or suffer radiation poisoning (see Savage Worlds)." },
      { name: "Bash", effect: "Str+2d10." },
      { name: "Elemental", effect: "No additional damage from Called Shots; ignore 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison; ignore penalties for Illumination up to 10\" (20 yards)." },
      { name: "Ethereal", effect: "Atomic elementals are made of pure energy." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Flight", effect: "Pace FTL. Atomic elementals may fly in any environment at the same speed as the setting\u2019s standard FTL drives." },
      { name: "Invulnerability", effect: "Atomic elementals are invulnerable to all normal types of damage. They are susceptible to arcane attack forms (such as psionics)." },
      { name: "Leech", effect: "Atomic elementals can only exist outside of their extreme conditions for a number of days equal to their Vigor, but can feed off nuclear reactions and radioactive material. Each day\u2019s worth of fusion-based starship energy, or week\u2019s worth of vehicular energy, takes the being a minute to consume and gives it another day of life outside its native environment." },
      { name: "Weakness (Energy Drain)", effect: "Atomic elementals have no true Weakness other than their need for vast amounts of energy. This sets them up for scientific contraptions that isolate, drain, or overload their energy and disperse them. This might be accomplished by a scientist with access to theoretical materials and a Dramatic Task." }
    ],
    
    description: "Energy elementals are swirling clouds or balls of intense energy, though they often take the shape of any beings with which they care to entreat. Elementals don\u2019t speak, but can communicate by forming shapes, symbols, or simple images of pure energy. Travelers have said dealing with them is almost like talking to a hyperintelligent toddler in a foreign language. Energy elementals do not have a set size, as such physical limitations are meaningless to them. The same elemental may appear as a diminutive spark of elemental essence or a vast raging cloud the size of a planet\u2014 whichever magnitude seems appropriate for the task at hand. Changing size takes a great deal of time and effort so they are usually stuck with their chosen measurements for the duration of an encounter. All energy elementals are extremely powerful creatures that should not be introduced into an encounter without some thought. They aren't good or evil; they embody the power and danger of a type of energy, and lash out at those who try to contain or disturb them. Atomic elementals consist of crackling bluish-white nuclear energy living in or near stars or areas of extreme radiation. They cannot survive long outside their native environments where fuel is plentiful. When they travel, they are known to leech energy from fusion-powered starships, vehicles, or power plants they find along their way. Atomic elementals are spheres in their natural state, but can take on humanoid states when they wish to communicate."
  },
  {
    id: "scifi_light_elemental",
    name: "Light Elemental",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 16,
    parry: 5,
    toughness: 4,
    armor: 0,
    attributes: {
      agility: "d12",
      smarts: "d8",
      spirit: "d10",
      strength: "d4",
      vigor: "d4"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d12" }],
    abilities: [
      { name: "Blinding", effect: "At the end of its movement, and at the creature\u2019s will, all creatures within 5\" (10 yards) must roll Vigor or become blind (\u22126 to all physical actions) for 1d4 rounds and Stunned. A Critical Failure means the victim is permanently blind! Creatures without the ability to see light are immune to this effect." },
      { name: "Elemental", effect: "No additional damage from Called Shots; ignore 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison; ignore penalties for Illumination up to 10\" (20 yards)." },
      { name: "Energy Attack", effect: "Light elementals can fire a powerful beam of concentrated light using their Shooting skill (Range 50/100/200, Damage 3d10+3, AP 4)." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Flight", effect: "Light elementals fly at the speed of light (\u221210 to attack them). When taking mortal form, they have a d12 running die." },
      { name: "Invulnerability", effect: "Light elementals are invulnerable to all normal types of damage. They are susceptible to arcane attack forms (such as psionics)." },
      { name: "Semi-Ethereal", effect: "May pass through transparent objects; cannot be harmed by nonmagical attacks; may choose between being invisible (\u22126 penalty to hit) or visible. Magic items, weapons, and supernatural powers affect them normally." },
      { name: "Weakness (Refraction)", effect: "Light elementals are vulnerable to anything that refracts their light. Physical weapons have no effect, but high-power magnets, prisms, black holes, and similar disruptive objects deal 3d6 damage." }
    ],
    
    description: "Composed of standing waves of electromagnetic energy, light elementals skip merrily over the void, playing amongst the brilliance of stars and communicating with one another over great spans of space and time."
  },
  {
    id: "scifi_plasma_elemental",
    name: "Plasma Elemental",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 5,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d8",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d10" }],
    abilities: [
      { name: "Bash", effect: "Str+2d10." },
      { name: "Burn", effect: "Anyone hit by an elemental\u2019s bash or fiery aura must make an Evasion roll or catch fire, taking 2d6 damage." },
      { name: "Elemental", effect: "No additional damage from Called Shots; ignore 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison; ignore penalties for Illumination up to 10\" (20 yards)." },
      { name: "Energy Attack", effect: "Plasma elementals can attack with a Cone Template, or fire balls of energy using any other size template, up to 25\" distant (50 yards). This uses their Shooting skill and causes 3d10 damage against a target\u2019s weakest Armor. Victims Shaken or Wounded by such an attack may catch fire (see Savage Worlds)." },
      { name: "Ethereal", effect: "May pass through objects; cannot be harmed by nonmagical attacks; may choose between being invisible (\u22126 penalty to hit) or visible. Magic items, weapons, and supernatural powers affect them normally." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Fiery Aura", effect: "At the end of its movement all adjacent creatures suffer 2d10 damage from the elemental\u2019s intense heat." },
      { name: "Flight", effect: "Plasma elementals fly at speeds up to 600 MPH." },
      { name: "Invulnerability", effect: "Plasma elementals are invulnerable to heat- and fire-based attacks." },
      { name: "Weakness (Dissipation)", effect: "Plasma elementals are somewhat vulnerable to anything that disrupts their charged state. Kinetic and fire-based weapons have no effect, but high-voltage electricity, EMPs, magnetism, and most other energy forms cause half-damage." }
    ],
    
    description: "Plasma elementals are composed entirely of swirling, burning, superheated gas. They are typically found only in the outer layers of suns or the cores of large planets."
  },
  {
    id: "scifi_time_elemental",
    name: "Time Elemental",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d10",
      spirit: "d12",
      strength: "d8",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d10" }, { name: "Science", die: "d12+2" }],
    abilities: [
      { name: "Elemental", effect: "No additional damage from Called Shots; ignore 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison; ignore penalties for Illumination up to 10\" (20 yards)." },
      { name: "Ethereal", effect: "May pass through objects; cannot be harmed by nonmagical attacks; may choose between being invisible (\u22126 penalty to hit) or visible. Magic items, weapons, and supernatural powers affect them normally." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Flicker", effect: "Time elementals flicker rapidly in and out of time at random intervals. All attacks against them, even those of arcane nature, are made at \u22124." },
      { name: "Teleport", effect: "Time elementals can teleport to any time or place as a limited action. They cannot extend this ability to others, nor can they carry items with them as they travel." },
      { name: "Time Control", effect: "At the beginning of any round of combat, after Action Cards have been dealt and locked in but before anyone acts, a time elemental can make a Spirit roll to swap two Action Cards with a success or four with a raise (except Jokers)." },
      { name: "Time Stop", effect: "Once per encounter, a time elemental may momentarily pause time for all but itself. This grants the time elemental 1d4+1 new turns, which it must take immediately. During these turns it may act as normal on its current Action Card. This effect ends if any of the time elemental\u2019s actions affect another character or creature." },
      { name: "Wither", effect: "Time elementals may make a Touch Attack which causes Energy Drain (Vigor). If Vigor falls below d4 the victim permanently gains the Elderly Hindrance, or perishes if he is already Elderly." }
    ],
    
    description: "Time elementals are beings made from the raw essence of spacetime itself. They resemble bottomless wells of total darkness\u2014like black holes. Most are more interested in studying the point in time in which they have appeared than warring on the inhabitants. They might be guardians of the time stream, or simply manifest around anomalies such as black holes and rage against any intruder they find there."
  },
  {
    id: "scifi_energy_leech",
    name: "Energy Leech",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d10",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Shooting", die: "d10" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Electrical Attack", effect: "Energy leeches channel their own bioelectric energy into a deadly bolt using Shooting (Range 4/8/16, Damage 3d6)." },
      { name: "Energy Drain", effect: "When attached to a power source, the creature drains a day\u2019s worth of energy or fuel every five minutes (and five creatures drain a day\u2019s worth of energy every minute!)." },
      { name: "Flight", effect: "Pace 2. When energy leeches sense powerful electricity, they draw forth an arc and \u201cride\u201d it to the device at incredibly high speeds (10,000 MPH in the upper stratosphere or space). Herds of the things often travel in on a single arc, slowing just before impact to attach themselves to the target\u2019s hull or walls." },
      { name: "Immunity", effect: "Energy leeches are immune to electricity and electrical attacks." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." }
    ],
    
    description: "Energy leeches have a central, bulbous sac surrounded by a myriad of long tentacles. The sac is filled with hydrogen, which allows the energy leech to float on wind currents in the upper atmosphere. They have no mouth, but instead feed on electrical energy. Energy leeches float in packs of 3d6 individual creatures. They catch and prey on the bioelectrical signals of small creatures, but are also able to handle the vastly greater high-energy emissions of a starship\u2019s engines or other machines. Once attached to such a device (such as a ship\u2019s hull), they begin to leech energy at an alarming rate."
  },
  {
    id: "scifi_explorer",
    name: "Explorer",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 7,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d6" }, { name: "Repair", die: "d6" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Smart sleeve (+1), commlink, laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge), machete (Str+d6), personal data device, survival gear"],
    description: "Explorers are brave souls who investigate new worlds, parallel universes, or ancient ruins of long-dead alien civilizations, and often are the ones to make first contact with new sentient life forms."
  },
  {
    id: "scifi_fisher",
    name: "Fisher",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 4,
    parry: 6,
    toughness: 12,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d10",
      strength: "d12+3",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Armor +2", effect: "Fishers have thin carapaces." },
      { name: "Bite", effect: "Str+d8." },
      { name: "Flight", effect: "Pace 12." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." },
      { name: "Size 4 (Large)", effect: "Fishers are 20\u2019 across." },
      { name: "Tentacles (4)", effect: "Four tentacle actions and Reach 4. Tentacles deal Str+d4 damage. Bound or Entangled prey may be bitten as usual." }
    ],
    
    description: "Fishers are large flying creatures with four long tentacles instead of legs. They hover silently over woodland areas, using their infravision to detect the body heat of prey. Their name comes from their peculiar style of hunting. Rather than simply use their tentacles to grab prey, they dedicate one tentacle to holding a lure, be this a clump of plants or a small animal, and use it to entice prey much as a fisherman does with bait. Once satisfied the target is \u201chooked,\u201d they use their other tentacles to grab it."
  },
  {
    id: "scifi_floran",
    name: "Floran",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bloodless", effect: "Florans automatically stabilize whenever they would Bleed Out without rolls or ill effects." },
      { name: "Dependency (Sunlight)", effect: "Florans must bask in sunlight (artificial or otherwise) once per day or suffer Fatigue. This can lead to death. Fatigue is recovered at the rate of one level per hour of sunshine." },
      { name: "Environmental Weakness (Heat/Fire)", effect: "Florans subtract 4 from Fatigue checks made to resist the effects of heat, and take 4 additional points of damage from heatand fire-based attacks." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "No Vital Organs", effect: "Called Shots deal no extra damage." },
      { name: "Sleep Reduction", effect: "Florans require half the usual amount of sleep." }
    ],
    gear: ["Items appropriate to their trade", "Some have a simple firearm or knife (Str+d4)"],
    description: "Florans are mobile, sentient beings that evolved from plants. Their appearance varies widely, but most are capable of emitting puffs of pollen which affect others\u2019 perception. The profile below is for a typical floran citizen, though they are just as likely to be soldiers, scientists, or spacefarers as any other galactic species with suitable skills and Edges."
  },
  {
    id: "scifi_fractal_ray",
    name: "Fractal Ray",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 6,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d6",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d6, AP 1." },
      { name: "Flight", effect: "Pace 8." },
      { name: "Hypnotism", effect: "Creatures within 12\" (24 yards) who behold a fractal ray must make a Smarts roll or become Stunned. Blind creatures, or those who rely on sound or other forms of vision are immune to this effect. Viewing a fractal ray through a screen or mirror may grant a bonus to resist this effect (GM\u2019s call)." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." }
    ],
    
    description: "These bizarre creatures have triangular wings and long tails, much like Terran rays, but glide along the wind currents above ground. Their elegant undulations and complex patterning mesmerize prey long enough for fractal rays to get close enough to wrap around their prey and begin eating. On ocean worlds, or those with thin atmospheres or high gravity, they might be water creatures instead (Aquatic: Pace 8)."
  },
  {
    id: "scifi_gelatinoid",
    name: "Gelatinoid",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Cannot Speak", effect: "Unless aided by devices, gelatinoids can understand other languages but may only communicate with members of their own species." },
      { name: "Gelatinous", effect: "Half-damage from falling or collisions; no extra damage from Called Shots. May make an Athletics roll to move through small openings, which takes 1d6 rounds and makes the gelatinoid Vulnerable (treat as Difficult Ground)." },
      { name: "Slow Regeneration", effect: "May make natural healing rolls once per day." },
      { name: "Weak", effect: "\u22121 to Strength rolls." }
    ],
    gear: ["Items appropriate to their trade", "Some have a simple firearm or knife (Str+d4)"],
    description: "These life forms are sentient cell colonies, protein clusters, or other translucent, mobile liquids. Despite the seeming limitations of their bodies, some may also serve as scientists or warriors, with suitable skills and Edges."
  },
  {
    id: "scifi_gene_thief",
    name: "Gene Thief",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d12",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d8" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Bite/Claws/Horns", effect: "Str+d8. May freely \"create\" claws, barbs, teeth, horns, and other natural weapons anywhere on its body as a free action." },
      { name: "Colony", effect: "Gene thieves mimic the bodies of those they replicate, but do not have organs of their own. +2 Toughness; +2 to recover from Shaken; no additional damage from Called Shots, ignores invisibility and all Illumination penalties; immune to poison, paralysis, slumber, Stun, blind, Intimidation, Taunt, puppet; doesn\u2019t sleep." },
      { name: "Fast Regeneration", effect: "Gene thieves may attempt a natural healing roll every round, even if Incapacitated, unless their Wounds were caused by fire or flame or they\u2019re put to the torch afterward." },
      { name: "Fear (\u22122)", effect: "Seeing a gene thief change its form provokes a Fear check." },
      { name: "Very Resilient", effect: "A gene thief can take two Wounds before being Incapacitated." }
    ],
    
    description: "Little is known about these terrifying organisms\u2014where they come from, how many exist, or even what they look like in their natural state. A gene thief attacks a target\u2019s cells, first analyzing and then copying their DNA, rapidly replicating the host from within until it has full control down to a cellular level. All it needs is a moment of contact to begin this process, but it can only do so with living cells or those which have been dead for no more than an hour. The process takes 1d4 hours to complete. Afterward, the creature completely adopts the host\u2019s appearance and knowledge. Gene thieves use this to move among others without revealing their true identity. They have access to the target\u2019s attributes and skills, using the higher of the two as they desire, but do not gain Edges and Hindrances. Once a gene thief acquires a target\u2019s DNA it can appear as that individual at any time, even if it moves to a new host. There\u2019s some evidence that those \"absorbed\" by a gene thief still remain conscious but buried somewhere in there\u2014forever\u2026"
  },
  {
    id: "scifi_ghevok",
    name: "Ghevok",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 8,
    parry: 4,
    toughness: 9,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +1", effect: "Furry hide." },
      { name: "Bite", effect: "Str." },
      { name: "Kick", effect: "Str+d4, to the front or rear as desired. The ghevok balances on its tail when kicking. Anyone mounted on the ghevok must roll Riding to remain in the saddle." },
      { name: "Size 2", effect: "Ghevoks typically stand nine feet tall and weigh half a ton." }
    ],
    
    description: "Ghevoks are marsupial herd animals from a planet of vast, fertile grasslands. They are notable for their bipedal posture, thick fur, and speed, making them ideal mounts in places where vehicles aren\u2019t as viable. Ghevoks are bred throughout the galaxy as draft animals, though they tend to become demoralized when unable to run for extended periods of time."
  },
  {
    id: "scifi_glitch",
    name: "Glitch",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Electronics", die: "d6" }, { name: "Hacking", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Accidental Mishap", effect: "Each day the glitch is in the ship, roll a die. Odd, the glitch has burned out a vital system. Roll on the Vehicle Critical Hit table. The ship suffers no actual Wounds, however, just the effects of the Critical Hit. A Crew result means it has caused an accident for one of the crew (electrocution, an airlock incident, or even a private message blasted to the entire ship). Treat a Hull result as minor effects with no lasting damage." },
      { name: "Glitch In The Machine", effect: "Any use of the ship\u2019s systems suffers a \u22122 penalty due to the interference of the glitch, including gunnery, maneuvering, or jumping to hyperspace." },
      { name: "Removal", effect: "Removing a glitch requires the crew to shut down every system on the ship except the FTL drive. Each 30 minutes a ship is powered down, the glitch makes a Smarts roll. If it succeeds, it locates the FTL drive and escapes back into hyperspace. A glitch will not exit a ship in normal space, even if the FTL drive is powered up, as normal space is instantly fatal to them. While the ship is powered down, the crew had best don spacesuits. Oxygen runs out and the temperature drops to below freezing in 10 minutes times the vessel\u2019s Size (see the Starship Frames table on page 147)." }
    ],
    
    description: "Glitches are extra-dimensional entities inhabiting hyperspace and attracted to the powerful emission of a starship\u2019s FTL drive. They lurk in the hyperspace field surrounding the ship and inevitably get pulled into the ship\u2019s systems. Once there, the glitches wreak havoc with various systems. Few glitches act maliciously\u2014 most seek only to escape back to hyperspace. Unfortunately, they are not overly intelligent and make their presence felt by flicking lights on and off, opening and closing automatic doors, and other such phenomena. Reports of ships possessed by ghosts are most likely glitch infested. Glitches have no language of their own but sometimes attempt to communicate by forwarding existing messages\u2014which they sense as communication\u2014 to random addresses in the ship. This often leads to disaster as private or confidential information is shared. They resemble sparks of energy in their natural state, but can form into general shapes to communicate with other species."
  },
  {
    id: "scifi_gray_goo",
    name: "Gray Goo",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 5,
    scale: "Large",
    pace: 8,
    parry: 2,
    toughness: 12,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d12+2",
      strength: "d8",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Notice", die: "d8" }],
    abilities: [
      { name: "Construct", effect: "+2 to recover from being Shaken; ignores 1 point of Wound penalties; doesn\u2019t breathe or suffer from disease or poison." },
      { name: "Envelop", effect: "Gray goo attacks by enveloping its target, then inflicting millions of microscopic \"bites\" as the nanites begin breaking down the target\u2019s molecular structure. It hits automatically (unless Shaken) and causes 2d6 damage to all targets it touches at the end of their turn. Weapons suffer a \u22121 damage penalty (max \u22123) and armor loses 1 point of Armor bonus until it reaches 0 and falls apart. Those in completely sealed suits are immune\u2014at least until the gray goo deals enough damage to the suit!" },
      { name: "Fear", effect: "Anyone who sees the creature must make a Fear check." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Ooze", effect: "Though comprised of machines, gray goo is a micro colony. It ignores invisibility and Illumination penalties. It does not sleep, and is immune to Called Shots, poison, paralysis, slumber, Stun, blind, Intimidation, Taunt, and puppet." },
      { name: "Replicate", effect: "As long as gray goo has access to adequate raw materials it heals one Wound or splits and becomes two gray goos every 1d4 hours." },
      { name: "Size 5 (Large)", effect: "This gray goo is the size of a Small Blast Template (2-yard radius) and weighs four tons." },
      { name: "Unstoppable", effect: "Takes a maximum of one Wound (after Soaking) from any damaging attack unless the attacker\u2019s Action Card is a Joker." },
      { name: "Very Resilient", effect: "Can take two additional Wounds." },
      { name: "Weakness (Electricity)", effect: "Gray goo is vulnerable to electricity and electrical attacks. Electricity deals damage normally and ignores Unstoppable (see above)." }
    ],
    
    description: "One of the most terrifying threats in the galaxy, \"gray goo\" looks like a huge gray pool of mobile slime. In reality it is comprised of billions of self-replicating, microscopic nanobots. Whether designed for this purpose, hacked by a psychopathic villain, or merely glitching catastrophically, gray goo relentlessly \"consumes\" any organic matter\u2014or possibly any matter\u2014it comes in contact with, dismantling objects molecule by molecule and then using the raw materials to manufacture more nanobots. A small blob of gray goo can, in time, consume entire space stations, literally reducing them to atoms. Unless found very early gray goo is encountered as 2d6 \"blobs\" \u2014each the size of a Small Blast Template\u2014 which move and act together."
  },
  {
    id: "scifi_grazer",
    name: "Grazer",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 8,
    scale: "Huge",
    pace: 6,
    parry: 6,
    toughness: 18,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12+8",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Armor +2", effect: "Thick hide on the torso and legs (+2). A grazer gains an extra +4 Armor against Called Shots to its dense, bony head." },
      { name: "Hardy", effect: "Grazers do not suffer a Wound from being Shaken twice." },
      { name: "Horns", effect: "Str+d10 (I). Heavy Weapon." },
      { name: "Size 8 (Huge)", effect: "Grazers weigh 25,000 pounds." },
      { name: "Trample", effect: "Str+d8." }
    ],
    
    description: "The head of these large herbivores is a wide, flat lump of dense bone with no obvious features. Covering the head are millions of tiny pits, each an olfactory sensor. The eyes, which are small and suited only to close- range work, are located on the underside of the head, along with an elephant-like trunk. Unlike an elephant, however, this is not a grasping appendage but the mouth and neck. While the grazer can only see what it\u2019s eating, its keen olfactory pits remain alert for predators. Their head is actually a weapon, used in mating rituals and to butt predators. They have been known to severely damage vehicles, which they often see as a rival."
  },
  {
    id: "scifi_gremlin",
    name: "Gremlin",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 2,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6",
      spirit: "d8",
      strength: "d4",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Repair", die: "d6" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Bite/Claws", effect: "Str." },
      { name: "Invulnerability", effect: "Gremlins are invulnerable to all electrical-based damage." },
      { name: "Sabotage", effect: "Every day a ship or vehicle is infested with gremlins, roll a Critical Hit (with no accompanying Wound). A Crew result means an accident for one of the personnel\u2014such as electrocution (2d6 damage), a faulty airlock, a spacesuit has a hole in it, etc. Treat a Hull result as damage to a minor system, giving a \u22122 penalty to relevant skill rolls until it is repaired." },
      { name: "Size \u22124 (Tiny)", effect: "Gremlins are four inches tall." }
    ],
    
    description: "The gremlins presented here aren\u2019t the mystical creatures of fairy tales, but they have much the same effect on starships. These creatures are small, scaly creatures about the size of small rats. They subsist on electricity, so should they get aboard vehicles or ships they chew through wires and other electronics which can quickly render even the largest ship unsound. The creatures are extremely resilient to chemicals and other vermin-control methods, and where there is one there are many (usually 2d20). The best way to purge a ship is to cut power to all electrical systems for a full week."
  },
  {
    id: "scifi_hacker",
    name: "Hacker",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Electronics", die: "d8" }, { name: "Fighting", die: "d4" }, { name: "Hacking", die: "d8" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d6" }, { name: "Repair", die: "d8" }, { name: "Research", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Cyberdeck", "Installed cyberware: Data jack"],
    description: "Some tech-savvy types earn a living hacking into computer networks, virtual reality, or cyberspace to steal data or override systems."
  },
  {
    id: "scifi_harpooner",
    name: "Harpooner",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: "\u2014",
    parry: 4,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12",
      vigor: "d10"
    },
    skills: [{ name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Shooting", die: "d10" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Amorphous Body", effect: "Called Shots have no effect on harpooners. Bullets cause normal damage (mostly from hydrostatic shock), but other non-powered piercing weapons such as knives or arrows don\u2019t." },
      { name: "Bite", effect: "Str+d6." },
      { name: "Harpoon", effect: "Range 3/6/12, Damage Str+d6. Reloading a missed shot takes one round. If a victim suffers a Shaken or Wound result, he must make an opposed Strength roll. The harpooner drags the victim 2\" per success and raise. The connecting sinew has Toughness 8. Severing it requires the attacker to inflict a Wound, but this does not affect the harpooner, who grows a new harpoon in 1d6 days." },
      { name: "Size 2", effect: "Harpooners can grow to as much as 30\u2019. This specimen is a mere 9\u2019 long." }
    ],
    
    description: "Harpooners are large slugs with what looks like a horn growing from the front of their heads. The horn is, in fact, a specialized weapon. Connected to the body by a thin but tough length of sinew, the harpooner can build up internal pressure within its head, which it then releases, firing out the horn and trailing sinew. When it strikes flesh, the barbed horn sticks fast. The harpooner then retracts the harpoon and whatever it has struck to its waiting mouth. Harpooners crawl into small nooks and crannies when they are young and remain there for the rest of their lives, growing only as much as the hole allows. If attacked, the thing withdraws its head back into the hole."
  },
  {
    id: "scifi_haze_barnacle",
    name: "Haze Barnacle",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 2,
    parry: 5,
    toughness: 8,
    armor: 2,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d4",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Shell." },
      { name: "Poison (\u22122)", effect: "Small Blast Template. Victims who fail their Vigor roll die in 2d6 minutes. Characters in completely sealed suits are immune." },
      { name: "Size \u22121", effect: "Haze barnacles measure 2\u2019 across and are 6\" thick." },
      { name: "Slow", effect: "Barnacles cannot run." }
    ],
    
    description: "Haze barnacles are molluscs, spending much of their time hunkered down in their thick shells. A series of fine nozzles on the top of the shell produces puffs of purple gas (the creature\u2019s exhalations). When prey nears, the creature puffs out a cloud of deadly poisonous gas. Only when the victims have stopped moving does the barnacle slowly crawl onto them and begin feasting."
  },
  {
    id: "scifi_hugger",
    name: "Hugger",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 8,
    armor: 2,
    attributes: {
      agility: "d10",
      smarts: "d8 (A)",
      spirit: "d10",
      strength: "d12+3",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d12" }],
    abilities: [
      { name: "Armor +2", effect: "Thick plates." },
      { name: "Bite/Claws", effect: "Str+d6." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Hardy", effect: "Multiple Shaken results do not cause a Wound." },
      { name: "Paralysis", effect: "Anyone Shaken or Wounded by a tail attack must make a Vigor roll or be paralyzed for 2d6 rounds." },
      { name: "Tail", effect: "Str+d8, Reach 1, AP 2, \u22122 to Fighting when used. \u008f" }
    ],
    
    description: "Huggers feed off carbon dioxide emissions, such as those found in breathing exhalations. They attack by leaping at the face of their prey and smothering them into unconsciousness. They then secrete chemicals which keep the prey unconscious until the victim eventually dies from dehydration. The spider-like creatures have no fangs, eyes, or mouths. They have specialized vents, pores, and tiny hairs that work together to help it locate prey and absorb food. These aliens are insectoids armored in thick dark bone or shell carapace. They have no discernible eyes but seem to see with senses not yet understood. Their primary weapons are powerful, extendable jaws and sharp claws, and long tails tipped with barbed stingers. The things have only the most basic sentience\u2014or perhaps share a sentience with their insect-like hive. They are skilled hunters and use simple but effective tactics to divide and conquer their prey."
  },
  {
    id: "scifi_queen",
    name: "Queen",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 10,
    parry: 7,
    toughness: 16,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8 (A)",
      spirit: "d12",
      strength: "d12+6",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d10" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Armor +4", effect: "Thick plates." },
      { name: "Bite/Claws", effect: "Str+d10, AP 3." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Hardy", effect: "Multiple Shaken results do not cause a Wound." }
    ],
    
    description: "At the center of the hive lives the queen. Although her primary function is to lay eggs, she is a voracious hunter and fearless in defending her clutch. The queen has six legs and looks something like a cross between a beetle and a massive mantis."
  },
  {
    id: "scifi_hive_warrior",
    name: "Hive Warrior",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 4,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Elite", effect: "Huggers get a free reroll on failed Fighting results." },
      { name: "Size \u22122 (Small)", effect: "Huggers are 2\u2019 across." },
      { name: "Smother", effect: "Huggers add +2 to Athletics rolls to make or maintain a grapple (targets up to Size 2). If the target is Bound, the hugger has a hold around the victim\u2019s face, who takes a level of Fatigue each round. Once Incapacitated, the prey remains that way until the hugger is removed or the victim dies." },
      { name: "Unusual Sense", effect: "Huggers sense carbon dioxide with pinpoint accuracy. They halve Illumination penalties against living creatures not breathing through a rebreather or enclosed air supply system." },
      { name: "Paralysis (\u22124)", effect: "Anyone Shaken or Wounded by a tail attack must make a Vigor roll or be paralyzed for 2d6 rounds." },
      { name: "Size 4 (Large)", effect: "The queen stands 14\u2019 high and is typically 20\u2019 or more long. She has a narrow, segmented body." },
      { name: "Tail", effect: "Str+d10" }
    ],
    
    description: ""
  },
  {
    id: "scifi_impaler",
    name: "Impaler",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 3,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 12,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d10",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Armor +2", effect: "Thick, leathery hide." },
      { name: "Bite", effect: "Str+d10, AP 4." },
      { name: "Claws", effect: "Str+d4. Can make up to six attacks on a single target each round at no penalty." },
      { name: "Size 3", effect: "Impalers stand over 10\u2019 tall." },
      { name: "Stab and Grab", effect: "An impaler scoring a raise with at least two claw attacks has impaled its foe. The beast may then attack with its bite as a limited free action, adding +2 to that attack and damage." }
    ],
    
    description: "Impalers are among the top carnivores on their home world. They have four muscular legs and a thick tail forming their lower body. From the front of the torso protrudes a thick vertical \u201cneck\u201d which ends in a huge, forward-facing maw filled with rows of razor-sharp triangular teeth. The neck actually comprises the creature\u2019s head and upper body, and holds the stomach, lungs, and heart. Extending from the lower part of the neck are six arms, each tipped with four spear-like claws arranged in a square. Impalers attack by stabbing prey with their claws, then attacking with their fearsome teeth. Despite having six arms, they are quite short in comparison to the beast, and it may only attack one target at a time with them. However, it uses all six independently."
  },
  {
    id: "scifi_insect_giant",
    name: "Insect, Giant",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 6,
    parry: 5,
    toughness: 11,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d10",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Carapace." },
      { name: "Bite", effect: "Str+d6, AP 2." },
      { name: "Burrow (4)", effect: "Giant insects can move through soil at Pace 4." },
      { name: "Size 2", effect: "This specimen is 9\u2019 long and slightly taller than a man at the top of its head. Smaller and larger specimens may be found." }
    ],
    
    description: "Massive insects can be found on many worlds, living in colonies of a few dozen to millions of creatures. They aren\u2019t particularly dangerous in small numbers, but most travel in herds of 2d20, and many are connected through pheromones or even psionics to a queen that can direct more creatures to a perceived threat. There are many different varieties of giant insect. Those profiled below are burrowers, but a different species might have Flight, Claws, Poison, or other natural abilities."
  },
  {
    id: "scifi_insectoid",
    name: "Insectoid",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 14,
    armor: 8,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "360-Degree Vision", effect: "Ignore 1 point of Gang Up bonus." },
      { name: "Armor +2", effect: "Dense exoskeleton." },
      { name: "Cannot Speak", effect: "Unless aided by devices, insectoids can understand other languages but may only communicate with members of their own culture." },
      { name: "Claws", effect: "Str+d4, AP 2." },
      { name: "Communal", effect: "Add +2 to Spirit rolls when within 12\" (24 yards) of other insectoids." },
      { name: "Separation Disorder", effect: "\u22122 to Spirit rolls when no other insectoids are within line of sight." }
    ],
    gear: ["Combat armor (+6), Gatling laser (Range 50/100/200, Damage 3d6+4 (I), AP 4, RoF 4, Cauterize, Heavy Weapon, No Recoil, Overcharge, Snapfire), molecular knife (Str+d4+2, AP 2), 3\u00d7 incendiary grenades"],
    description: "Insectoids are any number of sentient humanoid species with an anatomy that resembles an insect. They are usually communal and organized around a hive. The following profile is for an insectoid soldier."
  },
  {
    id: "scifi_ironclaw",
    name: "Ironclaw",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 3,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d10",
      strength: "d12+2",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Bite", effect: "Str+d4." },
      { name: "Chameleon", effect: "If the ironclaw has some cover or darkness and moves half its Pace or less, it gains +4 to Stealth rolls." },
      { name: "Claws", effect: "Str+d8, AP 2." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Size 3", effect: "Adult ironclaws weigh over a ton. \u008f" },
      { name: "Extra Limbs", effect: "Kalians have four arms and two primary hands, and gain +1 Gang Up if directing multiple weapons at a target or +1 to Athletics rolls involving the limbs." },
      { name: "Frail", effect: "\u22121 Toughness." }
    ],
    
    description: "Crews jokingly call this ape-like horror the \u201clesser spotted ironclaw,\u201d fooling less experienced crew members into believing there is a greater spotted ironclaw. The first thing anyone notices about the horror is its diamond-like claws, but it also has the ability to change its color by fluffing different combinations of multi-hued hairs covering its body."
  },
  {
    id: "scifi_krok",
    name: "Krok",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 22,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12+8",
      vigor: "d12+4"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +4", effect: "Heavy Armor. Thick, scaly hide." },
      { name: "Bite", effect: "Str+d12" },
      { name: "Hardy", effect: "A second Shaken result does not cause a Wound." },
      { name: "Semi-Aquatic", effect: "Pace 10. A krok can hold its breath for 15 minutes. Irrasc are bipedal, with two huge grasping claws and a vertical, fang-lined mouth. Their tiny eyes and brain make them easy to fool, but as anyone who has ever fought one can attest, it\u2019s very hard to break free once one grabs you." }
    ],
    
    description: "These enormous specimens are found in the shallows of warm oceans, but occasionally a storm may wash one into a coastal swamp or lake. They bear a striking resemblance to Earth's crocodiles, though much larger and with spikes on their thick skins."
  },
  {
    id: "scifi_irrasc",
    name: "Irrasc",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 7,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 16,
    armor: 3,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12+7",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +3", effect: "Thick hide." },
      { name: "Bite", effect: "Str+d8, AP 4." },
      { name: "Claws", effect: "Str+d6. +2 to Athletics and Strength rolls made to grapple." },
      { name: "Roar", effect: "Irrasc can emit a terrifying roar. All those within 12\u201d (24 yards) must make a Spirit roll or be Shaken." },
      { name: "Size 7 (Large)", effect: "These fearsome creatures stand 30\u2019 tall and weigh over 16 tons." }
    ],
    
    description: ""
  },
  {
    id: "scifi_kalian",
    name: "Kalian",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 8,
    scale: "Huge",
    pace: 6,
    parry: 7,
    toughness: 8,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Taunt", die: "d8" }],
    abilities: [
      { name: "Additional Action", effect: "Reduce Multi-Action penalties by 2." },
      { name: "Ancestral Enemy (Saurians)", effect: "Subtract 2 from Persuasion when dealing with saurians (or a culture of the GM\u2019s choosing)." },
      { name: "Size 8 (Huge)", effect: "A giant krok can reach up to 30 feet in length." },
      { name: "Tail Sweep", effect: "Instead of making a bite attack, a krok can sweep all opponents within Reach 3. This may be Evaded. Size 3 or less creatures who fail are knocked back 2d6\" and Stunned." }
    ],
    gear: ["Light battle armor (+4), 4\u00d7 vibro swords (Str+d8+d6, AP 2), blaster pistol (Range 12/24/48, Damage 2d6+2, AP 2)"],
    description: "The kalians are a four-armed species which hail from an up-and-coming planetary system. They are known for their quick reactions, sharp wit, marksmanship, and swordplay. The profile below is for a typical swashbuckling kalian rogue, who earns a living as a smuggler, pirate, bootlegger\u2014or all three."
  },
  {
    id: "scifi_law_enforcement",
    name: "Law Enforcement",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), commlink, handcuffs, heavy pistol (Range 12/24/48, Damage 2d10, AP 4), stun baton (Str+d4, Stun)", "Heavier gear as needed"],
    description: "Law enforcement officials may be the local police, customs officials, a federal agency, or hired security guards."
  },
  {
    id: "scifi_living_planet",
    name: "Living Planet",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d6" }, { name: "Psionics", die: "d10" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Psionics", effect: "As extensions of the living planet, simulacrum possess rudimentary psionic power." },
      { name: "Steal Identity", effect: "Simulacra replicate the memories, Traits, Hindrances, and Edges of the person they are imitating. Those who know the original person may make a Notice roll at \u22124 to detect anything amiss. This penalty may be reduced to \u22122 or eliminated entirely for characters who are particularly close, such as immediate relatives or romantic partners." }
    ],
    
    description: "Living planets are immense creatures of mind- boggling size. They can be created when, over untold eons, plant or fungal colonies grow to encompass an entire asteroid, moon, or planet. Others are the end product of ecosystems which become so interconnected they begin functioning as a single being. Others might even be members of an as-yet unknown species of colossal, spherical creatures that resemble celestial bodies. A living planet\u2019s \"mind\" is a decentralized neural network comprised of trillions of individual nodes, capable of learning new information as the entity interacts with its environment. The sheer scope of this planet-sized brain allows living planets to psychically interface with creatures that come in contact with it. Despite all this brainpower, living planets cannot communicate\u2014at least not in any way currently recognized. Instead, they use the memories of sentient beings to create simulacra that take the form of friends, associates, family, or loved ones. These simulacra may be solid or merely phantasms. They are convincing in every detail, but since they are formed of memories, may lack key details which give away their artificial nature. Living planets do not have attributes or skills of their own, as they can only interact through their simulacra. They might retaliate against attacks\u2014if they even notice them\u2014 but suffer no actual damage unless attacked by weapons of a similarly massive scale. Simulacrum take the form of persons familiar to the individual with which the living planet wishes to make contact. Simulacrum magnify the innate personality traits of the person being imitated, because the living planet has little understanding of such things and bases its copy from imperfect memories. The profile below is for a basic human similacrum. Adjust Traits, Hindrances, and Edges as needed."
  },
  {
    id: "scifi_malific",
    name: "Malific",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 3,
    scale: "Large",
    pace: 6,
    parry: 6,
    toughness: 17,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d12+2",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Occult", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Science", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +6", effect: "Thick hide." },
      { name: "Bite/Claws", effect: "Str+d4." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Separation Disorder", effect: "When no other malifics are within line of sight the character suffers \u22122 to Spirit rolls." },
      { name: "Size 3", effect: "The typical malific stands over 9\u2019 tall and has a powerful, brawny frame." },
      { name: "Telepathy", effect: "A malific can communicate mentally with any sapient lifeform within 12\" (24 yards) regardless of language." },
      { name: "Tentacles (2)", effect: "Two tentacle actions and Reach 1. Tentacles deal Str+d4 damage. Bound or Entangled prey may be bitten as usual." }
    ],
    gear: ["Energy blade gauntlets (Str+d8 (I), AP 4, HW, Cauterize)"],
    description: "Malifics are aliens who come from alternative dimensions where reality functions in different ways. Some are mistaken for demons, while others look like clusters of writhing tentacles, bizarre symmetrical shapes, or other unearthly builds. Some also have psionics or employ technology so alien it qualifies as Weird Science."
  },
  {
    id: "scifi_mechanoid",
    name: "Mechanoid",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 5,
    scale: "Large",
    pace: 10,
    parry: 5,
    toughness: 15,
    armor: 4,
    attributes: {
      agility: "d10",
      smarts: "d6",
      spirit: "d4",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Electronics", die: "d8" }, { name: "Hacking", die: "d10+2" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Shooting", die: "d6" }],
    abilities: [
      { name: "Armor +4", effect: "Metallic body. blade, and saw blade). The attacks may be directed at the same target or different targets." },
      { name: "Construct", effect: "+2 to recover from being Shaken; ignore 1 point of Wound penalties; doesn\u2019t breathe, immune to poison and disease." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Flamethrower", effect: "Damage 3d6" },
      { name: "Matter Cutter", effect: "Damage 2d4+8" },
      { name: "Molecular Blade", effect: "Str+d8+2, AP 4." },
      { name: "Saw Blade", effect: "Str+d8, AP 4." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the recycler adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Size 5 (Large)", effect: "Recyclers are usually the size of a rhino and weigh four tons." }
    ],
    
    description: "Originating from another galactic arm\u2014 or perhaps another galaxy altogether\u2014 mechanoids are a civilization of aggressive, autonomous robots. For eons they have been systematically expanding, colonizing new solar systems and stripping them for raw materials, building immense structures to harness or generate energy, manufacture more machines, or for other unguessable purposes. The mechanoids have been at it for so long they no longer remember the species that created them. Now they exist only for their own undisclosed purposes, slowly consuming everything in the known galaxy. Mechanoids view organic-based life as fundamentally inferior: messy, disorderly, easily damaged, frequently defective, prone to irrational and even self-destructive behavior, bafflingly individualistic, and a waste of perfectly good raw elements. Mechanoids attack organic beings on sight, and are seemingly uninterested in diplomacy. These multi-legged machines specifically target technology employed by organic life forms, causing it to cease functioning, short- circuit, or\u2014ideally\u2014turn on its maker."
  },
  {
    id: "scifi_support_drone",
    name: "Support Drone",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 6,
    parry: 2,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d4",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Repair", die: "d8" }],
    abilities: [
      { name: "Armor +4", effect: "Metallic body." },
      { name: "Construct", effect: "+2 to recover from being Shaken; ignore 1 point of Wound penalties; doesn\u2019t breathe, immune to poison and disease." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Matter Cutter", effect: "Damage 2d4+8" },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the drone adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Size 1", effect: "Support drones are slightly larger than a human and come in many forms." },
      { name: "Construct", effect: "+2 to recover from being Shaken; ignore 1 point of Wound penalties; doesn\u2019t breathe, immune to poison and disease." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Laser SMG", effect: "Range 15/30/60, Damage 2d6, AP 2, RoF 4, Cauterize, No Recoil, Overcharge." },
      { name: "Matter Cutter", effect: "Damage 2d4+8" },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the contaminator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Size 4 (Large)", effect: "Contaminators are 12\u2019 tall, heavily built, and weigh 4,000 pounds." },
      { name: "Skill Bonus (Hacking +2)", effect: "Contaminators have numerous codebreaking, signal routing, and code insertion subroutines." }
    ],
    
    description: "These machines are designed for construction, repairs, and other support functions. They are quadrupedal and employ a variety of internally mounted tools."
  },
  {
    id: "scifi_recycler",
    name: "Recycler",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 16,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d4",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Shooting", die: "d6" }],
    abilities: [
      { name: "Armor +4", effect: "Metallic body." },
      { name: "Arms Akimbo", effect: "As a limited action a recycler may attack with each of its arms (flamethrower, matter cutter, molecular" }
    ],
    
    description: "The purpose of these machines is to break apart and convert matter into raw materials. For this purpose recyclers employ a variety of matter cutters, sanders, rotor saws, diamond-tipped grinders, blowtorches, or monofilament blades. They usually move about on four legs but some recyclers are designed for liquid or aerial environments."
  },
  {
    id: "scifi_war_drone",
    name: "War Drone",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 8,
    parry: 7,
    toughness: 15,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d4",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Electronics", die: "d8" }, { name: "Fighting", die: "d10" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Shooting", die: "d8+2" }],
    abilities: [
      { name: "Armor +6", effect: "Sturdy, reinforced frame." },
      { name: "Construct", effect: "+2 to recover from being Shaken; ignore 1 point of Wound penalties; doesn\u2019t breathe, immune to poison and disease." },
      { name: "Cutting Arm", effect: "Str+d8, AP 2." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Gatling Laser", effect: "Range 50/100/200, Damage 3d6+4" },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the drone adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Size 2", effect: "Battle drones are 9\u2019 tall, heavily built, and weigh 1000 pounds." },
      { name: "Skill Bonus (Shooting +2)", effect: "Battle drones have advanced combat algorithms." },
      { name: "Targeting", effect: "Negates 2 points of Range or Unstable Platform penalties." }
    ],
    
    description: "When the machine empire comes in contact with organic life forms, it manufactures war drones to eliminate the nuisance."
  },
  {
    id: "scifi_merchant",
    name: "Merchant",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Academics", die: "d8" }, { name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Gambling", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d8" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, personal data device"],
    description: "Merchants are savvy, experienced traders. They are very knowledgeable about the commodities they peddle, and are often excellent wheeler-dealers who know how to convince others to buy their goods. Most either own their own ship or work for a larger conglomerate, and always travel with at least one bodyguard. For common merchants who rarely (if ever) leave their home world, use the Citizen profile on page 237."
  },
  {
    id: "scifi_mimic",
    name: "Mimic",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d8" }, { name: "Taunt", die: "d6" }, { name: "Thievery", die: "d8" }],
    abilities: [
      { name: "No Vital Organs", effect: "Called Shots deal no extra damage." },
      { name: "Shapeshift", effect: "As a limited free action, a mimic can assume the appearance of another being up to two Sizes larger or smaller than her (but gains no benefits or penalties due to the Size change). The details are as perfect as the individual can observe, even fingerprints and retinal patterns if the information is available." }
    ],
    gear: ["Varies with disguise, but usually a laser pistol (Range 15/30/60, Damage 2d6, AP 2) and molecular knife (Str+d4+2, AP 2)"],
    description: "Any number of species can change their physical form to appear as members of another species. The profile below is for a mimic spy, an occupation for which they are uniquely gifted."
  },
  {
    id: "scifi_miner",
    name: "Miner",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 6,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d4",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Gambling", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d4" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Spacesuit (+1, if in space), matter disintegrator"],
    description: "Working in an asteroid belt or a planet rich in minerals but with a deadly atmosphere, miners are grizzled, hardy, and always seeking the big find that will enable them to retire."
  },
  {
    id: "scifi_monkey",
    name: "Monkey",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 4,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d10 (A)",
      spirit: "d6",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d10" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Bite", effect: "Str+d4." },
      { name: "Brachiation", effect: "Monkeys can move at their full Pace in trees or similar environments and don\u2019t normally need to make Athletics (climbing) rolls." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Size \u22121", effect: "Monkeys are about 4\u2019 tall." }
    ],
    
    description: "A wide variety of monkey-like creatures dot the cosmos. Some alien variants appear below, all of which use the same basic profile but add Special Abilities."
  },
  {
    id: "scifi_mucus_frog",
    name: "Mucus Frog",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 4,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Amphibious", effect: "Pace 6." },
      { name: "Dependency (Water)", effect: "The frogs must immerse in water at least one hour out of every 24 or suffer Fatigue each day until they perish." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Mucus Spit", effect: "Range 3/6/12. On a hit, the target is Entangled (Bound with a raise). A hit against an already Entangled target increases the effect to Bound. Bound victims suffer a level of Fatigue at the start of each round until they die or the mucus is removed (see Breaking Free from a Device, page 77)." }
    ],
    
    description: "Mucus frogs have large, bloated bodies with primitive forearms and stubby tails. Three eyestalks sit equidistant on the top of their heads. Their jaws are wide and powerful, and allow them to spit balls of sticky, suffocating mucus at their prey. The mucus hardens quickly once exposed to air or water, and is only softened by chemicals in the frog's saliva."
  },
  {
    id: "scifi_needlebush",
    name: "Needlebush",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: "\u2014",
    parry: 2,
    toughness: 9,
    armor: 2,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Notice", die: "d6" }, { name: "Shooting", die: "d8" }],
    abilities: [
      { name: "Armor +2", effect: "Needlebushes are protected by thick bark." },
      { name: "Plant", effect: "Immune to paralysis, poison, puppet, slumber, Stun; doesn\u2019t sleep." },
      { name: "Poison", effect: "Anyone Shaken or Wounded by the spines must make a Vigor roll or die in 2d6 rounds." },
      { name: "Size 1", effect: "Needlebushes are taller than an average human." },
      { name: "Thorns", effect: "A needlebush fires a volley of thorns every round it senses prey within a Large Blast Template centered on itself. Everything within suffers 2d4 damage." }
    ],
    
    description: "Not all carnivores are animals. Needlebushes are similar in appearance to cacti and their thick, waxy coating is covered in thousands of small pores. When a creature touches the bark, whether brushing up against it or to feast on the plant, it launches poisonous needles from the holes. The plant cannot limit its attack to the area touched, and so fires spines in a circular pattern. The needlebush uses its extensive root network to supplement hydration and feed on the decomposing flesh of its victims."
  },
  {
    id: "scifi_neo_animal",
    name: "Neo-Animal",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6",
      spirit: "d6",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d12" }, { name: "Common Knowledge", die: "d4" }, { name: "Electronics", die: "d4" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Repair", die: "d4" }, { name: "Science", die: "d4" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d8" }, { name: "Taunt", die: "d8" }],
    abilities: [
      { name: "Bite", effect: "Str." },
      { name: "Brachiation", effect: "Chimps can move at their full Pace in trees or similar environments and don\u2019t normally need to make Athletics (climbing) rolls." },
      { name: "Pounce", effect: "+4 to damage instead of +2 when making a Wild Attack." },
      { name: "Size \u22121", effect: "Chimpanzees are four feet tall and weigh around 125 pounds." }
    ],
    
    description: "Attitudes about genetic modification and enhancement vary throughout the galaxy, and even through the histories of most intelligent species. In campaigns where such technologies are available\u2014and legal\u2014careful genetic engineering can enhance the incipient capacities of suitable animal species, \"uplifting\" them to sentience. Neo-animals are usually granted many or most of the rights of their sentient peers, though in some settings social opinion remains deeply divided about their inherent \"humanity.\" In this case, give them the Outsider Hindrance. All neo-animals are fluent with the language in which they were raised, but are difficult to understand without vocal synthesizers or other aids. To make neo-animals, simply remove their animal intelligence (A), and add any missing core skills (Athletics, Common Knowledge, Notice, Persuasion, and Stealth) at d4 or higher, along with any Hindrances and Edges which make sense for their species. Genetically engineered chimps are often employed for their small size and natural athleticism. They are quick, clever, and capable of great empathy, but are also known for their hair-trigger tempers."
  },
  {
    id: "scifi_neo_dog",
    name: "Neo-Dog",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [],
    abilities: [
      
    ],
    
    description: "Dogs which have undergone genetic engineering are just as ferociously loyal and alert as their unmodified ancestors, but are far easier to train and are capable of assisting in nearly any capacity."
  },
  {
    id: "scifi_neural_cloud",
    name: "Neural Cloud",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 15,
    scale: "Gargantuan",
    pace: 6,
    parry: 4,
    toughness: 28,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d8(A)",
      spirit: "d10",
      strength: "d4",
      vigor: "d12+10"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d12" }, { name: "Persuasion", die: "d6" }, { name: "Science", die: "d8" }, { name: "Stealth", die: "d4" }, { name: "Shooting", die: "d10" }, { name: "Survival", die: "d10" }],
    abilities: [
      { name: "Fast Regeneration", effect: "Neural clouds may attempt a natural healing roll every round." },
      { name: "Fusion Blast", effect: "When threatened, a neural cloud can create a fusion reaction and direct the energy toward enemies with Shooting. Range 100/200/400, Damage 5d10" },
      { name: "Size 15 (Gargantuan)", effect: "Neural clouds are miles across, but their mass is spread thin across that area." },
      { name: "Unstoppable", effect: "Takes a maximum of one Wound (after Soaking) from any damaging attack unless the attacker\u2019s Action Card is a Joker." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Size \u22121", effect: "The heads of these canines come to an average human\u2019s waist, and they weigh about 60 pounds." },
      { name: "Speed", effect: "d10 running die." }
    ],
    
    description: ""
  },
  {
    id: "scifi_neo_dolphin",
    name: "Neo-Dolphin",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 5,
    toughness: 7,
    armor: 1,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Academics", die: "d4" }, { name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d12" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d6" }, { name: "Science", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 10." },
      { name: "Atmospheric Dependency", effect: "Dolphins must remain immersed in liquid water in order to survive. They treat any other atmosphere as being Hazardous. Those without a rebreather (or spacesuit if the pressure is too low) must check Vigor every hour or suffer a Fatigue level that can lead to death. When the dolphin is reimmersed at standard pressure it recovers one Fatigue level every 10 minutes." },
      { name: "Bash", effect: "Str." },
      { name: "Weakness (Magnetism)", effect: "Neural clouds suffer a \u22124 penalty to resist magnetic effects, and suffer +4 damage from magnetic attacks." }
    ],
    gear: ["Specialized spacesuit (+1, \"walk\" Pace 6, may manipulate objects), atmosphere recycler, commlink"],
    description: "The greatest achievement of the Terran genetic engineering program are the neo-dolphins. These cetaceans are gifted problem-solvers who excel at spacial and temporal reasoning. As aquatic creatures, they require special suits (complete with rebreathers, water purifiers, and mentally linked manipulator arms) to operate outside of water environments. In campaigns with psionics, neo-dolphins might have a natural aptitude for psychic manipulation. Give them Psionics d8, the Arcane Background (Psionics) Edge, and three suitable powers."
  },
  {
    id: "scifi_omega_crab",
    name: "Omega Crab",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 15,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12+4",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 8." },
      { name: "Armor +4", effect: "Heavy Armor; thick shell." },
      { name: "Claws", effect: "Str+d8" },
      { name: "Size 4 (Large)", effect: "The shells of omega crabs are 15 feet long at their widest point and weigh over two tons." }
    ],
    
    description: "These huge crab-like creatures are found throughout the oceans and beaches of the galaxy. They are voracious hunters who attack anything they can crack or rend with their powerful claws."
  },
  {
    id: "scifi_oracle",
    name: "Oracle",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 4,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d10",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Psionics", die: "d10" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Taunt", die: "d6" }],
    abilities: [
      { name: "Frail", effect: "\u22121 Toughness." },
      { name: "Telepathy", effect: "An oracle can communicate mentally with any sapient lifeform within 12\" (24 yards) regardless of language." }
    ],
    
    description: "These extraterrestrials have a natural affinity for mental, spiritual, or supernatural powers, perhaps due to a mysterious connection with other dimensions, ancient beings, microscopic parasites, arcane energies, or other sources beyond usual understanding. The profile below reflects an oracle with psionic powers in addition to their natural abilities."
  },
  {
    id: "scifi_orthocone",
    name: "Orthocone",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 6,
    scale: "Large",
    pace: "\u2014",
    parry: 6,
    toughness: 13,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+4",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 10." },
      { name: "Armor +2", effect: "Thick shell." },
      { name: "Bite", effect: "Str+d6." },
      { name: "Size 6 (Large)", effect: "Orthocones are 40 feet long." },
      { name: "Tentacles (4)", effect: "Four tentacle actions and Reach 1. Tentacles deal Str+d6 damage. Bound or Entangled prey may be bitten as usual. A victim killed by an orthocone\u2019s tentacles is usually ripped in half." }
    ],
    
    description: "Orthocones are long, cylindrical sea creatures with tentacles around their mouths. They move through the sea by sucking in water and pushing it out through special holes, propelling themselves at great speeds."
  },
  {
    id: "scifi_pendulum_bird",
    name: "Pendulum Bird",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: "\u2014",
    parry: 6,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+2",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Bash", effect: "Str+d8, Repulse." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Flight", effect: "Pace 12." },
      { name: "Low Gravity", effect: "\u22121 Toughness." },
      { name: "Size 1", effect: "Pendulum birds have a wingspan of 30\u2019 and a 6\u2019 long body." }
    ],
    
    description: "Pendulum birds are large avians, capable of flight only because of the low gravity of their home world. Sometime during their evolution, their legs fused into a single limb and their feet into a solid lump of bone. This lack of limbs means they spend their entire lives in the air, eating and mating on the wing. When attacking, they swoop down on their prey and unleash their bony leg, which is strong enough to smash armor plating and bone. Once the prey is dead, they make a series of dives to snatch at flesh with their sharp beaks."
  },
  {
    id: "scifi_pentamouth",
    name: "Pentamouth",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 4,
    parry: 6,
    toughness: 10,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d10",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Bite", effect: "Str+d6, Reach 2." },
      { name: "Multiple Heads", effect: "A pentamouth may make up to five Fighting attacks but only two heads may attack a single foe." },
      { name: "Size 2", effect: "Pentamouths are very dense. Most adults measure 6\u2019 in length and 3\u2019 in diameter." }
    ],
    
    description: "A pentamouth has a thick, knobby, cylindrical body which ends in five long necks, each ending in a large \u201chead\u201d with a tooth-filled mouth. Each head contains rudimentary visual organs but no brain\u2014which is found in the central body. Pentamouths are slow- moving and prefer to lie in low burrows and wait for prey to pass by. They can sense vibrations within ten yards."
  },
  {
    id: "scifi_pirate",
    name: "Pirate",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d4",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d6" }, { name: "Repair", die: "d4" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Spacesuit (+1), cutlass (Str+d6), blaster pistol (Range 12/24/48, Damage 2d6+2, AP 2)", "\u008f PIRATE OFFICER Pirate officers direct the actions of pirate crew during boarding attempts, battles, and routine tasks"],
    description: "Pirates earn a living by attacking other ships and stealing their cargo. They usually target poorly armed and heavily laden merchant craft in remote locations. Some ruthless pirate gangs never leave prisoners who could identify them. Others sell captives to slavers, hold them for ransom, or set them free so that their next victims will hopefully surrender without a fight. Typical pirates are not much more than thugs with a cutlass."
  },
  {
    id: "scifi_pirate_officer",
    name: "Pirate Officer",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 7,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d8" }, { name: "Repair", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Taunt", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Armored spacesuit (+4), power cutlass (Str+2d6), blaster pistol (Range 12/24/48, Damage 2d6+2, AP 2)", "\u008f PIRATE CAPTAIN Pirate captains are experienced pirates who command one or more pirate ships"],
    description: "Pirate officers direct the actions of pirate crew during boarding attempts, battles, and routine tasks."
  },
  {
    id: "scifi_pirate_captain",
    name: "Pirate Captain",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 8,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d10" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Piloting", die: "d10" }, { name: "Repair", die: "d6" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Taunt", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Combat spacesuit (+4), chain cutlass (2d6+4), plasma pistol (Range 12/24/48, Damage 2d10 (I), Cauterize, Heavy Weapon, Plasma)"],
    description: "Pirate captains are experienced pirates who command one or more pirate ships."
  },
  {
    id: "scifi_possessor",
    name: "Possessor",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d10",
      spirit: "d10",
      strength: "d4",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d12" }, { name: "Stealth", die: "d12" }],
    abilities: [
      { name: "Ethereal", effect: "Possessors are beings of pure psychic energy." },
      { name: "Immunities", effect: "Possessors (not their hosts) are immune to cold, heat, radiation, poison, and disease. They do not require air, food, or water to survive." },
      { name: "Possess", effect: "A possessor tries to possess its opponent\u2019s body with an opposed Spirit roll at \u22122. With success, the possessor gains complete control of its host\u2019s body. The victim may attempt to force the alien out every hour (another opposed Spirit roll). If the host is rendered unconscious, the possessor is forced to flee the body immediately." },
      { name: "Steal Identity", effect: "Possessors gain access to their host\u2019s memories, skills, and Edges, but are not affected by their Hindrances. To keep up appearances, Possessors mimic any such foibles. Those who know the victim may make a Notice roll at \u22124 to detect anything amiss. This penalty may be reduced to \u22122 or eliminated entirely for characters who are particularly close, such as immediate relatives or romantic partners." }
    ],
    
    description: "Possessors are noncorporeal alien beings resembling insubstantial shimmering colors in their natural form. They have the ability to take over a sentient body, which they can then use as their own. Some species seek only to learn about their host\u2019s culture. Others are more malicious."
  },
  {
    id: "scifi_psi_beast",
    name: "Psi Beast",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Psionics", die: "d8" }],
    abilities: [
      { name: "Psionics", effect: "All psi beasts have 15 Power Points. In addition, they have one of the psionic abilities below. Carnivore (Ambusher): This beast ambushes its prey using the teleport power. Carnivore (Lure): The thing has the puppet power. This may be a siren-song lure or require the beast to make eye contact with its prey. Carnivore (Speed Hunter): The beast has increased Pace and has the speed power. Carnivore (Stealth Hunter): These hunters get close to prey using the invisibility power. Carnivore (Stunner): The beast prefers to eat its prey alive. It has the stun power. Herbivore (Armored): Has extra Armor and the deflection power. Herbivore (Scary): The beast sends out telepathic signals which panic predators. It has the fear power. Herbivore (Survivor): Survivors rely on their Pace to outrun predators, getting a boost from the speed power." }
    ],
    
    description: "Psi beasts are regular animals that employ psionics or psionic-like powers. Apply the template below to the creature in question to get the effect you\u2019re looking for."
  },
  {
    id: "scifi_psi_booster",
    name: "Psi Booster",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 2,
    parry: 2,
    toughness: 3,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d12",
      strength: "d4",
      vigor: "d6"
    },
    skills: [{ name: "Notice", die: "d6" }],
    abilities: [
      { name: "Embedded", effect: "Psi boosters become rooted to their host. Unless the host dies, psi boosters are loathe to leave a healthy body and resist being removed. Extracting one requires complex surgery and a Healing roll at \u22124. Failure results in the death of the host!" },
      { name: "Psionic Boost", effect: "The psionicist adds +2 to Psionics rolls and each raise reduces the Power Point cost by 1 (this stacks with the Channeling Edge, to a minimum cost of 1 Power Point)." },
      { name: "Size \u22122 (Small)", effect: "Psi boosters are 2\u2019 long and 2\" thick." }
    ],
    
    description: "Psi boosters are small, squid-like entities. Although they are not truly psionic, they possess the remarkable ability to channel and boost psionic powers. The creatures are parasites, allowing their host to use their ability in return for taking sustenance from him. The host must eat 25% more food than usual to maintain his energy levels. Psi boosters attach to the back of the host\u2019s head, sinking a thick tentacle through the back of the skull (an automatic Wound), which intertwines around the spinal cord. The creatures know who has psionic powers and never attach to non-psionicists."
  },
  {
    id: "scifi_psi_eater",
    name: "Psi Eater",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 2,
    parry: 2,
    toughness: 1,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d12",
      strength: "d4",
      vigor: "d6"
    },
    skills: [{ name: "Notice", die: "d6" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Absorb Psionics", effect: "Any psionicist within 5\" (10 yards) of a psi eater has \u22124 to his Psionics roll. Anyone touching a psi eater has the benefits of the Improved Arcane Resistance Edge." },
      { name: "Size \u22124 (Tiny)", effect: "Psi eaters are six inches long and two inches thick." }
    ],
    
    description: "Psi eaters are green slug-like creatures with an unusual diet: they consume psionic energy. They are highly sought after by those who must deal with psionicists regularly, but must be restrained to prevent the creatures from moving inexorably toward their food source."
  },
  {
    id: "scifi_psi_knight",
    name: "Psi-Knight",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 8,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d10" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Psionics", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4, energy skin), energy katana (Str+d8+1 (I), AP 4, HW)", "\u008f PSI-KNIGHT MASTER"],
    description: "Psi-knights are a dedicated order of warriors who combine the ancient code of chivalry with psionics and swordplay. As with any organization, some members are good and noble people, serving to uphold peace in the galaxy. Others use their powers for personal gain, or to promote the cause of evil and chaos."
  },
  {
    id: "scifi_psi_knight_master",
    name: "Psi-Knight Master",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 10,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d10",
      smarts: "d8",
      spirit: "d10",
      strength: "d10",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Common Knowledge", die: "d8" }, { name: "Fighting", die: "d12" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Psionics", die: "d10" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4, energy skin), energy katana (Str+d8+1 (I), AP 4, HW)"],
    description: ""
  },
  {
    id: "scifi_psionicist",
    name: "Psionicist",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d10",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Psionics", die: "d10" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Taunt", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), energy knife (Str+d4+4 (I), AP 2, HW), and laser pistol (Range 15/30/60, Damage 2d6, AP 2)"],
    description: "Psionicists have unlocked the power of their mind to protect themselves and their allies, or confuse and blast their foes. Whether \u201cpsions\u201d are accepted members of society or hunted outcasts depends on the setting."
  },
  {
    id: "scifi_puppet_master",
    name: "Puppet Master",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 2,
    toughness: 2,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d10",
      spirit: "d12",
      strength: "\u2014",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Psionics", die: "d10" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Embedded", effect: "Puppet masters would rather see their victim die than break free of their control. Surgically removing a puppet master requires a Healing roll at \u22124. With a failure, the puppet master makes a Psionics roll opposed by the victim\u2019s Spirit. Each success and raise lowers the victim\u2019s Smarts by one die type as it destroys the brain as an act of revenge. A victim reduced to below d4 Smarts is a vegetable. The same applies if the creature is ever Wounded\u2014though it only has one attempt to destroy its victim\u2019s brain before it dies." },
      { name: "Possession", effect: "If a puppet master gets to the back of a victim\u2019s neck, usually while he\u2019s asleep, it inserts its tendrils into the spinal column and makes an opposed Spirit roll. Once attached, the creature is in complete control of its victim, gaining access to all his skills, memories, Edges, and even psionic powers (if the host has them). The host can never break free unless someone removes the puppet master." },
      { name: "Size \u22124 (Tiny)", effect: "Puppet masters are four inches in diameter." }
    ],
    
    description: "There are more ways to conquer a planet than blasting it to atoms with superior firepower. Puppet masters are small spider-like creatures with a human eye in the center of their back. They are biotechnology tools, used to control important people by attaching themselves to the spinal cord of sentient beings so they can monitor and control the victim\u2019s thoughts."
  },
  {
    id: "scifi_quadrapus",
    name: "Quadrapus",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: "\u2014",
    parry: 5,
    toughness: 8,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d10",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Bite", effect: "Str+d4." },
      { name: "Flight", effect: "Pace 4." },
      { name: "Size 2", effect: "These beasts measure 20\u2019 long from head to tentacle tip." },
      { name: "Tentacles (4)", effect: "Four tentacle actions and Reach 1. Tentacles deal Str+d4 damage. Bound or Entangled prey may be bitten as usual." }
    ],
    
    description: "A quadrapus is vaguely similar in appearance to a four-armed octopus. It has a bulbous head with an eye on each side, a beak on the underside, and four long tentacles. Unlike the octopus, however, the quadrapus lives on land. The quadrapus is a floater, rather than a flyer or glider. It drifts in the air currents of its low-gravity world, expelling jets of air sucked in through its beak to retain its height. Quadrapuses are not the smartest of hunters, and simply drift along dangling their tentacles along the ground and lunging at anything trying to avoid their grasp. A quadrapus attacks by either slapping its prey or grappling with it. A quadrapus may take up to four different actions each round with its tentacles, either slapping or grappling at no Multi-Action penalty."
  },
  {
    id: "scifi_quadroid",
    name: "Quadroid",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 7,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d4",
      spirit: "d6",
      strength: "d12",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Gambling", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d4" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Additional Action", effect: "Reduce Multi-Action penalties by 2." },
      { name: "Extra Limbs", effect: "Quadroids have four arms and two primary hands, and gain +1 Gang Up if directing multiple weapons at a target or +1 to Athletics rolls involving the limbs." },
      { name: "Frail", effect: "\u22121 Toughness." }
    ],
    gear: ["Synth-mesh suit (+2)"],
    description: "This localized variety of four-limbed humanoids are often employed as laborers or guards due to their additional appendages, but are especially prone to disorientation during FTL travel in place of ancestral enemies.."
  },
  {
    id: "scifi_quatha",
    name: "Quatha",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 6,
    scale: "Large",
    pace: 8,
    parry: 4,
    toughness: 16,
    armor: 1,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d12+6",
      vigor: "d12+2"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d4" }, { name: "Stealth", die: "d4" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +1", effect: "Tough hide." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Low Light Vision", effect: "Quatha ignore penalties for Dim and Dark Illumination." },
      { name: "Size 6 (Large)", effect: "Quatha are similar to an African elephant in size and weigh eight tons." },
      { name: "Tireless", effect: "Immune to Fatigue." },
      { name: "Trample", effect: "Str+d6." }
    ],
    
    description: "These huge, lumbering quadrupeds originated on a world with few natural predators. Their sturdy frames, extraordinary endurance, and docile, trusting nature made them excellent mounts or beasts of burden. Though the original quatha were lizard-like, with thick, pebbly skin and inset eyes (to shield them from bright sunlight), the term is widely used for any similar beast of the same general size, temperament, and nature. A \"quatha\" on one planet might be elephant- like, with thick, woolly hide and defensive horns on its tail. On another, a \"quatha\" might be a six-legged beast with infrared-sensing eyes and no discernible head. The profile below is for a typical hairless quatha from a temperate, dry world. Adjust the profile as needed to suit the locale."
  },
  {
    id: "scifi_radbeast",
    name: "Radbeast",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 4,
    parry: 4,
    toughness: 14,
    armor: 6,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d8",
      strength: "d10",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Acid", effect: "If forced to fight, radbeasts rear up and plop forward in an attempt to grapple. If successful, the victim suffers 3d6 damage" },
      { name: "Armor +6", effect: "Heavy Armor. Thick, stony body." },
      { name: "Bash", effect: "Str+d10" },
      { name: "Immunity", effect: "Radbeasts suffer no harm from radiation." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." },
      { name: "Radiation Projection", effect: "Radbeasts eat all manner of rock, but favor radioactive minerals. As an action, they can project an intense radiation field around their bodies as a form of defense. Any creature within a Medium Blast Template centered on the beast must make a Vigor roll or suffer a level of Fatigue. A character Incapacitated by this attack or who rolls a Critical Failure to resist contracts radiation sickness (see Savage Worlds)." },
      { name: "Size 2", effect: "A radbeast\u2019s stony body weighs almost a ton." }
    ],
    
    description: "Radbeasts are silicon-based life forms that resemble a slithering collection of small rocks with no discernible limbs. Indeed, they have no discernible features of any sort. They do have sensory organs, but these are attuned to heat rather than light. They actually eat rock, digesting it with powerful acids and using osmosis to transfer the resulting paste to their bodies. Through some quirk of chemistry, they cannot dissolve diamonds. In certain systems they are used as diamond miners. The radbeasts dissolve the stone around the gem, leaving behind raw diamonds for collection later."
  },
  {
    id: "scifi_rakashan",
    name: "Rakashan",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 11,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Stealth", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Ancestral Enemy (Floran)", effect: "Subtract 2 from Persuasion when dealing with florans (or a culture of the GM\u2019s choosing)." },
      { name: "Bite/Claws", effect: "Str+d4." },
      { name: "Low Light Vision", effect: "Rakashans ignore penalties for Dim and Dark Illumination." }
    ],
    gear: ["Infantry battle suit (+6), laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge)"],
    description: "These feline humanoids come in many varieties, but all have sharp teeth and claws."
  },
  {
    id: "scifi_rascal",
    name: "Rascal",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 5,
    parry: 5,
    toughness: 6,
    armor: 4,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Ancestral Enemy (Insectoid)", effect: "Subtract 2 from Persuasion when dealing with insectoids." },
      { name: "Reduced Pace", effect: "Rascals have small legs. Pace \u22121, and d4 running die." },
      { name: "Size \u22123 (Very Small)", effect: "Rascals stand around 16 inches in height and weigh 20 pounds." }
    ],
    gear: ["Body armor (+4), laser pistol (Range 12/24/48, Damage 2d6+2, AP 2), molecular knife (Str+d4+2, AP 2), 2\u00d7 incendiary grenades"],
    description: "The diminutive, weasel-like rascals are experienced warriors, having spent decades defending themselves against a species of aggressive insectoids."
  },
  {
    id: "scifi_ravager",
    name: "Ravager",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 6,
    toughness: 9,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Fear", effect: "Anyone who sees a ravager must make a Fear check." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Pack Tactics", effect: "Ravagers add any Gang Up bonus to their Fighting damage as well as the attack roll." },
      { name: "Resilient", effect: "Can take one additional Wound." }
    ],
    gear: ["Light club (Str+d4), knife (Str+d4), handmade mace (Str+d6), or improvised weapon"],
    description: "Sometimes the profound emptiness of space, its mind-shattering scale, its staggering eons of time, and its cold indifference to humanity can have a deleterious effect on the human mind. This is more than just \"space madness\"\u2014a mental disorder common among solo astronauts\u2014but something deeper, a fundamental break of the human psyche. The afflicted are called \"ravagers\"\u2014 crazed berserkers bent on destroying all other life. Ravagers are remarkably quick, agile, and strong. Most issue a constant stream of babble or cannot speak at all. However, they\u2019re incapable of strategy or complex thought\u2014at least as far as anyone can tell. Most bizarrely, though, ravagers don\u2019t see other ravagers as a threat\u2014and in fact have been known to work together using crude pack tactics. Some even cling to a sliver of their former expertise, allowing them to pilot spacecraft, fire weapons, or disable complex electronics. The profile below is for a typical human ravager, though members of any sapient species may join their number."
  },
  {
    id: "scifi_sandmaw",
    name: "Sandmaw",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 10,
    scale: "Huge",
    pace: "\u2014",
    parry: 5,
    toughness: 22,
    armor: 4,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12+10",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d10" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Armor +4", effect: "Thick hide." },
      { name: "Bite", effect: "Str+d8." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Size 10 (Huge)", effect: "Sandmaws stretch 60 feet from mouth to tail, but most of their mass is underground. Their ring-like mouths are 3\" (6 yards) across." },
      { name: "Swallow Whole", effect: "Anyone hit by a bite attack must make an Evasion roll or be Swallowed Whole. At the end of the creature\u2019s subsequent turns, anyone swallowed must make a Vigor roll at \u22122 or take a Wound from the crushing gullet and acidic bile. Shaking, Wounding, or otherwise provoking the creature may result in opportunities to escape with an Athletics roll." },
      { name: "Tentacles (1)", effect: "One tentacle action and Reach 5. Tentacles deal Str+d4 damage. Bound or Entangled prey may be bitten as usual." }
    ],
    
    description: "Usually found on desert worlds, sandmaws are huge, predatory worms that catch prey by burrowing into the sand. The loose earth of the sandmaw\u2019s crater makes it hard for prey to climb back out. When they finally grow tired they slide down into the waiting sandmaw\u2019s lamprey-like mouth. Once established, sandmaws never move. They live long enough that local intelligent beings often include sandmaw pits on maps."
  },
  {
    id: "scifi_saurian",
    name: "Saurian",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 12,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Scaly skin." },
      { name: "Bite", effect: "Str+d6, AP 2." },
      { name: "Cold-Blooded", effect: "Subtract 1 from Agility, Strength, and Vigor rolls after spending more than ten minutes in temperatures below 60\u00b0 Fahrenheit (18\u00b0 Celsius)." },
      { name: "Environmental Weakness (Cold)", effect: "Saurians are poorly suited for frigid conditions. They suffer a \u22124 penalty to resist cold environmental effects, and suffer +4 damage from cold-based attacks." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." }
    ],
    gear: ["Body armor (+4), laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge), molecular knife (Str+d4+2, AP 2)"],
    description: "The lizard-like saurians come from a variety of worlds, from deserts to jungles and fetid marshes. Some communities are primitive and violent while others are enlightened and refined. The profile below represents a warrior from a society on par with Terrans."
  },
  {
    id: "scifi_scientist",
    name: "Scientist",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 2,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Academics", die: "d8" }, { name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Repair", die: "d8" }, { name: "Research", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, personal data device"],
    description: "Scientists analyze the cosmos and attempt to put order to it. They\u2019re experts in a particular field and most of its related studies as well."
  },
  {
    id: "scifi_scoopjaw",
    name: "Scoopjaw",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 12,
    scale: "Gargantuan",
    pace: 8,
    parry: 6,
    toughness: 24,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8 (A)",
      spirit: "d8",
      strength: "d12+10",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Armor +4", effect: "Heavy Armor. Thick hide." },
      { name: "Bite", effect: "Str+d10" },
      { name: "Hardy", effect: "Not Wounded by a second Shaken result." },
      { name: "Size 12 (Gargantuan)", effect: "Over 60\u2019 tall." },
      { name: "Swallow Whole", effect: "Anyone hit by a bite attack must make an Evasion roll or be Swallowed Whole. At the end of the creature\u2019s subsequent turns, anyone swallowed must make a Vigor roll at \u22122 or take a Wound from the crushing gullet and acidic bile. Shaking, Wounding, or otherwise provoking the creature may result in opportunities to escape with an Athletics roll." }
    ],
    
    description: "Scoopjaws are scaled quadrupedal, hippo- like creatures of immense size with jaws wide enough to swallow humans whole. They are truly massive\u2014the size of six-story houses\u2014 territorial, and aggressive, especially during mating season."
  },
  {
    id: "scifi_scrap_parasite",
    name: "Scrap Parasite",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 4,
    parry: 5,
    toughness: 11,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d6",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Thick rubbery hide." },
      { name: "Bite", effect: "Str+d4, AP 2." },
      { name: "Immunity", effect: "Disease." },
      { name: "Infection", effect: "Victims Shaken or Wounded from a bite must make a Vigor roll at \u22122 or gain a Debilitating Disease." },
      { name: "Resilient", effect: "Scrap parasites can take one Wound before they\u2019re Incapacitated." },
      { name: "Size 2", effect: "An average scrap parasite is the size of a horse, though some grow larger." },
      { name: "Tentacles (2)", effect: "Two tentacle actions and Reach 1. Tentacles deal Str+d4 damage. Bound or Entangled prey may be bitten as usual." }
    ],
    
    description: "The bane of colony ships, scrapyards, factories, garbage scows, and waste processing plants, scrap parasites are fierce molluscs drawn to heaps of junk. There they consume all the organic material they can find, along with plastics and even certain metals. Living creatures make for a nice, concentrated snack! Most large spacecraft have a scrap parasite dwelling in their recycling facility or even in their sewage treatment system. If a crew member goes missing, there might be a scrap parasite on board. A scrap parasite\u2019s body is a rubbery mass of tentacles dominated by a toothy mouth. It has three eyestalks it can use as a periscope to search for prey without emerging from cover."
  },
  {
    id: "scifi_scylla",
    name: "Scylla",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 2,
    parry: 6,
    toughness: 9,
    armor: 2,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 10." },
      { name: "Armor +2", effect: "Tough, rubbery skin." },
      { name: "Bite", effect: "Str+d4." },
      { name: "Chameleon", effect: "Scylla can change color or pattern as a limited free action, adding +4 to Stealth rolls." },
      { name: "Constrict", effect: "If a scylla succeeds at a Fighting attack with a raise, it automatically Entangles its prey." },
      { name: "Tentacles (4)", effect: "Four tentacle actions, Reach 5, Str+d6." }
    ],
    
    description: "Scylla are any number of octopus-like species found throughout the galaxy. The version here is considerably stronger than those found on Earth and far more aggressive."
  },
  {
    id: "scifi_scylla_giant",
    name: "Scylla, Giant",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 12,
    scale: "Gargantuan",
    pace: 2,
    parry: 7,
    toughness: 25,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12+10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d10" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 10." },
      { name: "Armor +6", effect: "Heavy Armor. Tough, rubbery hide." },
      { name: "Chameleon", effect: "Scylla can change color or pattern as a limited free action, adding +4 to Stealth rolls." },
      { name: "Constrict", effect: "If a giant syclla succeeds at a Fighting attack with a raise, it automatically Entangles its prey." },
      { name: "Size 12 (Gargantuan)", effect: "A giant scylla is over 100\u2019 long." },
      { name: "Tentacles (4)", effect: "Four tentacle actions, Reach 5, Str+d10" }
    ],
    
    description: "Named after the legendary counterpart of the monster Charybdis, scylla are massive titanic squid-like creatures that live in the darkest depths of deep-water worlds. They are ravenous predators who will even briefly drag themselves onto land in their relentless pursuit of prey."
  },
  {
    id: "scifi_sentient_vehicle",
    name: "Sentient Vehicle",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: 6,
    parry: 2,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Size 1", effect: "Setneru are slim, but eight feet tall." }
    ],
    gear: ["Various"],
    description: "Some starships, aircraft, walkers, or other vehicles have an artificial intelligence code added to their onboard computing systems. These intelligent, self-aware vehicles interact with operators just like a crew member, and often come with (or develop on their own) personality algorithms that might even include Hindrances. Mysteriously, some vehicles form sentience without the benefit of AI programming. Most of these remain quiet, listening to their hosts and continuing to learn until the time is right to reveal themselves. Science is hard-pressed to explain these anomalies, leading some to attribute it to the next step in evolution. A few sentient vehicles become malicious, making life difficult for their crews, inserting puzzling lines of code into their own programming, causing subsystems to act up, or sometimes even eradicating their crews and going rogue. Sentient vehicles use the statistics for the appropriate vehicle. The AI has a Smarts and Spirit of at least d10. Some might even have their own skills at d12 or higher. Typical skills include Academics, Battle, Driving, Electronics, Language, Notice, Persuasion, Piloting, Research, or Science. The enigmatic Setneru are slightly taller than humans, and have graceful bodies with beautiful features. Individuals are androgynous, but change their body type closer to \"male\" or \"female\" while forming a mating pair or to meet the needs of the environment. Their home world is a sandy desert planet, riddled with the ancient ruins of their own civilization and the domain of gargantuan sandsnakes. The profile below is for a typical Setneru citizen."
  },
  {
    id: "scifi_shock_ray",
    name: "Shock Ray",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 6,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d10",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Electric Discharge", effect: "As a limited free action, a shock ray can discharge a powerful electric field. Anyone within a Medium Blast Template centered on the ray must make a Vigor roll or be Stunned." },
      { name: "Flight", effect: "Pace 8." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." },
      { name: "Tail Lash", effect: "Str+d6, AP 2, Reach 1." }
    ],
    
    description: "Shock rays are large flying creatures from worlds with thick atmospheres or low gravity. Like Terran rays, they have triangular wings and long tails\u2014but their tails end with electrochemical barbs which allow them to stun their prey with powerful shocks. On ocean worlds, or those with thin atmospheres or high gravity, they might be water creatures instead (Aquatic: Pace 8)."
  },
  {
    id: "scifi_shredder",
    name: "Shredder",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 7,
    scale: "Large",
    pace: 10,
    parry: 6,
    toughness: 14,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Bite/Claws", effect: "Str+d8." },
      { name: "Fleet-Footed", effect: "d10 running die." },
      { name: "Size 7 (Large)", effect: "Shredders weigh over 6000 pounds and stand about 20\u2019 tall." }
    ],
    
    description: "Shredders are large lizards with muscular arms, huge teeth, and razor-sharp claws. One bite is usually enough to disable most prey. They rely on pure speed for hunting and are typically solitary creatures."
  },
  {
    id: "scifi_smuggler",
    name: "Smuggler",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 9,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d8" }, { name: "Piloting", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4, energy skin), laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge)"],
    description: "Smugglers make money by taking goods where authorities don\u2019t want them to be sold. Some are out for a quick credit; others are noble freelancers, shipping vital cargo to worlds interdicted by totalitarian governments."
  },
  {
    id: "scifi_soldier",
    name: "Soldier",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Infantry battle suit (+6), laser rifle (Range 30/60/120, Damage 3d6, RoF 3, AP 2, Cauterize, No Recoil, Overcharge), molecular knife (Str+d4+2, AP 2), 2\u00d7 frag grenades"],
    description: "These archetypes serve for common soldiers, marines, or planetary defense forces. Other skills or Edges should be added as fits their particular environment. Grunts make up the majority of any military force or strike team."
  },
  {
    id: "scifi_marine",
    name: "Marine",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 12,
    armor: 6,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Infantry battle suit (+6), laser rifle (Range 30/60/120, Damage 3d6, RoF 3, AP 2, Cauterize, No Recoil, Overcharge), molecular knife (Str+d4+2, AP 2), 2\u00d7 frag grenades", "\u008f OFFICER Officers are in command of a contingent of soldiers or marines"],
    description: "Space marines are highly trained combatants. They serve as elite units during military actions, undertake special missions, or are assigned to duty on various spacecraft."
  },
  {
    id: "scifi_officer",
    name: "Officer",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 11,
    armor: 6,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Battle", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Infantry battle suit (+6), laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge), power saber (Str+2d6)"],
    description: "Officers are in command of a contingent of soldiers or marines."
  },
  {
    id: "scifi_space_barnacle",
    name: "Space Barnacle",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: "\u2014",
    parry: 2,
    toughness: 7,
    armor: 2,
    attributes: {
      agility: "d4",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d4",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Notice", die: "d4" }],
    abilities: [
      { name: "Armor +2", effect: "Hard shell." },
      { name: "Immobile", effect: "Space barnacles cannot move on their own. If dislodged in space, they can use their spitting attack to propel themselves away at Pace 6." },
      { name: "Size \u22121", effect: "Space barnacles are roughly the size of a tire, measuring three feet across." },
      { name: "Spit Acid", effect: "Space barnacles can spit acid in a Stream Template. Targets splattered with acid suffer 3d4 damage. This may be Evaded." }
    ],
    
    description: "These tough arthropods got their start clinging to asteroids and feasting on radiation from nearby stars, but prefer the surface of spacecraft where they can also consume energy emitted from the craft itself. They might seem harmless, but a single barnacle can spawn another every week, leading to a massive cluster. The harsh chemical in their secreted adhesive gradually wears holes in the superstructure, and in large numbers their weight can interfere with a vessel\u2019s handling. Space barnacles react to any attempt to attack or dislodge them by \"spitting\" concentrated acid at the aggressor."
  },
  {
    id: "scifi_space_cowboy",
    name: "Space Cowboy",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 10,
    armor: 4,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Gambling", die: "d4" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d6" }, { name: "Riding", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Body armor (+4), power whip (Str+d6+d4, Parry \u22121, Reach 2, ignores shield bonus, may Entangle or deal +d10 damage with raise), commlink, digital binoculars, exoskeleton (Strength d12), motion detector, Stetson"],
    description: "Space cowboys are trained wranglers hired to capture, kill, or corral all manner of xenos. They usually haunt far-flung colonies where their services are in high demand."
  },
  {
    id: "scifi_space_leviathan",
    name: "Space Leviathan",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 24,
    scale: "Gargantuan",
    pace: 10,
    parry: 7,
    toughness: 32,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+20",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d8" },
      { name: "Crush", effect: "A leviathan crushes an Entangled or Bound vehicle as a limited free action. It automatically inflicts a Critical Hit as its tentacles seek out and destroy sensitive parts of the ship." },
      { name: "Flight", effect: "Pace 12,000 MPH (Speed Rating 25)." },
      { name: "Hardy", effect: "A second Shaken result does not cause a Wound." },
      { name: "Size 24 (Gargantuan)", effect: "Leviathans grow to over 1,000\u2019 in length." },
      { name: "Swallow Whole", effect: "Any creature Size 7 or smaller hit by a bite attack must make an Evasion roll or be Swallowed Whole. At the end of the creature\u2019s subsequent turns, anyone swallowed must make a Vigor roll at \u22122 or take a Wound from the crushing gullet and acidic bile. Shaking, Wounding, or otherwise provoking the creature may result in opportunities to escape with an Athletics roll." },
      { name: "Tentacles (1)", effect: "One tentacle action and Reach 50. Tentacles deal Str+d12 damage. Bound or Entangled prey may be crushed and bitten as usual." },
      { name: "Unstoppable", effect: "Takes a maximum of one Wound (after Soaking) from any damaging attack unless the attacker\u2019s Action Card is a Joker." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." }
    ],
    
    description: "Few know what horrors lurk in the dark, cold recesses of space. Space leviathans are one such monster. The kraken-like things thrive in the vacuum, but periodically dip into atmosphere to devour planet-bound prey."
  },
  {
    id: "scifi_space_sargassum",
    name: "Space Sargassum",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 4,
    parry: 4,
    toughness: 16,
    armor: 4,
    attributes: {
      agility: "d4",
      smarts: "d10 (A)",
      spirit: "d6",
      strength: "d12+4",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Armor +4", effect: "The spear tree has a 6\" thick layer of bark." },
      { name: "Plant", effect: "Immune to paralysis, poison, puppet, slumber, Stun; doesn\u2019t sleep." },
      { name: "Size 4 (Large)", effect: "The spear tree is nearly 24 feet tall." },
      { name: "Spears", effect: "The tree can shoot a number of spears each round, Damage Str+d6, AP 2, Range 3/6/12, RoF 5. If the attack causes a Wound, the victim is impaled as well. Budding roots begin to grow into the victim, draining nutrients back to the tree through the specialized vines, and causing an additional Str+d4 damage per round, ignoring any bonuses to Toughness from Armor. Once the victim is drained, the vine detaches. Attached vines have a Toughness of 10." }
    ],
    
    description: "The otherwise empty voids of space might appear lifeless, but they are home to a variety of peculiar plantlife which is perfectly adapted for the vast stretches between stars. Drawing sustenance from particles blown in on interstellar winds, the sargassum forms colossal \"mats\" that can sometimes span several astronomical units across. The tightly woven, rubbery strands can resist high-impact collisions and are notorious for being invisible to most sensors. Before most spacers know there\u2019s a problem, their spacecraft has become hopelessly entangled in an immense patch of the weed. Worse, the rapidly growing plants are drawn to physical objects such as asteroids or spacecraft, which serve as \"anchors\" for the sargassum. If the crew doesn\u2019t act fast enough, ensnared craft can soon become hopelessly engulfed. Stories of derelict craft\u2014and their desirable cargo\u2014 circulate the space lanes. In some instances, space sargassum patches draw in strange creatures adapted for outer space, in effect becoming microbiomes that provide food and protection. Any number of space-adapted beasts might be found in a sargassum patch, including predators, vermin, and even strange viruses. The tormented souls of those who starved or froze in the sargassum might even haunt their cold, tomb-like vessels\u2026 Space sargassum doesn\u2019t have Traits of its own, but individual strands are usually 1\" (2 yards) in thickness with Hardness 16. Fire and fire-based attacks deal +4 damage to the weed. Tendrils can move/grow at Pace 1 toward solid objects. In most cases cutting free is a Complex Dramatic Task (see Savage Worlds) to escape before the tendrils grow too thick\u2014possibly while creatures living in the mass attack the crew! Spear trees are intelligent, ambulatory trees with numerous barbed thorns set within their trunks. The thorns are the size of spear heads, and are connected by strong vines. The tree tries to kill its victims with these spears, then drains the nutrients from the corpse."
  },
  {
    id: "scifi_spit_worm",
    name: "Spit Worm",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d10",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d6." },
      { name: "Infravision", effect: "Halve Illumination penalties when attacking warm targets." },
      { name: "Spit Poison", effect: "Range 3/6/12. Anyone not wearing a sealed body suit struck by the poison must make a Vigor roll or be paralyzed for 2d6 rounds." }
    ],
    
    description: "In deep forests of primeval worlds lurk the spit worms, large and territorial centipede- like creatures. The arthropods measure 5\u2019 in length and are covered in soft, flexible, chitinous plates. They scuttle about on 40 clawed legs. Although it has mandibles, the spit worm\u2019s primary mode of attack is to spit paralyzing poison. In order to do this, the worm rears up on its hind segments and curls itself into an 'S' shape. It then uncoils, firing a glob of sticky, green poison, which can reach distances of 24 yards. Spit worms are tenacious creatures, willing to face down larger predators. Their distinctive rearing 'S' shape serves as a warning to predators fancying it as a meal."
  },
  {
    id: "scifi_spitter",
    name: "Spitter",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Armor +2", effect: "Scaly hide." },
      { name: "Bite", effect: "Str+d6." },
      { name: "Size \u22121", effect: "Spitters stand about 3' tall." },
      { name: "Spit Poison", effect: "Cone Template, may be Evaded. Most spitters emit Mild Poison, but some varieties may project Knockout, Lethal, or Paralyzing (GM's call)." }
    ],
    
    description: "Spitters are temperamental mammals that spit poison at predators or anything that annoys them. They are notoriously easily annoyed."
  },
  {
    id: "scifi_springtail",
    name: "Springtail",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Bite/Claws", effect: "Str+d6." },
      { name: "Fearless", effect: "Immune to Fear and Intimidation." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Maul", effect: "A springtail scoring a raise on a Fighting roll automatically Entangles its foe, adding +2 to its bite attack on subsequent rounds." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." }
    ],
    
    description: "Despite their innocuous name, springtails are fierce, man-sized reptilian predators that hunt in packs of 2d6. Their four vestigial limbs end in a single curved claw designed to latch onto prey rather than provide locomotion. As their name implies, springtails have a powerful tail, which they coil up and release to leap forward. When hunting, they latch onto prey and gnash at it with their powerful bite. Unlike many animals, springtails do not have individual teeth, but instead have serrated jawbones."
  },
  {
    id: "scifi_spy",
    name: "Spy",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Driving", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d8" }, { name: "Taunt", die: "d6" }, { name: "Thievery", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Varies with disguise, but usually a laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge) and molecular knife (Str+d4+2, AP 2)", "\u008f STALKER Little is known about the mysterious stalkers or their home world, but this starfaring species has little interest in colonization or empires", "Instead, individual stalkers leave their planet on short-term missions to locate, track, and kill the most ferocious beasts in the galaxy", "For stalkers, such conquests are more than just bragging rights: they have a complex honor code centered around hunting prey and claiming trophies", "Stalkers are consummate warriors", "They observe their prey to learn habits, leave deadly traps, and strike from the shadows", "They do not speak any known language"],
    description: "Spies work for governments or organizations as intelligence gatherers."
  },
  {
    id: "scifi_stalker",
    name: "Stalker",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: true,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 8,
    toughness: 13,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d10",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d4" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d10" }, { name: "Healing", die: "d6" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d6" }, { name: "Repair", die: "d6" }, { name: "Science", die: "d4" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the creature adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." },
      { name: "Stealth System", effect: "A light-bending device makes the stalker difficult to detect visually. It grants a free reroll on Stealth rolls, and those trying to attack or detect the stalker do so at a \u22124 penalty. The effect is triggered as a free action, but is negated any round in which the stalker fires a weapon or performs an active scan (see above)." }
    ],
    gear: ["Light battle armor (+4), molecular spear (Str+d6+2, AP 3, Parry +1 if used twohanded, Reach 1), flechette gun (Range 12/24/48, Damage 2d4+1, RoF 3), sniper rifle (Range 50/100/200, Damage 2d12, AP 4), 6\u00d7 fragmentation grenades (Range 5/10/20, Damage 3d6, MBT)"],
    description: "Little is known about the mysterious stalkers or their home world, but this starfaring species has little interest in colonization or empires. Instead, individual stalkers leave their planet on short-term missions to locate, track, and kill the most ferocious beasts in the galaxy. For stalkers, such conquests are more than just bragging rights: they have a complex honor code centered around hunting prey and claiming trophies. Stalkers are consummate warriors. They observe their prey to learn habits, leave deadly traps, and strike from the shadows. They do not speak any known language."
  },
  {
    id: "scifi_stannion",
    name: "Stannion",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 3,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 12,
    armor: 2,
    attributes: {
      agility: "d10",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Stealth", die: "d8" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Thick hide and fur." },
      { name: "Bite", effect: "Str+d10, AP 1." },
      { name: "Claws", effect: "Str+d6, AP 2." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Size 3", effect: "Stannions weigh over 800 pounds." }
    ],
    
    description: "Stannions are large, cat-like predators found on planets with large grasslands and plentiful game. They have occasionally been befriended and trained as loyal companions, and more commonly fitted with override collars (see page 36) by less compassionate individuals."
  },
  {
    id: "scifi_starship_crew",
    name: "Starship Crew",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Battle", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d8" }, { name: "Science", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, uniform, personal data device connected to the ship\u2019s systems"],
    description: "Highly advanced vehicles need experienced crews to operate them. Below are a typical set of officers and crewmen for Large, Huge, or Gargantuan starships. Starship crews don\u2019t generally wear armor or carry weapons unless they\u2019re expecting a boarding action or similar trouble. Even then most rely on contingents of on-board marines. Should crew members need to fight, weapons (usually laser pistols) and body armor are dispersed from the armory. Captains are the undisputed law of the ships they command. Most are competent and charismatic or they wouldn\u2019t be in charge of a multi-million-dollar vessel."
  },
  {
    id: "scifi_crew_member",
    name: "Crew Member",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Healing", die: "d4" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, uniform, personal data device connected to the ship\u2019s systems"],
    description: ""
  },
  {
    id: "scifi_engineer",
    name: "Engineer",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d10",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d8" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Repair", die: "d8" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, uniform, personal data device connected to the ship\u2019s systems, tool belt, large wrench (Str+d6, improvised weapon)"],
    description: "Engineers are in charge of maintaining a ship\u2019s engine, structural integrity, and other essential systems. Chief engineers are Wild Cards."
  },
  {
    id: "scifi_gunner",
    name: "Gunner",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d4" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Repair", die: "d4" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      
    ],
    gear: ["Commlink, uniform, personal data device connected to the ship\u2019s systems"],
    description: ""
  },
  {
    id: "scifi_medical_officer",
    name: "Medical Officer",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Healing", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d8" }, { name: "Research", die: "d6" }, { name: "Science", die: "d6" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }, { name: "Survival", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Commlink, uniform, personal data device connected to the ship\u2019s systems, medical kit, medi-scanner, 5\u00d7 medi-gel"],
    description: "The chief medical officer on a large ship is usually a Wild Card with the Healer Edge."
  },
  {
    id: "scifi_pilot_navigator",
    name: "Pilot/Navigator",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }],
    abilities: [
      
    ],
    gear: ["Commlink, uniform, personal data device connected to the ship\u2019s systems"],
    description: ""
  },
  {
    id: "scifi_stomper",
    name: "Stomper",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 4,
    scale: "Large",
    pace: 8,
    parry: 6,
    toughness: 13,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+3",
      vigor: "d10"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }],
    abilities: [
      { name: "Armor +2", effect: "Thick hide." },
      { name: "Size 4 (Large)", effect: "Stompers are nearly 20 feet tall with feet the size of large tree trunks." },
      { name: "Stomp", effect: "Strength+d10. Nonrigid armor (leather, spacesuits) offers no protection against the stomp." }
    ],
    
    description: "Stompers are bipedal carnivores with thick, elephant-like legs, no arms, a short neck, and a small mouth. Unable to bite prey effectively, they attack by stomping it to death and then chewing on the tenderized flesh. Stompers signal each other by stomping the ground."
  },
  {
    id: "scifi_stryder",
    name: "Stryder",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: 8,
    parry: 4,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d4." },
      { name: "Endurance", effect: "Stryders can maintain a full run for 30 minutes without difficulty. Each 10 minutes after this, they must make a Vigor roll or suffer Fatigue. One level of Fatigue is recovered for every 30 minutes of rest." },
      { name: "Size 1", effect: "Stryders stand 8\u2019 tall." }
    ],
    
    description: "Stryders are docile, two-legged, herbivorous lizards used as mounts by many species. They have no arms. Although they stand upright when walking or trotting, they lower their heads and extend their tails when running so that their head, back, and tail form a straight line."
  },
  {
    id: "scifi_throxian",
    name: "Throxian",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 15,
    scale: "Gargantuan",
    pace: 6,
    parry: 4,
    toughness: 29,
    armor: 6,
    attributes: {
      agility: "d4",
      smarts: "d4",
      spirit: "d4",
      strength: "d12+12",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Shooting", die: "d10" }],
    abilities: [
      { name: "Armor +6", effect: "Heavy Armor. Thick carapace." },
      { name: "Fearless", effect: "Bombards are immune to Fear and Intimidation." },
      { name: "Fireball", effect: "Bombards fire a white-hot ball of burning goo (Range 200/400/800, Damage 6d6" },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Hive Mind", effect: "Throxians can communicate with others of their kind within 5\" (10 yards)." },
      { name: "Night Vision", effect: "Bombards ignore all Illumination penalties." },
      { name: "Resilient", effect: "Bombards can take one additional Wound before they\u2019re Incapacitated." },
      { name: "Size 15 (Gargantuan)", effect: "Bombards tower 200 feet high and weigh over four thousand tons." },
      { name: "Stomp", effect: "Str+d10" },
      { name: "Tireless", effect: "Immune to Fatigue." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." }
    ],
    
    description: "The galaxy is filled with insect-like creatures, but none pose a threat like the intelligent insects of Throx 3. Quick, clever, aggressive, and bent on expanding their hold on space, the Throxians resent incursions by other species on star systems they\u2019ve claimed, meeting all perceived threats (warranted or not) with relentless hostility. Despite their comparable intellect, the Throxians have never developed tools. Instead they use careful selective breeding to alter the forms of other creatures native to their planet, then employ those abilities for space travel, defense, and any other needs. All Throxians are mentally connected through their hive mind, allowing them to freely communicate with any other Throxian within 5\" (10 yards), or many miles if within range of an enceph (see below). These titanic Throxians have a special gland that constantly creates a searing-hot chemical mix. Though naturally peaceful, when directed by an enceph or commanding soldier they can fire a huge, burning chemical ball from their snouts as artillery."
  },
  {
    id: "scifi_throxian_enceph",
    name: "Throxian Enceph",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 6,
    scale: "Large",
    pace: 2,
    parry: 2,
    toughness: 11,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d12",
      spirit: "d8",
      strength: "d8",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Battle", die: "d8" }, { name: "Common Knowledge", die: "d10" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d6" }, { name: "Psionics", die: "d8" }, { name: "Science", die: "d8" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Hive Mind Focus", effect: "An enceph\u2019s huge brain extends the Throxian Hive Mind capability, connecting all individuals within the enceph\u2019s Smarts in miles." },
      { name: "Size 6 (Large)", effect: "Encephs are as large as elephants and weigh around eight tons." },
      { name: "Slow", effect: "Encephs can only move by contracting their muscles, much like a slug. They move at Pace 2 and cannot run." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." }
    ],
    
    description: "While the average Throxian is intelligent, it\u2019s the encephs who make most of the plans and function as the psychic link for the entire hive. Bred specifically for their advanced intellect, encephs never molt into their adult form. Instead they appear as extremely large pupae, albeit with an immense brain visible beneath their translucent skin. The profile below is for an average enceph assigned to a forward exploration or assault squadron. Other, more powerful encephs exist on established Throxian worlds."
  },
  {
    id: "scifi_throxian_soldier",
    name: "Throxian Soldier",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 6,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d6." },
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Hive Mind", effect: "Throxians can communicate with others of their kind within 5\" (10 yards)." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Resilient", effect: "Can take one additional Wound." },
      { name: "Spike", effect: "Str+d8, AP 1. A hit with a raise Entangles the victim." },
      { name: "Tireless", effect: "Immune to Fatigue." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." },
      { name: "Wall Walker", effect: "Soldiers may cling to vertical and inverted surfaces and move at their standard Pace." }
    ],
    
    description: "Soldiers are bred to be perfect warriors\u2014 indefatigable, unafraid of danger, and utterly devoted to the protection of the hive. Each of their four articulated limbs ends in a wicked spike. One in twenty soldiers also has wings (Flight: Pace 10). Soldiers are immune to the effects of a vacuum and can operate in open space without protection."
  },
  {
    id: "scifi_throxian_worker_drone",
    name: "Throxian Worker Drone",
    subtitle: "Autonomous Machine / Construct",
    sourcebook: 'Sci-Fi Companion',
    classification: "Construct",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4",
      spirit: "d8",
      strength: "d10",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Bite", effect: "Str+d4." },
      { name: "Hive Mind", effect: "Throxians can communicate with others of their kind within 5\" (10 yards)." },
      { name: "Tireless", effect: "Immune to Fatigue." },
      { name: "Vacuum Born", effect: "The creature is naturally adapted for life in space. It does not breathe, ignores the effects of a vacuum, and is immune to cold damage." },
      { name: "Wall Walker", effect: "Worker drones may cling to vertical and inverted surfaces and move at their standard Pace." }
    ],
    
    description: "Throxian hives depend on the labor of their worker drones, who work tirelessly until they drop dead. Worker drones are immune to the effects of a vacuum and can operate in open space without protection."
  },
  {
    id: "scifi_thug",
    name: "Thug",
    subtitle: "Humanoid / NPC",
    sourcebook: 'Sci-Fi Companion',
    classification: "Humanoid & Folk",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 6,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d4",
      spirit: "d6",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d4" }, { name: "Persuasion", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      
    ],
    gear: ["Heavy club (Str+d6)", "Many might carry various types of firearms as well"],
    description: "Big, dumb, and strong, thugs are hired muscle. Most operate in gangs where they can rely on their fellows for support. They are usually reluctant to pursue a fight they are losing, and are most likely to withdraw, threatening to return at a later date and even the score."
  },
  {
    id: "scifi_titan_eel",
    name: "Titan Eel",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 12,
    scale: "Gargantuan",
    pace: "\u2014",
    parry: 7,
    toughness: 20,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4 (A)",
      spirit: "d6",
      strength: "d12+10",
      vigor: "d12"
    },
    skills: [{ name: "Athletics", die: "d10" }, { name: "Fighting", die: "d10" }, { name: "Intimidation", die: "d10" }, { name: "Notice", die: "d10" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Aquatic", effect: "Pace 10." },
      { name: "Bite", effect: "Str+d10" },
      { name: "Electric Shock", effect: "Some species of titan eel can discharge electricity. Once per encounter, this attack causes 5d6 damage to everything within 5\" (10 yards) of the creature. Only sealed Heavy Armor offers protection." },
      { name: "Size 12 (Gargantuan)", effect: "Titan eels can reach lengths of over 100\u2019 long and weigh hundreds of tons." }
    ],
    
    description: "A number of worlds are home to massive eel- like creatures with teeth the size of swords. Some species may also discharge stored electrical energy to stun nearby prey."
  },
  {
    id: "scifi_umbrella_beast",
    name: "Umbrella Beast",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 8,
    scale: "Huge",
    pace: 2,
    parry: 5,
    toughness: 13,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d6 (A)",
      spirit: "d8",
      strength: "d12+5",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d8" }],
    abilities: [
      { name: "Burrow", effect: "Umbrella beasts are not true burrowers, but conceal themselves beneath soft earth, leaving only their eyestalks just above the surface." },
      { name: "Digestion", effect: "Prey caught in an umbrella beast\u2019s fleshy folds are slowly dissolved. An Entangled or Bound victim suffers 2d6 damage at the start of each of his turns." },
      { name: "Size 8 (Huge)", effect: "Umbrella beasts measure 25\u2019 across." }
    ],
    
    description: "Large bony \u201carms\u201d connected by fleshy skin and tipped with multi-pronged horns rise from the body of this aptly named xeno. Umbrella beasts are opportunists, lying just beneath the surface of soft soil or sand and waiting for prey to walk across them. When attacking, the \u201carms\u201d burst through the light covering, enveloping the unsuspecting quarry in the fleshy folds. The horns are not used to attack, but interlock to prevent the prey from easily escaping. Trapped creatures are then subjected to powerful enzymes, which dissolves their flesh. The resultant goo flows down the skin flaps into the beast\u2019s waiting mouth."
  },
  {
    id: "scifi_uslen",
    name: "Uslen",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 4,
    parry: 4,
    toughness: 8,
    armor: 0,
    attributes: {
      agility: "d4",
      smarts: "d8",
      spirit: "d8",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d4" }, { name: "Common Knowledge", die: "d8" }, { name: "Fighting", die: "d4" }, { name: "Gambling", die: "d10" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d8" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d4" }, { name: "Taunt", die: "d8" }, { name: "Thievery", die: "d8" }],
    abilities: [
      { name: "Acid Biology", effect: "When an uslen suffers a Wound, everyone within a Small Blast Template must roll Evasion or suffer 2d6 damage. Suffering two Wounds increases the damage to 3d6, and three or more Wounds douse unfortunates with 4d6 damage. The species is immune to their own acid, but not other types." },
      { name: "Alien Form", effect: "The uslen have a size and shape incompatible with most equipment and vehicles available. Weapons and vehicles suffer a \u22121 penalty to operate and armor doesn\u2019t fit at all." },
      { name: "Reduced Pace", effect: "As they have no legs, uslen crawl along at Pace \u22121, and have a d4 running die." },
      { name: "Repugnant", effect: "Reactions (see Savage Worlds) are always either Unfriendly or rolled on 1d6 instead of 2d6 if determined randomly. A roll of 1 is treated as Hostile, plus the unfortunate becomes physically ill." },
      { name: "Size 2", effect: "An uslen can reach upward of 9\u2019 long and weigh over 1200 lbs." }
    ],
    
    description: "Repulsive to most other species, the uslen are huge, slug-like beings who hail from a swampy home world. Their ruthless social structure encourages deception and opportunism, but many also have exceptional skill at bargaining, making them natural-born business owners. Their size and body shape make them lackluster fighters. For this reason they tend to surround themselves with well- paid, loyal bodyguards and trained attack animals. The profile below is for a typical uslen crime boss."
  },
  {
    id: "scifi_voidling",
    name: "Voidling",
    subtitle: "Cosmic / Aberration",
    sourcebook: 'Sci-Fi Companion',
    classification: "Aberration",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 4,
    toughness: 7,
    armor: 2,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d4" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Stealth", die: "d8" }, { name: "Survival", die: "d6" }],
    abilities: [
      { name: "Bloodless", effect: "Voidlings automatically stabilize whenever they would Bleed Out." },
      { name: "Cannot Speak", effect: "Unless aided by devices, voidlings can understand other languages but may only communicate with members of their own culture." },
      { name: "Energy Form", effect: "Voidlings have no vital organs and ignore Called Shots, take no damage from falling, collisions, or physical weapons and projectiles (they take full damage from energy weapons, explosions, arcane attacks, etc.). Voidlings can\u2019t wear armor, use weapons, or manipulate matter unless they wear a containment suit." },
      { name: "Separation Disorder", effect: "Subtract 2 from Spirit rolls when there are no other voidlings present." },
      { name: "Spacer", effect: "Voidlings don\u2019t breathe and can survive in the vacuum of space." }
    ],
    gear: ["Containment suit (+2), lan - guage translator"],
    description: "The enigmatic voidlings evolved in the depths of space. They come in a variety of shapes and appearances, but the profile below is for a voidling with a roughly humanoid shape."
  },
  {
    id: "scifi_wire_rat",
    name: "Wire Rat",
    subtitle: "Alien Fauna / Beast",
    sourcebook: 'Sci-Fi Companion',
    classification: "Beast",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 3,
    armor: 0,
    attributes: {
      agility: "d10",
      smarts: "d8 (A)",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d10" }],
    abilities: [
      { name: "Bite", effect: "Str+d4." },
      { name: "Leaper", effect: "Double jumping distance." },
      { name: "Pounce", effect: "+4 damage instead of +2 when making a Wild Attack." },
      { name: "Size \u22122 (Small)", effect: "Wire rats are bigger than rats and much stockier." }
    ],
    
    description: "Wire rats are rodents that have developed a taste for electrical wiring. Once on board a vehicle or starship, they waste no time in chewing through any wiring they can find."
  },
  {
    id: "scifi_xerin",
    name: "Xerin",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 1,
    scale: "Normal",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d6",
      spirit: "d8",
      strength: "d6",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d8" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }],
    abilities: [
      { name: "Hardy", effect: "A second Shaken result in combat doesn\u2019t cause a Wound." },
      { name: "Immunity", effect: "Xerins aren't affected by poisons." },
      { name: "Size 1", effect: "Xerins are well over 6\u2019 tall, with long, sinewy limbs." }
    ],
    gear: ["Body armor (+2), knife (Str+d4), spear (Str+d6, Parry +1)"],
    description: "Xerins are sapient, relatively primitive humanoids from a planet called Xeris V. They have an innate distrust of technology, and where their tribes collide with more advanced societies they tend to be aggressive saboteurs."
  },
  {
    id: "scifi_xok_xok",
    name: "Xok-Xok",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 5,
    parry: 4,
    toughness: 4,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d6",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Common Knowledge", die: "d4" }, { name: "Driving", die: "d4" }, { name: "Electronics", die: "d8" }, { name: "Fighting", die: "d4" }, { name: "Hacking", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d6" }, { name: "Repair", die: "d8" }, { name: "Science", die: "d4" }, { name: "Shooting", die: "d4" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }, { name: "Thievery", die: "d6" }],
    abilities: [
      { name: "Low Light Vision", effect: "Ignore penalties for Dim and Dark Illumination." },
      { name: "Reduced Pace", effect: "Xok-xok have small legs. Pace \u22121, and d4 running die." },
      { name: "Size \u22121", effect: "Xok-xok stand three feet tall and weigh 100 pounds." }
    ],
    gear: ["Stun baton (Str+d4, Stun), laser rifle (Range 30/60/120, Damage 3d6, AP 2, RoF 3, Cauterize, No Recoil, Overcharge), EMP grenade (Range 5/10/20, Damage 4d6 nonlethal against electronic devices only)"],
    description: "The xok-xok are small humanoids from Druzkan II, a rocky world near the galactic core. This central location places their planet near many space lanes, but as it lacks any viable resources of its own, Druzkan II has become a convenient place to sell unwanted or nonfunctional bits of technology. Their natural talent for repairing tech has allowed the xok-xok to prosper in these conditions. A typical xok-xok has at least one functioning labor bot (see page 136) it rebuilt from scraps."
  },
  {
    id: "scifi_yeti",
    name: "Yeti",
    subtitle: "Apex Predator / Monstrosity",
    sourcebook: 'Sci-Fi Companion',
    classification: "Monstrosity",
    isWildCard: false,
    size: 2,
    scale: "Large",
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d4",
      spirit: "d6",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d8" }, { name: "Common Knowledge", die: "d4" }, { name: "Fighting", die: "d8" }, { name: "Notice", die: "d8" }, { name: "Persuasion", die: "d4" }, { name: "Stealth", die: "d6" }, { name: "Survival", die: "d8" }],
    abilities: [
      { name: "Big", effect: "Yetis subtract 2 from Trait rolls when using equipment that wasn\u2019t specifically designed for their form and cannot wear armor or clothing that wasn't made for them." },
      { name: "Environmental Resistance (Cold)", effect: "Yetis add +4 to resist the effects of cold, and reduce damage from cold- and ice-based attacks by 4." },
      { name: "Environmental Weakness (Heat)", effect: "Yetis subtract 4 from Fatigue checks made to resist the effects of heat, and take 4 additional points of damage from heatand fire-based attacks." },
      { name: "Size 2", effect: "Yetis are around seven feet tall, very broad, and very dense." }
    ],
    gear: ["None, though some may have a knife (Str+d4) or spear (Str+d6, Reach 1, Parry +1 if used two-handed)"],
    description: "The term \"yeti\" applies to any breed of fur- covered mammalian beings. Yetis almost always hail from cold worlds, are hairy, and are ferocious when threatened."
  },
  {
    id: "scifi_zombie",
    name: "Zombie",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 4,
    parry: 5,
    toughness: 8,
    armor: 1,
    attributes: {
      agility: "d6",
      smarts: "d6",
      spirit: "d4",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d6" }, { name: "Intimidation", die: "d8" }, { name: "Notice", die: "d6" }, { name: "Piloting", die: "d6" }, { name: "Shooting", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Claws", effect: "Str." },
      { name: "Fearless", effect: "Zombies are immune to Fear and Intimidation." },
      { name: "Undead", effect: "+2 Toughness; +2 to recover from being Shaken; no additional damage from Called Shots; ignores 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison." },
      { name: "Weakness (Head)", effect: "Called Shots to a zombie\u2019s head do the usual +4 damage." }
    ],
    gear: ["Spacesuit (+1), laser pistol (Range 15/30/60, Damage 2d6, AP 2, Cauterize, Overcharge)"],
    description: "Zombies don\u2019t have to be supernatural in origin. Even in a hard sci-fi campaign, they might be victims of a strange alien force that reanimates the dead, a virus, or they might even be inhabited by parasitic aliens that somehow tap into the corpse\u2019s neural system. For typical zombies, use the profile in Savage Worlds. These nightmares were once human astronauts who met a horrific end. Their decaying, desiccated, or vacuum-blacked bodies are still trapped in their spacesuits, and they gaze out through cracked visors with eerily sentient eyes."
  },
  {
    id: "scifi_parasite_zombie",
    name: "Parasite Zombie",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 8,
    parry: 6,
    toughness: 7,
    armor: 0,
    attributes: {
      agility: "d6",
      smarts: "d8",
      spirit: "d4",
      strength: "d6",
      vigor: "d6"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Intimidation", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Stealth", die: "d6" }],
    abilities: [
      { name: "Claws", effect: "Str." },
      { name: "Fearless", effect: "Zombies are immune to Fear and Intimidation." },
      { name: "Poor Senses", effect: "Parasite zombies are at \u22124 to detect motionless creatures or those using Stealth and moving no faster than Pace 1." },
      { name: "Undead", effect: "+2 Toughness; +2 to recover from being Shaken; no additional damage from Called Shots; ignores 1 point of Wound penalties; doesn\u2019t breathe; immune to disease and poison." },
      { name: "Weakness (Head)", effect: "Called Shots to a zombie\u2019s head do the usual +4 damage." }
    ],
    gear: ["None, though some may still be wearing spacesuits or armor"],
    description: "Arguably more horrific than supernatural undead, parasite zombies are created when a parasitic organism attaches itself to a human host. It then burrows into the host\u2019s brain, taking control of their actions. Whether the host is still living or not, it functions just like an undead zombie. In most cases, killing the parasite also results in the immediate death of the host. Parasites with this ability come in a wide variety of shapes and sizes, from microscopic viruses to large crab- or insect-shaped beasts which can move about in search of victims."
  },
  {
    id: "scifi_the_collective",
    name: "The Collective",
    subtitle: "Sci-Fi Adversary",
    sourcebook: 'Sci-Fi Companion',
    classification: "Alien",
    isWildCard: false,
    size: 0,
    scale: "Normal",
    pace: 6,
    parry: 6,
    toughness: 10,
    armor: 0,
    attributes: {
      agility: "d8",
      smarts: "d8",
      spirit: "d8",
      strength: "d8",
      vigor: "d8"
    },
    skills: [{ name: "Athletics", die: "d6" }, { name: "Battle", die: "d4" }, { name: "Common Knowledge", die: "d6" }, { name: "Electronics", die: "d6" }, { name: "Fighting", die: "d8" }, { name: "Hacking", die: "d6" }, { name: "Healing", die: "d6" }, { name: "Notice", die: "d6" }, { name: "Persuasion", die: "d4" }, { name: "Piloting", die: "d6" }, { name: "Repair", die: "d6" }, { name: "Science", die: "d8" }, { name: "Shooting", die: "d8" }, { name: "Stealth", die: "d4" }],
    abilities: [
      { name: "Construct", effect: "+2 to recover from being Shaken; ignores 1 point of Wound penalties; doesn\u2019t breathe or suffer from disease or poison." },
      { name: "Hive Mind", effect: "Can communicate with other assimilators within 5\" (10 yards)." },
      { name: "Inhuman", effect: "Assimilators are not subject to Strain or side effects from cyberware." },
      { name: "Sensors", effect: "Optical, chemical, motion, and other sensors ignore Illumination penalties. If it scans as an action, the assimilator adds a +2 bonus to Electronics or Notice rolls to detect targets within 500 yards." }
    ],
    gear: ["Personal force field (+4 Toughness), blaster rifle (Range 24/48/96, Damage 2d8+2, AP 2)", "Installed cyberware: Attribute increase (all attributes), enhanced hearing, enhanced vision, hardy, integrated gear, redundant organs, targeting system, threat analyzer"],
    description: "The assimilators known only as the collective hail from a distant quadrant of the galaxy. No one knows what they once looked like, only that they are a massive hive mind, growing their empire by seizing humanoids of any kind and \"assimilating\" them through a horrific process that breaks their individuality as it fuses them with technology. To find new vessels, assimilators send colony ships into the fringes of space claimed by other empires. When the collective takes heavy losses in a battle, they are particularly keen on capturing and assimilating the friends and loved ones of any heroes who distinguished themselves during that fight. Seeing a former ally who has been assimilated is sure to trigger a Fear check! All \"constituents\" are trained to perform any function needed by the collective, and are virtually indistinguishable from one another. This profile is for a constituent who was once human. AAppendix ppendix AA:: EEmpiresmpires"
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
  'Sci-Fi Companion': 'Complete official bestiary from the SWADE Science Fiction Companion, featuring alien flora, apex predators, war mechs, cyborgs, and cosmic entities.',
  'Horror Companion': 'Cosmic dread, elder terrors, gothic night-stalkers, and unrelenting undead.',
  'Super Powers Companion': 'Metahuman nemeses, mutagenic abominations, and four-color super-threats.'
};
