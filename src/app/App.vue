<template>
  <component :is="layout">
    <template v-slot:header>
      <Header />
    </template>

    <template v-slot:default>
      <router-view />
    </template>

    <template v-slot:footer>
      <Footer />
    </template>
  </component>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '/src/widgets/header/ui/Header.vue'
import Footer from '/src/shared/ui/footer/Footer.vue'
import DefaultLayout from '/src/shared/ui/layouts/DefaultLayout.vue'
import {computed} from "vue";

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<style>
@import 'index.scss';
</style>