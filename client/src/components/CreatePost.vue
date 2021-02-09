<template>
  <div v-if="myModel">
    <transition name="model">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div class="left"><h4 class="modal-title">Criar Post</h4></div>
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
                          <label for="title">Title</label>
                          <input
                            required
                            v-model="post.title"
                            type="text"
                            class="form-control"
                            id="title"
                            name="title"
                          />
                        </div>
                        <div class="row">
                          <div class="col form-group">
                            <label for="partida">Partida</label>
                            <place-autocomplete-field
                              required
                              v-model="post.partida"
                              placeholder="Enter starter location"
                              name="partida"
                              api-key="AIzaSyDThTVxOOn3GXlVb_5YyNJ2AUg3V0OoGRc"
                              @autocomplete-select="
                                PartidaaddressAutocompleteSearch
                              "
                            ></place-autocomplete-field>
                          </div>
                          <div class="col form-group">
                            <label for="destino">Destino</label>
                            <place-autocomplete-field
                              required
                              v-model="post.destino"
                              placeholder="Enter destiny location"
                              name="destino"
                              api-key="AIzaSyDThTVxOOn3GXlVb_5YyNJ2AUg3V0OoGRc"
                              @autocomplete-select="
                                DestinyaddressAutocompleteSearch
                              "
                            ></place-autocomplete-field>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="desc">Description</label>
                          <textarea
                            required
                            v-model="post.desc"
                            type="text"
                            class="form-control"
                            id="desc"
                            name="desc"
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
                            required
                            name="date"
                          />
                          <div id="datep"></div>
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
                    <button class="btn btn-success" @click="newData">
                      Reset
                    </button>
                  </div>
                  <br />
                  <button @click="save" class="btn btn-dark btn-lg">
                    Submit
                  </button>
                  <b-alert
                    :show="dismissCountDown"
                    dismissible
                    variant="warning"
                    @dismissed="dismissCountDown = 0"
                    @dismiss-count-down="countDownChanged"
                  >
                    <p>Por favor preencha todos os campos</p>
                  </b-alert>
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
import FeedService from "../services/FeedService";
export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        title: "",
        desc: "",
        date: "",
        partida: "",
        destino: "",
        pLat: "",
        pLong: "",
        dLat: "",
        dLong: "",
        img: "",
      },
      myModel: false,
      submitted: false,
      image: null,
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
    DestinyaddressAutocompleteSearch(place, address) {
      this.post.dLat = address.geometry.location.lat();
      this.post.dLong = address.geometry.location.lng();
    },
    PartidaaddressAutocompleteSearch(place, address) {
      this.post.pLat = address.geometry.location.lat();
      this.post.pLong = address.geometry.location.lng();
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
      if (
        this.post.titlle == "" ||
        this.post.partida == "" ||
        this.post.destino == "" ||
        this.post.date == "" ||
        this.post.img == ""
      ) {
        this.showAlert();
      } else {
        var data = {
          id_user: this.$route.params.id,
          title: this.post.title,
          desc: this.post.desc,
          date: this.post.date,
          partida: this.post.partida,
          destino: this.post.destino,
          pLat: this.post.pLat,
          pLong: this.post.pLong,
          dLat: this.post.dLat,
          dLong: this.post.dLong,
          img: this.post.img,
        };
        console.log(data);
        FeedService.insertPost(data)
          .then((res) => {
            this.submitted = true;
            data = {};
            this.$router.go();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    newData() {
      this.submitted = false;
      this.post = {};
      this.post.img = "";
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