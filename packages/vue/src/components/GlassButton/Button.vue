<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="$attrs"
  >
    <span v-if="loading" class="gh-loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'accent', 'destructive', 'outline', 'ghost', 'link'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  glass: {
    type: String,
    default: 'medium',
    validator: (value) => ['light', 'medium', 'heavy'].includes(value)
  },
  liquid: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  const classes = ['gh-button'];
  
  if (props.variant) {
    classes.push(`gh-button-${props.variant}`);
  }
  
  if (props.size) {
    classes.push(`gh-button-${props.size}`);
  }
  
  if (props.glass) {
    classes.push(`gh-glass-${props.glass}`);
  }
  
  if (props.liquid) {
    classes.push('gh-liquid-flow');
  }
  
  if (props.loading) {
    classes.push('gh-loading');
  }
  
  if (props.disabled) {
    classes.push('gh-disabled');
  }

  return classes;
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>
