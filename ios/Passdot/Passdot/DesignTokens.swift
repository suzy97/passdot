import SwiftUI

// MARK: - Design tokens

struct PD {
    static let past    = Color(hex: "#c4b5fd")
    static let today   = Color.white
    static let future  = Color.white.opacity(0.10)
    static let safe    = Color(hex: "#c4b5fd")
    static let warn    = Color(hex: "#fbbf24")
    static let over    = Color(hex: "#f87171")
    static let surface = Color.white.opacity(0.06)
    static let divider = Color.white.opacity(0.08)
    static let t100    = Color.white
    static let t65     = Color.white.opacity(0.65)
    static let t45     = Color.white.opacity(0.45)
    static let t35     = Color.white.opacity(0.35)
    static let t30     = Color.white.opacity(0.30)
}

// MARK: - Status

enum PickupStatus {
    case safe, warn, over

    static func from(pct: Double) -> PickupStatus {
        if pct < 0.8 { return .safe }
        if pct < 1.0 { return .warn }
        return .over
    }

    var color: Color {
        switch self {
        case .safe: return PD.safe
        case .warn: return PD.warn
        case .over: return PD.over
        }
    }

    var headline: String? {
        switch self {
        case .safe: return nil
        case .warn: return "Ease up — breathe."
        case .over: return "Put down the phone."
        }
    }

    func message(pickups: Int, goal: Int) -> String {
        let diff = goal - pickups
        switch self {
        case .over:
            let over = pickups - goal
            if over >= 30 { return "put it down · \(over) over" }
            if over >= 10 { return "step away · \(over) over goal" }
            return "time to rest · \(over) over"
        case .warn:
            if diff <= 5 { return "almost there — pause soon" }
            return "\(diff) more to goal · ease off"
        case .safe:
            return "\(diff) more to goal"
        }
    }
}

// MARK: - Color(hex:) extension

extension Color {
    init(hex: String) {
        let h = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: h).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xFF) / 255
        let g = Double((int >>  8) & 0xFF) / 255
        let b = Double( int        & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}
