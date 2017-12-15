window.onload = init;
window.onresize = resize;

var scene, camera, renderer, control, menu, vehicle, stage, update, menu, gamepad;

var MENU = false;
var WIREFRAME = true;
var UI = [];

var origin, up;

var ACC = { id: 'Acceleration', value: 30, lo: 20, hi: 60 };
var GRIP = { id: 'Drift', value: 98, lo: 97, hi: 99 };
var STEER = { id: 'Steering', value: 45, lo: 0, hi: 100 };

var TONE = { id: 'Tone', value: 50, lo: 20, hi: 360 };

var INVERT = -1;

var ASSETS = [];

function init(){

  scene    = new THREE.Scene();
  camera   = new THREE.PerspectiveCamera( 140, window.innerWidth / window.innerHeight, 0.01, 120000 );
  renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true});

  origin = new THREE.Vector3(0,0,0);
  up     = new THREE.Vector3(0,0,1);

  document.body.appendChild( renderer.domElement );
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.zIndex = 0;

  // document.addEventListener("contextmenu", function(e){
  //     e.preventDefault();
  // }, false);

  resize();

  var gamepad = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  control = ( gamepad[0] == null ) ? new Control()
  : new Gamepad()

  stage   = new Stage();
  vehicle = new Vehicle();
  menu    = new Menu();
  audio   = new Audio();

  connect();
  main();
}

function connect(){
  menu.connect();
  stage.connect(1);
  vehicle.connect(stage.start, stage.angle);
  vehicle.mesh.rotateOnAxis(up, -Math.PI/2)
  camera.position.set(0,-30,20);
  camera.updateProjectionMatrix();
  update = title_loop;
}

function title(){
  menu.start = 'start';
  menu.disconnect();
  menu.connect();
  camera.position.set(0,-4000,4000);
  document.body.style.cursor ="default";
  update = title_loop;
}

function disconnect(){
  control.connect();
  vehicle.disconnect();
  vehicle.connect(stage.start, stage.angle);
  document.body.style.cursor ="none";
  update = game_loop;
}

function reset(){
  control.disconnect();
  // audio.disconnect();
  menu.start = 'restart';
  menu.connect();
  document.body.style.cursor ="default";
}

function game_loop(){
  control.update();
  vehicle.update();
  // audio.update();
  renderer.render(scene,camera);
}

function title_loop(){
  camera.position.applyAxisAngle(up, 0.002);
  camera.lookAt(origin);
  renderer.render(scene,camera);
}

function resize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(1);
    console.log('Resize');
}

function main(){
  window.requestAnimationFrame(main);
  update();
}
