<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { useLiquidGlass } from '../../stores/useLiquidGlass';

  export let variant = 'default';
  export let shape = 'default';
  export let size = 'md';
  export let glass = 'medium';
  export let liquidGlass = false;
  export let liquidGlassOptions = {};
  export let loading = false;
  export let disabled = false;

  let buttonElement;
  let liquidGlassHook= null;
  let liquidGlassStyleObj= {};
  let liquidGlassStyle = '';

  $: buttonClasses = [
    'gh-btn',
    `gh-btn-${variant}`,
    shape !== 'default' ? `gh-btn-${shape}` : '',
    `gh-btn-${size}`,
    `gh-glass-${glass}`,
    liquidGlass ? 'gh-btn-liquid-glass' : '',
    loading ? 'gh-btn-loading' : '',
    disabled ? 'gh-disabled' : ''
  ].filter(Boolean).join(' ');

  // Convert style object to CSS string
  $: liquidGlassStyle = Object.entries(liquidGlassStyleObj)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');

  // Subscribe to liquid glass style changes
  $: if (liquidGlass && liquidGlassHook) {
    liquidGlassHook.liquidGlassStyle.subscribe((style) => {
      liquidGlassStyleObj = style;
    });
  } else {
    liquidGlassStyleObj = {};
  }

  onMount(() => {
    if (liquidGlass) {
      liquidGlassHook = useLiquidGlass({
        depth: 8,
        strength: 100,
        chromaticAberration: 0,
        blur: 2,
        ...liquidGlassOptions,
      });
      
      if (buttonElement) {
        liquidGlassHook.elementRef.set(buttonElement);
        liquidGlassHook.setupEventListeners();
      }
    }
  });

  onDestroy(() => {
    if (liquidGlassHook) {
      liquidGlassHook.cleanup();
    }
  });

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
  bind:this={buttonElement}
  class={buttonClasses}
  style={liquidGlassStyle}
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

