<script>
  import { nth, clone, assocPath } from 'ramda';
  import {
    mode,
    modes,
    data,
    currentPath,
    parentPath,
    parentNode,
    nodeOrderPaths,
    currentNodeOrderIndex,
    siblingOrderPaths,
    currentSiblingOrderIndex,
  } from '../stores';

  const commands = {
    // Move to Next Node
    j: () => {
      const nextNodePath = nth($currentNodeOrderIndex + 1, $nodeOrderPaths);
      if (nextNodePath) return currentPath.set(nextNodePath);

      // go back to top
      currentPath.set($nodeOrderPaths[0]);
    },
    // Move to Prev Node
    k: () => {
      const prevNodePath = nth($currentNodeOrderIndex - 1, $nodeOrderPaths);
      if (prevNodePath) return currentPath.set(prevNodePath);
    },
    //Move to Next Sibling
    J: () => {
      const nextSiblingPath = nth(
        $currentSiblingOrderIndex + 1,
        $siblingOrderPaths
      );
      if (nextSiblingPath) return currentPath.set(nextSiblingPath);

      // go back to top
      currentPath.set($siblingOrderPaths[0]);
    },
    //Move to Prev Sibling
    K: () => {
      const prevSiblingPath = nth(
        $currentSiblingOrderIndex - 1,
        $siblingOrderPaths
      );
      if (prevSiblingPath) return currentPath.set(prevSiblingPath);
    },
    //
    // I: () => {
    //   if ($firstChildNode) return currentPath.set($firstChildPath);
    // },
    //Move to Parent
    O: () => {
      if ($parentNode) return currentPath.set($parentPath);
    },
    // Change Name
    c: () => {
      const tmp = clone($data);
      data.set(assocPath([...$currentPath, 'name'], 'test', tmp));
    },
    // i: () => console.log('INSERT'),
    // a: () => console.log('ADD'),
    // d: () => console.log('DELETE'),
  };

  function handleKeydown(event) {
    // build commands by chaining key presses

    const command = commands[event.key];
    if (command && $mode === modes.AWAITING_COMMAND) command();
  }
</script>

<svelte:window on:keydown={handleKeydown} />
