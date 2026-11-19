export interface RobotFrameDef {
  size: number;
  name: string;
  baseSlots: number;
  weight: string;
  cost: number;
  description: string;
}

export interface RobotModDef {
  id: string;
  name: string;
  category: 'negative' | 'core' | 'defensive' | 'locomotion' | 'offensive';
  slots: number; // positive = consumes slots, negative = grants slots back
  maxAllowed: number; // 0 or 99 = unlimited
  cost: number; // in dollars (positive or negative)
  summary: string;
  effect: string;
  armorBonus?: number;
  toughnessBonus?: number;
  paceBonus?: number;
}

export const SWADE_ROBOT_FRAMES: RobotFrameDef[] = [
  {
    size: -4,
    name: 'Tiny Chassis (Size -4)',
    baseSlots: 1,
    weight: '1 lb',
    cost: 10000,
    description: 'Micro-droid or palm-sized reconnaissance crawler. Extremely small and hard to hit.'
  },
  {
    size: -3,
    name: 'Very Small Chassis (Size -3)',
    baseSlots: 2,
    weight: '10 lbs',
    cost: 5000,
    description: 'Cat-sized maintenance spider, hover-probe, or courier drone.'
  },
  {
    size: -2,
    name: 'Small Chassis (Size -2)',
    baseSlots: 3,
    weight: '60 lbs',
    cost: 2500,
    description: 'Compact utility robot, medical assistant, or canine-form scout droid.'
  },
  {
    size: -1,
    name: 'Compact Humanoid (Size -1)',
    baseSlots: 3,
    weight: '125 lbs',
    cost: 5000,
    description: 'Stands 3–4 feet tall (like an astromech or short maintenance biped).'
  },
  {
    size: 0,
    name: 'Standard Humanoid (Size 0)',
    baseSlots: 3,
    weight: '250 lbs',
    cost: 10000,
    description: 'Standard adult human-sized android, protocol companion, or synthetic laborer.'
  },
  {
    size: 1,
    name: 'Large Biped Chassis (Size +1)',
    baseSlots: 3,
    weight: '500 lbs',
    cost: 15000,
    description: 'Heavy industrial loader, security enforcer, or reinforced front-line combat unit.'
  },
  {
    size: 2,
    name: 'Huge / Quad Chassis (Size +2)',
    baseSlots: 6,
    weight: '1,000 lbs',
    cost: 20000,
    description: 'Massive quadruped or heavy combat chassis. Provides 6 base Mod slots.'
  },
  {
    size: 3,
    name: 'Massive Walker Chassis (Size +3)',
    baseSlots: 9,
    weight: '1,500 lbs',
    cost: 25000,
    description: 'Super-heavy military combat walker or heavy mining rig with 9 base Mod slots.'
  }
];

