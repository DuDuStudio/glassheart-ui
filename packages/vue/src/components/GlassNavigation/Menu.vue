<template>
  <div :class="menuClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
});

const navigationContext = inject('navigationContext', {
  isOpen: ref(false),
  toggle: () => {},
  itemClick: () => {}
});

const menuClasses = computed(() => {
  const baseClasses = 'gh-navigation-menu';
  const openClasses = navigationContext.isOpen.value ? 'gh-navigation-menu-open' : '';
  return `${baseClasses} ${openClasses} ${props.className}`.trim();
});
</script>
