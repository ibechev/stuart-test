import { useState } from 'react';

import JobCreator from "./components/JobCreator";
import Map from './components/Map';

import "./App.css";

// pick up address: 29 Rue du 4 Septembre
// drop off address: 15 Rue de Bourgogne

const App = () => {
    const [ pickUpGeoCode, setPickUpGeoCode ] = useState(null);
    const [ dropOffGeoCode, setDropOffGeoCode ] = useState(null);

    const handlePickUpGeoCodeChange = (geoCode) => {
        setPickUpGeoCode(geoCode);
    };

    const handleDropOffGeoCodeChange = (geoCode) => {
        setDropOffGeoCode(geoCode);
    };
    
    return (
        <div className="app">
            <Map 
                pickUpGeoCode={ pickUpGeoCode }
                dropOffGeoCode={ dropOffGeoCode }
            />
            <div className='job-creator-positioner'>
              <JobCreator 
                  onPickUpGeoCodeChange={ handlePickUpGeoCodeChange }
                  onDropOffGeoCodeChange={ handleDropOffGeoCodeChange }
              />
            </div>
        </div>
    );
};

export default App;


