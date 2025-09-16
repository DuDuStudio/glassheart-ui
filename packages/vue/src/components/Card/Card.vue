<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  variant: {
    type: String,
    default: 'default'
  },
  liquid: {
    type: Boolean,
    default: false
  },
  interactive: {
    type: Boolean,
    default: false
  }
});

const cardClasses = computed(() => {
  const classes = ['gh-card'];
  
  if (props.size) {
    classes.push(`gh-card-${props.size}`);
  }
  
  if (props.variant) {
    classes.push(`gh-card-${props.variant}`);
  }
  
  if (props.liquid) {
    classes.push('gh-liquid-flow');
  }
  
  if (props.interactive) {
    classes.push('gh-interactive');
  }

  return classes;
});
</script>
