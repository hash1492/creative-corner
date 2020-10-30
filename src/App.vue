<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Handlee|Merienda&display=swap" rel="stylesheet">
    <shell></shell>
  </div>
</template>

<script>
import Shell from './components/Shell.vue'
export default {
  name: 'app',
  components: {
    Shell
  },
  metaInfo: {
    title: 'Mansi Creative Corner',
    meta: [
      { name: 'description', content: 'Beautiful handmade jewellery like necklaces, bangles, earrings and more!' },
      { property: 'og:title', content: 'Mansi Creative Corner' },
      { property: 'og:description', content: 'Beautiful handmade jewellery like necklaces, bangles, earrings and more!' },
      { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/creative-corner-8ced8.appspot.com/o/default.png?alt=media&token=0188b1b4-e2d2-4e0b-8b5e-5a903843caab' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '600' },
      { property: 'og:image:height', content: '600' },
      { property: 'og:url', content: 'https://www.mansicreativecorner.com' },
      { property: 'og:type', content: 'content' }
    ],
    link: [
      { rel: 'shortcut icon', href: 'favicon.ico', type:'image/x-icon' },
    ]
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
ul {
  margin: 0;
}
</style>
