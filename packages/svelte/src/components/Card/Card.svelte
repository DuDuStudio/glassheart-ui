<script lang="ts">
  export let size = 'md';
  export let variant = 'default';
  export let liquid = false;
  export let interactive = false;

  $: cardClasses = [
    'gh-card',
    `gh-card-${size}`,
    `gh-card-${variant}`,
    liquid ? 'gh-liquid-flow' : '',
    interactive ? 'gh-interactive' : ''
  ].filter(Boolean).join(' ');
</script>

<div class={cardClasses}>
  <slot />
</div>
