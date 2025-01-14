import axios from "axios";

const fetcher = async (url) => {
  const items = await axios.get(url);
  return items.data;
};

export default fetcher;
