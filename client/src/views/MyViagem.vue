<template>
  <div class="home">
    <Nav />
    <MyList />
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
