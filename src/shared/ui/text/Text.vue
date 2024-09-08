<template>
  <div class="text">
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'text'
  }
})
</script>
<style>
@import 'Text.scss';
</style>