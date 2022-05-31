class TrieNode {
    constructor(value) {
        this.value = value;
        this.leaf = false;
        this.data = [];
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode('');
    }

    insert(word, data) {
        if (!word) {
            return;
        }
        let n = this.root;
        for (let i = 0; i < word.length; i++) {
            const c = word[i];
            if (!n.children.hasOwnProperty(c)) {
                n.children[c] = new TrieNode(c);
            }
            n = n.children[c];
            if (i === word.length - 1) {
                n.leaf = true;

                n.data.push(data);
            }
        }
    }

    find(fragment) {
        if (!fragment) {
            return false;
        }
        let n = this.root;
        for (let i = 0; i < fragment.length; i++) {
            const c = fragment[i];
            if (!n.children.hasOwnProperty(c)) {
                break;
            }
            n = n.children[c];
            if (i === fragment.length - 1 && n.leaf) {
                return {
                    word: fragment,
                    data: n.data,
                };
            }
        }
        return false;
    }

    autocomplete(fragment) {
        if (!fragment) {
            return;
        }
        let result = [];
        let n = this.root;
        for (let i = 0; i < fragment.length; i++) {
            const c = fragment[i];
            if (!n.children.hasOwnProperty(c)) {
                break;
            }
            n = n.children[c];
            if (i === fragment.length - 1) {
                const queue = [];
                queue.push([n, fragment]);
                while (queue.length) {
                    const element = queue.shift();
                    const node = element[0];
                    const word = element[1];


                    if (node.leaf) {
                        result.push({word, data: node.data})
                    }
                    for (const j in node.children) {
                        const child = node.children[j];
                        queue.push([child, word + child.value]);
                    }
                }
            }
        }
        return result;
    }
}

const Plugin = function () {
}

Plugin.install = function (Vue, options) {
    if (Plugin.installed) {
        return;
    }

    const trie = new Trie();

    const fctInsert = function (word, data) {
        let dictionary = [...word];
        if (!Array.isArray(word)) {
            dictionary = [word];
        }
        dictionary.forEach((w) => {
            trie.insert(w, data);
        })
    };

    const fctFind = function (fragment) {
        return trie.find(fragment);
    };

    const fctAutocomplete = function (fragment) {
        return trie.autocomplete(fragment);
    };

    Vue.prototype.$search = {
        insert: fctInsert,
        find: fctFind,
        autocomplete: fctAutocomplete,
    }
}


if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}

export default Plugin;
