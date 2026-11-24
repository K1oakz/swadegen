import { CraftFrameDef, CraftModDef, CraftWeaponDef, SciFiCraft, SciFiCraftType } from '../types/scifiCraft';

// ============================================================================
// SCI-FI COMPANION FRAMES
// ============================================================================

export const CRAFT_FRAMES: CraftFrameDef[] = [
  // --- VEHICLES (GROUND, WATER, AIR) ---
  {
    id: 'veh_hoverbike',
    craftType: 'vehicle',
    categoryName: 'Vehicle (Ground / Hover)',
    name: 'Scout Hoverbike',
    size: -1,
    sizeCategory: 'Very Small',
    handling: 2,
    topSpeed: 120,
    baseToughness: 6,
    baseArmor: 2,
    maxArmor: 4,
    wounds: 2,
    crew: 1,
    passengers: 1,
    energy: 2,
    modSlots: 4,
    cost: 15000,
    notes: 'Agile repulsor-lift bike designed for rapid scouting and couriers.',
    locomotion: 'Hover / Grav'
  },
  {
    id: 'veh_rover_buggy',
    craftType: 'vehicle',
    categoryName: 'Vehicle (Ground / Wheeled)',
    name: 'All-Terrain Recon Buggy',
    size: 1,
    sizeCategory: 'Small',
    handling: 1,
    topSpeed: 100,
    baseToughness: 9,
    baseArmor: 4,
    maxArmor: 8,
    wounds: 3,
    crew: 1,
    passengers: 3,
    energy: 4,
    modSlots: 6,
    cost: 35000,
    notes: 'Rugged wheeled exploration vehicle with high clearance and roll cage.',
    locomotion: 'Wheeled'
  },
  {
    id: 'veh_armored_apc',
    craftType: 'vehicle',
    categoryName: 'Vehicle (Ground / Tracked)',
    name: 'Ironclad APC',
    size: 3,
    sizeCategory: 'Normal',
    handling: 0,
    topSpeed: 70,
    baseToughness: 14,
    baseArmor: 8,
    maxArmor: 14,
    wounds: 3,
    crew: 2,
    passengers: 8,
    energy: 6,
    modSlots: 10,
    cost: 120000,
    isHeavyArmor: true,
    notes: 'Heavily armored personnel carrier with sealed CBRN life support and smoke launchers.',
    locomotion: 'Tracked'
  },
  {
    id: 'veh_hovertank',
    craftType: 'vehicle',
    categoryName: 'Vehicle (Hovertank)',
    name: 'Predator Heavy Hovertank',
    size: 4,
    sizeCategory: 'Large',
    handling: -1,
    topSpeed: 85,
    baseToughness: 18,
    baseArmor: 12,
    maxArmor: 20,
    wounds: 4,
    crew: 3,
    passengers: 2,
    energy: 10,
    modSlots: 14,
    cost: 450000,
    isHeavyArmor: true,
    notes: 'Main battle hovertank with composite armor and heavy energy cannon.',
    locomotion: 'Hover / Grav'
  },
  {
    id: 'veh_vtol_gunship',
    craftType: 'vehicle',
    categoryName: 'Vehicle (Atmospheric VTOL)',
    name: 'Valkyrie VTOL Gunship',
    size: 3,
    sizeCategory: 'Normal',
    handling: 1,
    topSpeed: 250,
    baseToughness: 13,
    baseArmor: 6,
    maxArmor: 12,
    wounds: 3,
    crew: 2,
    passengers: 6,
    energy: 8,
    modSlots: 10,
    cost: 320000,
    notes: 'Twin tilt-rotor atmospheric combat craft with chin turret and rocket pods.',
    locomotion: 'VTOL / Rotor'
  },

  // --- WALKERS (MECHS) ---
  {
    id: 'wlk_scout_stalker',
    craftType: 'walker',
    categoryName: 'Walker (Light Scout Mech)',
    name: 'Stalker Light Scout Walker',
    size: 2,
    sizeCategory: 'Small',
    defaultPace: 10,
    runningDie: 8,
    handling: 1,
    topSpeed: 45,
    baseToughness: 11,
    baseArmor: 4,
    maxArmor: 8,
    wounds: 3,
    crew: 1,
    passengers: 0,
    energy: 5,
    modSlots: 8,
    cost: 180000,
    notes: 'Fast bipedal scout walker capable of navigating steep cliffs and dense jungles.',
    locomotion: 'Bipedal Walker'
  },
  {
    id: 'wlk_combat_marauder',
    craftType: 'walker',
    categoryName: 'Walker (Combat Mech)',
    name: 'Marauder Combat Walker',
    size: 4,
    sizeCategory: 'Normal',
    defaultPace: 8,
    runningDie: 6,
    handling: 0,
    topSpeed: 35,
    baseToughness: 16,
    baseArmor: 8,
    maxArmor: 14,
    wounds: 4,
    crew: 1,
    passengers: 1,
    energy: 8,
    modSlots: 12,
    cost: 420000,
    isHeavyArmor: true,
    notes: 'Mainline combat walker with 360-degree torso twist, jump jets, and arm weapon hardpoints.',
    locomotion: 'Bipedal Walker'
  },
  {
    id: 'wlk_heavy_behemoth',
    craftType: 'walker',
    categoryName: 'Walker (Heavy Assault Mech)',
    name: 'Behemoth Assault Walker',
    size: 6,
    sizeCategory: 'Large',
    defaultPace: 6,
    runningDie: 6,
    handling: -1,
    topSpeed: 25,
    baseToughness: 22,
    baseArmor: 12,
    maxArmor: 20,
    wounds: 4,
    crew: 2,
    passengers: 2,
    energy: 12,
    modSlots: 18,
    cost: 850000,
    isHeavyArmor: true,
    notes: 'Heavy siege walker featuring reinforced leg struts, stomp attack (Str+d10), and heavy artillery mounting.',
    locomotion: 'Bipedal Walker'
  },
  {
    id: 'wlk_colossus_quad',
    craftType: 'walker',
    categoryName: 'Walker (Colossal Quad Titan)',
    name: 'Titan Siege Quad Walker',
    size: 8,
    sizeCategory: 'Huge',
    defaultPace: 5,
    runningDie: 4,
    handling: -2,
    topSpeed: 20,
    baseToughness: 28,
    baseArmor: 16,
    maxArmor: 26,
    wounds: 5,
    crew: 4,
    passengers: 8,
    energy: 18,
    modSlots: 26,
    cost: 2200000,
    isHeavyArmor: true,
    notes: 'Four-legged colossal walking bastion with dual shield generators and planetary defense cannons.',
    locomotion: 'Quadruped Walker'
  },

  // --- POWER ARMOR (BATTLESUITS & EXOSUITS) ---
  {
    id: 'pa_scout_exosuit',
    craftType: 'power_armor',
    categoryName: 'Power Armor (Scout Exosuit)',
    name: 'Ghost Infiltrator Exosuit',
    size: 0,
    sizeCategory: 'Human (Size +0)',
    defaultPace: 8,
    runningDie: 8,
    handling: 1,
    topSpeed: 20,
    baseToughness: 8,
    baseArmor: 4,
    maxArmor: 6,
    wounds: 3,
    crew: 1,
    passengers: 0,
    energy: 4,
    modSlots: 6,
    cost: 45000,
    strengthBonusSteps: 1,
    minStrength: 'd8',
    notes: 'Lightweight powered harness providing +1 Strength die step, +2 Pace, and optical camouflage coating.',
    locomotion: 'Powered Exosuit'
  },
  {
    id: 'pa_combat_trooper',
    craftType: 'power_armor',
    categoryName: 'Power Armor (Standard Combat)',
    name: 'Aegis Mk IV Combat Power Armor',
    size: 1,
    sizeCategory: 'Infantry (Size +1)',
    defaultPace: 8,
    runningDie: 8,
    handling: 0,
    topSpeed: 18,
    baseToughness: 11,
    baseArmor: 8,
    maxArmor: 10,
    wounds: 3,
    crew: 1,
    passengers: 0,
    energy: 6,
    modSlots: 10,
    cost: 110000,
    strengthBonusSteps: 2,
    minStrength: 'd10',
    notes: 'Standard infantry battlesuit with sealed 8-hour life support, +2 Strength steps, and helmet HUD.',
    locomotion: 'Powered Exosuit'
  },
  {
    id: 'pa_heavy_goliath',
    craftType: 'power_armor',
    categoryName: 'Power Armor (Heavy Assault Battlesuit)',
    name: 'Goliath Heavy Assault Battlesuit',
    size: 2,
    sizeCategory: 'Heavy (Size +2)',
    defaultPace: 6,
    runningDie: 6,
    handling: -1,
    topSpeed: 15,
    baseToughness: 15,
    baseArmor: 12,
    maxArmor: 16,
    wounds: 4,
    crew: 1,
    passengers: 0,
    energy: 10,
    modSlots: 14,
    cost: 260000,
    strengthBonusSteps: 3,
    minStrength: 'd12+1',
    isHeavyArmor: true,
    notes: 'Armored juggernaut suit with heavy composite plating, magnetic boot clamps, and dual shoulder hardpoints.',
    locomotion: 'Powered Exosuit'
  },
  {
    id: 'pa_dreadnought_titan',
    craftType: 'power_armor',
    categoryName: 'Power Armor (Dreadnought Exoskeleton)',
    name: 'Juggernaut Dreadnought Battlesuit',
    size: 2,
    sizeCategory: 'Dreadnought (Size +2)',
    defaultPace: 5,
    runningDie: 6,
    handling: -1,
    topSpeed: 12,
    baseToughness: 18,
    baseArmor: 14,
    maxArmor: 18,
    wounds: 4,
    crew: 1,
    passengers: 0,
    energy: 14,
    modSlots: 18,
    cost: 520000,
    strengthBonusSteps: 4,
    minStrength: 'd12+3',
    isHeavyArmor: true,
    notes: 'Extreme assault powered shell. Grants +4 Strength die steps, personal deflector shields, and heavy weapon mounts.',
    locomotion: 'Powered Exosuit'
  },

  // --- STARSHIPS ---
  {
    id: 'ship_corvette',
    craftType: 'starship',
    categoryName: 'Starship (Corvette / Shuttle)',
    name: 'Light Star Corvette',
    size: 4,
    sizeCategory: 'Large',
    handling: 0,
    topSpeed: 600,
    baseToughness: 15,
    baseArmor: 8,
    maxArmor: 20,
    wounds: 4,
    crew: 2,
    passengers: 6,
    energy: 12,
    modSlots: 12,
    cost: 650000,
    isHeavyArmor: true,
    notes: 'Sub-light and hyperdrive-capable light system shuttle and patrol vessel.',
    locomotion: 'Spaceflight'
  }
];

