import { Card } from "@/components/ui/card";

export function MetricCard({ 
  title, 
  value, 
  icon, 
  alert = false 
}: { 
  title: string 
  value: string | number 
  icon: string 
  alert?: boolean
}) {
  return (
    <Card className={`p-6 ${alert ? "border-2 border-danger-200" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-primary-600">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className={`text-3xl font-bold ${
        alert ? "text-danger-600" : "text-primary-900"
      }`}>
        {value}
      </div>
    </Card>
  )
}

