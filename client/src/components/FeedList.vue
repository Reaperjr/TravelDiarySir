<template>
  <div class="events container">
    <div id="header">
      <h2 class="subtitle is-3">Check out our upcoming events</h2>
    </div>
    <div class="columns is-multiline">
      <div
        v-for="feed in feeds"
        :feed="feed"
        :key="feed.id_viagens"
        class="column is-half"
      >
        <router-link :to="'/feed/' + feed.id_viagens">
          <FeedCard :feed="feed" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import FeedCard from "@/components/FeedCard";
import FeedService from "../services/FeedService";
export default {
  name: "FeedList",
  components: {
    FeedCard,
  },
  data() {
    return {
      feed: {},
      feeds: [],
    };
  },
  created() {
    this.getFeedsData();
  },
  methods: {
    async getFeedsData() {
      FeedService.getAllFeed()
      .then(
        (feeds => {
          this.$set(this, "feeds", feeds);
        }).bind(this)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.events {
  margin-top: 100px;
  text-align: center;
}
.header {
  position: fixed;
  top: 0;
}
</style>

