/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';

// ====================
// GLOBAL CONSTANTS
// ====================

const COLOR_TOKENS = {
  dark: {
    bg: '#0a0a0f',
    sidebar: '#0f1117',
    card: '#13151c',
    border: '#1e2330',
    textPrimary: '#ffffff',
    textSecondary: '#8892a4',
    accent: '#39FF14', // Neon Green
    cyan: '#00E5FF',
    danger: '#FF3131',
    warning: '#FFA500',
    tickerBg: '#0f2a0f',
    tickerText: '#39FF14',
    bannerFrom: '#0a2a0a',
    bannerTo: '#0a1a2a',
  },
  light: {
    bg: '#f0f7f0',
    sidebar: '#e8f5e8',
    card: '#ffffff',
    border: '#c8e6c8',
    textPrimary: '#1a1a1a',
    textSecondary: '#4a5568',
    accent: '#2d9e00',
    cyan: '#0077aa',
    danger: '#cc0000',
    warning: '#e67e00',
    tickerBg: '#d4edda',
    tickerText: '#2d9e00',
    bannerFrom: '#e8f5e8',
    bannerTo: '#d4edda',
  }
};

const ANIMATIONS = `
  @keyframes scanLine { 0%{top:0%} 50%{top:90%} 100%{top:0%} }
  @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes slowRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes tickerScroll { from{transform:translateX(100%)} to{transform:translateX(-100%)} }
  @keyframes fadeIn { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
  @keyframes glowPulse { 0%,100%{box-shadow:0 0 8px #00E5FF44} 50%{box-shadow:0 0 24px #00E5FFaa} }
  @keyframes cardHover { to{transform:translateY(-2px)} }
`;

// ====================
// UTILITY COMPONENTS
// ====================

const Badge = ({ children, color, themeColors }) => (
  <span style={{
    backgroundColor: color,
    color: '#fff',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'inline-block'
  }}>
    {children}
  </span>
);

const Pill = ({ children, themeColors, active }) => (
  <span style={{
    backgroundColor: active ? themeColors.accent : themeColors.border,
    color: active ? '#000' : themeColors.textSecondary,
    borderRadius: '20px',
    padding: '2px 10px',
    fontSize: '11px',
    fontWeight: '600',
    marginRight: '4px'
  }}>
    {children}
  </span>
);

