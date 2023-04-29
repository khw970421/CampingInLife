import axios from "axios";
import getURL from "./url.js";
let result;
export default async function handler(req, res) {
  const { query } = req;
  const queryStr = Object.entries(query)
    .map(([key, value]) => `&${key}=${encodeURI(value)}`)
    .join(""); 
  try {
    result = await axios.get(`${getURL("searchList")}${queryStr}`);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
