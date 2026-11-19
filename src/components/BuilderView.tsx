import React, { useState, useEffect, useRef } from 'react';
import { RobotBuilderTab } from './RobotBuilderTab';
import {
  AdvanceEntry,
  ArcaneBackgroundId,
  AttributeId,
  DieSides,
  EdgeCategory,
  HindranceSeverity,
  RankName,
  SwadeCharacter
} from '../types/swade';
import {
  ATTRIBUTE_META,
  SWADE_ANCESTRIES,
  SWADE_ARCANE_BACKGROUNDS,
  SWADE_ARMOR_CATALOG,
  SWADE_EDGES,
  SWADE_HINDRANCES,
  SWADE_POWERS,
  SWADE_SOURCE_BOOKS,
  SWADE_WEAPONS_CATALOG
} from '../data/swadeData';
import {
  calculateAttributePoints,
  calculateDerivedStats,
  calculateEdgeBudget,
  calculateHindrancePointsEarned,
  calculateHindrancePointsSpent,
  calculateSingleSkillCost,
  calculateSkillPoints,
  checkEdgeRequirements,
  formatDie,
  getAncestry,
  getRankFromAdvances,
  stepDieDown,
  stepDieUp
} from '../utils/swadeRules';

interface BuilderViewProps {
  character: SwadeCharacter;
  onUpdateCharacter: (updates: Partial<SwadeCharacter>) => void;
  onRollTrait: (params: {
    label: string;
    dieSides: DieSides;
    isUnskilled?: boolean;
    baseModifier?: number;
  }) => void;
}

type BuilderTab =
  | 'sources'
  | 'identity'
  | 'robot'
  | 'hindrances'
  | 'attributes'
  | 'skills'
  | 'edges'
  | 'powers'
  | 'gear';

