var TrieNode = function TrieNode(value) {
    this.value = value;
    this.leaf = false;
    this.data = [];
    this.children = {};
};

var Trie = function Trie() {
    this.root = new TrieNode('');
};

Trie.prototype.insert = function insert (word, data) {
    if (!word) {
        return;
    }
    var n = this.root;
    for (var i = 0; i < word.length; i++) {
        var c = word[i];
        if (!n.children.hasOwnProperty(c)) {
            n.children[c] = new TrieNode(c);
        }
        n = n.children[c];
        if (i === word.length - 1) {
            n.leaf = true;

            n.data.push(data);
        }
    }
};

Trie.prototype.find = function find (fragment) {
    if (!fragment) {
        return false;
    }
    var n = this.root;
    for (var i = 0; i < fragment.length; i++) {
        var c = fragment[i];
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
};

Trie.prototype.autocomplete = function autocomplete (fragment) {
    if (!fragment) {
        return;
    }
    var result = [];
    var n = this.root;
    for (var i = 0; i < fragment.length; i++) {
        var c = fragment[i];
        if (!n.children.hasOwnProperty(c)) {
            break;
        }
        n = n.children[c];
        if (i === fragment.length - 1) {
            var queue = [];
            queue.push([n, fragment]);
            while (queue.length) {
                var element = queue.shift();
                var node = element[0];
                var word = element[1];


                if (node.leaf) {
                    result.push({word: word, data: node.data});
                }
                for (var j in node.children) {
                    var child = node.children[j];
                    queue.push([child, word + child.value]);
                }
            }
        }
    }
    return result;
};

var Plugin = function () {
};

Plugin.install = function (Vue, options) {
    if (Plugin.installed) {
        return;
    }

    var trie = new Trie();

    var fctInsert = function (word, data) {
        var dictionary = [].concat( word );
        if (!Array.isArray(word)) {
            dictionary = [word];
        }
        dictionary.forEach(function (w) {
            trie.insert(w, data);
        });
    };

    var fctFind = function (fragment) {
        return trie.find(fragment);
    };

    var fctAutocomplete = function (fragment) {
        return trie.autocomplete(fragment);
    };

    Vue.prototype.$search = {
        insert: fctInsert,
        find: fctFind,
        autocomplete: fctAutocomplete,
    };
};


if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}

export default Plugin;
