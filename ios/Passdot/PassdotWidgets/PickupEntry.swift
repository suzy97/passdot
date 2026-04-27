import WidgetKit

struct PickupEntry: TimelineEntry {
    let date: Date
    let pickups: Int
    let goal: Int
    let dayOfYear: Int
    let year: Int

    var pct: Double { Double(pickups) / Double(goal) }
    var status: PickupStatus { .from(pct: pct) }
    var yearPct: Int { Int((Double(dayOfYear) / 365.0) * 100) }
    var passed: Int { dayOfYear }
    var left: Int { 365 - dayOfYear }

    static func current() -> PickupEntry {
        let (p, g) = readPickups()
        let cal = Calendar.current
        let day = cal.ordinality(of: .day, in: .year, for: Date()) ?? 1
        let yr  = cal.component(.year, from: Date())
        return PickupEntry(date: Date(), pickups: p, goal: g, dayOfYear: day, year: yr)
    }

    static func preview(pickups: Int = 64, goal: Int = 100) -> PickupEntry {
        PickupEntry(date: Date(), pickups: pickups, goal: goal, dayOfYear: 109, year: 2026)
    }
}

// Read from shared App Group
private func readPickups() -> (Int, Int) {
    let ud = UserDefaults(suiteName: "group.com.passdot.shared") ?? .standard
    let today = Calendar.current.startOfDay(for: Date())
    var p = ud.integer(forKey: "pickups")
    if let saved = ud.object(forKey: "lastResetDate") as? Date,
       !Calendar.current.isDate(saved, inSameDayAs: today) { p = 0 }
    let g = ud.integer(forKey: "goal")
    return (p, g == 0 ? 100 : g)
}