// ============================================================================
// SCI-FI COMPANION MODIFICATIONS
// ============================================================================

export const CRAFT_MODIFICATIONS: CraftModDef[] = [
  // Armor & Defense
  {
    id: 'mod_extra_armor_light',
    name: 'Reinforced Armor Plating',
    applicableTypes: ['vehicle', 'walker', 'power_armor', 'starship'],
    category: 'armor',
    modSlots: 1,
    cost: 15000,
    armorBonus: 2,
    toughnessBonus: 2,
    summary: '+2 Armor & Toughness',
    effect: 'Bolts layer of ballistic/ablative ceramic plates to outer chassis.'
  },
  {
    id: 'mod_extra_armor_heavy',
    name: 'Heavy Composite Armor Plating',
    applicableTypes: ['vehicle', 'walker', 'power_armor', 'starship'],
    category: 'armor',
    modSlots: 2,
    cost: 35000,
    armorBonus: 4,
    toughnessBonus: 4,
    isHeavyArmor: true,
    summary: '+4 Armor & Heavy Armor',
    effect: 'Converts vehicle or suit armor to Heavy Armor (immune to non-Heavy Weapons).'
  },
  {
    id: 'mod_deflector_shields',
    name: 'Deflector Shield Generator',
    applicableTypes: ['vehicle', 'walker', 'power_armor', 'starship'],
    category: 'defense',
    modSlots: 2,
    cost: 50000,
    shieldsBonus: 10,
    summary: '+10 Energy Shield HP',
    effect: 'Energy barrier that absorbs incoming kinetic and energy damage before hull breaches.'
  },
  {
    id: 'mod_reactive_plating',
    name: 'Reactive Explosive Armor',
    applicableTypes: ['vehicle', 'walker', 'power_armor'],
    category: 'defense',
    modSlots: 1,
    cost: 20000,
    summary: 'Negates AP against explosive/shaped charges',
    effect: 'Detonates outward to disrupt HEAT missiles and shaped charges, reducing AP to 0.'
  },

  // Mobility & Locomotion
  {
    id: 'mod_jump_jets',
    name: 'Vectored Jump Jets / Thrusters',
    applicableTypes: ['walker', 'power_armor', 'vehicle'],
    category: 'propulsion',
    modSlots: 2,
    cost: 30000,
    summary: 'Enables 12" vertical or horizontal jump',
    effect: 'Allows leaping over terrain, onto buildings, and avoiding falling damage.'
  },
  {
    id: 'mod_turbo_thrusters',
    name: 'Afterburners / Overclocked Engine',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    category: 'propulsion',
    modSlots: 1,
    cost: 25000,
    speedBonus: 25,
    handlingBonus: -1,
    summary: '+25 MPH Top Speed (-1 Handling)',
    effect: 'Injects high-octane hyper-fuel for blistering straight-line speed.'
  },
  {
    id: 'mod_amphibious',
    name: 'Amphibious Sealed Drive',
    applicableTypes: ['vehicle', 'walker'],
    category: 'propulsion',
    modSlots: 1,
    cost: 15000,
    summary: 'Operate on lakes, rivers, and coastal water',
    effect: 'Seals intake vents and adds water jet propellers (Half land Pace on water).'
  },
  {
    id: 'mod_leg_servos',
    name: 'High-Torque Myomer Leg Servos',
    applicableTypes: ['walker', 'power_armor'],
    category: 'propulsion',
    modSlots: 1,
    cost: 22000,
    paceBonus: 2,
    summary: '+2 Pace and +1 Stomp / Kick Damage',
    effect: 'Reinforced leg hydro-servos increase tactical sprint speed.'
  },

  // Sensors, HUD & Stealth
  {
    id: 'mod_chameleon_skin',
    name: 'Optical Camouflage / Chameleon Skin',
    applicableTypes: ['power_armor', 'walker', 'vehicle'],
    category: 'sensor',
    modSlots: 2,
    cost: 40000,
    summary: '+2 to Stealth rolls; -2 to be targeted at range',
    effect: 'Adaptive light-bending metamaterials blend the chassis into ambient background.'
  },
  {
    id: 'mod_tactical_hud',
    name: 'Tactical Targeting HUD & Sensor Suite',
    applicableTypes: ['power_armor', 'walker', 'vehicle'],
    category: 'sensor',
    modSlots: 1,
    cost: 18000,
    summary: '+1 to Shooting rolls; ignores Darkness & Smoke',
    effect: 'Thermal, infrared, and radar imaging projected directly into pilot reticle.'
  },
  {
    id: 'mod_ecm_suite',
    name: 'ECM / Chaff & Flare Countermeasures',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    category: 'defense',
    modSlots: 1,
    cost: 20000,
    summary: '-2 to missile locks and smart weapon attacks',
    effect: 'Scrambles incoming radio guidance and releases thermal flares.'
  },

  // Utility & Life Support
  {
    id: 'mod_life_support_cbrn',
    name: 'Environmental Sealing & CBRN Filter',
    applicableTypes: ['vehicle', 'walker', 'power_armor'],
    category: 'utility',
    modSlots: 1,
    cost: 12000,
    summary: 'Immune to vacuum, underwater, and toxic gases',
    effect: 'Internal oxygen scrubber provides 24 hours of sealed breathing air.'
  },
  {
    id: 'mod_auto_repair',
    name: 'Nanite Self-Repair Module',
    applicableTypes: ['vehicle', 'walker', 'power_armor', 'starship'],
    category: 'utility',
    modSlots: 2,
    cost: 65000,
    summary: 'Heals 1 Wound every hour outside combat',
    effect: 'Automated micro-fabricators mend structural tears and re-seal armor breach points.'
  },
  {
    id: 'mod_medical_injector',
    name: 'Trauma Med-Auto-Injector',
    applicableTypes: ['power_armor'],
    category: 'utility',
    modSlots: 1,
    cost: 10000,
    summary: 'Automatically stabilizes pilot & grants +2 vs Bleeding Out',
    effect: 'Detects internal hemorrhaging and injects coagulant foam and stimulants.'
  },
  {
    id: 'mod_cargo_rack',
    name: 'Expanded Utility Pods / Cargo Racks',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    category: 'utility',
    modSlots: 1,
    cost: 5000,
    summary: '+500 lbs cargo capacity',
    effect: 'Hardened external stowage bins and rack mounts.'
  }
];

