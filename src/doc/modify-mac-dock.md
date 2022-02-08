


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