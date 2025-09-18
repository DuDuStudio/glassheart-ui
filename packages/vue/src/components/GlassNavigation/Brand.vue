<template>
  <a
    v-if="href"
    :href="href"
    :class="brandClasses"
    @click="handleClick"
  >
    <slot />
  </a>
  <div
    v-else
    :class="brandClasses"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  href: {
    type: String,
    default: undefined
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const brandClasses = computed(() => {
  return `gh-navigation-brand ${props.className}`.trim();
});

const handleClick = () => {
  emit('click');
};
</script>
