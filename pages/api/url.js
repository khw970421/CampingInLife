const url = `http://apis.data.go.kr/B551011/GoCamping`;
export default function getURL(props) {
  return `${url}/${props}?${process.env.SERVICE_KEY}&${process.env.SERVICE_TYPE}`;
}
