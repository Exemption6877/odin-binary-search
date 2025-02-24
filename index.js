class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    function sortArray(parseArray) {
      const sortedArray = parseArray.sort((a, b) => a - b);
      const noDuplicates = [];

      noDuplicates.push(sortedArray[0]);
      for (let i = 1; i < sortedArray.length; i++) {
        if (sortedArray[i] === sortedArray[i - 1]) {
          continue;
        }
        noDuplicates.push(sortedArray[i]);
      }

      return noDuplicates;
    }

    const sortedArray = sortArray(array);
    console.log(sortedArray);

    function recursiveBuild(parseArray) {
      if (parseArray.length === 0) return null;

      const mid = Math.floor(parseArray.length / 2);
      const node = new Node(parseArray[mid]);

      node.left = recursiveBuild(parseArray.slice(0, mid));
      node.right = recursiveBuild(parseArray.slice(mid + 1));

      return node;
    }

    return recursiveBuild(sortedArray);
  }

  // assuming that the tree is not empty
  insert(value) {
    const node = this.root;
    function recursiveNullSearch(value, node) {
      if (value === node.data) {
        return;
      }
      if (value > node.data) {
        if (node.right === null || node.right === undefined) {
          node.right = new Node(value);
          return;
        }
        recursiveNullSearch(value, node.right);
      }
      if (value < node.data) {
        if (node.left === null || node.left === undefined) {
          node.left = new Node(value);
          return;
        }
        recursiveNullSearch(value, node.left);
      }
    }

    recursiveNullSearch(value, node);
  }
}

//

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const treeExample = new Tree([1, 7, 4, 23, 8, 9, 4]);
treeExample.insert(5);
prettyPrint(treeExample.root);
