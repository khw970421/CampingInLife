import axios from "axios";
let result;
export default async function handler(req, res) {
  const { query } = req;
  const queryStr = Object.entries(query)
    .map(([key, value]) => `&${key}=${value}`)
    .join("");
  try {
    result = await axios.get(
      `http://apis.data.go.kr/B551011/GoCamping/locationBasedList?MobileOS=WIN&MobileApp=AppTest&_type=json&serviceKey=u%2BXsTVV1nl13bsl5mxFNCaZ0o48loSbVj4pQoNm2xFONwLswAgYcNrabZ9jBp7mIdKQZSgYV7NBAjOyHH6cr%2Fg%3D%3D${queryStr}`
    );
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
