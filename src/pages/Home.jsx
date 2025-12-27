import { Link } from 'react-router-dom'
import React from 'react'
import Logo from '../assets/logo.png'
import bgimg from '../assets/bgimg.jpeg'
import bgimg2 from '../assets/bgimg2.jpeg'
import background from '../assets/background.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-white bg-fixed" style={{ backgroundImage: `url(${background})` }}>
      {/* Navigation */}
      <nav className="w-full border-b-4 border-black shadow-[4px_4px_0px_black]">
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-Coiny tracking-wide hover:scale-105 transition-transform">
            Novaspace
          </Link>

          {/* Nav links - hidden on mobile */}
          <div className="hidden md:flex space-x-10 text-lg font-Coiny">
            {[
              { name: "Home", path: "/" },
              { name: "Features", path: "#features" },
              { name: "Pricing", path: "#pricing" },
              { name: "Contact", path: "#contact" }
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="relative cursor-pointer after:block after:h-[3px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:-rotate-1"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-3 md:space-x-4">
            <Link
              to="/dashboard"
              className="px-3 md:px-6 py-2 md:py-2.5 text-sm md:text-base bg-white rounded-xl border-3 border-black shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 transition font-Coiny"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="px-3 md:px-6 py-2 md:py-2.5 text-sm md:text-base bg-yellow-300 rounded-xl border-3 border-black shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 transition font-Coiny"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20 gap-8 md:gap-14 overflow-hidden">
        {/* Left: Text Content */}
        <div className="max-w-2xl z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-Coiny leading-tight mb-6">
            One Workspace.<br />
            <span className="text-yellow-400">Every Project.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Novaspace brings your team together with real-time collaboration. 
            Write docs, chat, manage files, track tasks, and keep your work 
            organized — all in one beautiful workspace.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              "Real-time editor",
              "Team chat",
              "File management",
              "Task tracking",
              "Version history",
              "Secure & private",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-black rounded-lg shadow-[2px_2px_0px_black] hover:shadow-[4px_4px_0px_black] hover:-translate-y-0.5 transition"
              >
                <span className="font-Coiny text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-yellow-300 border-4 border-black rounded-xl text-center
                         shadow-[4px_4px_0px_black]
                         hover:shadow-[6px_6px_0px_black]
                         hover:-translate-y-0.5
                         transition font-Coiny text-lg"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white border-4 border-black rounded-xl text-center
                         shadow-[4px_4px_0px_black]
                         hover:shadow-[6px_6px_0px_black]
                         hover:-translate-y-0.5
                         transition font-Coiny text-lg"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Overlapping Images */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px] flex items-center justify-center">
          <div className="absolute top-0 left-[5%] md:left-[10%] z-10 w-[70%] md:w-[400px] border-4 border-black shadow-[6px_6px_0px_black] bg-white rounded-lg overflow-hidden transform hover:rotate-1 transition-transform">
            <img
              src={bgimg}
              alt="Collaborative workspace"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-20 md:top-[120px] right-[5%] md:right-[10%] w-[70%] md:w-[400px] border-4 border-black shadow-[6px_6px_0px_black] bg-white rounded-lg overflow-hidden transform hover:-rotate-1 transition-transform">
            <img
              src={bgimg2}
              alt="Task management"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-16 py-16 md:py-24 bg-yellow-50">
        <h2 className="text-3xl md:text-5xl font-Coiny text-center mb-12 md:mb-16">
          Everything Your Team Needs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Collaborate in Real-Time",
              desc: "Work together seamlessly with live cursors, instant updates, and built-in presence indicators."
            },
            {
              title: "Organize Everything",
              desc: "Keep files, docs, tasks, and conversations in one centralized workspace. No more switching tools."
            },
            {
              title: "Never Lose Work",
              desc: "Automatic version history tracks every change. Restore previous versions anytime with one click."
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 transition"
            >
              <h3 className="text-xl md:text-2xl font-Coiny mb-3">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-16 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-Coiny mb-6">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Join thousands of teams already using Novaspace to collaborate better and ship faster.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-10 py-4 bg-yellow-300 border-4 border-black rounded-xl
                     shadow-[4px_4px_0px_black]
                     hover:shadow-[6px_6px_0px_black]
                     hover:-translate-y-0.5
                     transition font-Coiny text-xl"
        >
          Start Your Free Workspace
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black px-6 md:px-16 py-8 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-Coiny">Novaspace</div>
          <div className="flex gap-6 text-sm font-Coiny">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
          <div className="text-sm text-gray-600">© 2025 Novaspace. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default Home
