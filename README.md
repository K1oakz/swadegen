# 🎲 SWADE Character Forge — Savage Worlds Adventure Edition (Android App)

An offline-first **Savage Worlds Adventure Edition (SWADE)** Character Generator, Compendium, Interactive Play Sheet, and Exploding Wild Die Roller built for Android (`com.swade.charactergenerator`).

---

## 🌟 Features

### 🛠️ 7-Step SWADE Character Builder
1. **Identity, Ancestry & Setting Rules**:
   - Pre-loaded SWADE Core Ancestries: **Human** (+1 Free Edge), **Android**, **Aquarian**, **Avion**, **Dwarf** (d6 Vigor, Pace 5), **Elf** (d6 Agility), **Half-Elf**, **Half-Folk** (d6 Spirit, Size -1, +1 Benny), **Rakashan**, **Saurian** (+2 Natural Armor, d6 Notice), plus **Custom Ancestry**.
   - Optional SWADE Setting Rules: **Born a Hero**, **More Skill Points (15 Base)**, and **Unarmored Hero (+2 Toughness)**.
2. **Hindrances & 4-Point Budget Allocator**:
   - 55+ SWADE Core Hindrances (Major = 2 pts, Minor = 1 pt, capped at 4 pts) plus custom Hindrance support.
   - Live **Hindrance Point Allocator** to spend earned points on:
     - **+1 Attribute Point** (2 pts)
     - **+1 Novice Edge** (2 pts)
     - **+1 Skill Point** (1 pt)
     - **+$1,000 Starting Funds** (1 pt)
3. **Attributes**:
   - **Agility, Smarts, Spirit, Strength, Vigor** (`d4` to `d12` + flat modifiers) with live point budget validation.
4. **Skills**:
   - All 32 SWADE Core & Arcane Skills (`Athletics`, `Common Knowledge`, `Notice`, `Persuasion`, `Stealth` start at `d4` free).
   - Automatic **SWADE Skill Point Cost** calculator (1 pt per step up to linked Attribute, 2 pts per step above linked Attribute).
   - Add custom setting skills linked to any Attribute.
5. **Edges & Advancements Tracker**:
   - 75+ categorized SWADE Edges (*Background, Combat, Leadership, Power, Professional, Social, Weird, Legendary*) with automatic **Prerequisite Validation** (Rank, Attributes, Skills, Wild Card, Arcane Background).
   - **Advancements & Rank Progression** (*Novice → Seasoned → Veteran → Heroic → Legendary*) that dynamically expands your Attribute, Skill, or Edge pools as you log advances.
6. **Arcane Backgrounds & Powers**:
   - Supports **Magic**, **Miracles**, **Psionics**, **Weird Science**, and **Gifted** with automatic Power Point calculation (`Power Points` Edge adds +5 PP).
   - 45+ SWADE Powers with custom **Trappings** per power.
7. **Weapons, Armor, Shields & Gear**:
   - Full SWADE Armory (Fantasy, Black Powder/Western, Modern, Sci-Fi weapons, armor, and shields).
   - Automatic **Parry**, **Toughness (Armor)**, **Pace + Running Die**, and **Encumbrance / Max Load** calculations.

### ⚔️ Interactive Play Sheet & Exploding Wild Die Roller
- **Combat & Vital Trackers**:
  - **Bennies** counter with one-tap **Spend & Roll Soak (Vigor)** and **Spend to Unshake**.
  - **Wounds (0–3 + Incapacitated)** & **Fatigue (0–2 + Incapacitated)** tracks that automatically apply `-1` to `-5` penalties to all Trait rolls (respecting *Nerves of Steel* and *Construct*).
  - **Combat Status Toggles**: *Shaken* (with one-tap Spirit Unshake roll), *Distracted (-2)*, *Vulnerable (+2 vs)*, *Entangled (-2)*, *Aiming (+2 Ranged)*, and *Conviction (+d6 to all Trait & Damage rolls!)*.
- **Exploding Savage Worlds Dice Tray**:
  - Rolls **Trait Die + d6 Wild Die** simultaneously, automatically **Aces (Explodes)** on max die rolls, detects **Critical Failures (Snake Eyes)**, calculates **Success & Raises (+1 per 4 over TN)**, rolls exploding weapon damage (`Str+d8`, `2d6+1`, etc. with optional `+d6` bonus raise damage), and lets you **Spend 1 Benny to Reroll** (automatically applying *Elan* `+2` or *No Mercy* `+2`).
- **Multi-Character Roster, Random Hero Generator & JSON Backup**:
  - Create blank characters, generate complete random SWADE Wild Cards in one tap, or Export/Import full roster `.json` files.

---

## 📱 Android APK Location

```
C:\Users\k1oak\swade-character-generator\android\app\build\outputs\apk\debug\app-debug.apk
```
