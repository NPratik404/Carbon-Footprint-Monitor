import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, TrendingDown, Users, Award, Zap, Leaf, BarChart3, Heart, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { currentUser } = useAuth();
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Tracking",
      description: "Monitor your carbon emissions in real-time with detailed analytics and insights."
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Smart Reductions",
      description: "Get AI-powered suggestions to reduce your carbon footprint effectively."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Leaderboard",
      description: "Compare your progress with others and stay motivated to achieve sustainability goals."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges and recognition for your sustainability efforts and milestones."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Environment Alerts",
      description: "Monitor correlation between emissions and health risks like asthma or heat stress."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Agriculture & Water Management",
      description: "Track emissions from irrigation pumps, fertilizer use, and water treatment plants."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Education & Awareness",
      description: "Simplified dashboard with gamified challenges for schools and universities."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "Tons CO₂ Saved" },
    { number: "500+", label: "Organizations" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-eco-50 via-white to-ocean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-eco-500/10 to-ocean-500/10"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-eco-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-ocean-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-eco-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Track. <span className="text-eco-600 dark:text-eco-400">Reduce.</span> Sustain.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Monitor and reduce your carbon footprint with our comprehensive platform. 
                Join thousands of organizations, households, and cities in the fight against climate change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={currentUser ? "/dashboard" : "/login"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>{currentUser ? 'Go to Dashboard' : 'Get Started'}</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
                <Link to="/tips">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <Globe size={20} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-eco-600 dark:text-eco-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Carbon Monitor?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides everything you need to understand, track, and reduce your carbon footprint.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center"
              >
                <div className="text-eco-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-eco-600 dark:bg-eco-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-eco-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already tracking and reducing their carbon footprint. 
              Start your sustainability journey today.
            </p>
            <Link to="/data-input">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-eco-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
