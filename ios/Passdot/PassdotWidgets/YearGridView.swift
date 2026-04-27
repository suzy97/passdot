import SwiftUI

struct YearGridView: View {
    var dayOfYear: Int
    var dotSize: CGFloat = 2.5
    var gap: CGFloat = 2.5
    var cols: Int = 18
    var total: Int = 365

    var body: some View {
        let columns = Array(repeating: GridItem(.fixed(dotSize), spacing: gap), count: cols)
        LazyVGrid(columns: columns, spacing: gap) {
            ForEach(0..<total, id: \.self) { i in
                let n = i + 1
                let isToday = n == dayOfYear
                let isPast  = n < dayOfYear
                RoundedRectangle(cornerRadius: dotSize * 0.4)
                    .fill(isToday ? PD.today : isPast ? PD.past : PD.future)
                    .frame(width: dotSize, height: dotSize)
                    .shadow(color: isToday ? .white.opacity(0.55) : .clear,
                            radius: dotSize * 0.8)
            }
        }
    }
}
