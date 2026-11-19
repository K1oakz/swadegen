import React, { useEffect, useState } from 'react';
import { DieSides, RollLogEntry, SwadeCharacter } from './types/swade';
import { SAMPLE_CHARACTERS } from './data/swadeData';
import {
  createBlankCharacter,
  executeSwadeDamageRoll,
  executeSwadeTraitRoll,
  generateRandomSwadeCharacter
} from './utils/swadeRules';
import { TopBar } from './components/TopBar';
import { BuilderView } from './components/BuilderView';
import { PlayModeView } from './components/PlayModeView';
import { CharacterListView } from './components/CharacterListView';
import { DiceRollerModal } from './components/DiceRollerModal';
import { RosterAndBackupModal } from './components/RosterAndBackupModal';

const STORAGE_KEY_ROSTER = 'swade_character_forge_roster_v1';
const STORAGE_KEY_ACTIVE_ID = 'swade_character_forge_active_id_v1';

export const App: React.FC = () => {
  const [characters, setCharacters] = useState<SwadeCharacter[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ROSTER);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed loading SWADE characters from localStorage:', e);
    }
    return SAMPLE_CHARACTERS;
  });

  const [activeCharacterId, setActiveCharacterId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (savedId) return savedId;
    } catch {
      // ignore
    }
    return SAMPLE_CHARACTERS[0].id;
  });

  const [activeMode, setActiveMode] = useState<'roster' | 'builder' | 'play'>('roster');
  const [rollHistory, setRollHistory] = useState<RollLogEntry[]>([]);
  const [isDiceTrayOpen, setIsDiceTrayOpen] = useState(false);
  const [rosterModalMode, setRosterModalMode] = useState<'roster' | 'backup' | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROSTER, JSON.stringify(characters));
    } catch (e) {
      console.error('Error saving roster:', e);
    }
  }, [characters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeCharacterId);
    } catch {
      // ignore
    }
  }, [activeCharacterId]);

  const activeCharacter =
    characters.find((c) => c.id === activeCharacterId) || characters[0];

  const handleUpdateActiveCharacter = (updates: Partial<SwadeCharacter>) => {
    setCharacters((prev) =>
      prev.map((c) =>
        c.id === activeCharacter.id
          ? { ...c, ...updates, updatedAt: Date.now() }
          : c
      )
    );
  };

  // --- Dice Rolling Handlers ---
  const handleRollTrait = (params: {
    label: string;
    dieSides: DieSides;
    skillId?: string;
    isUnskilled?: boolean;
    baseModifier?: number;
    targetNumber?: number;
  }) => {
    const entry = executeSwadeTraitRoll({
      character: activeCharacter,
      ...params
    });
    setRollHistory((prev) => [entry, ...prev.slice(0, 29)]);
    setIsDiceTrayOpen(true);
  };

  const handleRollDamage = (params: {
    label: string;
    damageFormula: string;
    bonusRaiseD6?: boolean;
  }) => {
    const entry = executeSwadeDamageRoll({
      character: activeCharacter,
      ...params
    });
    setRollHistory((prev) => [entry, ...prev.slice(0, 29)]);
    setIsDiceTrayOpen(true);
  };

  const handleRerollWithBenny = (entry: RollLogEntry) => {
    if (activeCharacter.playState.bennies <= 0 || !entry.canRerollParams) return;

    // Deduct 1 Benny
    handleUpdateActiveCharacter({
      playState: {
        ...activeCharacter.playState,
        bennies: activeCharacter.playState.bennies - 1
      }
    });

    const p = entry.canRerollParams;
    if (p.rollType === 'damage' && p.damageFormula) {
      const noMercyBonus = activeCharacter.edges.some((e) => e.edgeId === 'no_mercy') ? '+2' : '';
      const rerollEntry = executeSwadeDamageRoll({
        character: activeCharacter,
        label: `🪙 Benny Reroll: ${p.label}`,
        damageFormula: `${p.damageFormula}${noMercyBonus}`,
        bonusRaiseD6: p.bonusRaiseD6
      });
      setRollHistory((prev) => [rerollEntry, ...prev.slice(0, 29)]);
      setIsDiceTrayOpen(true);
    } else {
      const elanBonus = activeCharacter.edges.some((e) => e.edgeId === 'elan') ? 2 : 0;
      const rerollEntry = executeSwadeTraitRoll({
        character: activeCharacter,
        label: `🪙 Benny Reroll: ${p.label}`,
        dieSides: p.dieSides,
        isUnskilled: p.isUnskilled,
        baseModifier: (p.baseModifier || 0) + elanBonus,
        targetNumber: p.targetNumber
      });
      setRollHistory((prev) => [rerollEntry, ...prev.slice(0, 29)]);
      setIsDiceTrayOpen(true);
    }
  };

  // --- Roster Handlers ---
  const handleCreateBlank = () => {
    const fresh = createBlankCharacter(`New Hero #${characters.length + 1}`);
    setCharacters((prev) => [fresh, ...prev]);
    setActiveCharacterId(fresh.id);
    setActiveMode('builder');
  };

  const handleCreateRandom = () => {
    const rand = generateRandomSwadeCharacter();
    setCharacters((prev) => [rand, ...prev]);
    setActiveCharacterId(rand.id);
  };

  const handleDuplicateCharacter = (char: SwadeCharacter) => {
    const copy: SwadeCharacter = {
      ...JSON.parse(JSON.stringify(char)),
      id: `char_${Date.now()}`,
      name: `${char.name} (Copy)`,
      updatedAt: Date.now()
    };
    setCharacters((prev) => [copy, ...prev]);
    setActiveCharacterId(copy.id);
  };

  const handleDeleteCharacter = (id: string) => {
    setCharacters((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) return [createBlankCharacter()];
      if (activeCharacterId === id) {
        setActiveCharacterId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleImportCharacters = (imported: SwadeCharacter[]) => {
    setCharacters((prev) => {
      const map = new Map<string, SwadeCharacter>();
      prev.forEach((c) => map.set(c.id, c));
      imported.forEach((c) => map.set(c.id, c));
      return Array.from(map.values());
    });
    if (imported[0]) {
      setActiveCharacterId(imported[0].id);
    }
  };

  const latestRoll = rollHistory[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        character={activeCharacter}
        totalCharacters={characters.length}
        activeMode={activeMode}
        onSetMode={setActiveMode}
        onOpenRoster={() => setRosterModalMode('roster')}
        onOpenBackup={() => setRosterModalMode('backup')}
        onOpenDiceTray={() => setIsDiceTrayOpen(true)}
      />

      <main
        style={{
          flex: 1,
          maxWidth: 1180,
          width: '100%',
          margin: '0 auto',
          padding: '14px 14px 100px'
        }}
      >
        {activeMode === 'roster' ? (
          <CharacterListView
            characters={characters}
            activeCharacterId={activeCharacterId}
            onSelectCharacter={(id, mode) => {
              setActiveCharacterId(id);
              setActiveMode(mode);
            }}
            onCreateBlank={handleCreateBlank}
            onCreateRandom={handleCreateRandom}
            onDuplicateCharacter={handleDuplicateCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onOpenBackup={() => setRosterModalMode('backup')}
          />
        ) : activeMode === 'builder' ? (
          <BuilderView
            character={activeCharacter}
            onUpdateCharacter={handleUpdateActiveCharacter}
            onRollTrait={handleRollTrait}
          />
        ) : (
          <PlayModeView
            character={activeCharacter}
            onUpdateCharacter={handleUpdateActiveCharacter}
            onRollTrait={handleRollTrait}
            onRollDamage={handleRollDamage}
          />
        )}
      </main>

      {/* Bottom Floating Roll Result Bar (Hidden in Builder and Roster modes) */}
      {latestRoll && !isDiceTrayOpen && activeMode === 'play' && (
        <div
          onClick={() => setIsDiceTrayOpen(true)}
          style={{
            position: 'fixed',
            bottom: 'calc(var(--safe-bottom) + 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 24px)',
            maxWidth: 560,
            background: latestRoll.isCriticalFailure
              ? 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)'
              : latestRoll.raises > 0
              ? 'linear-gradient(135deg, #78350f 0%, #451a03 100%)'
              : '#1e1915',
            border: `2px solid ${
              latestRoll.isCriticalFailure
                ? '#ef4444'
                : latestRoll.raises > 0
                ? '#fbbf24'
                : latestRoll.isSuccess
                ? '#22c55e'
                : 'var(--border-strong)'
            }`,
            borderRadius: 16,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.75)',
            cursor: 'pointer',
            zIndex: 45
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: '0.86rem',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              🎲 {latestRoll.label}
            </div>
            <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
              d{latestRoll.traitDieResult.sides}: [{latestRoll.traitDieResult.rolls.join('+')}]
              {latestRoll.usedWildDie && latestRoll.wildDieResult
                ? ` • Wild d6: [${latestRoll.wildDieResult.rolls.join('+')}]`
                : ''}
              {latestRoll.modifier !== 0
                ? ` • Mod: ${latestRoll.modifier > 0 ? `+${latestRoll.modifier}` : latestRoll.modifier}`
                : ''}
              {' '}• Tap for Details / Reroll
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span
              style={{
                padding: '4px 9px',
                borderRadius: 8,
                fontSize: '0.74rem',
                fontWeight: 900,
                background: latestRoll.isCriticalFailure
                  ? '#ef4444'
                  : latestRoll.raises > 0
                  ? '#f59e0b'
                  : latestRoll.isSuccess
                  ? '#22c55e'
                  : 'rgba(255,255,255,0.1)',
                color: latestRoll.raises > 0 ? '#110d08' : '#fff'
              }}
            >
              {latestRoll.isCriticalFailure
                ? 'CRIT FAIL'
                : latestRoll.rollType === 'damage'
                ? 'DMG'
                : latestRoll.raises > 0
                ? `+${latestRoll.raises} RAISE`
                : latestRoll.isSuccess
                ? 'SUCCESS'
                : 'FAIL'}
            </span>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fbbf24' }}>
              {latestRoll.finalTotal}
            </span>
          </div>
        </div>
      )}

      {/* Modals */}
      {isDiceTrayOpen && (
        <DiceRollerModal
          character={activeCharacter}
          rollHistory={rollHistory}
          onClose={() => setIsDiceTrayOpen(false)}
          onClearHistory={() => setRollHistory([])}
          onRollTrait={handleRollTrait}
          onRerollWithBenny={handleRerollWithBenny}
        />
      )}

      {rosterModalMode && (
        <RosterAndBackupModal
          mode={rosterModalMode}
          characters={characters}
          activeCharacterId={activeCharacter.id}
          onSelectCharacter={setActiveCharacterId}
          onCreateBlank={handleCreateBlank}
          onCreateRandom={handleCreateRandom}
          onDuplicateCharacter={handleDuplicateCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          onImportCharacters={handleImportCharacters}
          onResetSamples={() => {
            setCharacters(SAMPLE_CHARACTERS);
            setActiveCharacterId(SAMPLE_CHARACTERS[0].id);
          }}
          onClose={() => setRosterModalMode(null)}
        />
      )}
    </div>
  );
};

export default App;
