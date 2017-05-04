# 这个项目主要用于学习requireJS, require.js版本是2.3.3
- 开始这个项目的时候，我自己有个问题，为什么要用requireJS，requireJS有什么作用,下面我来回答这个问题。
##### 传统 JavaScript 代码的问题
让我们来看看一般情况下 JavaScript 代码是如何开发的：通过 <script> 标签来载入 JavaScript 文件，用全局变量来区分不同的功能代码，全局变量之间的依赖关系需要显式的通过指定其加载顺序来解决，发布应用时要通过工具来压缩所有的 JavaScript 代码到一个文件。当 Web 项目变得非常庞大，前端模块非常多的时候，手动管理这些全局变量间的依赖关系就变得很困难，这种做法显得非常的低效。
##### AMD 的引入
AMD 提出了一种基于模块的异步加载 JavaScript 代码的机制，它推荐开发人员将 JavaScript 代码封装进一个个模块，对全局对象的依赖变成了对其他模块的依赖，无须再声明一大堆的全局变量。通过延迟和按需加载来解决各个模块的依赖关系。模块化的 JavaScript 代码好处很明显，各个功能组件的松耦合性可以极大的提升代码的复用性、可维护性。这种非阻塞式的并发式快速加载 JavaScript 代码，使 Web 页面上其他不依赖 JavaScript 代码的 UI 元素，如图片、CSS 以及其他 DOM 节点得以先加载完毕，Web 页面加载速度更快，用户也得到更好的体验。


下面继续我的学习项目，这里定义了学生模块，文件是js/student.js
```javascript
define(function(){ 
	 return { 
		createStudent: function(name, gender){ 
			 return { 
				 name: name, 
				 gender: gender 
			 }; 
		} 
	 }; 
});
```
这里定义了班级模块，文件是js/student.js
```javascript
define(function() { 
var allStudents = []; 
		return { 
			classID: "001", 
			department: "computer", 
			addToClass: function(student) { 
			allStudents.push(student); 
			}, 
			getClassSize: function() { 
			return allStudents.length; 
			} 
		}; 
	 } 
);
```
下面是入口文件
```javascript
require(["js/student", "js/class", "js/jquery"], function(student, clz) { 
	clz.addToClass(student.createStudent("Jack", "male")); 
	clz.addToClass(student.createStudent("Rose", "female")); 
	console.log(clz.getClassSize());  // 输出 2 
	console.log('test -- success');
	console.log($("#test").text() + "-----------------jquery加载成功");
 });
```

列出index.html
```html
<!DOCTYPE html>
<html>
	<head>
	</head>
	<body>
		<div id="test">requireJS</div>
		<script src="js/require.js"></script>
		<script src="js/index.js"></script> 
	</body>
</html>
```
上面是项目的所有代码了，执行html后，就会成功打印出信息。上面有些问题值得讲一讲，主要是匿名模块。下成是模块的定义样式。
```javascript
define(id?, dependencies?, factory);
```
> 该方法用来定义一个 JavaScript 模块，开发人员可以用这个方法来将部分功能模块封装在这个 define 方法体内。
id 表示该模块的标识，为可选参数。
dependencies 是一个字符串 Array，表示该模块依赖的其他所有模块标识，模块依赖必须在真正执行具体的 factory 方法前解决，这些依赖对象加载执行以后的返回值，可以以默认的顺序作为 factory 方法的参数。dependencies 也是可选参数，当用户不提供该参数时，实现 AMD 的框架应提供默认值为 [“require”，”exports”，“module”]。
factory 是一个用于执行改模块的方法，它可以使用前面 dependencies 里声明的其他依赖模块的返回值作为参数，若该方法有返回值，当该模块被其他模块依赖时，返回值就是该模块的输出。
CommonJS 在规范中并没有详细规定其他的方法，一些主要的 AMD 框架如 RequireJS、curl、bdload 等都实现了 define 方法，同时各个框架都有自己的补充使得其 API 更实用。
##### 当默认不填的时候，require.js就会自动生成名称，当然我们引用的时候还是通过相对路径，就如代码,直接通过js/+文件名去掉后缀加.
```javascript
require(["js/student", "js/class", "js/jquery"], function(student, clz) { 
```
##### 下面我又有个问题，能不能不要这么麻烦引入模块？答案当然是可以的
```javascript
 <script type="text/javascript" src="./js/require.js"></script> 
 <script type="text/javascript"> 
  require.config({ 
    baseUrl: "/js", 
    paths: { 
        "some": "some/v1"
    }, 
 waitSeconds: 10 
 }); 
 </script>
```
>通过配置可以解决，baseUrl指明的是所有模块的 base URL，比如”my/module”所加载的 script实际上就是 /js/my/module.js。注意，以 .js 结尾的文件加载时不会使用该 baseUrl，它们仍然会使用当前 index.html所在的相对路径来加载，所以仍然要加上”./js/”。如果 baseUrl没有指定，那么就会使用 data-main中指定的路径。
paths 中定义的路径是用于替换模块中的路径，如上例中的 some/module 具体的 JavaScript 文件路径是 /js/some/v1/module.js 。
waitSeconds 是指定最多花多长等待时间来加载一个 JavaScript 文件，用户不指定的情况下默认为 7 秒。

>文章引用于https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/#icomments
