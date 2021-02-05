<template>
<div><Nav/>
    <section class="hero is-link">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ feed.title }}
          </h1>
          <h2 class="subtitle ">
            <strong>Partida:</strong> {{ feed.partida }}
            <br>
            <strong>Destino:</strong> {{ feed.destino }}
          </h2>
        </div>
      </div>
    </section>
    <section class="event-content">
      <div class="container">
        <p class="is-size-4 description">{{ feed.desc}}</p>
        <div class="event-images columns is-multiline has-text-centered">
          <div class="column is-one-third">
            <img :src="feed.img">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Nav from '../components/partials/Nav';
import FeedService from '../services/FeedService'
export default {
  name: 'FeedView',
  components: {
    Nav
  },
   data() {
    return {
      feed: {}
    }
  },
  created() {
    this.getFeedData(); 
  },
 
  methods: {
    async getFeedData() {
      FeedService.getFeed(this.$route.params.id)
      .then(
        (feed => {
          feed.data.forEach(element => {
            var path = "../../"+element.img;
            element.img = path.replace(/\\/g, "/");     
          });
          console.log(feed);
          this.$set(this, "feed", feed.data);
        }).bind(this)
      );
    }
  }
}
</script>