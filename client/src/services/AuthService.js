import http from "./http-common";

/*export default {
    async login(data) {
        let res = await http.post("/auth/login", data);
        return res.data
    },
    async register(data) {
        let res = await http.post("/auth/register", data);
        return res.data
    }
}*/

export default {
    login:  async (data) => {
        let res = await http.post("/auth/login", data);
        return res.data
    },
    register: (data) => {
        return http.post("/auth/register", data);
    }
}