<template>
<div class="navbar">
  <div class="left">
    <router-link :to="`/feed/${id}`" class="navbar-item">Home</router-link>
    <router-link :to="`/my-trips/${id}`" class="navbar-item">Minhas Viagens</router-link>
  </div>
    <div class="right">
        <div class="dropdown">
          <a  class="dropbtn">Dropdown</a>
           <div class="dropdown-content">
      <router-link :to="`/profile/${id}`">Profile</router-link>
      <a href="#">Logout</a>
    </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Nav',
    props: [
    'id'
  ],
    data(){
      return{
      }
    },
    methods:{
      created(){
        this.id = this.$route.params.id;
      }
    }
}
</script>
<style lang="scss" scoped>
  .navbar {
     background: white;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  height: 45px;
  background: white;
  z-index: 2;
  top: 0px;

  & a{
    font-size: 14px;
    
    margin-left: 7px;
    padding: 5px 12px;
    border-radius: 3px;
    display: inline-block;
  }

  & .left{
    display: inline-block;
    position: relative;
    top: 8px;
    left: 25px;
  }

  & .right {
    display: inline-block;
    position: relative;
    top: 8px;
    right: 3%;
  }

}

  .dropdown {
  display: inline-block;
}
  .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

