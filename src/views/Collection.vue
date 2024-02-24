<template>
  <div class="text-white">
    <navbar />
    <div class="home">
      <div class="collection-text">
        <p class="text-2xl font-medium">{{name}} Collection</p>
      </div>
      <div class="flex mt-7 flex-row justify-center">
        <div class="grid-items">
          <div :key="index" v-for="(item,index) in thecollection" name="fade">
            <Card @removeItem="removeItem" :item="item" class="vfor"></Card>
          </div>
          <!-- <div class="vfor" :key="index" v-for="(item,index) in thecollection">
            <img classs="img" with="12" height="12" :src="item.imageUrl" />

            <p class="prompt">{{item.prompt}}</p>
          </div>-->
        </div>
      </div>
      <!-- flex -->
    </div>
  </div>
</template>
<script>
import Card from "@/components/Cardy.vue";
import Navbar from "@/components/Navbar.vue";
import colService from "@/services/collection";
import genService from "@/services/generate";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default {
  components: { Navbar, Card },
  name: "collections",
  computed: {
    name() {
      let s = this.$route.params.name;
      if (!s) s = "undefined";
      return capitalizeFirstLetter(s);
    },
  },

  data() {
    return {
      thecollection: [],
      rmText: "Delete",
      collectionName: "default",
    };
  },
  async created() {
    let items = await colService.getCollection(this.collectionName);
    this.thecollection = items;
    if (false) {
      let fakeid = "f3a633bc-84a7-420a-871d-28d5c7d5574d";
      fakeid = "14313e2d-ad72-4059-ac4c-72d17fc812f0";
      let data = await genService.waitImage(fakeid);
      let imgUrl = `data:image/png;base64,${data.image}`;
      let f = JSON.parse(JSON.stringify(this.thecollection));
      f[0].imageData = imgUrl;
      this.thecollection = f;
    }
  },
  methods: {
    async removeItem(id) {
      console.log(`removing item ${id}`);
      try {
        let result = await colService.removeItem(this.collectionName, id);
        console.log(result);
        if (Array.isArray(result)) {
          this.thecollection = result;
        } else {
          console.log(`not array...`);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style scoped lang="postcss">
.home {
  @apply mt-14;
}
.collection-text {
  /* margin-left: 100px; */
  @apply flex flex-row justify-center;
}
.grid-items {
  @apply grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4;
}
.vfor {
  /* @apply rounded-lg px-12 py-12 font-medium;
  background-color: #111827; */
}
.prompt {
  @apply mt-3 font-bold;
}
</style>