export const SWADE_ROBOTIC_MODS: RobotModDef[] = [
  // --- NEGATIVE QUALITIES (Grants extra slots & reduces chassis cost) ---
  {
    id: 'battered',
    name: 'Battered Frame',
    category: 'negative',
    slots: -2,
    maxAllowed: 2,
    cost: -5000,
    summary: 'The robot has seen better days. Reduce base Toughness by 2 (minimum 2).',
    effect: '-2 Toughness, +2 Mod Slots',
    toughnessBonus: -2
  },
  {
    id: 'env_weakness',
    name: 'Environmental Weakness',
    category: 'negative',
    slots: -1,
    maxAllowed: 2,
    cost: -5000,
    summary: 'Susceptible to a specific hazard (water, electricity, ion radiation). Takes +4 damage and -4 to resist.',
    effect: '+4 hazard damage, +1 Mod Slot'
  },
  {
    id: 'finicky',
    name: 'Finicky Mechanisms',
    category: 'negative',
    slots: -2,
    maxAllowed: 2,
    cost: -5000,
    summary: 'Difficult to work on. Repair rolls to fix this robot suffer a -2 penalty (-4 if taken twice).',
    effect: '-2 Repair rolls, +2 Mod Slots'
  },
  {
    id: 'immobile',
    name: 'Immobile Installation',
    category: 'negative',
    slots: -4,
    maxAllowed: 1,
    cost: -10000,
    summary: 'Installed in place in a room or starship bulkhead; cannot choose locomotion or move.',
    effect: 'Cannot move, +4 Mod Slots'
  },
  {
    id: 'inefficient',
    name: 'Inefficient Power Core',
    category: 'negative',
    slots: -2,
    maxAllowed: 1,
    cost: -5000,
    summary: 'Power supply is insufficient; must recharge from an external grid 1 hour out of every 24 or suffer Fatigue.',
    effect: 'Must recharge daily, +2 Mod Slots'
  },
  {
    id: 'nonverbal',
    name: 'Nonverbal Vocalizer',
    category: 'negative',
    slots: -2,
    maxAllowed: 1,
    cost: -5000,
    summary: 'Lacks vocal synthesis and must communicate exclusively via display screens or binary chimes.',
    effect: 'Cannot speak aloud, +2 Mod Slots'
  },
  {
    id: 'pacifist_circuits',
    name: 'Pacifist (Asimov Circuits)',
    category: 'negative',
    slots: -1,
    maxAllowed: 1,
    cost: -5000,
    summary: 'Hardwired Isaac Asimov Three Laws programming prevents harming any sentient living being.',
    effect: 'Pacifist (Major), +1 Mod Slot'
  },
  {
    id: 'reduced_pace',
    name: 'Reduced Pace Servos',
    category: 'negative',
    slots: -2,
    maxAllowed: 2,
    cost: -5000,
    summary: 'Slower locomotion servos. Reduce base Pace by 1 each time taken.',
    effect: '-1 Pace, +2 Mod Slots',
    paceBonus: -1
  },

  // --- CORE SYSTEMS ---
  {
    id: 'additional_action',
    name: 'Additional Action Processor',
    category: 'core',
    slots: 3,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Augmented processing speeds and micro-articulation allow ignoring 2 points of Multi-Action penalties each round.',
    effect: 'Ignore 2 Multi-Action penalties'
  },
  {
    id: 'attribute_boost',
    name: 'Hydraulic / Core Attribute Boost',
    category: 'core',
    slots: 1,
    maxAllowed: 5,
    cost: 5000,
    summary: 'Increases an attribute one die type (max d12 + Size).',
    effect: '+1 Attribute Step'
  },
  {
    id: 'command_suite',
    name: 'Command Tactical Suite',
    category: 'core',
    slots: 1,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Secure HUD comms link to all allies, monitoring biometrics and extending Command Range across radio contact.',
    effect: 'Squad biolink HUD & Command Range extension'
  },
  {
    id: 'comms',
    name: 'Long-Range Radio Transceiver',
    category: 'core',
    slots: 0,
    maxAllowed: 1,
    cost: 5000,
    summary: 'Military-grade communications suite connecting to other receivers up to 20 miles distant.',
    effect: '20-mile comms range (0 slots)'
  },
  {
    id: 'data_jack',
    name: 'Direct Data Jack Probe',
    category: 'core',
    slots: 1,
    maxAllowed: 1,
    cost: 5000,
    summary: 'Retractable cable or rod for high-speed hardware interface; grants a free reroll on failed Electronics/Hacking rolls.',
    effect: 'Free reroll on Electronics & Hacking'
  },
  {
    id: 'robot_edge',
    name: 'Integrated Subroutine (Edge)',
    category: 'core',
    slots: 1,
    maxAllowed: 5,
    cost: 5000,
    summary: 'The robot gains an extra Edge (must meet Rank and Trait requirements).',
    effect: '+1 Edge'
  },
  {
    id: 'enhanced_hearing',
    name: 'Enhanced Audio Sensors',
    category: 'core',
    slots: 0,
    maxAllowed: 1,
    cost: 5000,
    summary: 'High-powered parabolic microphones hear whispers up to 100 yards (+2 to hearing Notice checks).',
    effect: '+2 hearing Notice (0 slots)'
  },
  {
    id: 'entangled_comms',
    name: 'Entangled Quantum Comms',
    category: 'core',
    slots: 1,
    maxAllowed: 1,
    cost: 50000,
    summary: 'Quantum-entangled pair communicating anywhere across the universe instantly without lag, jamming, or interception.',
    effect: 'Unlimited range unjammable comms'
  },
  {
    id: 'enhanced_vision',
    name: 'Optic Suite (50x Zoom & Night Optics)',
    category: 'core',
    slots: 0,
    maxAllowed: 1,
    cost: 10000,
    summary: '50x magnification and light-enhancing sensors negate up to 4 points of Illumination penalties and grant +2 visual Notice.',
    effect: 'Ignore 4 Illumination, +2 visual Notice'
  },
  {
    id: 'fearless',
    name: 'Fearless Routine',
    category: 'core',
    slots: 0,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Emotionless cold logic algorithms make the robot completely immune to Fear and Intimidation.',
    effect: 'Immune to Fear & Intimidation (0 slots)'
  },
  {
    id: 'reach',
    name: 'Telescopic Limb Reach',
    category: 'core',
    slots: 1,
    maxAllowed: 3,
    cost: 5000,
    summary: 'Extends the robot\'s limbs by +1" (2 yards) of Reach per installation.',
    effect: '+1 Reach per level'
  },
  {
    id: 'scanner',
    name: 'Composition & Material Scanner',
    category: 'core',
    slots: 1,
    maxAllowed: 1,
    cost: 1000,
    summary: 'Spectrometric analyzer scans physical and energetic composition of matter up to 50 yards away.',
    effect: 'Matter & energy scan within 50 yards'
  },
  {
    id: 'sensor_array',
    name: 'Deep Space Sensor Array',
    category: 'core',
    slots: 2,
    maxAllowed: 1,
    cost: 20000,
    summary: 'Extendable dish scans radiation, heat, gravity, and RF waves up to 1 light year away in space or a full hemisphere.',
    effect: 'Long-range space/orbital sensor scan'
  },
  {
    id: 'skill_bonus',
    name: 'Dedicated Co-Processor (Skill Bonus)',
    category: 'core',
    slots: 1,
    maxAllowed: 4,
    cost: 5000,
    summary: 'Dedicated hardware co-processor adds a +1 bonus to a chosen skill.',
    effect: '+1 to a chosen skill'
  },
  {
    id: 'vehicle_interface',
    name: 'Vehicle Fly-by-Wire Interface',
    category: 'core',
    slots: 1,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Direct hardware connection allows driving, piloting, or gunning a vehicle with the speed of thought (+1 maneuvering).',
    effect: 'Direct vehicle neural/hardware link'
  },

  // --- DEFENSIVE SYSTEMS ---
  {
    id: 'armor_plating',
    name: 'Reinforced Composite Armor Plating',
    category: 'defensive',
    slots: 1,
    maxAllowed: 4,
    cost: 5000,
    summary: 'Adds +2 Armor per installation (up to +8 max).',
    effect: '+2 Armor per level (Max +8)',
    armorBonus: 2
  },
  {
    id: 'heavy_armor',
    name: 'Heavy Armor Upgrade',
    category: 'defensive',
    slots: 1,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Upgrades existing armor plating to Heavy Armor (can only be harmed by Heavy Weapons). Requires at least +4 Armor.',
    effect: 'Upgrades Armor to Heavy Armor'
  },
  {
    id: 'force_shields',
    name: 'Personal Deflector Force Field',
    category: 'defensive',
    slots: 2,
    maxAllowed: 1,
    cost: 50000,
    summary: 'Generates an energy barrier that absorbs incoming damage, negating Wounds before armor is penetrated.',
    effect: 'Absorptive energy shield'
  },
  {
    id: 'stealth_system',
    name: 'Radar-Absorbent Chameleon Stealth',
    category: 'defensive',
    slots: 2,
    maxAllowed: 1,
    cost: 50000,
    summary: 'Radar-absorbent skin, heat baffles, and optical bending give +2 Stealth and -4 to sensor lock-on.',
    effect: '+2 Stealth, -4 to lock on, -2 to hit'
  },
  {
    id: 'reinforced_toughness',
    name: 'Reinforced Internal Skeletal Chassis',
    category: 'defensive',
    slots: 1,
    maxAllowed: 3,
    cost: 5000,
    summary: 'Hardened internal skeleton adds +1 to base Toughness each time taken.',
    effect: '+1 Toughness per level',
    toughnessBonus: 1
  },

  // --- LOCOMOTION SYSTEMS ---
  {
    id: 'wheeled',
    name: 'Wheeled Locomotion Base',
    category: 'locomotion',
    slots: 0,
    maxAllowed: 1,
    cost: 0,
    summary: 'Forgoes legs for small omni-wheels that increase base Pace by +2 on smooth terrain.',
    effect: '+2 Pace on smooth terrain (0 slots)',
    paceBonus: 2
  },
  {
    id: 'wheeled_high_speed',
    name: 'High-Speed Wheels (40 MPH)',
    category: 'locomotion',
    slots: 2,
    maxAllowed: 1,
    cost: 15000,
    summary: 'Heavy-duty high-speed wheel assemblies providing Speed Rating 5 (40 MPH).',
    effect: '40 MPH high-speed driving mode'
  },
  {
    id: 'tracked',
    name: 'Heavy All-Terrain Tracks',
    category: 'locomotion',
    slots: 3,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Continuous caterpillar tracks. Ignores Difficult Ground penalties, base Pace 12 (cannot run).',
    effect: 'Pace 12, ignores Difficult Ground',
    paceBonus: 6
  },
  {
    id: 'flight_vtol',
    name: 'VTOL Turbofan / Thruster Flight',
    category: 'locomotion',
    slots: 2,
    maxAllowed: 3,
    cost: 10000,
    summary: 'Provides VTOL flight at Pace 6 (Top Speed 60 MPH at level 2, 200 MPH at level 3).',
    effect: 'VTOL flight capabilities'
  },
  {
    id: 'jump_pack',
    name: 'Hydraulic Jump Jets',
    category: 'locomotion',
    slots: 1,
    maxAllowed: 1,
    cost: 10000,
    summary: 'Jumps 8" (16 yds) horizontally or 4" vertically; adds +2 damage on Wild Attacks coupled with a leap.',
    effect: 'Leap 8" horizontal, +2 Wild Attack damage'
  },
  {
    id: 'magnetic_pads',
    name: 'Magnetic Wall Pads',
    category: 'locomotion',
    slots: 1,
    maxAllowed: 1,
    cost: 5000,
    summary: 'Powerful electromagnets allow climbing or standing on ferrous metal hulls and bulkheads at half Pace.',
    effect: 'Walk on metal walls/ceilings'
  },
  {
    id: 'wall_walker',
    name: 'Micro-Spike Wall Walker',
    category: 'locomotion',
    slots: 1,
    maxAllowed: 1,
    cost: 5000,
    summary: 'Articulated micro-spikes and gecko adhesive let the robot climb vertical non-metal walls at half Pace.',
    effect: 'Climb walls at half Pace'
  },
  {
    id: 'pressure_jets',
    name: 'Submersible Pressure Jets',
    category: 'locomotion',
    slots: 1,
    maxAllowed: 2,
    cost: 5000,
    summary: 'Hydro-turbines propel the robot in water at normal Pace down to 500 ft (3,000 ft at level 2).',
    effect: 'Underwater propulsion & deep depth immunity'
  },
  {
    id: 'increased_pace',
    name: 'Overclocked Leg Servos',
    category: 'locomotion',
    slots: 1,
    maxAllowed: 3,
    cost: 5000,
    summary: 'High-torque servomotors increase Pace by +2 and raise the running die one die step.',
    effect: '+2 Pace, +1 running die step',
    paceBonus: 2
  },

  // --- OFFENSIVE SYSTEMS ---
  {
    id: 'anti_personnel',
    name: 'Anti-Personnel Perimeter Mine',
    category: 'offensive',
    slots: 1,
    maxAllowed: 1,
    cost: 5000,
    summary: 'Detonates an external microcharge shell dealing 4d6 damage in a Large Blast Template (robot takes 2d6).',
    effect: '4d6 LBT self-defense blast'
  },
  {
    id: 'claws_pincers',
    name: 'Hydraulic Pincers / Claws',
    category: 'offensive',
    slots: 1,
    maxAllowed: 2,
    cost: 5000,
    summary: 'Hardened steel claws deal Str+d4 damage (or Str+d6, AP 2 at level 2).',
    effect: 'Str+d4 (Str+d6 AP 2) natural melee attack'
  },
  {
    id: 'extra_appendages',
    name: 'Additional Manipulator Limbs',
    category: 'offensive',
    slots: 1,
    maxAllowed: 3,
    cost: 5000,
    summary: 'Extra set of arms and hands to hold tools or weapons; grants +1 Gang Up bonus against a single foe.',
    effect: 'Extra arms/hands, +1 Gang Up bonus'
  },
  {
    id: 'heavy_weapon_brace',
    name: 'Ground-Anchor Heavy Weapon Brace',
    category: 'offensive',
    slots: 1,
    maxAllowed: 1,
    cost: 50000,
    summary: 'Deployable ground bolts brace the chassis; counts as Size +5 when firing vehicle-scale or heavy ordnance.',
    effect: 'Counts as Size +5 for heavy weapon kickback'
  },
  {
    id: 'integrated_weapon',
    name: 'Concealed Integrated Weapon Mount',
    category: 'offensive',
    slots: 1,
    maxAllowed: 4,
    cost: 5000,
    summary: 'Conceals up to 10 lbs of weapon/gear directly inside chassis; cannot be disarmed and extends as a free action.',
    effect: 'Concealed internal weapon, cannot be disarmed'
  },
  {
    id: 'weapon_stabilizer',
    name: 'Gyro Weapon Stabilizer',
    category: 'offensive',
    slots: 1,
    maxAllowed: 1,
    cost: 5000,
    summary: 'High-speed gyros negate the Unstable Platform, Recoil, and Running penalties for attached direct-fire weapons.',
    effect: 'Ignores Recoil, Unstable Platform & Running penalties'
  },
  {
    id: 'targeting_system',
    name: 'Optical Fire-Control Targeting HUD',
    category: 'offensive',
    slots: 1,
    maxAllowed: 1,
    cost: 25000,
    summary: 'Integrated ballistic tracking system negates up to 2 points of Called Shot, Cover, Range, or Speed penalties.',
    effect: 'Negates 2 points of Shooting penalties'
  }
];

