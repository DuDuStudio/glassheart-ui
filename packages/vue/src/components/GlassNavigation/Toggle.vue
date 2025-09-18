<template>
  <button
    :class="toggleClasses"
    @click="handleClick"
    aria-label="Toggle navigation menu"
  >
    <span class="gh-navigation-toggle-line"></span>
    <span class="gh-navigation-toggle-line"></span>
    <span class="gh-navigation-toggle-line"></span>
  </button>
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

const toggleClasses = computed(() => {
  const baseClasses = 'gh-navigation-toggle';
  const openClasses = navigationContext.isOpen.value ? 'gh-navigation-toggle-open' : '';
  return `${baseClasses} ${openClasses} ${props.className}`.trim();
});

const handleClick = () => {
  navigationContext.toggle();
};
</script>
