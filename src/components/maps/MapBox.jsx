import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { set_polygon_props, set_polygon } from '../../store/actions/agent';
import concaveman from 'concaveman';
import { useMatch, useLocation } from 'react-router-dom';
import * as turf from "@turf/turf";

const MapBox = ({ options, retr_options, properties, set_polygon_props, set_polygon, userPolygon, isClientView, isListMode, handleOpenModal }) => {
  const [mapOptions, setMapOptions] = useState();
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const location = useLocation();
  const isListMatch = useMatch('/dashboard/lists');
  const isClientListMatch = useMatch('/list/:uuid');
  const isSearchMatch = useMatch('/dashboard/search');

  useEffect(() => {
    if (isListMatch) {
      setMapOptions(options);
    } else if (isClientListMatch) {
      setMapOptions(retr_options);
    } else if (isSearchMatch) {
      setMapOptions(properties);
    } else {
      setMapOptions([]);
    }
  }, [isClientListMatch, isListMatch, isSearchMatch, options, retr_options, properties]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.REACT_APP_YOUR_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: { lng: -95.36527442209143, lat: 29.76066296068062 },
      zoom: 8,
      scrollZoom: false,
      dragPan: true,
    });

    mapRef.current = map;

    const draw = new MapboxDraw({
      controls: {
        point: false,
        line_string: true,
        polygon: false,
        trash: true,
        combine_features: false,
        uncombine_features: false
      },
    });

    if ((isSearchMatch)) {
      map.addControl(draw, 'top-right');
    }

    map.on('load', () => {
      if (mapOptions && mapOptions.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();

        mapOptions.forEach(option => {
          if (!option.longitude || !option.latitude) return;

          const popupContent = document.createElement('div');

          if (isSearchMatch) {
            const button = document.createElement('button');
            button.textContent = option.name;
            button.className = 'text-black px-3 py-2 text-blue-600'
            button.onclick = () => handleOpenModal(option);
            popupContent.appendChild(button);
          }

          if (isClientListMatch) {
            popupContent.className = 'flex flex-col items-center'
            const img = document.createElement('img');
            img.src = option.prop_image;
            img.alt = option.prop_name;
            const text = document.createElement('h4');
            text.textContent = option.prop_name;
            const link = document.createElement('a');
            link.textContent = 'Directions';
            link.href = `https://www.google.com/maps/search/?q=${option.prop_name}`
            link.target = "_blank"
            link.rel = "noopener noreferrer"
            img.className = 'h-[100px] rounded-md'
            popupContent.appendChild(img)
            popupContent.appendChild(text)
            popupContent.appendChild(link)
          }


          const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);

          const marker = new mapboxgl.Marker({ color: "#90B8F8" })
            .setLngLat([parseFloat(option.longitude), parseFloat(option.latitude)])
            .setPopup(popup)
            .addTo(map);

          bounds.extend([parseFloat(option.longitude), parseFloat(option.latitude)]);
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, {
            padding: 70,
            maxZoom: 15,
            duration: 1000,
          });
        }
      }
    });

    map.on('draw.create', (e) => {
      const feature = e.features[0];

      if (feature.geometry.type === 'LineString') {
        const coords = feature.geometry.coordinates;

        if (coords.length && coords[0].toString() !== coords[coords.length - 1].toString()) {
          coords.push(coords[0]);
        }

        const polygonFeature = {
          id: feature.id + '-polygon',
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [coords]
          }
        };


        if ((isSearchMatch || isListMatch)) {
          draw.delete(feature.id);
          draw.add(polygonFeature);
        }



        const rawPoints = coords.map(([lng, lat]) => [lng, lat]);
        const polyCoords = concaveman(rawPoints);
        const newPolygon = turf.polygon([polyCoords]);

        if (newPolygon) {
          set_polygon(newPolygon);
        }

        const filteredProps = properties.filter((prop) => {
          const pt = turf.point([prop.longitude, prop.latitude]);
          return turf.booleanPointInPolygon(pt, newPolygon);
        });

        if (filteredProps) {
          set_polygon_props(filteredProps);
        }
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapOptions, isListMatch, isSearchMatch]);

  return (
    <div
      ref={mapContainerRef}
      className={`rounded-md shadow-md 
        ${isClientListMatch && 'h-[24rem] w-[24rem] md:h-[33rem] md:w-[33rem]'}
        ${isListMatch && 'h-[24rem] w-[24rem]'}
        ${isSearchMatch && 'h-[42rem] w-[28rem] md:h-full md:w-full'}
      `}
    ></div>
  );
};

const mapStateToProps = state => ({
  isClientView: state.ui.isClientView,
  isListMode: state.ui.isListMode,
  userPolygon: state.agent.userPolygon
});

export default connect(mapStateToProps, { set_polygon_props, set_polygon })(MapBox);