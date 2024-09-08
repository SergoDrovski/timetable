<template>
  <div class="test">
    <slot name="header"></slot>

    <main>
      <slot />
    </main>

    <slot name="footer"></slot>
  </div>
</template>