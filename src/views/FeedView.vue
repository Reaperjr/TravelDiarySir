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
          <div v-for="image in feed.images" :key="image.id" class="column is-one-third">
            <img :src="image" :alt="feed.name">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Nav from '../components/partials/Nav';
export default {
  name: 'FeedView',
  components: {
    Nav
  },
  data () {
    return {
      feeds: [
        {
          id: 1,
          name: 'Charity Ball',
          category: 'Fundraising',
          description: 'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
          featuredImage: 'https://placekitten.com/500/500',
          images: [
            'https://placekitten.com/500/500',
            'https://placekitten.com/500/500',
            'https://placekitten.com/500/500',
          ],
          location: '1234 Fancy Ave',
          date: '12-25-2019',
          time: '11:30'
        },
        {
          id: 2,
          name: 'Rescue Center Goods Drive',
          category: 'Adoptions',
          description: 'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
          featuredImage: 'https://placekitten.com/500/500',
          images: [
            'https://placekitten.com/500/500'
          ],
          location: '1234 Dog Alley',
          date: '11-21-2019',
          time: '12:00'
        }
      ],
      feed: {}
    }    
  },
  created() {
    const ID = Number(this.$route.params.id);
    let feed = this.feeds.find(feed => feed.id === ID);
    this.feed = feed;
  }
}
</script>