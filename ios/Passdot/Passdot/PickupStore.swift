import Foundation
import WidgetKit

private let suiteName = "group.com.passdot.shared"
private let pickupsKey = "pickups"
private let goalKey = "goal"
private let dateKey = "lastResetDate"

final class PickupStore: ObservableObject {
    static let shared = PickupStore()

    @Published var pickups: Int {
        didSet { save(); WidgetCenter.shared.reloadAllTimelines() }
    }
    @Published var goal: Int {
        didSet { save(); WidgetCenter.shared.reloadAllTimelines() }
    }

    private let defaults: UserDefaults

    private init() {
        let ud = UserDefaults(suiteName: suiteName) ?? .standard
        self.defaults = ud

        // Reset count if a new day has started
        let today = Calendar.current.startOfDay(for: Date())
        if let saved = ud.object(forKey: dateKey) as? Date,
           Calendar.current.isDate(saved, inSameDayAs: today) {
            pickups = ud.integer(forKey: pickupsKey)
        } else {
            pickups = 0
            ud.set(today, forKey: dateKey)
        }
        goal = ud.integer(forKey: goalKey).nonZero ?? 100
    }

    func increment() { pickups += 1 }
    func reset()     { pickups = 0 }

    private func save() {
        defaults.set(pickups, forKey: pickupsKey)
        defaults.set(goal, forKey: goalKey)
    }

    // Convenience read used by the widget provider (no ObservableObject needed there)
    static func read() -> (pickups: Int, goal: Int) {
        let ud = UserDefaults(suiteName: suiteName) ?? .standard
        let today = Calendar.current.startOfDay(for: Date())
        var p = ud.integer(forKey: pickupsKey)
        if let saved = ud.object(forKey: dateKey) as? Date,
           !Calendar.current.isDate(saved, inSameDayAs: today) { p = 0 }
        let g = ud.integer(forKey: goalKey).nonZero ?? 100
        return (p, g)
    }
}

private extension Int {
    var nonZero: Int? { self == 0 ? nil : self }
}
