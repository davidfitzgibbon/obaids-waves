import * as THREE from "three";
import ThreeasyComponent from "Threeasy/component.js";

export default class Circle extends ThreeasyComponent {
  constructor(app, color) {
    super(app);
    this.geometry = new THREE.CircleGeometry(1, 32);
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        color: { value: new THREE.Color(color) },
      },
      vertexShader: /*glsl*/ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `,

      fragmentShader: /*glsl*/ `
      uniform float amount;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      uniform vec3 color;
      void main() {
        vec2 pos = (vUv * 2.0)-1.0;
        vec3 alpha = vec3(1.0 - length(pos));

        gl_FragColor = vec4(color, alpha.x); 
    }
    `,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.app.scene.add(this.mesh);
  }
  randomMove() {
    return Math.random() * 0.1 - 0.05;
  }
  animate() {
    this.mesh.position.x += this.randomMove();
    this.mesh.position.y += this.randomMove();
  }
}