export interface StockRobotPreset {
  id: string;
  name: string;
  icon: string;
  size: number;
  description: string;
  mods: { modId: string; count: number }[];
}

export const STOCK_ROBOT_PRESETS: StockRobotPreset[] = [
  {
    id: 'diplomat_bot',
    name: 'Diplomat Bot',
    icon: 'Protocol',
    size: 0,
    description: 'Humanoid protocol and translation unit equipped with comms and etiquette databases.',
    mods: [
      { modId: 'pacifist_circuits', count: 1 },
      { modId: 'comms', count: 1 },
      { modId: 'skill_bonus', count: 1 }
    ]
  },
  {
    id: 'engineer_bot',
    name: 'Astromech Engineer Bot',
    icon: 'Repair',
    size: -1,
    description: 'Compact 3-foot repair droid with wheels, data jack, and cutting tools.',
    mods: [
      { modId: 'pacifist_circuits', count: 1 },
      { modId: 'wheeled', count: 1 },
      { modId: 'data_jack', count: 1 },
      { modId: 'claws_pincers', count: 1 }
    ]
  },
  {
    id: 'labor_bot',
    name: 'Heavy Industrial Labor Bot',
    icon: 'Industrial',
    size: 1,
    description: 'Reinforced bipedal chassis designed for around-the-clock heavy loading.',
    mods: [
      { modId: 'pacifist_circuits', count: 1 },
      { modId: 'reinforced_toughness', count: 1 },
      { modId: 'armor_plating', count: 1 }
    ]
  },
  {
    id: 'medical_bot',
    name: 'Med-Bay Assistant Bot',
    icon: 'Medical',
    size: 0,
    description: 'Sterile surgical companion with wheeled base, scanner, and medical toolkit.',
    mods: [
      { modId: 'pacifist_circuits', count: 1 },
      { modId: 'wheeled', count: 1 },
      { modId: 'scanner', count: 1 }
    ]
  },
  {
    id: 'security_bot',
    name: 'Combat Security Sentry',
    icon: 'Security',
    size: 1,
    description: 'Armored patrol chassis with targeting computer, armor plating, and gyro stabilizer.',
    mods: [
      { modId: 'armor_plating', count: 2 },
      { modId: 'targeting_system', count: 1 },
      { modId: 'weapon_stabilizer', count: 1 }
    ]
  }
];
