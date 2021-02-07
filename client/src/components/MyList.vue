<template>
  <div class="events container">
    <div v-if="length == 0" id="header">
      <h2 class="center subtitle is-3">Não tem nenhumas viagens criadas</h2>
    </div>
    <div class="columns is-multiline">
      <div
        v-for="feed in feeds"
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
      length:"",
      feed: {},
      feeds: [],
    };
  },
  created() {
    this.getFeedsData();
  },
  methods: {
    async getFeedsData() {
      FeedService.getFeedUser(this.$route.params.id).then(
        ((feeds) => {
          this.length = feeds.data.length;
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

