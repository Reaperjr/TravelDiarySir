<template>
  <div class="events container">
    <div class="search">
      <input class="form-control" type="text" v-model="search" placeholder="Search" aria-label="Search"/>
    </div>
    <div id="header">
      <img src="../assets/logotipo_and_name.png" />
    </div>
    <div class="columns is-multiline">
      <div
        v-for="feed in filteredList"
        :feed="feed"
        :key="feed.id_viagens"
        class="column is-half"
      >
        <router-link :to="`/feed/${id}/view/${feed.id_viagens}`">
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
  props: ["id"],
  data() {
    return {
      search: "",
      feed: {},
      feeds: [],
    };
  },
  created() {
    this.getFeedsData();
  },
  computed: {
    filteredList() {
      return this.feeds.filter(feed => {
        return feed.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    async getFeedsData() {
      FeedService.getAllFeed().then(
        ((feeds) => {
          this.$set(this, "feeds", feeds.data);
        }).bind(this)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  height: 15%;
  width: 15%;
}
.events {
  margin-top: 100px;
  text-align: center;
}
.header {
  position: fixed;
  top: 0;
}
</style>

