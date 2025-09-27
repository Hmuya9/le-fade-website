import Link from "next/link";
import { env } from "@/lib/env";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/config/plans";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
              Book Your
              <span className="block text-accent-500">Best Cut</span>
            </h1>
            <p className="text-2xl md:text-3xl text-primary-300 mb-6 font-light max-w-3xl mx-auto">
              Premium haircut subscriptions for busy professionals
            </p>
            <p className="text-lg text-primary-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Consistent, professional cuts delivered on your schedule. 
              Never worry about booking again.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/plans" 
              className="inline-flex items-center px-10 py-5 bg-accent-500 text-primary-900 font-bold rounded-2xl hover:bg-accent-400 transition-all duration-300 text-xl shadow-2xl hover:shadow-accent-500/25 transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="mr-3 text-2xl">✂️</span>
              Start Your Subscription
            </Link>
            <a 
              href={env.calendly || "/booking"}
              className="inline-flex items-center px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-2xl hover:border-white hover:bg-white/10 transition-all duration-300 text-xl backdrop-blur-sm"
              target={env.calendly ? "_blank" : undefined}
            >
              <span className="mr-3">📅</span>
              Book Free Test Cut
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-primary-300 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent-500">✓</span>
              <span>Professional Barbers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-500">✓</span>
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-500">✓</span>
              <span>Home or Shop Service</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="px-6 py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Professional cuts, consistent quality, predictable pricing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PLANS.map((plan, idx) => (
              <Card key={plan.id} className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 ${
                idx === 1 ? "border-2 border-accent-500 relative" : ""
              }`}>
                {idx === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-500 text-primary-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-primary-900 mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary-900 mb-1">
                    ${(plan.priceMonthlyCents/100).toFixed(2)}
                  </div>
                  <CardDescription className="text-primary-600 mb-6">per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-3 mb-8">
                    {plan.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start">
                        <span className="text-success-500 mr-3 mt-0.5">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/plans" 
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-colors ${
                      idx === 1 
                        ? "bg-accent-500 text-primary-900 hover:bg-accent-400" 
                        : "bg-primary-900 text-white hover:bg-primary-800"
                    }`}
                  >
                    Get Started
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-primary-900 mb-4">
            How It Works
          </h3>
          <p className="text-xl text-primary-600 text-center mb-16 max-w-2xl mx-auto">
            Simple subscription process designed for busy professionals
          </p>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 text-primary-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                1
              </div>
              <h4 className="text-xl font-semibold text-primary-900 mb-3">Choose Your Plan</h4>
              <p className="text-primary-600 leading-relaxed">Select the subscription that fits your lifestyle. All plans include premium service and quality guarantee.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 text-primary-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                2
              </div>
              <h4 className="text-xl font-semibold text-primary-900 mb-3">Schedule Your Cuts</h4>
              <p className="text-primary-600 leading-relaxed">Book your appointments easily. Flexible scheduling that works around your busy schedule.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 text-primary-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                3
              </div>
              <h4 className="text-xl font-semibold text-primary-900 mb-3">Stay Sharp</h4>
              <p className="text-primary-600 leading-relaxed">Consistent professional cuts delivered on time. Focus on your success, we'll handle your style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Le Fade */}
      <section className="px-6 py-24 bg-primary-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Why Le Fade?
          </h3>
          <p className="text-xl text-primary-300 mb-12 max-w-2xl mx-auto">
            We understand that time is your most valuable asset. Our subscription model eliminates the hassle while delivering consistent professional results.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-primary-800 border-primary-700 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white mb-3">Consistency Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-300">Same quality, same style, every time. Our professional barbers maintain detailed notes of your preferences.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-800 border-primary-700 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white mb-3">Time Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-300">No more calling around or waiting for appointments. Your slots are reserved, your schedule is protected.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-800 border-primary-700 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white mb-3">Premium Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-300">Professional-grade equipment, quality products, and skilled barbers focused on your satisfaction.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-800 border-primary-700 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white mb-3">Flexible Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-300">Shop visits or home service. Choose what works best for your lifestyle and schedule.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-primary-900 mb-4">
              Our Work
            </h3>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Professional cuts that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="text-primary-400 text-4xl group-hover:text-primary-600 transition-colors">
                  ✂️
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-primary-900 mb-4">
              What Our Clients Say
            </h3>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Join hundreds of satisfied professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Chen",
                role: "Software Engineer",
                rating: 5,
                text: "Le Fade has completely transformed my grooming routine. The convenience of having a professional come to my home is unmatched.",
                avatar: "👨‍💻"
              },
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                rating: 5,
                text: "Consistent quality every time. I never have to worry about getting a bad haircut or finding time to book appointments.",
                avatar: "👩‍💼"
              },
              {
                name: "David Rodriguez",
                role: "Financial Advisor",
                rating: 5,
                text: "The subscription model is perfect for my busy schedule. Professional service at a predictable price.",
                avatar: "👨‍💼"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900">{testimonial.name}</h4>
                      <p className="text-sm text-primary-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent-500 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-primary-700 leading-relaxed">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-accent-500 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-primary-900 mb-6">
            Ready to Transform Your Routine?
          </h3>
          <p className="text-xl text-primary-900/80 mb-12 max-w-2xl mx-auto">
            Join successful professionals who trust Le Fade for their grooming needs. Start with your first cut free.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/plans" 
              className="inline-flex items-center px-10 py-5 bg-primary-900 text-white font-bold rounded-2xl hover:bg-primary-800 transition-all duration-300 text-xl shadow-2xl hover:shadow-primary-900/25 transform hover:-translate-y-1"
            >
              <span className="mr-3 text-2xl">✂️</span>
              Start Your Subscription
            </Link>
            <a 
              href={env.calendly || "/booking"}
              className="inline-flex items-center px-10 py-5 border-2 border-primary-900 text-primary-900 font-semibold rounded-2xl hover:bg-primary-900 hover:text-white transition-all duration-300 text-xl"
              target={env.calendly ? "_blank" : undefined}
            >
              <span className="mr-3">📅</span>
              Book Free Test Cut
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

