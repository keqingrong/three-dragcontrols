import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  AmbientLight,
  SpotLight,
  LightShadow,
  PCFShadowMap
} from 'three';
import './app.css';
import DragControls from 'three-dragcontrols';

let camera, scene, renderer;
const objects = [];

function init() {
  scene = new Scene();
  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1000;

  scene.add(new AmbientLight(0x505050));
  const light = new SpotLight(0xffffff, 1.5);
  light.position.set(0, 500, 2000);
  light.castShadow = true;
  light.shadow = new LightShadow(new PerspectiveCamera(50, 1, 200, 10000));
  light.shadow.bias = -0.00022;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);

  const geometry = new BoxGeometry(40, 40, 40);
  for (let i = 0; i < 2; i++) {
    const object = new Mesh(geometry, new MeshLambertMaterial({color: Math.random() * 0xffffff}));
    object.position.x = Math.random() * 1000 - 500;
    object.position.y = Math.random() * 600 - 300;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    object.scale.x = Math.random() * 2 + 1;
    object.scale.y = Math.random() * 2 + 1;
    object.scale.z = Math.random() * 2 + 1;
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    objects.push(object);
  }

  renderer = new WebGLRenderer({antialias: true});
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  document.body.appendChild(renderer.domElement);

  const dragControls = new DragControls(objects, camera, renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();