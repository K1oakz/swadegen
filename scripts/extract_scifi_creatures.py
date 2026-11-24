import re
import json

with open('scifi_bestiary_dump.txt', 'r', encoding='utf-8') as f:
    raw = f.read()

# Clean up page headers/footers
cleaned = re.sub(r'\[PAGE \d+\]\s*(?:Scifi Companion|Bestiary)[^\n]*\n\d+\s*', '', raw)

def clean_text(t):
    # remove hyphens at line endings: e.g. 'persua-\nsion' -> 'persuasion'
    t = re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', t)
    # replace single newlines with space, but preserve double newlines
    t = re.sub(r'(?<!\n)\n(?!\n)', ' ', t)
    return re.sub(r'\s+', ' ', t).strip()

creature_specs = [
    ('ACID PITCHER', 'Beast', False, 'Carnivorous Flora Ambush Plant'),
    ('AERIAL STALKER', 'Alien', False, 'Atmospheric Gasbag Predator'),
    ('APEX', 'Monstrosity', True, 'Apex Bipedal Super-Predator'),
    ('AQUARIAN', 'Humanoid & Folk', False, 'Aquatic World Sentient'),
    ('ARC BEETLE', 'Beast', False, 'Bioelectrical Shock Insect'),
    ('ASSASSIN', 'Humanoid & Folk', False, 'Hired Contract Killer'),
    ('ASSIMILATOR', 'Construct', False, 'Cybernetic Collective Drone'),
    ('AVION', 'Humanoid & Folk', False, 'Avian Low-G Flier'),
    ('AVROK', 'Beast', False, 'Gargantuan Crocodilian Apex'),
    ('BARBED-TONGUE LIZARD', 'Beast', False, 'Venomous Stun Lizard'),
    ('BATSPIDER', 'Beast', False, 'Flying Jungle Arachnid'),
    ('BLEEDER RABBIT', 'Beast', False, 'Armored Anticoagulant Leaper'),
    ('BONE SPIDER', 'Monstrosity', False, 'Bone-Cutting Chitinous Stalker'),
    ('BOUNTY HUNTER', 'Humanoid & Folk', False, 'Frontier Tracker & Mercenary'),
    ('BRAIN EATER', 'Aberration', False, 'Cerebral Extraction Leech'),
    ('BRAINIAC', 'Construct', True, 'Hyper-Intelligent AI Thinker'),
    ('BRISTLED GORER', 'Beast', False, 'Quill-Covered Heavy Charger'),
    ('CREATURE FROM THE ID', 'Aberration', True, 'Subconscious Manifestation of Rage'),
    ('CYBER DOG', 'Construct', False, 'Augmented Sentry Hound'),
    ('CYBORG COMMANDO', 'Construct', True, 'Heavy Subdermal Combat Cyborg'),
    ('DANIKEN', 'Aberration', True, 'Crystalline Ancient Transcendent'),
    ('DARKRAPTOR', 'Beast', False, 'Nocturnal Winged Stalker'),
    ('DARK SIDER', 'Humanoid & Folk', False, 'Twilight World Warrior'),
    ('DEATH WORM', 'Monstrosity', False, 'Desert Subterranean Devourer'),
    ('DECAPITATOR', 'Alien', False, 'Mantis Bio-Executioner'),
    ('DEEP DIVER', 'Beast', False, 'Abyssal Oceanic Angler Leviathan'),
    ('DEEP SPACE WORM', 'Monstrosity', True, 'Cosmic Starship-Devouring Behemoth'),
    ('ELIMINATOR', 'Construct', True, 'Relentless Infiltration Assassin Droid'),
    ('EMOTOR', 'Alien', False, 'Empathic Pheromone Manipulator'),
    ('ENERGY ELEMENTAL', 'Aberration', True, 'Living High-Voltage Plasma Entity'),
    ('ENERGY LEECH', 'Alien', False, 'Power Grid & Battery Parasite'),
    ('FRACTAL RAY', 'Alien', False, 'Crystalline Energy Flyer'),
    ('GENE THIEF', 'Aberration', True, 'DNA-Absorbing Biotech Mutator'),
    ('GLITCH', 'Construct', False, 'Malicious Machine Spirit & Hacker Imp'),
    ('GRAY GOO', 'Construct', True, 'Self-Replicating Nanite Disassembler Swarm'),
    ('HARPOONER', 'Beast', False, 'Barbed Chitin Spike Hunter'),
    ('HAZE BARNACLE', 'Beast', False, 'Hallucinogenic Spore Colony'),
    ('HUGGER', 'Alien', False, 'Face-Grasping Embryonic Carrier'),
    ('IMPALER', 'Beast', False, 'Spiked Horn Subterranean Charger'),
    ('LIVING PLANET', 'Aberration', True, 'Sentient Planetary Ecosystem Simulacrum'),
    ('MECHANOID', 'Construct', False, 'Armed Autonomous Assault Walker'),
    ('MIMIC', 'Alien', False, 'Polymorphic Camouflage Stalker'),
    ('MUCUS FROG', 'Beast', False, 'Acidic Slime Amphibian'),
    ('NEURAL CLOUD', 'Aberration', True, 'Gaseous Psionic Mind Hive'),
    ('OMEGA CRAB', 'Beast', True, 'Colossal Hydraulic Coastal Crusher'),
    ('ORTHOCONE', 'Beast', False, 'Shelled Primeval Cephalopod'),
    ('PENTAMOUTH', 'Alien', False, 'Five-Jawed Abyssal Feeder'),
    ('PSI BEAST', 'Monstrosity', False, 'Telepathic Phase Stalker'),
    ('PSI BOOSTER', 'Alien', False, 'Psionic Energy Catalyst Symbiote'),
    ('PSI EATER', 'Aberration', True, 'Psionic Predator & Power Drainer'),
    ('PUPPET MASTER', 'Alien', True, 'Spinal Neuro-Parasite Controller'),
    ('QUADRAPUS', 'Beast', False, 'Four-Tentacled Desert Ambusher'),
    ('RADBEAST', 'Monstrosity', False, 'Radioactive Mutated Behemoth'),
    ('SANDMAW', 'Monstrosity', True, 'Quicksand Sarlacc Pit Ambusher'),
    ('SCRAP PARASITE', 'Construct', False, 'Metal-Consuming Tech Vermin'),
    ('SCYLLA', 'Monstrosity', True, 'Multi-Headed Oceanic Leviathan'),
    ('SENTIENT VEHICLE', 'Construct', True, 'Awakened Combat Machine AI'),
    ('SHOCK RAY', 'Beast', False, 'Bio-Galvanic Underwater Glider'),
    ('SHREDDER', 'Construct', False, 'Spinning Whirling Blade Drone'),
    ('SPACE BARNACLE', 'Alien', False, 'Hull-Corroding Starship Parasite'),
    ('SPACE LEVIATHAN', 'Monstrosity', True, 'Star-Faring Cosmic Behemoth'),
    ('SPACE SARGASSUM', 'Beast', False, 'Deep Space Derelict Bio-Weed'),
    ('SPIT WORM', 'Beast', False, 'Acidic Slime Projector'),
    ('TITAN EEL', 'Beast', True, 'Colossal Shock Sea Serpent'),
    ('UMBRELLA BEAST', 'Beast', False, 'Arboreal Drop Hunter'),
    ('WIRE RAT', 'Beast', False, 'Cyber-Chewing Tech Vermin'),
    ('XOK-XOK', 'Humanoid & Folk', False, 'Chitinous Warrior Caste Worker')
]

