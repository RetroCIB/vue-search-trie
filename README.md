### vue-search-trie
## Advanced keyword-based search plugin

`vue-dummy` is a wrapper around the https://dummyjs.com/ library to expose placeholder Images and Dummy, Lorum Ipsum Text as a vue directive

## Usage

#### Add to your HTML page:

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-search-trie"></script>
```

or, import into your module `npm install vue-search-trie --save-dev`

```js
import Vue from "vue"
import VueSearchTrie from "vue-search-trie"

Vue.use(VueSearchTrie)
```

#### Add dictionary words

Initialize list of words:
```javascript
let keywords = 'abracadabra';
```
or
```javascript
let keywords = ['abracadabra', 'hocuspocus'];
```

and insert them into search:
```javascript
vm.$search.insert(keywords, { 
    image: 'specific-word.jpg',
    title: 'magic word'
});
```

#### Return result for a keyword
```javascript
let keyword = 'abracadabra';
console.dir(vm.$search.find(keyword)); 
```


#### Return results autocomplete for a (start partial) keyword
```javascript
let keyword = 'ab';
console.dir(vm.$search.autocomplete(keyword)); 
``` 
  



