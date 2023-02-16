import React, { useEffect, useState } from "react";

const GoogleMaps = ({ locations }) => {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const API_KEY = "AIzaSyDeuRXgxN_xmpt9FaGZr9dzragrOelXbV0";
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      });
      setMap(map);
    };

    return () => {
      window.initMap = null;
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    // Remove previous markers
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = locations
      .filter((location, index) => index === selectedLocationIndex)
      .map((location) => {
        const { lat, lng, timestamp } = location;
        const position = { lat, lng };

        const marker = new window.google.maps.Marker({
          position,
          map,
          title: timestamp.toDate().toLocaleString(),
        });
        map.setCenter(position);
        map.setZoom(15);
        const infowindow = new window.google.maps.InfoWindow({
          content: `<div class="info-window">${timestamp
            .toDate()
            .toLocaleString()}</div>`,
        });

        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });

        return marker;
      });

    setMarkers(newMarkers);
  }, [map, selectedLocationIndex, locations]);

  const handleButtonClick = (index) => {
    setSelectedLocationIndex(index);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }} />
      <table>
        <tbody>
          {locations
            .slice()
            .reverse()
            .map((location, index) => (
              <tr key={location.timestamp}>
                <td>{location.timestamp.toDate().toLocaleString()}</td>
                <td>
                  <button className="btn btn-warning" style={{
                    padding:"5px",
                    margin: "5px 0 10px 10px"
                  }} onClick={() => handleButtonClick(index)}>
                    Show Marker
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoogleMaps;