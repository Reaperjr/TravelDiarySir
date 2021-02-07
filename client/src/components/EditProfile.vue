<template>
  <div v-if="myModel">
    <transition name="model">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div class="left">
                  <h4 class="modal-title">Editar Perfil</h4>
                </div>
                <button type="button" class="close" @click="myModel = false">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div style="padding: 10px 10px" class="submit-form">
                  <div v-if="!submitted">
                    <section class="hero">
                      <div class="container">
                        <div class="form-group">
                          <label for="nome">Nome</label>
                          <input
                            v-model="post.nome"
                            type="text"
                            class="form-control"
                            id="nome"
                            name="nome"
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input
                            v-model="post.email"
                            type="text"
                            class="form-control"
                            id="email"
                            name="email"
                          />
                        </div>
                        <div class="form-group">
                          <label for="password">Password</label>
                          <textarea
                            v-model="post.password"
                            type="password"
                            class="form-control"
                            id="password"
                            name="password"
                          />
                        </div>
                        <div class="form-group">
                          <label for="date">Date</label>
                          <input
                            @change="checkDOB"
                            v-model="post.date"
                            type="date"
                            class="form-control"
                            id="date"
                            name="date"
                          />
                          <div id="datep"></div>
                        </div>
                        <div class="form-group">
                          <label for="pais">País</label>
                          <input
                            v-model="post.pais"
                            type="text"
                            class="form-control"
                            id="nome"
                            name="nome"
                          />
                        </div>
                        <div class="card bg-white">
                          <img :src="image" />
                          <input
                            @change="handleImage"
                            class="custom-input"
                            type="file"
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </section>
                    <div class="container"></div>
                  </div>
                  <div v-else>
                    <h4>You submitted successfully!</h4>
                  </div>
                  <br />
                  <button @click="save" class="btn btn-dark btn-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import UserService from "../services/UserService";
export default {
  name: "EditProfile",
  data() {
    return {
      post: {
        nome: "",
        email: "",
        date: "",
        pais: "",
        password: "",
        img: "",
      },
      myModel: false,
      submitted: false,
      image: null,
    };
  },
  methods: {
    create() {
      console.log(id);
    },
    checkDOB() {
      var dateString = document.getElementById("date").value;
      var myDate = new Date(dateString);
      var today = new Date();
      if (myDate > today) {
        $("#datep").after("<p>You cannot enter a date in the future!.</p>");
        return false;
      }
      return true;
    },
    save() {
      var data = {
        id_user: this.$route.params.id,
        nome: this.post.nome,
        password: this.post.password,
        date: this.post.date,
        email: this.post.email,
        pais: this.post.pais,
        img: this.post.img,
      };
      console.log(data);
      UserService.EditUser(this.$route.params.id,data)
        .then(() => {
          this.submitted = true;
          data = {};
          this.myModel = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    show() {
      this.myModel = true;
    },
    handleImage(e) {
      const selectedImage = e.target.files[0]; // get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
        this.post.img = this.image;
        console.log(this.post.img);
      };
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>


<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>