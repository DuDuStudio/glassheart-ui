<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let variant = 'default';
  export let glass = 'medium';
  export let position = 'top';
  export let size = 'md';
  export let sticky = false;
  export let fixed = false;
  export let liquid = false;
  export let animated = false;
  export let blur = true;
  export let shadow = 'md';
  export let padding = 'md';
  export let rounded = 'none';
  export let zIndex = undefined;
  export let className = '';

  const dispatch = createEventDispatcher();

  let isOpen = false;
  let isScrolled = false;

  $: navigationClasses = [
    'gh-navigation',
    `gh-navigation-${variant}`,
    `gh-glass-${glass}`,
    `gh-navigation-${position}`,
    `gh-navigation-${size}`,
    sticky ? 'gh-navigation-sticky' : '',
    fixed ? 'gh-navigation-fixed' : '',
    liquid ? 'gh-navigation-liquid' : '',
    animated ? 'gh-navigation-animated' : '',
    blur ? 'gh-navigation-blur' : '',
    shadow !== 'none' ? `gh-shadow-${shadow}` : '',
    padding !== 'none' ? `gh-p-${padding}` : '',
    rounded !== 'none' ? `gh-rounded-${rounded}` : '',
    isScrolled ? 'gh-navigation-scrolled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  $: navigationStyle = {
    ...(zIndex !== undefined && { zIndex }),
  };

  function handleScroll() {
    isScrolled = window.scrollY > 10;
  }

  function toggle() {
    isOpen = !isOpen;
    dispatch('toggle', isOpen);
  }

  function itemClick(item, index) {
    dispatch('itemClick', { item, index });
    isOpen = false;
  }

  onMount(() => {
    if (sticky || fixed) {
      window.addEventListener('scroll', handleScroll);
    }
  });

  onDestroy(() => {
    if (sticky || fixed) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<nav class={navigationClasses} style={navigationStyle}>
  <div class="gh-navigation-container">
    <slot {isOpen} {toggle} {itemClick} />
  </div>
</nav>

<style>
  @import './Navigation.css';
</style>
