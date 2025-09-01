var contador = 0;
var dato = 1;
var rodatnoc = 0;
var otad = 1;
let hue = 0;

// noise field -

var ruido_inc = 0.004;
var density = 30;
var znoise = 0.0;

// offset

var angle = 0.0;
var speed = 0.0002;
var radius = 500.0;

var sx = 3.0;
var sy = 1.5;


// offset1

var angle1 = 0.0;
var speed1 = 0.0004;
var radius1 = 400.0;

var sx1 = 3.0;
var sy1 = 1.5;

//let value = 0;
/*
let value = false;
let value1 = false;
let value2 = false;
*/

let config = { 
  giraluna: false, // Q
  papalotl: false, // W    
  verde: false, // E
  toyo: false, // R
  sun: true, // T
  girasol: false, // Y
  liriodeagua: true, // U    
  raiz: true, // I - Siempre activa por defecto

  
  astr: false, // A
  nieve: false, // S
  rumor: false, // D
  sombra: false, // F
  dia: true, // 1
  ratito: false, // h
  voce: false
}


let words = [];

// Definir dos colores para las variaciones
let color1, color2;

// Sistema de párrafos
let currentParagraph = 0;
let targetParagraph = 0;
let paragraphTransition = 0;
let scrollCooldown = 0;
let isTransitioning = false;

// Párrafos reorganizados 
let paragraphs = [
  // Párrafo 1: solo alabanza
  [
    "alabanza"
  ],
  
  // Párrafo 2: [El poema es] + miedo + piedras
  [
    "[El poema es]",
    "el miedo que nos da recordar",
    "lo que hemos descubierto jugando entre las piedras"
  ],
  
  // Párrafo 3: recibir llamadas + puerta
  [
    "recibir llamadas desconocidas no preguntar ¿quién es?",
    "cuando tocan la puerta"
  ],
  
  // Párrafo 4: esperar visitas + guardar el secreto 
  [
    "esperar visitas de toda especie",
    "guardar el secreto en los ojos"
  ],
  
  // Párrafo 5: a quien se despide + lagrimales
  [
    "guardar ahí",
    "a quien se despide de ti:",
    "seres           que viven",
    "en los lagrimales"
  ],
  
  // Párrafo 6: lo que odiaste + que hace falta
  [
    "lo que odiaste",
    "de alguien más",
    "y ahora te   invade",
    "tanto como algo que hace falta"
  ],
  
  // Párrafo 7: no cualquier transeúnte + sonrisa
  [
    "no cualquier transeúnte notaría",
    "la  ausencia",
    "en   nuestra    sonrisa"
  ],
  
  // Párrafo 8: [el poema es] + estela + cosas
  [
    "[el poema es]",
    "esa estela también la prueba fehaciente de lo que",
    "nos toca",
    "aunque extraviamos las cosas."
  ],
  
  // Párrafo 9: una vida construída + puentes
  [
    "una vida construída",
    "en la escalera de emergencia,",
    "la posibilidad de crear puentes,"
  ],
  
  // Párrafo 10: la decisión + en el buzón 
  [
    "la decisión de estar aquí",
    "y no ser alguien que se esconde",
    "en el buzón",
    "de su propia puerta"
  ],
  
  // Párrafo 11: en el fondo + uñas
  [
    "en el fondo [El poema]",
    "se escribe      se encarna",
    "en las uñas"
  ],
  
  // Párrafo 12: y queda + final
  [
    "y queda",
    "la sensación de que siempre hay",
    "algo que",
    "no estás entendiendo."
  ]
];

