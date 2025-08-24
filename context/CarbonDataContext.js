import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CarbonDataContext = createContext();

const initialState = {
  electricity: {
    kwh: 0,
    emissions: 0,
  },
  transport: {
    car: { km: 0, emissions: 0 },
    bus: { km: 0, emissions: 0 },
    train: { km: 0, emissions: 0 },
    flight: { km: 0, emissions: 0 },
  },
  waste: {
    kg: 0,
    emissions: 0,
  },
  totalEmissions: 0,
  aiSuggestions: [
    {
      id: 1,
      title: "Switch to Renewable Energy",
      description: "Switch to renewable energy to save 2.5 tons of CO₂ annually",
      impact: "2.5 tons CO₂",
      category: "energy",
      icon: "⚡"
    },
    {
      id: 2,
      title: "Reduce Car Travel",
      description: "Reduce car travel by 10% to save 0.8 tons of CO₂ annually",
      impact: "0.8 tons CO₂",
      category: "transport",
      icon: "🚗"
    },
    {
      id: 3,
      title: "Improve Waste Management",
      description: "Recycle waste to cut emissions by 30%",
      impact: "30% reduction",
      category: "waste",
      icon: "♻️"
    },
    {
      id: 4,
      title: "Use Public Transport",
      description: "Switch to public transport for daily commute",
      impact: "1.2 tons CO₂",
      category: "transport",
      icon: "🚌"
    }
  ]
};

const carbonDataReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ELECTRICITY':
      const electricityEmissions = action.payload.kwh * 0.5; // 0.5 kg CO2 per kWh
      return {
        ...state,
        electricity: {
          kwh: action.payload.kwh,
          emissions: electricityEmissions,
        },
        totalEmissions: calculateTotalEmissions({
          ...state,
          electricity: { kwh: action.payload.kwh, emissions: electricityEmissions }
        })
      };
    
    case 'UPDATE_TRANSPORT':
      const transportData = { ...state.transport, ...action.payload };
      // Calculate emissions for each transport mode and add to the data
      Object.keys(transportData).forEach(key => {
        if (transportData[key] && transportData[key].km) {
          transportData[key].emissions = transportData[key].km * getTransportEmissionsFactor(transportData[key].type || 'car');
        }
      });
      
      return {
        ...state,
        transport: transportData,
        totalEmissions: calculateTotalEmissions({
          ...state,
          transport: transportData
        })
      };
    
    case 'UPDATE_WASTE':
      const wasteEmissions = action.payload.kg * 2.53; // 2.53 kg CO2 per kg waste
      return {
        ...state,
        waste: {
          kg: action.payload.kg,
          emissions: wasteEmissions,
        },
        totalEmissions: calculateTotalEmissions({
          ...state,
          waste: { kg: action.payload.kg, emissions: wasteEmissions }
        })
      };
    
    case 'RESET_DATA':
      return initialState;
    
    default:
      return state;
  }
};

const getTransportEmissionsFactor = (type) => {
  const factors = {
    car: 0.2, // kg CO2 per km
    bus: 0.1,
    train: 0.04,
    flight: 0.25
  };
  return factors[type] || 0.2;
};

const calculateTotalEmissions = (state) => {
  const electricityEmissions = state.electricity.emissions;
  const transportEmissions = Object.values(state.transport).reduce((total, mode) => {
    return total + (mode.emissions || 0);
  }, 0);
  const wasteEmissions = state.waste.emissions;
  
  return electricityEmissions + transportEmissions + wasteEmissions;
};

export const CarbonDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carbonDataReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('carbonData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach(key => {
        if (key === 'electricity') {
          dispatch({ type: 'UPDATE_ELECTRICITY', payload: { kwh: parsedData[key].kwh } });
        } else if (key === 'transport') {
          Object.keys(parsedData[key]).forEach(mode => {
            dispatch({ 
              type: 'UPDATE_TRANSPORT', 
              payload: { [mode]: { ...parsedData[key][mode], type: mode } }
            });
          });
        } else if (key === 'waste') {
          dispatch({ type: 'UPDATE_WASTE', payload: { kg: parsedData[key].kg } });
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carbonData', JSON.stringify(state));
  }, [state]);

  return (
    <CarbonDataContext.Provider value={{ state, dispatch }}>
      {children}
    </CarbonDataContext.Provider>
  );
};

export const useCarbonData = () => {
  const context = useContext(CarbonDataContext);
  if (!context) {
    throw new Error('useCarbonData must be used within a CarbonDataProvider');
  }
  return context;
};
