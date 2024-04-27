import React, { useEffect } from "react";
import { motion } from "framer-motion";
const MapComponent = ({ latitude = 39.90923, longitude = 116.397428 }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=1.4.15&key=503d198627df12e5ad81e15c1764f2f2&callback=initAMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initAMap = () => {
      const map = new window.AMap.Map("mapContainer", {
        // lang: "en",
        zoomEnable: false,
        zoom: 10,
        center: [longitude, latitude],
        mapStyle: "amap://styles/grey",
      });

      new window.AMap.Marker({
        position: [longitude, latitude],
        map: map,
      });
    };

    return () => {
      if (window.AMap) {
        window.AMap = undefined;
      }
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return (
    <div
      id="mapContainer"
      style={{ width: "100%", height: "500px" }}
      className="rounded-12"
    ></div>
  );
};

export default MapComponent;