parsed_creatures = []

for name, default_class, default_wc, default_sub in creature_specs:
    # Match creature name
    escaped = re.escape(name)
    pattern = rf'(?:^|\n)([^\n]*?{escaped}[^\n]*?)\n+(.*?)(Attributes:\s*Agility.*?)(?=\n[A-Z\x8f\s\(\)\'\-]{{4,}}\n+[^\n]*?Attributes:|\Z)'
    m = re.search(pattern, cleaned, re.DOTALL)
    if not m:
        continue

    raw_title = m.group(1).strip()
    raw_desc = m.group(2).strip()
    raw_stats = m.group(3).strip()

    is_wc = default_wc or ('\x8f' in raw_title) or ('\x8f' in raw_desc)
    clean_title = re.sub(r'[^\w\s\-\(\)\'\,\.]', '', name).title().strip()
    
    # Attributes
    attr_match = re.search(r'Attributes:\s*Agility\s+([^,]+),\s*Smarts\s+([^,]+),\s*Spirit\s+([^,]+),\s*Strength\s+([^,]+),\s*Vigor\s+([^\n]+)', raw_stats)
    attrs = {
        'agility': 'd6', 'smarts': 'd6', 'spirit': 'd6', 'strength': 'd6', 'vigor': 'd6'
    }
    if attr_match:
        attrs['agility'] = attr_match.group(1).strip()
        attrs['smarts'] = attr_match.group(2).strip()
        attrs['spirit'] = attr_match.group(3).strip()
        attrs['strength'] = attr_match.group(4).strip()
        attrs['vigor'] = attr_match.group(5).strip().split('Skills:')[0].strip()

    # Skills
    skills_match = re.search(r'Skills:\s*(.*?)(?=Pace:)', raw_stats, re.DOTALL)
    skills = []
    if skills_match:
        sk_text = clean_text(skills_match.group(1))
        for item in sk_text.split(','):
            item = item.strip()
            if not item: continue
            parts = item.rsplit(' ', 1)
            if len(parts) == 2:
                skills.append({'name': parts[0].strip(), 'die': parts[1].strip()})
            else:
                skills.append({'name': item, 'die': ''})

    # Pace, Parry, Toughness
    pace = 6
    parry = 5
    toughness = 7
    armor = 0
    ppt_match = re.search(r'Pace:\s*([^;]+);\s*Parry:\s*([^;]+);\s*Toughness:\s*([^\n;]+)', raw_stats)
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
                pace = pace_str

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

    # Special Abilities & Size
    abilities = []
    gear = []
    gear_match = re.search(r'Gear:\s*(.*?)(?=Special Abilities:|\Z)', raw_stats, re.DOTALL)
    if gear_match:
        g_text = clean_text(gear_match.group(1))
        gear = [g.strip() for g in g_text.split('.') if g.strip()]

    ab_match = re.search(r'Special Abilities:\s*(.*)', raw_stats, re.DOTALL)
    size = 0
    scale = 'Normal'
    if ab_match:
        ab_raw = ab_match.group(1)
        items = re.split(r'\s*[„\u201e]\s*', ab_raw)
        for it in items:
            it = clean_text(it)
            if not it: continue
            if ':' in it:
                ab_name, ab_eff = it.split(':', 1)
                ab_name = ab_name.strip()
                ab_eff = ab_eff.strip()
                abilities.append({'name': ab_name, 'effect': ab_eff})
                
                if 'Size' in ab_name:
                    sz_m = re.search(r'Size\s*([+-]?\d+)(?:\s*\(([^\)]+)\))?', it)
                    if sz_m:
                        size = int(sz_m.group(1))
                        if sz_m.group(2):
                            scale = sz_m.group(2).strip()
            else:
                abilities.append({'name': 'Special', 'effect': it})

    if scale == 'Normal':
        if size <= -3: scale = 'Tiny'
        elif size <= -1: scale = 'Small'
        elif size in [0, 1]: scale = 'Normal'
        elif size in [2, 3]: scale = 'Large'
        elif size in [4, 5, 6, 7]: scale = 'Huge'
        else: scale = 'Gargantuan'

    cid = 'scifi_' + re.sub(r'[^a-z0-9]+', '_', clean_title.lower()).strip('_')
    desc_clean = clean_text(raw_desc)
    # remove leading page numbers or chapter strings
    desc_clean = re.sub(r'^\d+\s*', '', desc_clean)

    parsed_creatures.append({
        'id': cid,
        'name': clean_title,
        'subtitle': default_sub,
        'sourcebook': 'Sci-Fi Companion',
        'classification': default_class,
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
        'description': desc_clean
    })

print(f'Successfully parsed {len(parsed_creatures)} Sci-Fi Companion creatures!')
with open('parsed_scifi_creatures.json', 'w', encoding='utf-8') as out_f:
    json.dump(parsed_creatures, out_f, indent=2)
