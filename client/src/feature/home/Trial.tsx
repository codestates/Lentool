import { useAppDispatch } from "app/hooks";
import Loading from "feature/indicator/Loading";
import { useEffect } from "react";
import { useTrialMutation } from "services/api";
import notFound from "../../images/undraw_traveling_re_weve.svg";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Test() {
  const [trial, { data, isLoading, isSuccess }] = useTrialMutation();
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("data", data);

  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };
    let lat = 0;
    let lon = 0;
    const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude; // 위도
        lon = position.coords.longitude; // 경도

        const imageSrc = "https://i.ibb.co/GFBFKGG/location-back.png"; // 마커이미지의 주소입니다
        const imageSize = new window.kakao.maps.Size(60, 60); // 마커이미지의 크기입니다
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        const locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: locPosition,
          image: markerImage, // 마커이미지 설정
        });

        const geocoder = new window.kakao.maps.services.Geocoder();

        const coord = new window.kakao.maps.LatLng(lat, lon);
        const callback = function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const addressInfo = {
              latitude: lat,
              longitude: lon,
              address: result[0].address.address_name,
            };
            const getGeo = async function () {
              await trial(addressInfo);
            };
            getGeo();
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        map.setCenter(locPosition);
        marker.setMap(map);
      });
    } else {
      alert("위치정보확인 동의하셔야 체험하기 이용이 가능합니다");
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const message = "geolocation을 사용할수 없어요..";
    }
    function setDraggable(draggable: boolean) {
      map.setDraggable(draggable);
    }
    function setZoomable(zoomable: boolean) {
      map.setZoomable(zoomable);
    }
    // setDraggable(false);
    setZoomable(false);
  }, []);

  return (
    <div className="flex flex-col">
      <p className="text-zinc-700 font-semibold	pb-8 text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-left leading-snug">
        우리 동네에서는?
      </p>
      <div className="grid sm:grid md:grid lg:flex xl:flex 2xl:flex items-center rounded-xl px-8 py-12 shadow-[0_10px_30px_5px_rgba(0,0,0,0.2)]">
        <div
          id="map"
          className="rounded-xl mx-4 flex-1"
          style={{ width: "26rem", height: "26rem" /*  margin: "4rem"  */ }}
        />
        <div className="my-auto mx-4 mt-8 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0 2xl:mt-0 flex-1">
          {!data ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-[26rem] h-[26rem]">
              {data.data.posts.length !== 0 ? (
                data.data.posts.map((trial: any) => {
                  return (
                    <div key={trial.id} className="rounded-2xl max-w-sm ">
                      <div className="relative rounded-xl xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={`http://localhost:80${trial.photo1}`}
                          alt="my-posting"
                          className="h-[9rem] mx-auto my-auto rounded-xl object-center object-cover"
                        />
                      </div>
                      <h3 className="mt-2 text-left text-sm font-medium text-gray-900">
                        {trial.title}
                      </h3>
                      <h3 className="text-left text-xs text-gray-700">
                        {trial.address.slice(0, 15)}
                      </h3>
                    </div>
                  );
                })
              ) : (
                <div className="">
                  <div className="w-[26rem] h-[26rem] relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={notFound}
                      alt="my-posting"
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
