![rollup-and-webpack.png](./public/rollup-and-webpack.png)

# Rollup vs Webpack

最近(2024-06-05)由于工作 OKR 项目原因逆向了两个 Webpack 构建的工程，用于研究具体实现原理。在这其中通过不断分析逆向后的源码对 Webpack 的构建产物 bundle.js 有了一个新的认识。这也顺带解开了一个一直困扰着我 Rollup 与 Webpack 同为 bundler 它们之间到底有什么不同？

## 从产物分析运作机制

Webpack 的产物是以遵循 commonjs 规范的方式组织代码，所以有 **模块中心(modules)、模块导出挂载点(module.exports)、模块加载函数(require)** 等概念。而这些概念在 Rollup 中统统没有，这也是两者最大的区别以及两者对模块与模块之间引入关系处理的不同，主要体现在模块之间的 interop。

```js
// Bundle with Webpack

var __webpack_modules__ = {
  // index.js
  0: (module, exports, __webpack_require__) => {
    const { add } = __webpack_require__(1)
    const sum = add(1 + 2)
  },
  // add.js
  1: (module, exports, __webpack_require__) => {
    function add(a, b) {
      return a + b
    }
    module.exports = { add };
  },
  ...
}

module.exports = __webpack_require__(0)
```

Rollup 的产物是完全基于标准的 ESModule 规范，没有任何隐式的 **外包装(commonjs外壳)** 代码；最直观的感受就是所见即所得，非常符合代码书写的直觉。

```js
// Bundle with Rollup

// add.js
function add(a, b) {
  return a + b
}

// index.js
const sum = add(1 + 2)
```

## 从 esm 与 cjs 角度看区别


cjs 即 `require()` 很多时候是不能兼容的，或者说强行兼容是会造成完全不可预测的 BUG；主要原因大概几点 **require 可以写在任意作用域、任何时候都是同步加载、id 可以是变量**。造成这个情况的原因不难理解，因为 `require()` 仅仅是普普通通的 javascript 函数，其行为、写法非常灵活。

esm 即 `import x from 'x'` 与 `import()`，这个 ESModule 标准提供的 `import` 限制就很致命，比如 **必须写在顶层作用域、id 必须是写死的字符串、导入成员必须有字面量标识(默认default)**，反观 `import()` 这货与 `require()` 行为基本大体一致(import()拼写是固定的，比如不能用 function.call 这种幺蛾子的东西)，唯一的区别是异步与同步的区别，但是这恰恰很致命！

cjs 与 esm 的模块相互操作有个学名叫 `interop`，这个是所有 bundler 都必须不得不面对的问题，这给打包带了了不少的麻烦！

