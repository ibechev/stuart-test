const baseUrl = 'https://stuart-frontend-challenge.now.sh';

export const getGeoCode = async (address = '') => {
    if (!address) {
        return;
    }

    const body = { address };

    const response = await fetch(`${baseUrl}/geocode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const result = await response.json();

    return result;
};

export const createJob = async (pickupAddress = '', dropOffAddress = '') => {
    if (!(pickupAddress && dropOffAddress)){
        return;
    }
    
    const body = { pickup: pickupAddress, dropoff: dropOffAddress };

    const response = await fetch(`${baseUrl}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const result = await response.json();

    console.log(`result`, result)
    
    return result;
};