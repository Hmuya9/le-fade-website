"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { env } from "@/lib/env";
import { PLANS } from "@/config/plans";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  selectedDate: z.string().min(1, "Please select a date"),
  selectedTime: z.string().min(1, "Please select a time"),
  selectedBarber: z.string().min(1, "Please select a barber"),
  plan: z.enum(["standard", "deluxe"]),
  location: z.string().optional(),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      plan: "standard",
    },
  });

  const selectedPlan = watch("plan");

  // Mock data - replace with real data later
  const barbers = [
    { id: "1", name: "Mike", available: true },
    { id: "2", name: "Alex", available: true },
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    
    try {
      // For MVP: Open Calendly or show success message
      if (env.calendly) {
        window.open(env.calendly, "_blank");
      } else {
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      // TODO: Add proper error logging service
      setError("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Book Your Cut
          </h1>
          <p className="text-xl text-primary-600">
            Choose your date, time, and barber
          </p>
        </div>

        {showSuccess && (
          <Alert className="mb-6">
            <AlertDescription>
              Booking request submitted! We'll contact you shortly to confirm your appointment.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Booking Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary-900">Appointment Details</h3>
                  
                  {/* Plan Selection */}
                  <div>
                    <Label htmlFor="plan" className="text-sm font-medium text-primary-700 mb-2 block">
                      Select Plan *
                    </Label>
                    <div className="space-y-2">
                      {PLANS.map((plan) => (
                        <label key={plan.id} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={plan.id}
                            {...register("plan")}
                            className="text-accent-600 focus:ring-accent-500"
                          />
                          <span className="text-sm text-primary-700">
                            {plan.name} - ${(plan.priceMonthlyCents/100).toFixed(2)}/month ({plan.isHome ? "Home" : "Shop"})
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.plan && (
                      <p className="text-sm text-danger-600 mt-1">{errors.plan.message}</p>
                    )}
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label htmlFor="selectedDate" className="text-sm font-medium text-primary-700 mb-2 block">
                      Select Date *
                    </Label>
                    <Input
                      type="date"
                      {...register("selectedDate")}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.selectedDate && (
                      <p className="text-sm text-danger-600 mt-1">{errors.selectedDate.message}</p>
                    )}
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-sm font-medium text-primary-700 mb-2 block">
                      Select Time *
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setValue("selectedTime", time)}
                          className={`px-3 py-2 rounded-lg border transition-colors text-sm ${
                            watch("selectedTime") === time
                              ? "bg-primary-900 text-white border-primary-900"
                              : "bg-white text-primary-700 border-primary-200 hover:border-primary-400"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.selectedTime && (
                      <p className="text-sm text-danger-600 mt-1">{errors.selectedTime.message}</p>
                    )}
                  </div>

                  {/* Barber Selection */}
                  <div>
                    <Label className="text-sm font-medium text-primary-700 mb-2 block">
                      Select Barber *
                    </Label>
                    <div className="space-y-2">
                      {barbers.map((barber) => (
                        <button
                          key={barber.id}
                          type="button"
                          onClick={() => setValue("selectedBarber", barber.name)}
                          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                            watch("selectedBarber") === barber.name
                              ? "bg-primary-900 text-white border-primary-900"
                              : "bg-white text-primary-700 border-primary-200 hover:border-primary-400"
                          }`}
                        >
                          {barber.name}
                        </button>
                      ))}
                    </div>
                    {errors.selectedBarber && (
                      <p className="text-sm text-danger-600 mt-1">{errors.selectedBarber.message}</p>
                    )}
                  </div>

                  {/* Location for Deluxe */}
                  {selectedPlan === "deluxe" && (
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-primary-700 mb-2 block">
                        Home Address *
                      </Label>
                      <Input
                        {...register("location")}
                        placeholder="Enter your home address"
                      />
                      {errors.location && (
                        <p className="text-sm text-danger-600 mt-1">{errors.location.message}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column - Customer Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary-900">Your Information</h3>
                  
                  <div>
                    <Label htmlFor="customerName" className="text-sm font-medium text-primary-700 mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      {...register("customerName")}
                      placeholder="Enter your full name"
                    />
                    {errors.customerName && (
                      <p className="text-sm text-danger-600 mt-1">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerEmail" className="text-sm font-medium text-primary-700 mb-2 block">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      {...register("customerEmail")}
                      placeholder="Enter your email"
                    />
                    {errors.customerEmail && (
                      <p className="text-sm text-danger-600 mt-1">{errors.customerEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerPhone" className="text-sm font-medium text-primary-700 mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      type="tel"
                      {...register("customerPhone")}
                      placeholder="Enter your phone number"
                    />
                    {errors.customerPhone && (
                      <p className="text-sm text-danger-600 mt-1">{errors.customerPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-sm font-medium text-primary-700 mb-2 block">
                      Special Requests (Optional)
                    </Label>
                    <textarea
                      {...register("notes")}
                      className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Any specific styling preferences or notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back to Plans */}
        <div className="text-center mt-8">
          <a 
            href="/plans"
            className="text-primary-600 hover:text-primary-800 underline"
          >
            ← Back to Plans
          </a>
        </div>
      </div>
    </div>
  );
}

