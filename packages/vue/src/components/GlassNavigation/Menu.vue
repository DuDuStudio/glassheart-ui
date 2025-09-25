<template>
  <div 
    :class="menuClasses"
    :data-hover-index="hoveredIndex"
    :data-deforming="isDeforming"
    :style="deformStyle"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, ref, provide, watch } from 'vue';

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

const hoveredIndex = ref(null);
const isDeforming = ref(false);
const deformParams = ref({
  width: 120,
  height: 40,
  radius: 30,
  opacity: 0.15
});

const menuClasses = computed(() => {
  const baseClasses = 'gh-navigation-menu';
  const openClasses = navigationContext.isOpen.value ? 'gh-navigation-menu-open' : '';
  return `${baseClasses} ${openClasses} ${props.className}`.trim();
});

const deformStyle = computed(() => ({
  '--deform-width': `${deformParams.value.width}px`,
  '--deform-height': `${deformParams.value.height}px`,
  '--deform-radius': `${deformParams.value.radius}px`,
  '--deform-opacity': deformParams.value.opacity.toString()
}));

const calculateDeformParams = (fromIndex, toIndex) => {
  if (fromIndex === null) return { width: 120, height: 40, radius: 30, opacity: 0.15 };
  
  const distance = Math.abs(toIndex - fromIndex);
  const maxDistance = 5; // Maximum distance for full deformation
  const intensity = Math.min(distance / maxDistance, 1);
  
  return {
    width: 120 + (intensity * 20), // Expand width by up to 20px
    height: 40 - (intensity * 5),  // Compress height by up to 5px
    radius: 30 - (intensity * 5),  // Reduce radius by up to 5px
    opacity: 0.15 + (intensity * 0.05) // Increase opacity slightly
  };
};

const handleMouseEnter = (index) => {
  const previousIndex = hoveredIndex.value;
  hoveredIndex.value = index;
  
  // Calculate deformation parameters
  const newParams = calculateDeformParams(previousIndex, index);
  deformParams.value = newParams;
  
  // Trigger deformation animation
  isDeforming.value = true;
  setTimeout(() => {
    isDeforming.value = false;
  }, 300);
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
  isDeforming.value = false;
  deformParams.value = { width: 120, height: 40, radius: 30, opacity: 0.15 };
};

// Provide hover handlers to child components
provide('menuHoverContext', {
  handleMouseEnter,
  handleMouseLeave
});
</script>
