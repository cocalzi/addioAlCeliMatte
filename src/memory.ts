import { SoundEffect } from "./flappyCelibe";

let soundtrack: SoundEffect | null = null;

export function initMemory(containerId: string) {
    /*
        setTimeout(() => {
            endMemoryGame();
        }, 1000);
    */
    //function preloadImages() {
    const cachedImages = [
        './resources/matteHappy.png',
        './resources/matteRage.png'
    ];

    const gameCompletedSound = new SoundEffect("./resources/gameCompleted.mp3", 1, false);
    const cardSwipeSound = new SoundEffect("./resources/cardSwipe.mp3", 1, false);


    cachedImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    //}

    let boardElement: HTMLElement;
    let firstCard: HTMLElement | null = null;
    let secondCard: HTMLElement | null = null;
    let lockBoard = false; // Previene click durante l'animazione di errore
    const endGameDialog = document.getElementById("memoryEndGameDialog") as HTMLDialogElement;
    const scoreSpan = document.getElementById("memoryScore") as HTMLSpanElement;

    let score: number = 0;

    const errorSoundEffects: SoundEffect[] = [
        new SoundEffect('./resources/pufferFish.mp3', 1, false),
        new SoundEffect('./resources/faaah.mp3', 1, false),
    ];

    const correctSoundEffect: SoundEffect = new SoundEffect("./resources/peffo.mp3", 1, false);
    soundtrack = new SoundEffect('./resources/oraDelloSbusto.mp3', 1, true);

    //./resources/faaah.mp3

    //(Math.floor(Math.random() * 3) + 1)
    const images = [
        'resources/memElisa1.jpg',
        'resources/memElisa2.jpg',
        'resources/memElisa3.jpg',
        'resources/memElisa4.jpg',
        'resources/memElisa5.jpg',
        'resources/memElisa6.jpg',
        'resources/memElisa7.jpg',
        'resources/memElisa8.jpg',
        'resources/memElisa9.jpg',
        'resources/memElisa10.jpg',
        'resources/memElisa11.jpg',
        'resources/memElisa12.jpg',
        'resources/memElisa13.jpg',
        'resources/memElisa14.jpg'
    ];

    soundtrack.play();
    boardElement = document.getElementById(containerId) as HTMLElement;
    boardElement.innerHTML = ''; // Pulisce la griglia se si riavvia

    // Duplica le immagini per creare le coppie e mescola
    const deck = [...images, ...images].sort(() => Math.random() - 0.5);

    deck.forEach((imgSrc) => {
        /*
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;

        // Crea un'immagine "coperta" (placeholder visivo gestito via CSS)
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.classList.add('hidden-img');

        card.appendChild(imgElement);
        card.addEventListener('click', flipCard);

        boardElement.appendChild(card);
        */
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;

        // Contenitore per l'effetto 3D
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // Faccia frontale (dorso coperto)
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        // Faccia posteriore (immagine)
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;

        // Assemblaggio degli elementi
        cardBack.appendChild(imgElement);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        boardElement.appendChild(card);
    });

    function flipCard(this: HTMLElement) {
        cardSwipeSound.play();
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        //const img = this.querySelector('img') as HTMLImageElement;
        //img.classList.remove('hidden-img'); // Mostra l'immagine

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard?.dataset.image === secondCard?.dataset.image;
        playGroomAnimation(isMatch ? 'joy' : 'frustration');
        if (isMatch) {
            setTimeout(() => {
                correctSoundEffect.play();
            }, 250);
            disableCards();
            score++;
            scoreSpan.innerHTML = `${score}/14`;
            if (score >= 14) {
                setTimeout(endMemoryGame, 1000);
            };
        } else {
            unflipCards();
            setTimeout(() => {
                //type ValidIndex = 0 | 1 ;
                let randomIndex = (Math.floor(Math.random() * 2) + 0); //formula generica: Math.floor(Math.random() * (max - min + 1)) + min;
                console.log(randomIndex);
                errorSoundEffects[randomIndex].play();
                console.log(errorSoundEffects);
            }, 250);

        }
        //isMatch ? disableCards() : unflipCards();
    }

    function playGroomAnimation(type: 'joy' | 'frustration') {

        const groom = document.getElementById('avatar');
        if (!groom) return;

        // 1. Pulizia preventiva nel caso in cui stia già eseguendo un'altra animazione
        groom.classList.remove('anim-joy', 'anim-frustration');

        // 2. Forza un "reflow" del browser. 
        // È un trucco fondamentale in JS: permette all'animazione di ripartire da zero 
        // se la stessa classe viene rimossa e riaggiunta immediatamente.
        void groom.offsetWidth;

        // 3. Applica l'animazione
        const animClass = type === 'joy' ? 'anim-joy' : 'anim-frustration';
        groom.classList.add(animClass);

        // 4. Rimuovi la classe dopo che l'animazione ha finito di girare.
        // Imposta il tempo in millisecondi in base alla durata del CSS (es. 0.6s = 600ms)
        const duration = 1000;

        setTimeout(() => {
            groom.classList.remove(animClass);
        }, duration);
    }

    function disableCards() {
        // Le carte coincidono: rimuovi i listener così restano scoperte
        firstCard?.removeEventListener('click', flipCard);
        secondCard?.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true; // Blocca la griglia

        setTimeout(() => {
            firstCard?.classList.remove('flipped');
            //firstCard?.querySelector('img')?.classList.add('hidden-img');

            secondCard?.classList.remove('flipped');
            //secondCard?.querySelector('img')?.classList.add('hidden-img');

            resetBoard();
        }, 1000); // 1 secondo di attesa prima di rigirarle
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function endMemoryGame(): void {
        gameCompletedSound.play();
        const quitMemoryGameBtn = document.getElementById("quitMemoryGameBtn");
        endGameDialog.showModal();

        quitMemoryGameBtn?.addEventListener("click", () => {
            endGameDialog.close();
            destroyMemory();

            const memorySection = document.getElementById("memorySection");
            const chooseMinigameScreen = document.getElementById("chooseMinigame");

            chooseMinigameScreen?.classList.remove("hide");
            memorySection?.classList.add("hide");

            //genericButtonSoundEffect.play();
        })

    }

}

export function destroyMemory(): void {
    soundtrack?.stop();
    soundtrack = null;
}

