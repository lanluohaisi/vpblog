# js权威指南(第六版)(190420)
## 语言核心

1. 语法结构  
    1）js是区分大小写，但html不区分大小写，比如html中的onclick属性可以写成onClick，但是js中必须是小写的onclick；  

2. 类型、值、变量  
    - 原始值(数字、字符串、布尔值、null、undifined) 以及 对象类型
    - 转义字符：\t  \n  \r  \b \\ \' \" \uXXXX
    - 在js中，字符串是固定不变的，类似replace() 和 toUpperCase() 方法都是返回新字符串，原字符串本身并没有改变
    - 准换为false：undefined  null  0  -0  NaN  ""
    - 包装对象：临时对象，所以可以读属性，但是不能定义新属性
      ```js
      var s = "test"; s.len = 4; var t = s.len;  // t为undefined
      ``
    - 不可变的原始值和可变的对象引用

3. 表达式和运算符
    - 一元操作符、赋值和三元条件运算符都具有从右至左的结合性
    - js中，所有的数字都是浮点型的，除法运算的结果也是浮点型
    - ++x 前增量，对操作数进行增量计算，并返回计算后的值；x++ 后增量，对操作数进行增量计算，但返回未做增量计算的值
    - 左移 << 新的第一位用0补充，舍弃第32位；带符号右移 >> 填补在左边的位由原操作数的符合决定；无符号右移 >>> 左边的高位总是填补0
    - 加号运算符如果其中一个操作数是字符串的话，则进行字符串连接操作；而比较运算符，只有在两个操作符都是字符串的时候，才进行字符串的比较
    - 比较运算符中一个例外，当其中一个操作数是(或者转换后是)NaN时，> < >= <= 均返回false
    - 逻辑运算符的'短路'性
    - eval() 接收一个参数，如果不是字符串，则直接返回。否则把字符串当成js代码进行编译；eval()使用了调用它的变量作用域环境

4. 语句
    - for/in 循环只有可枚举的属性才会遍历到
    - try{} catch(e){} finally{} // finally块内的逻辑总是会执行；和普通变量不同，catch子句中的标识符具有块级作用域
    - debugger;语句

5. 对象
    - Object.create() 创建一个新对象,其中第一个参数是这个对象的原型，第二个可选参数用以对对象的属性进行进步进一步的描述
    - js中，只有在查询属性时才会体会到继承的存在，而设置属性则与继承无关，该特性让程序员可以有选择地覆盖继承的属性
    - 检测属性：**in属性**(对象的自有属性或继承属性中包含这个属性)、对象的**hasOwnProperty()** (对象的自有属性)、**propertyIsEnumerable()** (自有属性且这个属性的可枚举性为true)、**for/in循环**(所有可枚举的属性，包括自有属性和继承的属性)、**Object.keys()**返回一个数组(由对象中可枚举的自有属性的名称组成)、**Object.getOwnPropertyNames()**返回对象所有自有属性的名称，而不仅仅是可枚举的 
    - 属性的getter和setter：js把set、get函数当做对象来调用，也就是说，在函数体内的this指向这个对象
      ```js
      var o = {
        data_prop: value, //普通的数据属性
        get accessor_prop() {/* 这里是函数体 */},
        set accessor_prop(value) {/* 这里是函数体 */} 
      }
      ```
    - 数据属性 -> 值(value) 、可写性(writable)、可枚举(enumerable)、可配置(configurable); 存储器属性 -> 读取(get)、写入(set)、可枚举性、可配置性；**Object.getOwnPropertyDescriptor()**获得某个对象特定属性的属性描述符; **Object.defineProperty()**设置属性的特性  
      ```js
      Object.defineProperty(o, 'x', {
        value: 1,
        writable: true,
        enumerable: false,
        configurable: true
      })
      ```
    - **Object.getPrototypeOf()** 查询原型；**isPrototypeOf()**检测原型

6. 数组
    - join()、sort() 、 concat()、 slice()、splice()、push()、pop()、unshift()、shift()、toString()、toLocaleString()
    - forEach()、map()、filter()、every()、some()、reduce()、reduceRight() 
      ```js
      // reduce()第一个参数是执行化简操作的函数， 与 forEach()和map()使用的函数不同，比较熟悉的是，数组元素、元素的索引和数组本身将作为第2-4个参数传递给函数，而化简函数第一个参数是到目前为止的化简操作累积的结果；reduce第二个可选参数是一个传递给函数的初始值；
      var a = [1,2,3,4,5];
      var sum = a.reduce((x, y) => x+y, 0);
      var max = a.reduce((x, y) => (x>y ? x : y));
      ```

7. 函数
    - 函数的调用：作为函数、作为方法、作为构造函数、通过它们的call()和apply()方法间接调用
    - 实现闭包：
      1) 我们将作用域描述为一个对象列表，每次调用js函数时，都会为之创建一个新的对象用来保存局部对象，把这个对象添加至作用域中。当函数返回的时候，就从作用域中将这个绑定变量的对象删除。  
      2) 如果不存在嵌套的函数，也没有其他引用指向这个绑定对象，它就会被当做垃圾回收掉。  
      3) 如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。但如果这些嵌套的函数对象在外部函数中保存下来，那么它们也会和所指向的变量绑定对象一样当做垃圾回收。  
      4) 但如果函数定义了嵌套的函数，并将它作为返回值返回或者存储在某处的属性里，这时就会有一个外部引用指向这个嵌套的函数，它就不会被垃圾回收，并且它所指向的变量绑定对象也不会被当做垃圾回收。  
        ```js
        // 闭包，立即调用函数
        var uniqueInterger = (function() {
            var count = 0;
            return function() { return count++; };
        });

        function counter() {
            var n = 0;
            return {
                count: function() { return n++; },
                reset: function() { n = 0; }
            };
        }
        var c = counter(), d = counter();
        // c 和 d 互不干扰--- 因为每次调用函数都会创建一个新的作用域和一个新的私有变量
        ```
      - 函数的方法：call()(传入的是上下文参数和待传入函数的值) 和 apply()(传入的是上下文参数和待传入函数的值的数组), bind() -> 将函数绑定某个对象，第一个参数为绑定对象，其他参数绑定为参数
        ```js
        // 通过调用g(x)来调用o.f(x)
        function f(y) { return this.x + y; }
        var o = { x: 1};
        var g = f.bind(o);
        g(2) // => 3

        // 柯里化
        var sum = function(x, y) { return x + y };
        var succ = sum.bind(null, 1); // 创建一个类似sum的新函数，但this绑定到null，并且第一个参数绑定到1，这个新的函数期望只传入一个实参
        succ(2) // => 3
        ```
      - Function()构造函数：最后一个实参所表示的文本就是函数体，其他所有的实参字符串是指定函数的形参名字的字符串；var f = new Function('x', 'y', 'return x*y;')
      - 函数式编程

8. 类和模块
    - 调用构造函数的一个重要特性是，构造函数的prototype属性被用做新对象的原型。这意味着通过同一个构造函数创建的所有对象都继承自同一个相同的对象，因此他们都是同一个类的成员
    - 构造函数会自动创建对象，然后将构造函数作为这个对象的方法来调用一次，最后返回这个新对象
    - 每个js函数(Function.bind()方法返回的函数除外)都自动拥有一个prototype属性。这个属性值是一个对象，这个对象包含唯一一个不可枚举属性constructor。constructor属性的值是一个函数对象（构造函数）
      ```js
      // Shape - 父类(superclass)
      function Shape() {
          this.x = 0;
          this.y = 0;
      }
      // 父类的方法
      Shape.prototype.move = function(x, y) {
          this.x += x;
          this.y += y;
          console.info('Shape moved.');
      };

      // Rectangle - 子类(subclass)
      function Rectangle() {
          Shape.call(this); // call super constructor.
      }
      // 子类续承父类
      Rectangle.prototype = Object.create(Shape.prototype);
      Rectangle.prototype.constructor = Rectangle;

      var rect = new Rectangle();

      console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
      console.log('Is rect an instance of Shape?', rect instanceof Shape); // true
      rect.move(1, 1); // Outputs, 'Shape moved.'
      ```

9. 正则表达式的模式匹配 
    - 特殊含义的标点符号  ^ $ . * + ? = ! : | \ / ( ) [ ] { }  如果想在正则表达式中使用这些字符的直接量进行匹配，则必须使用前缀\
    - 字符类：
      1) [...]，[^...]，. (除换行符和其他Unicode行终止符之外的任意字符)  
      2) \w (任何ASCII字符组成的单词，等价于[a-zA-Z0-9])，\W (任何不适ASCII字符组成的单词，等价于[^a-zA-Z0-9])  
      3) \s (任何Unicode空白符)，\S (任何非Unicode空白符的字符)  
      4) \d (任何ASCII数字，等价于[0-9])、\D (除了ASCII数字之外的任何字符，等价于[^0-9])，[\b] (退格直接量，特例)
    - 重复：
      1) {n,m} 匹配前一项至少n次,但不能超过m次； {n,} 匹配前一项n次或者更多次； {n} 匹配前一项n次；  
      2) ? 匹配前一项0次或者1次，也就说前一项是可选的，等价于{0,1}；   
      3) + 匹配前一项1次或者多次，等价于{1,}；  
      4) * 匹配前一项0次或者多次，等价于{0,}  
    - 非贪婪匹配：上面的重复默认一般都是贪婪匹配，如果要进行非贪婪匹配，只须在待匹配的字符后跟随一个`问号`即可
    - 选择、分组和引用：
      1) | 选择，匹配的是该符号左边的表达式或者右边的表达式；  
      2) (...) 组合，将几个项组合为一个单元，同时可记忆以供此后的引用使用；  
      3) (?:...) 只组合，把项组合到一个单元，但不记忆与该组相匹配的字符；   
      4) \n 和第n个分组第一个匹配的字符相匹配
    - 指向匹配位置：
      1) ^ 匹配字符串的开头，在多行检索中，匹配一行的开头；  
      2) $ 匹配字符串的结尾，在多行检索中，匹配一行的结果；  
      3) \b  匹配一个单词的边界； \B 匹配非单词边界的位置；   
      4) x(?=y) 匹配'x'仅仅当'x'后面跟着'y'，这种叫做先行断言，要求接下来的字符都与p匹配，但不能包括匹配p的那些字符；  
      5) x(?!y) 仅仅当'x'后面不跟着'y'时匹配'x'，这被称为正向否定查找  
      6) (?<=y)x 匹配'x'仅当'x'前面是'y'.这种叫做后行断言。  
      7) (?<!y)x 仅仅当'x'前面不是'y'时匹配'x'，这被称为反向否定查找  
    - 修改符：i 不区分大小写； g 全局匹配； m 多行匹配模式
    - 用于模式匹配的string方法
        ```js
        // search方法，返回第一个与之匹配的子串的起始位置，如果没有找到，返回-1
        // 注意 search方法不支持全局检索，会忽略修饰符g
        'Javascript'.search(/script/i);

        // replace方法用于执行检索与替换操作
        // 如果在替换字符中出现了$加数字，那么replace()将用与指定表示式相匹配的文本来替换这两个字符
        // releace的第二个参数可以是函数，该函数能够动态的替换字符串
        text.replace(/javas/gi, 'Javascript');
        '"hah" "jajaj" jjj'.replace(/"([^"]*)"/g, " '$1' "); // " 'hah'   'jajaj'  jjj"
        function replacer(match, p1, p2, p3, offset, string) {
            // p1 is nondigits, p2 digits, and p3 non-alphanumerics
            return [p1, p2, p3].join(' - ');
        }
        var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
        console.log(newString);  // abc - 12345 - #$*%

        // match，返回的是一个由匹配结果组成的数组
        // 如果该正则表达式设置了修饰符g，则方法返回的数组包含字符串中所有匹配结果
        // 如果没有设置g，match就不会进行全局检索，只检索第一个匹配，但也返回一个数组，数组的第一个元素是匹配的字符串，余下的元素则是正则表达式中用圆括号括起来的子表达式
        '1 plus 2 equals 3'.match(/\d+/g) // 返回 ['1', '2', '3']

        // split函数
        '1,2, 3, 5,6'.split(/\s*,\s*/);
        ```
      - RegExp()：当传入一个字符串表述的正则表达式时，必须将'\'替换成'\\'
        ```js
        // test()方法
        var pattern = /java/i;
        pattern.test('jaddjava');

        // exec()方法
        // exec方法，返回一个数组，类似于match方法为非全局检索返回的数组一样，当设置g时，将把当前正则表达式对象的lastIndex属性设置为紧挨着匹配子串的字符位置。
        var pattern = /Java/g;
        var text = 'JavaScript is more fun than Java!';
        var result;
        while((result = pattern.exec(text)) != null) {
            console.log(result[0], result.index, pattern.lastIndex);
        }
        // Java 0 4
        // Java 28 32
        ```

## 客户端js

1. web浏览器中的js
    - 同步、异步和延迟的脚本
      1) defer属性使得浏览器延迟脚本执行，直到文档的载入和解析完成，并可以操作  
      2) async属性使得浏览器可以尽快的执行脚本，而不用在下载脚本时阻塞文档解析  
      3) 动态创建script元素并把它插入文档中，来实现脚本的异步载入和执行  
        ```js
        var el = document.createElement('script');
        el.charset = 'utf-8';
        el.onload = el.onreadystatechange = function() {};
        el.onerror = function(){};
        el.src = url;
        document.getElementsByTagName('head')[0].appendChild(el);

        var clear = function(){
            if(!el){return ;}
            el.onload = el.onreadystatechange = el.onerror = null;
            el.parentNode && (el.parentNode.removeChild(el));
            el = null;
        }
        ```
    - 同源策略：脚本本身的来源和同源策略并不相关，相关的是脚本所嵌入的文档的来源，理解这一点很重要！

2. window对象
    - setTimeout() 和 setInterval()  clearTimeout() clearInterval(); 如果以`0毫秒`的时间来调用setTimeout()，那么指定的函数会被放入队列中，等到前面处于等待状态的事件处理程序全部执行完成后，再立即调用它
    - window.location 引用的是 Location对象；location.href、location.hash 等 ； 
    - location.replace() 载入新文档之前会从浏览历史中把当前文档删除； history.back()、history.forward()、history.go()；
    - navigator.userAgent；window.screen.width, window.screen.height
    - window.onerror = function(msg, url, line) {}

3. 脚本化文档
    - 选取文档元素：document.getElementById(), document.getElementsByName(), document.getElementsByTagName(), document.getElementsByClassName(), document.querySelectorAll(), document.querySelector()
    - node对象：parentNode , childNodes, firstChild, lastChild, nextSibling, previoursSibling, nodeType, nodeValue, nodeName
    - 属性：大小写敏感，getAttribute(), setAttribute(), hasAttribute(), removeAttribute()
    - 创建、插入和删除节点：document.createElement() 和 document.createTextNode()；父节点上调用：appendChild(), insertBefore(), removeChild()
    - 查询窗口滚动条位置
      ```js
      function getScrollOffsets(w) {
          w = w || window;
          // 除了IE8及更早的版本以外，其他浏览器都能用
          if (w.pageXOffset != null) {
              return { x: w.pageXOffset, y: w.pageYOffset}
          }
          // 标准模式下的IE
          var d = w.document;
          if (document.cpmpatMode == 'CSS1Compat') {
              return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};
          }
          // 对怪异模式下的浏览器
          return { x: d.body.scrollLeft, y: d.body.scrollTop };
      }
      ```
    - 查询窗口的视口尺寸
      ```js
      function getViewportSize(w) {
          w = w || window;
          // 除了IE8及更早的版本以外，其他浏览器都能用
          if (w.innerWidth != null) {
              return { x: w.innerWidth, y: w.innerHeight}
          }
          // 标准模式下的IE
          var d = w.document;
          if (document.cpmpatMode == 'CSS1Compat') {
              return { x: d.documentElement.clientWidth, y: d.documentElement.clientHeight};
          }
          // 对怪异模式下的浏览器
          return { x: d.body.clientWidth, y: d.body.clientHeight };
      }
      ```
    - 查询元素的几何尺寸：getBoundingClientRect()，返回元素在视口坐标中的位置，拥有left、right、top、bottom属性的对象，返回的坐标包含元素的边框和内边距，但不包含元素的外边距
      ```js
      var box = e.getBoundingClientRect();
      var offsets = getScrollOffsets(); // 上面的获取滚动条位置方法
      // 转化为文档坐标
      var x = box.left + offsets.x;
      var y = box.top + offsets.y;
      // 计算元素的宽度
      var w = box.width || (box.right - box.left);
      var h = box.height || (box.bottom - box.top);
      ```
    - 元素属性
      1) offsetWidth、offsetHeight、offsetLeft、offsetTop、offsetParent；---只读属性offsetWidth、offsetHeight以css像素返回它的屏幕尺寸，包含边框和内边距，不包含外边距，offsetLeft、offsetTop属性来返回元素的x和y坐标，相对父元素(offsetParent元素)  
      2) clientWidth、clientHeight、clientLeft、clientTop; ---clientWidth、clientHeight不包含边框，只包含内容和内边距，同时也不包含滚动条  
      3) scrollWidth、scrollHeight、scrollTop、scrollLeft；---scrollWidth、scrollHeight是元素的内容区域再加上任何溢出内容的尺寸；scrollTop、scrollLeft是`可写属性`，指定元素的滚动条位置  

4. 脚本化css
    - 透明度：opacity: 0.75; filter: alpha(opacity=75)
    - window.getComputedStyle(el, null)

5. 事件处理 
    - addEventListener(), attachEvent(), event.preventDefault()
    - 鼠标事件、拖放事件

6. 脚本化HTTP
    - XMLHttpRequest
      ```js
      function getText(url, callback) {
          var request = new XMLHttpRequest();
          request.open('GET', url);
          request.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
          request.onreadystatechange = function() {
              if (request.readyState === 4 && request.status === 200) {
                  var type = request.getResponseHeader('Content-Type');
                  if (type.match(/^text/)) {
                      callback(request.responseText);
                  }
              } 
          }
          request.send(null);
      }
      ```
    - multipart/form-data请求 与 FormData对象
      ```js
      const xhr = new XMLHttpRequest();
      const data = new FormData();
      // 拼接得到上传图片数据
      data.append('imgname', fileName);
      // 文件内容，change事件的e.target.files
      data.append('imgcontent', fileData);
      }
      data.append('isbase64', fileType);
      xhr.timeout = 20000; // 超时时间，单位是毫秒
      xhr.onload = function (e) {
          let retStr = e.target.responseText.replace(/<!--.*-->/g, '').replace(/[()]/g, '');
          retStr = retStr.substring(retStr.indexOf('{'));
          let res = retStr ? JSON.parse(retStr): {};
          if (res ) {

          }
      };
      xhr.onerror = function (e) {};
      xhr.ontimeout = function (e) {}

      var url = 'xxx';
      xhr.open('post', url);
      // xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.withCredentials = true; // 解决上传post跨域问题
      xhr.send(data);
      ```
    - CORS(cross-origin resource sharing)
    - JSONP --不受同源策略的影响，包含的json编码数据的响应体会自动解码

7. jQuery类库

8. 客户端存储
    - localStorage 和 sessionStorage, 作用域限定在文档源级别，文档源是通过协议、主机名以及端口三者来确定的，同时也受浏览器供应商限制；sessionStorage更是还被限制在窗口中；api包括 setItem()、getItem()、removeItem()
    - cookie:
      ```js
      document.cookie = name + '=' + decodeURIComponent(value) + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (maxAge ? ';max-age=' + maxAge : '') + ( expires ? ';expires=' + exp.toGMTString() : '') + ( secure ? ';secure' : '');
      ```

9. 多媒体和图形编程
    - 脚本化图片：利用 Image()构造函数创建一个屏幕外的图片对象，之后将该对象的src属性设置成期望的url
    - 脚本化音频和视频
      ```html
      <audio src="backg.mp3" />
      <video src="new.mov" width=320 heigth=240 />
      <audio id="music" controls >
          <source src="music.mp3" type="audio/mpeg">
          <source src="music.ogg" type="audio/ogg; codec='vorbis'">
      </audio>
      ```
    - svg 
    - canvas
      ```js
      // 获取画布
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext();
      // 画线
      ctx.beginPath();
      c.moveTo(100, 100);
      c.lineTo(200, 200);
      c.lineTo(100, 200);
      c.closePath();
      // 设置属性控制图形外观
      c.fillStyle = '#ccc';
      c.strokeStyle = '#008';
      c.stroke();
      c.fill();
      // 保存和恢复
      c.save();
      c.restore();
      // 坐标变换，图形，图片，像素操作等
      ```
10. HTML5 API
    - 地理位置：navigator.geolocation.getCurrentPosition()；navigator.geolocation.watchPosition()；navigator.geoloaction.clearWatch()
    - 历史记录管理
      1) location.hash 和 window.onhashchange事件  
      2) history.pushState() 与 history.replaceState()  --参数为state对象、可选的标题、可选的url  
      3) window.onpopstate事件(event对象存在state对象，为pushState传入的)
    - 跨域消息传递：  possMessage() (window对象方法)  与 message事件 (window对象事件)
    - Web Worker 对象
    - 文件系统
    - Web套接字
      ```js
      var socket = new WebSocket('ws://ws.example.com:1234/resource');
      socket.onopen = function(e){/* 套接字已经连接 */};
      socket.onclose = function(e){/* 套接字已经关闭 */};
      socket.onerror = function(e){/* 出错了 */};
      socket.onmessage = function(e){
          var msg = e.data; /* 服务器发送了一条消息 */
      }
      socket.send('hello serve!');
      ```