<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let size = 'md';
  export let variant = 'default';
  export let glass = 'medium';
  export let interactive = false;
  export let liquid = false;
  export let animated = false;
  export let padding = 'md';
  export let margin = 'none';
  export let rounded = 'md';
  export let shadow = 'md';
  export let overflow = 'visible';
  export let position = 'static';
  export let zIndex = undefined;
  export let className = '';

  const dispatch = createEventDispatcher();

  $: containerClasses = [
    'gh-container',
    `gh-container-${size}`,
    variant !== 'default' ? `gh-container-${variant}` : '',
    `gh-glass-${glass}`,
    interactive ? 'gh-container-interactive' : '',
    liquid ? 'gh-container-liquid' : '',
    animated ? 'gh-container-animated' : '',
    padding !== 'none' ? `gh-p-${padding}` : '',
    margin !== 'none' ? `gh-m-${margin}` : '',
    rounded !== 'none' ? `gh-rounded-${rounded}` : '',
    shadow !== 'none' ? `gh-shadow-${shadow}` : '',
    overflow !== 'visible' ? `gh-overflow-${overflow}` : '',
    position !== 'static' ? `gh-position-${position}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  $: containerStyle = {
    ...(zIndex !== undefined && { zIndex }),
  };

  function handleClick() {
    dispatch('click');
  }

  function handleMouseEnter() {
    dispatch('mouseenter');
  }

  function handleMouseLeave() {
    dispatch('mouseleave');
  }
</script>

<div
  class={containerClasses}
  style={containerStyle}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:keydown
  role="button"
  tabindex={interactive ? 0 : undefined}
>
  <slot />
</div>

<style>
  @import './Container.css';
</style>
