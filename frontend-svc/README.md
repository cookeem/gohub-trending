## 创建相关目录
```sh
$ mkdir react-webpack-demo
$ cd react-webpack-demo/
```

## 进行npm初始化
```sh
$ npm init -y
```

## npm安装相关依赖，本地模式
```sh
npm install webpack --save
npm install webpack-dev-server --save
npm install webpack-cli --save-dev
npm install react react-dom react-router-dom --save
npm install react-tap-event-plugin --save
npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save
npm install material-ui --save
npm install react-redux redux --save
npm install @material-ui/core --save
npm install @material-ui/icons --save
```

## 在package.json文件中，添加scripts部分描述，相当于增加start、build指令
- ```webpack --progress -p```可以有效压缩bundle.js的大小
- -p 参数：shortcut for --optimize-minimize --define
```sh
$ vi package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --hot",
    "build": "webpack",
    "production": "webpack -p"
  },
```

## 创建webpack配置文件：webpack.config.js

## 创建index.html文件

## 创建main.jsx文件

## npm进行打包，此时会把react、react-dom、babel打包生成index.js文件
```sh
$ npm run build
```

## npm启动测试服务，访问http://localhost:8080/
```sh
$ npm run start
```

---
## 注意，material-ui 0.18.0版本用webpack打包有问题，建议升级为0.18.1版本，修改```package.json```
```sh
"material-ui": "^0.18.1",
```

## npm使用```package.json```直接安装相关依赖
```sh
npm install 
```

## webpack调试

- 使用webpack检查依赖包，按照依赖包大小进行排序，最后的文件最大
```sh
$ webpack --display-modules --sort-modules-by size
Hash: 05ac7f528cdbce423cca
Version: webpack 2.4.1
Time: 2094ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  737 kB       0  [emitted]  [big]  main
  [81] ./~/react/react.js 56 bytes {0} [built]
  [80] ./~/react-dom/index.js 59 bytes {0} [built]
 [144] ./~/react-dom/lib/ReactVersion.js 350 bytes {0} [built]
 [177] ./~/react/lib/ReactVersion.js 350 bytes {0} [built]
 [168] ./~/react-dom/lib/renderSubtreeIntoContainer.js 422 bytes {0} [built]
  [58] ./~/react-dom/lib/ReactDOMComponentFlags.js 429 bytes {0} [built]
  [54] ./~/prop-types/lib/ReactPropTypesSecret.js 436 bytes {0} [built]
 [179] ./~/react/lib/getNextDebugID.js 437 bytes {0} [built]
 [116] ./~/react-dom/lib/ReactDOMFeatureFlags.js 439 bytes {0} [built]
 [175] ./~/react/lib/ReactPropTypesSecret.js 442 bytes {0} [built]
  [66] ./~/react-dom/lib/ReactPropTypesSecret.js 442 bytes {0} [built]
...
  [26] ./~/react-dom/lib/ReactBrowserEventEmitter.js 12.6 kB {0} [built]
 [118] ./~/react-dom/lib/ReactDOMInput.js 13 kB {0} [built]
 [101] ./~/react-dom/lib/BeforeInputEventPlugin.js 13.3 kB {0} [built]
  [47] ./~/react-dom/lib/validateDOMNesting.js 13.7 kB {0} [built]
 [137] ./~/react-dom/lib/ReactMultiChild.js 14.6 kB {0} [built]
  [98] ./~/prop-types/factoryWithTypeCheckers.js 17.6 kB {0} [built]
  [64] ./~/react-dom/lib/ReactMount.js 25.5 kB {0} [built]
 [172] ./~/react/lib/ReactClass.js 26.9 kB {0} [built]
 [111] ./~/react-dom/lib/ReactCompositeComponent.js 35.2 kB {0} [built]
 [113] ./~/react-dom/lib/ReactDOMComponent.js 38.5 kB {0} [built]
```

## webpack设置NODE_ENV为production的问题

- material-ui如果使用webpack默认的```--optimize-minimize```压缩参数进行minify会出现压缩异常，如果设置```--define process.env.NODE_ENV="'production'"```参数，会自动调用默认的压缩参数进行压缩

- 必须在```webpack.config.js```文件中设置```webpack.optimize.UglifyJsPlugin```插件进行压缩，才能解决material-ui的压缩异常

- 为解决react提示的production warning，必须手工替换```js/bundle.js```文件如下信息：

> ```"production"!==t.env.NODE_ENV&&function()```为```false&&function()```