import SwiftUI
import WidgetKit

struct SmallWidgetView: View {
    let entry: PickupEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Passdot")
                .font(.custom("SpaceGrotesk-Light", size: 10))
                .foregroundStyle(PD.t30)

            Text("\(entry.pickups)")
                .font(.custom("SpaceGrotesk-Medium", size: 30).weight(.medium))
                .foregroundStyle(entry.status.color)
                .monospacedDigit()
                .padding(.top, 18)

            Text("pickups today")
                .font(.custom("SpaceGrotesk-Regular", size: 9))
                .foregroundStyle(PD.t35)
                .textCase(.lowercase)
                .padding(.top, 2)

            Spacer()

            VStack(spacing: 5) {
                BarView(pct: entry.pct, color: entry.status.color)
                HStack {
                    Text("goal \(entry.goal)")
                    Spacer()
                    Text("\(Int(min(1, entry.pct) * 100))%")
                }
                .font(.custom("JetBrainsMono-Regular", size: 9))
                .foregroundStyle(Color.white.opacity(0.50))
            }
        }
        .padding(13)
        .containerBackground(.clear, for: .widget)
    }
}

#Preview(as: .systemSmall) {
    PassdotWidget()
} timeline: {
    PickupEntry.preview(pickups: 64, goal: 100)
}
