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
        if (node.right === null) {
          node.right = new Node(value);
          return;
        }
        recursiveNullSearch(value, node.right);
      }
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
          return;
        }
        recursiveNullSearch(value, node.left);
      }
    }

    recursiveNullSearch(value, node);
  }

  deleteItem(value) {
    const _findSmallest = (node, parent = null) => {
      if (node.left === null) {
        return { smallest: node, parent: parent };
      }
      return _findSmallest(node.left, node);
    };

    const _deleteNode = (node, parent, value) => {
      if (node === null) return;

      if (value < node.value) {
        _deleteNode(node.left, node, value);
      } else if (value > node.value) {
        _deleteNode(node.right, node, value);
      } else {
        // Case 1: No children
        if (node.left === null && node.right === null) {
          if (parent === null) {
            this.root = null;
          } else if (parent.left === node) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        }
        // Case 2: One child
        else if (node.left === null) {
          if (parent === null) {
            this.root = node.right;
          } else if (parent.left === node) {
            parent.left = node.right;
          } else {
            parent.right = node.right;
          }
        } else if (node.right === null) {
          if (parent === null) {
            this.root = node.left;
          } else if (parent.left === node) {
            parent.left = node.left;
          } else {
            parent.right = node.left;
          }
        }
        // Case 3: Two children
        else {
          let { smallest, parent: smallestParent } = _findSmallest(node.right);

          if (smallestParent !== node) {
            smallestParent.left = smallest.right;
          }

          smallest.left = node.left;
          smallest.right =
            node.right !== smallest ? node.right : smallest.right;

          if (parent === null) {
            this.root = smallest;
          } else if (parent.left === node) {
            parent.left = smallest;
          } else {
            parent.right = smallest;
          }
        }
      }
    };

    _deleteNode(this.root, null, value);
  }

  find(value) {
    function _find(value, node) {
      if (node === null) {
        return null;
      }

      if (node.data === value) {
        return node;
      }

      if (value > node.data) {
        return _find(value, node.right);
      } else {
        return _find(value, node.left);
      }
    }
    return _find(value, this.root);
  }

  levelOrder(callback) {
    if (!callback) {
      throw console.error("Please enter callback function");
    }
    const queue = [];
    let node = this.root;
    queue.push(node);
    while (queue.length > 0) {
      node = queue.shift();
      callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Please enter callback function");
    }
    function _inOrder(node) {
      if (node === null) {
        return;
      }
      _inOrder(node.left);
      callback(node);
      _inOrder(node.right);
    }
    _inOrder(this.root);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Please enter callback function");
    }
    function _preOrder(node) {
      if (node === null) {
        return;
      }
      callback(node);
      _preOrder(node.left);
      _preOrder(node.right);
    }
    _preOrder(this.root);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Please enter callback function");
    }
    function _postOrder(node) {
      if (node === null) {
        return;
      }
      _postOrder(node.left);
      _postOrder(node.right);
      callback(node);
    }
    _postOrder(this.root);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    let left = this.height(node.left);
    let right = this.height(node.right);

    return 1 + Math.max(left, right);
  }

  // level order is logical for this
  depth(node) {
    if (node === null) {
      return -1;
    }

    function recursiveSet(nodeSet, depth) {
      if (nodeSet === null) {
        return -1;
      }
      if (nodeSet === node) {
        return depth;
      }

      let left = recursiveSet(nodeSet.left, depth + 1);
      if (left !== -1) {
        return left;
      }
      let right = recursiveSet(nodeSet.right, depth + 1);
      if (right !== -1) {
        return right;
      }
      return -1;
    }

    return recursiveSet(this.root, 0);
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
// console.log(treeExample.depth(treeExample.root.left));
// treeExample.preOrder(console.log);
// console.log(treeExample.find(8));
prettyPrint(treeExample.root);
