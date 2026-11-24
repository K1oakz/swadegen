import re
import json

with open('scifi_bestiary_dump.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Normalize text
text = re.sub(r'\[PAGE \d+\]\s*(?:Scifi Companion|Bestiary)[^\n]*\n\d*\s*', '\n', text)
text = re.sub(r'\d+\s*\n\s*(?:Scifi Companion|Bestiary)[^\n]*\n', '\n', text)
text = re.sub(r'\[PAGE \d+\]', '\n', text)

def clean_hyphens(t):
    return re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', t)

def clean_spacing(t):
    t = clean_hyphens(t)
    t = re.sub(r'\s+', ' ', t)
    return t.strip()

# Find all "Attributes:"
attr_matches = list(re.finditer(r'Attributes:\s*(?:Agility|[A-Z])', text))
print(f"Total 'Attributes:' found: {len(attr_matches)}")

parsed_entries = []

for i, m in enumerate(attr_matches):
    start = m.start()
    prev_start = attr_matches[i-1].start() if i > 0 else 0
    next_start = attr_matches[i+1].start() if i + 1 < len(attr_matches) else len(text)
    
    lead_in = text[prev_start:start]
    
    # Locate where previous creature's stats/abilities ended
    sa_idx = lead_in.rfind('Special Abilities:')
    if sa_idx != -1:
        bullets = list(re.finditer(r'[\x84\u201e„]\s*([^:\n]+?):', lead_in[sa_idx:]))
        if bullets:
            cut = sa_idx + bullets[-1].start()
            candidate_region = lead_in[cut:]
        else:
            candidate_region = lead_in[sa_idx:]
    else:
        m_stat = re.search(r'(?:Gear:[^\n]+|Edges:[^\n]+|Hindrances:[^\n]+|Toughness:[^\n]+)', lead_in)
        if m_stat:
            candidate_region = lead_in[m_stat.end():]
        else:
            candidate_region = lead_in[-600:]
            
    lines = [l.strip() for l in candidate_region.split('\n') if l.strip()]
    heading = ""
    desc_lines = []
    found_h = False
    is_wc = False
    
    # Specific known fixes for heading extraction
    if i == 0:
        heading = "Acid Pitcher"
        desc_lines = [l for l in candidate_region.split('\n') if 'carnivorous' in l.lower() or 'ground' in l.lower()]
    else:
        for l in lines:
            clean = re.sub(r'[^\w\s\-\'\,\(\)\/]', '', l).strip()
            if any(l.startswith(b) for b in ['„', '\x84', '\u201e', '•']):
                continue
            if clean.isupper() and len(clean) >= 3 and clean not in ['WILD CARD', 'SWADE', 'CHAPTER', 'SPECIAL ABILITIES', 'GEAR', 'EDGES', 'HINDRANCES', 'BBESTIARYESTIARY']:
                if not found_h:
                    heading = clean
                    if '\x8f' in l:
                        is_wc = True
                    found_h = True
                elif clean != heading and len(desc_lines) == 0:
                    heading = f"{heading}: {clean}"
            elif found_h:
                if not clean.startswith('Attributes:'):
                    desc_lines.append(l)

    # Specific corrections for tricky headings in PDF text flow:
    if i == 67: # after Queen
        heading = "Hive Warrior"
    elif i == 73: # Irrasc
        heading = "Irrasc"
    elif i == 90: # Neural Cloud
        heading = "Neural Cloud"
    elif i == 44:
        heading = "Eliminator Mk II"
    elif i == 148:
        heading = "Throxian Enceph"
    elif i == 149:
        heading = "Throxian Soldier"
    elif i == 150:
        heading = "Throxian Worker Drone"

    heading = clean_spacing(heading)
    if not heading or heading == "UNKNOWN":
        for l in reversed(lines):
            clean = re.sub(r'[^\w\s\-\'\,\(\)\/]', '', l).strip()
            if len(clean) >= 3 and not clean.startswith('Attributes:'):
                heading = clean
                break

    clean_name = re.sub(r'[^\w\s\-\(\)\'\,\.\/]', '', heading).title().strip()
    clean_desc = clean_spacing(' '.join(desc_lines))
    clean_desc = re.sub(r'^\d+\s*', '', clean_desc)

    block_raw = text[start:next_start]
    
    # Attributes
    attr_match = re.search(r'Attributes:\s*(?:Agility\s+([^,]+),\s*)?Smarts\s+([^,]+),\s*Spirit\s+([^,]+),\s*Strength\s+([^,]+),\s*Vigor\s+([^\n]+)', block_raw)
    attrs = {'agility': 'd6', 'smarts': 'd6', 'spirit': 'd6', 'strength': 'd6', 'vigor': 'd6'}
    if attr_match:
        if attr_match.group(1):
            attrs['agility'] = clean_spacing(attr_match.group(1))
        attrs['smarts'] = clean_spacing(attr_match.group(2))
        attrs['spirit'] = clean_spacing(attr_match.group(3))
        attrs['strength'] = clean_spacing(attr_match.group(4))
        vig_raw = attr_match.group(5)
        for stop_word in ['Skills:', 'Pace:', 'Special']:
            if stop_word in vig_raw:
                vig_raw = vig_raw.split(stop_word)[0]
        attrs['vigor'] = clean_spacing(vig_raw)
        
    # Skills
    skills = []
    sk_match = re.search(r'Skills:\s*(.*?)(?=(?:Pace:|Hindrances:|Edges:|Special Abilities:|\Z))', block_raw, re.DOTALL)
    if sk_match:
        sk_text = clean_spacing(sk_match.group(1))
        for item in sk_text.split(','):
            item = item.strip()
            if not item: continue
            parts = item.rsplit(' ', 1)
            if len(parts) == 2 and any(d in parts[1] for d in ['d4', 'd6', 'd8', 'd10', 'd12']):
                skills.append({'name': parts[0].strip(), 'die': parts[1].strip()})
            else:
                skills.append({'name': item, 'die': ''})
                
    # Pace, Parry, Toughness
    pace = 6
    parry = 5
    toughness = 7
    armor = 0
    ppt_match = re.search(r'Pace:\s*([^;]+);\s*Parry:\s*([^;]+);\s*Toughness:\s*([^\n;]+)', block_raw)
    if ppt_match:
        pace_str = ppt_match.group(1).strip()
        parry_str = ppt_match.group(2).strip()
        tough_str = ppt_match.group(3).strip()
        
        if '—' in pace_str or ('-' in pace_str and len(pace_str) <= 2):
            pace = '—'
        else:
            p_m = re.search(r'(\d+)', pace_str)
            if p_m:
                pace = int(p_m.group(1))
            else:
                pace = clean_spacing(pace_str)

        parry_m = re.search(r'(\d+)', parry_str)
        if parry_m:
            parry = int(parry_m.group(1))

        tough_m = re.search(r'(\d+)(?:\s*\(([^\)]+)\))?', tough_str)
        if tough_m:
            toughness = int(tough_m.group(1))
            if tough_m.group(2):
                a_m = re.search(r'(\d+)', tough_m.group(2))
                if a_m:
                    armor = int(a_m.group(1))

    # Gear
    gear = []
    gear_match = re.search(r'Gear:\s*(.*?)(?=(?:Special Abilities:|\n[A-Z0-9\s\-\'\,\(\)\/]{3,}\n|\Z))', block_raw, re.DOTALL)
    if gear_match:
        g_text = clean_spacing(gear_match.group(1))
        for stop_word in ['Attributes:', 'Skills:', 'Pace:', 'Parry:', 'Toughness:']:
            if stop_word in g_text:
                g_text = g_text.split(stop_word)[0].strip()
        if g_text:
            gear = [g.strip() for g in g_text.split('.') if g.strip()]

    # Special Abilities & Size
    abilities = []
    size = 0
    scale = 'Normal'
    sa_match = re.search(r'Special Abilities:\s*(.*)', block_raw, re.DOTALL)
    if sa_match:
        sa_raw = sa_match.group(1)
        # TRUNCATE sa_raw at next Attributes: or next heading
        attr_in_sa = re.search(r'\n[^\n]*?Attributes:\s*(?:Agility|[A-Z])', sa_raw)
        if attr_in_sa:
            sa_raw = sa_raw[:attr_in_sa.start()]
            
        h_in_sa = re.search(r'\n(?![ \t]*[„\x84\u201e•])[ \t]*\x8f?[ \t]*[A-Z0-9\s\-\'\,\(\)\/]{3,}[ \t]*\n', sa_raw)
        if h_in_sa:
            sa_raw = sa_raw[:h_in_sa.start()]
            
        bullets = list(re.finditer(r'[\x84\u201e„]\s*([^:\n]+?):\s*(.*?)(?=(?:[\x84\u201e„]\s*[^:\n]+?:|\Z))', sa_raw, re.DOTALL))
        for b in bullets:
            ab_name = clean_spacing(b.group(1))
            ab_effect = clean_spacing(b.group(2))
            
            # STRICT TRUNCATION if any stat block markers leaked into ab_effect
            for stop_word in ['Attributes:', 'Skills:', 'Pace:', 'Parry:', 'Toughness:', 'Special Abilities:', 'Gear:', 'Edges:']:
                if stop_word in ab_effect:
                    k_idx = ab_effect.find(stop_word)
                    ab_effect = ab_effect[:k_idx].strip()
                    
            ab_effect = re.sub(r'\s+[A-Z\s\-\'\,\(\)\/]{4,}\s+.*$', '', ab_effect)
            
            if ab_name and ab_effect:
                abilities.append({'name': ab_name, 'effect': ab_effect})
                
                if 'Size' in ab_name:
                    sz_m = re.search(r'Size\s*([+-]?\d+)(?:\s*\(([^\)]+)\))?', ab_name + ' ' + ab_effect)
                    if sz_m:
                        size = int(sz_m.group(1))
                        if sz_m.group(2):
                            scale = sz_m.group(2).strip()

    if scale == 'Normal':
        if size <= -3: scale = 'Tiny'
        elif size <= -1: scale = 'Small'
        elif size in [0, 1]: scale = 'Normal'
        elif size in [2, 3]: scale = 'Large'
        elif size in [4, 5, 6, 7]: scale = 'Huge'
        else: scale = 'Gargantuan'

    cid = 'scifi_' + re.sub(r'[^a-z0-9]+', '_', clean_name.lower()).strip('_')
    
    # Subtitle inference & classification
    subtitle = "Sci-Fi Adversary"
    classification = "Alien"
    c_lower = clean_name.lower()
    if any(k in c_lower for k in ['assassin', 'hunter', 'citizen', 'executive', 'diplomat', 'dwarf', 'elf', 'pirate', 'soldier', 'officer', 'crew', 'thug', 'marine', 'grunt', 'hacker', 'merchant', 'miner', 'rascal', 'scientist', 'smuggler', 'spy', 'cowboy']):
        classification = "Humanoid & Folk"
        subtitle = "Humanoid / NPC"
    elif any(k in c_lower for k in ['beast', 'beetle', 'lizard', 'spider', 'rabbit', 'worm', 'crab', 'frog', 'eel', 'rat', 'bird', 'dog', 'monkey', 'krok', 'irrasc', 'ghevok', 'grazer', 'fisher', 'harpooner', 'pitcher', 'tree', 'needlebush', 'springtail']):
        classification = "Beast"
        subtitle = "Alien Fauna / Beast"
    elif any(k in c_lower for k in ['drone', 'cyborg', 'robot', 'eliminator', 'mechanoid', 'recycler', 'vehicle', 'machine', 'quadroid', 'scrap parasite', 'shredder', 'glitch']):
        classification = "Construct"
        subtitle = "Autonomous Machine / Construct"
    elif any(k in c_lower for k in ['elemental', 'daniken', 'id', 'gene thief', 'neural cloud', 'living planet', 'malific', 'possessor', 'voidling', 'gray goo', 'hive', 'queen']):
        classification = "Aberration"
        subtitle = "Cosmic / Aberration"
    elif any(k in c_lower for k in ['dragon', 'apex', 'leviathan', 'scylla', 'sandmaw', 'decapitator', 'deep diver', 'earthquake beast', 'stalker', 'stomper', 'titan', 'yeti']):
        classification = "Monstrosity"
        subtitle = "Apex Predator / Monstrosity"

    parsed_entries.append({
        'id': cid,
        'name': clean_name,
        'subtitle': subtitle,
        'sourcebook': 'Sci-Fi Companion',
        'classification': classification,
        'isWildCard': is_wc,
        'size': size,
        'scale': scale,
        'pace': pace,
        'parry': parry,
        'toughness': toughness,
        'armor': armor,
        'attributes': attrs,
        'skills': skills,
        'abilities': abilities,
        'gear': gear if gear else None,
        'description': clean_desc
    })

# Deduplicate IDs if any collisions occur
seen_ids = {}
for e in parsed_entries:
    base_id = e['id']
    if base_id in seen_ids:
        seen_ids[base_id] += 1
        e['id'] = f"{base_id}_{seen_ids[base_id]}"
    else:
        seen_ids[base_id] = 1

print(f"Total parsed entries ready: {len(parsed_entries)}")

# Rebuild bestiaryData.ts
with open('src/data/bestiaryData.ts', 'r', encoding='utf-8') as f:
    existing_ts = f.read()

core_match = re.search(r'// ==+\s*// SWADE CORE RULES\s*// ==+(.*?)(?=// ==+\s*// FANTASY COMPANION)', existing_ts, re.DOTALL)
fantasy_match = re.search(r'// ==+\s*// FANTASY COMPANION\s*// ==+(.*?)(?=// ==+\s*// SCI-FI COMPANION)', existing_ts, re.DOTALL)
horror_match = re.search(r'// ==+\s*// HORROR COMPANION\s*// ==+(.*?)(?=// ==+\s*// SUPER POWERS COMPANION)', existing_ts, re.DOTALL)
super_match = re.search(r'// ==+\s*// SUPER POWERS COMPANION\s*// ==+(.*?)(?=\n\];\s*\nexport const SOURCEBOOK_DESCRIPTIONS)', existing_ts, re.DOTALL)

def clean_part(p):
    p = p.strip()
    p = re.sub(r',\s*$', '', p)
    return p

core_part = clean_part(core_match.group(1)) if core_match else ''
fantasy_part = clean_part(fantasy_match.group(1)) if fantasy_match else ''
horror_part = clean_part(horror_match.group(1)) if horror_match else ''
super_part = clean_part(super_match.group(1)) if super_match else ''

scifi_ts_blocks = []
for c in parsed_entries:
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

# Double comma cleanup
full_bestiary_ts = re.sub(r',\s*,', ',', full_bestiary_ts)

with open('src/data/bestiaryData.ts', 'w', encoding='utf-8') as out_f:
    out_f.write(full_bestiary_ts)

print("Generated src/data/bestiaryData.ts successfully!")