// ============================================================================
// SCI-FI COMPANION WEAPONS CATALOG
// ============================================================================

export const CRAFT_WEAPONS: CraftWeaponDef[] = [
  // Vehicle & Walker Heavy Weapons
  {
    id: 'wpn_heavy_laser',
    name: 'Heavy Pulse Laser Cannon',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    range: '50/100/200',
    damage: '4d10',
    ap: 10,
    rof: 1,
    modSlots: 2,
    cost: 45000,
    isHeavyWeapon: true,
    notes: 'Coherent energy beam; Heavy Weapon, Cauterize.'
  },
  {
    id: 'wpn_autocannon_25mm',
    name: '25mm Rotary Autocannon',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    range: '50/100/200',
    damage: '3d8',
    ap: 4,
    rof: 3,
    modSlots: 2,
    cost: 32000,
    isHeavyWeapon: true,
    notes: 'Rapid fire kinetic slug thrower; Heavy Weapon.'
  },
  {
    id: 'wpn_railgun',
    name: 'Hyper-Velocity Railgun',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    range: '75/150/300',
    damage: '4d12',
    ap: 20,
    rof: 1,
    modSlots: 3,
    cost: 85000,
    isHeavyWeapon: true,
    notes: 'Electromagnetic solid tungsten penetrator; Heavy Weapon.'
  },
  {
    id: 'wpn_missile_pod_at',
    name: 'Anti-Tank Missile Pod (x4)',
    applicableTypes: ['vehicle', 'walker', 'starship'],
    range: '100/200/400',
    damage: '5d6',
    ap: 18,
    rof: 1,
    modSlots: 2,
    cost: 40000,
    isHeavyWeapon: true,
    notes: 'Wire/laser-guided shaped charge; Medium Blast Template, Heavy Weapon.'
  },
  {
    id: 'wpn_micro_rocket_swarm',
    name: 'Micro-Rocket Swarm Pod',
    applicableTypes: ['walker', 'power_armor', 'vehicle'],
    range: '24/48/96',
    damage: '3d6',
    ap: 6,
    rof: 2,
    modSlots: 1,
    cost: 22000,
    isHeavyWeapon: false,
    notes: 'Cluster of miniature self-guiding rockets; Small Blast Template.'
  },
  {
    id: 'wpn_plasma_cannon',
    name: 'Heavy Plasma Projector',
    applicableTypes: ['vehicle', 'walker'],
    range: '30/60/120',
    damage: '4d8+2',
    ap: 8,
    rof: 1,
    modSlots: 2,
    cost: 50000,
    isHeavyWeapon: true,
    notes: 'Superheated ionized gas; Small Blast Template, Heavy Weapon.'
  },

  // Power Armor Sized & Integrated Weapons
  {
    id: 'wpn_heavy_plasma_rifle',
    name: 'Battlesuit Plasma Repeater',
    applicableTypes: ['power_armor', 'walker'],
    range: '24/48/96',
    damage: '3d8',
    ap: 4,
    rof: 2,
    modSlots: 1,
    cost: 16000,
    isHeavyWeapon: false,
    notes: 'Direct arm-mounted plasma carbine with power feed.'
  },
  {
    id: 'wpn_flamethrower_heavy',
    name: 'Inferno Heavy Flamethrower',
    applicableTypes: ['power_armor', 'vehicle', 'walker'],
    range: 'Cone Template',
    damage: '3d6',
    ap: 0,
    rof: 1,
    modSlots: 1,
    cost: 8000,
    isHeavyWeapon: false,
    notes: 'Cone Template; targets may catch fire (d6 damage/round).'
  },
  {
    id: 'wpn_power_claw',
    name: 'Hydraulic Power Claw / Fist',
    applicableTypes: ['walker', 'power_armor'],
    range: 'Melee',
    damage: 'Str+d10',
    ap: 8,
    rof: 1,
    modSlots: 1,
    cost: 14000,
    isHeavyWeapon: true,
    notes: 'Melee weapon; crushing hydraulic grip that can rend tank armor.'
  },
  {
    id: 'wpn_vibro_blade_arm',
    name: 'High-Frequency Vibro-Blade',
    applicableTypes: ['power_armor', 'walker'],
    range: 'Melee',
    damage: 'Str+d8',
    ap: 6,
    rof: 1,
    modSlots: 1,
    cost: 9000,
    isHeavyWeapon: false,
    notes: 'Retractable forearm blade vibrating at ultrasonic frequencies.'
  }
];

