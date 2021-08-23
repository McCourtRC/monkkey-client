import {
  __,
  pipe,
  path,
  remove,
  concat,
  adjust,
  add,
  subtract,
  last,
  prop,
  defaultTo,
} from 'ramda';

// Generate paths
export const genParentPath = remove(-2, 2);
export const genFirstChildPath = concat(__, ['children', 0]);
export const genNextSiblingPath = adjust(-1, add(1));
export const genPrevSiblingPath = adjust(-1, subtract(__, 1));
export const genNextParentPath = pipe(genParentPath, genNextSiblingPath);
// export const genLastChildPath = pipe(genFirstChildPath, genPrevSiblingPath);

// Get properties
const getChildren = pipe(prop('children'), defaultTo([]));

// Traverse Tree
export const traverseChildren = (node, callback) => {
  callback(node);

  const children = getChildren(node);
  children.forEach((child) => {
    traverseChildren(child, callback);
  });
};
