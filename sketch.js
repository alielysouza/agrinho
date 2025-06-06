let player;
let fruits = [];
let obstacles = [];
let city;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  player = new Player();
  city = new City();

  // Gerar frutas no campo
  for (let i = 0; i < 5; i++) {
    fruits.push(new Fruit(random(100, 700), random(100, 400)));
  }

  // Gerar obstáculos
  for (let i = 0; i < 3; i++) {
    obstacles.push(new Obstacle(random(300, 600), random(100, 500)));
  }
}

function draw() {
  background(135, 206, 235); // Céu azul claro

  if (gameOver) {
    textSize(32);
    fill(255, 0, 0);
    text("Jogo Acabado! Pontuação Final: " + score, width / 2 - 200, height / 2);
    return;
  }

  city.display();
  player.update();
  player.display();

  // Mostrar frutas
  for (let i = fruits.length - 1; i >= 0; i--) {
    fruits[i].display();

    // Verifica se o jogador pegou a fruta
    if (player.collidesWith(fruits[i])) {
      fruits.splice(i, 1);  // Remove a fruta coletada
      score += 10;  // Aumenta a pontuação
    }
  }

  // Mostrar obstáculos
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();

    // Verifica se o jogador bateu no obstáculo
    if (player.collidesWith(obstacles[i])) {
      gameOver = true;
    }
  }

  // Mostrar pontuação
  fill(0);
  textSize(24);
  text("Pontuação: " + score, 20, 30);

  // Mostrar instruções
  textSize(18);
  text("Use as setas para mover e pegar as frutas!", 20, height - 30);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-20, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(20, 0);
  } else if (keyCode === UP_ARROW) {
    player.move(0, -20);
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 20);
  }
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.size = 40;
  }

  update() {
    // Impede que o jogador saia da tela
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  display() {
    fill(139, 69, 19); // Cor marrom (representando o personagem)
    rect(this.x, this.y, this.size, this.size); // Personagem como um quadrado
  }

  collidesWith(obj) {
    return (
      this.x < obj.x + obj.size &&
      this.x + this.size > obj.x &&
      this.y < obj.y + obj.size &&
      this.y + this.size > obj.y
    );
  }
}

class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  display() {
    fill(255, 99, 71); // Cor laranja (representando uma fruta)
    ellipse(this.x, this.y, this.size, this.size); // Fruta como um círculo
  }
}

class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  display() {
    fill(0); // Cor preta (representando um obstáculo)
    rect(this.x, this.y, this.size, this.size); // Obstáculo como um quadrado
  }
}

class City {
  constructor() {
    this.x = 600;
    this.y = 100;
    this.width = 150;
    this.height = 150;
  }

  display() {
    fill(169, 169, 169); // Cor cinza (representando a cidade)
    rect(this.x, this.y, this.width, this.height); // Representação da cidade
    fill(255);
    textSize(18);
    text("Cidade", this.x + 40, this.y + 80);
  }
}
