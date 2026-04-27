// Passdot — canvas presenting all 5 widget sizes + 3 states + handoff notes.

function Header() {
  return (
    <div style={{ padding: '0 80px 60px', maxWidth: 1400 }}>
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: 2,
        color: 'rgba(60,50,40,0.55)',
        textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace',
        marginBottom: 12,
      }}>iOS · WidgetKit · Lock Screen + Home Screen</div>
      <div style={{
        fontSize: 56, fontWeight: 300, letterSpacing: -1.5,
        color: '#1a1a1a',
        fontFamily: '"Space Grotesk", sans-serif',
        lineHeight: 1,
      }}>Passdot</div>
      <div style={{
        fontSize: 20, fontWeight: 400, color: 'rgba(40,30,20,0.6)',
        fontFamily: '"Space Grotesk", sans-serif',
        marginTop: 12, letterSpacing: -0.2,
      }}>every dot, every pickup</div>
      <div style={{
        marginTop: 24, maxWidth: 640,
        fontSize: 14, lineHeight: 1.6, color: 'rgba(40,30,20,0.7)',
        fontFamily: '"Space Grotesk", sans-serif',
      }}>
        A mindful screen-time widget. Each pickup you've made today and
        each day of the year, rendered as small calm dots on the lock
        screen — present, not alarming. Dark-only, transparent, frosted.
      </div>
    </div>
  );
}

// Swatch card
function Swatch({ name, value, note }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 10px', borderRadius: 4,
      background: 'rgba(0,0,0,0.03)',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 4,
        background: value,
        border: '1px solid rgba(0,0,0,0.08)',
      }} />
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, color: '#1a1a1a',
          fontFamily: '"Space Grotesk", sans-serif' }}>{name}</div>
        <div style={{ fontSize: 10, color: 'rgba(40,30,20,0.55)',
          fontFamily: '"JetBrains Mono", monospace' }}>{value}</div>
        {note && <div style={{ fontSize: 10, color: 'rgba(40,30,20,0.5)',
          fontFamily: '"Space Grotesk", sans-serif', marginTop: 2 }}>{note}</div>}
      </div>
    </div>
  );
}

function TokensPanel() {
  return (
    <div style={{
      background: 'white', borderRadius: 8, padding: 24,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      width: 560,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
        textTransform: 'uppercase', color: 'rgba(40,30,20,0.75)',
        fontFamily: '"Space Grotesk", sans-serif', marginBottom: 12,
      }}>Design tokens</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Swatch name="Past dots" value="#c4b5fd" />
        <Swatch name="Today dot" value="#ffffff" />
        <Swatch name="Future dots" value="rgba(255,255,255,0.10)" />
        <Swatch name="Safe" value="#c4b5fd" note="0–79% of goal" />
        <Swatch name="Warning" value="#fbbf24" note="80–99%" />
        <Swatch name="Over" value="#f87171" note="≥ 100%" />
      </div>
      <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '16px 0' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        fontSize: 11, color: 'rgba(40,30,20,0.75)',
        fontFamily: '"Space Grotesk", sans-serif', lineHeight: 1.6,
      }}>
        <div>
          <b style={{ color: '#1a1a1a' }}>Type</b><br/>
          Space Grotesk 300/400/500<br/>
          JetBrains Mono 400 (numerics)
        </div>
        <div>
          <b style={{ color: '#1a1a1a' }}>Radii</b><br/>
          dot 2.5 · bar 2 · inner 14 · outer 20
        </div>
        <div>
          <b style={{ color: '#1a1a1a' }}>Spacing</b><br/>
          grid gap 2.5 · padding 13 · section 10
        </div>
        <div>
          <b style={{ color: '#1a1a1a' }}>Surface</b><br/>
          rgba(255,255,255,0.06)<br/>
          backdrop blur 24px
        </div>
      </div>
    </div>
  );
}