function preload() {
  myFont = loadFont("data/intervogue-soft-medium 2.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont(myFont);
  
  // Definir los dos colores base (gris claro y gris casi blanco)
  color1 = color(0, 0, 0); // Gris claro
  color2 = color(70, 70, 70); // Gris casi blanco
  
  // Crear palabras para el párrafo actual
  createParagraphWords();
  
  // Configurar el scroll
  setupScroll();
  
  // Inicializar efectos del jardim-florido para el primer párrafo
  updateParagraphEffects();
}

function createParagraphWords() {
  words = []; // Limpiar palabras anteriores
  
  let currentLines = paragraphs[currentParagraph];
  
  // Caso especial para el primer párrafo (alabanza)
  if (currentParagraph === 0) {
    createAlabanzaLetters();
    return;
  }
  
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Calcular el alto total del párrafo para centrarlo verticalmente
  let totalHeight = currentLines.length * 120; // 120px por línea
  let startY = centerY - (totalHeight / 2) + 90; // Ajustado: bajado 40px (de +50 a +90)
  
  // Crear palabras para cada línea del párrafo actual
  for (let lineIndex = 0; lineIndex < currentLines.length; lineIndex++) {
    let line = currentLines[lineIndex];
    if (line.trim() === "") continue; // Saltar líneas vacías
    
    let wordsInLine = line.split(' ');
    
    // Calcular el ancho total de la línea para centrarla horizontalmente
    let lineWidth = wordsInLine.length * 75; // 75px por palabra
    let lineStartX = centerX - (lineWidth / 2);
    
    for (let wordIndex = 0; wordIndex < wordsInLine.length; wordIndex++) {
      let word = wordsInLine[wordIndex];
      if (word.length > 0) {
        words.push({
          text: word,
          x: lineStartX + (wordIndex * 75) + random(-20, 20),
          y: startY + (lineIndex * 100) + random(-10, 10), // Aumentado de 70 a 100px
          size: random(14, 24),
          rotation: random(-PI/8, PI/8),
          lerpAmount: random(0, 1),
          noiseOffsetX: random(1000),
          noiseOffsetY: random(1000),
          noiseOffsetR: random(1000),
          noiseSpeed: random(0.0002, 0.0008)
        });
      }
    }
  }
}

function createAlabanzaLetters() {
  // Crear letras individuales de "alabanza" distribuidas en el área central como en la imagen
  let letters = "alabanza".split('');
  let centerX = width / 2;
  let centerY = height / 2 + 10; // Ajustado: subido 40px (de +50 a +10)
  
  // Definir el área central donde se distribuirán las letras
  let areaWidth = 400; // Ancho del área central
  let areaHeight = 400; // Alto del área central
  
  // Posiciones más esparcidas como en la imagen
  let positions = [
    { x: centerX - areaWidth/3, y: centerY - areaHeight/3 },   // 'a' top-left
    { x: centerX, y: centerY - areaHeight/2.5 },               // 'l' top-center
    { x: centerX + areaWidth/4, y: centerY - areaHeight/6 },   // 'a' top-right (más cerca de la b)
    { x: centerX - areaWidth/2.5, y: centerY },                // 'b' mid-left
    { x: centerX + areaWidth/2.5, y: centerY - areaHeight/8 }, // 'a' mid-right
    { x: centerX, y: centerY + areaHeight/4 },                 // 'n' center-abajo (más abajo de la 4ª a)
    { x: centerX - areaWidth/4, y: centerY + areaHeight/2 },   // 'z' bottom-left (más abajo)
    { x: centerX + areaWidth/4, y: centerY + areaHeight/2 }    // 'a' bottom-right (más abajo)
  ];
  
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let pos = positions[i];
    
    words.push({
      text: letter,
      x: pos.x + random(-30, 30),
      y: pos.y + random(-25, 25),
      size: random(28, 40),
      rotation: random(-PI/8, PI/8),
      lerpAmount: random(0, 1),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000),
      noiseOffsetR: random(1000),
      noiseSpeed: random(0.0002, 0.0008)
    });
  }
}

function setupScroll() {
  // Event listener para el scroll del mouse con debounce mejorado
  window.addEventListener('wheel', (event) => {
    // Evitar cambios si estamos en transición o en cooldown
    if (isTransitioning || scrollCooldown > 0) {
      event.preventDefault();
      return;
    }
    
    // Detectar dirección del scroll
    if (event.deltaY > 0) {
      // Scroll hacia abajo - siguiente párrafo
      let nextParagraph = constrain(currentParagraph + 1, 0, paragraphs.length - 1);
      if (nextParagraph !== currentParagraph) {
        targetParagraph = nextParagraph;
        paragraphTransition = 0;
        isTransitioning = true;
        scrollCooldown = 90; // Aumentado a 90 frames para mayor precisión
        console.log('Scroll hacia abajo - Párrafo:', targetParagraph + 1);
      }
    } else if (event.deltaY < 0) {
      // Scroll hacia arriba - párrafo anterior
      let prevParagraph = constrain(currentParagraph - 1, 0, paragraphs.length - 1);
      if (prevParagraph !== currentParagraph) {
        targetParagraph = prevParagraph;
        paragraphTransition = 0;
        isTransitioning = true;
        scrollCooldown = 90; // Aumentado a 90 frames para mayor precisión
        console.log('Scroll hacia arriba - Párrafo:', targetParagraph + 1);
      }
    }
  }, { passive: false }); // Importante para poder prevenir el comportamiento por defecto
  
  // Event listener para teclas de flecha como respaldo
  window.addEventListener('keydown', (event) => {
    // Evitar cambios si estamos en transición o en cooldown
    if (isTransitioning || scrollCooldown > 0) {
      return;
    }
    
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      // Siguiente párrafo
      let nextParagraph = constrain(currentParagraph + 1, 0, paragraphs.length - 1);
      if (nextParagraph !== currentParagraph) {
        targetParagraph = nextParagraph;
        paragraphTransition = 0;
        isTransitioning = true;
        scrollCooldown = 60;
        console.log('Tecla abajo - Párrafo:', targetParagraph + 1);
      }
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      // Párrafo anterior
      let prevParagraph = constrain(currentParagraph - 1, 0, paragraphs.length - 1);
      if (prevParagraph !== currentParagraph) {
        targetParagraph = prevParagraph;
        paragraphTransition = 0;
        isTransitioning = true;
        scrollCooldown = 60;
        console.log('Tecla arriba - Párrafo:', targetParagraph + 1);
      }
    }
  });
}

