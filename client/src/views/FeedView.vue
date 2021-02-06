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
      <div>
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/partials/Nav";
import FeedService from "../services/FeedService";
export default {
  name: "FeedView",
  components: {
    Nav,
  },
  data() {
    return {
      feed: {},
      mapConfig: {
        center: this.mapCenter,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      },
    };
  },
  created() {
    this.getFeedData();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), this.mapConfig)
    },
    async getFeedData() {
      FeedService.getFeed(this.$route.params.id_viagens).then(
        ((feed) => {
          this.$set(this, "feed", feed.data[0]);
        }).bind(this)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
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