<style>
  .gh-btn {
    position: relative;
    background: rgba(255, 255, 255, var(--gh-glass-opacity));
    backdrop-filter: blur(var(--gh-glass-blur)) saturate(var(--gh-glass-saturate));
    -webkit-backdrop-filter: blur(var(--gh-glass-blur)) saturate(var(--gh-glass-saturate));
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--gh-radius);
    box-shadow: var(--gh-shadow-md);
    transition: all var(--gh-animation-duration) var(--gh-animation-timing);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--gh-spacing-sm);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
  }

  .gh-btn:focus-visible {
    outline: 2px solid rgb(var(--gh-ring));
    outline-offset: 2px;
  }

  .gh-btn:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  /* Button Shapes */
  .gh-btn-circle {
    border-radius: 50%;
    aspect-ratio: 1;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .gh-btn-pill {
    border-radius: 9999px;
    padding-left: var(--gh-spacing-lg);
    padding-right: var(--gh-spacing-lg);
  }

  /* Button Sizes */
  .gh-btn-xs {
    height: 1.5rem;
    padding: 0 var(--gh-spacing-sm);
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .gh-btn-xs.gh-btn-circle {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
  }

  .gh-btn-xs.gh-btn-pill {
    padding-left: var(--gh-spacing-sm);
    padding-right: var(--gh-spacing-sm);
  }

  .gh-btn-sm {
    height: 2rem;
    padding: 0 var(--gh-spacing-md);
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .gh-btn-sm.gh-btn-circle {
    width: 2rem;
    height: 2rem;
    padding: 0;
  }

  .gh-btn-sm.gh-btn-pill {
    padding-left: var(--gh-spacing-md);
    padding-right: var(--gh-spacing-md);
  }

  .gh-btn-md {
    height: 2.5rem;
    padding: 0 var(--gh-spacing-lg);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .gh-btn-md.gh-btn-circle {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
  }

  .gh-btn-md.gh-btn-pill {
    padding-left: var(--gh-spacing-lg);
    padding-right: var(--gh-spacing-lg);
  }

  .gh-btn-lg {
    height: 3rem;
    padding: 0 var(--gh-spacing-xl);
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .gh-btn-lg.gh-btn-circle {
    width: 3rem;
    height: 3rem;
    padding: 0;
  }

  .gh-btn-lg.gh-btn-pill {
    padding-left: var(--gh-spacing-xl);
    padding-right: var(--gh-spacing-xl);
  }

  .gh-btn-xl {
    height: 3.5rem;
    padding: 0 2rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .gh-btn-xl.gh-btn-circle {
    width: 3.5rem;
    height: 3.5rem;
    padding: 0;
  }

  .gh-btn-xl.gh-btn-pill {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  /* Button Variants */
  .gh-btn-default {
    background: rgba(255, 255, 255, var(--gh-glass-opacity));
    color: rgb(var(--gh-foreground));
    border-color: rgba(255, 255, 255, 0.2);
  }

  .gh-btn-default:hover {
    background: rgba(255, 255, 255, calc(var(--gh-glass-opacity) + 0.05));
    border-color: rgba(255, 255, 255, 0.3);
  }

  .gh-btn-primary {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-primary), 0.8) 0%,
      rgba(var(--gh-primary), 0.6) 100%
    );
    color: rgb(var(--gh-primary-foreground));
    border-color: rgba(var(--gh-primary), 0.3);
  }

  .gh-btn-primary:hover {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-primary), 0.9) 0%,
      rgba(var(--gh-primary), 0.7) 100%
    );
    border-color: rgba(var(--gh-primary), 0.4);
  }

  .gh-btn-secondary {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-secondary), 0.8) 0%,
      rgba(var(--gh-secondary), 0.6) 100%
    );
    color: rgb(var(--gh-secondary-foreground));
    border-color: rgba(var(--gh-secondary), 0.3);
  }

  .gh-btn-secondary:hover {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-secondary), 0.9) 0%,
      rgba(var(--gh-secondary), 0.7) 100%
    );
    border-color: rgba(var(--gh-secondary), 0.4);
  }

  .gh-btn-accent {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-accent), 0.8) 0%,
      rgba(var(--gh-accent), 0.6) 100%
    );
    color: rgb(var(--gh-accent-foreground));
    border-color: rgba(var(--gh-accent), 0.3);
  }

  .gh-btn-accent:hover {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-accent), 0.9) 0%,
      rgba(var(--gh-accent), 0.7) 100%
    );
    border-color: rgba(var(--gh-accent), 0.4);
  }

  .gh-btn-destructive {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-destructive), 0.8) 0%,
      rgba(var(--gh-destructive), 0.6) 100%
    );
    color: rgb(var(--gh-destructive-foreground));
    border-color: rgba(var(--gh-destructive), 0.3);
  }

  .gh-btn-destructive:hover {
    background: linear-gradient(
      135deg,
      rgba(var(--gh-destructive), 0.9) 0%,
      rgba(var(--gh-destructive), 0.7) 100%
    );
    border-color: rgba(var(--gh-destructive), 0.4);
  }

  .gh-btn-outline {
    background: transparent;
    color: rgb(var(--gh-foreground));
    border-color: rgb(var(--gh-border));
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .gh-btn-outline:hover {
    background: rgba(255, 255, 255, var(--gh-glass-light-opacity));
    backdrop-filter: blur(var(--gh-glass-light-blur));
    -webkit-backdrop-filter: blur(var(--gh-glass-light-blur));
    border-color: rgba(255, 255, 255, 0.2);
  }

  .gh-btn-ghost {
    background: transparent;
    color: rgb(var(--gh-foreground));
    border-color: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .gh-btn-ghost:hover {
    background: rgba(var(--gh-muted), 0.5);
    color: rgb(var(--gh-muted-foreground));
  }

  .gh-btn-link {
    background: transparent;
    color: rgb(var(--gh-primary));
    border-color: transparent;
    text-decoration: underline;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .gh-btn-link:hover {
    color: rgb(var(--gh-primary));
    text-decoration: none;
  }

  /* Button States */
  .gh-btn-loading {
    position: relative;
    pointer-events: none;
  }

  .gh-btn-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: 1rem;
    margin: -0.5rem 0 0 -0.5rem;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: gh-spin 1s linear infinite;
  }

  @keyframes gh-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>