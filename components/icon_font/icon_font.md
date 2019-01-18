##iconfot 组件

>#### 参数 
 * fontClass {string}  图标类名，只要横杠后边部分例如 ‘icon-bofanganniu’ , 只取bofanganniu即可
 * fontSize   {string, number} 字体大小 默认值 36  默认单位 rpx
 * dw {string} 字体单位 默认值 'rpx'
 * color {string} 字体颜色 默认值 
>#### 事件
 
 
>注意事项 传递给组件的参数 html里可以用中划线分割, js里自动转换为驼峰命名 ， 绑定的事件必须要与绑定的事件名一直，
用中划线就用中划线，用驼峰就用驼峰，保持一致
#### 示例
```html
<icon-font ali-icon="my-icon" font-size="16" font-class="bofanganniu" dw="px" color="#f00"></icon-font>
```
>引入
```json
{
"usingComponents": {
        "icon-font": "/components/base_component/icon_font/icon_font"
    }
}
```