// ============================================================================
// PRE-MADE STOCK CRAFT
// ============================================================================

export const STOCK_SCIFI_CRAFT: SciFiCraft[] = [
  // 1. Vehicles
  {
    id: 'craft_stock_hoverbike',
    name: 'Shadow Viper Hoverbike',
    craftType: 'vehicle',
    classification: 'Scout Repulsor-Lift Bike',
    frameDefId: 'veh_hoverbike',
    registry: 'SV-901',
    size: -1,
    sizeCategory: 'Very Small',
    locomotion: 'Hover / Grav',
    pace: 24,
    runningDie: 8,
    handling: 2,
    topSpeed: 120,
    toughnessBase: 6,
    armor: 2,
    toughnessTotal: 8,
    isHeavyArmor: false,
    wounds: 0,
    maxWounds: 2,
    shields: 0,
    maxShields: 0,
    crew: 1,
    passengers: 0,
    energy: 2,
    maxEnergy: 2,
    cargo: 'Saddlebags (30 lbs)',
    installedMods: [
      {
        id: 'inst_mod_hud',
        modDefId: 'mod_tactical_hud',
        name: 'Tactical Targeting HUD',
        category: 'sensor',
        slots: 1,
        cost: 18000,
        count: 1
      }
    ],
    weapons: [
      {
        id: 'inst_wpn_las_bike',
        weaponDefId: 'wpn_heavy_plasma_rifle',
        name: 'Twin Blaster Carbines',
        mount: 'Fixed Front',
        range: '24/48/96',
        damage: '3d8',
        ap: 4,
        rof: 2,
        modSlots: 1,
        cost: 16000,
        isHeavyWeapon: false,
        notes: 'Fixed forward twin mount'
      }
    ],
    notes: 'High-speed scouting and courier hoverbike with terrain radar.',
    updatedAt: Date.now()
  },
  {
    id: 'craft_stock_apc',
    name: 'Bulwark Armored Combat Carrier',
    craftType: 'vehicle',
    classification: 'Heavy Tracked APC',
    frameDefId: 'veh_armored_apc',
    registry: 'BAC-44',
    size: 3,
    sizeCategory: 'Normal',
    locomotion: 'Tracked',
    pace: 14,
    runningDie: 6,
    handling: 0,
    topSpeed: 70,
    toughnessBase: 14,
    armor: 12,
    toughnessTotal: 26,
    isHeavyArmor: true,
    wounds: 0,
    maxWounds: 3,
    shields: 0,
    maxShields: 0,
    crew: 2,
    passengers: 8,
    energy: 6,
    maxEnergy: 6,
    cargo: 'Troop gear & supplies (1,500 lbs)',
    installedMods: [
      {
        id: 'inst_mod_armor',
        modDefId: 'mod_extra_armor_heavy',
        name: 'Heavy Composite Armor Plating',
        category: 'armor',
        slots: 2,
        cost: 35000,
        count: 1,
        armorBonus: 4,
        toughnessBonus: 4
      },
      {
        id: 'inst_mod_cbrn',
        modDefId: 'mod_life_support_cbrn',
        name: 'Environmental Sealing & CBRN Filter',
        category: 'utility',
        slots: 1,
        cost: 12000,
        count: 1
      }
    ],
    weapons: [
      {
        id: 'inst_wpn_apc_auto',
        weaponDefId: 'wpn_autocannon_25mm',
        name: '25mm Rotary Autocannon',
        mount: 'Turret (360°)',
        range: '50/100/200',
        damage: '3d8',
        ap: 4,
        rof: 3,
        modSlots: 2,
        cost: 32000,
        isHeavyWeapon: true,
        notes: 'Roof turret with 360° firing arc'
      }
    ],
    notes: 'Squad transport capable of surviving heavy anti-vehicle fire.',
    updatedAt: Date.now()
  },

  // 2. Walkers
  {
    id: 'craft_stock_marauder',
    name: 'Marauder Mk II Bipedal Mech',
    craftType: 'walker',
    classification: 'Combat Mech',
    frameDefId: 'wlk_combat_marauder',
    registry: 'MK2-08',
    size: 4,
    sizeCategory: 'Normal',
    locomotion: 'Bipedal Walker',
    pace: 8,
    runningDie: 6,
    handling: 0,
    topSpeed: 35,
    toughnessBase: 16,
    armor: 10,
    toughnessTotal: 26,
    isHeavyArmor: true,
    wounds: 0,
    maxWounds: 4,
    shields: 10,
    maxShields: 10,
    crew: 1,
    passengers: 0,
    energy: 8,
    maxEnergy: 8,
    cargo: 'Cockpit storage (100 lbs)',
    hasJumpJets: true,
    installedMods: [
      {
        id: 'inst_mod_jets',
        modDefId: 'mod_jump_jets',
        name: 'Vectored Jump Jets',
        category: 'propulsion',
        slots: 2,
        cost: 30000,
        count: 1
      },
      {
        id: 'inst_mod_shield',
        modDefId: 'mod_deflector_shields',
        name: 'Deflector Shield Generator',
        category: 'defense',
        slots: 2,
        cost: 50000,
        count: 1,
        shieldsBonus: 10
      }
    ],
    weapons: [
      {
        id: 'inst_wpn_mech_laser',
        weaponDefId: 'wpn_heavy_laser',
        name: 'Heavy Pulse Laser Cannon',
        mount: 'Right Arm / Wing',
        range: '50/100/200',
        damage: '4d10',
        ap: 10,
        rof: 1,
        modSlots: 2,
        cost: 45000,
        isHeavyWeapon: true,
        notes: 'Mounted on right weapon actuator'
      },
      {
        id: 'inst_wpn_mech_claw',
        weaponDefId: 'wpn_power_claw',
        name: 'Hydraulic Power Claw',
        mount: 'Left Arm / Wing',
        range: 'Melee',
        damage: 'Str+d10',
        ap: 8,
        rof: 1,
        modSlots: 1,
        cost: 14000,
        isHeavyWeapon: true,
        notes: 'Crushing hydraulic claw'
      }
    ],
    notes: 'Versatile bipedal war mech with jump capability and lethal arm hardpoints.',
    updatedAt: Date.now()
  },

  // 3. Power Armor
  {
    id: 'craft_stock_aegis',
    name: 'Aegis Sentinel Battlesuit',
    craftType: 'power_armor',
    classification: 'Combat Power Armor',
    frameDefId: 'pa_combat_trooper',
    registry: 'PA-770',
    size: 1,
    sizeCategory: 'Infantry (Size +1)',
    locomotion: 'Powered Exosuit',
    pace: 8,
    runningDie: 8,
    handling: 0,
    topSpeed: 18,
    toughnessBase: 11,
    armor: 10,
    toughnessTotal: 21,
    isHeavyArmor: false,
    wounds: 0,
    maxWounds: 3,
    shields: 0,
    maxShields: 0,
    crew: 1,
    passengers: 0,
    energy: 6,
    maxEnergy: 6,
    cargo: 'Belt pouches (40 lbs)',
    strengthBonusSteps: 2,
    minStrength: 'd10',
    installedMods: [
      {
        id: 'inst_mod_hud_pa',
        modDefId: 'mod_tactical_hud',
        name: 'Tactical Targeting HUD',
        category: 'sensor',
        slots: 1,
        cost: 18000,
        count: 1
      },
      {
        id: 'inst_mod_armor_pa',
        modDefId: 'mod_extra_armor_light',
        name: 'Reinforced Armor Plating',
        category: 'armor',
        slots: 1,
        cost: 15000,
        count: 1,
        armorBonus: 2,
        toughnessBonus: 2
      },
      {
        id: 'inst_mod_injector',
        modDefId: 'mod_medical_injector',
        name: 'Trauma Med-Auto-Injector',
        category: 'utility',
        slots: 1,
        cost: 10000,
        count: 1
      }
    ],
    weapons: [
      {
        id: 'inst_wpn_pa_plasma',
        weaponDefId: 'wpn_heavy_plasma_rifle',
        name: 'Battlesuit Plasma Repeater',
        mount: 'Forearm / Wrist',
        range: '24/48/96',
        damage: '3d8',
        ap: 4,
        rof: 2,
        modSlots: 1,
        cost: 16000,
        isHeavyWeapon: false,
        notes: 'Forearm locked with auto-targeting'
      },
      {
        id: 'inst_wpn_pa_blade',
        weaponDefId: 'wpn_vibro_blade_arm',
        name: 'High-Frequency Vibro-Blade',
        mount: 'Forearm / Wrist',
        range: 'Melee',
        damage: 'Str+d8',
        ap: 6,
        rof: 1,
        modSlots: 1,
        cost: 9000,
        isHeavyWeapon: false,
        notes: 'Retractable forearm vibro-edge'
      }
    ],
    notes: 'Power armor suit granting the wearer +2 Strength steps, enhanced sprint, and combat HUD.',
    updatedAt: Date.now()
  }
];

