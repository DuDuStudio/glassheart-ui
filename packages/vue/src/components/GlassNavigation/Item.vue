<template>
  <a
    v-if="href && !disabled"
    :href="href"
    :class="itemClasses"
    @click="handleClick"
  >
    <span v-if="icon" class="gh-navigation-item-icon">{{ icon }}</span>
    <span class="gh-navigation-item-text">
      <slot />
    </span>
    <span v-if="badge" class="gh-navigation-item-badge">{{ badge }}</span>
  </a>
  <button
    v-else
    :class="itemClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="gh-navigation-item-icon">{{ icon }}</span>
    <span class="gh-navigation-item-text">
      <slot />
    </span>
    <span v-if="badge" class="gh-navigation-item-badge">{{ badge }}</span>
  </button>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  href: {
    type: String,
    default: undefined
  },
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: undefined
  },
  badge: {
    type: [String, Number],
    default: undefined
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const navigationContext = inject('navigationContext', {
  isOpen: ref(false),
  toggle: () => {},
  itemClick: () => {}
});

const itemClasses = computed(() => {
  const baseClasses = 'gh-navigation-item';
  const activeClasses = props.active ? 'gh-navigation-item-active' : '';
  const disabledClasses = props.disabled ? 'gh-navigation-item-disabled' : '';
  return `${baseClasses} ${activeClasses} ${disabledClasses} ${props.className}`.trim();
});

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
    navigationContext.itemClick(props.href || '', 0);
  }
};
</script>
