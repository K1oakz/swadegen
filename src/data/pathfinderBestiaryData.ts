import { CreatureStatBlock } from '../types/bestiary';

export const PATHFINDER_BESTIARY_CREATURES: CreatureStatBlock[] = [
  {
    id: 'pf_alligator_crocodile',
    name: 'Alligator / Crocodile',
    subtitle: 'Ambush Wetland Reptile',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 2,
    scale: 'Normal',
    pace: 5,
    parry: 5,
    toughness: 10,
    armor: 2,
    attributes: { agility: 'd6', smarts: 'd4 (A)', spirit: 'd6', strength: 'd10', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd8' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      { name: 'Armor +2', effect: 'Thick armored hide.' },
      { name: 'Aquatic', effect: 'Swim Pace 6.' },
      { name: 'Bite', effect: 'Str+d6 damage.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Rollover', effect: 'If hitting with a raise, bonus damage die is d10 instead of d6.' },
      { name: 'Size +2', effect: 'About 10 ft long and nearly 750 lbs.' }
    ],
    description: 'Lurks in freshwater wetlands and brackish swamps across Golarion, ambushing prey from beneath the waterline.',
    habitat: 'Wetlands, marshes, rivers, and coastal swamps.'
  },
  {
    id: 'pf_bear',
    name: 'Bear',
    subtitle: 'Ferocious Ursine Predator',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 2,
    scale: 'Normal',
    pace: 7,
    parry: 6,
    toughness: 11,
    armor: 2,
    attributes: { agility: 'd6', smarts: 'd4 (A)', spirit: 'd8', strength: 'd12', vigor: 'd10' },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd8' },
      { name: 'Stealth', die: 'd6' }
    ],
    abilities: [
      { name: 'Armor +2', effect: 'Thick hide.' },
      { name: 'Bite / Claws', effect: 'Str+d6 damage, AP 2.' },
      { name: 'Edges', effect: 'Brute.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Size +2', effect: 'Stands up to 8 ft tall and weighs over 1,000 lbs.' }
    ],
    description: 'Covers large grizzlies, black bears, and polar bears that grapple and maul threats with terrifying strength.',
    tactics: 'Grapples foes and follows up with crushing AP 2 bite attacks.',
    habitat: 'Temperate forests, highlands, and northern tundras.'
  },
  {
    id: 'pf_bird_of_prey',
    name: 'Bird of Prey',
    subtitle: 'Eagles, Hawks & Raptors',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: -2,
    scale: 'Small',
    pace: 3,
    parry: 5,
    toughness: 3,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd4 (A)', spirit: 'd6', strength: 'd4-2', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      { name: 'Bite / Claws', effect: 'Str+d4 damage.' },
      { name: 'Flight', effect: 'Fly at Pace 24.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Size -2 (Small)', effect: 'About 3 ft tall with a 5 ft+ wingspan.' }
    ],
    description: 'Sharp-eyed raptors whose talons and hooked beaks serve wild ecosystems and humanoid falconers alike.',
    habitat: 'Cliffs, forests, and open skies across Golarion.'
  },
  {
    id: 'pf_boar',
    name: 'Boar',
    subtitle: 'Stubborn Wild Tusker',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 7,
    parry: 5,
    toughness: 7,
    armor: 1,
    attributes: { agility: 'd6', smarts: 'd4 (A)', spirit: 'd8', strength: 'd10', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd6' }
    ],
    abilities: [
      { name: 'Armor +1', effect: 'Thick hide.' },
      { name: 'Hardy', effect: 'A second Shaken result does not cause a Wound.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Tusks', effect: 'Str+d4 damage (counts as horns).' }
    ],
    description: 'Aggressive omnivores kept as warbeasts or guard animals by humanoids and dangerous during rutting season.',
    habitat: 'Woodlands, thickets, and borderlands.'
  },
  {
    id: 'pf_cat_large',
    name: 'Cat, Large',
    subtitle: 'Snow Leopard, Cougar & Cheetah',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 8,
    parry: 5,
    toughness: 6,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd6 (A)', spirit: 'd8', strength: 'd8', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd6' },
      { name: 'Stealth', die: 'd8' },
      { name: 'Survival', die: 'd6' }
    ],
    abilities: [
      { name: 'Bite / Claw', effect: 'Str+d6 damage.' },
      { name: 'Edges', effect: 'Frenzy.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Pounce', effect: 'Adds +4 damage instead of +2 on a Wild Attack.' }
    ],
    description: 'Agile big cats such as mountain lions, leopards, and snow leopards (including Lini’s companion Droogami).',
    habitat: 'Mountains, jungles, forests, and savannas.'
  },
  {
    id: 'pf_cat_small',
    name: 'Cat, Small',
    subtitle: 'House Cat / Familiar',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: -3,
    scale: 'Tiny',
    pace: 6,
    parry: 2,
    toughness: 2,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd4 (A)', spirit: 'd8', strength: 'd4-3', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Notice', die: 'd6' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      { name: 'Bite / Claws', effect: 'Str damage.' },
      { name: 'Edges', effect: 'Acrobat.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Size -3 (Very Small)', effect: 'Typically less than a foot high.' }
    ],
    description: 'Ordinary house cats often kept as spellcaster familiars, animal companions, or shape change forms.',
    habitat: 'Towns, towers, and countryside.'
  },
  {
    id: 'pf_dog_wolf',
    name: 'Dog / Wolf',
    subtitle: 'Pack Canine / Attack Hound',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: -1,
    scale: 'Normal',
    pace: 8,
    parry: 5,
    toughness: 4,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd6 (A)', spirit: 'd6', strength: 'd6', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      { name: 'Bite', effect: 'Str+d4 damage.' },
      { name: 'Edges', effect: 'Alertness.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Size -1', effect: 'Shoulder height at human waist; ~60 lbs.' },
      { name: 'Speed', effect: 'd10 running die.' }
    ],
    description: 'Covers large attack dogs, wolves, hyenas, and other fast pack hunters.',
    habitat: 'Forests, plains, settlements, and camps.'
  },
  {
    id: 'pf_horse_light',
    name: 'Horse, Light',
    subtitle: 'Swift Riding Steed',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 2,
    scale: 'Normal',
    pace: 12,
    parry: 4,
    toughness: 8,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd4 (A)', spirit: 'd6', strength: 'd12', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd4' },
      { name: 'Notice', die: 'd6' }
    ],
    abilities: [
      { name: 'Edges', effect: 'Fleet-Footed.' },
      { name: 'Kick', effect: 'Str+d4 damage to front or rear.' },
      { name: 'Size +2', effect: 'Quarter horse of ~1,000 lbs (Pony version is Size 1, Str d10; combat-trained Fighting d6).' }
    ],
    description: 'Riding horses balancing speed and carrying capacity across Golarion’s roads.',
    habitat: 'Plains, stables, and roads.'
  },
  {
    id: 'pf_horse_heavy',
    name: 'Horse, Heavy',
    subtitle: 'Warhorse & Draft Steed',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 3,
    scale: 'Normal',
    pace: 10,
    parry: 4,
    toughness: 10,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd4 (A)', spirit: 'd6', strength: 'd12+1', vigor: 'd10' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd4' },
      { name: 'Notice', die: 'd6' }
    ],
    abilities: [
      { name: 'Kick', effect: 'Str+d4 damage to front or rear.' },
      { name: 'Size +3', effect: 'Draft or heavy warhorse of 1,000–1,500 lbs (combat-trained Fighting d6; Pony version Size 2, Str d10, Vig d8).' }
    ],
    description: 'Heavy draft steeds and armored knight chargers bred for labor or war.',
    habitat: 'Farms, keeps, and war camps.'
  },
  {
    id: 'pf_lion',
    name: 'Lion',
    subtitle: 'Apex Savanna Hunter',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 1,
    scale: 'Normal',
    pace: 8,
    parry: 6,
    toughness: 7,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd6 (A)', spirit: 'd10', strength: 'd12', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd10' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd8' },
      { name: 'Stealth', die: 'd10' }
    ],
    abilities: [
      { name: 'Bite / Claws', effect: 'Str+d6 damage, AP 2.' },
      { name: 'Edges', effect: 'Improved Frenzy.' },
      { name: 'Low Light Vision', effect: 'Ignore penalties for Dim and Dark Illumination.' },
      { name: 'Pounce', effect: '+4 damage instead of +2 on a Wild Attack.' },
      { name: 'Size +1', effect: 'Typical males weigh about 400 lbs.' }
    ],
    description: 'Fierce pride-hunting predators that dominate open grasslands and savannas.',
    habitat: 'Open grasslands and savannas.'
  },
  {
    id: 'pf_mule',
    name: 'Mule',
    subtitle: 'Stubborn Pack Beast',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 2,
    scale: 'Normal',
    pace: 6,
    parry: 2,
    toughness: 8,
    armor: 0,
    attributes: { agility: 'd4', smarts: 'd4 (A)', spirit: 'd6', strength: 'd8', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd4' },
      { name: 'Notice', die: 'd4' }
    ],
    abilities: [
      { name: 'Kick', effect: 'Str damage.' },
      { name: 'Ornery', effect: 'Riders subtract 1 from Riding rolls.' },
      { name: 'Size +2', effect: 'Stocky pack animal under 1,000 lbs.' }
    ],
    description: 'Sure-footed crossbreeds used to haul heavy expedition gear and pull supply carts.',
    habitat: 'Roads, mining trails, and trading posts.'
  },
  {
    id: 'pf_shark',
    name: 'Shark',
    subtitle: 'Oceanic Apex Predator',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 1,
    scale: 'Normal',
    pace: 'Swim 10',
    parry: 6,
    toughness: 8,
    armor: 1,
    attributes: { agility: 'd8', smarts: 'd4 (A)', spirit: 'd6', strength: 'd8', vigor: 'd8' },
    skills: [
      { name: 'Athletics', die: 'd8' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Notice', die: 'd12' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      { name: 'Armor +1', effect: 'Rubbery hide.' },
      { name: 'Aquatic', effect: 'Swim Pace 10.' },
      { name: 'Bite', effect: 'Str+d6 damage, AP 2 (bull sharks have Strength d10).' },
      { name: 'Size +1', effect: 'Weighs up to 500 lbs.' }
    ],
    description: 'Deadly marine predators such as bull sharks and white tips patrolling Golarion’s seas.',
    habitat: 'Inner Sea and oceanic waters.'
  },
  {
    id: 'pf_skeleton_human',
    name: 'Skeleton, Human',
    subtitle: 'Animated Undead Warrior',
    sourcebook: 'Savage Pathfinder',
    classification: 'Undead',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 6,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd4', spirit: 'd4', strength: 'd6', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd4' },
      { name: 'Shooting', die: 'd6' }
    ],
    abilities: [
      { name: 'Claws', effect: 'Str+d4 damage.' },
      { name: 'Fearless', effect: 'Immune to Fear and Intimidation.' },
      { name: 'Undead', effect: '+2 Toughness, +2 to recover from Shaken, ignore Called Shots, ignore 1 Wound penalty, immune to disease/poison, ignore Illumination up to 10".' }
    ],
    gear: ['Varies by grave or creator'],
    description: 'Mindless animated bones stripped of flesh, obeying necromancers or guarding ancient crypts.',
    habitat: 'Crypts, necromancer lairs, and haunted ruins.'
  },
  {
    id: 'pf_snake_constrictor',
    name: 'Snake, Constrictor',
    subtitle: 'Giant Crushing Serpent',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 4,
    parry: 5,
    toughness: 5,
    armor: 0,
    attributes: { agility: 'd6', smarts: 'd4 (A)', spirit: 'd8', strength: 'd8', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Notice', die: 'd10' },
      { name: 'Stealth', die: 'd6' }
    ],
    abilities: [
      { name: 'Bite', effect: 'Str damage.' },
      { name: 'Constrict', effect: '+2 to Athletics and Strength rolls made to grapple.' }
    ],
    description: 'Pythons and boa constrictors over 15 ft long serving as guardians, familiars, or jungle hunters.',
    habitat: 'Jungles, swamps, and temple vaults.'
  },
  {
    id: 'pf_snake_venomous',
    name: 'Snake, Venomous',
    subtitle: 'Deadly Viper',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: -3,
    scale: 'Tiny',
    pace: 4,
    parry: 6,
    toughness: 2,
    armor: 0,
    attributes: { agility: 'd8', smarts: 'd4 (A)', spirit: 'd6', strength: 'd4-2', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd6' },
      { name: 'Fighting', die: 'd8' },
      { name: 'Notice', die: 'd12' },
      { name: 'Stealth', die: 'd8' }
    ],
    abilities: [
      { name: 'Bite', effect: 'Str+2 damage.' },
      { name: 'Edges', effect: 'Quick.' },
      { name: 'Poison', effect: 'Injects deadly venom on hit (GM picks poison type).' },
      { name: 'Size -3 (Very Small)', effect: '4–6 ft long, only a few inches thick.' }
    ],
    description: 'Medium-sized venomous snakes whose sudden strikes deliver lethal toxins.',
    habitat: 'Deserts, jungles, ruins, and undergrowth.'
  },
  {
    id: 'pf_swarm',
    name: 'Swarm',
    subtitle: 'Ants, Wasps or Filthy Rats',
    sourcebook: 'Savage Pathfinder',
    classification: 'Beast',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 10,
    parry: 4,
    toughness: 7,
    armor: 0,
    attributes: { agility: 'd10', smarts: 'd4 (A)', spirit: 'd12', strength: 'd8', vigor: 'd10' },
    skills: [{ name: 'Notice', die: 'd6' }],
    abilities: [
      { name: 'Bite or Sting', effect: 'Hits automatically (unless Shaken) for 2d4 damage to everyone in template at end of turn (least armored location).' },
      { name: 'Split', effect: 'May split into two smaller swarms when Wounded (Small swarms are destroyed).' },
      { name: 'Swarm', effect: '+2 to recover from Shaken, Parry +2; immune to cutting/piercing weapons; area effects and stomping (Str dmg) work normally.' }
    ],
    description: 'A churning mass of biting or stinging vermin covering a Small, Medium, or Large Blast Template.',
    habitat: 'Sewers, ruins, caves, and wilderness.'
  },
  {
    id: 'pf_town_city_guard',
    name: 'Town / City Guard',
    subtitle: 'Armed Peacekeeper',
    sourcebook: 'Savage Pathfinder',
    classification: 'Humanoid & Folk',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 6,
    parry: 6,
    toughness: 7,
    armor: 2,
    attributes: { agility: 'd6', smarts: 'd6', spirit: 'd6', strength: 'd6', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd4' },
      { name: 'Common Knowledge', die: 'd4' },
      { name: 'Fighting', die: 'd4' },
      { name: 'Intimidation', die: 'd4' },
      { name: 'Notice', die: 'd6' },
      { name: 'Persuasion', die: 'd6' },
      { name: 'Shooting', die: 'd4' },
      { name: 'Stealth', die: 'd4' }
    ],
    abilities: [
      { name: 'Edges', effect: 'Soldier.' },
      { name: 'Shield Parry', effect: 'Base Parry 4, or 6 with Medium Shield.' }
    ],
    gear: ['Short Sword (Str+d6)', 'Light Crossbow (Range 10/20/40, 2d6, AP 2)', 'Leather Armor (+2)', 'Medium Shield (Parry +2, Cover -2)'],
    description: 'Trained city watch and town guards tasked with keeping order across Golarion’s settlements.',
    habitat: 'Cities, towns, and fortified outposts.'
  },
  {
    id: 'pf_townsfolk',
    name: 'Townsfolk',
    subtitle: 'Farmers, Merchants & Artisans',
    sourcebook: 'Savage Pathfinder',
    classification: 'Humanoid & Folk',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 6,
    parry: 4,
    toughness: 5,
    armor: 0,
    attributes: { agility: 'd6', smarts: 'd6', spirit: 'd6', strength: 'd6', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd4' },
      { name: 'Common Knowledge', die: 'd4' },
      { name: 'Fighting', die: 'd4' },
      { name: 'Notice', die: 'd6' },
      { name: 'Persuasion', die: 'd4' },
      { name: 'Stealth', die: 'd6' }
    ],
    abilities: [
      { name: 'Varied Trade', effect: 'Artisans often have Repair d6, stable hands Riding d4, etc.' }
    ],
    gear: ['Knife (Str+d4)', 'Club or improvised weapon (Str+d4)'],
    description: 'Everyday citizens of the Inner Sea region—farmers, merchants, and craftspeople.',
    habitat: 'Villages, towns, and cities.'
  },
  {
    id: 'pf_zombie_human',
    name: 'Zombie, Human',
    subtitle: 'Shambling Undead Horror',
    sourcebook: 'Savage Pathfinder',
    classification: 'Undead',
    isWildCard: false,
    size: 0,
    scale: 'Normal',
    pace: 4,
    parry: 5,
    toughness: 7,
    armor: 0,
    attributes: { agility: 'd6', smarts: 'd4', spirit: 'd4', strength: 'd6', vigor: 'd6' },
    skills: [
      { name: 'Athletics', die: 'd4' },
      { name: 'Fighting', die: 'd6' },
      { name: 'Intimidation', die: 'd6' },
      { name: 'Notice', die: 'd4' },
      { name: 'Shooting', die: 'd6' }
    ],
    abilities: [
      { name: 'Bite / Claws', effect: 'Str+d4 damage.' },
      { name: 'Fearless', effect: 'Immune to Fear and Intimidation.' },
      { name: 'Undead', effect: '+2 Toughness, +2 to recover from Shaken, ignore Called Shots, ignore 1 Wound penalty, immune to disease/poison, ignore Illumination up to 10".' },
      { name: 'Weakness (Head)', effect: 'Called Shots to the head deal the usual +4 damage.' }
    ],
    description: 'Reanimated humanoid corpses driven by necromantic magic or foul plagues.',
    habitat: 'Graveyards, crypts, battlefields, and Geb.'
  }
];
