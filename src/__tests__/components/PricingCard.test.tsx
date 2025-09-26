import { render, screen, fireEvent } from "@testing-library/react"
import { PricingCard } from "@/components/PricingCard"

describe("PricingCard Component", () => {
  const mockProps = {
    title: "Test Plan",
    price: "$39.99/mo",
    bullets: ["Feature 1", "Feature 2", "Feature 3"],
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders with correct title and price", () => {
    render(<PricingCard {...mockProps} />)
    
    expect(screen.getByText("Test Plan")).toBeInTheDocument()
    expect(screen.getByText("$39.99/mo")).toBeInTheDocument()
  })

  test("renders all bullet points", () => {
    render(<PricingCard {...mockProps} />)
    
    expect(screen.getByText("Feature 1")).toBeInTheDocument()
    expect(screen.getByText("Feature 2")).toBeInTheDocument()
    expect(screen.getByText("Feature 3")).toBeInTheDocument()
  })

  test("calls onClick when button is clicked", () => {
    render(<PricingCard {...mockProps} />)
    
    const button = screen.getByText("Start Free Trial")
    fireEvent.click(button)
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })

  test("applies accent styling when accent prop is true", () => {
    render(<PricingCard {...mockProps} accent={true} />)
    
    const card = screen.getByText("Test Plan").closest("div")
    expect(card).toHaveClass("bg-primary-900", "text-white")
  })

  test("applies default styling when accent prop is false", () => {
    render(<PricingCard {...mockProps} accent={false} />)
    
    const card = screen.getByText("Test Plan").closest("div")
    expect(card).toHaveClass("bg-white", "border", "border-primary-200")
  })
})
