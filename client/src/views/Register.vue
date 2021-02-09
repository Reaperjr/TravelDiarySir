<template>
  <div class="vertical-center">
    <div class="inner-block">
      <h3>Preencha o formulário</h3>

      <div class="form-group">
        <label>Nome</label>
        <input
          v-model="nome"
          type="text"
          class="form-control form-control-lg"
          id="nome"
          required
          name="nome"
        />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control form-control-lg"
          id="email"
          required
          name="email"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg"
          id="password"
          required
          name="password"
        />
      </div>

      <div class="form-group">
        <label>Data Nascimento</label>
        <input
          v-model="data_nasc"
          type="date"
          class="form-control form-control-lg"
          id="data_nasc"
          required
          name="data_nasc"
        />
      </div>
      <button
        type="button"
        @click="register"
        class="btn btn-dark btn-lg btn-block"
      >
        Registar
      </button>
      <p class="login text-right mt-2 mb-4">
        <router-link to="/login">Login</router-link>
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
      nome: "",
      email: "",
      password: "",
      data_nasc: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    register() {
      var data = {
        name: this.nome,
        email: this.email,
        password: this.password,
        data_nasc: this.data_nasc,
      };
      AuthService.register(data).then((res) => {
        console.log(res.data.status);
        if(res.data.status==false){
          this.message = res.data.message;
          this.showAlert();
        }
        else{
          this.$router.push({ path: "/login" });
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
.login,
.login a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.login a {
  color: #2554ff;
}
</style>