import SwiftUI
import WidgetKit

struct LargeWidgetView: View {
    let entry: PickupEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Top row: wordmark + year
            HStack {
                Text("Passdot")
                    .font(.custom("SpaceGrotesk-Light", size: 10))
                    .foregroundStyle(PD.t30)
                Spacer()
                Text("\(entry.year)")
                    .font(.custom("JetBrainsMono-Regular", size: 10))
                    .foregroundStyle(PD.t35)
            }

            // Year dot grid
            YearGridView(dayOfYear: entry.dayOfYear, dotSize: 10, gap: 3.5, cols: 18)
                .padding(.top, 12)

            // Stats row
            HStack(spacing: 6) {
                Text("\(entry.passed) passed")
                Text("·").foregroundStyle(PD.t30)
                Text("\(entry.yearPct)%")
                Text("·").foregroundStyle(PD.t30)
                Text("\(entry.left) left")
            }
            .font(.custom("JetBrainsMono-Regular", size: 10))
            .foregroundStyle(PD.t65)
            .padding(.top, 10)

            // Divider
            Rectangle()
                .fill(PD.divider)
                .frame(height: 1)
                .padding(.top, 10)

            // Pickup count
            HStack(alignment: .lastTextBaseline) {
                Text("\(entry.pickups)")
                    .font(.custom("SpaceGrotesk-Medium", size: 30).weight(.medium))
                    .foregroundStyle(entry.status.color)
                    .monospacedDigit()
                Spacer()
                Text("/ \(entry.goal)")
                    .font(.custom("JetBrainsMono-Regular", size: 14))
                    .foregroundStyle(PD.t45)
            }
            .padding(.top, 8)

            // Progress bar
            BarView(pct: entry.pct, color: entry.status.color)
                .padding(.top, 8)

            // Nudge pill
            if let headline = entry.status.headline {
                HStack(spacing: 6) {
                    Circle()
                        .fill(entry.status.color)
                        .frame(width: 5, height: 5)
                    Text(headline)
                        .font(.custom("SpaceGrotesk-Medium", size: 11))
                        .foregroundStyle(entry.status.color)
                }
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(entry.status.color.opacity(0.14))
                .overlay(Capsule().stroke(entry.status.color.opacity(0.35), lineWidth: 0.5))
                .clipShape(Capsule())
                .padding(.top, 7)
            }

            // Status message
            Text(entry.status.message(pickups: entry.pickups, goal: entry.goal))
                .font(.custom("SpaceGrotesk-Regular", size: 9))
                .foregroundStyle(Color.white.opacity(0.50))
                .textCase(.lowercase)
                .padding(.top, 5)
        }
        .padding(13)
        .containerBackground(.clear, for: .widget)
    }
}

#Preview(as: .systemLarge) {
    PassdotWidget()
} timeline: {
    PickupEntry.preview(pickups: 64,  goal: 100)
    PickupEntry.preview(pickups: 88,  goal: 100)
    PickupEntry.preview(pickups: 127, goal: 100)
}
