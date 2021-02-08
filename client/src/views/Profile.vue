<template>
  <div>
    <Nav :id="this.$route.params.id" />
    <modal :id="this.$route.params.id" ref="modalComponent" />
    <div class="container emp-profile">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <img :src="image" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5>{{ user.nome }}</h5>
            <h6>{{ user.pais }}</h6>
            <h7>{{ user.data_nasc }}</h7>
            <p class="profile-email">
              EMAIL: <span>{{ user.email }}</span>
            </p>
          </div>
        </div>
        <div class="col-md-2">
          <input
            @click="clickItem"
            type="button"
            class="profile-edit-btn"
            name="btnAddMore"
            value="Editar Perfil"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modal from "../components/EditProfile"
import UserService from "../services/UserService";
import Nav from "../components/partials/Nav";
export default {
  name: "Profile",
  components: {
    Nav,
    modal,
  },
  data() {
    return {
      user: {},
      image: "",
    };
  },
  mounted() {
    if (this.$store.getters.getToken == "") this.$router.push("/login");
     this.getUserData();
  },
  methods: {
    clickItem: function () {
      this.$refs.modalComponent.show();
    },
    async getUserData() {
      UserService.getUserData(this.$route.params.id).then(
        ((user) => {
          this.image =
            "http://localhost:3000/api/user/image/" + user.data[0].img;
          this.$set(this, "user", user.data[0]);
        }).bind(this)
      );
    },
    handleImage(e) {
      const selectedImage = e.target.files[0]; // get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.user.img = this.image;
      };
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>
<style scoped>
body {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}
.emp-profile {
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 0.5rem;
  background: #fff;
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 70%;
  height: 100%;
}
.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}
.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #0062cc;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 70%;
  padding: 2%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}
.profile-email {
  font-size: 12px;
  color: #818182;
  margin-top: 5%;
}
.profile-email span {
  color: #495057;
  font-size: 15px;
  font-weight: 600;
}
.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}
</style>
