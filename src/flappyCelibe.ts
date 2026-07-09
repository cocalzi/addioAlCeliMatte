// Impostazioni e costanti globali per bilanciare il gioco
let GRAVITY = 1500;
const JUMP_STRENGTH = -450;
const PIPE_SPEED = 180;
//const PIPE_SPAWN_RATE = 150; // Quanti frame passano prima di generare un nuovo tubo
const PIPE_SPAWN_INTERVAL = 2.0; //Intervallo in secondi
const PIPE_WIDTH = 60;
const PIPE_GAP = 140; // Spazio verticale in cui lo sposo deve passare
const SCORE_GOAL = 10;


let animationFrameId: number | null = null;
let boundPointerListener: (() => void) | null = null;
let scoreLabel: HTMLLabelElement | null = null;
let soundtrack: SoundEffect | null = null;

// --- CLASSI ---

class GroomBird {
    public x: number = 0;
    public y: number = 0;

    public radius: number = 15;
    public velocity: number = 0;

    private imageJump1: HTMLImageElement;
    private imageJump2: HTMLImageElement;
    private imageFall1: HTMLImageElement;
    private imageFall2: HTMLImageElement;
    private imageHurt: HTMLImageElement;


    // private spriteWidth: number = 120; //------------CONTROLLARE // Regola in base a quanto vuoi farlo grande a schermo
    private spriteHeight: number = 120;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = canvasWidth / 10;
        this.y = canvasHeight / 2;

        this.imageJump1 = new Image();
        this.imageJump1.src = './resources/matteJump1.png';

        this.imageJump2 = new Image();
        this.imageJump2.src = './resources/matteJump2.png';

        this.imageFall1 = new Image();
        this.imageFall1.src = './resources/matteFall1.png';

        this.imageFall2 = new Image();
        this.imageFall2.src = './resources/matteFall2.png';

        this.imageHurt = new Image();
        this.imageHurt.src = './resources/matteHurt.png';
    }

    public draw(ctx: CanvasRenderingContext2D, isGameOver: boolean): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#007BFF"; // Sposo (Blu)
        ctx.fill();
        ctx.closePath();

        let currImage: HTMLImageElement;



        // Calcoliamo le coordinate per disegnare l'immagine in modo 
        // che il suo centro coincida esattamente con le coordinate x e y della hitbox
        //const drawX = this.x - this.spriteWidth / 2; //------------CONTROLLARE
        //const drawY = this.y - this.spriteHeight / 2;


        if (this.velocity > 0) {
            if (this.velocity > 300) {
                currImage = this.imageFall2
            } else {
                currImage = this.imageFall1;
            }
        } else {
            if (this.velocity >= -100) {
                currImage = this.imageJump2;
            } else {
                currImage = this.imageJump1;
            }
        }
        if (isGameOver) currImage = this.imageHurt;

        const aspectRatio = currImage.width / currImage.height;
        const targetWidth = this.spriteHeight * aspectRatio;

        const ROTATION_MULTIPLIER = 0.0005;
        let angle = this.velocity > 0 ? this.velocity * ROTATION_MULTIPLIER : 0;


        if (angle > Math.PI / 2) angle = Math.PI / 2;
        if (angle < -Math.PI / 4) angle = -Math.PI / 4;

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate(angle);

        //ctx.drawImage(currImage, drawX, drawY, this.spriteWidth, this.spriteHeight);
        ctx.drawImage(currImage, -targetWidth / 2, -this.spriteHeight / 2, targetWidth, this.spriteHeight);
        ctx.restore();
        /*
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
                ctx.fill();
                ctx.closePath();
        */
    }

    public update(deltaTime: number, canvasHeight: number): void {
        this.velocity += GRAVITY * deltaTime;
        this.y += this.velocity * deltaTime;

        if (this.y <= this.radius) {
            this.y = this.radius;
            this.velocity = 0;
        }
        if (this.y >= canvasHeight - this.radius) {
            this.y = canvasHeight - this.radius;
            this.velocity = 0;
        }
    }

    public flap(): void {
        this.velocity = JUMP_STRENGTH;
    }
}

class BridePipe {
    public x: number;
    public topHeight: number; // L'altezza del tubo superiore
    private ropeImg: HTMLImageElement;
    public passed: boolean = false;

