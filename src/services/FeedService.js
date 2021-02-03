import axios from "axios"

export default {
  async getAllFeed() {
    let res = await axios.get("http://localhost:8000/feeds");
    return res.data;
  },
  async getFeed(id) {
    let res = await axios.get("http://localhost:8000/feed/" + id);
    return res.data;
  },
  async getFeedUser(id) {
    let res = await axios.get("http://localhost:8000/events/" + id);
    return res.data;
  },
  async insertPost(id,data) {
    let res = await axios.get("http://localhost:8000/insert/" + id,data);
    return res.data;
  }
}