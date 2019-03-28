### 1. import svg-icon in your app.js
```
import Icon from 'cool-svg-icon';

Vue.component('icon', Icon);  
```
### 2. use the svg icon in your vue!
- name: svg file name
- w: width (accept String or Number)
- h: height (accept String or Nnmber)
```
<icon name="chameleon" :w="24" :h="24"></icon>
```

