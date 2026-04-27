import SwiftUI
import WidgetKit

struct AccessoryCircularView: View {
    let entry: PickupEntry

    var body: some View {
        ZStack {
            // Track
            Circle()
                .stroke(Color.white.opacity(0.18), lineWidth: 4)

            // Progress arc
            Circle()
                .trim(from: 0, to: min(1, entry.pct))
                .stroke(entry.status.color, style: StrokeStyle(lineWidth: 4, lineCap: .round))
                .rotationEffect(.degrees(-90))

            // Center
            VStack(spacing: 1) {
                Text("\(entry.pickups)")
                    .font(.custom("SpaceGrotesk-Medium", size: 18).weight(.medium))
                    .monospacedDigit()
                Text("picks")
                    .font(.custom("SpaceGrotesk-Regular", size: 7))
                    .foregroundStyle(PD.t45)
                    .textCase(.uppercase)
                    .kerning(0.8)
            }
        }
        .containerBackground(.clear, for: .widget)
    }
}

#Preview(as: .accessoryCircular) {
    PassdotWidget()
} timeline: {
    PickupEntry.preview()
}
