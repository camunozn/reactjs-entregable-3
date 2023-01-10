import React from 'react';

const LocationInfo = ({ location }) => {
  return (
    <div className="location-info">
      <div className="grid grid--4-cols">
        <div className="location-info-box location-info--name">
          <h3 className="heading-tertiary">Name</h3>
          <p>{location?.name}</p>
        </div>
        <div className="location-info-box location-info--type">
          <h3 className="heading-tertiary">Type</h3>
          <p>{location?.type === '' ? 'N/A' : location?.type}</p>
        </div>
        <div className="location-info-box location-info--dimension">
          <h3 className="heading-tertiary">Dimension</h3>
          <p>{location?.dimension}</p>
        </div>
        <div className="location-info-box location-info--population">
          <h3 className="heading-tertiary">Population</h3>
          <p>{location.residents?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
