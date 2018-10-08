const assert = require('assert');
const TrieNode = require('./index');


describe(`Insertion`, () => {
  it(`Should correctly insert a new value and form a correct structure`, () => {
    const root = new TrieNode();
    root.insert(`apex`);

    assert(!!root.children[`a`]);
    assert(!!root.children[`a`].children[`p`]);
    assert(!!root.children[`a`].children[`p`].children[`e`]);
    assert(!!root.children[`a`].children[`p`].children[`e`].children[`x`]);
  });

  it(`Should correctly mark the end of the word`, () => {
    const root = new TrieNode();
    root.insert(`apex`);

    assert(root.children[`a`].children[`p`].children[`e`].children[`x`].isAWord);
  });

  it(`Should correctly add an end of the word mark on already existing path`, () => {
    const root = new TrieNode();
    root.insert(`apex`);
    root.insert(`ape`);

    assert(root.children[`a`].children[`p`].children[`e`].isAWord);
  });
});

describe(`Value getting`, () => {
  it(`Should correctly retreive a value`, () => {
    const root = new TrieNode();
    root.insert(`a`);
    assert(root.get(`a`));
    assert(root.get(`a`).isAWord);
  });

  it(`Should return null if there's no such value`, () => {
    const root = new TrieNode();
    root.insert(`a`);
    assert.equal(root.get(`b`), null);
  });
});

describe(`Search`, () => {
  it(`Should return all possible values that match the path`, () => {
    const root = new TrieNode();
    root.insert(`a`);
    root.insert(`ape`);
    root.insert(`apex`);
    root.insert(`apple`);

    assert.deepEqual(root.lookup(`a`), [`a`, `ape`, `apex`, `apple`]);
    assert.deepEqual(root.lookup(`ap`), [`ape`, `apex`, `apple`]);
    assert.deepEqual(root.lookup(`app`), [`apple`]);
  });

  it(`Should return an empty array if there're no values that match the path`, () => {
    const root = new TrieNode();
    root.insert(`a`);
    assert.deepEqual(root.lookup(`b`), []);
  });
});
