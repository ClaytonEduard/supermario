/* Seletores dos elementos */
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const cloud = document.querySelector(".cloud");
const gameOver = document.querySelector(".game-over");
const restartButton = document.querySelector(".restart");
const scoreDisplay = document.querySelector(".score");

let jumpCount = 0; // Contador de pulos
let score = 0; // Pontuação
let speedMultiplier = 1; // Multiplicador de velocidade inicial
let gameActive = true; // Status do jogo
let gameLoop; // Variável para armazenar o loop principal

// Função de pular
const jump = () => {
  if (gameActive) {
    mario.classList.add("jump");
    jumpCount++; // Incrementa o contador de pulos
    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

// Função para iniciar o loop principal do jogo
const startGameLoop = () => {
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
    const cloudPosition = +window
      .getComputedStyle(cloud)
      .left.replace("px", "");

    // Detecta colisão
    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
      endGame(pipePosition, marioPosition, cloudPosition);
    } else if (gameActive) {
      // Aumenta a velocidade e o score com o tempo
      speedMultiplier += 0.0001; // Incremento gradual de velocidade
      pipe.style.animationDuration = `${1.2 / speedMultiplier}s`;
      score += 1; // Incrementa o score

      // Atualiza a pontuação na tela
      scoreDisplay.textContent = `Score: ${score}`;
    }
  }, 10);
};

// Função para finalizar o jogo
const endGame = (pipePosition, marioPosition, cloudPosition) => {
  gameActive = false; // Pausa o jogo
  clearInterval(gameLoop); // Para o loop principal

  // Exibe a tela de game over e a pontuação final
  gameOver.style.visibility = "visible";
  scoreDisplay.textContent = `Final Score: ${score}`;

  // Configura o visual de game over
  pipe.style.animation = "none";
  pipe.style.left = `${pipePosition}px`;

  mario.style.animation = "none";
  mario.style.bottom = `${marioPosition}px`;
  mario.src = "./assets/imgs/game-over.png";
  mario.style.width = "70px";
  mario.style.marginLeft = "35px";

  cloud.style.animation = "cloud 20s infinite linear";
  cloud.style.left = `${cloudPosition}px`;
};

// Função para reiniciar o jogo
const restart = () => {
  // Redefine variáveis
  gameActive = true;
  jumpCount = 0;
  score = 0;
  speedMultiplier = 1;
  gameOver.style.visibility = "hidden";
  scoreDisplay.textContent = "Score: 0";

  // Redefine estilos dos elementos
  pipe.style.animation = "pipe-animations 1.5s infinite linear";
  pipe.style.left = ``;

  mario.src = "./assets/imgs/mario.gif";
  mario.style.width = "130px";
  mario.style.bottom = "0px";
  mario.style.marginLeft = "";
  mario.style.animation = "";

  cloud.style.left = ``;

  // Reinicia o loop do jogo
  startGameLoop();
};

// Eventos de teclado e toque
document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);
restartButton.addEventListener("click", restart);

// Inicia o jogo ao carregar a página
startGameLoop();
