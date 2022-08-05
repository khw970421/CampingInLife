export default returnTitle = (titleTag, searchKey = "") => {
  const titleCase = {
    gps: "주변 캠핑장",
    nogps: "캠핑장 목록",
  };
  return "🏕️ " + searchKey + titleCase[titleTag];
};
