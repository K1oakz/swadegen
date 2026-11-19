import {
  AncestryDef,
  AttributeId,
  CharacterSkill,
  DieExplosionResult,
  DieSides,
  EdgeDef,
  RankName,
  RollLogEntry,
  SwadeCharacter
} from '../types/swade';
import {
  DIE_STEPS,
  INITIAL_SKILLS_TEMPLATE,
  SWADE_ANCESTRIES,
  SWADE_ARCANE_BACKGROUNDS,
  SWADE_EDGES,
  SWADE_HINDRANCES,
  SWADE_SKILLS
} from '../data/swadeData';

export function getDieStepIndex(die: DieSides | 0): number {
  if (die === 0) return -1;
  return DIE_STEPS.indexOf(die);
}

export function stepDieUp(die: DieSides | 0): DieSides {
  if (die === 0) return 4;
  const idx = DIE_STEPS.indexOf(die);
  if (idx < DIE_STEPS.length - 1) return DIE_STEPS[idx + 1];
  return 12;
}

export function stepDieDown(die: DieSides | 0, minDie: DieSides | 0 = 0): DieSides | 0 {
  if (die === 0) return 0;
  if (die <= minDie) return minDie;
  if (die === 4) return minDie === 4 ? 4 : 0;
  const idx = DIE_STEPS.indexOf(die);
  if (idx > 0) return DIE_STEPS[idx - 1];
  return minDie;
}

export function formatDie(die: DieSides | 0, mod: number = 0): string {
  if (die === 0) {
    const net = -2 + mod;
    return `d4${net >= 0 ? (net > 0 ? `+${net}` : '') : net}`;
  }
  if (mod === 0) return `d${die}`;
  return `d${die}${mod > 0 ? `+${mod}` : mod}`;
}

export function getRankFromAdvances(advances: number): RankName {
  if (advances >= 16) return 'Legendary';
  if (advances >= 12) return 'Heroic';
  if (advances >= 8) return 'Veteran';
  if (advances >= 4) return 'Seasoned';
  return 'Novice';
}

export const RANK_ORDER: Record<RankName, number> = {
  Novice: 0,
  Seasoned: 1,
  Veteran: 2,
  Heroic: 3,
  Legendary: 4
};

export function getAncestry(ancestryId: string): AncestryDef {
  return SWADE_ANCESTRIES.find((a) => a.id === ancestryId) || SWADE_ANCESTRIES[0];
}

// --- Point Budget Calculations ---

export function calculateHindrancePointsEarned(character: SwadeCharacter): {
  rawTotal: number;
  cappedTotal: number;
} {
  const rawTotal = character.hindrances.reduce(
    (sum, h) => sum + (h.severity === 'Major' ? 2 : 1),
    0
  );
  return {
    rawTotal,
    cappedTotal: Math.min(4, rawTotal)
  };
}

export function calculateHindrancePointsSpent(character: SwadeCharacter): number {
  const alloc = character.hindranceAllocation;
  return alloc.attributes * 2 + alloc.edges * 2 + alloc.skills * 1 + alloc.wealth * 1;
}

export function calculateAttributePoints(character: SwadeCharacter): {
  spent: number;
  budget: number;
  remaining: number;
} {
  const ancestry = getAncestry(character.ancestryId);
  const baseBudget = 5 + character.hindranceAllocation.attributes;

  // Also count Attribute advances
  const advanceAttrBonus = character.advancesList.filter((a) => a.type === 'Attribute').length;
  const budget = baseBudget + advanceAttrBonus;

  let spent = 0;
  (Object.keys(character.attributes) as AttributeId[]).forEach((attr) => {
    const startSteps = ancestry.attributeBonuses?.[attr] || 0; // 0 = starts at d4, 1 = starts at d6
    const currentStepIdx = getDieStepIndex(character.attributes[attr]); // d4=0, d6=1, d8=2, d10=3, d12=4
    const stepsBought = Math.max(0, currentStepIdx - startSteps);
    spent += stepsBought;
  });

  return {
    spent,
    budget,
    remaining: budget - spent
  };
}

/**
 * Official SWADE Skill Cost Calculation:
 * - Core skills start at d4 for free (or higher if ancestry grants bonus).
 * - Non-core skills start at Unskilled (0), buying d4 costs 1 point (or 2 if linked Attribute < d4, which never happens since min Attribute is d4).
 * - Each step <= Linked Attribute costs 1 point.
 * - Each step > Linked Attribute costs 2 points.
 */
export function calculateSingleSkillCost(
  skill: CharacterSkill,
  linkedAttrDie: DieSides,
  ancestryBonusSteps: number = 0
): number {
  if (skill.die === 0) return 0;

  // Determine starting step index:
  // Unskilled = -1, d4 = 0, d6 = 1, d8 = 2, d10 = 3, d12 = 4
  const baseStartIdx = skill.isCore ? 0 : -1;
  const startIdx = baseStartIdx + ancestryBonusSteps;
  const targetIdx = getDieStepIndex(skill.die);

  if (targetIdx <= startIdx) return 0;

  const attrIdx = getDieStepIndex(linkedAttrDie);
  let cost = 0;
  for (let step = startIdx + 1; step <= targetIdx; step++) {
    if (step <= attrIdx) {
      cost += 1;
    } else {
      cost += 2;
    }
  }
  return cost;
}

