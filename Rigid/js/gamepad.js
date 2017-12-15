// window.addEventListener("gamepadconnected", gamepadconnected);
//
// function gamepadconnected(e){
//   console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
//     e.gamepad.index, e.gamepad.id,
//     e.gamepad.buttons.length, e.gamepad.axes.length);
//     control = new Gamepad();
//     window.removeEventListener("gamepadconnected", gamepadconnected);
// }

function Gamepad(){

  //gamepad = g;
  var scope = this;
  var gamepad;
  this.direct = { x: 0, y: 0 };
  ACCELERATE = false;

  this.connect = function(){

  }

  this.disconnect = function(){

  }

  this.update = function(){
    gamepad = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if(gamepad[0] != null){
    gamepad = gamepad[0];

    var x = ( Math.abs(gamepad.axes[0]) < 0.005 ) ? 0
    : gamepad.axes[0] * -0.008;
    radian = x;
    this.direct.x *= 0.9;


    ACCELERATE = gamepad.buttons[1].pressed
    BRAKE = gamepad.buttons[2].pressed

    if(gamepad.buttons[0].pressed){
      reset();
    }
    }
  }

}