// ============================================================================
// SCI-FI COMPANION VEHICLE SIZES TABLE
// ============================================================================

export interface VehicleSizeDef {
  size: number;
  sizeCategory: string;
  scaleMod: number;
  baseToughness: number;
  baseArmor: number;
  maxArmor: number;
  wounds: number;
  modSlots: number;
  cost: number;
  defaultHandling: number;
  topSpeed: number;
  defaultPace: number;
  runningDie: number;
  crew: number;
  passengers: number;
  isHeavyArmor: boolean;
  typicalExamples: string;
}

export const SWADE_VEHICLE_SIZES: VehicleSizeDef[] = [
  {
    size: -2,
    sizeCategory: 'Tiny',
    scaleMod: -2,
    baseToughness: 4,
    baseArmor: 2,
    maxArmor: 4,
    wounds: 1,
    modSlots: 3,
    cost: 8000,
    defaultHandling: 2,
    topSpeed: 90,
    defaultPace: 6,
    runningDie: 6,
    crew: 1,
    passengers: 0,
    isHeavyArmor: false,
    typicalExamples: 'Mini-Drones, Ultralights'
  },
  {
    size: -1,
    sizeCategory: 'Very Small',
    scaleMod: -1,
    baseToughness: 6,
    baseArmor: 2,
    maxArmor: 4,
    wounds: 2,
    modSlots: 4,
    cost: 15000,
    defaultHandling: 2,
    topSpeed: 120,
    defaultPace: 8,
    runningDie: 8,
    crew: 1,
    passengers: 1,
    isHeavyArmor: false,
    typicalExamples: 'Hoverbikes, Jetpacks, Motorcycles'
  },
  {
    size: 0,
    sizeCategory: 'Human Size',
    scaleMod: 0,
    baseToughness: 7,
    baseArmor: 4,
    maxArmor: 6,
    wounds: 3,
    modSlots: 6,
    cost: 35000,
    defaultHandling: 1,
    topSpeed: 20,
    defaultPace: 8,
    runningDie: 8,
    crew: 1,
    passengers: 0,
    isHeavyArmor: false,
    typicalExamples: 'Scout Exosuits, Infiltration Armor'
  },
  {
    size: 1,
    sizeCategory: 'Small',
    scaleMod: 0,
    baseToughness: 9,
    baseArmor: 4,
    maxArmor: 8,
    wounds: 3,
    modSlots: 6,
    cost: 35000,
    defaultHandling: 1,
    topSpeed: 100,
    defaultPace: 8,
    runningDie: 8,
    crew: 1,
    passengers: 3,
    isHeavyArmor: false,
    typicalExamples: 'Recon Buggies, ATVs, Combat Armor'
  },
  {
    size: 2,
    sizeCategory: 'Small',
    scaleMod: 0,
    baseToughness: 11,
    baseArmor: 4,
    maxArmor: 10,
    wounds: 3,
    modSlots: 8,
    cost: 60000,
    defaultHandling: 1,
    topSpeed: 90,
    defaultPace: 10,
    runningDie: 8,
    crew: 1,
    passengers: 4,
    isHeavyArmor: false,
    typicalExamples: 'Light Scout Walkers, Sedans, Heavy Battlesuits'
  },
  {
    size: 3,
    sizeCategory: 'Normal',
    scaleMod: 0,
    baseToughness: 13,
    baseArmor: 6,
    maxArmor: 12,
    wounds: 3,
    modSlots: 10,
    cost: 110000,
    defaultHandling: 0,
    topSpeed: 80,
    defaultPace: 8,
    runningDie: 6,
    crew: 2,
    passengers: 6,
    isHeavyArmor: false,
    typicalExamples: 'Light APCs, Armored SUVs, VTOL Gunships'
  },
  {
    size: 4,
    sizeCategory: 'Normal',
    scaleMod: 0,
    baseToughness: 16,
    baseArmor: 8,
    maxArmor: 16,
    wounds: 4,
    modSlots: 12,
    cost: 200000,
    defaultHandling: 0,
    topSpeed: 70,
    defaultPace: 8,
    runningDie: 6,
    crew: 2,
    passengers: 8,
    isHeavyArmor: true,
    typicalExamples: 'Standard APCs, Combat Walkers, Light Tanks'
  },
  {
    size: 5,
    sizeCategory: 'Large',
    scaleMod: 2,
    baseToughness: 19,
    baseArmor: 10,
    maxArmor: 18,
    wounds: 4,
    modSlots: 14,
    cost: 380000,
    defaultHandling: -1,
    topSpeed: 65,
    defaultPace: 6,
    runningDie: 6,
    crew: 3,
    passengers: 10,
    isHeavyArmor: true,
    typicalExamples: 'Medium Tanks, Heavy Hovertanks, Dropships'
  },
  {
    size: 6,
    sizeCategory: 'Large',
    scaleMod: 2,
    baseToughness: 22,
    baseArmor: 12,
    maxArmor: 20,
    wounds: 4,
    modSlots: 16,
    cost: 650000,
    defaultHandling: -1,
    topSpeed: 60,
    defaultPace: 6,
    runningDie: 6,
    crew: 3,
    passengers: 12,
    isHeavyArmor: true,
    typicalExamples: 'Main Battle Tanks, Heavy Assault Walkers'
  },
  {
    size: 7,
    sizeCategory: 'Huge',
    scaleMod: 4,
    baseToughness: 25,
    baseArmor: 14,
    maxArmor: 22,
    wounds: 5,
    modSlots: 20,
    cost: 950000,
    defaultHandling: -1,
    topSpeed: 50,
    defaultPace: 6,
    runningDie: 6,
    crew: 4,
    passengers: 16,
    isHeavyArmor: true,
    typicalExamples: 'Heavy Artillery Crawlers, Assault Mechs'
  },
  {
    size: 8,
    sizeCategory: 'Huge',
    scaleMod: 4,
    baseToughness: 28,
    baseArmor: 16,
    maxArmor: 26,
    wounds: 5,
    modSlots: 24,
    cost: 1400000,
    defaultHandling: -2,
    topSpeed: 40,
    defaultPace: 5,
    runningDie: 4,
    crew: 4,
    passengers: 20,
    isHeavyArmor: true,
    typicalExamples: 'Super-Heavy Tanks, Colossal Titans, Dropships'
  },
  {
    size: 9,
    sizeCategory: 'Gargantuan',
    scaleMod: 6,
    baseToughness: 32,
    baseArmor: 18,
    maxArmor: 30,
    wounds: 6,
    modSlots: 28,
    cost: 2200000,
    defaultHandling: -2,
    topSpeed: 30,
    defaultPace: 4,
    runningDie: 4,
    crew: 6,
    passengers: 30,
    isHeavyArmor: true,
    typicalExamples: 'Land Fortresses, Siege Titans, World Crawlers'
  }
];

