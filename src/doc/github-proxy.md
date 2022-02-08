
### 如果本地开启了代理, 针对github设置git代理


### 针对github设置

```bash
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
```


### 取消代理

```bash
git config --global --unset http.https://github.com.proxy)
```


### 参考
- [git 设置和取消代理](https://gist.github.com/laispace/666dd7b27e9116faece6?permalink_comment_id=3424404#gistcomment-3424404)