function updateTransitions() {
  // Actualizar cooldown del scroll
  if (scrollCooldown > 0) {
    scrollCooldown--;
  }
  
  // Actualizar transición de párrafo
  if (isTransitioning) {
    paragraphTransition += 0.015; // Transición aún más lenta para mayor control
    
    if (paragraphTransition >= 1) {
      // Transición completada
      currentParagraph = targetParagraph;
      paragraphTransition = 0;
      isTransitioning = false;
      
      // Crear nuevas palabras para el nuevo párrafo
      createParagraphWords();
      
      // Actualizar efectos del jardim-florido según el nuevo párrafo
      updateParagraphEffects();
    }
  }
}

function updateParagraphEffects() {
  // Desactivar todos los efectos primero (excepto raiz que siempre está activa)
  config.giraluna = false;
  config.papalotl = false;
  config.verde = false;
  config.toyo = false;
  config.sun = false;
  config.girasol = false;
  config.liriodeagua = false;
  // config.raiz = false; // NO desactivar - siempre activa
  config.astr = false;
  config.nieve = false;
  config.rumor = false;
  config.sombra = false;
  config.ratito = false;
  config.voce = false;
  config.dia = false;
  
  // Activar efectos específicos según el párrafo actual
  switch(currentParagraph) {
    case 0: // "alabanza"
      // Solo raíz activa (ya está activa por defecto)
      break;
    case 1: // Párrafo 2: miedo, piedras
      config.giraluna = true; // Q - Luna girando
      break;
    case 2: // Párrafo 3: recibir llamadas, puerta
      config.papalotl = true; // W - Mariposa azul
      break;
    case 3: // Párrafo 4: esperar visitas, guardar secreto
      config.verde = true; // E - Verde orgánico
      break;
    case 4: // Párrafo 5: a quien se despide, lagrimales
      config.toyo = true; // R - Corazón morado
      break;
    case 5: // Párrafo 6: lo que odiaste, que hace falta
      config.sun = true; // T - Sol dorado
      break;
    case 6: // Párrafo 7: no cualquier transeúnte, sonrisa
      // Desactivar todas las flores (incluyendo raíz)
      config.giraluna = false;
      config.papalotl = false;
      config.verde = false;
      config.toyo = false;
      config.sun = false;
      config.girasol = false;
      config.liriodeagua = false;
      config.astr = false;
      config.nieve = false;
      config.rumor = false;
      config.sombra = false;
      config.raiz = true; // También desactivar raíz
      break;
    case 7: // Párrafo 8: estela, cosas
      config.raiz = true; // Reactivar raíz
      config.liriodeagua = true; // U - Lirio de agua
      break;
    case 8: // Párrafo 9: vida construída, puentes
      config.raiz = true; // Mantener raíz activa
      config.astr = true; // A - Estrellas cayendo
      break;
    case 9: // Párrafo 10: decisión, buzón
      config.raiz = true; // Mantener raíz activa
      config.nieve = true; // S - Nieve
      break;
    case 10: // Párrafo 11: en el fondo, uñas
      config.raiz = true; // Mantener raíz activa
      config.rumor = true; // D - Rumor
      break;
    case 11: // Párrafo 12: sensación, no entender
      config.raiz = true; // Mantener raíz activa
      config.sombra = true; // F - Sombra
      config.girasol = true; // Y - Girasol
      config.giraluna = true; // Q - Luna girando
      break;
  }
  
  // Efecto de fondo - solo día por ahora
  config.dia = true; // Mantener día activo
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
 
// jardim florido 

angle += speed;
angle1 += speed1;


hue = ++hue % 255;
contador = contador + dato;
rodatnoc = rodatnoc - dato;

if (contador <= 0) {
    dato = 0.5;
    contador += 0.5;
}


if (contador >= 100) {
    dato = -0.5;
    contador -= 0.5;
}



if (rodatnoc <= 0) {
    otad = 0.5;
    rodatnoc -= 0.5;
}


if (rodatnoc >= 20) {
    otad = -0.5;
    rodatnoc += 0.5;
}


var ruidoC4 = 0.00001;


if (config.dia) {
    push();
    noiseField();
    pop();
}


//keyReleased();


if (config.sun) {
    push();
    falling(); // el sol
    pop();
}


if (config.rumor) {
    push();
    fall4();
    pop();
}


if (config.toyo) {
    push();
    toyollo(); // el sol
    pop();
}

if (config.sombra) {
    push();
    fall_sombra();
    pop();
}

if (config.verde) {
    push();
    meumar(0, 0, 12, 140, 40);
    pop();
}

if (config.papalotl) {
    push();
    aguadebeber(0, 70, 212, 60, 150);
    pop();
}

if (config.girasol) {
    push();
    fall2();
    pop();
}

if (config.giraluna) {
    push();
fall();
    pop();
}

if (config.liriodeagua) {
    push();
    alcatraz();
    pop();
}

if (config.raiz) {
    push();
    enesima();
    pop();
}


if (config.astr) {
    push();
    weft3();
    pop();
}

if (config.nieve) {
    push();
    weft8();
    pop();
}


if (config.ratito) {
    push();
    quay();
    pop();
}

if (config.voce) {
    push();
    ondeandavoce(0, 0, 302, 590, 100);
    pop();
}

  
  // Actualizar transiciones y cooldowns
  updateTransitions();
  
  // Dibujar palabras del párrafo actual con movimiento
  for (let word of words) {
    push();
    
    // Movimiento independiente para cada palabra usando Perlin noise
    let noiseX = (noise(frameCount * word.noiseSpeed + word.noiseOffsetX) - 0.5) * 100;
    let noiseY = (noise(frameCount * word.noiseSpeed + word.noiseOffsetY) - 0.5) * 100;
    
    // Rotación sutil independiente
    let noiseRotation = (noise(frameCount * word.noiseSpeed * 1.5 + word.noiseOffsetR) - 0.5) * 0.8;
    
    translate(word.x + noiseX, word.y + noiseY);
    rotate(word.rotation + noiseRotation);
    
    // Usar lerp para interpolar entre los dos colores
    let currentColor = lerpColor(color1, color2, word.lerpAmount);
    
    // Aplicar opacidad basada en la transición
    let alpha = 255;
    if (isTransitioning) {
      if (paragraphTransition < 0.5) {
        // Fade out del párrafo actual
        alpha = map(paragraphTransition, 0, 0.5, 255, 0);
      } else {
        // Fade in del nuevo párrafo
        alpha = map(paragraphTransition, 0.5, 1, 0, 255);
      }
    }
    
    fill(red(currentColor), green(currentColor), blue(currentColor), alpha);
    textSize(word.size);
    text(word.text, 0, 0);
    pop();
  }
  
  // Mostrar indicador del párrafo actual
  push();
  fill(255, 150);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`${currentParagraph + 1} de ${paragraphs.length}`, 20, 20);
  text(`Scrollea suavemente o utiliza las flechas para desplazarte`, 20, 40);
  if (isTransitioning) {
    text(`${Math.round(paragraphTransition * 100)}%`, 20, 60);
  }
  
  // Mostrar efectos activos del jardim-florido
  textSize(12);
  textAlign(RIGHT, TOP);
  let activeEffects = [];
  if (config.dia) activeEffects.push("día");
  if (config.giraluna) activeEffects.push("Q-giraluna");
  if (config.papalotl) activeEffects.push("W-papalotl");
  if (config.verde) activeEffects.push("E-verde");
  if (config.toyo) activeEffects.push("R-toyollo");
  if (config.sun) activeEffects.push("T-sol");
  if (config.girasol) activeEffects.push("Y-girasol");
  if (config.liriodeagua) activeEffects.push("U-lirio");
  if (config.raiz) activeEffects.push("I-raíz");
  if (config.astr) activeEffects.push("A-astr");
  if (config.nieve) activeEffects.push("S-nieve");
  if (config.rumor) activeEffects.push("D-rumor");
  if (config.sombra) activeEffects.push("F-sombra");
  if (config.ratito) activeEffects.push("H-ratito");
  if (config.voce) activeEffects.push("G-voce");
  
      text(`Flores: ${activeEffects.join(", ")}`, width - 20, 20);
    //text(`Tecla 0: Reset automático | Teclas Q-W-E-R-T-Y-U-A-S-D-F-H-G: Manual | I siempre activa`, width - 20, 35);
    
    // Créditos en la esquina derecha de abajo
    textAlign(RIGHT, BOTTOM);
    textSize(12);
    fill(255, 200);
    text(`Alabanza (jardín florido) * Lola Langarica y Rodrigo Velasco`, width - 20, height - 20);
    
    pop();
  }

