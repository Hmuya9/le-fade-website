import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils"

describe("Utility Functions", () => {
  describe("formatCurrency", () => {
    test("should format cents to currency", () => {
      expect(formatCurrency(3999)).toBe("$39.99")
      expect(formatCurrency(6000)).toBe("$60.00")
      expect(formatCurrency(0)).toBe("$0.00")
    })

    test("should handle negative values", () => {
      expect(formatCurrency(-1000)).toBe("-$10.00")
    })
  })

  describe("formatDate", () => {
    test("should format date correctly", () => {
      const date = new Date("2025-01-26")
      expect(formatDate(date)).toBe("Jan 26, 2025")
    })
  })

  describe("formatDateTime", () => {
    test("should format datetime correctly", () => {
      const date = new Date("2025-01-26T14:30:00")
      const formatted = formatDateTime(date)
      expect(formatted).toContain("Jan 26, 2025")
      expect(formatted).toContain("2:30 PM")
    })
  })
})
