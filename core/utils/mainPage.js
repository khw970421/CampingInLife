const returnTitle = (titleTag, searchKey = "") => {
  const titleCase = {
    gps: "주변 캠핑장 목록",
    nogps: "캠핑장 목록",
    searchKey: `검색 결과 : ${searchKey}`,
  };
  return "🏕️ " + titleCase[titleTag];
};

export default returnTitle;
