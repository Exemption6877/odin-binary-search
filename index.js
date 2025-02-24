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
    function recursiveBuild(parseArray) {
      if (parseArray.length === 0) return null;

      const mid = Math.floor(parseArray.length / 2);
      const node = new Node(parseArray[mid]);

      node.left = recursiveBuild(parseArray.slice(0, mid));
      node.right = recursiveBuild(parseArray.slice(mid + 1));

      return node;
    }

    return recursiveBuild(array);
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
prettyPrint(treeExample.root);
