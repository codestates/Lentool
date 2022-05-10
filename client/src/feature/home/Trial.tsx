import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { useTrialMutation } from "services/api";
import Trialifno from "./Trialinfo";
import { getTrial } from "./trialSlice";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Test() {
  const dispatch = useAppDispatch();
  const [trial, {isLoading}] = useTrialMutation();

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
    var lat = 0;
    var lon = 0;
    var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude; // 위도
        lon = position.coords.longitude; // 경도
        
        var imageSrc = 'https://i.ibb.co/GFBFKGG/location-back.png', // 마커이미지의 주소입니다    
            imageSize = new window.kakao.maps.Size(60, 60), // 마커이미지의 크기입니다
            imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        // console.log(lat, lon)
        var marker = new window.kakao.maps.Marker({
          position: locPosition,
          image: markerImage // 마커이미지 설정 
        });
        map.setCenter(locPosition);
        marker.setMap(map)

        var geocoder = new window.kakao.maps.services.Geocoder();

        var coord = new window.kakao.maps.LatLng(lat, lon);
        var callback = function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // console.log(result[0].address.address_name);
            const addressInfo = {
              latitude: lat,
              longitude: lon,
              address: result[0].address.address_name,
            };
            const getGeo = async function () {
              const geo = await trial(addressInfo);
              dispatch(getTrial(geo));
            };
            getGeo();
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        // 마커와 인포윈도우를 표시합니다
        // displayMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";
      // displayMarker(locPosition);
    }
    function setDraggable(draggable: boolean) {
      // 마우스 드래그로 지도 이동 가능여부를 설정합니다
      map.setDraggable(draggable);    
    }
    function setZoomable(zoomable: boolean) {
      // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
      map.setZoomable(zoomable);    
  }
    setDraggable(false);
    setZoomable(false)

  }, []);

  return (
    <div>
      <p className="text-zinc-700 font-semibold	pb-8 text-5xl text-left leading-snug">
        우리 동네에서는?
      </p>
      <div className="flex rounded-xl px-8 py-12 shadow-[0_10px_30px_5px_rgba(0,0,0,0.2)]">
        <div
          id="map"
          className="rounded-xl mx-8 flex-1"
          style={{ width: "35rem", margin: "4rem"}}
        />
        <div className="my-auto mx-8 flex-1">
          {/* {
            !isLoading &&
            <Trialifno />
          } */}
        </div>
      </div>      
    </div>
  );
}