    //Immagini da disegnare alle estremità delle pipes
    private topTipImage: HTMLImageElement;
    private bottomTipImage: HTMLImageElement;

    private tipSize: number = 80; //Dimensione in pixel logici delle immagini

    constructor(canvasWidth: number, canvasHeight: number, availableImages: HTMLImageElement[]) {
        this.x = canvasWidth;
        this.ropeImg = new Image();
        this.ropeImg.src = './resources/rope.png';
        // Calcoliamo randomicamente dove si trova il "buco"
        const minPipeHeight = 50;
        const maxPipeHeight = canvasHeight - PIPE_GAP - minPipeHeight;
        this.topHeight = Math.floor(Math.random() * maxPipeHeight) + minPipeHeight;

        // Estrae un indice a caso tra 0 e la lunghezza dell'array
        const randomTopIndex = Math.floor(Math.random() * availableImages.length);
        const randomBottomIndex = Math.floor(Math.random() * availableImages.length);

        // Assegna le immagini scelte
        this.topTipImage = availableImages[randomTopIndex];
        this.bottomTipImage = availableImages[randomBottomIndex];
    }

    public draw(ctx: CanvasRenderingContext2D, canvasHeight: number): void {

        //DISEGNO PIPES
        /*
        ctx.fillStyle = "#FF69B4"; // Ostacolo Sposa (Rosa)
        // Disegna tubo superiore
        ctx.fillRect(this.x, 0, PIPE_WIDTH, this.topHeight);

        // Disegna tubo inferiore
        const bottomPipeY = this.topHeight + PIPE_GAP;
        const bottomPipeHeight = canvasHeight - bottomPipeY;
        ctx.fillRect(this.x, bottomPipeY, PIPE_WIDTH, bottomPipeHeight);
*/

        //Disegno rope
        ctx.drawImage(this.ropeImg, this.x, -50, PIPE_WIDTH, this.topHeight);

        // 2. DISEGNA LA COLONNA INFERIORE
        const bottomPipeY = this.topHeight + PIPE_GAP;
        const bottomPipeHeight = canvasHeight - bottomPipeY;
        ctx.drawImage(this.ropeImg, this.x, bottomPipeY + 50, PIPE_WIDTH, bottomPipeHeight);


        //DISEGNO IMMAGINI
        const imageX = this.x - (this.tipSize - PIPE_WIDTH) / 2;

        // Immagine in ALTO (attaccata al bordo inferiore del tubo di sopra)
        const topImageY = this.topHeight - this.tipSize;
        ctx.drawImage(this.topTipImage, imageX, topImageY, this.tipSize, this.tipSize);

        // Immagine in BASSO (attaccata al bordo superiore del tubo di sotto)
        ctx.drawImage(this.bottomTipImage, imageX, bottomPipeY, this.tipSize, this.tipSize);
    }

    public update(deltaTime: number): void {
        this.x -= PIPE_SPEED * deltaTime;
    }
}

class scrollingBackground {
    private image: HTMLImageElement;
    private x: number = 0;
    private width: number;
    private speed: number;

    // Passiamo la larghezza nativa dell'immagine e la velocità desiderata
    constructor(imageSrc: string, imageWidth: number, speed: number) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = imageWidth;
        // Questa velocità dovrà essere MOLTO inferiore a quella dei tubi (es. 50 vs 180)
        this.speed = speed;
    }

    public update(deltaTime: number): void {
        // Trasliamo di x * deltaTime
        this.x -= this.speed * deltaTime;

        // Se la prima immagine è uscita completamente dallo schermo a sinistra, resettiamo
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    public draw(ctx: CanvasRenderingContext2D, canvasHeight: number): void {
        // Disegna la prima immagine partendo da this.x
        ctx.drawImage(this.image, this.x, 0, this.width, canvasHeight);

        // Disegna il suo "clone" esattamente in coda, aggiungendo this.width
        ctx.drawImage(this.image, this.x + this.width, 0, this.width, canvasHeight);
    }
}

export class SoundEffect {
    private sound: HTMLAudioElement;
    private hasToLoop: boolean
    constructor(src: string, volume: number, loop: boolean) {
        this.sound = new Audio(src);
        this.sound.volume = volume;
        this.hasToLoop = loop;
    }

