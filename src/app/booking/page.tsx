"use client";

import { useState } from "react";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Mock data - replace with real data later
  const barbers = [
    { id: "1", name: "Mike", available: true },
    { id: "2", name: "Alex", available: true },
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedBarber || !customerName || !customerEmail) {
      alert("Please fill in all required fields");
      return;
    }

    // For now, just show confirmation
    alert(`Booking confirmed!\n\nDate: ${selectedDate}\nTime: ${selectedTime}\nBarber: ${selectedBarber}\nCustomer: ${customerName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Cut
          </h1>
          <p className="text-xl text-gray-600">
            Choose your date, time, and barber
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Booking Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedTime === time
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Barber Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Barber *
                </label>
                <div className="space-y-2">
                  {barbers.map((barber) => (
                    <button
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber.name)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        selectedBarber === barber.name
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {barber.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Customer Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Booking Summary */}
              {selectedDate && selectedTime && selectedBarber && (
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Booking Summary</h3>
                  <p><strong>Date:</strong> {selectedDate}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Barber:</strong> {selectedBarber}</p>
                  <p><strong>Customer:</strong> {customerName}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleBooking}
                className="w-full mt-6 px-6 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>

        {/* Back to Plans */}
        <div className="text-center mt-8">
          <a 
            href="/plans"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Plans
          </a>
        </div>
      </div>
    </div>
  );
}
