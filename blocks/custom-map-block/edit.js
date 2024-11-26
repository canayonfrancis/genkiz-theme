/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress components for the sidebar controls.
 */
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

/**
 * Import React hooks.
 */
import { useState, useEffect } from 'react';

/**
 * Import Leaflet and styles.
 */
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Import the editor styles.
 */
import './editor.scss';

// Fix for missing default icon in Webpack environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom component to handle map panning
function MapPanner({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (!isNaN(lat) && !isNaN(lng)) {
            map.panTo([lat, lng]);
        }
    }, [lat, lng, map]);
    return null;
}

// GeoJSON data for Canada
const canadaGeoJSON = {
	type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { name: "Canada", area: "9.98 million km²" },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-141.0, 60.0],
                    [-83.0, 60.0],
                    [-60.0, 54.0],
                    [-60.0, 42.0],
                    [-67.0, 41.0],
                    [-141.0, 41.0],
                    [-141.0, 60.0]
                ]]
            }
        }
    ]
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { latitude, longitude, zoom, selectedCountry } = attributes;

    const updateLatitude = (newVal) => setAttributes({ latitude: newVal || '51.505' });
    const updateLongitude = (newVal) => setAttributes({ longitude: newVal || '-0.09' });
    const updateZoom = (newVal) => setAttributes({ zoom: parseInt(newVal) || 13 });
    const updateSelectedCountry = (country) => setAttributes({ selectedCountry: country });

    const [mapCenter, setMapCenter] = useState([latitude || 51.505, longitude || -0.09]);

    // Effect to update the map center whenever latitude or longitude changes
    useEffect(() => {
        const newLat = parseFloat(latitude);
        const newLng = parseFloat(longitude);
        if (!isNaN(newLat) && !isNaN(newLng)) {
            setMapCenter([newLat, newLng]);
        }
    }, [latitude, longitude]);

    // Effect to highlight the selected country
    const selectedCountryFeature = selectedCountry === 'Canada' ? canadaGeoJSON.features[0] : null;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Map Settings', 'blocks/custom-map-block')}>
                    <TextControl
                        label={__('Latitude', 'blocks/custom-map-block')}
                        value={latitude}
                        type="number"
                        onChange={updateLatitude}
                    />
                    <TextControl
                        label={__('Longitude', 'blocks/custom-map-block')}
                        value={longitude}
                        type="number"
                        onChange={updateLongitude}
                    />
                    <TextControl
                        label={__('Zoom Level', 'blocks/custom-map-block')}
                        type="number"
                        value={zoom}
                        onChange={updateZoom}
                    />
                    <SelectControl
                        label={__('Select Country', 'blocks/custom-map-block')}
                        value={selectedCountry}
                        options={[
                            { label: __('Select a country', 'blocks/custom-map-block'), value: '' },
                            { label: 'Canada', value: 'Canada' },
                            // Add more countries as needed
                        ]}
                        onChange={updateSelectedCountry}
                    />
                </PanelBody>
            </InspectorControls>
            <div { ...useBlockProps() }>
                <MapContainer
                    center={mapCenter}
                    dragging={false}
                    zoom={zoom || 13}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={mapCenter}>
                        <Popup>
                            {__('Map Location', 'blocks/custom-map-block')}
                        </Popup>
                    </Marker>
                    <MapPanner lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
                    {selectedCountryFeature && (
                        <GeoJSON
                            data={selectedCountryFeature}
                            style={{
                                color: 'blue',
                                weight: 2,
                                fillColor: 'blue',
                                fillOpacity: 0.5,
                            }}
                        />
                    )}
                </MapContainer>
            </div>
        </>
    );
}
