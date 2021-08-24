import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();

// Paleta de colores
const palette = {
  bgColor: '#2c3e50', // CSS String
  planeColor: 0xffff00, // HEX
};

let spotLight;
let objects = {};

document.body.onload = () => {
  main();
};

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

function main() {
  // Configurracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 20;
  camera.position.y = 0;

  // Controls
  new OrbitControls(camera, renderer.domElement);

  // GUI
  loadGUI();

  // Light
  setupLights();

  const geometry = new THREE.PlaneGeometry(10, 10, 4);
  const material = new THREE.MeshBasicMaterial({
    color: palette.planeColor,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);

  objects.plano = plane;
  scene.add(plane);
  console.log(objects);

  animate();
}

function loadGUI() {
  const gui = new dat.GUI();

  const folder1 = gui.addFolder('Carpeta 1');
  folder1.open();

  /* var person = {
    name: 'Pepito',
    age: 45,
    favNumber: 4,
  };

  // Ejemplo de input de texto
  folder1.add(person, 'name');
  folder1.add(person, 'favNumber');
  // Ejemplo de slider
  folder1.add(person, 'age', 0, 100); */

  // Ejemplo de paleta de colores
  folder1.addColor(palette, 'bgColor');
  folder1.addColor(palette, 'planeColor');
}

function setupLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 10, 0);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;

  spotLight.castShadow = true;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);
  updateElements();
  renderer.render(scene, camera);
}

function updateElements() {
  renderer.setClearColor(palette.bgColor, 1);
  objects.plano.material.color = new THREE.Color(palette.planeColor);
}
