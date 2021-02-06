<template>
  <div class="home">
    <Nav :id="this.$route.params.id" />
    <MyList :id="this.$route.params.id"/>
  </div>
</template>
<script>
import Nav from '../components/partials/Nav';
import MyList from '../components/MyList'
export default {
  name: 'MyTrips',
  components: {
    Nav,
    MyList
  },
}
</script>