function HandoffPanel() {
  const snippet = `// SwiftUI WidgetKit stub
struct PassdotLarge: Widget {
  let kind = "PassdotLarge"
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: Provider()) { entry in
      LargeView(entry: entry)
        .containerBackground(.clear, for: .widget)
    }
    .supportedFamilies([.systemLarge])
  }
}

struct LargeView: View {
  let entry: PickupEntry
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      HStack {
        Text("Passdot").font(.custom("SpaceGrotesk-Light", size: 10))
          .foregroundStyle(.white.opacity(0.30))
        Spacer()
        Text(entry.year).font(.custom("JetBrainsMono-Regular", size: 10))
          .foregroundStyle(.white.opacity(0.35))
      }
      YearGrid(day: entry.dayOfYear).padding(.vertical, 4)
      StatsRow(entry: entry)
      Divider().opacity(0.08)
      PickupRow(pickups: entry.pickups, goal: entry.goal)
      ProgressBar(pct: entry.pct, tint: entry.tint)
      Text(entry.statusMessage)
        .font(.custom("SpaceGrotesk-Regular", size: 9))
        .foregroundStyle(.white.opacity(0.5))
    }
    .padding(13)
  }
}`;
  return (
    <div style={{
      background: '#0f1316', borderRadius: 8, padding: 24,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      width: 640,
      fontFamily: '"JetBrains Mono", monospace',
      color: 'rgba(255,255,255,0.85)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2,
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
        marginBottom: 12, fontFamily: '"Space Grotesk", sans-serif',
      }}>Handoff · SwiftUI stub</div>
      <pre style={{
        margin: 0, fontSize: 10.5, lineHeight: 1.55,
        whiteSpace: 'pre', overflow: 'auto',
        color: 'rgba(255,255,255,0.82)',
      }}>{snippet}</pre>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════

function App() {
  // Tweakable state
  const defaults = /*EDITMODE-BEGIN*/{
    "pickups": 64,
    "goal": 100,
    "dayOfYear": 109,
    "wallpaper": "teal"
  }/*EDITMODE-END*/;

  const [state, setState] = React.useState(defaults);
  const [tweaksOn, setTweaksOn] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOn(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setKey = (k, v) => {
    setState((s) => ({ ...s, [k]: v }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys', edits: { [k]: v },
    }, '*');
  };

  const { pickups, goal, dayOfYear, wallpaper } = state;

  return (
    <>
      <DesignCanvas>
        <Header />

        {/* ─── HERO: Large widget on lock screen, all 3 states ─── */}
        <DCSection
          title="Lock screen — Large widget across 3 states"
          subtitle="338×354pt · safe · warning · over goal"
          gap={40}
        >
          <DCArtboard label="Safe · 64 / 100" width={390} height={844}>
            <LockScreen variant={wallpaper} time="9:41" date="Monday, April 19">
              <LargeWidget pickups={64} goal={100} dayOfYear={dayOfYear} year={2026} />
            </LockScreen>
          </DCArtboard>
          <DCArtboard label="Warning · 88 / 100" width={390} height={844}>
            <LockScreen variant={wallpaper} time="4:12" date="Monday, April 19">
              <LargeWidget pickups={88} goal={100} dayOfYear={dayOfYear} year={2026} />
            </LockScreen>
          </DCArtboard>
          <DCArtboard label="Over · 127 / 100" width={390} height={844}>
            <LockScreen variant={wallpaper} time="11:48" date="Monday, April 19">
              <LargeWidget pickups={127} goal={100} dayOfYear={dayOfYear} year={2026} />
            </LockScreen>
          </DCArtboard>
          <DCPostIt top={-8} right={-60} rotate={3} width={220}>
            Message tone scales with state — calm → nudge → firm. Never shouty.
          </DCPostIt>
        </DCSection>

        {/* ─── All 5 widget sizes on lock screen ─── */}
        <DCSection
          title="All widget sizes, on device"
          subtitle="small · medium · large · accessory rectangular · accessory circular"
          gap={40}
        >
          <DCArtboard label="Small · 158×158" width={390} height={844}>
            <LockScreen variant={wallpaper} time="2:04" date="Monday, April 19">
              <SmallWidget pickups={state.pickups} goal={state.goal} />
            </LockScreen>
          </DCArtboard>

          <DCArtboard label="Medium · 338×158" width={390} height={844}>
            <LockScreen variant={wallpaper} time="7:33" date="Monday, April 19">
              <MediumWidget pickups={state.pickups} goal={state.goal}
                dayOfYear={dayOfYear} year={2026} />
            </LockScreen>
          </DCArtboard>

          <DCArtboard label="Large · 338×354" width={390} height={844}>
            <LockScreen variant={wallpaper} time="9:41" date="Monday, April 19">
              <LargeWidget pickups={state.pickups} goal={state.goal}
                dayOfYear={dayOfYear} year={2026} />
            </LockScreen>
          </DCArtboard>

          <DCArtboard label="Accessory rect + circular" width={390} height={844}>
            <LockScreen
              variant={wallpaper} time="9:41" date="Monday, April 19"
              showAccessories
              accessoryLeft={<AccessoryRect pickups={state.pickups}
                dayOfYear={dayOfYear} year={2026} />}
              accessoryCircular={<AccessoryCircular pickups={state.pickups}
                goal={state.goal} />}
            >
              <LargeWidget pickups={state.pickups} goal={state.goal}
                dayOfYear={dayOfYear} year={2026} />
            </LockScreen>
          </DCArtboard>
        </DCSection>

        {/* ─── Detail specimens — widgets against pure black ─── */}
        <DCSection
          title="Widget specimens"
          subtitle="1× rendering against deep black for spec review"
          gap={32}
        >
          <DCArtboard label="Small" width={198} height={198} style={{ background: '#050a0d' }}>
            <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <SmallWidget pickups={state.pickups} goal={state.goal} />
            </div>
          </DCArtboard>

          <DCArtboard label="Medium" width={378} height={198} style={{ background: '#050a0d' }}>
            <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <MediumWidget pickups={state.pickups} goal={state.goal}
                dayOfYear={dayOfYear} year={2026} />
            </div>
          </DCArtboard>

          <DCArtboard label="Large" width={378} height={394} style={{ background: '#050a0d' }}>
            <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <LargeWidget pickups={state.pickups} goal={state.goal}
                dayOfYear={dayOfYear} year={2026} />
            </div>
          </DCArtboard>

          <DCArtboard label="Accessory rect" width={200} height={112} style={{ background: '#050a0d' }}>
            <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <AccessoryRect pickups={state.pickups} dayOfYear={dayOfYear} year={2026} />
            </div>
          </DCArtboard>

          <DCArtboard label="Accessory circular" width={112} height={112} style={{ background: '#050a0d' }}>
            <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <AccessoryCircular pickups={state.pickups} goal={state.goal} />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ─── Tokens + handoff ─── */}
        <DCSection title="Design system + handoff" subtitle="tokens · SwiftUI stub" gap={32}>
          <TokensPanel />
          <HandoffPanel />
        </DCSection>

        <div style={{ height: 120 }} />
      </DesignCanvas>

      {/* Tweaks panel */}
      {tweaksOn && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 100,
          width: 280, padding: 16, borderRadius: 12,
          background: 'rgba(20,20,22,0.92)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'white', fontFamily: '"Space Grotesk", sans-serif',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5,
            textTransform: 'uppercase', opacity: 0.7, marginBottom: 12,
          }}>Tweaks</div>

          <TweakRow label={`Pickups: ${pickups}`}>
            <input type="range" min="0" max="200" value={pickups}
              onChange={(e) => setKey('pickups', +e.target.value)}
              style={{ width: '100%' }}
            />
          </TweakRow>

          <TweakRow label={`Goal: ${goal}`}>
            <input type="range" min="20" max="200" step="10" value={goal}
              onChange={(e) => setKey('goal', +e.target.value)}
              style={{ width: '100%' }}
            />
          </TweakRow>

          <TweakRow label={`Day of year: ${dayOfYear} of 365`}>
            <input type="range" min="1" max="365" value={dayOfYear}
              onChange={(e) => setKey('dayOfYear', +e.target.value)}
              style={{ width: '100%' }}
            />
          </TweakRow>

          <TweakRow label="Wallpaper">
            <div style={{ display: 'flex', gap: 6 }}>
              {['teal', 'plum', 'slate'].map((v) => (
                <button key={v} onClick={() => setKey('wallpaper', v)}
                  style={{
                    flex: 1, padding: '6px 8px', fontSize: 11,
                    borderRadius: 6,
                    background: wallpaper === v ? 'rgba(196,181,253,0.25)' : 'rgba(255,255,255,0.06)',
                    color: 'white',
                    border: `1px solid ${wallpaper === v ? '#c4b5fd' : 'rgba(255,255,255,0.12)'}`,
                    fontFamily: 'inherit', cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}>{v}</button>
              ))}
            </div>
          </TweakRow>

          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <QuickBtn onClick={() => setKey('pickups', 64)}>Safe</QuickBtn>
            <QuickBtn onClick={() => setKey('pickups', 88)}>Warn</QuickBtn>
            <QuickBtn onClick={() => setKey('pickups', 127)}>Over</QuickBtn>
          </div>
        </div>
      )}
    </>
  );
}

function TweakRow({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6,
        fontFamily: '"JetBrains Mono", monospace',
      }}>{label}</div>
      {children}
    </div>
  );
}

function QuickBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '6px', fontSize: 11,
      borderRadius: 6,
      background: 'rgba(255,255,255,0.06)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.12)',
      fontFamily: 'inherit', cursor: 'pointer',
    }}>{children}</button>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