export const BuilderView: React.FC<BuilderViewProps> = ({
  character,
  onUpdateCharacter,
  onRollTrait
}) => {
  const [activeTab, setActiveTab] = useState<BuilderTab>('sources');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onUpdateCharacter({ avatarImage: compressedDataUrl });
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const isRobot = character.ancestryId === 'robot';

  useEffect(() => {
    if (activeTab === 'robot' && !isRobot) {
      setActiveTab('identity');
    }
  }, [isRobot, activeTab]);

  const robotConfig = character.robotConfig;
  const robotBaseSlots = robotConfig?.baseSlots ?? 3;
  const robotBonusSlots =
    robotConfig?.installedMods
      .filter((m) => m.slots < 0)
      .reduce((sum, m) => sum + Math.abs(m.slots) * m.count, 0) ?? 0;
  const robotTotalSlots = robotBaseSlots + robotBonusSlots;
  const robotSlotsSpent =
    robotConfig?.installedMods
      .filter((m) => m.slots > 0)
      .reduce((sum, m) => sum + m.slots * m.count, 0) ?? 0;

  // Filter states
  const [hindranceSearch, setHindranceSearch] = useState('');
  const [hindranceOnlyAvailable, setHindranceOnlyAvailable] = useState(false);
  const [skillFilterAttr, setSkillFilterAttr] = useState<AttributeId | 'all' | 'trained'>('all');
  const [skillSearch, setSkillSearch] = useState('');
  const [edgeCategoryFilter, setEdgeCategoryFilter] = useState<EdgeCategory | 'All'>('All');
  const [edgeOnlyValid, setEdgeOnlyValid] = useState(false);
  const [edgeSearch, setEdgeSearch] = useState('');
  const [powerSearch, setPowerSearch] = useState('');

  // Custom entry states
  const [customHindName, setCustomHindName] = useState('');
  const [customHindSeverity, setCustomHindSeverity] = useState<HindranceSeverity>('Minor');
  const [customHindSummary, setCustomHindSummary] = useState('');

  const [customSkillName, setCustomSkillName] = useState('');
  const [customSkillAttr, setCustomSkillAttr] = useState<AttributeId>('smarts');

  const [customEdgeName, setCustomEdgeName] = useState('');
  const [customEdgeCat, setCustomEdgeCat] = useState<EdgeCategory>('Background');
  const [customEdgeSummary, setCustomEdgeSummary] = useState('');

  const [newAdvType, setNewAdvType] = useState<AdvanceEntry['type']>('Edge');
  const [newAdvDesc, setNewAdvDesc] = useState('');

  const [customGearName, setCustomGearName] = useState('');
  const [customGearWeight, setCustomGearWeight] = useState('1');
  const [customGearCost, setCustomGearCost] = useState('10');

  // Derived & Point budgets
  const ancestry = getAncestry(character.ancestryId);
  const derived = calculateDerivedStats(character);
  const hindEarned = calculateHindrancePointsEarned(character);
  const hindSpent = calculateHindrancePointsSpent(character);
  const hindRemaining = hindEarned.cappedTotal - hindSpent;
  const attrPts = calculateAttributePoints(character);
  const skillPts = calculateSkillPoints(character);
  const edgePts = calculateEdgeBudget(character);

  // Handlers
  const handleSelectAncestry = (newAncestryId: string) => {
    const newAnc = getAncestry(newAncestryId);
    const updatedAttrs = { ...character.attributes };
    (Object.keys(updatedAttrs) as AttributeId[]).forEach((attr) => {
      const minDie: DieSides = newAnc.attributeBonuses?.[attr] ? 6 : 4;
      if (updatedAttrs[attr] < minDie) {
        updatedAttrs[attr] = minDie;
      }
    });

    const updatedSkills = character.skills.map((sk) => {
      const bonusSteps = newAnc.skillBonuses?.[sk.skillId] || 0;
      const minDie: DieSides | 0 = bonusSteps > 0 ? 6 : sk.isCore ? 4 : 0;
      return {
        ...sk,
        die: sk.die < minDie ? minDie : sk.die
      };
    });

    onUpdateCharacter({
      ancestryId: newAncestryId,
      attributes: updatedAttrs,
      skills: updatedSkills
    });
  };

  const handleAdjustHindranceAlloc = (key: keyof SwadeCharacter['hindranceAllocation'], delta: number) => {
    const current = character.hindranceAllocation[key];
    const next = Math.max(0, current + delta);
    onUpdateCharacter({
      hindranceAllocation: {
        ...character.hindranceAllocation,
        [key]: next
      }
    });
  };

  const tabs: { id: BuilderTab; label: string; badge?: string; badgeAlert?: boolean }[] = [
    {
      id: 'sources',
      label: '1. Source Books',
      badge: `${(character.sourceBooks || ['core']).length} Active`
    },
    { id: 'identity', label: '2. Identity & Ancestry' },
    ...(isRobot
      ? [
          {
            id: 'robot' as BuilderTab,
            label: '3. Robot Options',
            badge: `${robotSlotsSpent}/${robotTotalSlots} Slots`,
            badgeAlert: robotSlotsSpent > robotTotalSlots
          }
        ]
      : []),
    {
      id: 'hindrances',
      label: `${isRobot ? '4' : '3'}. Hindrances`,
      badge: `${hindSpent}/${hindEarned.cappedTotal} pts`,
      badgeAlert: hindRemaining !== 0
    },
    {
      id: 'attributes',
      label: `${isRobot ? '5' : '4'}. Attributes`,
      badge: `${attrPts.spent}/${attrPts.budget}`,
      badgeAlert: attrPts.remaining !== 0
    },
    {
      id: 'skills',
      label: `${isRobot ? '6' : '5'}. Skills`,
      badge: `${skillPts.spent}/${skillPts.budget}`,
      badgeAlert: skillPts.remaining !== 0
    },
    {
      id: 'edges',
      label: `${isRobot ? '7' : '6'}. Edges & Advances`,
      badge: `${edgePts.spent}/${edgePts.budget}`,
      badgeAlert: edgePts.remaining !== 0
    },
    {
      id: 'powers',
      label: `${isRobot ? '8' : '7'}. Powers`,
      badge: character.powers.length > 0 ? `${character.powers.length}` : undefined
    },
    {
      id: 'gear',
      label: `${isRobot ? '9' : '8'}. Weapons & Gear`,
      badge: `$${character.currency}`
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Step Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 4
        }}
      >
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 13px',
                borderRadius: 11,
                whiteSpace: 'nowrap',
                fontSize: '0.8rem',
                fontWeight: 800,
                background: active
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'var(--bg-card)',
                color: active ? '#120d08' : 'var(--text-secondary)',
                border: active ? '1px solid #fbbf24' : '1px solid var(--border-subtle)'
              }}
            >
              <span>{t.label}</span>
              {t.badge && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '1px 6px',
                    borderRadius: 99,
                    background: active
                      ? 'rgba(0, 0, 0, 0.25)'
                      : t.badgeAlert
                      ? 'rgba(56, 189, 248, 0.2)'
                      : 'rgba(34, 197, 94, 0.2)',
                    color: active ? '#fff' : t.badgeAlert ? '#38bdf8' : '#4ade80',
                    fontWeight: 900
                  }}
                >
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

            {/* TAB 1: SOURCE BOOKS SELECTION */}
      {activeTab === 'sources' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#a855f7', display: 'flex', alignItems: 'center', gap: 8 }}>
                  STEP 1: SELECT RULEBOOKS & SOURCE BOOKS
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Choose which books and companions apply to this character. All ancestries, hindrances, edges, powers, and armory choices in the following steps will be strictly restricted to your selected source books.
                </p>
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#f3e8ff',
                  background: 'rgba(168, 85, 247, 0.25)',
                  border: '1px solid #a855f7',
                  padding: '4px 10px',
                  borderRadius: 10,
                  fontWeight: 800
                }}
              >
                {(character.sourceBooks || ['core']).length} Active Book{(character.sourceBooks || ['core']).length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '14px 0 18px 0' }}>
              <button
                type="button"
                onClick={() => onUpdateCharacter({ sourceBooks: ['core'] })}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Core Rules Only
              </button>
              <button
                type="button"
                onClick={() => onUpdateCharacter({ sourceBooks: ['core', 'scifi'] })}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid #38bdf8',
                  color: '#bae6fd',
                  cursor: 'pointer'
                }}
              >
                Sci-Fi Campaign (Core + Sci-Fi)
              </button>
              <button
                type="button"
                onClick={() => onUpdateCharacter({ sourceBooks: ['scifi'] })}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid #a855f7',
                  color: '#f3e8ff',
                  cursor: 'pointer'
                }}
              >
                Sci-Fi Companion Only
              </button>
            </div>

            {/* Source Books Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 12
              }}
            >
              {SWADE_SOURCE_BOOKS.map((book) => {
                const activeBooks = character.sourceBooks || ['core'];
                const isEnabled = activeBooks.includes(book.id);
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => {
                      const next = isEnabled
                        ? activeBooks.filter((id) => id !== book.id)
                        : [...activeBooks, book.id];
                      onUpdateCharacter({ sourceBooks: next.length > 0 ? next : ['core'] });
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      borderRadius: 14,
                      background: isEnabled
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(126, 34, 206, 0.2))'
                        : 'rgba(0, 0, 0, 0.3)',
                      border: isEnabled ? '2px solid #a855f7' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '1.8rem', lineHeight: 1, marginTop: 2 }}>{book.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isEnabled ? '#f3e8ff' : 'var(--text-secondary)' }}>
                          {book.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 900,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: isEnabled ? '#a855f7' : 'rgba(255, 255, 255, 0.08)',
                            color: isEnabled ? '#fff' : 'var(--text-muted)'
                          }}
                        >
                          {isEnabled ? '✓ ACTIVE' : 'OFF'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                        {book.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Step Banner */}
            <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setActiveTab('identity')}
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                  border: '1px solid #c084fc',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(168, 85, 247, 0.35)'
                }}
              >
                <span>Continue to Step 2: Identity & Ancestry</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IDENTITY & ANCESTRY */}
      {activeTab === 'identity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Basic Identity Card */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fbbf24', marginBottom: 12 }}>
              CHARACTER IDENTITY
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: 12,
                marginBottom: 14
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 700 }}>
                  CHARACTER NAME
                </label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => onUpdateCharacter({ name: e.target.value })}
                  placeholder="e.g. Valeria Stormblade"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 700 }}>
                  CONCEPT / ARCHETYPE
                </label>
                <input
                  type="text"
                  value={character.concept}
                  onChange={(e) => onUpdateCharacter({ concept: e.target.value })}
                  placeholder="e.g. Rift-Walking Bounty Hunter"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 700 }}>
                  CAMPAIGN / SETTING
                </label>
                <input
                  type="text"
                  value={character.setting}
                  onChange={(e) => onUpdateCharacter({ setting: e.target.value })}
                  placeholder="e.g. Deadlands, Pathfinder, Sci-Fi"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Character Portrait & Image Management */}
            <div
              style={{
                marginBottom: 14,
                padding: '14px 16px',
                borderRadius: 14,
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#fbbf24', marginBottom: 10, fontWeight: 800, textTransform: 'uppercase' }}>
                Character Portrait / Image
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Image Preview Box */}
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 12,
                    background: '#1a1511',
                    border: '1.5px solid var(--border-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  {character.avatarImage ? (
                    <img
                      src={character.avatarImage}
                      alt={character.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-muted)' }}>
                      {character.name.trim().charAt(0).toUpperCase() || 'H'}
                    </span>
                  )}
                </div>

                {/* Upload & Link Controls */}
                <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#120d08',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      Upload Image File
                    </button>

                    {character.avatarImage && (
                      <button
                        type="button"
                        onClick={() => onUpdateCharacter({ avatarImage: '' })}
                        style={{
                          padding: '7px 12px',
                          borderRadius: 8,
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid #ef4444',
                          color: '#fca5a5',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Or paste direct image URL (https://...)"
                      value={character.avatarImage || ''}
                      onChange={(e) => onUpdateCharacter({ avatarImage: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                        background: 'rgba(0, 0, 0, 0.4)'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Upload an image file from your device (JPG/PNG) or enter an image web URL.
                  </div>
                </div>
              </div>
            </div>

            {/* Character Tier Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 5, fontWeight: 700 }}>
                  CHARACTER TIER
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateCharacter({ isWildCard: !character.isWildCard })}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 10,
                    background: character.isWildCard
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${character.isWildCard ? '#f59e0b' : 'var(--border-subtle)'}`,
                    color: character.isWildCard ? '#fbbf24' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                >
                  {character.isWildCard
                    ? 'Wild Card (d6 Wild Die, 3 Wounds, 3 Bennies)'
                    : 'Extra / Henchman (No Wild Die, 1 Wound)'}
                </button>
              </div>
            </div>
          </div>

          {/* Ancestry Selection Grid */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#38bdf8', marginBottom: 4 }}>
              ANCESTRY / RACE
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Your Ancestry grants automatic starting Attribute/Skill bonuses, free Edges (Human), and racial traits.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 10
              }}
            >
              {SWADE_ANCESTRIES.filter((anc) => {
                const activeBooks = character.sourceBooks && character.sourceBooks.length > 0 ? character.sourceBooks : ['core'];
                if (anc.source === 'custom') return true;
                return activeBooks.includes(anc.source || 'core');
              }).map((anc) => {
                const selected = character.ancestryId === anc.id;
                return (
                  <button
                    key={anc.id}
                    onClick={() => handleSelectAncestry(anc.id)}
                    style={{
                      textAlign: 'left',
                      padding: 13,
                      borderRadius: 12,
                      background: selected
                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.15))'
                        : 'rgba(0, 0, 0, 0.35)',
                      border: selected ? '2px solid #f59e0b' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.94rem', color: selected ? '#fbbf24' : '#fff' }}>
                          {anc.name}
                        </span>
                        {selected && (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              padding: '2px 7px',
                              borderRadius: 99,
                              background: '#f59e0b',
                              color: '#110d08',
                              fontWeight: 900
                            }}
                          >
                            SELECTED
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        {anc.summary}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {anc.traits.map((tr, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.67rem',
                            padding: '2px 6px',
                            borderRadius: 5,
                            background: 'rgba(255, 255, 255, 0.07)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {tr.name}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Setting Rules & Backstory */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 14
            }}
          >
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: 16
              }}
            >
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fbbf24', marginBottom: 10 }}>
                OPTIONAL SWADE SETTING RULES
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={() =>
                    onUpdateCharacter({
                      settingRules: {
                        ...character.settingRules,
                        bornAHero: !character.settingRules.bornAHero
                      }
                    })
                  }
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: character.settingRules.bornAHero
                      ? 'rgba(34, 197, 94, 0.16)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${character.settingRules.bornAHero ? '#22c55e' : 'var(--border-subtle)'}`,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>
                    {character.settingRules.bornAHero ? '✅' : '⬜'} Born a Hero
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Grants +1 free Edge at creation and ignores Rank requirements for Edges.
                  </div>
                </button>

                <button
                  onClick={() =>
                    onUpdateCharacter({
                      settingRules: {
                        ...character.settingRules,
                        moreSkillPoints: !character.settingRules.moreSkillPoints
                      }
                    })
                  }
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: character.settingRules.moreSkillPoints
                      ? 'rgba(34, 197, 94, 0.16)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${character.settingRules.moreSkillPoints ? '#22c55e' : 'var(--border-subtle)'}`,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>
                    {character.settingRules.moreSkillPoints ? '✅' : '⬜'} More Skill Points (15 Base)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Increases base starting Skill Points from 12 to 15.
                  </div>
                </button>

                <button
                  onClick={() =>
                    onUpdateCharacter({
                      settingRules: {
                        ...character.settingRules,
                        unarmoredHero: !character.settingRules.unarmoredHero
                      }
                    })
                  }
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: character.settingRules.unarmoredHero
                      ? 'rgba(34, 197, 94, 0.16)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${character.settingRules.unarmoredHero ? '#22c55e' : 'var(--border-subtle)'}`,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>
                    {character.settingRules.unarmoredHero ? '✅' : '⬜'} Unarmored Hero (+2 Toughness)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Wild Cards wearing no armor gain +2 bonus to Toughness.
                  </div>
                </button>
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}
            >
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fbbf24' }}>
                BACKSTORY & CAMPAIGN NOTES
              </h4>
              <textarea
                rows={3}
                value={character.backstory}
                onChange={(e) => onUpdateCharacter({ backstory: e.target.value })}
                placeholder="Character origin, motivation, allies, and enemies..."
                style={{ width: '100%' }}
              />
              <textarea
                rows={2}
                value={character.notes}
                onChange={(e) => onUpdateCharacter({ notes: e.target.value })}
                placeholder="Tactical reminders, loot notes, or quest objectives..."
                style={{ width: '100%' }}
              />
            </div>

            {/* Continue to Next Banner */}
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setActiveTab(isRobot ? 'robot' : 'hindrances')}
                style={{
                  padding: '11px 22px',
                  borderRadius: 12,
                  background: isRobot
                    ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
                    : 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                  border: `1px solid ${isRobot ? '#c084fc' : '#7dd3fc'}`,
                  color: isRobot ? '#fff' : '#082f49',
                  fontWeight: 900,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span>{isRobot ? 'Continue to Step 3: Robot Options' : 'Continue to Step 3: Hindrances'}</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROBOT OPTIONS TAB (Only displayed when Robot ancestry is active) */}
      {activeTab === 'robot' && isRobot && (
        <RobotBuilderTab
          character={character}
          onUpdateCharacter={onUpdateCharacter}
          onNextTab={() => setActiveTab('hindrances')}
          onPrevTab={() => setActiveTab('identity')}
        />
      )}

      {/* TAB 3: HINDRANCES & 4-POINT ALLOCATOR */}
      {activeTab === 'hindrances' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Hindrance Point Allocator Card */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 12
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fbbf24' }}>
                  HINDRANCE POINT ALLOCATION (Max 4 Points)
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  Major Hindrances grant <strong>2 pts</strong>; Minor Hindrances grant <strong>1 pt</strong> (up to 4 pts max). Spend your earned points below:
                </p>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 10,
                  background:
                    hindRemaining === 0
                      ? 'rgba(34, 197, 94, 0.2)'
                      : hindRemaining > 0
                      ? 'rgba(56, 189, 248, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${
                    hindRemaining === 0 ? '#22c55e' : hindRemaining > 0 ? '#38bdf8' : '#ef4444'
                  }`,
                  fontWeight: 900,
                  fontSize: '0.84rem'
                }}
              >
                Earned: {hindEarned.cappedTotal}/4 pts • Unspent: {hindRemaining} pts
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))',
                gap: 10
              }}
            >
              {/* +1 Attribute (2 pts) */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff' }}>+1 Attribute Point</div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700 }}>Costs 2 Hindrance Pts</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('attributes', -1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,0.08)', fontWeight: 800 }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{character.hindranceAllocation.attributes}</span>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('attributes', 1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(245,158,11,0.25)', color: '#fbbf24', fontWeight: 800 }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* +1 Edge (2 pts) */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff' }}>+1 Novice Edge</div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700 }}>Costs 2 Hindrance Pts</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('edges', -1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,0.08)', fontWeight: 800 }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{character.hindranceAllocation.edges}</span>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('edges', 1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(245,158,11,0.25)', color: '#fbbf24', fontWeight: 800 }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* +1 Skill Point (1 pt) */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff' }}>+1 Skill Point</div>
                  <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>Costs 1 Hindrance Pt</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('skills', -1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,0.08)', fontWeight: 800 }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{character.hindranceAllocation.skills}</span>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('skills', 1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(56,189,248,0.25)', color: '#38bdf8', fontWeight: 800 }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* +$1,000 Wealth (1 pt) */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff' }}>+$1,000 Starting Funds</div>
                  <div style={{ fontSize: '0.72rem', color: '#22c55e', fontWeight: 700 }}>Costs 1 Hindrance Pt</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('wealth', -1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,0.08)', fontWeight: 800 }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{character.hindranceAllocation.wealth}</span>
                  <button
                    onClick={() => handleAdjustHindranceAlloc('wealth', 1)}
                    style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(34,197,94,0.25)', color: '#4ade80', fontWeight: 800 }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Hindrances List */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5', marginBottom: 10 }}>
              SELECTED HINDRANCES ({character.hindrances.length})
            </h4>

            {character.hindrances.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                No Hindrances chosen yet. Select up to 4 points worth from the compendium below.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
                {character.hindrances.map((h, idx) => (
                  <div
                    key={`${h.hindranceId}_${idx}`}
                    style={{
                      padding: 11,
                      borderRadius: 11,
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff' }}>
                        {h.name}{' '}
                        <span
                          style={{
                            fontSize: '0.68rem',
                            padding: '1px 6px',
                            borderRadius: 99,
                            background: h.severity === 'Major' ? '#ef4444' : 'rgba(245, 158, 11, 0.25)',
                            color: h.severity === 'Major' ? '#fff' : '#fbbf24'
                          }}
                        >
                          {h.severity} ({h.severity === 'Major' ? '2 pts' : '1 pt'})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 3 }}>
                        {h.summary}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          hindrances: character.hindrances.filter((_, i) => i !== idx)
                        })
                      }
                      style={{
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: 'rgba(239, 68, 68, 0.25)',
                        color: '#fca5a5',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Custom Hindrance Row */}
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8
              }}
            >
              <input
                type="text"
                value={customHindName}
                onChange={(e) => setCustomHindName(e.target.value)}
                placeholder="Custom Hindrance Name..."
                style={{ flex: '1 1 160px' }}
              />
              <select
                value={customHindSeverity}
                onChange={(e) => setCustomHindSeverity(e.target.value as HindranceSeverity)}
              >
                <option value="Minor">Minor (1 pt)</option>
                <option value="Major">Major (2 pts)</option>
              </select>
              <input
                type="text"
                value={customHindSummary}
                onChange={(e) => setCustomHindSummary(e.target.value)}
                placeholder="Effect / description..."
                style={{ flex: '2 1 220px' }}
              />
              <button
                onClick={() => {
                  if (!customHindName.trim()) return;
                  onUpdateCharacter({
                    hindrances: [
                      ...character.hindrances,
                      {
                        hindranceId: `custom_${Date.now()}`,
                        name: customHindName.trim(),
                        severity: customHindSeverity,
                        summary: customHindSummary.trim() || 'Custom setting hindrance.'
                      }
                    ]
                  });
                  setCustomHindName('');
                  setCustomHindSummary('');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: '#f59e0b',
                  color: '#110d08',
                  fontWeight: 800,
                  fontSize: '0.78rem'
                }}
              >
                + Add Custom
              </button>
            </div>
          </div>

          {/* Compendium Hindrances Catalog */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24' }}>
                SWADE HINDRANCES COMPENDIUM ({SWADE_HINDRANCES.length})
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={hindranceSearch}
                  onChange={(e) => setHindranceSearch(e.target.value)}
                  placeholder="Search Hindrances..."
                  style={{ minWidth: 200 }}
                />
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: hindranceOnlyAvailable ? '#fbbf24' : 'var(--text-secondary)',
                    userSelect: 'none',
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: hindranceOnlyAvailable ? 'rgba(245, 158, 11, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${hindranceOnlyAvailable ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-subtle)'}`
                  }}
                >
                  <input
                    type="checkbox"
                    checked={hindranceOnlyAvailable}
                    onChange={(e) => setHindranceOnlyAvailable(e.target.checked)}
                    style={{ accentColor: '#fbbf24', width: 15, height: 15, cursor: 'pointer' }}
                  />
                  Filter unavailable choices
                </label>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: 9
              }}
            >
              {SWADE_HINDRANCES.filter((h) => {
                const activeBooks = character.sourceBooks && character.sourceBooks.length > 0 ? character.sourceBooks : ['core'];
                if (!activeBooks.includes(h.source || 'core')) return false;
                if (
                  hindranceSearch.trim() &&
                  !h.name.toLowerCase().includes(hindranceSearch.toLowerCase()) &&
                  !h.summary.toLowerCase().includes(hindranceSearch.toLowerCase())
                ) {
                  return false;
                }
                if (hindranceOnlyAvailable) {
                  const alreadyAdded = character.hindrances.some((ch) => ch.hindranceId === h.id);
                  if (alreadyAdded) return false;
                }
                return true;
              }).map((h) => {
                const alreadyAdded = character.hindrances.some((ch) => ch.hindranceId === h.id);
                return (
                  <div
                    key={h.id}
                    style={{
                      padding: 12,
                      borderRadius: 11,
                      background: alreadyAdded ? 'rgba(239, 68, 68, 0.12)' : 'rgba(0, 0, 0, 0.35)',
                      border: `1px solid ${alreadyAdded ? '#ef4444' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>{h.name}</span>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-muted)',
                            fontWeight: 700
                          }}
                        >
                          {h.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 3 }}>
                        {h.summary}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      {(h.severity === 'Minor' || h.severity === 'Minor/Major') && (
                        <button
                          onClick={() =>
                            onUpdateCharacter({
                              hindrances: [
                                ...character.hindrances,
                                {
                                  hindranceId: h.id,
                                  name: h.name,
                                  severity: 'Minor',
                                  summary: h.summary
                                }
                              ]
                            })
                          }
                          style={{
                            flex: 1,
                            padding: '6px 8px',
                            borderRadius: 7,
                            background: 'rgba(245, 158, 11, 0.18)',
                            border: '1px solid rgba(245, 158, 11, 0.4)',
                            color: '#fbbf24',
                            fontSize: '0.73rem',
                            fontWeight: 800
                          }}
                        >
                          + Minor (1 pt)
                        </button>
                      )}
                      {(h.severity === 'Major' || h.severity === 'Minor/Major') && (
                        <button
                          onClick={() =>
                            onUpdateCharacter({
                              hindrances: [
                                ...character.hindrances,
                                {
                                  hindranceId: h.id,
                                  name: h.name,
                                  severity: 'Major',
                                  summary: h.summary
                                }
                              ]
                            })
                          }
                          style={{
                            flex: 1,
                            padding: '6px 8px',
                            borderRadius: 7,
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.45)',
                            color: '#fca5a5',
                            fontSize: '0.73rem',
                            fontWeight: 800
                          }}
                        >
                          + Major (2 pts)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ATTRIBUTES */}
      {activeTab === 'attributes' && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 16
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 14
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fbbf24' }}>
                ATTRIBUTES (5 Base Points + Hindrance/Advance Bonuses)
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Every Attribute starts at <strong>d4</strong> (or <strong>d6</strong> with Ancestry bonus). Raising one die step costs 1 point.
              </p>
            </div>
            <div
              style={{
                padding: '6px 12px',
                borderRadius: 10,
                background:
                  attrPts.remaining === 0
                    ? 'rgba(34, 197, 94, 0.2)'
                    : attrPts.remaining > 0
                    ? 'rgba(56, 189, 248, 0.2)'
                    : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${
                  attrPts.remaining === 0 ? '#22c55e' : attrPts.remaining > 0 ? '#38bdf8' : '#ef4444'
                }`,
                fontWeight: 900,
                fontSize: '0.84rem'
              }}
            >
              Spent: {attrPts.spent} / {attrPts.budget} ({attrPts.remaining} remaining)
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(Object.keys(ATTRIBUTE_META) as AttributeId[]).map((attr) => {
              const meta = ATTRIBUTE_META[attr];
              const die = character.attributes[attr];
              const mod = character.attributeModifiers[attr] || 0;
              const minDie: DieSides = ancestry.attributeBonuses?.[attr] ? 6 : 4;

              return (
                <div
                  key={attr}
                  style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: `1px solid ${meta.color}40`,
                    borderRadius: 14,
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '1 1 220px' }}>
                    <span style={{ fontSize: '1.6rem' }}>{meta.icon}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 900, fontSize: '1rem', color: '#fff' }}>{meta.name}</span>
                        {minDie === 6 && (
                          <span
                            style={{
                              fontSize: '0.66rem',
                              padding: '1px 6px',
                              borderRadius: 99,
                              background: 'rgba(56, 189, 248, 0.2)',
                              color: '#38bdf8',
                              fontWeight: 800
                            }}
                          >
                            {ancestry.name} Starts d6
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{meta.description}</div>
                    </div>
                  </div>

                  {/* Die Steppers + Flat Modifier + Roll Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          attributes: {
                            ...character.attributes,
                            [attr]: stepDieDown(die, minDie) as DieSides
                          }
                        })
                      }
                      disabled={die <= minDie}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 9,
                        background: die <= minDie ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.1)',
                        opacity: die <= minDie ? 0.35 : 1,
                        fontSize: '1.1rem',
                        fontWeight: 900
                      }}
                    >
                      −
                    </button>

                    <button
                      onClick={() =>
                        onRollTrait({
                          label: `${meta.name} Roll`,
                          dieSides: die,
                          baseModifier: mod
                        })
                      }
                      title="Tap to test roll this Attribute"
                      style={{
                        minWidth: 74,
                        padding: '8px 12px',
                        borderRadius: 10,
                        background: `${meta.color}22`,
                        border: `2px solid ${meta.color}`,
                        color: meta.color,
                        fontWeight: 900,
                        fontSize: '1.05rem',
                        textAlign: 'center'
                      }}
                    >
                      {formatDie(die, mod)}
                    </button>

                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          attributes: {
                            ...character.attributes,
                            [attr]: stepDieUp(die)
                          }
                        })
                      }
                      disabled={die >= 12}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 9,
                        background: die >= 12 ? 'rgba(255,255,255,0.03)' : 'rgba(245, 158, 11, 0.25)',
                        color: '#fbbf24',
                        opacity: die >= 12 ? 0.35 : 1,
                        fontSize: '1.1rem',
                        fontWeight: 900
                      }}
                    >
                      +
                    </button>

                    {/* Flat Bonus/Penalty Modifier (e.g. d12+1 or Elderly -1) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 6 }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>MOD:</span>
                      <button
                        onClick={() =>
                          onUpdateCharacter({
                            attributeModifiers: {
                              ...character.attributeModifiers,
                              [attr]: mod - 1
                            }
                          })
                        }
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.07)',
                          fontSize: '0.8rem',
                          fontWeight: 800
                        }}
                      >
                        -1
                      </button>
                      <button
                        onClick={() =>
                          onUpdateCharacter({
                            attributeModifiers: {
                              ...character.attributeModifiers,
                              [attr]: mod + 1
                            }
                          })
                        }
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.07)',
                          fontSize: '0.8rem',
                          fontWeight: 800
                        }}
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: SKILLS */}
      {activeTab === 'skills' && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 16
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 12
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#38bdf8' }}>
                SKILLS ({character.settingRules.moreSkillPoints ? 15 : 12} Base Points + Bonuses)
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong>Core Skills (★)</strong> start at d4 for free. Raising a skill costs <strong>1 pt</strong> per step up to its Linked Attribute, and <strong>2 pts</strong> per step above its Linked Attribute.
              </p>
            </div>
            <div
              style={{
                padding: '6px 12px',
                borderRadius: 10,
                background:
                  skillPts.remaining === 0
                    ? 'rgba(34, 197, 94, 0.2)'
                    : skillPts.remaining > 0
                    ? 'rgba(56, 189, 248, 0.2)'
                    : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${
                  skillPts.remaining === 0 ? '#22c55e' : skillPts.remaining > 0 ? '#38bdf8' : '#ef4444'
                }`,
                fontWeight: 900,
                fontSize: '0.84rem'
              }}
            >
              Spent: {skillPts.spent} / {skillPts.budget} ({skillPts.remaining} remaining)
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skills..."
              style={{ flex: '1 1 180px' }}
            />
            {(['all', 'trained', 'agility', 'smarts', 'spirit'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setSkillFilterAttr(f)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 9,
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  background:
                    skillFilterAttr === f ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 0, 0, 0.35)',
                  border: `1px solid ${skillFilterAttr === f ? '#38bdf8' : 'var(--border-subtle)'}`,
                  color: skillFilterAttr === f ? '#38bdf8' : 'var(--text-secondary)',
                  textTransform: 'capitalize'
                }}
              >
                {f === 'all' ? 'All Skills' : f === 'trained' ? 'Trained Only' : f}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: 9
            }}
          >
            {character.skills
              .filter((sk) => {
                if (skillFilterAttr === 'trained' && sk.die === 0) return false;
                if (
                  skillFilterAttr !== 'all' &&
                  skillFilterAttr !== 'trained' &&
                  sk.linkedAttribute !== skillFilterAttr
                )
                  return false;
                if (
                  skillSearch.trim() &&
                  !sk.name.toLowerCase().includes(skillSearch.toLowerCase())
                )
                  return false;
                return true;
              })
              .map((sk) => {
                const attrMeta = ATTRIBUTE_META[sk.linkedAttribute];
                const linkedAttrDie = character.attributes[sk.linkedAttribute];
                const ancestryBonus = ancestry.skillBonuses?.[sk.skillId] || 0;
                const minDie: DieSides | 0 = ancestryBonus > 0 ? 6 : sk.isCore ? 4 : 0;
                const totalPtsSpent = calculateSingleSkillCost(sk, linkedAttrDie, ancestryBonus);
                const nextStepDie = stepDieUp(sk.die);
                const nextStepCost = nextStepDie <= linkedAttrDie ? 1 : 2;

                return (
                  <div
                    key={sk.skillId}
                    style={{
                      background: sk.die > 0 ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.22)',
                      border: `1px solid ${
                        sk.die > linkedAttrDie
                          ? 'rgba(245, 158, 11, 0.5)'
                          : sk.die > 0
                          ? 'var(--border-strong)'
                          : 'var(--border-subtle)'
                      }`,
                      borderRadius: 12,
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: '0.88rem', color: sk.die > 0 ? '#fff' : 'var(--text-secondary)' }}>
                          {sk.isCore ? '★ ' : ''}
                          {sk.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.66rem',
                            padding: '1px 5px',
                            borderRadius: 5,
                            background: `${attrMeta.color}20`,
                            color: attrMeta.color,
                            fontWeight: 800
                          }}
                        >
                          {attrMeta.short} d{linkedAttrDie}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {totalPtsSpent > 0 ? `${totalPtsSpent} pt${totalPtsSpent > 1 ? 's' : ''} spent • ` : ''}
                        {sk.die < 12 ? `Next step: ${nextStepCost} pt${nextStepCost > 1 ? 's' : ''}` : 'Max d12'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <button
                        onClick={() =>
                          onUpdateCharacter({
                            skills: character.skills.map((s) =>
                              s.skillId === sk.skillId
                                ? { ...s, die: stepDieDown(s.die, minDie) }
                                : s
                            )
                          })
                        }
                        disabled={sk.die <= minDie}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.08)',
                          opacity: sk.die <= minDie ? 0.3 : 1,
                          fontWeight: 900
                        }}
                      >
                        −
                      </button>

                      <span
                        style={{
                          minWidth: 50,
                          textAlign: 'center',
                          padding: '5px 7px',
                          borderRadius: 8,
                          background: sk.die > 0 ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255,255,255,0.04)',
                          color: sk.die > 0 ? '#fbbf24' : 'var(--text-muted)',
                          fontWeight: 900,
                          fontSize: '0.86rem'
                        }}
                      >
                        {sk.die === 0 ? 'Unsk' : formatDie(sk.die, sk.modifier)}
                      </span>

                      <button
                        onClick={() =>
                          onUpdateCharacter({
                            skills: character.skills.map((s) =>
                              s.skillId === sk.skillId
                                ? { ...s, die: stepDieUp(s.die) }
                                : s
                            )
                          })
                        }
                        disabled={sk.die >= 12}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: 'rgba(245, 158, 11, 0.25)',
                          color: '#fbbf24',
                          opacity: sk.die >= 12 ? 0.3 : 1,
                          fontWeight: 900
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Add Custom Skill Row */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8
            }}
          >
            <input
              type="text"
              value={customSkillName}
              onChange={(e) => setCustomSkillName(e.target.value)}
              placeholder="Add Custom Skill (e.g. Demolitions, Lore)..."
              style={{ flex: '1 1 220px' }}
            />
            <select
              value={customSkillAttr}
              onChange={(e) => setCustomSkillAttr(e.target.value as AttributeId)}
            >
              <option value="agility">Linked: Agility</option>
              <option value="smarts">Linked: Smarts</option>
              <option value="spirit">Linked: Spirit</option>
              <option value="strength">Linked: Strength</option>
              <option value="vigor">Linked: Vigor</option>
            </select>
            <button
              onClick={() => {
                if (!customSkillName.trim()) return;
                onUpdateCharacter({
                  skills: [
                    ...character.skills,
                    {
                      skillId: `custom_sk_${Date.now()}`,
                      name: customSkillName.trim(),
                      linkedAttribute: customSkillAttr,
                      isCore: false,
                      die: 4,
                      modifier: 0
                    }
                  ]
                });
                setCustomSkillName('');
              }}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                background: '#38bdf8',
                color: '#08121a',
                fontWeight: 800,
                fontSize: '0.78rem'
              }}
            >
              + Add Skill at d4
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: EDGES & ADVANCES */}
      {activeTab === 'edges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Selected Edges & Edge Budget */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 12
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fbbf24' }}>
                  CHARACTER EDGES
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Humans start with 1 free Edge. Additional Edges come from Hindrance Points (2 pts each), Born a Hero, or Advances.
                </p>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 10,
                  background:
                    edgePts.remaining === 0
                      ? 'rgba(34, 197, 94, 0.2)'
                      : edgePts.remaining > 0
                      ? 'rgba(56, 189, 248, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${
                    edgePts.remaining === 0 ? '#22c55e' : edgePts.remaining > 0 ? '#38bdf8' : '#ef4444'
                  }`,
                  fontWeight: 900,
                  fontSize: '0.84rem'
                }}
              >
                Edges: {edgePts.spent} / {edgePts.budget} ({edgePts.remaining} available)
              </div>
            </div>

            {character.edges.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                No Edges chosen yet. Select from the SWADE Edge Compendium below.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))', gap: 8 }}>
                {character.edges.map((ed, idx) => (
                  <div
                    key={`${ed.edgeId}_${idx}`}
                    style={{
                      padding: 11,
                      borderRadius: 11,
                      background: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fbbf24' }}>
                        {ed.name}{' '}
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          ({ed.category})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 3 }}>
                        {ed.summary}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          edges: character.edges.filter((_, i) => i !== idx)
                        })
                      }
                      style={{
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#fca5a5',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Custom Edge Row */}
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8
              }}
            >
              <input
                type="text"
                value={customEdgeName}
                onChange={(e) => setCustomEdgeName(e.target.value)}
                placeholder="Custom Edge Name..."
                style={{ flex: '1 1 160px' }}
              />
              <select
                value={customEdgeCat}
                onChange={(e) => setCustomEdgeCat(e.target.value as EdgeCategory)}
              >
                {(['Background', 'Combat', 'Leadership', 'Power', 'Professional', 'Social', 'Weird', 'Legendary'] as EdgeCategory[]).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="text"
                value={customEdgeSummary}
                onChange={(e) => setCustomEdgeSummary(e.target.value)}
                placeholder="Edge benefit..."
                style={{ flex: '2 1 220px' }}
              />
              <button
                onClick={() => {
                  if (!customEdgeName.trim()) return;
                  onUpdateCharacter({
                    edges: [
                      ...character.edges,
                      {
                        edgeId: `custom_edge_${Date.now()}`,
                        name: customEdgeName.trim(),
                        category: customEdgeCat,
                        rankRequired: 'Novice',
                        summary: customEdgeSummary.trim() || 'Custom setting Edge.'
                      }
                    ]
                  });
                  setCustomEdgeName('');
                  setCustomEdgeSummary('');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: '#f59e0b',
                  color: '#110d08',
                  fontWeight: 800,
                  fontSize: '0.78rem'
                }}
              >
                + Add Custom Edge
              </button>
            </div>
          </div>

          {/* Advancements & Rank Tracker */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8' }}>
                  ADVANCEMENTS & RANK PROGRESSION ({derived.rank})
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  0–3 Novice • 4–7 Seasoned • 8–11 Veteran • 12–15 Heroic • 16+ Legendary. Logging an Edge, Attribute, or Skills advance automatically expands your point budgets!
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => onUpdateCharacter({ advancesCount: Math.max(0, character.advancesCount - 1) })}
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', fontWeight: 900 }}
                >
                  −
                </button>
                <span style={{ fontWeight: 900, fontSize: '0.92rem', color: '#38bdf8' }}>
                  {character.advancesCount} Advances ({derived.rank})
                </span>
                <button
                  onClick={() => onUpdateCharacter({ advancesCount: character.advancesCount + 1 })}
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(56,189,248,0.22)', color: '#38bdf8', fontWeight: 900 }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <select
                value={newAdvType}
                onChange={(e) => setNewAdvType(e.target.value as AdvanceEntry['type'])}
              >
                <option value="Edge">New Edge (+1 Edge Budget)</option>
                <option value="Skills">Skills (+2 Skill Points)</option>
                <option value="Attribute">Attribute (+1 Attribute Point)</option>
                <option value="Hindrance">Buy Off / Reduce Hindrance</option>
              </select>
              <input
                type="text"
                value={newAdvDesc}
                onChange={(e) => setNewAdvDesc(e.target.value)}
                placeholder="Advance description (e.g. Took Marksman Edge)..."
                style={{ flex: '1 1 220px' }}
              />
              <button
                onClick={() => {
                  const nextNum = character.advancesList.length + 1;
                  const nextCount = Math.max(character.advancesCount, nextNum);
                  onUpdateCharacter({
                    advancesCount: nextCount,
                    advancesList: [
                      ...character.advancesList,
                      {
                        number: nextNum,
                        rank: getRankFromAdvances(nextNum),
                        type: newAdvType,
                        description: newAdvDesc.trim() || `Advance #${nextNum} (${newAdvType})`
                      }
                    ]
                  });
                  setNewAdvDesc('');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: '#38bdf8',
                  color: '#08121a',
                  fontWeight: 800,
                  fontSize: '0.78rem'
                }}
              >
                + Log Advance
              </button>
            </div>

            {character.advancesList.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {character.advancesList.map((adv, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '6px 10px',
                      borderRadius: 8,
                      background: 'rgba(0, 0, 0, 0.3)',
                      fontSize: '0.78rem'
                    }}
                  >
                    <span>
                      <strong style={{ color: '#38bdf8' }}>#{adv.number} ({adv.rank})</strong> — [{adv.type}] {adv.description}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          advancesList: character.advancesList.filter((_, i) => i !== idx)
                        })
                      }
                      style={{ color: '#fca5a5', fontSize: '0.72rem', fontWeight: 800 }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SWADE Edge Compendium */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24' }}>
                SWADE EDGES COMPENDIUM ({SWADE_EDGES.length})
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={edgeSearch}
                  onChange={(e) => setEdgeSearch(e.target.value)}
                  placeholder="Search Edges..."
                  style={{ minWidth: 200 }}
                />
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: edgeOnlyValid ? '#4ade80' : 'var(--text-secondary)',
                    userSelect: 'none',
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: edgeOnlyValid ? 'rgba(34, 197, 94, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${edgeOnlyValid ? 'rgba(34, 197, 94, 0.4)' : 'var(--border-subtle)'}`
                  }}
                >
                  <input
                    type="checkbox"
                    checked={edgeOnlyValid}
                    onChange={(e) => setEdgeOnlyValid(e.target.checked)}
                    style={{ accentColor: '#22c55e', width: 15, height: 15, cursor: 'pointer' }}
                  />
                  Filter unavailable choices
                </label>
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 10 }}>
              {(['All', 'Background', 'Combat', 'Leadership', 'Power', 'Professional', 'Social', 'Weird', 'Legendary'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEdgeCategoryFilter(cat)}
                  style={{
                    padding: '6px 11px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    background:
                      edgeCategoryFilter === cat ? 'rgba(245, 158, 11, 0.25)' : 'rgba(0, 0, 0, 0.35)',
                    border: `1px solid ${edgeCategoryFilter === cat ? '#f59e0b' : 'var(--border-subtle)'}`,
                    color: edgeCategoryFilter === cat ? '#fbbf24' : 'var(--text-secondary)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 9
              }}
            >
              {SWADE_EDGES.filter((ed) => {
                const activeBooks = character.sourceBooks && character.sourceBooks.length > 0 ? character.sourceBooks : ['core'];
                if (!activeBooks.includes(ed.source || 'core')) return false;
                if (edgeCategoryFilter !== 'All' && ed.category !== edgeCategoryFilter) return false;
                if (
                  edgeSearch.trim() &&
                  !ed.name.toLowerCase().includes(edgeSearch.toLowerCase()) &&
                  !ed.summary.toLowerCase().includes(edgeSearch.toLowerCase())
                )
                  return false;
                if (edgeOnlyValid) {
                  const alreadyOwned = character.edges.some((ce) => ce.edgeId === ed.id);
                  if (alreadyOwned) return false;
                  if (!checkEdgeRequirements(ed, character).met) return false;
                }
                return true;
              }).map((ed) => {
                const reqCheck = checkEdgeRequirements(ed, character);
                const alreadyOwned = character.edges.some((ce) => ce.edgeId === ed.id);

                return (
                  <div
                    key={ed.id}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      background: alreadyOwned
                        ? 'rgba(245, 158, 11, 0.14)'
                        : 'rgba(0, 0, 0, 0.35)',
                      border: `1px solid ${
                        alreadyOwned
                          ? '#f59e0b'
                          : reqCheck.met
                          ? 'rgba(34, 197, 94, 0.35)'
                          : 'var(--border-subtle)'
                      }`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{ed.name}</span>
                        <span
                          style={{
                            fontSize: '0.66rem',
                            padding: '2px 6px',
                            borderRadius: 6,
                            background: 'rgba(255, 255, 255, 0.07)',
                            color: 'var(--text-secondary)',
                            fontWeight: 700
                          }}
                        >
                          {ed.category}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: reqCheck.met ? '#4ade80' : '#f87171',
                          fontWeight: 700,
                          marginTop: 2
                        }}
                      >
                        Req: {ed.requirementsText} {reqCheck.met ? '✓' : `(${reqCheck.reasons[0]})`}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        {ed.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const updatedEdges = [
                          ...character.edges,
                          {
                            edgeId: ed.id,
                            name: ed.name,
                            category: ed.category,
                            rankRequired: ed.rankRequired,
                            summary: ed.summary
                          }
                        ];
                        const updates: Partial<SwadeCharacter> = { edges: updatedEdges };
                        if (ed.id === 'arcane_background' && character.arcaneBackgroundId === 'none') {
                          updates.arcaneBackgroundId = 'magic';
                          updates.playState = { ...character.playState, currentPowerPoints: 10 };
                        }
                        onUpdateCharacter(updates);
                      }}
                      style={{
                        padding: '7px 10px',
                        borderRadius: 8,
                        background: reqCheck.met
                          ? 'rgba(245, 158, 11, 0.22)'
                          : 'rgba(255, 255, 255, 0.06)',
                        border: `1px solid ${reqCheck.met ? '#f59e0b' : 'var(--border-subtle)'}`,
                        color: reqCheck.met ? '#fbbf24' : 'var(--text-secondary)',
                        fontSize: '0.76rem',
                        fontWeight: 800
                      }}
                    >
                      {alreadyOwned ? '+ Add Another Rank / Copy' : '+ Take Edge'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ARCANE BACKGROUND & POWERS */}
      {activeTab === 'powers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Arcane Background Selector */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(168, 85, 247, 0.45)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>
              ARCANE BACKGROUND & POWER POINTS
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Choose an Arcane Background to unlock Powers and Power Points. Customize each power with its own <strong>Trappings</strong> (fire, frost, necromancy, clockwork gadgets, etc.).
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
                gap: 10
              }}
            >
              {SWADE_ARCANE_BACKGROUNDS.map((ab) => {
                const selected = character.arcaneBackgroundId === ab.id;
                return (
                  <button
                    key={ab.id}
                    onClick={() => {
                      const hasAbEdge = character.edges.some((e) => e.edgeId === 'arcane_background');
                      const updatedEdges =
                        ab.id !== 'none' && !hasAbEdge
                          ? [
                              ...character.edges,
                              {
                                edgeId: 'arcane_background',
                                name: 'Arcane Background',
                                category: 'Background' as EdgeCategory,
                                rankRequired: 'Novice' as RankName,
                                summary: ab.summary
                              }
                            ]
                          : character.edges;
                      onUpdateCharacter({
                        arcaneBackgroundId: ab.id as ArcaneBackgroundId,
                        edges: updatedEdges,
                        playState: {
                          ...character.playState,
                          currentPowerPoints: ab.startingPowerPoints
                        }
                      });
                    }}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      textAlign: 'left',
                      background: selected
                        ? 'rgba(168, 85, 247, 0.22)'
                        : 'rgba(0, 0, 0, 0.35)',
                      border: selected ? '2px solid #a855f7' : '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: selected ? '#e9d5ff' : '#fff' }}>
                      {ab.name}
                    </div>
                    {ab.id !== 'none' && (
                      <div style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 700, marginTop: 2 }}>
                        Skill: {ab.arcaneSkillName} • {ab.startingPowers} Powers • {ab.startingPowerPoints} PP
                      </div>
                    )}
                    <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      {ab.summary}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Character's Active Grimoire / Powers */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#e9d5ff', marginBottom: 10 }}>
              KNOWN POWERS & TRAPPINGS ({character.powers.length})
            </h4>

            {character.powers.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                No powers added yet. Pick powers from the SWADE Powers Compendium below!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 10 }}>
                {character.powers.map((pwr, idx) => (
                  <div
                    key={pwr.id}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.35)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>{pwr.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: '0.72rem', color: '#d8b4fe', fontWeight: 800 }}>
                          {pwr.powerPoints} PP • {pwr.range}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateCharacter({
                              powers: character.powers.filter((_, i) => i !== idx)
                            })
                          }
                          style={{
                            padding: '3px 7px',
                            borderRadius: 6,
                            background: 'rgba(239, 68, 68, 0.25)',
                            color: '#fca5a5',
                            fontSize: '0.7rem',
                            fontWeight: 800
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={pwr.trapping}
                      onChange={(e) => {
                        const updated = [...character.powers];
                        updated[idx] = { ...pwr, trapping: e.target.value };
                        onUpdateCharacter({ powers: updated });
                      }}
                      placeholder="Enter Trapping (e.g. Hellfire, Runic Ice, Nanobots)..."
                      style={{ fontSize: '0.78rem', padding: '6px 10px' }}
                    />

                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{pwr.summary}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SWADE Powers Compendium */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#c084fc' }}>
                SWADE POWERS COMPENDIUM ({SWADE_POWERS.length})
              </h4>
              <input
                type="text"
                value={powerSearch}
                onChange={(e) => setPowerSearch(e.target.value)}
                placeholder="Search Powers..."
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
                gap: 9
              }}
            >
              {SWADE_POWERS.filter((p) => {
                const activeBooks = character.sourceBooks && character.sourceBooks.length > 0 ? character.sourceBooks : ['core'];
                if (!activeBooks.includes(p.source || 'core')) return false;
                if (
                  powerSearch.trim() &&
                  !p.name.toLowerCase().includes(powerSearch.toLowerCase()) &&
                  !p.summary.toLowerCase().includes(powerSearch.toLowerCase())
                ) {
                  return false;
                }
                return true;
              }).map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 8
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>{p.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 800 }}>
                        {p.rankRequired} • {p.powerPoints} PP
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Range: {p.range} • Duration: {p.duration} {p.damage ? `• Dmg: ${p.damage}` : ''}
                    </div>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      {p.summary}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      onUpdateCharacter({
                        powers: [
                          ...character.powers,
                          {
                            id: `pwr_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
                            powerId: p.id,
                            name: p.name,
                            trapping: '',
                            powerPoints: p.powerPoints,
                            range: p.range,
                            duration: p.duration,
                            summary: p.summary,
                            damage: p.damage
                          }
                        ]
                      })
                    }
                    style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(168, 85, 247, 0.45)',
                      color: '#e9d5ff',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}
                  >
                    + Add Power
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: GEAR, WEAPONS, ARMOR & DERIVED STATS */}
      {activeTab === 'gear' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Wealth, Encumbrance & Custom Derived Modifiers */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 4 }}>
                  CURRENCY / FUNDS ($) — Starting Budget: ${derived.startingFunds}
                </label>
                <input
                  type="number"
                  value={character.currency}
                  onChange={(e) => onUpdateCharacter({ currency: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%', fontWeight: 800, color: '#4ade80' }}
                />
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 4 }}>
                  ENCUMBRANCE (STRENGTH d{character.attributes.strength})
                </div>
                <div
                  style={{
                    padding: '9px 12px',
                    borderRadius: 10,
                    background: derived.isEncumbered
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(34, 197, 94, 0.14)',
                    border: `1px solid ${derived.isEncumbered ? '#ef4444' : '#22c55e'}`,
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    color: derived.isEncumbered ? '#fca5a5' : '#4ade80'
                  }}
                >
                  Weight: {derived.totalWeight} / {derived.maxLoad} lbs{' '}
                  {derived.isEncumbered ? '(-2 Encumbered!)' : '(Unencumbered)'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 4 }}>
                  CUSTOM DERIVED STAT MODIFIERS
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => onUpdateCharacter({ customPaceMod: character.customPaceMod + 1 })}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onUpdateCharacter({ customPaceMod: 0 });
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 6px',
                      borderRadius: 8,
                      background: 'rgba(0,0,0,0.35)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.73rem',
                      fontWeight: 700
                    }}
                  >
                    Pace ({character.customPaceMod >= 0 ? `+${character.customPaceMod}` : character.customPaceMod})
                  </button>
                  <button
                    onClick={() => onUpdateCharacter({ customParryMod: character.customParryMod + 1 })}
                    style={{
                      flex: 1,
                      padding: '8px 6px',
                      borderRadius: 8,
                      background: 'rgba(0,0,0,0.35)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.73rem',
                      fontWeight: 700
                    }}
                  >
                    Parry ({character.customParryMod >= 0 ? `+${character.customParryMod}` : character.customParryMod})
                  </button>
                  <button
                    onClick={() => onUpdateCharacter({ customToughnessMod: character.customToughnessMod + 1 })}
                    style={{
                      flex: 1,
                      padding: '8px 6px',
                      borderRadius: 8,
                      background: 'rgba(0,0,0,0.35)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.73rem',
                      fontWeight: 700
                    }}
                  >
                    Tough ({character.customToughnessMod >= 0 ? `+${character.customToughnessMod}` : character.customToughnessMod})
                  </button>
                  {(character.customPaceMod !== 0 ||
                    character.customParryMod !== 0 ||
                    character.customToughnessMod !== 0) && (
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          customPaceMod: 0,
                          customParryMod: 0,
                          customToughnessMod: 0
                        })
                      }
                      style={{
                        padding: '8px',
                        borderRadius: 8,
                        background: 'rgba(239,68,68,0.2)',
                        color: '#fca5a5',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Equipped Weapons & Armor */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: 14
            }}
          >
            {/* Character Weapons */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: 16
              }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444', marginBottom: 10 }}>
                CHARACTER WEAPONS ({character.weapons.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {character.weapons.map((w, idx) => (
                  <div
                    key={w.id}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      background: 'rgba(0,0,0,0.35)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff' }}>
                        {w.name} <span style={{ color: '#fca5a5' }}>({w.damage})</span>
                      </div>
                      <div style={{ fontSize: '0.71rem', color: 'var(--text-muted)' }}>
                        Range: {w.range} • AP: {w.ap} • {w.weight} lbs
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          weapons: character.weapons.filter((_, i) => i !== idx)
                        })
                      }
                      style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 800 }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                ADD WEAPON FROM SWADE ARMORY:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
                {SWADE_WEAPONS_CATALOG.filter((catW) => {
                  const activeBooks = character.sourceBooks && character.sourceBooks.length > 0 ? character.sourceBooks : ['core'];
                  return activeBooks.includes(catW.source || 'core');
                }).map((catW, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      onUpdateCharacter({
                        weapons: [
                          ...character.weapons,
                          {
                            ...catW,
                            id: `wpn_${Date.now()}_${i}`,
                            equipped: true
                          }
                        ]
                      })
                    }
                    style={{
                      padding: '6px 9px',
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.14)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      fontSize: '0.73rem',
                      color: '#fecaca',
                      fontWeight: 700
                    }}
                  >
                    + {catW.name} ({catW.damage})
                  </button>
                ))}
              </div>
            </div>

            {/* Character Armor & Shields */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: 16
              }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#22c55e', marginBottom: 10 }}>
                ARMOR & SHIELDS ({character.armor.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {character.armor.map((a, idx) => (
                  <div
                    key={a.id}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      background: 'rgba(0,0,0,0.35)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff' }}>
                        {a.name}{' '}
                        <span style={{ color: '#4ade80' }}>
                          ({a.type === 'Armor' ? `+${a.armorBonus} Armor` : `+${a.parryBonus} Parry`})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.71rem', color: 'var(--text-muted)' }}>
                        Min Str: d{a.minStr} • {a.weight} lbs • {a.notes}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => {
                          const updated = [...character.armor];
                          updated[idx] = { ...a, equipped: !a.equipped };
                          onUpdateCharacter({ armor: updated });
                        }}
                        style={{
                          padding: '3px 7px',
                          borderRadius: 6,
                          background: a.equipped ? 'rgba(34,197,94,0.22)' : 'rgba(255,255,255,0.08)',
                          color: a.equipped ? '#4ade80' : 'var(--text-muted)',
                          fontSize: '0.7rem',
                          fontWeight: 800
                        }}
                      >
                        {a.equipped ? 'Worn' : 'Stowed'}
                      </button>
                      <button
                        onClick={() =>
                          onUpdateCharacter({
                            armor: character.armor.filter((_, i) => i !== idx)
                          })
                        }
                        style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 800 }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                ADD ARMOR OR SHIELD FROM CATALOG:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SWADE_ARMOR_CATALOG.filter((catA) => {
                  const activeBooks = character.sourceBooks && character.sourceBooks.length > 0 ? character.sourceBooks : ['core'];
                  return activeBooks.includes(catA.source || 'core');
                }).map((catA, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      onUpdateCharacter({
                        armor: [
                          ...character.armor,
                          {
                            ...catA,
                            id: `arm_${Date.now()}_${i}`,
                            equipped: true
                          }
                        ]
                      })
                    }
                    style={{
                      padding: '6px 9px',
                      borderRadius: 8,
                      background: 'rgba(34, 197, 94, 0.14)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      fontSize: '0.73rem',
                      color: '#86efac',
                      fontWeight: 700
                    }}
                  >
                    + {catA.name} ({catA.type === 'Armor' ? `+${catA.armorBonus} Arm` : `+${catA.parryBonus} Par`})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mundane Gear & Adventuring Pack */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: 16
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24', marginBottom: 10 }}>
              ADVENTURING GEAR & INVENTORY ({character.gear.length})
            </h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <input
                type="text"
                value={customGearName}
                onChange={(e) => setCustomGearName(e.target.value)}
                placeholder="Item name (e.g. Lockpicks, Rope, Medkit)..."
                style={{ flex: '2 1 200px' }}
              />
              <input
                type="number"
                value={customGearWeight}
                onChange={(e) => setCustomGearWeight(e.target.value)}
                placeholder="Lbs"
                style={{ width: 80 }}
              />
              <input
                type="number"
                value={customGearCost}
                onChange={(e) => setCustomGearCost(e.target.value)}
                placeholder="Cost $"
                style={{ width: 90 }}
              />
              <button
                onClick={() => {
                  if (!customGearName.trim()) return;
                  onUpdateCharacter({
                    gear: [
                      ...character.gear,
                      {
                        id: `gr_${Date.now()}`,
                        name: customGearName.trim(),
                        quantity: 1,
                        weight: parseFloat(customGearWeight) || 0,
                        cost: parseInt(customGearCost, 10) || 0
                      }
                    ]
                  });
                  setCustomGearName('');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: '#f59e0b',
                  color: '#110d08',
                  fontWeight: 800,
                  fontSize: '0.78rem'
                }}
              >
                + Add Item
              </button>
            </div>

            {character.gear.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
                {character.gear.map((g, idx) => (
                  <div
                    key={g.id}
                    style={{
                      padding: '8px 11px',
                      borderRadius: 9,
                      background: 'rgba(0,0,0,0.35)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#fff' }}>
                        {g.name} (x{g.quantity})
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {g.weight} lbs • ${g.cost}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          gear: character.gear.filter((_, i) => i !== idx)
                        })
                      }
                      style={{ color: '#fca5a5', fontSize: '0.74rem', fontWeight: 800 }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
