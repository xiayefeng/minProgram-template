##tabs 组件

tabs-wrap 组件暴露给外部的 class 类名
>#### 参数 
 * tabsArr {array}  tabs标签数组
 * activeColor   {string} 选中项的颜色  默认值 '#e4393c'
 * borderWidth {string} 底部border的宽度  默认值 '2px'
 * idx {number} 选中的选项脚标 默认值 0
>#### 事件
 * 'change-idx' 选中的选项改变，回调接受 e.detail 是 activedIdx 的值
 
>注意事项 传递给组件的参数 html里可以用中划线分割, js里自动转换为驼峰命名 ， 绑定的事件必须要与绑定的事件名一致，
用中划线就用中划线，用驼峰就用驼峰，保持一致
#### 示例
```html
<top-tips tabs-wrap="tabs-box" tabs-arr="{{tabsArr}}" bind:change-idx="navChange"></top-tips>
```
>引入
```json
{
"usingComponents": {
        "top-tips": "/components/common/tabs/tabs"
    }
}
```
```html
注意：组建的高度及字体大小要通过外部类名 'tab-wrap'来设置 
例如：
     <style>
       .tabs-box{
           height: 90rpx;
           line-height: 90rpx;
           font-size: 32rpx;
       }
     </style>

```