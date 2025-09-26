import { PLANS } from "@/config/plans"

describe("Plans Configuration", () => {
  test("should have exactly 2 plans", () => {
    expect(PLANS).toHaveLength(2)
  })

  test("should have Standard plan with correct pricing", () => {
    const standardPlan = PLANS.find(plan => plan.id === "standard")
    expect(standardPlan).toBeDefined()
    expect(standardPlan?.name).toBe("Standard")
    expect(standardPlan?.priceMonthlyCents).toBe(3999)
    expect(standardPlan?.isHome).toBe(false)
  })

  test("should have Deluxe plan with correct pricing", () => {
    const deluxePlan = PLANS.find(plan => plan.id === "deluxe")
    expect(deluxePlan).toBeDefined()
    expect(deluxePlan?.name).toBe("Deluxe")
    expect(deluxePlan?.priceMonthlyCents).toBe(6000)
    expect(deluxePlan?.isHome).toBe(true)
  })

  test("should have required bullet points", () => {
    PLANS.forEach(plan => {
      expect(plan.bullets).toBeDefined()
      expect(plan.bullets.length).toBeGreaterThan(0)
      expect(plan.bullets.every(bullet => typeof bullet === "string")).toBe(true)
    })
  })

  test("should have valid price IDs", () => {
    PLANS.forEach(plan => {
      expect(plan.stripePriceId).toBeDefined()
      expect(typeof plan.stripePriceId).toBe("string")
    })
  })
})
