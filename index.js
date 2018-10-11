class TrieNode {
  constructor() {
    this.children = {};
    this.isAWord = false;
  }

  insert(val, _level = 0) {
    const letter = val[_level];
    const stop = _level === val.length - 1;

    if (!this.children[letter]) {
      this.children[letter] = new TrieNode();
    }

    this.children[letter].isAWord = this.children[letter].isAWord || stop;

    if (!stop) {
      this.children[letter].insert(val, _level + 1);
    }
  }

  get(val) {
    return [...val].reduce((currentNode, nextNodeID) => {
      if (currentNode === null) {
        return null;
      }

      return currentNode.children[nextNodeID] || null;
    }, this);
  }

  _visitor(val, root) {
    if (root === null) {
      return [];
    }

    const trace = [];

    if (root.isAWord) {
      trace.push(val);
    }

    for (const [nodeName, node] of Object.entries(root.children)) {
      trace.push(...this._visitor(`${val}${nodeName}`, node));
    }

    return trace;
  }

  lookup(val) {
    return this._visitor(val, this.get(val));
  }
}

module.exports = TrieNode;
