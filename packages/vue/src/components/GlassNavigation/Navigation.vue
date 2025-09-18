<template>
  <nav
    :class="navigationClasses"
    :style="navigationStyle"
  >
    <div class="gh-navigation-container">
      <slot />
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, provide } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'transparent', 'solid', 'floating'].includes(value)
  },
  glass: {
    type: String,
    default: 'medium',
    validator: (value) => ['light', 'medium', 'heavy'].includes(value)
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  sticky: {
    type: Boolean,
    default: false
  },
  fixed: {
    type: Boolean,
    default: false
  },
  liquid: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  },
  blur: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  rounded: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  zIndex: {
    type: Number,
    default: undefined
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['toggle', 'itemClick']);

const isOpen = ref(false);
const isScrolled = ref(false);

const navigationClasses = computed(() => {
  const baseClasses = 'gh-navigation';
  const variantClasses = `gh-navigation-${props.variant}`;
  const glassClasses = `gh-glass-${props.glass}`;
  const positionClasses = `gh-navigation-${props.position}`;
  const sizeClasses = `gh-navigation-${props.size}`;
  const stickyClasses = props.sticky ? 'gh-navigation-sticky' : '';
  const fixedClasses = props.fixed ? 'gh-navigation-fixed' : '';
  const liquidClasses = props.liquid ? 'gh-navigation-liquid' : '';
  const animatedClasses = props.animated ? 'gh-navigation-animated' : '';
  const blurClasses = props.blur ? 'gh-navigation-blur' : '';
  const shadowClasses = props.shadow !== 'none' ? `gh-shadow-${props.shadow}` : '';
  const paddingClasses = props.padding !== 'none' ? `gh-p-${props.padding}` : '';
  const roundedClasses = props.rounded !== 'none' ? `gh-rounded-${props.rounded}` : '';
  const scrolledClasses = isScrolled.value ? 'gh-navigation-scrolled' : '';

  return [
    baseClasses,
    variantClasses,
    glassClasses,
    positionClasses,
    sizeClasses,
    stickyClasses,
    fixedClasses,
    liquidClasses,
    animatedClasses,
    blurClasses,
    shadowClasses,
    paddingClasses,
    roundedClasses,
    scrolledClasses,
    props.className,
  ]
    .filter(Boolean)
    .join(' ');
});

const navigationStyle = computed(() => {
  const style = {};
  if (props.zIndex !== undefined) {
    style.zIndex = props.zIndex;
  }
  return style;
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  if (props.sticky || props.fixed) {
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (props.sticky || props.fixed) {
    window.removeEventListener('scroll', handleScroll);
  }
});

const toggle = () => {
  isOpen.value = !isOpen.value;
  emit('toggle', isOpen.value);
};

const itemClick = (item, index) => {
  emit('itemClick', item, index);
  isOpen.value = false;
};

// Provide to child components
provide('navigationContext', {
  isOpen,
  toggle,
  itemClick
});
</script>
