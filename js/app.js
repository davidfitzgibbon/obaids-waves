import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Threeasy from "threeasy";
import Circle from "./Circle.js";
import PostProcessing from "./PostProcessing.js";

let colors = ["#6092EF", "#A4F0F4", "#0DF6FF", "#45A9FF", "#6092EF", "#0DF6FF"];

window.app = new Threeasy(THREE);

app.renderer.setClearColor(0x000000, 0);

new OrbitControls(app.camera, app.renderer.domElement);

colors.forEach((color) => {
  new Circle(app, color);
});

new PostProcessing(app);
