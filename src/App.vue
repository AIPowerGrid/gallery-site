<template>
  <div class="dark" id="app">
    <!-- <component :is="layout"> -->
    <transition name="fade">
      <router-view />
    </transition>
    <!-- </component> -->
  </div>
</template>

<script>
// import "@/assets/css/app.css";
import { v4 as uuidv4 } from 'uuid';

export default {
  methods: {
    setupSession() {
      let sessionID = localStorage.getItem('sessionID')
      if (sessionID && sessionID.includes('-')) {
        console.log(`session already exists..`, sessionID)
      } else {
        let id = uuidv4()
        localStorage.setItem('sessionID', id)
        console.log(`created session ID`, id)
      }
    }
  },
  created() {
    this.setupSession()
  }

};
</script>
<style>
#app {
  font-family: Inter, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
