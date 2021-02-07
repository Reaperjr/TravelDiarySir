<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="submit-form">
        <div>
          <h3>Sign In</h3>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="text"
              class="form-control"
              id="email"
              required
              name="password"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              required
              name="password"
            />
          </div>
          <button @click="login" class="btn btn-dark btn-lg btn-block">
            Login
          </button>
        </div>
      </div>
      <p class="forgot-password text-leftt mt-2 mb-4">
        <router-link to="/register">Registar</router-link>
      </p>
      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Esqueci-me password</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      var data = {
        email: this.email,
        password: this.password,
      };
      console.log("inseide login method");
      AuthService.login(data).then((res) => {
        localStorage.setItem("jwt", res.data.token);
        if (localStorage.getItem("jwt") != null) {
          this.$emit("loggedIn");
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push({ path: `feed/${res.data[0].id_user}` });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.vertical-center {
  display: flex;
  align-items: center;
  margin: 0 auto;
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}

.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
}
</style>