// ====================
// MAIN APP COMPONENT
// ====================

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('impact');
  const [amdMode, setAmdMode] = useState(false);

  const themeColors = COLOR_TOKENS[theme];

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navItems = [
    { id: 'impact', label: 'Impact Tracker', icon: '📊' },
    { id: 'scanner', label: 'Scanner', icon: '🔬' },
    { id: 'map', label: 'Campus Map', icon: '🗺️' },
    { id: 'hub', label: 'Salvage Hub', icon: '♻️' },
    { id: 'safety', label: 'Safety Library', icon: '🛡️' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100vw',
      height: '100vh',
      backgroundColor: themeColors.bg,
      color: themeColors.textPrimary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      <style>{ANIMATIONS}</style>

      {/* SIDEBAR */}
      <aside style={{
        width: sidebarCollapsed ? '64px' : '260px',
        backgroundColor: themeColors.sidebar,
        borderRight: `1px solid ${themeColors.border}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100,
        position: 'relative'
      }}>
        {/* Sidebar Top */}
        <div 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            padding: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            borderBottom: `1px solid ${themeColors.border}`
          }}
        >
          <span style={{ fontSize: '20px' }}>☰</span>
          {!sidebarCollapsed && (
            <div style={{ marginLeft: '12px' }}>
              <div style={{ color: themeColors.accent, fontWeight: 'bold', fontSize: '20px', lineHeight: '1' }}>Silicon-Cycle</div>
              <div style={{ color: themeColors.textSecondary, fontSize: '12px', marginTop: '4px' }}>E-Waste AI</div>
            </div>
          )}
        </div>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: themeColors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#000'
            }}>CU</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Campus User</div>
              <div style={{ color: themeColors.accent, fontSize: '11px' }}>Green Tier ♻️</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ flex: 1, marginTop: '8px' }}>
          {navItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveView(item.id)}
              title={sidebarCollapsed ? item.label : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                padding: '12px 16px',
                cursor: 'pointer',
                borderLeft: activeView === item.id ? `3px solid ${themeColors.accent}` : '3px solid transparent',
                backgroundColor: activeView === item.id ? `${themeColors.accent}15` : 'transparent',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${themeColors.accent}10`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = activeView === item.id ? `${themeColors.accent}15` : 'transparent'}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {!sidebarCollapsed && (
                <span style={{ 
                  marginLeft: '12px', 
                  fontSize: '14px', 
                  fontWeight: activeView === item.id ? '600' : '400',
                  color: activeView === item.id ? themeColors.textPrimary : themeColors.textSecondary
                }}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Bottom */}
        <div style={{ 
          padding: '16px', 
          borderTop: `1px solid ${themeColors.border}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: sidebarCollapsed ? 'center' : 'flex-start'
        }}>
          {sidebarCollapsed ? (
            <span style={{ color: themeColors.cyan, fontSize: '18px' }}>⚡</span>
          ) : (
            <>
              <div style={{ color: themeColors.cyan, fontWeight: 'bold', fontSize: '12px' }}>⚡ AMD Ryzen AI NPU</div>
              <div style={{ color: themeColors.textSecondary, fontSize: '10px' }}>Vision Processing Core</div>
            </>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header Bar */}
        <header style={{
          height: '52px',
          backgroundColor: themeColors.sidebar,
          borderBottom: `1px solid ${themeColors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0
        }}>
          <div style={{ color: themeColors.textSecondary, fontSize: '13px' }}>
            {(() => {
              const hour = new Date().getHours();
              if (hour < 12) return "Good morning, Campus User 👋";
              if (hour < 18) return "Good afternoon, Campus User 👋";
              return "Good evening, Campus User 👋";
            })()}
          </div>
          <button 
            onClick={toggleTheme}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: `1px solid ${themeColors.border}`,
              backgroundColor: themeColors.card,
              color: themeColors.textPrimary,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        {/* Ticker Strip */}
        <div style={{
          height: '28px',
          backgroundColor: themeColors.tickerBg,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{
            whiteSpace: 'nowrap',
            color: themeColors.tickerText,
            fontFamily: 'monospace',
            fontSize: '12px',
            animation: 'tickerScroll 25s linear infinite',
            paddingLeft: '100%'
          }}>
            ♻️ 4.7 kg diverted this month  |  🌱 38 components recovered  |  ⚡ AMD NPU inference: 12ms avg  |  🔩 3 components listed on Salvage Hub today  |  🌍 Campus carbon offset: 12.3 kg CO₂  |  💡 New safety guide: CRT Monitor added
          </div>
        </div>

        {/* Active View Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          animation: 'fadeIn 0.5s ease-out'
        }} key={activeView}>
          {activeView === 'impact' && <ImpactTrackerView themeColors={themeColors} />}
          {activeView === 'scanner' && <ScannerView themeColors={themeColors} amdMode={amdMode} setAmdMode={setAmdMode} />}
          {activeView === 'map' && <CampusMapView themeColors={themeColors} theme={theme} />}
          {activeView === 'hub' && <SalvageHubView themeColors={themeColors} />}
          {activeView === 'safety' && <SafetyLibraryView themeColors={themeColors} />}
        </div>
      </main>
    </div>
  );
}

// ====================
// VIEW COMPONENTS
// ====================

function ImpactTrackerView({ themeColors }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{
        width: '100%',
        height: '150px',
        borderRadius: '12px',
        marginBottom: '24px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${themeColors.bannerFrom}, ${themeColors.bannerTo})`,
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
        boxSizing: 'border-box'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', color: themeColors.accent, fontWeight: 'bold' }}>Recycle Smarter. Impact Bigger.</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: themeColors.textSecondary }}>Every component you recover is a step toward a greener campus.</p>
        </div>
        <div style={{ fontSize: '60px', animation: 'slowRotate 20s linear infinite' }}>🌍</div>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {[
          { icon: '⚖️', value: '4.7 kg', label: 'Total E-Waste Diverted' },
          { icon: '🌫️', value: '12.3 kg', label: 'CO₂ Emissions Saved' },
          { icon: '🔩', value: '38', label: 'Components Recovered' },
          { icon: '🌳', value: '3', label: 'Equivalent Trees Saved' },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: themeColors.card,
            border: `1px solid ${themeColors.border}`,
            borderRadius: '12px',
            padding: '20px',
            transition: 'all 0.2s ease',
            cursor: 'default',
          }} onMouseEnter={e => {
            e.currentTarget.style.borderLeft = `3px solid ${themeColors.accent}`;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} onMouseLeave={e => {
            e.currentTarget.style.borderLeft = `1px solid ${themeColors.border}`;
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{stat.icon}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: themeColors.accent, fontFamily: '"Courier New", Courier, monospace' }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: themeColors.textSecondary, marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scan Timeline */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ color: themeColors.accent, fontSize: '18px' }}>📋</span>
          <h2 style={{ margin: 0, fontSize: '18px', color: themeColors.textPrimary }}>Scan Timeline</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'Dell Laptop Motherboard', date: '28 Feb 2025', score: '82 pts', action: 'Salvaged' },
            { name: 'Broken iPhone 11', date: '25 Feb 2025', score: '45 pts', action: 'Disposed' },
            { name: 'DDR4 RAM 16GB', date: '20 Feb 2025', score: '95 pts', action: 'Salvaged' },
            { name: 'Old CRT Monitor', date: '15 Feb 2025', score: '70 pts', action: 'Disposed' },
          ].map((entry, i) => (
            <div key={i} style={{
              backgroundColor: themeColors.card,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: `1px solid ${themeColors.border}`,
              transition: 'all 0.2s ease'
            }} onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.1)`;
            }} onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{entry.name}</div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginTop: '2px' }}>{entry.date}</div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: themeColors.accent,
                  color: '#000',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>{entry.score}</div>
                <div style={{
                  backgroundColor: entry.action === 'Salvaged' ? themeColors.accent : themeColors.danger,
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>{entry.action}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ 
          color: themeColors.textSecondary, 
          fontStyle: 'italic', 
          fontSize: '13px', 
          textAlign: 'center', 
          marginTop: '16px' 
        }}>
          "You've kept 4.7 kg of e-waste out of landfills. That's the weight of a small laptop — rescued."
        </p>
      </div>

      {/* Weekly Goal Bar */}
      <div style={{ backgroundColor: themeColors.card, padding: '20px', borderRadius: '12px', border: `1px solid ${themeColors.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Weekly E-Waste Goal: 6.8 / 10 kg</span>
          <span style={{ fontSize: '14px', color: themeColors.accent }}>68%</span>
        </div>
        <div style={{ width: '100%', height: '10px', backgroundColor: themeColors.border, borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', backgroundColor: themeColors.accent, borderRadius: '5px', transition: 'width 1s ease' }}></div>
        </div>
      </div>
    </div>
  );
}

function ScannerView({ themeColors, amdMode, setAmdMode }) {
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [tip, setTip] = useState('');
  const [warningVisible, setWarningVisible] = useState(true);

  const tips = [
    "💡 Tip: Even a single copper coil can be repurposed in DIY electronics projects.",
    "💡 Did you know? A ton of circuit boards contains more gold than a ton of gold ore.",
    "💡 Tip: Discharging a capacitor before dismantling can prevent electric shock."
  ];

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const handleScan = () => {
    setScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 2500);
  };

  const resetScanner = () => {
    setScanning(false);
    setShowResults(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>🔬 AI Component Scanner</h1>
          <p style={{ margin: '4px 0 0 0', color: themeColors.textSecondary, fontSize: '14px' }}>Upload an image of your e-waste for instant AI analysis</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>AMD Edge Mode</span>
            <div 
              onClick={() => setAmdMode(!amdMode)}
              style={{
                width: '48px',
                height: '24px',
                backgroundColor: amdMode ? themeColors.cyan : '#666',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: amdMode ? '27px' : '3px',
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}></div>
            </div>
          </div>
          <div style={{ 
            fontSize: '11px', 
            color: amdMode ? themeColors.cyan : themeColors.textSecondary,
            fontWeight: amdMode ? 'bold' : 'normal'
          }}>
            {amdMode ? '⚡ AMD Ryzen AI NPU — Offline Mode Active' : '☁️ Cloud Mode — Gemini Vision API'}
          </div>
        </div>
      </div>

      <p style={{ color: themeColors.textSecondary, fontStyle: 'italic', fontSize: '13px', textAlign: 'center', marginBottom: '24px' }}>
        {tip}
      </p>

      {!scanning && !showResults && (
        <>
          <div style={{
            width: '100%',
            height: '320px',
            border: `2px dashed ${themeColors.cyan}`,
            borderRadius: '16px',
            backgroundColor: `${themeColors.cyan}08`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'glowPulse 2.5s ease-in-out infinite',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>📁 Drop E-Waste Image Here</div>
            <div style={{ color: themeColors.textSecondary, fontSize: '13px' }}>or click to upload</div>
          </div>
          <button 
            onClick={handleScan}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: themeColors.accent,
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}
          >
            SCAN DEVICE
          </button>
        </>
      )}

      {scanning && (
        <div style={{
          width: '100%',
          height: '200px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          backgroundColor: `${themeColors.cyan}0d`,
          border: `1px solid ${themeColors.cyan}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: themeColors.cyan,
            animation: 'scanLine 1.5s ease-in-out infinite',
            boxShadow: `0 0 10px ${themeColors.cyan}`
          }}></div>
          <div style={{ color: themeColors.cyan, fontFamily: 'monospace', fontSize: '14px', marginTop: '20px' }}>
            Deciphering Silicon Architecture...
          </div>
        </div>
      )}

      {showResults && (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Component Breakdown</h2>
            <div style={{
              backgroundColor: `${themeColors.accent}22`,
              color: themeColors.accent,
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: `1px solid ${themeColors.accent}`
            }}>✓ Scan Complete</div>
          </div>

          <div style={{ 
            backgroundColor: themeColors.card, 
            borderRadius: '12px', 
            border: `1px solid ${themeColors.border}`,
            overflow: 'hidden',
            marginBottom: '24px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: themeColors.border, textAlign: 'left' }}>
                  {['Component', 'Material', 'Action', 'Est. Value', 'Safety Risk'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: '11px', color: themeColors.textSecondary, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'CPU Heat Sink', mat: 'Aluminum + Copper', action: 'SALVAGE 🟢', value: '₹120', risk: 'Low' },
                  { name: 'Li-ion Battery Pack', mat: 'Lithium, Cobalt', action: 'DISPOSE 🔴', value: '—', risk: 'High' },
                  { name: 'RAM Stick 4GB DDR3', mat: 'Silicon, Gold traces', action: 'SELL 🟡', value: '₹80', risk: 'Low' },
                  { name: 'Capacitors x12', mat: 'Electrolytic', action: 'SALVAGE 🟢', value: '₹40', risk: 'Medium' },
                  { name: 'Power Connector Pins', mat: 'Gold-plated copper', action: 'SELL 🟡', value: '₹60', risk: 'Low' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${themeColors.border}` }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500' }}>{row.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: themeColors.textSecondary }}>{row.mat}</td>
                    <td style={{ 
                      padding: '12px 16px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      color: row.action.includes('SALVAGE') ? themeColors.accent : row.action.includes('SELL') ? themeColors.warning : themeColors.danger
                    }}>{row.action}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: themeColors.accent }}>{row.value}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px' }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: themeColors.accent }}>Salvage Impact Score: 84 / 100</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: themeColors.border, borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '84%', height: '100%', backgroundColor: themeColors.accent, borderRadius: '5px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button 
              onClick={() => alert("Report exported as PDF — Silicon-Cycle_Scan_Report.pdf")}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: `1px solid ${themeColors.accent}`,
                backgroundColor: 'transparent',
                color: themeColors.accent,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >Export Salvage Report ↓</button>
          </div>

          {warningVisible && (
            <div style={{
              backgroundColor: `${themeColors.danger}1a`,
              borderLeft: `4px solid ${themeColors.danger}`,
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                ⚠️ <strong>Hazardous Material Detected:</strong> Li-ion battery requires certified disposal. Do not puncture or incinerate.
              </div>
              <button 
                onClick={() => setWarningVisible(false)}
                style={{ background: 'none', border: 'none', color: themeColors.textSecondary, cursor: 'pointer', fontSize: '16px' }}
              >✕</button>
            </div>
          )}

          <button 
            onClick={resetScanner}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${themeColors.cyan}`,
              backgroundColor: 'transparent',
              color: themeColors.cyan,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >Scan Another Device</button>
        </div>
      )}
    </div>
  );
}

function CampusMapView({ themeColors, theme }) {
  const locations = [
    { name: 'Lab Block A', type: 'General E-Waste Bin', accepts: 'Motherboards, PCBs, Wiring', status: 'Active', top: '15%', left: '20%' },
    { name: 'Central Library', type: 'Battery Drop Box', accepts: 'Li-ion, AA/AAA, Button cells', status: 'Active', top: '40%', left: '55%' },
    { name: 'Hostel Block C', type: 'Phone & Charger Bin', accepts: 'Phones, Chargers, Earphones', status: 'Full', top: '65%', left: '30%' },
    { name: 'Innovation Hub', type: 'Full Device Recycling', accepts: 'Laptops, Tablets, Monitors', status: 'Active', top: '25%', left: '75%' },
    { name: 'Admin Block', type: 'Certified Recycler Pickup', accepts: 'All E-Waste Categories', status: 'Active', top: '75%', left: '70%' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>🗺️ Campus E-Waste Drop Points</h1>
      <p style={{ margin: '4px 0 24px 0', color: themeColors.textSecondary, fontSize: '14px' }}>Find certified collection zones on your campus</p>

      {/* Simulated Map */}
      <div style={{
        width: '100%',
        height: '480px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme === 'dark' ? '#0d1f0d' : '#c8e6c8',
        backgroundImage: `linear-gradient(rgba(57,255,20,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.08) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        marginBottom: '32px',
        border: `1px solid ${themeColors.border}`
      }}>
        {locations.map((loc, i) => (
          <div key={i} style={{ position: 'absolute', top: loc.top, left: loc.left, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: themeColors.accent,
                borderRadius: '50%',
                boxShadow: `0 0 12px ${themeColors.accent}`,
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            ></div>
            <div style={{
              marginTop: '8px',
              backgroundColor: themeColors.card,
              border: `1px solid ${themeColors.border}`,
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>{loc.name}</div>
          </div>
        ))}
      </div>

      {/* Location Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {locations.map((loc, i) => (
          <div key={i} style={{
            backgroundColor: themeColors.card,
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${themeColors.border}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease'
          }} onMouseEnter={e => {
            e.currentTarget.style.borderLeft = `3px solid ${themeColors.accent}`;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} onMouseLeave={e => {
            e.currentTarget.style.borderLeft = `1px solid ${themeColors.border}`;
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>📍 {loc.name}</div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginTop: '2px' }}>{loc.type}</div>
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: 'bold', 
                  color: loc.status === 'Active' ? themeColors.accent : themeColors.warning 
                }}>
                  ● {loc.status === 'Active' ? 'Active' : 'Full — Check Back Later'}
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '13px' }}>
                <span style={{ color: themeColors.textSecondary }}>Accepts: </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                  {loc.accepts.split(', ').map(item => (
                    <span key={item} style={{
                      backgroundColor: themeColors.border,
                      borderRadius: '20px',
                      padding: '2px 8px',
                      fontSize: '10px'
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => alert("Opening directions...")}
              style={{
                marginTop: '16px',
                padding: '8px',
                borderRadius: '6px',
                border: `1px solid ${themeColors.accent}`,
                backgroundColor: 'transparent',
                color: themeColors.accent,
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >Get Directions →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SalvageHubView({ themeColors }) {
  const [activeTab, setActiveTab] = useState('available');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const components = [
    { name: 'Copper Heat Sink', dept: 'EE Dept', cond: 'Good', cat: 'SALVAGE', price: 'Free to Claim' },
    { name: '16GB DDR4 RAM', dept: 'CS Dept', cond: 'Fair', cat: 'SELL', price: '₹350' },
    { name: 'Working 120mm Fan', dept: 'Mech Dept', cond: 'Good', cat: 'SALVAGE', price: 'Free to Claim' },
    { name: 'Li-ion Cell 3.7V', dept: 'Physics Lab', cond: 'For Parts', cat: 'SELL', price: '₹40' },
    { name: 'HDMI Cable 1.5m', dept: 'Media Room', cond: 'Good', cat: 'SALVAGE', price: 'Free to Claim' },
    { name: 'Laptop Keyboard', dept: 'CS Dept', cond: 'Fair', cat: 'SELL', price: '₹120' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    e.target.reset();
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>♻️ Campus Salvage Exchange</h1>
      <p style={{ margin: '4px 0 24px 0', color: themeColors.textSecondary, fontSize: '14px' }}>Give components a second life</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: `1px solid ${themeColors.border}`, marginBottom: '24px' }}>
        {['Available Components', 'List a Component'].map(tab => {
          const id = tab.toLowerCase().includes('available') ? 'available' : 'list';
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: '12px 0',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === id ? `2px solid ${themeColors.accent}` : '2px solid transparent',
                color: activeTab === id ? themeColors.accent : themeColors.textSecondary,
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >{tab}</button>
          );
        })}
      </div>

      {activeTab === 'available' && (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', color: themeColors.textSecondary }}>Filter:</span>
            <select style={{
              backgroundColor: themeColors.card,
              border: `1px solid ${themeColors.border}`,
              color: themeColors.textPrimary,
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '13px'
            }}>
              <option>All</option>
              <option>Salvageable</option>
              <option>For Sale</option>
              <option>Claimed</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {components.map((comp, i) => (
              <div key={i} style={{
                backgroundColor: themeColors.card,
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${themeColors.border}`,
                transition: 'all 0.2s ease'
              }} onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }} onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{comp.name}</div>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: comp.cat === 'SALVAGE' ? `${themeColors.accent}22` : `${themeColors.warning}22`,
                    color: comp.cat === 'SALVAGE' ? themeColors.accent : themeColors.warning,
                    border: `1px solid ${comp.cat === 'SALVAGE' ? themeColors.accent : themeColors.warning}`
                  }}>{comp.cat}</div>
                </div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '12px' }}>Posted by: Student — {comp.dept}</div>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    backgroundColor: comp.cond === 'Good' ? `${themeColors.accent}22` : comp.cond === 'Fair' ? `${themeColors.warning}22` : `${themeColors.danger}22`,
                    color: comp.cond === 'Good' ? themeColors.accent : comp.cond === 'Fair' ? themeColors.warning : themeColors.danger,
                    fontWeight: 'bold'
                  }}>{comp.cond}</span>
                </div>

                <div style={{ fontSize: '16px', fontWeight: 'bold', color: comp.price.includes('Free') ? themeColors.accent : themeColors.warning, marginBottom: '16px' }}>
                  {comp.price}
                </div>

                <button style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: comp.cat === 'SALVAGE' ? themeColors.accent : 'transparent',
                  border: comp.cat === 'SALVAGE' ? 'none' : `1px solid ${themeColors.accent}`,
                  color: comp.cat === 'SALVAGE' ? '#000' : themeColors.accent,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  {comp.cat === 'SALVAGE' ? 'Claim for DIY' : 'Contact to Buy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '600px' }}>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Component Name</label>
              <input type="text" required style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: `1px solid ${themeColors.border}`,
                backgroundColor: themeColors.card,
                color: themeColors.textPrimary
              }} />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Condition</label>
                <select style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${themeColors.border}`,
                  backgroundColor: themeColors.card,
                  color: themeColors.textPrimary
                }}>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>For Parts</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Category</label>
                <select style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${themeColors.border}`,
                  backgroundColor: themeColors.card,
                  color: themeColors.textPrimary
                }}>
                  <option>Salvageable</option>
                  <option>For Sale</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Description</label>
              <textarea rows="3" required style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: `1px solid ${themeColors.border}`,
                backgroundColor: themeColors.card,
                color: themeColors.textPrimary,
                resize: 'none'
              }}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Price</label>
              <input type="text" placeholder="Enter price or type 'Free'" required style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: `1px solid ${themeColors.border}`,
                backgroundColor: themeColors.card,
                color: themeColors.textPrimary
              }} />
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: themeColors.accent,
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}>List Component →</button>
          </form>
          {formSubmitted && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: `${themeColors.accent}22`,
              color: themeColors.accent,
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              border: `1px solid ${themeColors.accent}`,
              animation: 'fadeIn 0.3s ease-out'
            }}>
              ✅ Component listed successfully! It will appear on the hub shortly.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SafetyLibraryView({ themeColors }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({});

  const safetyData = [
    {
      id: 1, emoji: '💻', name: 'Laptop', risk: 'High',
      tips: ['Remove battery before opening chassis', 'Screen may contain mercury — handle with care', 'Sharp metal edges — use cut-resistant gloves'],
      expanded: "Laptop batteries can swell and rupture if punctured. Always discharge to 0% before removal. Screens older than 2015 may contain CCFL backlights with mercury vapor."
    },
    {
      id: 2, emoji: '📱', name: 'Smartphone', risk: 'High',
      tips: ['Li-ion batteries can ignite if bent or punctured', 'OLED screens contain organic compounds — avoid breaking', 'Use plastic pry tools, never metal on screen'],
      expanded: "Smartphone batteries are glued in most models. Use isopropyl alcohol (90%+) to loosen adhesive before prying. Never use heat guns near the battery."
    },
    {
      id: 3, emoji: '🖨️', name: 'Printer', risk: 'Medium',
      tips: ['Toner powder is a respiratory hazard — use a mask', 'Main capacitor may hold charge after unplugging', 'Rubber rollers may contain chemical plasticizers'],
      expanded: "Laser printer toner contains fine carbon particles. If spilled, do not use a regular vacuum — use an ESD-safe vacuum or damp cloth only."
    },
    {
      id: 4, emoji: '🔌', name: 'Charger/Adapter', risk: 'Medium',
      tips: ['Internal capacitors hold charge even when unplugged — wait 30 mins', 'Never strip wires near the ferrite core', 'Check for swelling on the PCB before handling'],
      expanded: "Charger PCBs operate at mains voltage (220V). Even after unplugging, capacitors can deliver a shock. Short the output pins with a resistor before opening."
    },
    {
      id: 5, emoji: '🖥️', name: 'CRT Monitor', risk: 'High',
      tips: ['Vacuum tube can implode — never strike the glass', 'Flyback transformer stores up to 30,000V — do not open without discharge tool', 'Lead-coated glass inside — wear gloves and eye protection'],
      expanded: "CRT monitors are the most dangerous consumer electronics to dismantle. The anode voltage can persist for days after unplugging. This device should only be handled by certified e-waste technicians."
    },
    {
      id: 6, emoji: '🎧', name: 'Earphones/Headphones', risk: 'Low',
      tips: ['Small rare-earth magnets in drivers — keep away from credit cards and pacemakers', 'Fine copper wire inside — avoid inhalation of solder fumes if resoldering', 'Foam ear tips may contain latex — check for allergies'],
      expanded: "Earphone drivers use neodymium magnets which, while small, can pinch skin if two are snapped together. Store separated. Safe for general DIY disassembly."
    }
  ];

  const filteredData = safetyData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>🛡️ E-Waste Safety Protocols</h1>
      <p style={{ margin: '4px 0 24px 0', color: themeColors.textSecondary, fontSize: '14px' }}>Know before you dismantle</p>

      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="Search by device type or hazard..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            height: '44px',
            border: `2px solid ${themeColors.cyan}`,
            borderRadius: '8px',
            backgroundColor: themeColors.card,
            color: themeColors.textPrimary,
            padding: '0 16px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {filteredData.map((item) => (
          <div key={item.id} style={{
            backgroundColor: themeColors.card,
            borderRadius: '12px',
            padding: '20px',
            border: `1px solid ${themeColors.border}`,
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '32px' }}>{item.emoji}</span>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.name}</span>
              </div>
              <div style={{
                backgroundColor: item.risk === 'High' ? themeColors.danger : item.risk === 'Medium' ? themeColors.warning : themeColors.accent,
                color: '#fff',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>{item.risk} Risk</div>
            </div>

            <ul style={{ padding: 0, margin: '0 0 12px 0', listStyle: 'none' }}>
              {item.tips.map((tip, i) => (
                <li key={i} style={{ fontSize: '13px', color: themeColors.textSecondary, marginBottom: '6px', display: 'flex', gap: '8px' }}>
                  <span>•</span> {tip}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => toggleExpand(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: themeColors.textSecondary,
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {expanded[item.id] ? 'Show Less ▴' : 'Show More ▾'}
            </button>

            {expanded[item.id] && (
              <div style={{ marginTop: '12px', animation: 'fadeIn 0.3s ease-out' }}>
                <p style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.5', margin: '0 0 12px 0' }}>
                  {item.expanded}
                </p>
                <div style={{ color: themeColors.danger, fontSize: '12px', fontWeight: 'bold' }}>
                  ⚠️ If unsure, take to certified recycler.
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
