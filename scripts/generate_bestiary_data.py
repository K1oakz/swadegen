import json
import re

# Read parsed scifi creatures
with open('parsed_scifi_creatures.json', 'r', encoding='utf-8') as f:
    scifi_creatures = json.load(f)

with open('src/data/bestiaryData.ts', 'r', encoding='utf-8') as f:
    existing_ts = f.read()

core_match = re.search(r'// ==+\s*// SWADE CORE RULES\s*// ==+(.*?)(?=// ==+\s*// FANTASY COMPANION)', existing_ts, re.DOTALL)
fantasy_match = re.search(r'// ==+\s*// FANTASY COMPANION\s*// ==+(.*?)(?=// ==+\s*// SCI-FI COMPANION)', existing_ts, re.DOTALL)
horror_match = re.search(r'// ==+\s*// HORROR COMPANION\s*// ==+(.*?)(?=// ==+\s*// SUPER POWERS COMPANION)', existing_ts, re.DOTALL)
super_match = re.search(r'// ==+\s*// SUPER POWERS COMPANION\s*// ==+(.*?)(?=\n\];\s*\nexport const SOURCEBOOK_DESCRIPTIONS)', existing_ts, re.DOTALL)

def clean_part(p):
    p = p.strip()
    # strip trailing commas
    p = re.sub(r',\s*$', '', p)
    return p

core_part = clean_part(core_match.group(1)) if core_match else ''
fantasy_part = clean_part(fantasy_match.group(1)) if fantasy_match else ''
horror_part = clean_part(horror_match.group(1)) if horror_match else ''
super_part = clean_part(super_match.group(1)) if super_match else ''

# Format scifi_creatures as TypeScript objects
scifi_ts_blocks = []
for c in scifi_creatures:
    gear_str = ''
    if c.get('gear'):
        gear_items = ', '.join([json.dumps(g) for g in c['gear']])
        gear_str = f"gear: [{gear_items}],"

    skills_items = ', '.join([f"{{ name: {json.dumps(s['name'])}, die: {json.dumps(s['die'])} }}" for s in c['skills']])
    abilities_items = ',\n      '.join([f"{{ name: {json.dumps(a['name'])}, effect: {json.dumps(a['effect'])} }}" for a in c['abilities']])
    
    pace_val = json.dumps(c['pace']) if isinstance(c['pace'], str) else c['pace']

    block = f"""  {{
    id: {json.dumps(c['id'])},
    name: {json.dumps(c['name'])},
    subtitle: {json.dumps(c['subtitle'])},
    sourcebook: 'Sci-Fi Companion',
    classification: {json.dumps(c['classification'])},
    isWildCard: {str(c['isWildCard']).lower()},
    size: {c['size']},
    scale: {json.dumps(c['scale'])},
    pace: {pace_val},
    parry: {c['parry']},
    toughness: {c['toughness']},
    armor: {c['armor']},
    attributes: {{
      agility: {json.dumps(c['attributes']['agility'])},
      smarts: {json.dumps(c['attributes']['smarts'])},
      spirit: {json.dumps(c['attributes']['spirit'])},
      strength: {json.dumps(c['attributes']['strength'])},
      vigor: {json.dumps(c['attributes']['vigor'])}
    }},
    skills: [{skills_items}],
    abilities: [
      {abilities_items}
    ],
    {gear_str}
    description: {json.dumps(c['description'])}
  }}"""
    scifi_ts_blocks.append(block)

all_scifi_ts = ',\n'.join(scifi_ts_blocks)

full_bestiary_ts = f"""import {{ CreatureStatBlock }} from '../types/bestiary';

export const BESTIARY_CREATURES: CreatureStatBlock[] = [
  // ==========================================================================
  // SWADE CORE RULES
  // ==========================================================================
  {core_part},

  // ==========================================================================
  // FANTASY COMPANION
  // ==========================================================================
  {fantasy_part},

  // ==========================================================================
  // SCI-FI COMPANION (OFFICIAL SWADE SCIENCE FICTION COMPANION BESTIARY)
  // ==========================================================================
{all_scifi_ts},

  // ==========================================================================
  // HORROR COMPANION
  // ==========================================================================
  {horror_part},

  // ==========================================================================
  // SUPER POWERS COMPANION
  // ==========================================================================
  {super_part}
];

export const SOURCEBOOK_DESCRIPTIONS: Record<string, string> = {{
  'Core Rules': 'Universal fantasy, modern, horror, and classic pulp creatures from the Savage Worlds Adventure Edition core rules.',
  'Fantasy Companion': 'Archmages, aberrations, legendary beasts, and mythical monsters from fantasy settings.',
  'Sci-Fi Companion': 'Complete official bestiary from the SWADE Science Fiction Companion, featuring alien flora, apex predators, war mechs, cyborgs, and cosmic entities.',
  'Horror Companion': 'Cosmic dread, elder terrors, gothic night-stalkers, and unrelenting undead.',
  'Super Powers Companion': 'Metahuman nemeses, mutagenic abominations, and four-color super-threats.'
}};
"""

with open('src/data/bestiaryData.ts', 'w', encoding='utf-8') as out_f:
    out_f.write(full_bestiary_ts)

print("Generated src/data/bestiaryData.ts successfully without double commas!")
