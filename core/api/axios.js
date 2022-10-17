import axios from "axios";

const API = "http://apis.data.go.kr/B551011/GoCamping";
const essentialParams = process.env.SERVICE_KEY;

const filtering = (target) => target?.data?.response?.body?.items?.item;
const filteringUrl = (target) =>
  target?.data?.response?.body?.items?.item?.map(({ imageUrl }) => imageUrl);

const getBasedList = async (pageNo = 1) => {
  const unFilteredData = await axios.get(
    `/api/basedList?${essentialParams}&pageNo=${pageNo}`
  );
  const filteredData = filtering(unFilteredData);
  return filteredData;
};

const getLocationBasedList = async (
  pageNo = 1,
  { mapX = 127, mapY = 37, radius = 1000 }
) => {
  const unFilteredData = await axios.get(
    `/api/locationBasedList?${essentialParams}&pageNo=${pageNo}&mapX=${mapX}&mapY=${mapY}&radius=${radius}`
  );
  const filteredData = filtering(unFilteredData);
  return filteredData !== undefined ? filteredData : [];
};

const getSearchList = async (pageNo = 1, keyword = "화성") => {
  const unFilteredData = await axios.get(
    `/api/searchList?${essentialParams}&pageNo=${pageNo}&keyword=${keyword}`
  );

  const filteredData = filtering(unFilteredData);
  return filteredData !== undefined ? filteredData : [];
};

const getImageList = async (pageNo = 1, contentId = 3429) => {
  const unFilteredData = await axios.get(
    `/api/imageList?${essentialParams}&pageNo=${pageNo}&contentId=${contentId}`
  );
  const filteredData = filteringUrl(unFilteredData) || [];
  return filteredData;
};

const getServerSideSearchList = async (pageNo = 1, keyword = "화성") => {
  const unFilteredData = await axios.get(
    `http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/searchList?${essentialParams}&pageNo=${pageNo}&keyword=${encodeURI(
      keyword
    )}`
  );
  const filteredData = filtering(unFilteredData);
  return filteredData !== undefined ? filteredData : [];
};

const getServerSideImageList = async (pageNo = 1, contentId = 3429) => {
  const unFilteredData = await axios.get(
    `http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/imageList?${essentialParams}&pageNo=${pageNo}&contentId=${contentId}`
  );
  const filteredData = filteringUrl(unFilteredData) || [];
  return filteredData;
};

export {
  getBasedList,
  getLocationBasedList,
  getSearchList,
  getImageList,
  getServerSideSearchList,
  getServerSideImageList,
};
