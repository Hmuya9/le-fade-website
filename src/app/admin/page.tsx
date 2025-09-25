"use client"

import { useEffect, useState } from "react"
import { AdminMetrics } from "@/types"

export default function AdminDashboard() {
  const [data, setData] = useState<AdminMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then(res => res.json())
      .then(data => {
        setData(data.kpis)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load data</div>
      </div>
    )
  }

  const formatCurrency = (cents: number) => 
    `$${(cents / 100).toFixed(2)}`

  const formatPercentage = (value: number) => 
    `${(value * 100).toFixed(1)}%`

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Active Members"
            value={data.activeMembers}
            icon="👥"
          />
          <MetricCard
            title="Monthly Recurring Revenue"
            value={formatCurrency(data.mrr)}
            icon="💰"
          />
          <MetricCard
            title="Bookings This Week"
            value={data.bookingsThisWeek}
            icon="📅"
          />
          <MetricCard
            title="Completion Rate"
            value={formatPercentage(data.completionRate)}
            icon="✅"
          />
          <MetricCard
            title="Churn Rate (30d)"
            value={formatPercentage(data.churn30)}
            icon="📉"
            alert={data.churn30 > 0.05}
          />
          <MetricCard
            title="New Trials (7d)"
            value={data.trials7}
            icon="🆕"
          />
        </div>

        {/* Profit Panel */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6">Profit Analysis (Last 30 Days)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Revenue</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(data.revenue30)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Base Cost</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(data.breakdown.baseCost)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Standard Cost</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(data.breakdown.standardCost)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Deluxe Cost</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(data.breakdown.deluxeCost)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Bonus/Free</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(data.breakdown.bonusCost)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Operations</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(data.breakdown.opsCost)}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">Net Profit</div>
            <div className={`text-4xl font-bold ${
              data.profit >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {formatCurrency(data.profit)}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Margin: {formatPercentage(data.revenue30 > 0 ? data.profit / data.revenue30 : 0)}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="text-lg font-semibold mb-2">Manage Barbers</div>
              <div className="text-sm text-gray-600">Add, edit, or remove barbers</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="text-lg font-semibold mb-2">View Appointments</div>
              <div className="text-sm text-gray-600">See all upcoming bookings</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="text-lg font-semibold mb-2">Send Notifications</div>
              <div className="text-sm text-gray-600">Message all members</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ 
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
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${
      alert ? "border-2 border-red-200" : ""
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className={`text-3xl font-bold ${
        alert ? "text-red-600" : "text-gray-900"
      }`}>
        {value}
      </div>
    </div>
  )
}
