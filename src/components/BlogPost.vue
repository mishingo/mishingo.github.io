<template>
  <transition name="post">
    <article v-if="post" class="post">
      <header class="post__header">
        <blockquote class="post__subtitle">{{ description }}</blockquote>
      </header>
      <section class="post__body rte" v-html="content"></section>
      <blog-footer/>
    </article>
  </transition>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../helpers'
import BlogFooter from './BlogFooter'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { VueDisqus, BlogFooter },
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      commentsReady: false
    }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;

      this.commentsReady = false
      this.$getResource('post', to)
        .then(this.showComments)
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showComments() {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    }
  },

  beforeMount() {
    if (!this.post) return;
    this.$getResource('post', this.post)
      .then(this.showComments)
  }
}
</script>
