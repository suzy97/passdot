import SwiftUI
import WidgetKit

struct ContentView: View {
    @StateObject private var store = PickupStore.shared
    @State private var showGoalSheet = false
    @State private var goalDraft = ""

    private var status: PickupStatus { .from(pct: Double(store.pickups) / Double(store.goal)) }
    private var dayOfYear: Int { Calendar.current.ordinality(of: .day, in: .year, for: Date()) ?? 1 }

    var body: some View {
        ZStack {
            // Wallpaper gradient
            LinearGradient(
                colors: [Color(hex: "#1a3a3f"), Color(hex: "#0a1418"), Color(hex: "#050a0d")],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            // Blobs
            GeometryReader { geo in
                Circle()
                    .fill(Color(hex: "#34d399").opacity(0.18))
                    .frame(width: geo.size.width * 0.8)
                    .blur(radius: 60)
                    .offset(x: -geo.size.width * 0.2, y: -geo.size.height * 0.1)
                Circle()
                    .fill(Color(hex: "#60a5fa").opacity(0.14))
                    .frame(width: geo.size.width * 0.9)
                    .blur(radius: 70)
                    .offset(x: geo.size.width * 0.3, y: geo.size.height * 0.5)
            }
            .ignoresSafeArea()

            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("Passdot")
                        .font(.custom("SpaceGrotesk-Light", size: 13).weight(.light))
                        .foregroundStyle(Color.white.opacity(0.35))
                    Spacer()
                    Text(String(Calendar.current.component(.year, from: Date())))
                        .font(.custom("JetBrainsMono-Regular", size: 12))
                        .foregroundStyle(Color.white.opacity(0.40))
                }
                .padding(.horizontal, 28)
                .padding(.top, 20)

                Spacer()

                // Year grid
                YearGridView(dayOfYear: dayOfYear, dotSize: 7, gap: 3, cols: 18)
                    .padding(.horizontal, 28)

                // Stats
                HStack(spacing: 8) {
                    Text("\(dayOfYear) passed")
                    Text("·").foregroundStyle(Color.white.opacity(0.30))
                    Text("\(Int((Double(dayOfYear)/365)*100))%")
                    Text("·").foregroundStyle(Color.white.opacity(0.30))
                    Text("\(365 - dayOfYear) left")
                }
                .font(.custom("JetBrainsMono-Regular", size: 11))
                .foregroundStyle(Color.white.opacity(0.60))
                .padding(.top, 12)

                // Divider
                Rectangle()
                    .fill(Color.white.opacity(0.08))
                    .frame(height: 1)
                    .padding(.horizontal, 28)
                    .padding(.top, 16)

                // Pickup count
                HStack(alignment: .lastTextBaseline, spacing: 0) {
                    Text("\(store.pickups)")
                        .font(.custom("SpaceGrotesk-Medium", size: 72).weight(.medium))
                        .foregroundStyle(status.color)
                        .contentTransition(.numericText())
                        .monospacedDigit()
                    Text(" / \(store.goal)")
                        .font(.custom("JetBrainsMono-Regular", size: 22))
                        .foregroundStyle(Color.white.opacity(0.45))
                        .padding(.leading, 4)
                }
                .padding(.top, 16)
                .padding(.horizontal, 28)

                // Progress bar
                BarView(pct: Double(store.pickups) / Double(store.goal), color: status.color, height: 4)
                    .padding(.horizontal, 28)
                    .padding(.top, 12)

                // Nudge pill
                if let headline = status.headline {
                    NudgePill(text: headline, status: status)
                        .padding(.top, 10)
                }

                // Status message
                Text(status.message(pickups: store.pickups, goal: store.goal))
                    .font(.custom("SpaceGrotesk-Regular", size: 12))
                    .foregroundStyle(Color.white.opacity(0.50))
                    .textCase(.lowercase)
                    .padding(.top, 6)

                Spacer()

                // Action buttons
                HStack(spacing: 16) {
                    Button {
                        store.reset()
                    } label: {
                        Label("Reset", systemImage: "arrow.counterclockwise")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundStyle(Color.white.opacity(0.60))
                            .padding(.horizontal, 20)
                            .padding(.vertical, 12)
                            .background(Color.white.opacity(0.08))
                            .clipShape(Capsule())
                    }

                    Button {
                        showGoalSheet = true
                        goalDraft = "\(store.goal)"
                    } label: {
                        Label("Goal: \(store.goal)", systemImage: "target")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundStyle(Color.white.opacity(0.60))
                            .padding(.horizontal, 20)
                            .padding(.vertical, 12)
                            .background(Color.white.opacity(0.08))
                            .clipShape(Capsule())
                    }
                }
                .padding(.bottom, 20)

                // Big pickup button
                Button {
                    withAnimation(.spring(response: 0.2, dampingFraction: 0.6)) {
                        store.increment()
                    }
                } label: {
                    ZStack {
                        Circle()
                            .fill(status.color.opacity(0.18))
                            .overlay(Circle().stroke(status.color.opacity(0.35), lineWidth: 1))
                        VStack(spacing: 2) {
                            Image(systemName: "hand.tap.fill")
                                .font(.system(size: 28))
                            Text("pickup")
                                .font(.custom("SpaceGrotesk-Regular", size: 12))
                                .textCase(.lowercase)
                        }
                        .foregroundStyle(status.color)
                    }
                    .frame(width: 100, height: 100)
                }
                .padding(.bottom, 44)
            }
        }
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showGoalSheet) {
            GoalSheet(goal: $store.goal, draft: $goalDraft)
                .presentationDetents([.height(220)])
        }
    }
}

// MARK: - Nudge pill

struct NudgePill: View {
    let text: String
    let status: PickupStatus

    var body: some View {
        HStack(spacing: 6) {
            Circle()
                .fill(status.color)
                .shadow(color: status.color, radius: 3)
                .frame(width: 5, height: 5)
            Text(text)
                .font(.custom("SpaceGrotesk-Medium", size: 12).weight(.medium))
                .foregroundStyle(status.color)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 4)
        .background(status.color.opacity(0.12))
        .overlay(Capsule().stroke(status.color.opacity(0.35), lineWidth: 0.5))
        .clipShape(Capsule())
    }
}

// MARK: - Goal sheet

struct GoalSheet: View {
    @Binding var goal: Int
    @Binding var draft: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 20) {
            Text("Daily Pickup Goal")
                .font(.custom("SpaceGrotesk-Medium", size: 18))
                .foregroundStyle(.white)
                .padding(.top, 28)

            TextField("e.g. 100", text: $draft)
                .keyboardType(.numberPad)
                .font(.custom("JetBrainsMono-Regular", size: 32))
                .foregroundStyle(Color(hex: "#c4b5fd"))
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)

            Button("Save") {
                if let v = Int(draft), v > 0 { goal = v }
                dismiss()
            }
            .font(.custom("SpaceGrotesk-Medium", size: 16))
            .foregroundStyle(.black)
            .padding(.horizontal, 48)
            .padding(.vertical, 12)
            .background(Color(hex: "#c4b5fd"))
            .clipShape(Capsule())

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(hex: "#0d1017"))
    }
}

#Preview {
    ContentView()
}
