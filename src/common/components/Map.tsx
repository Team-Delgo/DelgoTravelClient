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
      navigator.geolocation.getCurrentPosition(function () {
        const container = document.getElementById('myMap');
        const options = {
          center: new window.kakao.maps.LatLng(37.54856592, 127.07315088),
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(37.54856592, 127.07315088)

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
      width: '100%', height: '250px'
    }}> </div>
  );
};

export default Map;