export function calculateSkillPoints(character: SwadeCharacter): {
  spent: number;
  budget: number;
  remaining: number;
} {
  const ancestry = getAncestry(character.ancestryId);
  const basePool = character.settingRules.moreSkillPoints ? 15 : 12;
  const elderlyBonus = character.hindrances.some((h) => h.hindranceId === 'elderly') ? 5 : 0;
  const advanceSkillPoints = character.advancesList.filter((a) => a.type === 'Skills').length * 2;
  const budget = basePool + character.hindranceAllocation.skills + elderlyBonus + advanceSkillPoints;

  let spent = 0;
  character.skills.forEach((sk) => {
    const linkedDie = character.attributes[sk.linkedAttribute];
    const ancestryBonus = ancestry.skillBonuses?.[sk.skillId] || 0;
    spent += calculateSingleSkillCost(sk, linkedDie, ancestryBonus);
  });

  return {
    spent,
    budget,
    remaining: budget - spent
  };
}

export function calculateEdgeBudget(character: SwadeCharacter): {
  spent: number;
  budget: number;
  remaining: number;
} {
  const ancestry = getAncestry(character.ancestryId);
  const ancestryFree = ancestry.freeEdgeBonus || 0;
  const bornAHeroFree = character.settingRules.bornAHero ? 1 : 0;
  const blindBonus = character.hindrances.some((h) => h.hindranceId === 'blind') ? 1 : 0;
  const hindranceEdges = character.hindranceAllocation.edges;
  const advanceEdges = character.advancesList.filter((a) => a.type === 'Edge').length;

  const budget = ancestryFree + bornAHeroFree + blindBonus + hindranceEdges + advanceEdges;
  const spent = character.edges.length;

  return {
    spent,
    budget,
    remaining: budget - spent
  };
}

// --- Derived Stats Calculations ---

export interface DerivedStatsSummary {
  rank: RankName;
  size: number;
  pace: number;
  runningDie: DieSides;
  parry: number;
  parryBreakdown: string[];
  toughnessTotal: number;
  toughnessBase: number;
  armorBonus: number;
  toughnessBreakdown: string[];
  maxPowerPoints: number;
  startingBennies: number;
  totalWeight: number;
  maxLoad: number;
  isEncumbered: boolean;
  startingFunds: number;
  activePenalty: number;
  penaltyBreakdown: string[];
}

