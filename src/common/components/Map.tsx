/* global kakao */
import React, { useEffect } from "react";


declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const container = document.getElementById('myMap');
        console.log(window.kakao);
        console.log(position.coords.latitude, position.coords.longitude)
        const options = {
          center: new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
        console.log(position.coords.latitude)

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커를 지도 위에 표시
        marker.setMap(map);
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }

  }, []);

  return (
    <div id='myMap' style={{
      width: '100%', height: '200px'
    }}> </div>
  );
};

export default Map;

