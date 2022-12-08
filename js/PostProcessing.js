import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import ThreeasyComponent from "Threeasy/component.js";

export default class PostProcessing extends ThreeasyComponent {
  constructor(app) {
    super(app);

    // POSTPROCESSING
    let composer = new EffectComposer(app.renderer);
    var renderPass = new RenderPass(app.scene, app.camera);
    composer.addPass(renderPass);
    let liquidShader = {
      uniforms: {
        tDiffuse: { value: null },
        amount: { value: 1.0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,

      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        void main() {
          float smoothstepStart = .1;
          float smoothstepEnd = .9;
          vec4 color = texture2D( tDiffuse, vUv );

          float r = smoothstep(smoothstepStart, smoothstepEnd, color.r);
          float g = smoothstep(smoothstepStart, smoothstepEnd, color.g);
          float b = smoothstep(smoothstepStart, smoothstepEnd, color.b);
          float a = color.a;
          
          gl_FragColor = vec4( r,g,b,a);
        }
      `,
    };
    let shader = new ShaderPass(liquidShader);
    composer.addPass(shader);
    app.render = () => composer.render();
  }
}