export function getVehicleSizeDef(size: number): VehicleSizeDef {
  const match = SWADE_VEHICLE_SIZES.find((s) => s.size === size);
  if (match) return match;
  if (size < -2) return SWADE_VEHICLE_SIZES[0];
  return SWADE_VEHICLE_SIZES[SWADE_VEHICLE_SIZES.length - 1];
}

export function getValidSizesForType(type: SciFiCraftType): number[] {
  switch (type) {
    case 'power_armor':
      return [-1, 0, 1, 2, 3];
    case 'walker':
      return [2, 3, 4, 5, 6, 7, 8, 9];
    case 'starship':
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    case 'vehicle':
    default:
      return [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}

export function getCraftTypeSizeLabel(type: SciFiCraftType, size: number): string {
  if (type === 'power_armor') {
    switch (size) {
      case -1:
        return 'Ultralight Exosuit';
      case 0:
        return 'Scout / Infiltration Armor';
      case 1:
        return 'Standard Combat Power Armor';
      case 2:
        return 'Heavy Assault Battlesuit';
      case 3:
        return 'Dreadnought Titan Battlesuit';
      default:
        return 'Power Armor';
    }
  }
  if (type === 'walker') {
    switch (size) {
      case 2:
        return 'Light Scout Mech';
      case 3:
        return 'Recon Patrol Walker';
      case 4:
        return 'Combat Trooper Mech';
      case 5:
        return 'Medium Support Walker';
      case 6:
        return 'Heavy Assault Walker';
      case 7:
        return 'Heavy Siege Walker';
      case 8:
        return 'Colossal Titan Walker';
      case 9:
        return 'Siege Bastion Titan';
      default:
        return 'Combat Walker';
    }
  }
  if (type === 'starship') {
    switch (size) {
      case 1:
        return 'Escape Pod / Probe';
      case 2:
        return 'Courier Shuttle';
      case 3:
        return 'Light Fighter / Scout';
      case 4:
        return 'Corvette / Heavy Fighter';
      case 5:
        return 'Gunship / Armed Transport';
      case 6:
        return 'Heavy Dropship / Freighter';
      case 7:
        return 'Frigate / Destroyer';
      case 8:
        return 'Heavy Destroyer / Bulk Carrier';
      case 9:
        return 'Cruiser / Battleship';
      default:
        return 'Starship';
    }
  }
  // Default Vehicle
  switch (size) {
    case -2:
      return 'Mini-Drone / Ultralight';
    case -1:
      return 'Hoverbike / Motorcycle';
    case 1:
      return 'Recon Buggy / ATV';
    case 2:
      return 'Sedan / Armored Car';
    case 3:
      return 'Light APC / VTOL Gunship';
    case 4:
      return 'Standard APC / Light Tank';
    case 5:
      return 'Medium Tank / Heavy Hovertank';
    case 6:
      return 'Main Battle Tank';
    case 7:
      return 'Heavy Artillery Platform';
    case 8:
      return 'Super-Heavy Tank / Heavy Dropship';
    case 9:
      return 'Land Fortress / Planetary Crawler';
    default:
      return 'Ground / Air Vehicle';
  }
}

