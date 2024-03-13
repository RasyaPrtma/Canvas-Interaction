const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init()
});

const maxRadius = 50;
const color = [
  "red",
  "green",
  "orange",
  "purple",
  "yellow",
  "black",
  "pink",
  "violet",
  "blue",
  "lightyellow",
];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colors = color[Math.floor(Math.random() * color.length)];
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.colors;
    c.fill();
  }

  animate() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Mouse Interactive
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  }
}

let array = [];

function init() {
  array = [];
  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 3 + 1;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    array.push(new Circle(x, y, dx, dy, radius));
  }
}
init()

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < array.length; i++) {
    array[i].animate();
  }
}
animate();
