import { useEffect, useRef, useCallback } from 'react';

import './index.css';

import pickUpMarkerIcon from '../../assets/images/pickUpMarker.svg';
import dropOffMarkerIcon from '../../assets/images/dropOffMarker.svg';

const handleGeoCodeUpdate = (geoCode, markerRef, mapRef, markerIcon) => {
    if (!geoCode) {
        markerRef.current && markerRef.current.setMap(null);

        return;
    }

    markerRef.current = new window.google.maps.Marker({
        position: new  window.google.maps.LatLng(geoCode.latitude, geoCode.longitude),
        icon: markerIcon,
    });
    markerRef.current.setMap(mapRef.current);
};

const initializeMap = (mapRef, elementRef) => {
    mapRef.current = new window.google.maps.Map(elementRef.current, {
        center: new window.google.maps.LatLng(48.8627013, 2.3181559),
        zoom: 15.3,
        zoomControl: false,
        fullscreenControl: false,
    });
};

const Map = ({ pickUpGeoCode, dropOffGeoCode }) => {
    const mapRef = useRef(null);
    const divRef = useRef(null);
    const pickUpMarkerRef = useRef(null);
    const dropOffMarkerRef = useRef(null);

    useEffect(() => {
        initializeMap(mapRef, divRef);
    }, []);

    useEffect(() => {
        handleGeoCodeUpdate(pickUpGeoCode, pickUpMarkerRef, mapRef, pickUpMarkerIcon);
    }, [pickUpGeoCode]);

    useEffect(() => {
        handleGeoCodeUpdate(dropOffGeoCode, dropOffMarkerRef, mapRef, dropOffMarkerIcon);
    }, [dropOffGeoCode]);
    
    return (<div ref={ divRef } className='map' />);
};

export default Map;

