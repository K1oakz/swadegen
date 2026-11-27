import React, { useMemo, useState } from 'react';
import {
  PF_BLOODLINES,
  PF_DEITIES,
  PF_DOMAINS,
  PF_MAGIC_ITEM_RULES,
  PF_SPECIAL_MATERIALS
} from '../data/pathfinderData';

interface PathfinderRulesModalProps {
  onClose: () => void;
}

export const PathfinderRulesModal: React.FC<PathfinderRulesModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'deities' | 'bloodlines' | 'materials' | 'magic'>('deities');
  const [search, setSearch] = useState('');

  const filteredDeities = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PF_DEITIES;
    return PF_DEITIES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.alignment.toLowerCase().includes(q) ||
        d.concerns.toLowerCase().includes(q) ||
        d.domains.some((dom) => dom.toLowerCase().includes(q))
    );
  }, [search]);

  const filteredDomains = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PF_DOMAINS;
    return PF_DOMAINS.filter(
      (dom) =>
        dom.name.toLowerCase().includes(q) ||
        dom.aspects.toLowerCase().includes(q) ||
        dom.deities.toLowerCase().includes(q) ||
        dom.powers.some((p) => p.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 940,
          maxHeight: '92vh',
          background: 'linear-gradient(180deg, #1b1410 0%, #0d0a08 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.45)',
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(245, 158, 11, 0.08)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              PATHFINDER FOR SAVAGE WORLDS
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 950, color: '#fff', margin: '2px 0 0' }}>
              Savage Pathfinder Rules &amp; Golarion Reference
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: '#cbd5e1',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '10px 22px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderBottom: '1px solid #292018',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'deities', label: 'Deities & Domains' },
            { id: 'bloodlines', label: 'Sorcerer Bloodlines' },
            { id: 'materials', label: 'Special Materials' },
            { id: 'magic', label: 'Magic Items & Wealth' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 800,
                background: activeTab === tab.id ? 'rgba(245, 158, 11, 0.22)' : 'transparent',
                color: activeTab === tab.id ? '#fbbf24' : '#94a3b8',
                border: activeTab === tab.id ? '1px solid rgba(245, 158, 11, 0.45)' : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', lineHeight: 1.55, fontSize: '0.86rem', color: '#cbd5e1' }}>
          {activeTab === 'deities' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.1rem' }}>Golarion Deities &amp; Cleric Domains</h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                    Clerics choose a Domain appropriate for their deity to add those Domain powers to their available Cleric list.
                  </p>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter deities, domains, powers..."
                  style={{ minWidth: 230 }}
                />
              </div>

              <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #292018', background: 'rgba(0, 0, 0, 0.35)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(245, 158, 11, 0.12)', textAlign: 'left', color: '#fbbf24' }}>
                      <th style={{ padding: '9px 12px' }}>Deity</th>
                      <th style={{ padding: '9px 12px' }}>Align</th>
                      <th style={{ padding: '9px 12px' }}>Areas of Concern</th>
                      <th style={{ padding: '9px 12px' }}>Domains</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeities.map((d) => (
                      <tr key={d.name} style={{ borderTop: '1px solid #292018' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>{d.name}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <span
                            style={{
                              padding: '2px 7px',
                              borderRadius: 6,
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              background:
                                d.alignment === 'Good'
                                  ? 'rgba(34, 197, 94, 0.18)'
                                  : d.alignment === 'Evil'
                                  ? 'rgba(239, 68, 68, 0.18)'
                                  : 'rgba(148, 163, 184, 0.18)',
                              color:
                                d.alignment === 'Good'
                                  ? '#4ade80'
                                  : d.alignment === 'Evil'
                                  ? '#fca5a5'
                                  : '#cbd5e1'
                            }}
                          >
                            {d.alignment}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{d.concerns}</td>
                        <td style={{ padding: '8px 12px', color: '#fde68a' }}>{d.domains.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4 style={{ color: '#fbbf24', margin: '4px 0 0', fontSize: '1rem' }}>
                Domains ({filteredDomains.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))', gap: 10 }}>
                {filteredDomains.map((dom) => (
                  <div
                    key={dom.name}
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid #292018',
                      borderRadius: 12,
                      padding: 12
                    }}
                  >
                    <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: '0.9rem' }}>{dom.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2 }}>
                      <strong>Aspects:</strong> {dom.aspects}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: 2 }}>
                      <strong>Deities:</strong> {dom.deities}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#e9d5ff', marginTop: 6 }}>
                      <strong>Powers:</strong> {dom.powers.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bloodlines' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.1rem' }}>Sorcerer Bloodlines</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Sorcerers select one Bloodline at Novice Rank and unlock its Advanced Form with the Heroic Class Edge.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12 }}>
                {PF_BLOODLINES.map((bl) => (
                  <div
                    key={bl.name}
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid #292018',
                      borderRadius: 12,
                      padding: 14
                    }}
                  >
                    <div style={{ fontWeight: 900, color: '#c084fc', fontSize: '0.95rem', marginBottom: 6 }}>
                      {bl.name}
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#e2e8f0', marginBottom: 6 }}>
                      <strong>Base Ability:</strong> {bl.baseAbility}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#fde68a' }}>
                      <strong>Advanced Form (Heroic):</strong> {bl.advancedAbility}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.1rem' }}>Special Materials &amp; Masterwork Craft</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Special material properties do not stack with one another; only the best quality applies in any situation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PF_SPECIAL_MATERIALS.map((mat) => (
                  <div
                    key={mat.name}
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid #292018',
                      borderRadius: 12,
                      padding: 14
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      <strong style={{ color: '#fbbf24', fontSize: '0.94rem' }}>{mat.name}</strong>
                      <span style={{ fontSize: '0.76rem', color: '#4ade80', fontWeight: 700 }}>{mat.cost}</span>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>{mat.effect}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'magic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid #292018', borderRadius: 12, padding: 14 }}>
                <h3 style={{ color: '#fbbf24', margin: '0 0 8px 0', fontSize: '1.05rem' }}>Using Magic Items</h3>
                <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem' }}>
                  {PF_MAGIC_ITEM_RULES.usage.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid #292018', borderRadius: 12, padding: 14 }}>
                <h3 style={{ color: '#fbbf24', margin: '0 0 8px 0', fontSize: '1.05rem' }}>Starting Wealth by Rank</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
                  {PF_MAGIC_ITEM_RULES.wealthByRank.map((row) => (
                    <div key={row.rank} style={{ padding: 10, borderRadius: 8, background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#fbbf24' }}>{row.rank}</div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fff', marginTop: 2 }}>{row.wealth}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid #292018', borderRadius: 12, padding: 14 }}>
                <h3 style={{ color: '#fbbf24', margin: '0 0 8px 0', fontSize: '1.05rem' }}>Key Savage Pathfinder Setting Rules</h3>
                <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem' }}>
                  {PF_MAGIC_ITEM_RULES.settingDifferences.map((diff, i) => (
                    <li key={i}>{diff}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
