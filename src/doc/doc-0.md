

![](https://tva1.sinaimg.cn/large/0082zybpgy1gc7x4f98dej31hc0u0ah1.jpg)

<!--more-->

**记录重置 Mac Launchpad 的命令**
##### 行数
```
# 修改
defaults write com.apple.dock springboard-rows -int 6
# 恢复
defaults write com.apple.dock springboard-rows Default
```

##### 列数
```
# 修改
defaults write com.apple.dock springboard-columns -int 8
# 恢复
defaults write com.apple.dock springboard-columns Default   
```

---
##### 重启Dock
```bash
killall Dock  
```