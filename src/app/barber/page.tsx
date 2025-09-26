"use client";

import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  status: "booked" | "confirmed" | "completed" | "cancelled";
  plan: "Standard" | "Deluxe";
}

export default function BarberDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [barberName, setBarberName] = useState("Mike"); // Mock barber name

  // Mock data - replace with real API calls later
  useEffect(() => {
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        customerName: "John Smith",
        customerEmail: "john@email.com",
        customerPhone: "555-0123",
        date: "2024-01-20",
        time: "10:00 AM",
        status: "booked",
        plan: "Standard"
      },
      {
        id: "2",
        customerName: "David Johnson",
        customerEmail: "david@email.com",
        customerPhone: "555-0456",
        date: "2024-01-20",
        time: "2:00 PM",
        status: "confirmed",
        plan: "Deluxe"
      },
      {
        id: "3",
        customerName: "Mike Wilson",
        customerEmail: "mike@email.com",
        customerPhone: "555-0789",
        date: "2024-01-21",
        time: "11:00 AM",
        status: "booked",
        plan: "Standard"
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  const updateAppointmentStatus = (id: string, newStatus: Appointment["status"]) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "booked": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanColor = (plan: "Standard" | "Deluxe") => {
    return plan === "Deluxe" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-2">
            Barber Dashboard
          </h1>
          <p className="text-xl text-primary-600">
            Welcome back, {barberName}! Here are your upcoming appointments.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-200">
            <div className="text-2xl font-bold text-primary-900">
              {appointments.length}
            </div>
            <div className="text-sm text-primary-600">Total Appointments</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-200">
            <div className="text-2xl font-bold text-info-600">
              {appointments.filter(apt => apt.status === "confirmed").length}
            </div>
            <div className="text-sm text-primary-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-200">
            <div className="text-2xl font-bold text-success-600">
              {appointments.filter(apt => apt.status === "completed").length}
            </div>
            <div className="text-sm text-primary-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-200">
            <div className="text-2xl font-bold text-accent-600">
              {appointments.filter(apt => apt.plan === "Deluxe").length}
            </div>
            <div className="text-sm text-primary-600">Deluxe Cuts</div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-200">
          <h2 className="text-2xl font-semibold mb-6 text-primary-900">Upcoming Appointments</h2>
          
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-primary-500 text-lg">No appointments scheduled</div>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-primary-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-primary-900">
                          {appointment.customerName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(appointment.plan)}`}>
                          {appointment.plan}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-primary-600">
                        <div>
                          <strong>Date:</strong> {appointment.date}
                        </div>
                        <div>
                          <strong>Time:</strong> {appointment.time}
                        </div>
                        <div>
                          <strong>Contact:</strong> {appointment.customerPhone}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      {appointment.status === "booked" && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                            className="px-4 py-2 bg-info-600 text-white rounded-lg hover:bg-info-700 transition-colors text-sm"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                            className="px-4 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {appointment.status === "confirmed" && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                          className="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors text-sm"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-primary-200">
          <h2 className="text-2xl font-semibold mb-6 text-primary-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-primary-200 rounded-xl hover:border-primary-300 transition-colors text-left">
              <div className="text-lg font-semibold mb-2 text-primary-900">Update Availability</div>
              <div className="text-sm text-primary-600">Set your working hours</div>
            </button>
            <button className="p-4 border-2 border-primary-200 rounded-xl hover:border-primary-300 transition-colors text-left">
              <div className="text-lg font-semibold mb-2 text-primary-900">View Earnings</div>
              <div className="text-sm text-primary-600">Check your payouts</div>
            </button>
            <button className="p-4 border-2 border-primary-200 rounded-xl hover:border-primary-300 transition-colors text-left">
              <div className="text-lg font-semibold mb-2 text-primary-900">Contact Support</div>
              <div className="text-sm text-primary-600">Get help when needed</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

