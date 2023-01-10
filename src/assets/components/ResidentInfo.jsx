import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResidentInfo = ({ residentUrl }) => {
  const [resident, setResident] = useState({});

  const colorStatusAlive = {
    backgroundColor: 'green',
  };

  const colorStatusDead = {
    backgroundColor: 'red',
  };

  const colorStatusUnknown = {
    backgroundColor: 'gray',
  };

  useEffect(() => {
    axios.get(residentUrl).then(res => setResident(res.data));
  }, []);

  return (
    <div className="resident-info">
      <div className="resident-info-cover">
        <img
          className="cover-img"
          src={resident?.image}
          alt="Character image"
        />
        <div className="cover-status">
          <span
            className="status-color"
            style={
              resident?.status === 'Alive'
                ? colorStatusAlive
                : resident?.status === 'Dead'
                ? colorStatusDead
                : colorStatusUnknown
            }
          ></span>
          {resident?.status}
        </div>
      </div>
      <div className="resident-info-data">
        <div className="data-title">
          <h2 className="heading-secondary">{resident?.name}</h2>
        </div>
        <div className="data-box data--species">
          <h4 className="heading-quaternary">Species</h4>
          <p>{resident?.species}</p>
        </div>
        <div className="data-box data--origin">
          <h4 className="heading-quaternary">Origin</h4>
          <p>{resident.origin?.name}</p>
        </div>
        <div className="data-box data-episodes">
          <h4 className="heading-quaternary">Episodes</h4>
          <p>{resident.episode?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ResidentInfo;