> 关于 commonjs interop 我之前录过一个视频教程: [细讲⚡️vite-plugin-commonjs(上)](https://www.bilibili.com/video/BV1gm4y1e7zK/)

Rollup 默认只支持 esm 格式，这使本身能带来多种好处比如默认就能支持 tree-shake，构建代码很容易做到可见即所得。但是这也会稍微带来一些问题；比如在构建动态模块即 `import()` 如果将代码强行合并到 bundle.js 中，可能会由于顶层立即执行代码造成一些不可预测的副作用，毕竟没外壳代码嘛。

Webpack 两者都支持且构建格式为 cjs 这点就很讨巧；有个结论叫以 cjs 格式(加载方式)构建 bundle.js 完全兼容 esm 格式写法，但是反过来不行！这是由于上面说的两者 interop 的区别导致的一条死路！

## 顺带说说 vite-plugin-commonjs

这个为啥单拿出来说，因为它是我写的 =。=！  
它非常的暴力，关于上面说的 interop 问题 vite-plugin-commonjs 直接硬提升暴力变成了 import 引入；好处是终于兼容了 Vite 开发对 import 的强依赖，坏处是风险一点儿都没规避完全抛给了用户！别问我为啥这么做，因为没人这么做！

## 重头戏 C/C++ 模块

丑话说前头 **这玩意儿不是 Rollup 能构建的**，因为它是且只能是以 cjs 格式 binding 的，毕竟 C/C++ 构建后的二进制文件不能是想普通 js 那样对外导出字面量成员！那么就是说只能通过以 cjs 格式为构建目标的 bundler 才能构建它；但这也不是绝对的，通过一些奇怪的方式还是能使得 Rollup 能够支持 C/C++ 模块，后面会说。

Webpack 对于 .node 文件的构建非常简单，直接将 .node 文件复制到 dist 文件夹中，然后生成一块代码段 `require('./xxx.node')` 即可。这样在运行时 .node 文件将由 node.js 加载它。但是很多很多很多情况下，重要的词儿说三遍！C/C++ 的模块在 npm 仓库中躺着的 .node 文件都是由一些构建工具生成的，这里最最最常用的就是 node-gyp、node-pre-gyp 且它会固定生成类似 `build/Release/xxx.node` 这样的文件路径，所以这点就被一些 webpack loader 比如 `@vercel/webpack-asset-relocator-loader` 识别然后顺理成章的复制一下路径到 dist 中后，再在 bunlde.js 中注入一点关于路径查找的运行时代码，这样就能顺理成章的加载到 .node 文件。

```js
// 源码: https://github.com/vercel/webpack-asset-relocator-loader/blob/v1.7.4/src/asset-relocator.js#L207-L212

const staticModules = {
  ...
  'node-pre-gyp': pregyp,
  'node-pre-gyp/lib/pre-binding': pregyp,
  'node-pre-gyp/lib/pre-binding.js': pregyp,
  '@mapbox/node-pre-gyp': pregyp,
  '@mapbox/node-pre-gyp/lib/pre-binding': pregyp,
  '@mapbox/node-pre-gyp/lib/pre-binding.js': pregyp,
  ...
}
```

当然知道了这原理 Rollup 社区也有个开发者写了一个 `rollup-plugin-natives` 原理与上面介绍的大差不差，当然这里有个稍微讨巧的东西就是关于 `require()` 的处理绕开了 `@rollup/plugin-commonjs` 的处理。

```js
let require2 = rqeuire;
// Avoid rollup parse
require2('./xxx.node');
```

大体上，讲到这里关于 C/C++ 插件的构建就差不多了；稍微总结下就两点:

1. **如果一个包提供的 .node 文件直接被 require('./xx.node') 引入，那么直接复制 .node 文件即可** -- 参考 `fsevents`
2. **如果一个包提供的 .node 文件是被 node-gpy 等工具构建的，那么按照规律找到文件并复制即可** -- 参考 `sqlite3`

当然再说俩很特殊的，甚至 Webpack 也不能保障就能处理：

1. `serialport` 这个包目前 Webpack、Rollup 均处理不了，因为它不符合上述两点特性中的任意一个 -- [serialport/issues/2464](https://github.com/serialport/node-serialport/issues/2464)
2. 如果一个包对外暴露了可以动态配置 .node 文件查找路径的配置，那么也视为是无规律的，也即无法正常保障一定能正确构建，比如 `better-sqlite3`(当然默认走的 node-gpy 策略)。

那么关于特殊情况怎么打包？社区能找到给 Electron 提供方案的目前的唯一解是在 Webpack 中将 `serialport` 配置成 `external: { serialport: 'commonjs Serialport' }` 然后配合 electron-builder 构建 `serialport`，当然需要将 `serialport` 放到 package.json 中的 dependencies 中！说到这你可能猜到了解法 -- electron-builder 只是简单暴力的将 dependencies 的所有依赖以依赖树的形式深度查找，然后一股脑复制到 dist/node_modules 中，呵呵！当然如果你开发过 vscode 扩展的话，你会发现 @vscode/vsce 构建也是这路数，无脑将 dependencies 复制到产物文件夹的 node_modules 即可；剩下的交给 node.js 自己玩儿去吧 :)

## 多少有点拧巴

行文至此，可能你没看出来作者想表达什么，这可能仅仅是作者一些零散知识的碎片化输出，见仁见智！国内打工节奏太紧，希望未来能有个更好的输出环境！
