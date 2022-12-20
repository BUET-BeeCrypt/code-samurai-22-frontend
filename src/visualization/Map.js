import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Map({projects, project, setProject}) {
  const [map, setMap] = useState(null)

  const handleActiveMarker = (marker) => {
    if (project && marker.project_id === project.project_id) {
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({lat: marker.latitude, lng: marker.longitude});
    map.fitBounds(bounds);
    setProject(marker);
  };

  useEffect(() => {
    if (!map) return;
    const bounds = new window.google.maps.LatLngBounds();
    projects.forEach(({ latitude, longitude }) => bounds.extend({lat: latitude, lng: longitude}));
    map.fitBounds(bounds);
  }, [projects, map])

  const handleOnLoad = (map) => {
    setMap(map);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setProject(null)}
      mapContainerStyle={{ width: "100%", height: "100vh" }}
    >
      {projects.map(({ name,location,latitude,longitude,exec,cost,timespan,project_id,goal,start_date,completion,actual_cost }, index) => (
        <Marker
          position={{lat: latitude, lng: longitude}}
          onClick={() => handleActiveMarker(projects[index])}
        >
          {project && project.name === projects[index].name ? (
            <InfoWindow onCloseClick={() => setProject(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