    play(): void {
        this.sound.currentTime = 0;
        this.sound.play().catch((err) => {
            console.warn("Riproduzione bloccata: interagisci con la pagina prima di avviare l'audio.", err);
        });

        if (this.hasToLoop) this.sound.loop = this.hasToLoop;

    }

    stop(): void {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}


//Funzione per precaricare immagini e nascondere schermada Loading
export function preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img); // Quando finisce, dà l'ok
        img.onerror = () => reject(new Error(`Impossibile caricare: ${src}`));
        img.src = src;
    });
}

// --- MOTORE DEL GIOCO ---
export function initFlappyCelibe(canvasId: string, cachedImages: HTMLImageElement[] | null, onGameOver?: (finalScore: number) => void): void {
    console.log(cachedImages);
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const jumpSoundEffect = new SoundEffect('./resources/jump.mp3', 0.5, false);
    const scoreSoundEffect = new SoundEffect('./resources/pointScored3.mp3', 1, false);
    const hurtSoundEffect = new SoundEffect('./resources/hurt.mp3', 1, false);
    const gameCompletedSound = new SoundEffect("./resources/gameCompleted.mp3", 1, false);
    const genericButtonSoundEffect = new SoundEffect('./resources/genericbuttonSound2.mp3', 1, false);

    soundtrack = new SoundEffect('./resources/duBistGutGenug.mp3', 0.3, true);

    const endGameDialog = document.getElementById("flappyCelibeEndGameDialog") as HTMLDialogElement;

    setTimeout(() => {
        soundtrack?.play();
    }, 2500);


    scoreLabel = document.getElementById("flappyCelibeScoreLabel") as HTMLLabelElement;
    const header = document.getElementById("inGameHeader");

    canvas.height = window.innerHeight - (header ? header.offsetHeight : 0);

    console.log(canvas.height);
    canvas.width = Math.min(window.innerWidth/*, 500*/);

    let lastTime: number = 0;

    //Definiamo oggetti del gioco e risorse
    const Background = new scrollingBackground('./resources/background.png', 960, 30);
    const choreImages: HTMLImageElement[] = [];
    const imagePaths = [
        'resources/asciugamani.png',
        'resources/attrezzi.png',
        'resources/bucato.png',
        'resources/bucatoDaStendere.png',
        'resources/detersivo.png',
        'resources/ferroDaStiro.png',
        'resources/lavatrice.png',
        'resources/moccio.png',
        'resources/piattiDaLavare.png',
        'resources/scopaPattumiera.png',
        'resources/spazzatura.png',
        'resources/spesa.png',
        'resources/trasloco.png'
    ];

    GRAVITY = 1500;
    let gameFinished = false;

    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        choreImages.push(img);
    });
    let bird = new GroomBird(canvas.width, canvas.height);
    let pipes: BridePipe[] = [];

    scoreLabel!.innerText = `0/${SCORE_GOAL}`;
    let pipeSpawnTimer = 0;
    let pipesCounter: number = 0;
    let score = 0;
    let isGameOver = false;

    // Gestione dell'input (Click del mouse o tocco su schermo)

    // Definiamo il listener e salviamo il riferimento per poterlo rimuovere dopo
    boundPointerListener = () => {
        if (!isGameOver) {
            bird.flap();
            jumpSoundEffect.play();
        } else {
            // Se è game over, un click potrebbe resettare o fare il restart
            resetGame();
        }
    };

    window.addEventListener("pointerdown", boundPointerListener);

    function checkCollisions(pipe: BridePipe): boolean {
        // 1. Collisione con pavimento o soffitto
        /*
        if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
            return true;
        }
*/
        // 2. Controllo se il cerchio si trova orizzontalmente dentro il tubo
        const inPipeX = bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + PIPE_WIDTH;

        // 3. Se è orizzontalmente all'interno, controllo se tocca il tubo sopra o quello sotto
        if (inPipeX) {
            const hitTopPipe = bird.y - bird.radius < pipe.topHeight;
            const hitBottomPipe = bird.y + bird.radius > pipe.topHeight + PIPE_GAP;

            if (hitTopPipe || hitBottomPipe) return true;
        }

        return false;
    }

    function resetGame(): void {
        bird = new GroomBird(canvas.width, canvas.height);
        pipes = [];
        pipesCounter = 0;
        //frames = 0;
        score = 0;
        isGameOver = false;
        lastTime = 0;
        gameLoop(lastTime);
        scoreLabel!.innerText = `0/${SCORE_GOAL}`;
    }

    function gameLoop(timestamp: number): void {
        if (isGameOver) {
            if (onGameOver) onGameOver(score);
            return;
        }
        // 1. CLEAR
        if (!lastTime) lastTime = timestamp;

        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Per prima cosa: disegna background 

        Background.update(deltaTime);
        Background.draw(ctx, canvas.height);

        // 2. UPDATE & DRAW BIRD
        bird.update(deltaTime, canvas.height);
        bird.draw(ctx, isGameOver);

        // 3. GESTIONE TUBI
        //frames++;
        pipeSpawnTimer += deltaTime;
        if (pipeSpawnTimer >= PIPE_SPAWN_INTERVAL && pipesCounter < SCORE_GOAL) {
            let newPipe: BridePipe = new BridePipe(canvas.width, canvas.height, choreImages);
            //pipes.push(new BridePipe(canvas.width, canvas.height));
            pipes.push(newPipe);
            pipesCounter++;
            pipeSpawnTimer = 0;
        }

        for (let i = 0; i < pipes.length; i++) {
            let p = pipes[i];

            if (p.x < bird.x && !p.passed) { //Incrementa il punteggio
                score++;
                if (score === SCORE_GOAL) {
                    gameFinished = true;
                    endFlappyCelibeGame()
                };
                scoreLabel!.innerText = `${score}/${SCORE_GOAL}`;
                console.log(`Score: ${score}`);
                p.passed = true
                scoreSoundEffect.play();
            };

            p.update(deltaTime);
            p.draw(ctx, canvas.height);

            // Controllo Collisioni
            if (checkCollisions(p)) {
                isGameOver = true;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                p.draw(ctx, canvas.height);
                bird.draw(ctx, isGameOver);
                hurtSoundEffect.play();
                ctx.fillStyle = "black";
                ctx.font = "30px Arial";
                ctx.fillText("GAME OVER!", 100, canvas.height / 2);
            }

            // Rimuove i tubi usciti dallo schermo per liberare RAM
            if (p.x + PIPE_WIDTH < 0) {
                pipes.shift();
                i--; // Aggiusta l'indice dopo la rimozione
            }
        }

        if (gameFinished) {
            GRAVITY = 0;
            bird.x += 15;
        }

        // 4. RICHIAMO DEL LOOP
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Avvia il gioco
    gameLoop(performance.now());

    function endFlappyCelibeGame() {

        setTimeout(() => {
            soundtrack?.stop();
            gameCompletedSound.play();
            const quitFlappyCelibeGameBtn = document.getElementById("quitFlappyCelibeGameBtn");
            endGameDialog.showModal();

            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            if (boundPointerListener !== null) {
                window.removeEventListener("pointerdown", boundPointerListener);
                boundPointerListener = null;
                console.log("Event listener rimossi.");
            }

            quitFlappyCelibeGameBtn?.addEventListener("click", () => {
                genericButtonSoundEffect.play();
                endGameDialog.close();

                destroyFlappyCelibe();

                const flappyBirdSection = document.getElementById("flappyBirdSection");
                const chooseMinigameScreen = document.getElementById("chooseMinigame");

                chooseMinigameScreen?.classList.remove("hide");
                flappyBirdSection?.classList.add("hide");


            })
        }, 1000);



    }

}

export function destroyFlappyCelibe(): void {
    // 1. Interrompe bruscamente il loop di requestAnimationFrame
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        console.log("Game loop interrotto con successo.");
    }

    // 2. Rimuove i listener per evitare che i click continuino a triggerare logica inesistente
    if (boundPointerListener !== null) {
        window.removeEventListener("pointerdown", boundPointerListener);
        boundPointerListener = null;
        console.log("Event listener rimossi.");
    }
    soundtrack?.stop();
    soundtrack = null;

}

