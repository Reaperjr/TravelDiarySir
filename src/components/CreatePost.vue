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
                      <div class="hero-body">
                        <div class="container">
                          <div class="form-group">
                            <label for="title">Title</label>
                            <input
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
                                placeholder="Enter an an address, zipcode, or location"
                                name="partida"
                                api-key="AIzaSyDThTVxOOn3GXlVb_5YyNJ2AUg3V0OoGRc"
                              ></place-autocomplete-field>
                            </div>
                            <div class="col form-group">
                              <label for="destino">Destino</label>
                              <place-autocomplete-field
                                placeholder="Enter an an address, zipcode, or location"
                                name="destino"
                                api-key="AIzaSyDThTVxOOn3GXlVb_5YyNJ2AUg3V0OoGRc"
                              ></place-autocomplete-field>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="desc">Description</label>
                            <textarea
                              type="text"
                              class="form-control"
                              id="desc"
                              required
                              name="desc"
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
                      </div>
                    </section>
                    <div class="container"></div>
                  </div>
                  <div v-else>
                    <h4>You submitted successfully!</h4>
                    <button class="btn btn-success" @click="newData">Novo</button>
                  </div>
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
import FeedService from "../services/FeedService";
export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        title: "",
        desc: "",
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
    };
  },
  methods: {
    save() {
      var data = {
        title: this.post.title,
        desc: this.post.desc,
        partida: this.post.partida,
        destino: this.post.destino,
        pLat: this.post.pLat,
        pLong: this.post.pLong,
        dLat: this.post.dLat,
        dLong: this.post.dLong,
        
      };

      FeedService.insertPost(data)
        .then(() => {
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newData() {
      this.submitted = false;
      this.post = {};
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