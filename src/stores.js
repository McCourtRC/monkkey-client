import { equals, findIndex, path, prop, __ } from 'ramda';
import { writable, derived } from 'svelte/store';
import { genParentPath, traverseChildren } from './utils';

export const modes = {
  AWAITING_COMMAND: 'AWAITING_COMMAND',
  AWAITING_INPUT: 'AWAITING_INPUT',
};
export const mode = writable(modes.AWAITING_COMMAND);

export const data = writable({
  type: 'program',
  name: 'My Program',
  path: [],
  children: [
    {
      type: 'file',
      name: 'myFile.js',
      path: ['children', 0],
      children: [
        {
          type: 'const',
          name: 'foo',
          path: ['children', 0, 'children', 0],
        },
        {
          type: 'function',
          name: 'add',
          path: ['children', 0, 'children', 1],
          children: [
            {
              type: 'literal',
              name: '1',
              path: ['children', 0, 'children', 1, 'children', 0],
            },
            {
              type: 'literal',
              name: '7',
              path: ['children', 0, 'children', 1, 'children', 1],
            },
            {
              type: 'literal',
              name: '2',
              path: ['children', 0, 'children', 1, 'children', 2],
            },
          ],
        },
        {
          type: 'const',
          name: 'bar',
          path: ['children', 0, 'children', 2],
          children: [
            {
              type: 'literal',
              name: '4789483',
              path: ['children', 0, 'children', 2, 'children', 0],
            },
          ],
        },
      ],
    },
    {
      type: 'folder',
      name: 'utils/',
      path: ['children', 1],
      children: [
        {
          type: 'file',
          name: 'index.html',
          path: ['children', 1, 'children', 0],
        },
      ],
    },
  ],
});

export const currentPath = writable([]);
export const currentNode = derived(
  [currentPath, data],
  ([$currentPath, $data]) => path($currentPath, $data)
);

export const parentPath = derived(currentPath, ($currentPath) =>
  genParentPath($currentPath)
);
export const parentNode = derived([parentPath, data], ([$parentPath, $data]) =>
  path($parentPath, $data)
);

export const siblingOrderPaths = derived(parentNode, ($parentNode) =>
  $parentNode.children.map(prop('path'))
);
export const currentSiblingOrderIndex = derived(
  [currentPath, siblingOrderPaths],
  ([$currentPath, $siblingOrderPaths]) =>
    findIndex(equals($currentPath))($siblingOrderPaths)
);

export const nodeOrderPaths = derived(data, ($data) => {
  const paths = [];
  traverseChildren($data, (node) => paths.push(node.path));

  return paths;
});

export const currentNodeOrderIndex = derived(
  [currentPath, nodeOrderPaths],
  ([$currentPath, $nodeOrderPaths]) =>
    findIndex(equals($currentPath))($nodeOrderPaths)
);
