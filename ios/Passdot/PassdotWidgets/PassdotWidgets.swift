import WidgetKit
import SwiftUI

// MARK: - Widget definition (all 5 families in one bundle)

struct PassdotWidget: Widget {
    let kind = "PassdotWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            PassdotWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Passdot")
        .description("Every dot, every pickup.")
        .supportedFamilies([
            .systemSmall,
            .systemMedium,
            .systemLarge,
            .accessoryRectangular,
            .accessoryCircular,
        ])
    }
}

// MARK: - Router view

struct PassdotWidgetEntryView: View {
    @Environment(\.widgetFamily) var family
    let entry: PickupEntry

    var body: some View {
        switch family {
        case .systemSmall:          SmallWidgetView(entry: entry)
        case .systemMedium:         MediumWidgetView(entry: entry)
        case .systemLarge:          LargeWidgetView(entry: entry)
        case .accessoryRectangular: AccessoryRectView(entry: entry)
        case .accessoryCircular:    AccessoryCircularView(entry: entry)
        default:                    SmallWidgetView(entry: entry)
        }
    }
}

// MARK: - Bundle

@main
struct PassdotWidgetBundle: WidgetBundle {
    var body: some Widget {
        PassdotWidget()
    }
}
