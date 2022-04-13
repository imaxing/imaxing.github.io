
```bash
npm i @iamgx/pro-layout
```

```javascript
import ProLayout from '@iamgx/pro-layout'
Vue.use(ProLayout)
```


```html
<pro-layout
  :menu-active="$route.path"
  :collapsed.sync="collapsed"
  :loading="loading"
  :theme="theme"
  menu-active-text="#f40"
  :menus="menus"
  :right-icons="rightIcons"
  @menu-click="(path) => $router.push(path)"
>
  <router-view />
</pro-layout>
```