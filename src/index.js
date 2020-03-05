import './styles/index.scss';

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');


const IDLE_MONKEY_PATH = '/src/img/idle'
const NUMBER_OF_IDLE_IMAGES = 17;
const DURATION = 1000;
const TIME_PER_FRAME = DURATION/NUMBER_OF_IDLE_IMAGES;

var timeWhenLastUpdate;
var timeFromLastUpdate;
var frameNumber = 0;



var monkey = {
    idle: new Image(),
    jumping: true,
    width: 100,
    height: 100,
    x_velocity: 0,
    y_velocity: 0,
    x: 100,
    y: 0,

}


const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
    }
  }
};



///////////////////
//IDLE Monkey//////
//////////////////


// function step(startTime){

// }

function step(startTime) {
// context.fillStyle='white';
// context.fillRect(0,0,canvas.width,canvas.height);

  if (!timeWhenLastUpdate) {
    timeWhenLastUpdate = startTime;
  }
  timeFromLastUpdate = startTime - timeWhenLastUpdate;
  if (timeFromLastUpdate > TIME_PER_FRAME) {
    monkey.idle.src = IDLE_MONKEY_PATH + "/idle_" + frameNumber + ".png";
    context.drawImage(
      monkey.idle,
      monkey.x,
      monkey.y,
      monkey.width,
      monkey.height
    );

    timeWhenLastUpdate = startTime;
    if (frameNumber >= NUMBER_OF_IDLE_IMAGES) {
      frameNumber = 0;
    } else {
      frameNumber++;
    }
  }

  if (controller.up && monkey.jumping == false) {
    monkey.y_velocity -= 20;
    monkey.jumping = true;
  }

  if (controller.left) {
    monkey.x_velocity -= 0.5;
  }

  if (controller.right) {
    monkey.x_velocity += 0.5;
  }

  monkey.y_velocity += 1.5; // gravity
  monkey.x += monkey.x_velocity;
  monkey.y += monkey.y_velocity;
  monkey.x_velocity *= 0.9; // friction
  monkey.y_velocity *= 0.9; // friction


    if (monkey.y > canvas.height - 16 - monkey.height) {
      monkey.jumping = false;
      monkey.y = canvas.height - 16 - monkey.height;
      monkey.y_velocity = 0;
    }
  requestAnimationFrame(step);
}













window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(step);
// window.requestAnimationFrame(loop);
