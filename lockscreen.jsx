// Generic iOS-style lock screen frame (original abstraction, not Apple's proprietary chrome).
// Deep ambient wallpaper so transparent widgets show through.

function Wallpaper({ variant = 'teal' }) {
  // Abstract dark gradient wallpapers with soft blurred blobs.
  const variants = {
    teal: {
      base: 'radial-gradient(120% 80% at 20% 10%, #1a3a3f 0%, #0a1418 55%, #050a0d 100%)',
      blob1: 'radial-gradient(circle, rgba(52,211,153,0.35) 0%, transparent 70%)',
      blob2: 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)',
    },
    plum: {
      base: 'radial-gradient(120% 80% at 70% 20%, #2a1838 0%, #120a1d 55%, #060308 100%)',
      blob1: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)',
      blob2: 'radial-gradient(circle, rgba(244,114,182,0.22) 0%, transparent 70%)',
    },
    slate: {
      base: 'radial-gradient(130% 80% at 30% 80%, #1e2938 0%, #0d131c 55%, #04060a 100%)',
      blob1: 'radial-gradient(circle, rgba(125,211,252,0.22) 0%, transparent 70%)',
      blob2: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)',
    },
  };
  const v = variants[variant] || variants.teal;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: v.base }} />
      <div style={{
        position: 'absolute', top: '-10%', left: '-15%',
        width: '70%', height: '55%',
        background: v.blob1, filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-20%',
        width: '80%', height: '60%',
        background: v.blob2, filter: 'blur(50px)',
      }} />
      {/* Subtle noise */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        opacity: 0.08, mixBlendMode: 'overlay',
      }} />
    </div>
  );
}

// Generic status bar + time — original glyphs, not Apple's
function LockChrome({ time = '9:41', date = 'Monday, April 19' }) {
  return (
    <>
      {/* Status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 54, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        fontSize: 15, fontWeight: 500, color: 'white',
        zIndex: 3,
      }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time.split(':').slice(0,1)[0] || '9:41'}</span>
        <div style={{
          width: 100, height: 30, borderRadius: 999,
          background: '#000', opacity: 0.85,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* signal dots */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            {[4, 6, 8, 10].map((h, i) => (
              <div key={i} style={{
                width: 3, height: h, borderRadius: 0.5,
                background: 'white', opacity: 0.95,
              }} />
            ))}
          </div>
          {/* battery */}
          <div style={{
            width: 24, height: 12, borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.6)',
            padding: 1, boxSizing: 'border-box',
            position: 'relative',
          }}>
            <div style={{
              width: '80%', height: '100%', borderRadius: 1.5,
              background: 'white',
            }} />
            <div style={{
              position: 'absolute', right: -3, top: 3,
              width: 2, height: 6, borderRadius: 1,
              background: 'rgba(255,255,255,0.6)',
            }} />
          </div>
        </div>
      </div>

      {/* Big clock */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        color: 'white',
        zIndex: 2,
      }}>
        <div style={{
          fontSize: 14, fontWeight: 500, letterSpacing: 0.5,
          opacity: 0.85, marginBottom: 2,
        }}>{date}</div>
        <div style={{
          fontSize: 96, fontWeight: 200, letterSpacing: -4,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>{time}</div>
      </div>
    </>
  );
}

// iPhone frame — 390 × 844 (iPhone 14-ish proportions, original bezel)
function LockScreen({ variant = 'teal', time = '9:41', date = 'Monday, April 19',
                     children, showChrome = true, label, width = 390, height = 844,
                     showAccessories = false, accessoryLeft, accessoryRight, accessoryCircular }) {
  return (
    <div style={{
      width, height,
      borderRadius: 52,
      background: '#000',
      border: '8px solid #0a0a0a',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 2px #1a1a1a',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Space Grotesk", sans-serif',
    }}>
      <Wallpaper variant={variant} />
      {showChrome && <LockChrome time={time} date={date} />}

      {/* Lock-screen accessory widgets row — sits under the clock */}
      {showAccessories && (
        <div style={{
          position: 'absolute', top: 198, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          gap: 14, alignItems: 'center', zIndex: 2,
        }}>
          {accessoryLeft && (
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 14, padding: '4px 10px',
              border: '0.5px solid rgba(255,255,255,0.12)',
            }}>{accessoryLeft}</div>
          )}
          {accessoryCircular && (
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 999, padding: 4,
              border: '0.5px solid rgba(255,255,255,0.12)',
            }}>{accessoryCircular}</div>
          )}
          {accessoryRight && (
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 14, padding: '4px 10px',
              border: '0.5px solid rgba(255,255,255,0.12)',
            }}>{accessoryRight}</div>
          )}
        </div>
      )}

      {/* Widget area — centered vertically below clock */}
      <div style={{
        position: 'absolute',
        top: showAccessories ? 300 : 280,
        left: 0, right: 0, bottom: 120,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16, zIndex: 2,
      }}>
        {children}
      </div>

      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 10, left: '50%',
        transform: 'translateX(-50%)',
        width: 140, height: 5, borderRadius: 3,
        background: 'rgba(255,255,255,0.5)',
      }} />

      {/* Flashlight + camera quick-action */}
      <div style={{
        position: 'absolute', bottom: 40, left: 24,
        width: 48, height: 48, borderRadius: 24,
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 6, height: 14, borderRadius: 2,
          background: 'rgba(255,255,255,0.7)',
        }} />
      </div>
      <div style={{
        position: 'absolute', bottom: 40, right: 24,
        width: 48, height: 48, borderRadius: 24,
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 16, height: 12, borderRadius: 2,
          border: '2px solid rgba(255,255,255,0.7)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 1, left: 3,
            width: 6, height: 6, borderRadius: 3,
            background: 'rgba(255,255,255,0.7)',
          }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Wallpaper, LockChrome, LockScreen });