export function calculateDerivedStats(character: SwadeCharacter): DerivedStatsSummary {
  const ancestry = getAncestry(character.ancestryId);
  const rank = getRankFromAdvances(character.advancesCount);

  // Selected Edge definitions
  const activeEdgeDefs = character.edges
    .map((e) => SWADE_EDGES.find((ed) => ed.id === e.edgeId))
    .filter((e): e is EdgeDef => Boolean(e));

  // Size
  let size = (ancestry.sizeMod || 0) + character.customSizeMod;
  if (character.edges.some((e) => e.edgeId === 'brawny')) size += 1;
  if (character.hindrances.some((h) => h.hindranceId === 'obese')) size += 1;
  if (character.hindrances.some((h) => h.hindranceId === 'small')) size -= 1;
  if (character.ancestryId === 'robot' && character.robotConfig?.frameSize) {
    size += character.robotConfig.frameSize;
  }

  // Pace & Running Die
  let pace = 6 + (ancestry.paceMod || 0) + character.customPaceMod;
  let runningDie: DieSides = (ancestry.paceMod && ancestry.paceMod < 0) ? 4 : 6;

  activeEdgeDefs.forEach((ed) => {
    if (ed.paceBonus) pace += ed.paceBonus;
    if (ed.runningDieBonus) runningDie = stepDieUp(runningDie);
  });

  character.hindrances.forEach((h) => {
    if (h.hindranceId === 'elderly' || h.hindranceId === 'obese') {
      pace -= 1;
      runningDie = 4;
    }
    if (h.hindranceId === 'slow') {
      pace -= h.severity === 'Major' ? 2 : 1;
      runningDie = 4;
    }
  });

  // Robot Locomotion Mods
  if (character.ancestryId === 'robot' && character.robotConfig) {
    character.robotConfig.installedMods.forEach((m) => {
      if (m.paceBonus) {
        pace += m.paceBonus * (m.count || 1);
      }
    });
  }
  pace = Math.max(1, pace);

  // Parry = 2 + half Fighting die + Shield + Equipped Weapon Parry + Edges + Custom
  const fightingSkill = character.skills.find((s) => s.skillId === 'fighting');
  const fightingDie = fightingSkill?.die || 0;
  const fightingHalf = fightingDie > 0 ? Math.floor(fightingDie / 2) : 0;
  let parry = 2 + fightingHalf;
  const parryBreakdown: string[] = [`Base 2`, `Fighting (d${fightingDie || 0}): +${fightingHalf}`];

  if (ancestry.parryMod) {
    parry += ancestry.parryMod;
    parryBreakdown.push(`${ancestry.name}: ${ancestry.parryMod > 0 ? '+' : ''}${ancestry.parryMod}`);
  }

  character.armor
    .filter((a) => a.equipped && a.parryBonus !== 0)
    .forEach((sh) => {
      parry += sh.parryBonus;
      parryBreakdown.push(`${sh.name}: +${sh.parryBonus}`);
    });

  character.weapons
    .filter((w) => w.equipped && w.parryMod)
    .forEach((w) => {
      parry += w.parryMod || 0;
      parryBreakdown.push(`${w.name}: ${(w.parryMod || 0) > 0 ? '+' : ''}${w.parryMod}`);
    });

  activeEdgeDefs.forEach((ed) => {
    if (ed.parryBonus) {
      parry += ed.parryBonus;
      parryBreakdown.push(`${ed.name}: +${ed.parryBonus}`);
    }
  });

  if (character.edges.some((e) => e.edgeId === 'trademark_weapon')) {
    parry += 1;
    parryBreakdown.push('Trademark Weapon: +1');
  }

  if (character.customParryMod !== 0) {
    parry += character.customParryMod;
    parryBreakdown.push(`Custom: ${character.customParryMod > 0 ? '+' : ''}${character.customParryMod}`);
  }

  // Toughness = 2 + half Vigor die + Size/Ancestry + Edges + Armor
  const vigorDie = character.attributes.vigor;
  const vigorHalf = Math.floor(vigorDie / 2);
  let toughnessBase = 2 + vigorHalf;
  const toughnessBreakdown: string[] = [`Base 2`, `Vigor (d${vigorDie}): +${vigorHalf}`];

  if (ancestry.toughnessMod) {
    toughnessBase += ancestry.toughnessMod;
    toughnessBreakdown.push(`${ancestry.name}: ${ancestry.toughnessMod > 0 ? '+' : ''}${ancestry.toughnessMod}`);
  }

  // Size modifiers from Hindrances not already in Ancestry
  if (character.hindrances.some((h) => h.hindranceId === 'obese')) {
    toughnessBase += 1;
    toughnessBreakdown.push('Obese (Size +1): +1');
  }
  if (character.hindrances.some((h) => h.hindranceId === 'small')) {
    toughnessBase -= 1;
    toughnessBreakdown.push('Small (Size -1): -1');
  }

  activeEdgeDefs.forEach((ed) => {
    if (ed.toughnessBonus) {
      toughnessBase += ed.toughnessBonus;
      toughnessBreakdown.push(`${ed.name}: +${ed.toughnessBonus}`);
    }
  });

  // Equipped Armor (highest worn armor bonus)
  const equippedArmors = character.armor.filter((a) => a.equipped && a.type === 'Armor');
  const armorBonus = equippedArmors.reduce((max, a) => Math.max(max, a.armorBonus), 0);

  // Robot Armor & Toughness Mods
  let robotArmorBonus = 0;
  if (character.ancestryId === 'robot' && character.robotConfig) {
    character.robotConfig.installedMods.forEach((m) => {
      if (m.toughnessBonus) {
        const tb = m.toughnessBonus * (m.count || 1);
        toughnessBase += tb;
        toughnessBreakdown.push(`Robot Mod (${m.name}): ${tb > 0 ? '+' : ''}${tb}`);
      }
      if (m.armorBonus) {
        const ab = m.armorBonus * (m.count || 1);
        robotArmorBonus += ab;
        toughnessBreakdown.push(`Robot Plating: +${ab} Armor`);
      }
    });
  }

  const totalArmor = armorBonus + robotArmorBonus;
  if (totalArmor > 0) {
    if (armorBonus > 0) toughnessBreakdown.push(`Equipped Armor: +${armorBonus}`);
  } else if (character.settingRules.unarmoredHero) {
    toughnessBase += 2;
    toughnessBreakdown.push('Unarmored Hero Rule: +2');
  }

  if (character.customToughnessMod !== 0) {
    toughnessBase += character.customToughnessMod;
    toughnessBreakdown.push(`Custom: ${character.customToughnessMod > 0 ? '+' : ''}${character.customToughnessMod}`);
  }

  const toughnessTotal = toughnessBase + totalArmor;

  // Power Points
  const ab = SWADE_ARCANE_BACKGROUNDS.find((a) => a.id === character.arcaneBackgroundId);
  let maxPowerPoints = ab ? ab.startingPowerPoints : 0;
  if (maxPowerPoints > 0) {
    const ppEdgesCount = character.edges.filter((e) => e.edgeId === 'power_points').length;
    maxPowerPoints += ppEdgesCount * 5 + character.maxPowerPointsMod;
  }

  // Starting Bennies
  let startingBennies = character.isWildCard ? 3 : 0;
  if (character.ancestryId === 'half_folk') startingBennies += 1;
  if (character.hindrances.some((h) => h.hindranceId === 'bad_luck')) startingBennies -= 1;
  if (character.hindrances.some((h) => h.hindranceId === 'young')) startingBennies += 1;
  activeEdgeDefs.forEach((ed) => {
    if (ed.benniesBonus) startingBennies += ed.benniesBonus;
  });
  startingBennies = Math.max(0, startingBennies);

  // Encumbrance (SWADE rule: d4=20 lbs, d6=40, d8=60, d10=80, d12=100; Brawny/Soldier increases effective Str by 1 step)
  let effectiveStrIdx = getDieStepIndex(character.attributes.strength); // 0..4
  if (character.edges.some((e) => e.edgeId === 'brawny')) effectiveStrIdx += 1;
  if (character.edges.some((e) => e.edgeId === 'soldier')) effectiveStrIdx += 1;
  const maxLoad = (effectiveStrIdx + 1) * 20;

  const weaponsWeight = character.weapons.reduce((s, w) => s + w.weight, 0);
  const armorWeight = character.armor.reduce((s, a) => s + a.weight, 0);
  const gearWeight = character.gear.reduce((s, g) => s + g.weight * g.quantity, 0);
  const totalWeight = Math.round((weaponsWeight + armorWeight + gearWeight) * 10) / 10;

  // Starting Funds
  let startingFunds = 500 + character.hindranceAllocation.wealth * 1000;
  if (character.edges.some((e) => e.edgeId === 'rich')) startingFunds = 1500 + character.hindranceAllocation.wealth * 1000;
  if (character.hindrances.some((h) => h.hindranceId === 'poverty')) startingFunds = Math.floor(startingFunds / 2);

  // Active Wounds / Fatigue / Distracted Penalty
  const penaltyBreakdown: string[] = [];
  let activePenalty = 0;

  // Nerves of Steel ignores 1 pt of Wound penalties, Android ignores 1 pt
  let woundIgnore = 0;
  if (character.edges.some((e) => e.edgeId === 'nerves_of_steel')) woundIgnore += 1;
  if (character.ancestryId === 'android') woundIgnore += 1;

  const effectiveWoundPenalty = Math.max(0, Math.min(3, character.playState.wounds) - woundIgnore);
  if (effectiveWoundPenalty > 0) {
    activePenalty -= effectiveWoundPenalty;
    penaltyBreakdown.push(`Wounds: -${effectiveWoundPenalty}`);
  }

  const fatiguePenalty = Math.min(2, character.playState.fatigue);
  if (fatiguePenalty > 0) {
    activePenalty -= fatiguePenalty;
    penaltyBreakdown.push(`Fatigue: -${fatiguePenalty}`);
  }

  if (character.playState.distracted) {
    activePenalty -= 2;
    penaltyBreakdown.push('Distracted: -2');
  }

  if (character.playState.boundOrEntangled) {
    activePenalty -= 2;
    penaltyBreakdown.push('Entangled/Bound: -2');
  }

  return {
    rank,
    size,
    pace,
    runningDie,
    parry,
    parryBreakdown,
    toughnessTotal,
    toughnessBase,
    armorBonus: totalArmor,
    toughnessBreakdown,
    maxPowerPoints,
    startingBennies,
    totalWeight,
    maxLoad,
    isEncumbered: totalWeight > maxLoad,
    startingFunds,
    activePenalty,
    penaltyBreakdown
  };
}

