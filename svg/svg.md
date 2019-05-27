# svg知识点

```xhtml
    <?xml version="1.0" standalone="no"?>
    <?xml-stylesheet type="text/css" href="style.css"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">
        <!-- code -->
      </style>
      <circle cx="100" cy="100" r="40"></circle>
      <circle cx="100" cy="100" r="30"></circle>
      <circle cx="100" cy="100" r="20"></circle>
      <circle cx="100" cy="100" r="10"></circle>
    </svg>
```

>>>
    version表示使用1.0版本的XML
    standalone属性规定该文件是否是“独立的”。standalone="no" 意味着会引用一个外部文件，在这里是DTD文件
>>>

[fill-rule渲染规则](https://blog.csdn.net/wjnf012/article/details/72875739)

[symbol和defs的区别](https://blog.csdn.net/chy555chy/article/details/53364561)

[相关知识传送门](https://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/)

> path  M(move to) L(line to) Z(close path) H(水平移动) V(垂直移动)

> path m l h v小写代表相对坐标

> 椭圆弧命令  (A | a)  rx  ry x-axis-rotation large-arc-flag sweep-flag x y
