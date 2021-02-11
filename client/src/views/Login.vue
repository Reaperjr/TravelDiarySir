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
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{message}}</p>
    </b-alert>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
export default {
  data() {
    return {
      message:"",
      id: "",
      email: "",
      password: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  mounted() {
    var id = localStorage.getItem("id");
    if (this.$store.getters.getToken != "")
      this.$router.push({ path: `feed/${id}` });
  },
  methods: {
     countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async login() {
      var data = {
        email: this.email,
        password: this.password,
      };
      AuthService.login(data).then((res) => {
         if(res.status==false){
          this.message = res.message;
          this.showAlert();
        }else{
        localStorage.setItem("id", res.data[0].id_user);
        this.$store.dispatch("login", res.data.token);
        this.$router.push({ path: `feed/${res.data[0].id_user}` });
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