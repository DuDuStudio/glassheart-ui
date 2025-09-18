<script>
  export let href = undefined;
  export let active = false;
  export let disabled = false;
  export let icon = undefined;
  export let badge = undefined;
  export let className = '';

  $: itemClasses = [
    'gh-navigation-item',
    active ? 'gh-navigation-item-active' : '',
    disabled ? 'gh-navigation-item-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    if (!disabled) {
      // Handle click logic
    }
  }
</script>

{#if href && !disabled}
  <a {href} class={itemClasses} on:click={handleClick}>
    {#if icon}
      <span class="gh-navigation-item-icon">{icon}</span>
    {/if}
    <span class="gh-navigation-item-text">
      <slot />
    </span>
    {#if badge}
      <span class="gh-navigation-item-badge">{badge}</span>
    {/if}
  </a>
{:else}
  <button class={itemClasses} {disabled} on:click={handleClick}>
    {#if icon}
      <span class="gh-navigation-item-icon">{icon}</span>
    {/if}
    <span class="gh-navigation-item-text">
      <slot />
    </span>
    {#if badge}
      <span class="gh-navigation-item-badge">{badge}</span>
    {/if}
  </button>
{/if}
