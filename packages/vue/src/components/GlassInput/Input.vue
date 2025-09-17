<template>
  <div :class="inputGroupClasses">
    <label v-if="label" :for="inputId" class="gh-input-label">{{ label }}</label>
    
    <div class="gh-input-wrapper">
      <div v-if="icon && iconPosition === 'left'" class="gh-input-icon-left">
        <slot name="icon">{{ icon }}</slot>
      </div>
      
      <input
        :id="inputId"
        :class="inputClasses"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
      />
      
      <div v-if="icon && iconPosition === 'right'" class="gh-input-icon-right">
        <slot name="icon">{{ icon }}</slot>
      </div>
      
      <div v-if="button" class="gh-input-button">
        <slot name="button">{{ button }}</slot>
      </div>
    </div>
    
    <div v-if="error" class="gh-input-error">{{ error }}</div>
    <div v-if="help && !error" class="gh-input-help">{{ help }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outline', 'solid'].includes(value)
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
  error: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object],
    default: null
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  button: {
    type: [String, Object],
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input']);

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);

const inputGroupClasses = computed(() => {
  const classes = ['gh-input-group'];
  
  if (props.size) {
    classes.push(`gh-input-group-${props.size}`);
  }
  
  if (props.error) {
    classes.push('gh-input-error-state');
  }
  
  return classes;
});

const inputClasses = computed(() => {
  const classes = ['gh-input'];
  
  if (props.size) {
    classes.push(`gh-input-${props.size}`);
  }
  
  if (props.variant) {
    classes.push(`gh-input-${props.variant}`);
  }
  
  if (props.glass) {
    classes.push(`gh-glass-${props.glass}`);
  }
  
  if (props.liquid) {
    classes.push('gh-liquid-flow');
  }
  
  if (props.error) {
    classes.push('gh-input-error');
  }
  
  if (props.disabled) {
    classes.push('gh-disabled');
  }

  return classes;
});

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
  emit('input', event);
};

const handleFocus = (event) => {
  emit('focus', event);
};

const handleBlur = (event) => {
  emit('blur', event);
};
</script>
