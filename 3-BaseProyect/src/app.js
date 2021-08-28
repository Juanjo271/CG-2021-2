// Imports
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

// Configuracion basica
let size = 0;
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
  bgColor: '#34495e', // CSS String
};

let plane = undefined;
const objects = {};
const lights = {
  sp: undefined,
};

let spotLight;

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

export function main(optionSize) {
  size = optionSize;

  // Configuracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 15;
  camera.position.y = 15;

  // Controls
  new OrbitControls(camera, renderer.domElement);

  // GUI
  loadGUI();

  // Light
  setupLights();

  const geometry = new THREE.PlaneGeometry(size, size, size, size);
  const material = new THREE.MeshBasicMaterial({
    color: '#f1c40f',
    side: THREE.DoubleSide,
    wireframe: true,
  });
  plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
  plane.rotation.x = Math.PI / 2;

  // Render
  animate();
}

function loadGUI() {
  const gui = new dat.GUI();
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

function updateElements() {}
