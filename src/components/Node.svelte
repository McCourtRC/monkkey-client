<script>
  import { equals, length } from 'ramda';
  import { currentPath } from '../stores';

  export let name;
  export let path;
  export let children;
  $: selected = equals(path, $currentPath);

  const selectNode = () => {
    currentPath.update(() => path);
  };
</script>

<div
  class="active:bg-green-300"
  class:hover:bg-white={!selected}
  class:bg-green-200={selected}
  on:click={selectNode}
>
  {name}
</div>

{#if length(children)}
  {#each children as child}
    <div class="ml-4">
      <svelte:self {...child} />
    </div>
  {/each}
{/if}
