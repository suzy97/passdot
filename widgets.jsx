// Passdot widgets — 5 sizes, dark-only, transparent bg.
// Spec values from brief. Sizes are pt; we render 1pt = 1px.

const PD = {
  past: '#c4b5fd',
  today: '#ffffff',
  future: 'rgba(255,255,255,0.10)',
  safe: '#c4b5fd',
  warn: '#fbbf24',
  over: '#f87171',
  surface: 'rgba(255,255,255,0.06)',
  stroke: 'rgba(255,255,255,0.08)',
  divider: 'rgba(255,255,255,0.08)',
  // text
  t100: 'rgba(255,255,255,1)',
  t65: 'rgba(255,255,255,0.65)',
  t45: 'rgba(255,255,255,0.45)',
  t35: 'rgba(255,255,255,0.35)',
  t30: 'rgba(255,255,255,0.30)',
  // fonts
  geo: '"Space Grotesk", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ─── helpers ───────────────────────────────────────────────
function statusFromPct(pct) {
  if (pct < 0.8) return 'safe';
  if (pct < 1.0) return 'warn';
  return 'over';
}
function colorFor(status) {
  return status === 'over' ? PD.over : status === 'warn' ? PD.warn : PD.safe;
}
function messageFor(pickups, goal, status) {
  const diff = goal - pickups;
  if (status === 'over') {
    const over = pickups - goal;
    if (over >= 30) return `put it down · ${over} over`;
    if (over >= 10) return `step away · ${over} over goal`;
    return `time to rest · ${over} over`;
  }
  if (status === 'warn') {
    if (diff <= 5) return `almost there — pause soon`;
    return `${diff} more to goal · ease off`;
  }
  return `${diff} more to goal`;
}

// Headline nudge — shown prominently on larger widgets when warn/over.
function headlineFor(status) {
  if (status === 'over') return 'Put down the phone.';
  if (status === 'warn') return 'Ease up — breathe.';
  return null;
}

// ─── Year grid — 18 cols × 20 rows = 360 dots + 5 extra → 365 total
// We render 365 dots total so the last row has 5 dots.
function YearGrid({ dayOfYear = 109, dotSize = 2.5, gap = 2.5, cols = 18, total = 365 }) {
  const dots = [];
  for (let i = 0; i < total; i++) {
    const isToday = i + 1 === dayOfYear;
    const isPast = i + 1 < dayOfYear;
    const bg = isToday ? PD.today : isPast ? PD.past : PD.future;
    dots.push(
      <div key={i} style={{
        width: dotSize, height: dotSize,
        borderRadius: dotSize * 0.4,
        background: bg,
        boxShadow: isToday ? `0 0 ${dotSize * 1.6}px rgba(255,255,255,0.55)` : 'none',
      }} />
    );
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
      gap: `${gap}px`,
      width: 'fit-content',
    }}>{dots}</div>
  );
}

// ─── Progress bar
function Bar({ pct, color, height = 3, radius = 2 }) {
  const clamped = Math.min(1, pct);
  return (
    <div style={{
      width: '100%', height, borderRadius: radius,
      background: 'rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${clamped * 100}%`, height: '100%',
        borderRadius: radius,
        background: color,
        transition: 'width 0.4s ease, background 0.25s ease',
      }} />
    </div>
  );
}

// ─── Widget shell — frosted glass card
function WidgetShell({ w, h, padding = 13, children, radius = 20, style = {} }) {
  return (
    <div style={{
      width: w, height: h,
      borderRadius: radius,
      background: PD.surface,
      backdropFilter: 'blur(24px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
      border: `0.5px solid ${PD.stroke}`,
      boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.25)',
      padding, boxSizing: 'border-box',
      color: 'white',
      fontFamily: PD.geo,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}>{children}</div>
  );
}