export function checkEdgeRequirements(edge: EdgeDef, character: SwadeCharacter): {
  met: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  const charRank = getRankFromAdvances(character.advancesCount);

  if (!character.settingRules.bornAHero && RANK_ORDER[charRank] < RANK_ORDER[edge.rankRequired]) {
    reasons.push(`Requires ${edge.rankRequired} Rank`);
  }

  if (edge.requiresWildCard && !character.isWildCard) {
    reasons.push('Requires Wild Card');
  }

  if (edge.requiresArcane && character.arcaneBackgroundId === 'none' && !character.edges.some((e) => e.edgeId === 'arcane_background')) {
    reasons.push('Requires Arcane Background');
  }

  if (edge.minAttributes) {
    (Object.keys(edge.minAttributes) as AttributeId[]).forEach((attr) => {
      const req = edge.minAttributes![attr]!;
      if (character.attributes[attr] < req) {
        reasons.push(`Requires ${attr.charAt(0).toUpperCase() + attr.slice(1)} d${req}+`);
      }
    });
  }

  if (edge.minSkills) {
    Object.keys(edge.minSkills).forEach((skId) => {
      const req = edge.minSkills![skId];
      const charSk = character.skills.find((s) => s.skillId === skId);
      if (!charSk || charSk.die < req) {
        const skName = SWADE_SKILLS.find((s) => s.id === skId)?.name || skId;
        reasons.push(`Requires ${skName} d${req}+`);
      }
    });
  }

  return {
    met: reasons.length === 0,
    reasons
  };
}

// --- Exploding Savage Worlds Dice Roller ---

export function rollExplodingDie(sides: number): DieExplosionResult {
  const rolls: number[] = [];
  let total = 0;
  let acedCount = 0;
  let safety = 0;

  while (safety < 20) {
    safety++;
    const r = Math.floor(Math.random() * sides) + 1;
    rolls.push(r);
    total += r;
    if (r === sides) {
      acedCount++;
    } else {
      break;
    }
  }

  return {
    sides,
    rolls,
    total,
    acedCount
  };
}

/**
 * Damage dice in SWADE explode (Ace) when maximum is rolled.
 */
export function rollDamageDie(sides: number): DieExplosionResult {
  return rollExplodingDie(sides);
}

/**
 * Calculates skill roll modifiers from active Hindrances and Edges/Perks.
 */
