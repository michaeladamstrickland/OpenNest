import React, { createContext, useState, useEffect } from 'react';
import mockProperties from '../data/mock_properties.json';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);
  const [sortedProperties, setSortedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterProperties = (filters) => {
    let filteredProperties = [...properties];

    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter((property) => property.beds >= filters.bedrooms);
    }

    if (filters.bathrooms) {
      filteredProperties = filteredProperties.filter((property) => property.baths >= filters.bathrooms);
    }

    if (filters.minPrice && filters.maxPrice) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price >= filters.minPrice && property.price <= filters.maxPrice
      );
    }

    if (filters.city) {
      filteredProperties = filteredProperties.filter((property) =>
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setSortedProperties(filteredProperties);
  };

  useEffect(() => {
    setSortedProperties(mockProperties); // Initial setup
    setLoading(false);
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, sortedProperties, loading, filterProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => React.useContext(PropertyContext);

export default PropertyContext;
