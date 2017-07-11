# three-dragcontrols

## Installation

```bash
npm install three-dragcontrols
```

## Usage

```javascript
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';
import DragControls from 'three-dragcontrols';

const scene = new Scene();
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 1000;

const renderer = new WebGLRenderer({antialias: true});
renderer.setClearColor(0xf0f0f0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.sortObjects = false;
document.body.appendChild(renderer.domElement);

const objects = [];
const geometry = new BoxGeometry(40, 40, 40);

for (let i = 0; i < 2; i++) {
  const object = new Mesh(geometry, new MeshBasicMaterial({color: Math.random() * 0xffffff}));
  object.position.x = Math.random() * 1000 - 500;
  object.position.y = Math.random() * 600 - 300;
  object.position.z = Math.random() * 800 - 400;
  object.rotation.x = Math.random() * 2 * Math.PI;
  object.rotation.y = Math.random() * 2 * Math.PI;
  object.rotation.z = Math.random() * 2 * Math.PI;
  object.scale.x = Math.random() * 2 + 1;
  object.scale.y = Math.random() * 2 + 1;
  object.scale.z = Math.random() * 2 + 1;
  scene.add(object);
  objects.push(object);
}

const dragControls = new DragControls(objects, camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```