import Vue from "nativescript-vue";

import Home from "./components/Home";

Vue.registerElement(
  "LineChart",
  () => require("@nativescript-community/ui-chart/charts").LineChart
);

import { install as installGestures } from "@nativescript-community/gesturehandler";
installGestures();

new Vue({
  render: (h) => h("frame", [h(Home)]),
}).$start();
