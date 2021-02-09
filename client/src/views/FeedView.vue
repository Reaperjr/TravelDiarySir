<template>
  <div>
    <Nav :id="this.$route.params.id" />
    <div class="feed">
      <section class="hero is-link">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ feed.title }}
            </h1>
            <h2 class="subtitle"><strong>Date:</strong> {{ feed.date }}</h2>
          </div>
          <div v-if="this.$route.params.id == id" class="right">
            <button type="button" @click="delet" class="btn btn-dark">
              Delete
            </button>
          </div>
        </div>
      </section>
      <section class="event-content">
        <div class="container">
          <p class="is-size-5"><strong>Partida:</strong> {{ feed.partida }}</p>
          <p class="is-size-5"><strong>Destino:</strong> {{ feed.destino }}</p>
          <br />
          <p class="is-size-4 description">{{ feed.desc }}</p>
          <div class="feed-image columns is-multiline has-text-centered">
            <div class="column is-one-third">
              <img :src="`http://localhost:3000/api/image/${feed.img}`" />
            </div>
          </div>
        </div>
      </section>
      <div class="map d-flex justify-content-center">
        <GmapMap
          :zoom="10"
          :center="{ lat: 10, lng: 10 }"
          style="width: 50%; height: 400px"
        >
          <Directions
            travelMode="DRIVING"
            :origin="origin"
            :destination="destination"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/partials/Nav";
import FeedService from "../services/FeedService";
import Directions from "../components/Directions";
export default {
  name: "FeedView",
  components: {
    Nav,
    Directions,
  },
  data() {
    return {
      partida: "",
      destino: "",
      id: "",
      id_viagens: "",
      feed: {},
    };
  },
  beforeMount() {
    if (this.$store.getters.getToken == "") this.$router.push("/login");
    this.getFeedData();
  },
  computed: {
    origin() {
      if (!this.partida) return null;
      return { query: this.partida };
    },
    destination() {
      if (!this.destino) return null;
      return { query: this.destino };
    },
  },
  methods: {
    delet() {
      console.log(this.id_viagens)
      FeedService.DeletePost(this.id_viagens).then(() => {
        this.$router.push({ name: 'Home', params: { id: this.id} });
      });
    },
    async getFeedData() {
      FeedService.getFeed(this.$route.params.id_viagens).then(
        ((feed) => {
          this.id = feed.data[0].id_user;
          this.id_viagens = feed.data[0].id_viagens;
          this.partida = feed.data[0].partida;
          this.destino = feed.data[0].destino;
          this.$set(this, "feed", feed.data[0]);
        }).bind(this)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  margin-top: 30px;
  margin-bottom: 10px;
}
.feed {
  margin-top: 30px;
}
.hero {
  margin-bottom: 70px;
}
.feed-image {
  margin-top: 50px;
}
.description {
  margin-bottom: 30px;
}
#map {
  height: 75%;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 5px;
}
</style>