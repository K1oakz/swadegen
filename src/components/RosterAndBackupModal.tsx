import React, { useState } from 'react';
import { SwadeCharacter } from '../types/swade';
import { SAMPLE_CHARACTERS } from '../data/swadeData';
import { calculateDerivedStats, getAncestry } from '../utils/swadeRules';

interface RosterAndBackupModalProps {
  mode: 'roster' | 'backup';
  characters: SwadeCharacter[];
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onCreateBlank: () => void;
  onDuplicateCharacter: (char: SwadeCharacter) => void;
  onDeleteCharacter: (id: string) => void;
  onImportCharacters: (chars: SwadeCharacter[]) => void;
  onResetSamples: () => void;
  onClose: () => void;
}

export const RosterAndBackupModal: React.FC<RosterAndBackupModalProps> = ({
  mode,
  characters,
  activeCharacterId,
  onSelectCharacter,
  onCreateBlank,
  onDuplicateCharacter,
  onDeleteCharacter,
  onImportCharacters,
  onResetSamples,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'export' | 'import'>(
    mode === 'roster' ? 'roster' : 'export'
  );
  const [importText, setImportText] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const exportPayload = JSON.stringify(
    {
      app: 'SWADE Character Forge',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      characters
    },
    null,
    2
  );

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportPayload);
      setCopyStatus('Copied to clipboard!');
      setTimeout(() => setCopyStatus(''), 2500);
    } catch {
      setCopyStatus('Select and copy text below.');
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([exportPayload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swade-characters-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleParseImport = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const list: SwadeCharacter[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.characters)
        ? parsed.characters
        : parsed.id && parsed.attributes
        ? [parsed]
        : [];
      if (list.length === 0) {
        alert('No valid SWADE characters found in JSON.');
        return;
      }
      onImportCharacters(list);
      onClose();
    } catch {
      alert('Invalid JSON format. Please check your backup data.');
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 620,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '2px solid var(--border-strong)',
          borderRadius: 20,
          padding: 18
        }}
      >
        {/* Top Header & Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setActiveTab('roster')}
              style={{
                padding: '7px 12px',
                borderRadius: 9,
                fontSize: '0.8rem',
                fontWeight: 800,
                background: activeTab === 'roster' ? '#f59e0b' : 'rgba(255,255,255,0.07)',
                color: activeTab === 'roster' ? '#110d08' : 'var(--text-secondary)'
              }}
            >
              Character Roster ({characters.length})
            </button>
            <button
              onClick={() => setActiveTab('export')}
              style={{
                padding: '7px 12px',
                borderRadius: 9,
                fontSize: '0.8rem',
                fontWeight: 800,
                background: activeTab === 'export' ? '#f59e0b' : 'rgba(255,255,255,0.07)',
                color: activeTab === 'export' ? '#110d08' : 'var(--text-secondary)'
              }}
            >
              Export JSON
            </button>
            <button
              onClick={() => setActiveTab('import')}
              style={{
                padding: '7px 12px',
                borderRadius: 9,
                fontSize: '0.8rem',
                fontWeight: 800,
                background: activeTab === 'import' ? '#f59e0b' : 'rgba(255,255,255,0.07)',
                color: activeTab === 'import' ? '#110d08' : 'var(--text-secondary)'
              }}
            >
              Import JSON
            </button>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'rgba(255, 255, 255, 0.08)',
              fontWeight: 800
            }}
          >
            ✕
          </button>
        </div>

        {/* ROSTER TAB */}
        {activeTab === 'roster' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 14 }}>
              <button
                onClick={() => {
                  onCreateBlank();
                  onClose();
                }}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 11,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#110d08',
                  fontWeight: 900,
                  fontSize: '0.84rem'
                }}
              >
                + New Blank Wild Card
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {characters.map((ch) => {
                const isSelected = ch.id === activeCharacterId;
                const derived = calculateDerivedStats(ch);
                const anc = getAncestry(ch.ancestryId);

                return (
                  <div
                    key={ch.id}
                    style={{
                      padding: 12,
                      borderRadius: 14,
                      background: isSelected ? 'rgba(245, 158, 11, 0.14)' : 'rgba(0, 0, 0, 0.35)',
                      border: `1px solid ${isSelected ? '#f59e0b' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      flexWrap: 'wrap'
                    }}
                  >
                    <button
                      onClick={() => {
                        onSelectCharacter(ch.id);
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        textAlign: 'left',
                        flex: 1
                      }}
                    >
                      {ch.avatarImage ? (
                        <img
                          src={ch.avatarImage}
                          alt={ch.name}
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            objectFit: 'cover',
                            border: `1px solid ${isSelected ? '#f59e0b' : 'var(--border-subtle)'}`,
                            background: '#111'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                            border: `1px solid ${isSelected ? '#f59e0b' : 'var(--border-subtle)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: '1.1rem',
                            color: isSelected ? '#fbbf24' : '#fff'
                          }}
                        >
                          {ch.name ? ch.name.charAt(0).toUpperCase() : 'H'}
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 900, fontSize: '0.94rem', color: '#fff' }}>
                          {ch.name}{' '}
                          {isSelected && (
                            <span style={{ fontSize: '0.68rem', color: '#fbbf24' }}>(ACTIVE)</span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          {anc.name} • {derived.rank} • {ch.concept}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          Pace {derived.pace} • Parry {derived.parry} • Toughness {derived.toughnessTotal}({derived.armorBonus})
                        </div>
                      </div>
                    </button>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => onDuplicateCharacter(ch)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.08)',
                          fontSize: '0.73rem',
                          fontWeight: 700
                        }}
                      >
                        Copy
                      </button>
                      {characters.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${ch.name}?`)) {
                              onDeleteCharacter(ch.id);
                            }
                          }}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 8,
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#fca5a5',
                            fontSize: '0.73rem',
                            fontWeight: 800
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EXPORT TAB */}
        {activeTab === 'export' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Export all {characters.length} character(s) as a `.json` backup file or copy the JSON text to transfer across builds and devices.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadJson}
                style={{
                  padding: '9px 14px',
                  borderRadius: 10,
                  background: '#f59e0b',
                  color: '#110d08',
                  fontWeight: 900,
                  fontSize: '0.82rem'
                }}
              >
                Download .JSON File
              </button>
              <button
                onClick={handleCopyJson}
                style={{
                  padding: '9px 14px',
                  borderRadius: 10,
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid #38bdf8',
                  color: '#38bdf8',
                  fontWeight: 800,
                  fontSize: '0.82rem'
                }}
              >
                Copy JSON to Clipboard
              </button>
              {copyStatus && (
                <span style={{ fontSize: '0.78rem', color: '#4ade80', alignSelf: 'center', fontWeight: 700 }}>
                  {copyStatus}
                </span>
              )}
            </div>
            <textarea
              readOnly
              rows={10}
              value={exportPayload}
              style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.75rem' }}
            />
          </div>
        )}

        {/* IMPORT TAB */}
        {activeTab === 'import' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Upload a `.json` backup file or paste exported JSON below to restore or add characters to your roster.
            </p>
            <input
              type="file"
              accept=".json,application/json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === 'string') {
                    handleParseImport(reader.result);
                  }
                };
                reader.readAsText(file);
              }}
            />
            <textarea
              rows={8}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Or paste exported SWADE character JSON here..."
              style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.75rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <button
                onClick={() => {
                  if (window.confirm('Restore starter sample characters (Valeria & Silas)?')) {
                    onResetSamples();
                    onClose();
                  }
                }}
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.76rem',
                  fontWeight: 700
                }}
              >
                Load Starter Archetypes ({SAMPLE_CHARACTERS.length})
              </button>
              <button
                onClick={() => handleParseImport(importText)}
                disabled={!importText.trim()}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  background: importText.trim() ? '#22c55e' : 'rgba(255,255,255,0.06)',
                  color: importText.trim() ? '#06150b' : 'var(--text-muted)',
                  fontWeight: 900,
                  fontSize: '0.82rem'
                }}
              >
                Import JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
