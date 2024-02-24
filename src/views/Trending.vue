<template>
  <div class="text-white">
    <navbar />
    <div class="home">
      <p class="text-2xl">Trending</p>
      <p class="mt-4">Coming soon</p>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Navbar },
  name: "collections",
  data() {
    return {};
  },
};
</script>
<style scoped lang="postcss">
.home {
  @apply mt-12;
  @apply flex flex-col items-center justify-center;
}
</style>