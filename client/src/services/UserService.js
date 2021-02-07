import http from "./http-common";

export default {
  async getUserData(id) {
    let res = await http.get("/user/"+ id);
    return res.data   
  },
  async EditUser(id,data) {
    let res = await http.post("/user/" + id,data);
    return res.data;
  },
  async DeleteUser(id) {
    let res = await http.delete("/user/" + id);
    return res.data;
  }
}