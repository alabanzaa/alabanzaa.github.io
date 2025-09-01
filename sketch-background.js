// sketch-background.js - Background del jardim-florido
let backgroundCanvas;
let backgroundGraphics;

function setupBackground() {
  // Crear canvas de background separado
  backgroundCanvas = createGraphics(windowWidth, windowHeight);
  backgroundGraphics = backgroundCanvas;
  
  // Inicializar sistemas del jardim-florido
  initializeWeft();
  
  // Crear flores iniciales
  for (let i = 0; i < 8; i++) {
    createFlower(random(width), random(height));
  }
}

function drawBackground() {
  // Limpiar canvas de background
  backgroundGraphics.clear();
  
  // Fondo con efecto de trazo
  backgroundGraphics.fill(0, 15);
  backgroundGraphics.rect(0, 0, width, height);
  
  // Actualizar sistemas del jardim-florido
  updateWeft();
  updateFlowers();
  
  // Mostrar sistemas del jardim-florido en el canvas de background
  backgroundGraphics.push();
  backgroundGraphics.translate(0, 0);
  
  // Mostrar weft
  for (let line of weftLines) {
    backgroundGraphics.stroke(line.color[0], line.color[1], line.color[2], line.color[3]);
    backgroundGraphics.strokeWeight(2);
    backgroundGraphics.noFill();
    
    backgroundGraphics.beginShape();
    for (let x = 0; x <= width; x += 5) {
      let y = line.y + sin(x * line.frequency + line.offset) * line.amplitude;
      backgroundGraphics.vertex(x, y);
    }
    backgroundGraphics.endShape();
  }
  
  // Mostrar warp
  for (let line of warpLines) {
    backgroundGraphics.stroke(line.color[0], line.color[1], line.color[2], line.color[3]);
    backgroundGraphics.strokeWeight(2);
    backgroundGraphics.noFill();
    
    backgroundGraphics.beginShape();
    for (let y = 0; y <= height; y += 5) {
      let x = line.x + sin(y * line.frequency + line.offset) * line.amplitude;
      backgroundGraphics.vertex(x, y);
    }
    backgroundGraphics.endShape();
  }
  
  // Mostrar flores
  for (let flower of flowers) {
    backgroundGraphics.push();
    backgroundGraphics.translate(flower.x, flower.y);
    backgroundGraphics.rotate(flower.rotation);
    backgroundGraphics.scale(flower.growth);
    
    if (flower.growth >= flower.maxGrowth) {
      flower.growth = flower.maxGrowth;
    }
    
    switch(flower.type) {
      case 'rose':
        drawRoseBackground(backgroundGraphics, flower);
        break;
      case 'tulip':
        drawTulipBackground(backgroundGraphics, flower);
        break;
      case 'daisy':
        drawDaisyBackground(backgroundGraphics, flower);
        break;
      case 'lily':
        drawLilyBackground(backgroundGraphics, flower);
        break;
    }
    backgroundGraphics.pop();
  }
  
  backgroundGraphics.pop();
  
  // Agregar elementos del jardim-florido
  addWeftLine();
  addWarpLine();
  addRandomFlowers();
  
  // Limpiar elementos del jardim-florido
  cleanWeftLines();
  cleanOldFlowers();
}

function drawRoseBackground(g, flower) {
  // Centro de la rosa
  g.fill(255, 200, 200);
  g.ellipse(0, 0, flower.size * 0.3);
  
  // Pétalos en espiral
  for (let i = 0; i < flower.petals; i++) {
    let angle = (i / flower.petals) * TWO_PI;
    let petalSize = flower.size * 0.4;
    let x = cos(angle) * petalSize * 0.5;
    let y = sin(angle) * petalSize * 0.5;
    
    g.push();
    g.translate(x, y);
    g.rotate(angle);
    
    g.fill(flower.color[0], flower.color[1], flower.color[2], 150);
    g.ellipse(0, 0, petalSize, petalSize * 0.6);
    g.pop();
  }
}

function drawTulipBackground(g, flower) {
  // Tallo
  g.stroke(0, 150, 0);
  g.strokeWeight(2);
  g.line(0, 0, 0, flower.size);
  
  // Flor
  g.noStroke();
  g.fill(flower.color[0], flower.color[1], flower.color[2], 180);
  
  // Pétalos del tulipán
  for (let i = 0; i < 6; i++) {
    let angle = (i / 6) * TWO_PI;
    let x = cos(angle) * flower.size * 0.3;
    let y = sin(angle) * flower.size * 0.3;
    
    g.push();
    g.translate(x, y);
    g.rotate(angle);
    g.ellipse(0, 0, flower.size * 0.4, flower.size * 0.6);
    g.pop();
  }
}

function drawDaisyBackground(g, flower) {
  // Centro
  g.fill(255, 255, 0);
  g.ellipse(0, 0, flower.size * 0.3);
  
  // Pétalos
  for (let i = 0; i < flower.petals; i++) {
    let angle = (i / flower.petals) * TWO_PI;
    let x = cos(angle) * flower.size * 0.5;
    let y = sin(angle) * flower.size * 0.5;
    
    g.push();
    g.translate(x, y);
    g.rotate(angle);
    
    g.fill(255, 255, 255, 200);
    g.ellipse(0, 0, flower.size * 0.3, flower.size * 0.6);
    g.pop();
  }
}

function drawLilyBackground(g, flower) {
  // Pétalos del lirio
  for (let i = 0; i < 6; i++) {
    let angle = (i / 6) * TWO_PI;
    let x = cos(angle) * flower.size * 0.4;
    let y = sin(angle) * flower.size * 0.4;
    
    g.push();
    g.translate(x, y);
    g.rotate(angle);
    
    g.fill(flower.color[0], flower.color[1], flower.color[2], 160);
    g.ellipse(0, 0, flower.size * 0.5, flower.size * 0.8);
    g.pop();
  }
  
  // Centro
  g.fill(255, 255, 0);
  g.ellipse(0, 0, flower.size * 0.2);
}

function resizeBackground() {
  if (backgroundCanvas) {
    backgroundCanvas.resizeCanvas(windowWidth, windowHeight);
    
    // Reinicializar sistema del jardim-florido para nueva resolución
    weftLines = [];
    warpLines = [];
    flowers = [];
    initializeWeft();
    
    // Crear flores iniciales
    for (let i = 0; i < 8; i++) {
      createFlower(random(width), random(height));
    }
  }
}

