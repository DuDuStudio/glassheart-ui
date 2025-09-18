<script>
  export let isOpen = false;
  export let className = '';

  $: toggleClasses = `gh-navigation-toggle ${isOpen ? 'gh-navigation-toggle-open' : ''} ${className}`.trim();
</script>

<button class={toggleClasses} on:click aria-label="Toggle navigation menu">
  <span class="gh-navigation-toggle-line"></span>
  <span class="gh-navigation-toggle-line"></span>
  <span class="gh-navigation-toggle-line"></span>
</button>