// ═══════════════════════════════════════════════════════════
// LARGE — 338 × 354
// ═══════════════════════════════════════════════════════════
function LargeWidget({ pickups = 64, goal = 100, dayOfYear = 109, year = 2026 }) {
  const pct = pickups / goal;
  const status = statusFromPct(pct);
  const countColor = colorFor(status);
  const passed = dayOfYear;
  const left = 365 - dayOfYear;
  const yearPct = Math.round((dayOfYear / 365) * 100);

  return (
    <WidgetShell w={338} h={354}>
      {/* Top row: wordmark + year */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 300, letterSpacing: 0.5,
          color: PD.t30, fontFamily: PD.geo,
        }}>Passdot</span>
        <span style={{
          fontSize: 10, fontWeight: 400, letterSpacing: 0.8,
          color: PD.t35, fontFamily: PD.mono,
        }}>{year}</span>
      </div>

      {/* Dot grid */}
      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
        <YearGrid dayOfYear={dayOfYear} dotSize={12} gap={4} cols={18} />
      </div>

      {/* Stats row */}
      <div style={{
        marginTop: 14,
        fontSize: 12, fontWeight: 400,
        color: PD.t65, fontFamily: PD.mono,
        letterSpacing: 0.3,
        display: 'flex', justifyContent: 'center', gap: 8,
      }}>
        <span>{passed} passed</span>
        <span style={{ color: PD.t30 }}>·</span>
        <span>{yearPct}%</span>
        <span style={{ color: PD.t30 }}>·</span>
        <span>{left} left</span>
      </div>

      {/* Divider */}
      <div style={{
        marginTop: 12, height: 1, background: PD.divider,
      }} />

      {/* Pickup count row */}
      <div style={{
        marginTop: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{
          fontSize: 30, fontWeight: 500,
          color: countColor, fontFamily: PD.geo,
          letterSpacing: -0.8, lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>{pickups}</span>
        <span style={{
          fontSize: 14, fontWeight: 400,
          color: PD.t45, fontFamily: PD.mono,
        }}>/ {goal}</span>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 10 }}>
        <Bar pct={pct} color={countColor} />
      </div>

      {/* Headline nudge (warn/over only) */}
      {headlineFor(status) && (
        <div style={{
          marginTop: 8,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 8px',
          borderRadius: 999,
          background: status === 'over'
            ? 'rgba(248,113,113,0.14)'
            : 'rgba(251,191,36,0.14)',
          border: `0.5px solid ${status === 'over'
            ? 'rgba(248,113,113,0.35)'
            : 'rgba(251,191,36,0.35)'}`,
          width: 'fit-content',
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: 999,
            background: countColor,
            boxShadow: `0 0 6px ${countColor}`,
          }} />
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: -0.1,
            color: countColor, fontFamily: PD.geo,
          }}>{headlineFor(status)}</span>
        </div>
      )}

      {/* Status message */}
      <div style={{
        marginTop: 6,
        fontSize: 9, fontWeight: 400, letterSpacing: 0.4,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: PD.geo, textTransform: 'lowercase',
      }}>
        {messageFor(pickups, goal, status)}
      </div>
    </WidgetShell>
  );
}