export function calculateSkillRollModifiers(
  character: SwadeCharacter,
  skillId: string,
  skillName?: string
): { totalMod: number; breakdown: string[] } {
  let totalMod = 0;
  const breakdown: string[] = [];
  const lowerId = (skillId || '').toLowerCase();
  const lowerName = (skillName || '').toLowerCase();

  const hasEdge = (edgeId: string) => character.edges.some((e) => e.edgeId === edgeId);
  const getHindrance = (hindranceId: string) => character.hindrances.find((h) => h.hindranceId === hindranceId);

  // --- Notice ---
  if (lowerId === 'notice' || lowerName.includes('notice')) {
    if (hasEdge('alertness')) {
      totalMod += 2;
      breakdown.push('Alertness: +2');
    }
    if (hasEdge('investigator')) {
      totalMod += 2;
      breakdown.push('Investigator: +2');
    }
    const badEyes = getHindrance('bad_eyes');
    if (badEyes) {
      totalMod -= 2;
      breakdown.push('Bad Eyes: -2');
    }
    const clueless = getHindrance('clueless');
    if (clueless) {
      totalMod -= 1;
      breakdown.push('Clueless: -1');
    }
    const hardOfHearing = getHindrance('hard_of_hearing');
    if (hardOfHearing) {
      totalMod -= 2;
      breakdown.push('Hard of Hearing: -2');
    }
  }

  // --- Athletics ---
  if (lowerId === 'athletics' || lowerName.includes('athletics')) {
    const clumsy = getHindrance('clumsy');
    if (clumsy) {
      totalMod -= 2;
      breakdown.push('Clumsy: -2');
    }
    const slow = getHindrance('slow');
    if (slow && slow.severity === 'Major') {
      totalMod -= 2;
      breakdown.push('Slow (Major): -2');
    }
    if (hasEdge('thief')) {
      totalMod += 1;
      breakdown.push('Thief (Climbing): +1');
    }
  }

  // --- Stealth ---
  if (lowerId === 'stealth' || lowerName.includes('stealth')) {
    if (hasEdge('thief')) {
      totalMod += 1;
      breakdown.push('Thief: +1');
    }
    if (hasEdge('woodsman')) {
      totalMod += 2;
      breakdown.push('Woodsman: +2');
    }
    if (hasEdge('assassin')) {
      totalMod += 2;
      breakdown.push('Assassin: +2');
    }
    const clumsy = getHindrance('clumsy');
    if (clumsy) {
      totalMod -= 2;
      breakdown.push('Clumsy: -2');
    }
  }

  // --- Thievery ---
  if (lowerId === 'thievery' || lowerName.includes('thievery')) {
    if (hasEdge('thief')) {
      totalMod += 1;
      breakdown.push('Thief: +1');
    }
  }

  // --- Persuasion ---
  if (lowerId === 'persuasion' || lowerName.includes('persuasion')) {
    if (hasEdge('very_attractive')) {
      totalMod += 2;
      breakdown.push('Very Attractive: +2');
    } else if (hasEdge('attractive')) {
      totalMod += 1;
      breakdown.push('Attractive: +1');
    }
    if (hasEdge('aristocrat')) {
      totalMod += 2;
      breakdown.push('Aristocrat: +2');
    }
    if (hasEdge('charismatic')) {
      totalMod += 2;
      breakdown.push('Charismatic: +2');
    }
    const mean = getHindrance('mean');
    if (mean) {
      totalMod -= 1;
      breakdown.push('Mean: -1');
    }
    const outsider = getHindrance('outsider');
    if (outsider) {
      totalMod -= 2;
      breakdown.push('Outsider: -2');
    }
    const tongueTied = getHindrance('tongue_tied');
    if (tongueTied) {
      totalMod -= 1;
      breakdown.push('Tongue-Tied: -1');
    }
    const ugly = getHindrance('ugly');
    if (ugly) {
      const penalty = ugly.severity === 'Major' ? 2 : 1;
      totalMod -= penalty;
      breakdown.push(`Ugly (${ugly.severity}): -${penalty}`);
    }
  }

  // --- Performance ---
  if (lowerId === 'performance' || lowerName.includes('performance')) {
    if (hasEdge('very_attractive')) {
      totalMod += 2;
      breakdown.push('Very Attractive: +2');
    } else if (hasEdge('attractive')) {
      totalMod += 1;
      breakdown.push('Attractive: +1');
    }
    const tongueTied = getHindrance('tongue_tied');
    if (tongueTied) {
      totalMod -= 1;
      breakdown.push('Tongue-Tied: -1');
    }
  }

  // --- Intimidation & Taunt ---
  if (lowerId === 'intimidation' || lowerName.includes('intimidation')) {
    if (hasEdge('menacing')) {
      totalMod += 2;
      breakdown.push('Menacing: +2');
    }
    const tongueTied = getHindrance('tongue_tied');
    if (tongueTied) {
      totalMod -= 1;
      breakdown.push('Tongue-Tied: -1');
    }
  }
  if (lowerId === 'taunt' || lowerName.includes('taunt')) {
    const tongueTied = getHindrance('tongue_tied');
    if (tongueTied) {
      totalMod -= 1;
      breakdown.push('Tongue-Tied: -1');
    }
  }

  // --- Research ---
  if (lowerId === 'research' || lowerName.includes('research')) {
    if (hasEdge('investigator')) {
      totalMod += 2;
      breakdown.push('Investigator: +2');
    }
    if (hasEdge('scholar')) {
      totalMod += 2;
      breakdown.push('Scholar: +2');
    }
    const illiterate = getHindrance('illiterate');
    if (illiterate) {
      totalMod -= 2;
      breakdown.push('Illiterate: -2');
    }
  }

  // --- Common Knowledge ---
  if (lowerId === 'common_knowledge' || lowerName.includes('common knowledge')) {
    if (hasEdge('streetwise')) {
      totalMod += 2;
      breakdown.push('Streetwise: +2');
    }
    const clueless = getHindrance('clueless');
    if (clueless) {
      totalMod -= 1;
      breakdown.push('Clueless: -1');
    }
  }

  // --- Survival ---
  if (lowerId === 'survival' || lowerName.includes('survival')) {
    if (hasEdge('woodsman')) {
      totalMod += 2;
      breakdown.push('Woodsman: +2');
    }
  }

  // --- Repair ---
  if (lowerId === 'repair' || lowerName.includes('repair')) {
    if (hasEdge('mr_fix_it')) {
      totalMod += 2;
      breakdown.push('Mr. Fix It: +2');
    }
  }

  // --- Healing ---
  if (lowerId === 'healing' || lowerName.includes('healing')) {
    if (hasEdge('healer')) {
      totalMod += 2;
      breakdown.push('Healer: +2');
    }
  }

  // --- Shooting ---
  if (lowerId === 'shooting' || lowerName.includes('shooting')) {
    if (hasEdge('marksman') && character.playState.aiming) {
      totalMod += 2;
      breakdown.push('Marksman: +2');
    }
    const badEyes = getHindrance('bad_eyes');
    if (badEyes) {
      totalMod -= 2;
      breakdown.push('Bad Eyes (Ranged): -2');
    }
  }

  // --- Occult ---
  if (lowerId === 'occult' || lowerName.includes('occult')) {
    const doubtingThomas = getHindrance('doubting_thomas');
    if (doubtingThomas) {
      totalMod -= 2;
      breakdown.push('Doubting Thomas: -2');
    }
  }

  // --- Sci-Fi Modifiers ---
  // Hacking
  if (lowerId === 'hacking' || lowerName.includes('hacking')) {
    if (hasEdge('scifi_power_hacker')) {
      totalMod += 2;
      breakdown.push('Power Hacker: +2');
    }
  }

  // Science
  if (lowerId === 'science' || lowerName.includes('science')) {
    if (hasEdge('scifi_exo_scientist')) {
      totalMod += 2;
      breakdown.push('Exo Scientist: +2');
    }
  }

  // Piloting / Driving / Boating
  if (lowerId === 'piloting' || lowerId === 'driving' || lowerId === 'boating') {
    if (hasEdge('scifi_soft_touch')) {
      totalMod += 2;
      breakdown.push('Soft Touch: +2');
    }
    if (lowerId === 'piloting' && hasEdge('scifi_rocket_jock')) {
      totalMod += 2;
      breakdown.push('Rocket Jock: +2');
    }
  }

  // Persuasion
  if (lowerId === 'persuasion' || lowerName.includes('persuasion')) {
    if (hasEdge('scifi_deceptive')) {
      totalMod += 2;
      breakdown.push('Deceptive: +2');
    }
  }

  // Low Tech Hindrance (applies to high-tech skills)
  const lowTech = getHindrance('scifi_low_tech');
  if (lowTech && ['electronics', 'hacking', 'repair', 'science'].includes(lowerId)) {
    const penalty = lowTech.severity === 'Major' ? 4 : 2;
    totalMod -= penalty;
    breakdown.push(`Low Tech (${lowTech.severity}): -${penalty}`);
  }

  return { totalMod, breakdown };
}

