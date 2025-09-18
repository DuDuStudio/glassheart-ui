<script>
  export let isOpen = false;
  export let className = '';

  $: menuClasses = `gh-navigation-menu ${isOpen ? 'gh-navigation-menu-open' : ''} ${className}`.trim();
</script>

<div class={menuClasses}>
  <slot />
</div>