// funciones de jardim florido

function noiseField() {
  // noise field _
  push();

  var xnoise = 0.0;
  var ynoise = 0.0;

  for (var y = 0; y < height; y += density) {
      for (var x = 0; x < width; x += density) {
          var n = noise(xnoise, ynoise, znoise) * 255;
          noStroke();
          //fill(contador, n, contador);
          //fill(50, n, 200);
          fill(contador, 158, n);
          //fill(255, 178, n);

          rect(x, y, density, density);
          xnoise += ruido_inc;
      }
      xnoise += ruido_inc;
      ynoise += ruido_inc;
  }
  znoise += ruido_inc;
}


// Navegación por teclado combinada
function keyPressed() {
  // Evitar cambios si estamos en transición
  if (isTransitioning) return;
  
  // Controles del jardim-florido (manuales)
  if ((key == 'Q') || (key == 'q')) {
      config.giraluna = !config.giraluna;
  }

  if ((key == 'W') || (key == 'w')) {
      config.papalotl = !config.papalotl;
  }

  if ((key == 'E') || (key == 'e')) {
      config.verde = !config.verde;
  }

  if ((key == 'R') || (key == 'r')) {
      config.toyo = !config.toyo;
  }

  if ((key == 'T') || (key == 't')) {
      config.sun = !config.sun;
  }

  if ((key == 'Y') || (key == 'y')) {
      config.girasol = !config.girasol;
  }

  if ((key == 'U') || (key == 'u')) {
      config.liriodeagua = !config.liriodeagua;
  }

  if ((key == 'I') || (key == 'i')) {
      config.raiz = !config.raiz;
  }

  if ((key == 'A') || (key == 'a')) {
      config.astr = !config.astr;
  }

  if ((key == 'S') || (key == 's')) {
      config.nieve = !config.nieve;
  }

  if ((key == 'D') || (key == 'd')) {
      config.rumor = !config.rumor;
  }

  if ((key == 'F') || (key == 'f')) {
      config.sombra = !config.sombra;
  }

  if ((key == 'H') || (key == 'h')) {
      config.ratito = !config.ratito;
  }

  if ((key == 'G') || (key == 'g')) {
      config.voce = !config.voce;
  }

  if ((key == '1')) {
      config.dia = !config.dia;
  }


  // Tecla para resetear efectos automáticos
  if (key == '0') {
      updateParagraphEffects();
  }

  if (key == '9') {
      window.location.reload();
  }
  
  // Controles de navegación del poema
  if (keyCode === DOWN_ARROW || keyCode === 40) {
    // Ir al siguiente párrafo
    let nextParagraph = constrain(currentParagraph + 1, 0, paragraphs.length - 1);
    if (nextParagraph !== currentParagraph) {
      targetParagraph = nextParagraph;
      paragraphTransition = 0;
      isTransitioning = true;
      console.log('Tecla abajo - Párrafo:', targetParagraph + 1);
    }
    
    // Scroll automático
    let scrollAmount = (nextParagraph / (paragraphs.length - 1)) * (document.body.scrollHeight - windowHeight);
    window.scrollTo(0, scrollAmount);
  } else if (keyCode === UP_ARROW || keyCode === 38) {
    // Ir al párrafo anterior
    let prevParagraph = constrain(currentParagraph - 1, 0, paragraphs.length - 1);
    if (prevParagraph !== currentParagraph) {
      targetParagraph = prevParagraph;
      paragraphTransition = 0;
      isTransitioning = true;
      console.log('Tecla arriba - Párrafo:', targetParagraph + 1);
    }
    
    // Scroll automático
    let scrollAmount = (prevParagraph / (paragraphs.length - 1)) * (document.body.scrollHeight - windowHeight);
    window.scrollTo(0, scrollAmount);
  }
}
