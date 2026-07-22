import React, { useState, useEffect } from 'react';

function Landing({ onGetStarted }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Smart Dashboards',
      description: 'Role-based dashboards for students, faculty, and admin with real-time updates',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📅',
      title: 'Attendance Tracking',
      description: 'Automated attendance management with detailed reports and analytics',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📚',
      title: 'Assignment Management',
      description: 'Create, submit, and grade assignments with instant feedback',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '⏰',
      title: 'Class Scheduling',
      description: 'Organized time tables and class schedules for all students',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📢',
      title: 'Notifications',
      description: 'Instant notifications for announcements, grades, and important updates',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Comprehensive reports and analytics for better insights',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students' },
    { number: '35', label: 'Faculty Members' },
    { number: '24', label: 'Courses' },
    { number: '99%', label: 'Uptime' }
  ];

  const testimonials = [
    {
      name: 'Rahul Kumar',
      role: 'Student',
      text: 'Smart Campus made managing my assignments and attendance so easy!',
      avatar: '👨‍🎓'
    },
    {
      name: 'Dr. Jane Smith',
      role: 'Faculty',
      text: 'The best platform for managing my courses and tracking student progress.',
      avatar: '👩‍🏫'
    },
    {
      name: 'Admin Panel',
      role: 'Administrator',
      text: 'Comprehensive tools for managing the entire campus efficiently.',
      avatar: '⚙️'
    }
  ];

  return (
    <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 animate-slide-in-left">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">
              SC
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Smart Campus
            </span>
          </div>

          <button
            onClick={onGetStarted}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse" />
          <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-48 -left-48 animate-pulse animation-delay-2000" />
        </div>

        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              Elevate Your{' '}
              <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Campus Experience
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up animation-delay-200">
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Streamline education with Smart Campus - the all-in-one platform for students, faculty, and administrators
            </p>
          </div>

          <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold text-lg transition-all transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-600/50"
            >
              Start Now
            </button>
            <button className="px-8 py-4 border-2 border-indigo-500 text-indigo-400 rounded-lg font-bold text-lg hover:bg-indigo-500/10 transition-all transform hover:scale-105 active:scale-95">
              Learn More
            </button>
          </div>
        </div>

        {/* Floating Icon Animation */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-12 h-12 border-2 border-indigo-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-slate-300">Everything you need to manage campus operations seamlessly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-linear-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-indigo-500/50 transition-all transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              <div className={`h-1 w-12 bg-linear-to-br ${feature.color} rounded-full mt-4 group-hover:w-full transition-all`} />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-slate-300">Simple steps to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Sign Up', desc: 'Create your account in seconds' },
            { step: '2', title: 'Choose Role', desc: 'Select Student, Faculty, or Admin' },
            { step: '3', title: 'Explore Dashboard', desc: 'Access your personalized dashboard' },
            { step: '4', title: 'Manage', desc: 'Start managing academics efficiently' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl transform hover:scale-110 transition-transform">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{item.title}</h3>
              <p className="text-slate-400 text-center">{item.desc}</p>
              {idx < 3 && (
                <div className="hidden md:block absolute top-8 -right-8 text-3xl text-indigo-500">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 animate-fade-in-up">
        <div className="max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2 transform hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <p className="text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-4">What Users Say</h2>
          <p className="text-xl text-slate-300">Join thousands of satisfied users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-linear-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 transition-all transform hover:-translate-y-2 hover:border-indigo-500/50 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-300 italic">{testimonial.text}</p>
              <div className="flex mt-4 text-yellow-400">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 to-purple-600/10 rounded-3xl" />

        <div className="max-w-4xl mx-auto relative z-10 text-center animate-fade-in-up">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 transform hover:scale-105 transition-transform">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Campus?</h2>
            <p className="text-lg text-indigo-100 mb-8">Join Smart Campus today and experience seamless academic management</p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-lg hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 Smart Campus. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-indigo-400 transition">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Landing;
