// Imports
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

// Configuracion basica
let gui = undefined;
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
let spotLight;

// Variables generales
let countCube = undefined;
// let countSphere = undefined;
let GUIFolderCube = 1;

// Arreglos de objetos
const objectsCube = [];
const objectsSphere = [];
const objectsLight = [];

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

export function reset() {
  scene.children = [];
  renderer.setSize(0, 0, true);
  countCube = 0;
  GUIFolderCube = 1;
}

export function main(optionSize) {
  reset();
  // Configuracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 15;
  camera.position.y = 15;

  // Controls
  new OrbitControls(camera, renderer.domElement);

  // Plano por defecto
  defaultPlane(optionSize);

  // GUI
  loadGUI();

  // Light
  setupLights();

  // Render
  animate();
}

//
function defaultPlane(size) {
  const geometry = new THREE.PlaneGeometry(size, size, size, size);
  const material = new THREE.MeshBasicMaterial({
    color: '#f1c40f',
    side: THREE.DoubleSide,
    wireframe: true,
  });
  plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
  plane.receiveShadow = true;
  plane.rotation.x = Math.PI / 2;
}

//
function loadGUI() {
  cleanGUI();
  gui = new dat.GUI();
  gui.open();
}

// Limpia el GUI
export function cleanGUI() {
  const dom = document.querySelector('.dg.main');
  if (dom) dom.remove();
}

//
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
  _updateCubes();
  // _updateSpheres();
  // _updateLights();
}

export function createCubeGeneric() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0xffaec0,
    wireframe: false,
  });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
  objectsCube.push(cube);
  cube.position.y = 0.5;
  cube.castShadow = true;
  cube.receiveShadow = true;

  cube.GUIcube = _cubeObject();
  _createCubeGUI(cube.GUIcube);

  countCube = countCube + 1;
}

function _cubeObject() {
  var GUIcube = {
    material: 'Basic',
    materialColor: 0xffaec0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    posX: 0,
    posY: 0.5,
    posZ: 0,
  };

  return GUIcube;
}

function _createCubeGUI(GUIcube) {
  const folder = gui.addFolder('Cube ' + GUIFolderCube);
  // Material
  folder.addColor(GUIcube, 'materialColor');
  folder.add(GUIcube, 'material', ['Basic', 'Phong', 'Lambert']);

  // Escala
  folder.add(GUIcube, 'scaleX');
  folder.add(GUIcube, 'scaleY');
  folder.add(GUIcube, 'scaleZ');

  // Posicion
  folder.add(GUIcube, 'posX');
  folder.add(GUIcube, 'posY');
  folder.add(GUIcube, 'posZ');

  GUIFolderCube = GUIFolderCube + 1;
}

function _updateCubes() {
  Object.keys(objectsCube).forEach((i) => {
    const cubeSelected = objectsCube[i];
    //Material cubo
    cubeSelected.GUIcube.material == 'Basic'
      ? (cubeSelected.material = new THREE.MeshBasicMaterial({
          color: cubeSelected.GUIcube.materialColor,
        }))
      : cubeSelected.GUIcube.material == 'Lambert'
      ? (cubeSelected.material = new THREE.MeshLambertMaterial({
          color: cubeSelected.GUIcube.materialColor,
        }))
      : (cubeSelected.material = new THREE.MeshPhongMaterial({
          color: cubeSelected.GUIcube.materialColor,
        }));

    //Escalar cubo
    cubeSelected.geometry = new THREE.BoxGeometry(
      cubeSelected.GUIcube.scaleX,
      cubeSelected.GUIcube.scaleY,
      cubeSelected.GUIcube.scaleZ,
    );

    //Posición
    cubeSelected.position.x = cubeSelected.GUIcube.posX;
    cubeSelected.position.y = cubeSelected.GUIcube.posY;
    cubeSelected.position.z = cubeSelected.GUIcube.posZ;
  });
}
