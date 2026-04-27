import SwiftUI
import WidgetKit

struct MediumWidgetView: View {
    let entry: PickupEntry

    var body: some View {
        HStack(spacing: 0) {
            // LEFT: pickup count
            VStack(alignment: .leading, spacing: 0) {
                Text("Passdot")
                    .font(.custom("SpaceGrotesk-Light", size: 10))
                    .foregroundStyle(PD.t30)

                HStack(alignment: .lastTextBaseline, spacing: 0) {
                    Text("\(entry.pickups)")
                        .font(.custom("SpaceGrotesk-Medium", size: 30).weight(.medium))
                        .foregroundStyle(entry.status.color)
                        .monospacedDigit()
                    Text("/\(entry.goal)")
                        .font(.custom("JetBrainsMono-Regular", size: 14))
                        .foregroundStyle(PD.t45)
                        .padding(.leading, 5)
                }
                .padding(.top, 14)

                Spacer()

                VStack(alignment: .leading, spacing: 5) {
                    BarView(pct: entry.pct, color: entry.status.color)
                    Text(entry.status.message(pickups: entry.pickups, goal: entry.goal))
                        .font(.custom("SpaceGrotesk-Regular", size: 9))
                        .fontWeight(entry.status == .safe ? .regular : .medium)
                        .foregroundStyle(entry.status == .safe
                            ? Color.white.opacity(0.50)
                            : entry.status.color)
                        .textCase(.lowercase)
                        .lineLimit(1)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)

            // Divider
            Rectangle()
                .fill(PD.divider)
                .frame(width: 1)
                .padding(.vertical, 4)
                .padding(.horizontal, 10)

            // RIGHT: year grid
            VStack(alignment: .trailing, spacing: 0) {
                HStack {
                    Text("\(entry.year)")
                    Spacer()
                    Text("\(entry.yearPct)%")
                }
                .font(.custom("JetBrainsMono-Regular", size: 10))
                .foregroundStyle(PD.t35)

                Spacer()
                YearGridView(dayOfYear: entry.dayOfYear, dotSize: 5, gap: 2, cols: 18)
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .padding(13)
        .containerBackground(.clear, for: .widget)
    }
}

extension PickupStatus: Equatable {}

#Preview(as: .systemMedium) {
    PassdotWidget()
} timeline: {
    PickupEntry.preview(pickups: 64, goal: 100)
    PickupEntry.preview(pickups: 88, goal: 100)
}
