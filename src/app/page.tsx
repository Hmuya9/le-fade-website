import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 py-32 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Le Fade
          </h1>
          <p className="text-2xl text-slate-300 mb-4 font-light">
            Premium Haircut Subscriptions
          </p>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Consistent, professional cuts delivered on your schedule. 
            Never worry about booking again.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/1234567890?text=Hi%20I%27m%20interested%20in%20Le%20Fade%20subscription%20plans" 
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all duration-200 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">📱</span>
              Start Your Subscription
            </a>
            <Link 
              href="#plans" 
              className="inline-flex items-center px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-slate-500 hover:text-white transition-all duration-200"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="px-6 py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional cuts, consistent quality, predictable pricing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Essential Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Essential</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">$50</div>
                <div className="text-slate-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>2 professional cuts/month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>In-shop service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Priority booking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>First cut free</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/1234567890?text=I%27d%20like%20to%20subscribe%20to%20the%20Essential%20plan%20%2450%2Fmonth" 
                  className="block w-full bg-slate-900 text-white text-center py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Premium Plan - Featured */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-amber-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">$85</div>
                <div className="text-slate-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>2 professional cuts/month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span><strong>At-home service</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Premium styling products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>First cut free</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/1234567890?text=I%27d%20like%20to%20subscribe%20to%20the%20Premium%20plan%20%2485%2Fmonth" 
                  className="block w-full bg-amber-500 text-black text-center py-3 rounded-xl font-semibold hover:bg-amber-400 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Elite Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Elite</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">$120</div>
                <div className="text-slate-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>4 professional cuts/month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span><strong>At-home service</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Premium styling products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>24/7 priority support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Grooming consultation</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/1234567890?text=I%27d%20like%20to%20subscribe%20to%20the%20Elite%20plan%20%24120%2Fmonth" 
                  className="block w-full bg-slate-900 text-white text-center py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 mb-4">
            How It Works
          </h3>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
            Simple subscription process designed for busy professionals
          </p>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                1
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Choose Your Plan</h4>
              <p className="text-slate-600 leading-relaxed">Select the subscription that fits your lifestyle. All plans include premium service and quality guarantee.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                2
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Schedule Your Cuts</h4>
              <p className="text-slate-600 leading-relaxed">Book your appointments via WhatsApp. Flexible scheduling that works around your busy schedule.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                3
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Stay Sharp</h4>
              <p className="text-slate-600 leading-relaxed">Consistent professional cuts delivered on time. Focus on your success, we'll handle your style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Le Fade */}
      <section className="px-6 py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Why Le Fade?
          </h3>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            We understand that time is your most valuable asset. Our subscription model eliminates the hassle while delivering consistent professional results.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-slate-800 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-white mb-3">Consistency Guaranteed</h4>
              <p className="text-slate-300">Same quality, same style, every time. Our professional barbers maintain detailed notes of your preferences.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-white mb-3">Time Savings</h4>
              <p className="text-slate-300">No more calling around or waiting for appointments. Your slots are reserved, your schedule is protected.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-white mb-3">Premium Service</h4>
              <p className="text-slate-300">Professional-grade equipment, quality products, and skilled barbers focused on your satisfaction.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-white mb-3">Flexible Options</h4>
              <p className="text-slate-300">Shop visits or home service. Choose what works best for your lifestyle and schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-black mb-6">
            Ready to Transform Your Routine?
          </h3>
          <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
            Join successful professionals who trust Le Fade for their grooming needs. Start with your first cut free.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/1234567890?text=Hi%2C%20I%27m%20ready%20to%20start%20my%20Le%20Fade%20subscription.%20Can%20you%20help%20me%20choose%20the%20right%20plan%3F" 
              className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 text-lg shadow-xl"
            >
              <span className="mr-2">📱</span>
              Start Your Subscription
            </a>
            <a 
              href="https://wa.me/1234567890?text=I%27d%20like%20to%20learn%20more%20about%20Le%20Fade%20subscription%20plans" 
              className="inline-flex items-center px-8 py-4 border-2 border-black text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-all duration-200"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

