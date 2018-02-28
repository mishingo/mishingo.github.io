<template>
  <transition appear name="v--mask">
    <div v-once class="blog__footer ptl-s">
      <router-link to="/" class="h3 purple-text text-darken-2"><i class="material-icons h2">navigate_before</i>Return</router-link>
    </div>
  </transition>
</template>

<script>
export default { name: 'blog-footer' }
</script>
