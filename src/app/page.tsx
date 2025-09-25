import Link from "next/link";
import { PlanCard } from "@/components/PlanCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-24 text-center bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Look Sharp, Always.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Two plans. One routine. Fresh cuts, without the hassle.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/plans" 
            className="rounded-xl px-8 py-4 bg-black text-white font-semibold hover:bg-gray-800 transition-colors text-lg"
          >
            Start Your Subscription
          </Link>
          <Link 
            href="/booking" 
            className="rounded-xl px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-colors"
          >
            Book Free Cut
          </Link>
        </div>
      </section>

      {/* Plans Section */}
      <section className="px-6 py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Pick Your Plan. Stay Fresh.
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <PlanCard
            title="Standard"
            price="$39.99/mo"
            bullets={[
              "2 cuts/month at the shop",
              "First cut free",
              "Priority scheduling",
              "Best for consistency"
            ]}
            cta="/plans"
            accent="border"
          />
          <PlanCard
            title="Deluxe"
            price="$60/mo"
            bullets={[
              "2 cuts/month at your place",
              "Travel included",
              "First cut free",
              "Best for convenience"
            ]}
            cta="/plans"
            accent="bg"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-gray-50">
        <h3 className="text-2xl font-semibold text-center mb-12">
          Simple as 1–2–3
        </h3>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="font-semibold mb-2">Pick your plan</h4>
            <p className="text-gray-600">Standard or Deluxe.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="font-semibold mb-2">Book your cut</h4>
            <p className="text-gray-600">Choose time & barber.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="font-semibold mb-2">Get reminders</h4>
            <p className="text-gray-600">Show up, look sharp, repeat.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="px-6 py-16 bg-white">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Join the Crew
        </h3>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Get early deals, updates, and style inspiration. Join our WhatsApp group and follow us on Instagram.
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://chat.whatsapp.com/your-link"
            className="rounded-xl px-6 py-3 bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            Join WhatsApp
          </a>
          <a 
            href="https://instagram.com/your-handle"
            className="rounded-xl px-6 py-3 bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
          >
            Follow on Instagram
          </a>
        </div>
      </section>
    </main>
  );
}

