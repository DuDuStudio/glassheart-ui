<script lang="ts">
  export let variant = 'default';
  export let size = 'md';
  export let glass = 'medium';
  export let liquid = false;
  export let loading = false;
  export let disabled = false;

  $: buttonClasses = [
    'gh-button',
    `gh-button-${variant}`,
    `gh-button-${size}`,
    `gh-glass-${glass}`,
    liquid ? 'gh-liquid-flow' : '',
    loading ? 'gh-loading' : '',
    disabled ? 'gh-disabled' : ''
  ].filter(Boolean).join(' ');

  function handleClick(event) {
    if (!disabled && !loading) {
      // Emit click event
      const customEvent = new CustomEvent('click', {
        detail: event
      });
      dispatchEvent(customEvent);
    }
  }
</script>

<button
  class={buttonClasses}
  {disabled}
  on:click={handleClick}
  on:keydown
  on:keyup
  on:focus
  on:blur
  on:mouseenter
  on:mouseleave
>
  {#if loading}
    <span class="gh-loading-spinner"></span>
  {:else}
    <slot />
  {/if}
</button>
