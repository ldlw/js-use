const { EventBus } = require('../src')

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
