<template>
  <div class="text-white">
    <navbar />
    <div v-if="imageData">
      <img :src="`data:image/png;base64,${imageData}`" />
    </div>
    <div v-if="!showImage" class="home">
      <p class="text-2xl">Generate Image</p>
      <div v-if="!showImage" class="text-container">
        <label for="textarea-label" class="block text-sm font-medium mb-2 dark:text-white">Prompt</label>
        <textarea v-model="prompt" class="generate-input" rows="3" placeholder="A zebra at the zoo"></textarea>
        <label for="input-label" class="mt-4 block text-sm font-medium mb-2 dark:text-white">Seed</label>
        <input type="text" placeholder="seed" v-model="seed" class="seed-input" />
      </div>
      <div v-if="!showImage"></div>

      <button v-if="!showImage" @click="generate" class="generate-btn">{{btnText}}</button>
    </div>
    <transition name="fade">
      <div class="home-gen" v-if="showImage">
        <p class="text-2xl">Image Result</p>
        <img id="timg" class="mt-8" :src="imgUrl" />
        <button @click="showImage = false" id="prompt-btn" class="gen-again mt-4">Back to Prompt</button>
        <button @click="addToCollection" id="save-btn" class="save-btn mt-4">{{saveText}}</button>
      </div>
    </transition>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import genService from "@/services/generate";
import collection from "@/services/collection";
export default {
  components: { Navbar },
  name: "home",
  data() {
    return {
      prompt: null,
      resultData: {},
      seed: null,
      btnText: "Generate",
      imgUrl: null,
      showImage: false,
      imageData: null,
      fakeId: "8dc918cc-d630-48fa-9677-50ea8b171ea8",
      // fakeId: "f3a633bc-84a7-420a-871d-28d5c7d5574d",
      saveText: "Save to Collection",
    };
  },
  async created() {
    this.seed = Date.now();
    let fake = true;
    if (fake) {
      let fakeid = "f3a633bc-84a7-420a-871d-28d5c7d5574d";
      fakeid = "14313e2d-ad72-4059-ac4c-72d17fc812f0";
      (fakeid = "8dc918cc-d630-48fa-9677-50ea8b171ea8"),
        (this.resultData._id = fakeid);
      let data = await genService.waitImage(fakeid);
      this.imgUrl = `data:image/png;base64,${data.image}`;
      this.showImage = true;
    }
  },
  methods: {
    async addToCollection() {
      if (this.btnText.includes("Saved")) {
        this.btnText = "Already Saved";
      }
      let { _id } = this.resultData;
      let result = await collection.addToCollection("default", _id);
      if (result.success) {
        this.saveText = "Saved!";
      } else {
        this.saveText = "Error Saving";
        setTimeout(() => (this.saveText = "Save to Collection"), 1000);
      }
    },
    async generate() {
      let result = await genService.generate(this.prompt, this.seed);
      this.resultData = result;

      this.waitImage(this.resultData._id);
    },
    async waitImage(id) {
      console.log(`waiting image ${id}`);
      setTimeout(() => (this.btnText = "Waiting for Image..."), 100);
      let data = await genService.waitImage(id);
      console.log(`this.wait done`);
      // this.btnText = "Done generating."

      setTimeout(() => {
        this.imgUrl = `data:image/png;base64,${data.image}`;
        // this.imgUrl = genService.imageURL(id)
        this.showImage = true;
      }, 20);
    },
  },
};
</script>
<style scoped lang="postcss">
@import "@/assets/css/generate.pcss";
</style>