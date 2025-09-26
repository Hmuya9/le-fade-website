import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Le Fade</h3>
            <p className="text-primary-300 mb-4 max-w-md">
              Professional haircut subscriptions for busy professionals. 
              Consistent quality, flexible scheduling, and premium service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Plans</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/plans" className="text-primary-300 hover:text-white transition-colors">
                  Standard Plan
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-primary-300 hover:text-white transition-colors">
                  Deluxe Plan
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-primary-300 hover:text-white transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-primary-400">
            © 2025 Le Fade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
