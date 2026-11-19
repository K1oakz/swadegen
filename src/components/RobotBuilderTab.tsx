import React, { useState } from 'react';
import { SwadeCharacter, RobotConfig, InstalledRobotMod } from '../types/swade';
import {
  RobotFrameDef,
  RobotModDef,
  SWADE_ROBOT_FRAMES,
  SWADE_ROBOTIC_MODS,
  STOCK_ROBOT_PRESETS
} from '../data/robotData';

interface RobotBuilderTabProps {
  character: SwadeCharacter;
  onUpdateCharacter: (updates: Partial<SwadeCharacter>) => void;
  onNextTab: () => void;
  onPrevTab: () => void;
}

export const RobotBuilderTab: React.FC<RobotBuilderTabProps> = ({
  character,
  onUpdateCharacter,
  onNextTab,
  onPrevTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'negative' | 'core' | 'defensive' | 'locomotion' | 'offensive'
  >('all');
  const [modSearch, setModSearch] = useState('');

  // Initialize robotConfig if not present
  const currentConfig: RobotConfig = character.robotConfig || {
    frameSize: 0,
    frameName: 'Standard Humanoid (Size 0)',
    baseSlots: 3,
    baseWeight: '250 lbs',
    baseCost: 10000,
    installedMods: [
      {
        id: 'pacifist_circuits',
        name: 'Pacifist (Asimov Circuits)',
        category: 'negative',
        slots: -1,
        cost: -5000,
        count: 1,
        description: 'Hardwired Isaac Asimov Three Laws programming prevents harming any sentient living being.',
        effect: 'Pacifist (Major), +1 Mod Slot'
      }
    ]
  };

  const selectedFrame =
    SWADE_ROBOT_FRAMES.find((f) => f.size === currentConfig.frameSize) || SWADE_ROBOT_FRAMES[4];

  // Calculate Slots:
  // Base slots from frame
  const baseSlots = selectedFrame.baseSlots;
  // Negative mods grant slots back (slots is negative, so subtracting slots adds to budget)
  const bonusSlotsFromNegatives = currentConfig.installedMods
    .filter((m) => m.slots < 0)
    .reduce((sum, m) => sum + Math.abs(m.slots) * m.count, 0);

  const totalSlotBudget = baseSlots + bonusSlotsFromNegatives;

  // Consumed slots from positive mods
  const slotsSpent = currentConfig.installedMods
    .filter((m) => m.slots > 0)
    .reduce((sum, m) => sum + m.slots * m.count, 0);

  const remainingSlots = totalSlotBudget - slotsSpent;

  // Total Robot Cost:
  const baseChassisCost = selectedFrame.cost;
  const modsCost = currentConfig.installedMods.reduce((sum, m) => sum + m.cost * m.count, 0);
  const totalCost = Math.max(0, baseChassisCost + modsCost);

  // Handlers
  const handleSelectFrame = (frame: RobotFrameDef) => {
    const nextConfig: RobotConfig = {
      ...currentConfig,
      frameSize: frame.size,
      frameName: frame.name,
      baseSlots: frame.baseSlots,
      baseWeight: frame.weight,
      baseCost: frame.cost
    };
    onUpdateCharacter({ robotConfig: nextConfig });
  };

  const handleAddMod = (mod: RobotModDef) => {
    const existingIdx = currentConfig.installedMods.findIndex((m) => m.id === mod.id);
    let nextMods: InstalledRobotMod[];

    if (existingIdx >= 0) {
      const existing = currentConfig.installedMods[existingIdx];
      if (mod.maxAllowed && existing.count >= mod.maxAllowed) return; // reached max
      nextMods = [...currentConfig.installedMods];
      nextMods[existingIdx] = {
        ...existing,
        count: existing.count + 1
      };
    } else {
      nextMods = [
        ...currentConfig.installedMods,
        {
          id: mod.id,
          name: mod.name,
          category: mod.category,
          slots: mod.slots,
          cost: mod.cost,
          count: 1,
          description: mod.summary,
          effect: mod.effect,
          armorBonus: mod.armorBonus,
          toughnessBonus: mod.toughnessBonus,
          paceBonus: mod.paceBonus
        }
      ];
    }

    onUpdateCharacter({
      robotConfig: {
        ...currentConfig,
        installedMods: nextMods
      }
    });
  };

  const handleRemoveMod = (modId: string) => {
    const existingIdx = currentConfig.installedMods.findIndex((m) => m.id === modId);
    if (existingIdx < 0) return;

    let nextMods: InstalledRobotMod[];
    const existing = currentConfig.installedMods[existingIdx];

    if (existing.count > 1) {
      nextMods = [...currentConfig.installedMods];
      nextMods[existingIdx] = {
        ...existing,
        count: existing.count - 1
      };
    } else {
      nextMods = currentConfig.installedMods.filter((m) => m.id !== modId);
    }

    onUpdateCharacter({
      robotConfig: {
        ...currentConfig,
        installedMods: nextMods
      }
    });
  };

  const handleApplyPreset = (preset: typeof STOCK_ROBOT_PRESETS[0]) => {
    const frame = SWADE_ROBOT_FRAMES.find((f) => f.size === preset.size) || selectedFrame;
    const installed: InstalledRobotMod[] = [];

    preset.mods.forEach((pm) => {
      const def = SWADE_ROBOTIC_MODS.find((m) => m.id === pm.modId);
      if (def) {
        installed.push({
          id: def.id,
          name: def.name,
          category: def.category,
          slots: def.slots,
          cost: def.cost,
          count: pm.count,
          description: def.summary,
          effect: def.effect,
          armorBonus: def.armorBonus,
          toughnessBonus: def.toughnessBonus,
          paceBonus: def.paceBonus
        });
      }
    });

    onUpdateCharacter({
      robotConfig: {
        frameSize: frame.size,
        frameName: frame.name,
        baseSlots: frame.baseSlots,
        baseWeight: frame.weight,
        baseCost: frame.cost,
        installedMods: installed
      }
    });
  };

  const filteredMods = SWADE_ROBOTIC_MODS.filter((m) => {
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
    if (
      modSearch.trim() &&
      !m.name.toLowerCase().includes(modSearch.toLowerCase()) &&
      !m.summary.toLowerCase().includes(modSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 1. Header & Summary */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: 18
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🤖</span> ROBOT CHASSIS & MODIFICATIONS
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4, maxWidth: 650 }}>
              From the <strong>SWADE Science Fiction Companion</strong>. Choose your robot frame size and customize its core, defensive, locomotion, and offensive systems. Negative qualities award extra Mod slots back!
            </p>
          </div>

          {/* Quick Slot Budget Gauge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(0, 0, 0, 0.4)',
              border: `1.5px solid ${remainingSlots < 0 ? '#ef4444' : '#38bdf8'}`,
              borderRadius: 12,
              padding: '8px 14px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800 }}>MOD SLOTS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: remainingSlots < 0 ? '#ef4444' : '#38bdf8' }}>
                {slotsSpent} / {totalSlotBudget}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800 }}>REMAINING</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: remainingSlots >= 0 ? '#4ade80' : '#ef4444' }}>
                {remainingSlots}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 12 }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800 }}>EST. COST</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fbbf24' }}>
                ${totalCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Archetype Presets */}
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 8 }}>
            LOAD STOCK ROBOT ARCHETYPE (SWADE SCI-FI COMPANION PG. 138):
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {STOCK_ROBOT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 9,
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#bae6fd',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Robot Frame / Chassis Selection */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: 16
        }}
      >
        <h4 style={{ fontSize: '0.92rem', fontWeight: 900, color: '#a855f7', marginBottom: 6 }}>
          1. SELECT ROBOT CHASSIS & SIZE
        </h4>
        <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Frame size determines base weight, Toughness/Size scale, and starting Mod slots.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 10
          }}
        >
          {SWADE_ROBOT_FRAMES.map((frame) => {
            const isSelected = frame.size === currentConfig.frameSize;
            return (
              <button
                key={frame.size}
                type="button"
                onClick={() => handleSelectFrame(frame)}
                style={{
                  textAlign: 'left',
                  padding: 12,
                  borderRadius: 12,
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(126, 34, 206, 0.2))'
                    : 'rgba(0, 0, 0, 0.28)',
                  border: isSelected ? '2px solid #a855f7' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isSelected ? '#f3e8ff' : '#fff' }}>
                    {frame.name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      padding: '2px 6px',
                      borderRadius: 6,
                      background: isSelected ? '#a855f7' : 'rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#fff' : 'var(--text-muted)'
                    }}
                  >
                    {frame.baseSlots} Slots
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Weight: {frame.weight} • Base Cost: ${frame.cost.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.71rem', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.3 }}>
                  {frame.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Installed Modifications Overview */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: 16
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 900, color: '#38bdf8' }}>
            2. INSTALLED MODIFICATIONS ({currentConfig.installedMods.length})
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            Spent: {slotsSpent} Slots • Net Cost: ${modsCost.toLocaleString()}
          </span>
        </div>

        {currentConfig.installedMods.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '18px 12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            No modifications installed yet. Browse the catalog below to add robot mods!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentConfig.installedMods.map((mod) => (
              <div
                key={mod.id}
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>
                      {mod.name} {mod.count > 1 ? `(x${mod.count})` : ''}
                    </span>
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 900,
                        padding: '2px 6px',
                        borderRadius: 6,
                        background:
                          mod.category === 'negative'
                            ? 'rgba(34, 197, 94, 0.2)'
                            : mod.category === 'defensive'
                            ? 'rgba(56, 189, 248, 0.2)'
                            : mod.category === 'locomotion'
                            ? 'rgba(234, 179, 8, 0.2)'
                            : mod.category === 'offensive'
                            ? 'rgba(239, 68, 68, 0.2)'
                            : 'rgba(168, 85, 247, 0.2)',
                        color:
                          mod.category === 'negative'
                            ? '#86efac'
                            : mod.category === 'defensive'
                            ? '#7dd3fc'
                            : mod.category === 'locomotion'
                            ? '#fef08a'
                            : mod.category === 'offensive'
                            ? '#fca5a5'
                            : '#d8b4fe'
                      }}
                    >
                      {mod.slots < 0
                        ? `+${Math.abs(mod.slots) * mod.count} SLOTS`
                        : `${mod.slots * mod.count} SLOTS`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {mod.effect || mod.description} • Cost: ${mod.cost.toLocaleString()} each
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => handleRemoveMod(mod.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'rgba(239, 68, 68, 0.18)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      color: '#fca5a5',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Robotic Modifications Catalog */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: 16
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 900, color: '#fbbf24' }}>
            3. ROBOTIC MODIFICATIONS CATALOG ({filteredMods.length})
          </h4>
          <input
            type="text"
            placeholder="Search mods..."
            value={modSearch}
            onChange={(e) => setModSearch(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.76rem',
              width: 180
            }}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {[
            { id: 'all', label: 'All Mods' },
            { id: 'negative', label: '🔻 Negative (+Slots)' },
            { id: 'core', label: '⚙️ Core Systems' },
            { id: 'defensive', label: '🛡️ Defensive' },
            { id: 'locomotion', label: '🚀 Locomotion' },
            { id: 'offensive', label: '⚔️ Offensive' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as any)}
              style={{
                padding: '6px 11px',
                borderRadius: 8,
                fontSize: '0.74rem',
                fontWeight: 800,
                background: selectedCategory === cat.id ? '#f59e0b' : 'rgba(255, 255, 255, 0.07)',
                color: selectedCategory === cat.id ? '#110d08' : 'var(--text-secondary)',
                border: selectedCategory === cat.id ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mods Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 10
          }}
        >
          {filteredMods.map((mod) => {
            const installed = currentConfig.installedMods.find((m) => m.id === mod.id);
            const count = installed ? installed.count : 0;
            const isMax = mod.maxAllowed && count >= mod.maxAllowed;

            return (
              <div
                key={mod.id}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background: count > 0 ? 'rgba(56, 189, 248, 0.08)' : 'rgba(0, 0, 0, 0.3)',
                  border: count > 0 ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 8
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff' }}>
                      {mod.name}
                    </div>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 900,
                        padding: '2px 6px',
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                        background:
                          mod.slots < 0
                            ? 'rgba(34, 197, 94, 0.2)'
                            : mod.slots === 0
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(245, 158, 11, 0.2)',
                        color:
                          mod.slots < 0 ? '#86efac' : mod.slots === 0 ? 'var(--text-muted)' : '#fde047'
                      }}
                    >
                      {mod.slots < 0
                        ? `+${Math.abs(mod.slots)} Slot`
                        : mod.slots === 0
                        ? '0 Slots'
                        : `${mod.slots} Slot${mod.slots > 1 ? 's' : ''}`}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Cost: {mod.cost < 0 ? `-$${Math.abs(mod.cost).toLocaleString()}` : `$${mod.cost.toLocaleString()}`}
                    {mod.maxAllowed ? ` • Max: ${mod.maxAllowed}` : ''}
                  </div>

                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.35 }}>
                    {mod.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>
                    {count > 0 ? `Installed: ${count}${mod.maxAllowed ? `/${mod.maxAllowed}` : ''}` : ''}
                  </span>

                  <div style={{ display: 'flex', gap: 6 }}>
                    {count > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMod(mod.id)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#fca5a5',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        −
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleAddMod(mod)}
                      disabled={Boolean(isMax)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 8,
                        background: isMax
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                        color: isMax ? 'var(--text-muted)' : '#082f49',
                        fontWeight: 900,
                        fontSize: '0.76rem',
                        cursor: isMax ? 'not-allowed' : 'pointer',
                        border: 'none'
                      }}
                    >
                      {isMax ? 'Maxed' : count > 0 ? '+ Add More' : '+ Add Mod'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <button
          type="button"
          onClick={onPrevTab}
          style={{
            padding: '11px 20px',
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '0.86rem',
            cursor: 'pointer'
          }}
        >
          ← Back to Identity & Ancestry
        </button>

        <button
          type="button"
          onClick={onNextTab}
          style={{
            padding: '11px 24px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
            border: '1px solid #7dd3fc',
            color: '#082f49',
            fontWeight: 900,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>Continue to Hindrances</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
};
