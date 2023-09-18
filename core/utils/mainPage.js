const returnTitle = (titleTag, searchKey = '') => {
  const titleCase = {
    gps: '주변 캠핑장 목록',
    nogps: '캠핑장 목록',
    searchKey: `검색 결과 : ${searchKey}`,
  }
  return '🏕️ ' + titleCase[titleTag]
}

function getLocation(setData) {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      // GPS 허용
      function (position) {
        setData((data) => ({
          ...data,
          lati: position.coords.latitude,
          long: position.coords.longitude,
          isGpsCheck: true,
        }))
      },
      // GPS 차단
      function (error) {
        setData((data) => ({
          ...data,
          isGpsCheck: true,
        }))
        console.error(error)
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    )
  } else {
    alert('GPS를 지원하지 않습니다')
  }
}

export { returnTitle, getLocation }
