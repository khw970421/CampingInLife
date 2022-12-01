import {getServerSideSearchList} from "@/core/api/axios";

let result;
export default async function handler(req, res) {
  const {pageNo, keyword} = req.query;
  try {
    result = await getServerSideSearchList(pageNo, keyword);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json({error: "failed to load data"});
  }
}
