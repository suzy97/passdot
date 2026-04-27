import SwiftUI

struct BarView: View {
    var pct: Double
    var color: Color
    var height: CGFloat = 3

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 2)
                    .fill(Color.white.opacity(0.08))
                RoundedRectangle(cornerRadius: 2)
                    .fill(color)
                    .frame(width: geo.size.width * min(1, max(0, pct)))
                    .animation(.easeInOut(duration: 0.3), value: pct)
            }
        }
        .frame(height: height)
    }
}
