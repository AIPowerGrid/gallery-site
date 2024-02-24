<template>
  <div>
    <div class="navbar">
      <div>
        <router-link to="/">
          <img class="cp" width="200" height="120" src="@/assets/img/aipgweblogo.png" />
        </router-link>
      </div>
      <div class="right-menu">
        <router-link to="/">
          <p :class="{'active': page == 'generate'}" class="cp">Generate</p>
        </router-link>
        <router-link to="/collections/default">
          <p class="cp" :class="{'active': page == 'collections'}">My Collections</p>
        </router-link>
        <router-link to="/trending">
          <p class="cp" :class="{'active': page == 'collections'}">Trending</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    page() {
      let { path } = this.$route;
      // lazily coded
      if (path == "/" || path == "/generate") {
        return "generate";
      } else if (path.includes('collection')) {
        return "collections";
      } else if (path == "/trending") {
        return "trending";
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.navbar {
  background-color: #111827;
  min-height: 70px;
  @apply flex flex-row;
  @apply items-center justify-between;
  @apply text-gray-200;
  @apply border-b border-gray-600;
  @apply sm:px-6;
  @apply lg:px-8;
  /* @apply px-48; */
}
.right-menu {
  @apply flex flex-row;
  @apply font-medium;
  @apply space-x-5;
  /* color: rgb(107 114 128/1); */
}
.active {
  @apply !font-bold;
  /* @apply underline; */
}
</style>