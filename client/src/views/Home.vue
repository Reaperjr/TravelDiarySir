<template>
  <div class="home">
    <Nav :id="this.$route.params.id" />
    <FeedList />
    <modal ref="modalComponent" />
    <vue-fab :mainBtnColor="mainBtnColor" :icon="icon" :size="size">
      <fab-item
        v-for="(item, idx) in items"
        v-bind:key="item.idx"
        :idx="idx"
        :title="item.title"
        :color="item.color"
        :icon="item.icon"
        @clickItem="clickItem"
      >
      </fab-item>
    </vue-fab>
  </div>
</template>
<script>
import modal from "../components/CreatePost";
import FeedList from "../components/FeedList";
import Nav from "../components/partials/Nav";
export default {
  name: "home",
  components: {
    FeedList,
    Nav,
    modal,
  },
  data() {
    return {
      post: {
        title: "",
        partida: "",
        destino: "",
        desc: "",
      },
      items: [
        {
          icon: "add",
          title: "Criar Post",
          color: "#ff9900",
        },
      ],
      icon: "add",
      mainBtnColor: "#3eaf7c",
      size: "big",
      modalOpen: false,
      submitted: false,
    };
  },
  methods: {
    clickItem: function () {
      this.$refs.modalComponent.show();
    },
  },
};
</script>


<style lang="scss" scoped>
template{
  background-color: aqua;
}
</style>

