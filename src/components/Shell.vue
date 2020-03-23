<template>
  <div class="shell-component">
      <app-header></app-header>
      <div class="shell">
          <router-view :key="$route.fullPath"></router-view>
      </div>
      <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

  export default {
    name: 'shell',
    components: {
        AppHeader,
        AppFooter
    }
  }
</script>

<style scoped lang="scss">
.shell-component {
  min-height: 100%;
  position: absolute;
  width: 100%;

  .shell {
    margin-bottom: 200px;
  }
}
</style>
