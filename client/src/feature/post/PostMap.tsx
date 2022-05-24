import { useEffect } from "react";
import './marker.css'

declare global {
  interface Window {
    kakao: any;
  }
}

export default function PostMap ({ address }: { address: string }) {
  useEffect(() => {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

    const map = new window.kakao.maps.Map(mapContainer, mapOption); 
    const imageSrc = "https://i.ibb.co/GFBFKGG/location-back.png"; // 마커이미지의 주소입니다
    const imageSize = new window.kakao.maps.Size(60, 60); // 마커이미지의 크기입니다
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function(result:any, status:any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new window.kakao.maps.Marker({
          image: markerImage,
          position: coords
        });

        const content = () => {
          const wrap = document.createElement('div');
          wrap.className = 'wrap';

          const header = document.createElement('div');
          header.className = 'header';
          header.textContent = '여기서 만나요!';

          const overlayHeader = document.createElement('div');
          overlayHeader.className = 'overlay-header';

          overlayHeader.appendChild(header);
          wrap.appendChild(overlayHeader);

          return wrap;
        }
        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          position: coords,
          content: content(),
        });
        marker.setMap(map)
        map.setCenter(coords);
      } 
    }, [])
  })
  return (
    <div
      id="map"
      className="rounded-xl"
      style={{ width: "100%", height: "20rem"}}
    />
  )
}