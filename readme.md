# Rausenxs's Web Site

## Frontend description

### Based on vue.js

## Backend description

### Based on Django

## Working progress

1. 先在本机建立好开发环境：frontend和backend文件夹，想要做到**前后端分离**，参考如下两个教程：

https://www.cnblogs.com/zhixi/p/9996832.html

https://blog.csdn.net/qq_39785489/article/details/82751868

2. vue的简单学习

https://blog.csdn.net/IVanLyf/article/details/87930861

3. 解决vue只能通过vue-router来访问的问题：re_path和404页面来
现在可以输入url来访问页面了

https://www.jianshu.com/p/9eea64371692

4. vue axios(ajax)域名跨域问题

https://blog.csdn.net/wh_xmy/article/details/87705840

5. semantic-vue-ui的安装和使用

安装参考github下的 https://github.com/Semantic-UI-Vue/Semantic-UI-Vue 仓库，使用参考仓库中Example文件夹下的例子

6. 如何在前端webpack的情况下，动态路由不同的article地址：

https://www.jianshu.com/p/a72a1e946555

在testArticle.vue下有相关的例子，通过methods里的函数来传参 

7. 如何在例如注册页面的地方去除header和footer：

https://segmentfault.com/q/1010000018342611/

## Frontend src Structure

```
.
├── App.vue
├── assets
│   ├── logo.png
│   ├── rausenxs_16px.jpg
│   ├── rausenxs_184px.jpg
│   ├── rausenxs_32px.jpg
│   └── rausenxs_64px.jpg
├── components
│   ├── FootBar.vue           页脚
│   ├── HelloWorld.vue        测试component格式
│   ├── NavBar.vue            页眉
│   └── Test.vue              测试component格式
├── main.js
├── router
│   └── index.js              vue-router的部分
├── store
│   └── index.js
├── views
│   ├── About.vue             vue主页测试部分
│   ├── AjaxTest.vue          Ajax(Axios)测试部分
│   ├── Home.vue              vue主页测试部分
│   ├── PageNotFound.vue      404页面
│   ├── SemanticTestFixedMenu.vue   FixedMenu测试部分
│   ├── SemanticTestLogin.vue Login测试部分
│   ├── test.vue              基础语法测试
│   ├── testArticle.vue       Article测试
│   └── testNoHeader.vue      取消header和footer测试
└── vue.js
```

