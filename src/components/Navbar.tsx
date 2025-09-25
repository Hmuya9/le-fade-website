import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-black">
            Le Fade
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="/plans" className="text-gray-700 hover:text-black">
              Plans
            </Link>
            <Link href="/booking" className="text-gray-700 hover:text-black">
              Book Now
            </Link>
            <Link href="/barber" className="text-gray-700 hover:text-black">
              Barber Login
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-black">
              Admin
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/plans" 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}