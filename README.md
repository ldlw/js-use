# js-use
An JS developer tool library for vue, react, mini-program, ect.

一个JS开发者工具库，可以在Vue、React、小程序等任何地方使用。



# 初衷

综合常见业务需求开发更便捷的函数库、工具类：

* 后续会完善文档和增加更多好用功能；
* 欢迎star、issue、pull requests，会进行更多改变；



# 如何使用呢？

## 1、npm安装依赖

```shell
npm install js-use
```



## 2、事件总线（event-bus）

```js
const { EventBus } = require('js-use')

const eventBus = new EventBus()

const Callback1 = (...payload) => {
  console.log("Callback1:", payload)
}

const Callback2 = (...payload) => {
  console.log("Callback2:", payload)
}

const lileiCallback1 = (...payload) => {
  console.log("lileiCallback1:", payload)
}

eventBus.on("ldlw", Callback1)
eventBus.on("ldlw", Callback2)
eventBus.on('lilei', lileiCallback1)
eventBus.once("ldlw", (...payload) => {
  console.log("ldlw once:", payload)
})

setTimeout(() => {
  eventBus.emit("ldlw", "abc", "cba", "nba")
  eventBus.emit("lilei", "abc", "cba", "nba")
}, 1000);

setTimeout(() => {
  eventBus.off("ldlw", Callback1)
  eventBus.off("lilei", lileiCallback1)
}, 2000);

setTimeout(() => {
  eventBus.emit("ldlw")
  eventBus.emit("lilei")
}, 3000);
```





## 3、数据共享（event-store）

```js
const { EventStore } = require("js-use")
const axios = require('axios')

const eventStore = new EventStore({
  state: {
    name: "ldlw",
    friends: ["abc", "cba", "nba"],
    banners: [],
    recommends: []
  },
  actions: {
    getHomeMultidata(ctx) {
      axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
        const banner = res.data.data.banner
        const recommend = res.data.data.recommend
        // 赋值
        ctx.banners = banner
        ctx.recommends = recommend
      })
    }
  }
})

// 数据监听
eventStore.onState("name", (value) => {
  console.log("监听name:", value)
})

eventStore.onState("friends", (value) => {
  console.log("监听friends:", value)
})

eventStore.onState("banners", (value) => {
  console.log("监听banners:", value)
})

eventStore.onState("recommends", (value) => {
  console.log("监听recommends", value)
})

// 数据变化
setTimeout(() => {
  eventStore.setState("name", "lilei")
  eventStore.setState("friends", ["kobe", "james"])
}, 1000);

eventStore.dispatch("getHomeMultidata")
```



