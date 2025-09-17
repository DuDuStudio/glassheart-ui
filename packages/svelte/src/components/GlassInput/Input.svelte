<script lang="ts">
  export let value = '';
  export let type = 'text';
  export let size = 'md';
  export let variant = 'default';
  export let glass = 'medium';
  export let liquid = false;
  export let error = false;
  export let disabled = false;
  export let placeholder = '';
  export let label = '';
  export let help = '';
  export let icon = null;
  export let iconPosition = 'left';
  export let button = null;

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  $: inputGroupClasses = [
    'gh-input-group',
    `gh-input-group-${size}`,
    error ? 'gh-input-error-state' : ''
  ].filter(Boolean).join(' ');

  $: inputClasses = [
    'gh-input',
    `gh-input-${size}`,
    `gh-input-${variant}`,
    `gh-glass-${glass}`,
    liquid ? 'gh-liquid-flow' : '',
    error ? 'gh-input-error' : '',
    disabled ? 'gh-disabled' : ''
  ].filter(Boolean).join(' ');

  function handleInput(event) {
    const target = event.target;
    value = target.value;
    // Emit input event
    const customEvent = new CustomEvent('input', {
      detail: { value, event }
    });
    dispatchEvent(customEvent);
  }

  function handleFocus(event) {
    const customEvent = new CustomEvent('focus', {
      detail: event
    });
    dispatchEvent(customEvent);
  }

  function handleBlur(event) {
    const customEvent = new CustomEvent('blur', {
      detail: event
    });
    dispatchEvent(customEvent);
  }
</script>

<div class={inputGroupClasses}>
  {#if label}
    <label for={inputId} class="gh-input-label">{label}</label>
  {/if}
  
  <div class="gh-input-wrapper">
    {#if icon && iconPosition === 'left'}
      <div class="gh-input-icon-left">
        <slot name="icon">{icon}</slot>
      </div>
    {/if}
    
    {#if type === 'password'}
      <input
        id={inputId}
        class={inputClasses}
        type="password"
        {placeholder}
        {disabled}
        bind:value
        on:input={handleInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
      />
    {:else if type === 'email'}
      <input
        id={inputId}
        class={inputClasses}
        type="email"
        {placeholder}
        {disabled}
        bind:value
        on:input={handleInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
      />
    {:else if type === 'number'}
      <input
        id={inputId}
        class={inputClasses}
        type="number"
        {placeholder}
        {disabled}
        bind:value
        on:input={handleInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
      />
    {:else}
      <input
        id={inputId}
        class={inputClasses}
        type="text"
        {placeholder}
        {disabled}
        bind:value
        on:input={handleInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
      />
    {/if}
    
    {#if icon && iconPosition === 'right'}
      <div class="gh-input-icon-right">
        <slot name="icon">{icon}</slot>
      </div>
    {/if}
    
    {#if button}
      <div class="gh-input-button">
        <slot name="button">{button}</slot>
      </div>
    {/if}
  </div>
  
  {#if error}
    <div class="gh-input-error">{error}</div>
  {/if}
  {#if help && !error}
    <div class="gh-input-help">{help}</div>
  {/if}
</div>
