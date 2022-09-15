const returnTitle = (titleTag, searchKey = "") => {
  const titleCase = {
    gps: "주변 캠핑장 목록",
    nogps: "캠핑장 목록",
    searchKey: `검색 결과 : ${searchKey}`,
  };
  return "🏕️ " + titleCase[titleTag];
};

function getLocation(setData) {
  let pos = {};
  let p = 1000;
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function (position, p) {
        setData({
          lati: position.coords.latitude,
          long: position.coords.longitude,
        });
        pos.lati = position.coords.latitude;
        pos.long = position.coords.longitude;
      },
      function (error) {
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
  console.log(pos, "??");
  return pos;
}

export { returnTitle, getLocation };
