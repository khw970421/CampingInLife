import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getLocationBasedList, getImageList } from "../../core/api/axios";

const content = () => {
  const router = useRouter();
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    locationBasedList(1, router.query.mapX, router.query.mapY);
  }, [router.isReady]);

  async function locationBasedList(pageNo = 1, mapX, mapY) {
    const data = await getLocationBasedList(pageNo, mapX, mapY, 1000);
    setContent(data[0]);
  }

  return (
    <>
      <div>About {router.query.id}</div>
      <div>{content.facltNm}</div>
    </>
  );
};

export default content;
