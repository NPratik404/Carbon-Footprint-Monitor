import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Car, Bus, Train, Plane, Trash2, Lightbulb, Target, Award } from 'lucide-react';
import { useCarbonData } from '../context/CarbonDataContext';

const Dashboard = () => {
  const { state } = useCarbonData();

  const pieData = [
    { name: 'Electricity', value: state.electricity.emissions, color: '#22c55e' },
    { name: 'Transport', value: Object.values(state.transport).reduce((sum, mode) => sum + mode.emissions, 0), color: '#0ea5e9' },
    { name: 'Waste', value: state.waste.emissions, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  const transportData = [
    { name: 'Car', value: state.transport.car.emissions, color: '#ef4444' },
    { name: 'Bus', value: state.transport.bus.emissions, color: '#8b5cf6' },
    { name: 'Train', value: state.transport.train.emissions, color: '#06b6d4' },
    { name: 'Flight', value: state.transport.flight.emissions, color: '#f97316' }
  ].filter(item => item.value > 0);

  const monthlyData = [
    { month: 'Jan', emissions: 2.1 },
    { month: 'Feb', emissions: 1.8 },
    { month: 'Mar', emissions: 2.3 },
    { month: 'Apr', emissions: 1.9 },
    { month: 'May', emissions: 2.0 },
    { month: 'Jun', emissions: 1.7 }
  ];

  const formatEmissions = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} tons`;
    }
    return `${value.toFixed(1)} kg`;
  };

  const getEmissionsStatus = () => {
    const total = state.totalEmissions;
    if (total < 1000) return { status: 'Excellent', color: 'text-eco-500', icon: <TrendingDown /> };
    if (total < 2000) return { status: 'Good', color: 'text-blue-500', icon: <Target /> };
    return { status: 'Needs Improvement', color: 'text-orange-500', icon: <TrendingUp /> };
  };

  const emissionsStatus = getEmissionsStatus();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Carbon Footprint Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your emissions and track your progress towards sustainability goals.
          </p>
        </motion.div>

        {/* Total Emissions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Total Carbon Footprint
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-eco-600 dark:text-eco-400">
                  {formatEmissions(state.totalEmissions)}
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-300">CO₂e</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`flex items-center space-x-2 text-lg font-semibold ${emissionsStatus.color}`}>
                {emissionsStatus.icon}
                <span>{emissionsStatus.status}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                This month
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emissions Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Pie Chart */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Emissions Breakdown
              </h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${formatEmissions(value)} CO₂e`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No emissions data available</p>
                  <p className="text-sm">Add your data to see the breakdown</p>
                </div>
              )}
            </div>

            {/* Transport Breakdown */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transport Emissions
              </h3>
              {transportData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={transportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${formatEmissions(value)} CO₂e`} />
                    <Bar dataKey="value" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Car className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No transport data available</p>
                </div>
              )}
            </div>

            {/* Monthly Trend */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Trend
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} tons CO₂e`} />
                  <Line type="monotone" dataKey="emissions" stroke="#22c55e" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Transport Breakdown */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transport Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Car</span>
                  </div>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {formatEmissions(state.transport.car.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bus className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">Bus</span>
                  </div>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {formatEmissions(state.transport.bus.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Train className="w-5 h-5 text-cyan-500" />
                    <span className="text-gray-700 dark:text-gray-300">Train</span>
                  </div>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {formatEmissions(state.transport.train.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">Flight</span>
                  </div>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {formatEmissions(state.transport.flight.emissions)}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Transport</span>
                  <span className="font-bold text-eco-600 dark:text-eco-400">
                    {formatEmissions(Object.values(state.transport).reduce((sum, mode) => sum + mode.emissions, 0))}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Suggestions Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-6 h-6 text-eco-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Suggestions
                </h3>
              </div>
              <div className="space-y-4">
                {state.aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-eco-50 to-ocean-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-eco-200 dark:border-gray-600"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {suggestion.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-eco-500" />
                          <span className="text-sm font-medium text-eco-600 dark:text-eco-400">
                            Potential impact: {suggestion.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Electricity</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatEmissions(state.electricity.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Transport</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatEmissions(Object.values(state.transport).reduce((sum, mode) => sum + mode.emissions, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Waste</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatEmissions(state.waste.emissions)}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-eco-600 dark:text-eco-400">
                    {formatEmissions(state.totalEmissions)}
                  </span>
                </div>
              </div>
            </div>

            {/* Debug Info - Remove this in production */}
            <div className="card p-6 mt-6 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Debug Info (Transport Data)
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <div>Car: {state.transport.car.km} km → {state.transport.car.emissions} kg CO2</div>
                <div>Bus: {state.transport.bus.km} km → {state.transport.bus.emissions} kg CO2</div>
                <div>Train: {state.transport.train.km} km → {state.transport.train.emissions} kg CO2</div>
                <div>Flight: {state.transport.flight.km} km → {state.transport.flight.emissions} kg CO2</div>
                <div className="font-semibold">Total Transport: {Object.values(state.transport).reduce((sum, mode) => sum + mode.emissions, 0)} kg CO2</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
