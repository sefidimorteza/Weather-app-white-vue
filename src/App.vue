<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primari">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <Transition>
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';


</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}
.page-enter-form,.page-leave-to {
  opacity: 0;
}
</style>