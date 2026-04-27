import WidgetKit

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> PickupEntry {
        .preview()
    }

    func getSnapshot(in context: Context, completion: @escaping (PickupEntry) -> Void) {
        completion(context.isPreview ? .preview() : .current())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<PickupEntry>) -> Void) {
        let entry = PickupEntry.current()
        // Refresh at midnight to reset daily count
        let midnight = Calendar.current.startOfDay(for: Date().addingTimeInterval(86400))
        let timeline = Timeline(entries: [entry], policy: .after(midnight))
        completion(timeline)
    }
}
