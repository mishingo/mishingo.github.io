<template>
  <transition-group tag="ul" :name="transition"  class="blog__feed">
    <div v-for="post in feed" class="row" :key="post.id">
      <div class="mtm-s mbm-s">
        <router-link :to="`/read/${post.id}`" @click.native="scrollTo(0, 220, scrollDelay)">
          <div class="post-img" :style="getBgImg(post.image)">
          </div>
        </router-link>
        <div class="row mtm-s">
          <router-link class="row title-font h2 black-text"
              :to="`/read/${post.id}`"
              @click.native="scrollTo(0, 220, scrollDelay)">
              {{ post.title }}
          </router-link>
          <time class="row preview__published">
            {{ prettyDate(post.published) }}
          </time>
          <!-- <router-link class="preview__author"
            :to="`/by/${kebabify(post.author)}`"
            @click.native="scrollTo(0, 220, scrollDelay)">
            {{ post.author }}
          </router-link> -->
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../helpers'

export default {
  name: 'blog-feed',
  resource: 'BlogFeed',

  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      posts: [],
      transition: 'preview-appear'
    }
  },

  computed: {
    reading() { return this.filters.post },
    scrollDelay() { return (this.$device.phone) ? 0 : 560 },
    figureClass() {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },
    feed() {
      const filterBy = {
        post: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabify(author)
      }

      if (!Object.keys(this.filters).length) return this.posts

      return this.posts.filter(post => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], post)
        })
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,
    getBgImg(src) {
      return { backgroundImage: `url(${src})` }
    },
    stackPosts(posts) {
      let interval
      const stack = () => {
        this.posts.push(posts.shift())

        if (!posts.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    }
  },

  beforeMount() {
    this.$getResource('feed')
      .then(posts => {
        if (!Object.keys(this.filters).length) {
          this.stackPosts(posts)
        } else {
          this.posts = posts
          this.transition = 'preview'
        }
      })
  }
}
</script>
