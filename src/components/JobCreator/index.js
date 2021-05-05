import { useState, useEffect, useCallback } from 'react';
import { getGeoCode, createJob } from '../../services/location';
import useToast from '../../hooks/useToast';
import debounce from 'lodash/debounce';

import InputWithIcon from '../InputWithIcon';

import './index.css';

import pickUpBadgeBlank from '../../assets/images/pickUpBadgeBlank.svg';
import dropOffBadgeBlank from '../../assets/images/dropOffBadgeBlank.svg';
import pickUpBadgePresent from '../../assets/images/pickUpBadgePresent.svg';
import dropOffBadgePresent from '../../assets/images/dropOffBadgePresent.svg';
import pickUpBadgeError from '../../assets/images/pickUpBadgeError.svg';
import dropOffBadgeError from '../../assets/images/dropOffBadgeError.svg';

const blank = 'blank';
const present = 'present';
const error = 'error';

const getPickUpBadgeIcon = (status) => {
    switch(status) {
        case blank:
            return pickUpBadgeBlank;
        case present: 
            return pickUpBadgePresent;
        case error: 
            return pickUpBadgeError;
        default: 
            return pickUpBadgeBlank;
    }
};

const getDropOffBadgeIcon = (status) => {
    switch(status) {
        case blank:
            return dropOffBadgeBlank;
        case present: 
            return dropOffBadgePresent;
        case error: 
            return dropOffBadgeError;
        default: 
            return dropOffBadgeBlank;
    }
};

const locationDefault = { geoCode: null, status: blank, address: '' }

const JobCreator = ({ onPickUpGeoCodeChange, onDropOffGeoCodeChange }) => {
    const addToast = useToast();
    const [ pickUp, setPickUp ] = useState(locationDefault);
    const [ dropOff, setDropOff ] = useState(locationDefault);
    const [ isCreatingJob, setIsCreatingJob ] = useState(false);
    
    const handleCreate = async () => {
        setIsCreatingJob(true);
        
        await createJob(pickUp.address, dropOff.address);

        addToast({ text: 'Job has been created successfully!' });
        setIsCreatingJob(false);
        setPickUp(locationDefault);
        setDropOff(locationDefault);
    };

    const processAddress = async (value, locationSetter) => {
        if (!value) {
            locationSetter(oldValue => ({ ...oldValue, geoCode: null, status: blank }));
            
            return;
        }

        const { code, latitude, longitude, address } = await getGeoCode(value);

        if (code === 'GEOCODE_ERROR') {
            locationSetter(oldValue => ({ ...oldValue, geoCode: null, status: error }));

            return;
        }

        locationSetter({ 
            geoCode: { latitude, longitude },
            status: present,
            address
        });
    }

    const handlePickUpAddressBlur = (e) => {
        const { value } = e.target;

        if (value === pickUp.address) {
            return;
        }
        
        processAddress(value, setPickUp);
    };

    const handleDropOffAddressBlur = (e) => {
        const { value } = e.target;

        if (value === dropOff.address) {
            return;
        }

        processAddress(value, setDropOff);
    };

    const handleChange = useCallback(debounce((value, location, locationSetter) => {
        if (value === location.address) {
            return;
        }

        processAddress(value, locationSetter);
    }, 1000), []);

    const handlePickUpAddressChange = (e) => {
        const { value } = e.target;
        
        setPickUp(oldValue => ({
            ...oldValue, 
            address: value
        }));

        handleChange(value, pickUp, setPickUp);
    };

    const handleDropOffAddressChange = (e) => {
        const { value } = e.target;
        
        setDropOff(oldValue => ({
            ...oldValue, 
            address: value
        }));

        handleChange(value, dropOff, setDropOff); 
    };

    useEffect(() => {
        onPickUpGeoCodeChange(pickUp.geoCode);
    }, [pickUp.geoCode]);

    useEffect(() => {
        onDropOffGeoCodeChange(dropOff.geoCode);
    }, [dropOff.geoCode]);

    const isButtonDisabled = !(pickUp.status === present && dropOff.status === present) || isCreatingJob;
    const buttonText = isCreatingJob ? 'Creating...' : 'Create job';

	return (
		<div className='job-creator-container'>
			<InputWithIcon 
                value={ pickUp.address }
                onChange={ handlePickUpAddressChange }
                onBlur={ handlePickUpAddressBlur }
                icon={ getPickUpBadgeIcon(pickUp.status) } 
                placeholder='Pick up address' 
            />
			<InputWithIcon 
                value={ dropOff.address }
                onChange={ handleDropOffAddressChange }
                onBlur={ handleDropOffAddressBlur }
                icon={ getDropOffBadgeIcon(dropOff.status) } 
                placeholder='Drop off address' 
            />

            <button 
                onClick={ handleCreate } 
                type='button'
                disabled={ isButtonDisabled }
            >{ buttonText }</button>
		</div>
	);
}; 

JobCreator.defaultProps = {
    onCreate: () => {}, 
    onPickUpAddressPresent: () => {}, 
    onDropOffAddressPresent: () => {}
};

export default JobCreator;


