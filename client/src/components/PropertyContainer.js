import React from 'react';
import { usePropertyContext } from '../Context'; // Changed import
import PropertyFilter from './PropertyFilter'
import PropertyList from './PropertyList'

function PropertyContainer() {
  const { loading, sortedProperties, properties } = usePropertyContext();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <PropertyFilter properties={properties} />
      <PropertyList properties={sortedProperties} />
    </>
  );
}

export default PropertyContainer;
