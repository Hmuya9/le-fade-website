import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PricingCard({
  title, price, bullets, onClick, accent = false
}: {
  title: string;
  price: string;
  bullets: readonly string[];
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <Card className={`rounded-2xl p-8 ${accent ? "bg-primary-900 text-white" : "bg-white border border-primary-200"}`}>
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <div className="text-4xl font-bold mt-2">{price}</div>
      <ul className="space-y-2 mt-6 text-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className={`mt-1 ${accent ? "text-accent-400" : "text-accent-600"}`}>✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full mt-8 ${accent ? "bg-white text-primary-900 hover:bg-primary-100" : "bg-primary-900 text-white hover:bg-primary-800"}`} onClick={onClick}>
        Start Free Trial
      </Button>
    </Card>
  );
}