export function executeSwadeTraitRoll(params: {
  character: SwadeCharacter;
  label: string;
  dieSides: DieSides;
  skillId?: string;
  isUnskilled?: boolean;
  baseModifier?: number;
  targetNumber?: number;
  customPenalty?: number;
}): RollLogEntry {
  const {
    character,
    label,
    dieSides,
    skillId,
    isUnskilled = false,
    baseModifier = 0,
    targetNumber = 4,
    customPenalty = 0
  } = params;

  const derived = calculateDerivedStats(character);
  const traitDieResult = rollExplodingDie(dieSides);
  const usedWildDie = character.isWildCard;
  const wildDieResult = usedWildDie ? rollExplodingDie(6) : undefined;

  // Conviction adds an exploding d6 to the total!
  const convictionResult = character.playState.conviction ? rollExplodingDie(6) : undefined;

  // Critical Failure in SWADE: Both Trait Die and Wild Die come up natural 1 on their first roll (or natural 1 for Extra)
  const isCriticalFailure = usedWildDie
    ? traitDieResult.rolls[0] === 1 && wildDieResult!.rolls[0] === 1
    : traitDieResult.rolls[0] === 1;

  const modifierBreakdown: string[] = [];
  let totalModifier = 0;

  if (isUnskilled) {
    totalModifier -= 2;
    modifierBreakdown.push('Unskilled: -2');
  }

  if (baseModifier !== 0) {
    totalModifier += baseModifier;
    modifierBreakdown.push(`Trait Mod: ${baseModifier > 0 ? '+' : ''}${baseModifier}`);
  }

  // Apply Hindrance & Perk skill adjustments!
  const skillMods = calculateSkillRollModifiers(character, skillId || '', label);
  if (skillMods.totalMod !== 0) {
    totalModifier += skillMods.totalMod;
    modifierBreakdown.push(...skillMods.breakdown);
  }

  if (derived.activePenalty !== 0) {
    totalModifier += derived.activePenalty;
    modifierBreakdown.push(...derived.penaltyBreakdown);
  }

  if (customPenalty !== 0) {
    totalModifier += customPenalty;
    modifierBreakdown.push(`Custom Mod: ${customPenalty > 0 ? '+' : ''}${customPenalty}`);
  }

  const bestBaseDie = usedWildDie
    ? Math.max(traitDieResult.total, wildDieResult!.total)
    : traitDieResult.total;

  const convictionBonus = convictionResult ? convictionResult.total : 0;
  if (convictionResult) {
    modifierBreakdown.push(`Conviction (d6): +${convictionBonus}`);
  }

  const finalTotal = bestBaseDie + totalModifier + convictionBonus;
  const isSuccess = !isCriticalFailure && finalTotal >= targetNumber;
  const raises = isSuccess ? Math.floor((finalTotal - targetNumber) / 4) : 0;

  return {
    id: `roll_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    characterName: character.name,
    label: isUnskilled ? `${label} (Unskilled)` : label,
    skillId,
    rollType: 'trait',
    traitDieResult,
    wildDieResult,
    convictionResult,
    usedWildDie,
    modifier: totalModifier,
    modifierBreakdown,
    finalTotal,
    targetNumber,
    isCriticalFailure,
    isSuccess,
    raises,
    canRerollParams: {
      label,
      rollType: 'trait',
      dieSides,
      isUnskilled,
      baseModifier,
      targetNumber
    }
  };
}

/**
 * Parses SWADE damage formulas like "Str+d8", "Str+d6+2", "2d6+1", "3d6"
 * Damage dice explode (Ace) when maximum is rolled.
 * An attack raise adds an exploding +d6 bonus damage die.
 */
export function executeSwadeDamageRoll(params: {
  character: SwadeCharacter;
  label: string;
  damageFormula: string;
  bonusRaiseD6?: boolean;
  targetToughness?: number;
}): RollLogEntry {
  const {
    character,
    label,
    damageFormula,
    bonusRaiseD6 = false,
    targetToughness = 5
  } = params;

  const clean = damageFormula.replace(/\s+/g, '');
  const parts = clean.split('+');
  const diceResults: DieExplosionResult[] = [];
  let flatMod = 0;
  const modifierBreakdown: string[] = [];

  parts.forEach((token) => {
    const lower = token.toLowerCase();
    if (lower === 'str') {
      const strResult = rollDamageDie(character.attributes.strength);
      diceResults.push(strResult);
      modifierBreakdown.push(`Str (d${character.attributes.strength}): ${strResult.total}`);
    } else if (lower.includes('d')) {
      const [countStr, sidesStr] = lower.split('d');
      const count = countStr ? parseInt(countStr, 10) || 1 : 1;
      const sides = parseInt(sidesStr, 10) || 6;
      for (let i = 0; i < count; i++) {
        const res = rollDamageDie(sides);
        diceResults.push(res);
      }
    } else {
      const parsed = parseInt(token, 10);
      if (!isNaN(parsed)) {
        flatMod += parsed;
        modifierBreakdown.push(`Flat Bonus: +${parsed}`);
      }
    }
  });

  if (bonusRaiseD6) {
    const raiseDie = rollDamageDie(6);
    diceResults.push(raiseDie);
    modifierBreakdown.push(`Attack Raise Bonus (+d6): +${raiseDie.total}`);
  }

  const convictionResult = character.playState.conviction ? rollDamageDie(6) : undefined;
  if (convictionResult) {
    modifierBreakdown.push(`Conviction (+d6): +${convictionResult.total}`);
  }

  if (diceResults.length === 0) {
    diceResults.push(rollDamageDie(6));
  }

  const primaryDie = diceResults[0];
  const extraDice = diceResults.slice(1);
  const diceSum = diceResults.reduce((s, d) => s + d.total, 0);
  const finalTotal = diceSum + flatMod + (convictionResult ? convictionResult.total : 0);

  const isSuccess = finalTotal >= targetToughness; // Shaken if >= Toughness, 1 Wound per Raise!
  const raises = isSuccess ? Math.floor((finalTotal - targetToughness) / 4) : 0;

  return {
    id: `dmg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    characterName: character.name,
    label: `${label} (${damageFormula}${bonusRaiseD6 ? ' + d6 Raise' : ''})`,
    rollType: 'damage',
    traitDieResult: primaryDie,
    extraDiceResults: extraDice,
    convictionResult,
    usedWildDie: false,
    modifier: flatMod,
    modifierBreakdown,
    finalTotal,
    targetNumber: targetToughness,
    isCriticalFailure: false,
    isSuccess,
    raises,
    canRerollParams: {
      label,
      rollType: 'damage',
      dieSides: (primaryDie.sides as DieSides) || 6,
      damageFormula,
      bonusRaiseD6,
      targetNumber: targetToughness
    }
  };
}