// ═══════════════════════════════════════════════════════════
// MEDIUM — 338 × 158  (pickup count left, grid right)
// ═══════════════════════════════════════════════════════════
function MediumWidget({ pickups = 64, goal = 100, dayOfYear = 109, year = 2026 }) {
  const pct = pickups / goal;
  const status = statusFromPct(pct);
  const countColor = colorFor(status);
  const yearPct = Math.round((dayOfYear / 365) * 100);

  return (
    <WidgetShell w={338} h={158}>
      <div style={{ display: 'flex', gap: 14, height: '100%' }}>
        {/* LEFT: pickup */}
        <div style={{
          flex: '0 0 138px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 300, letterSpacing: 0.5,
              color: PD.t30, fontFamily: PD.geo,
            }}>Passdot</div>
            <div style={{
              marginTop: 18,
              fontSize: 30, fontWeight: 500,
              color: countColor, fontFamily: PD.geo,
              letterSpacing: -0.8, lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {pickups}<span style={{
                fontSize: 14, fontWeight: 400, color: PD.t45,
                fontFamily: PD.mono, marginLeft: 6,
              }}>/{goal}</span>
            </div>
          </div>
          <div>
            <Bar pct={pct} color={countColor} />
            <div style={{
              marginTop: 6,
              fontSize: 9,
              fontWeight: status === 'safe' ? 400 : 500,
              letterSpacing: 0.4,
              color: status === 'safe' ? 'rgba(255,255,255,0.5)' : countColor,
              fontFamily: PD.geo, textTransform: 'lowercase',
            }}>{status === 'over' ? 'put it down · ' : ''}{messageFor(pickups, goal, status)}</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: PD.divider }} />

        {/* RIGHT: grid */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 10, fontWeight: 400, letterSpacing: 0.8,
            color: PD.t35, fontFamily: PD.mono,
          }}>
            <span>{year}</span>
            <span>{yearPct}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <YearGrid dayOfYear={dayOfYear} dotSize={6} gap={2.5} cols={18} />
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

// ═══════════════════════════════════════════════════════════
// SMALL — 158 × 158  (pickup + bar only)
// ═══════════════════════════════════════════════════════════
function SmallWidget({ pickups = 64, goal = 100 }) {
  const pct = pickups / goal;
  const status = statusFromPct(pct);
  const countColor = colorFor(status);

  return (
    <WidgetShell w={158} h={158}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', height: '100%',
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 300, letterSpacing: 0.5,
            color: PD.t30, fontFamily: PD.geo,
          }}>Passdot</div>
          <div style={{
            marginTop: 22,
            fontSize: 30, fontWeight: 500,
            color: countColor, fontFamily: PD.geo,
            letterSpacing: -0.8, lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}>{pickups}</div>
          <div style={{
            marginTop: 3,
            fontSize: 9, fontWeight: 400, letterSpacing: 0.4,
            color: PD.t35, fontFamily: PD.geo, textTransform: 'lowercase',
          }}>pickups today</div>
        </div>
        <div>
          <Bar pct={pct} color={countColor} />
          <div style={{
            marginTop: 6,
            display: 'flex', justifyContent: 'space-between',
            fontSize: 9, fontWeight: 400,
            color: 'rgba(255,255,255,0.5)', fontFamily: PD.mono,
          }}>
            <span>goal {goal}</span>
            <span>{Math.round(pct * 100)}%</span>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

// ═══════════════════════════════════════════════════════════
// ACCESSORY RECTANGULAR — ~160 × 72  (lock screen widget)
// ═══════════════════════════════════════════════════════════
function AccessoryRect({ pickups = 14, dayOfYear = 109, year = 2026 }) {
  const yearPct = Math.round((dayOfYear / 365) * 100);
  return (
    <div style={{
      width: 160, height: 72,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      color: 'white', fontFamily: PD.geo,
      padding: '4px 2px',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 300, letterSpacing: 0.5,
        color: PD.t30,
      }}>Passdot</div>
      <div style={{
        marginTop: 4,
        fontSize: 20, fontWeight: 500,
        letterSpacing: -0.5, lineHeight: 1.1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {pickups}<span style={{
          fontSize: 13, fontWeight: 400, color: PD.t65,
          fontFamily: PD.geo, marginLeft: 4,
        }}>pickups</span>
      </div>
      <div style={{
        marginTop: 2,
        fontSize: 11, fontWeight: 400,
        color: PD.t65, fontFamily: PD.mono,
        letterSpacing: 0.2,
      }}>
        {yearPct}% of {year}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ACCESSORY CIRCULAR — 72 × 72  ring + pickup count
// ═══════════════════════════════════════════════════════════
function AccessoryCircular({ pickups = 14, goal = 100 }) {
  const pct = Math.min(1, pickups / goal);
  const status = statusFromPct(pickups / goal);
  const c = colorFor(status);
  const size = 58;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{
      width: 72, height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r}
          stroke="rgba(255,255,255,0.18)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r}
          stroke={c} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        color: 'white', fontFamily: PD.geo,
      }}>
        <div style={{
          fontSize: 18, fontWeight: 500, lineHeight: 1,
          letterSpacing: -0.5,
          fontVariantNumeric: 'tabular-nums',
        }}>{pickups}</div>
        <div style={{
          fontSize: 7, fontWeight: 400, letterSpacing: 0.8,
          color: PD.t45, textTransform: 'uppercase', marginTop: 2,
        }}>picks</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PD, YearGrid, Bar, WidgetShell,
  LargeWidget, MediumWidget, SmallWidget,
  AccessoryRect, AccessoryCircular,
  statusFromPct, colorFor, messageFor, headlineFor,
});
