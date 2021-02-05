import http from "./http-common";

export default {
  async getAllFeed() {
    let res = await http.get("/feed/");
    return res.data
    
  },
  async getFeed(id) {
    let res = await http.get("/feed/" + id);
    return res.data;
  },
  async getFeedUser(id) {
    let res = await http.get("/feed/" + id);
    return res.data;
  },
  async insertPost(data) {
    let res = await http.post("/feed/insert/",data);
    return res.data;
  },
  async DeletePost(id) {
    let res = await http.delete("/feed/delete/" + id);
    return res.data;
  }
}