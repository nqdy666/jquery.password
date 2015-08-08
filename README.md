# jquery.password
### 效果
![password.png](http://qjzd.qiniudn.com/FjEYBqRJDfUkn56n-ImgwhelqBz-)
### 依赖
jquery-1.11.2.min.js
### 使用
```
引用css
<link rel="stylesheet" type="text/css" href="password.css"/>
引用js
<script type="text/javascript" src="jquery.password.js"></script>
```
### 基本方法
```
<input type="password" maxlength="6"/>
$("input").pass();
```
### 高级用法
```
初始化
var inputObj = $.QjzdPassWord("input",{
	isShowErrPassImg: true,
	checkingRule: function(num) {
		var reg = /^\d{6}$/;
		return reg.test(num);
	}
});
值是否有效isValueValid 
inputObj.isValueValid() //默认取input第一个元素
inputObj.isValueValid($inputObj);
```
