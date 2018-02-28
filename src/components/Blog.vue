<template>
  <main :class="{ 'blog--reading': this.post }" style="padding: 4em;">
    <div class="row center-align pbm-s">
      <div class="h2"><span class="border-thick">Blog</span></div>
    </div>
    <blog-feed :filters="filters"/>
    <blog-post :post="post"/>
  </main>
</template>

<script>
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'

export default {
  name: 'blog',
  components: { BlogFeed, BlogPost },
  resource: 'Blog',
  props: {
    post: String,
    author: String
  },

  data() {
    return {
      navs: 0,
      title: '',
      labels: {
        post: '',
        author: ''
      }
    }
  },

  computed: {
    content() {
      return { title: this.title, labels: this.labels }
    },
    filters() {
      let filters = {}

      if (this.post) filters.post = this.post
      if (this.author) filters.author = this.author

      return filters
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },

  beforeMount() {
    this.$getResource('blog')
  }
}
</script>