// --- Blank & Random Character Generators ---

export function createBlankCharacter(name: string = 'New Wild Card'): SwadeCharacter {
  return {
    id: `char_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name,
    concept: 'Adventurer & Fortune Seeker',
    setting: 'Savage Worlds Core',
    ancestryId: 'human',
    isWildCard: true,
    advancesCount: 0,
    advancesList: [],
    attributes: {
      agility: 4,
      smarts: 4,
      spirit: 4,
      strength: 4,
      vigor: 4
    },
    attributeModifiers: {
      agility: 0,
      smarts: 0,
      spirit: 0,
      strength: 0,
      vigor: 0
    },
    skills: INITIAL_SKILLS_TEMPLATE(),
    hindrances: [],
    hindranceAllocation: {
      attributes: 0,
      edges: 0,
      skills: 0,
      wealth: 0
    },
    edges: [],
    arcaneBackgroundId: 'none',
    maxPowerPointsMod: 0,
    powers: [],
    weapons: [
      {
        id: `wpn_${Date.now()}`,
        name: 'Dagger / Knife',
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
    armor: [],
    gear: [],
    currency: 475,
    customPaceMod: 0,
    customParryMod: 0,
    customToughnessMod: 0,
    customSizeMod: 0,
    settingRules: {
      bornAHero: false,
      moreSkillPoints: false,
      unarmoredHero: false
    },
    sourceBooks: ['core'],
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
    backstory: '',
    notes: '',
    avatarEmoji: '🎲',
    updatedAt: Date.now()
  };
}

export function generateRandomSwadeCharacter(): SwadeCharacter {
  const archetypes = [
    { name: 'Kaelen Thorne', concept: 'Frontier Ranger & Scout', setting: 'Fantasy', emoji: '🏹', focusAttr: 'agility' as AttributeId },
    { name: 'Doc Holliday Vega', concept: 'Cyber-Surgeon & Gunslinger', setting: 'Sci-Fi / Cyberpunk', emoji: '🦾', focusAttr: 'smarts' as AttributeId },
    { name: 'Sister Evangeline', concept: 'Monster Hunter & Exorcist', setting: 'Horror / Rippers', emoji: '✝️', focusAttr: 'spirit' as AttributeId },
    { name: 'Thorgar Ironbrow', concept: 'Tunnel Breaker & Mercenary', setting: 'Fantasy', emoji: '🪓', focusAttr: 'strength' as AttributeId },
    { name: 'Capt. Roxanne Vance', concept: 'Airship Smuggler & Ace Pilot', setting: 'Pulp / Steampunk', emoji: '✈️', focusAttr: 'agility' as AttributeId }
  ];

  const pick = archetypes[Math.floor(Math.random() * archetypes.length)];
  const base = createBlankCharacter(pick.name);
  base.concept = pick.concept;
  base.setting = pick.setting;
  base.avatarEmoji = pick.emoji;

  const ancestries = SWADE_ANCESTRIES.filter((a) => a.id !== 'custom');
  const chosenAncestry = ancestries[Math.floor(Math.random() * ancestries.length)];
  base.ancestryId = chosenAncestry.id;

  // Apply ancestry starting attributes
  const attrs: Record<AttributeId, DieSides> = {
    agility: chosenAncestry.attributeBonuses?.agility ? 6 : 4,
    smarts: chosenAncestry.attributeBonuses?.smarts ? 6 : 4,
    spirit: chosenAncestry.attributeBonuses?.spirit ? 6 : 4,
    strength: chosenAncestry.attributeBonuses?.strength ? 6 : 4,
    vigor: chosenAncestry.attributeBonuses?.vigor ? 6 : 4
  };

  // Pick 1 Major and 2 Minor Hindrances (4 pts)
  const majors = SWADE_HINDRANCES.filter((h) => h.severity === 'Major' || h.severity === 'Minor/Major');
  const minors = SWADE_HINDRANCES.filter((h) => h.severity === 'Minor' || h.severity === 'Minor/Major');
  const h1 = majors[Math.floor(Math.random() * majors.length)];
  const h2 = minors.find((m) => m.id !== h1.id) || minors[0];
  const h3 = minors.find((m) => m.id !== h1.id && m.id !== h2.id) || minors[1];

  base.hindrances = [
    { hindranceId: h1.id, name: h1.name, severity: 'Major', summary: h1.summary },
    { hindranceId: h2.id, name: h2.name, severity: 'Minor', summary: h2.summary },
    { hindranceId: h3.id, name: h3.name, severity: 'Minor', summary: h3.summary }
  ];

  base.hindranceAllocation = { attributes: 1, edges: 1, skills: 0, wealth: 0 };

  // Spend 6 Attribute points (5 base + 1 hindrance)
  const attrKeys: AttributeId[] = ['agility', 'smarts', 'spirit', 'strength', 'vigor'];
  let pts = 6;
  // Boost focus attribute twice first
  for (let i = 0; i < 2 && pts > 0; i++) {
    if (attrs[pick.focusAttr] < 10) {
      attrs[pick.focusAttr] = stepDieUp(attrs[pick.focusAttr]);
      pts--;
    }
  }
  while (pts > 0) {
    const k = attrKeys[Math.floor(Math.random() * attrKeys.length)];
    if (attrs[k] < 10) {
      attrs[k] = stepDieUp(attrs[k]);
      pts--;
    }
  }
  base.attributes = attrs;

  // Spend 12 Skill Points on core & combat skills
  const prioritySkills = ['fighting', 'shooting', 'athletics', 'notice', 'persuasion', 'stealth', 'intimidation', 'survival', 'healing'];
  let skillPts = 12;
  let guard = 0;
  while (skillPts > 0 && guard < 40) {
    guard++;
    const skId = prioritySkills[Math.floor(Math.random() * prioritySkills.length)];
    const sk = base.skills.find((s) => s.skillId === skId);
    if (!sk) continue;
    const nextDie = stepDieUp(sk.die);
    const linkedDie = base.attributes[sk.linkedAttribute];
    const stepCost = nextDie <= linkedDie ? 1 : 2;
    if (nextDie <= 10 && skillPts >= stepCost) {
      sk.die = nextDie;
      skillPts -= stepCost;
    }
  }

  // Pick valid Novice Edges
  const totalFreeEdges = (chosenAncestry.freeEdgeBonus || 0) + 1;
  const noviceEdges = SWADE_EDGES.filter(
    (e) => e.rankRequired === 'Novice' && !e.requiresArcane && checkEdgeRequirements(e, base).met
  );
  for (let i = 0; i < totalFreeEdges && i < noviceEdges.length; i++) {
    const ed = noviceEdges[i];
    base.edges.push({
      edgeId: ed.id,
      name: ed.name,
      category: ed.category,
      rankRequired: ed.rankRequired,
      summary: ed.summary,
      source: i === 0 && chosenAncestry.freeEdgeBonus ? 'Ancestry' : 'Hindrance'
    });
  }

  return base;
}
