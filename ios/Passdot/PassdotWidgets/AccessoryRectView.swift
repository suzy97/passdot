import SwiftUI
import WidgetKit

struct AccessoryRectView: View {
    let entry: PickupEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text("Passdot")
                .font(.custom("SpaceGrotesk-Light", size: 9))
                .foregroundStyle(PD.t30)
            HStack(alignment: .lastTextBaseline, spacing: 3) {
                Text("\(entry.pickups)")
                    .font(.custom("SpaceGrotesk-Medium", size: 20).weight(.medium))
                    .monospacedDigit()
                Text("pickups")
                    .font(.custom("SpaceGrotesk-Regular", size: 12))
                    .foregroundStyle(PD.t65)
            }
            Text("\(entry.yearPct)% of \(entry.year)")
                .font(.custom("JetBrainsMono-Regular", size: 10))
                .foregroundStyle(PD.t65)
        }
        .containerBackground(.clear, for: .widget)
    }
}

#Preview(as: .accessoryRectangular) {
    PassdotWidget()
} timeline: {
    PickupEntry.preview()
}
