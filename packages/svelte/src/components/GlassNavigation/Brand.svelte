<script>
  export let href = undefined;
  export let className = '';

  $: brandClasses = `gh-navigation-brand ${className}`.trim();
</script>

{#if href}
  <a {href} class={brandClasses} on:click>
    <slot />
  </a>
{:else}
  <div class={brandClasses} on:click>
    <slot />
  </div>
{/if}
