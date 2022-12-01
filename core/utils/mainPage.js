const returnTitle = (titleTag, searchKey = "") => {
  const titleCase = {
    gps: "주변 캠핑장 목록",
    nogps: "캠핑장 목록",
    searchKey: `검색 결과 : ${searchKey}`,
  };
  return "🏕️ " + titleCase[titleTag];
};

function getLocation(setData, gpsCheck) {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setData({
          lati: position.coords.latitude,
          long: position.coords.longitude,
        });
        gpsCheck.current = true;
      },
      function (error) {
        gpsCheck.current = true;
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다");
  }
}

export { returnTitle, getLocation };
