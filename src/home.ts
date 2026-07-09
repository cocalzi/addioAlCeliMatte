import { preloadImage, initFlappyCelibe, destroyFlappyCelibe } from "./flappyCelibe";
import { initMemory, destroyMemory } from "./memory";
import { SoundEffect } from "./flappyCelibe";
import { initFinalBoss } from "./finalBoss";

const homeButtonSoundEffect = new SoundEffect('./resources/startSound.wav', 1, false);
const genericButtonSoundEffect = new SoundEffect('./resources/genericbuttonSound2.mp3', 1, false);
const dialogOpeningSoundEffect = new SoundEffect('./resources/gameOpeningDialogSound.wav', 1, false);




export function initHome() {
    const openingDialogContent = document.getElementById("openingDialogContent") as HTMLParagraphElement;
    const entryDialogString = `Caro Matteo,\n buongiorno e benvenuto in questo evento speciale.
    Da sempre ti sei contraddistinto per la tua grande abilità nel mondo videoludico. Il fatto che sia un talento, nonché una grandissima passione, è innegrabile.
    Perciò quest'oggi abbiamo deciso di sfidare queste innate abilità che hanno le tue dita (🤤) strutturando il tuo addio al celibato in una maniera un po' insolita.
    Il protagonista sta volta sei tu. Sarai tenuto a giocare a 3 mini videogiochi che, al completamento di ciascuno, ti permetterano di sbloccare una skin.
    La skin ti permetterà di accedere all'attività vera e propria, poiché dovrai (e ripetiamo, dovrai) vestirti fisicamente di quella skin per sostenere l'attività relativa.
    Solo al compimento dei 3 videogiochi e delle 3 attività potrai finalmente dire addio al celibato ed avrai così accesso al Final Boss vero e proprio: Elisa.\n
    Questo addio al celibato tanto atteso e tanto voluto dipende solo da te.
    \n
    Buon gioco.
    \n
    (Gay)
    \n`;


    const homeScreen = document.getElementById("home");

    //-------Istanziamento di tutti i pulsanti

    const startBtn = document.getElementById("btnHome");
    const closeInitialDialogBtn = document.getElementById("closeDialogBtn");

    //Sections
    const chooseMinigameScreen = document.getElementById("chooseMinigame");
    const flappyBirdSection = document.getElementById("flappyBirdSection");
    const memorySection = document.getElementById("memorySection");
    //const chronoMadnessSection = document.getElementById("chronoMadnessSection");
    const finalBossSection = document.getElementById("finalBoss");

    //Dialog
    //Entry Dialog
    const entryDialog = document.getElementById("dialog") as HTMLDialogElement;
    const initialDialogTitleContainer = document.getElementById("dialogTitleContainer");

    //Skin Dialog
    const skinDialog = document.getElementById("skinDialog") as HTMLDialogElement;
    const openSkinDialogBtn = document.getElementById("openSkinDialogBtn");
    const closeSkinDialogBtn = document.getElementById("closeSkinDialogBtn");

    //Close Mini Game Button
    const closeGamesSectionBtn = document.getElementById("closeGamesSection");

    //Button dei giochi

    //Flappy Celibe
    const flapppyCelibeBtn = document.getElementById("flapppyCelibeBtn");
    const closeFlappyCelibeBtn = document.getElementById("closeFlappyCelibeBtn");

    //OpeningDialog Flappy Celibe
    const flappyCelibeOpeningDialog = document.getElementById('flappyCelibeOpeningDialog') as HTMLDialogElement;
    const playFlappyCelibeBtn = document.getElementById('playFlappyCelibe');
    const closeFlappyCelibeOpeningDialog = document.getElementById('closeFlappyCelibeDialog');

    //Memory
    const memoryBtn = document.getElementById("memeMemoryBtn");
    const closeMemoryBtn = document.getElementById("closeMemoryBtn");

    //OpeningDialog Memory Wife
    const memoryOpeningDialog = document.getElementById('memoryOpeningDialog') as HTMLDialogElement;
    const playMemoryBtn = document.getElementById('playMemory');
    const closeMemoryDialog = document.getElementById('closeMemoryDialog');

    //Chronologic Madness
    //const chronoMadnessBtn = document.getElementById("chronoMadnessBtn");
    //const closeChronoMadnessBtn = document.getElementById("closeChronoMadnessBtn");

    //FinalBoss
    const finalBossBtn = document.getElementById("finalBossBtn");
    const closeFinalBossBtn = document.getElementById("closeFinalBossBtn");

    //Opening Dialog Chronologic Madness
    const finalBossOpeningDialog = document.getElementById('finalBossOpeningDialog') as HTMLDialogElement;
    const playfinalBossBtn = document.getElementById('playFinalBoss');
    const closefinalBossDialog = document.getElementById('closeFinalBossDialog');

    //Event Listener del pulsante "Inizia" - Homescreen
    startBtn?.addEventListener("click", () => {

        //const chooseMinigameScreen = document.getElementById("chooseMinigame");
        homeScreen?.classList.add("hide");
        chooseMinigameScreen?.classList.remove("hide");

        //memeMemoryBtn?.classList.add("game-non-active");
        //chronoMadnessBtn?.classList.add("game-non-active");
        openingDialogContent.innerText = entryDialogString;
        entryDialog.showModal();
        initialDialogTitleContainer?.focus();
        homeButtonSoundEffect.play();
    });

    closeGamesSectionBtn?.addEventListener("pointerdown", () => {
        genericButtonSoundEffect.play();
        homeScreen?.classList.remove("hide");
        chooseMinigameScreen?.classList.add("hide");
    });

    //Event Listener dei pulsanti giochi

    //FLAPPY CELIBE
    flapppyCelibeBtn?.addEventListener("click", () => {

        flappyCelibeOpeningDialog.showModal();
        dialogOpeningSoundEffect.play();

    });

    playFlappyCelibeBtn?.addEventListener("click", async () => {

        flappyCelibeOpeningDialog.close();

        chooseMinigameScreen?.classList.add("hide");
        flappyBirdSection?.classList.remove("hide");
        genericButtonSoundEffect.play();
        /*
                initFlappyCelibe('flappyBirdCanvas', (finalScore) => {
                    console.log(`Partita terminata! Punteggio sposo: ${finalScore}`);
                });
                */
        // 1. MOSTRIAMO LA SCHERMATA DI CARICAMENTO
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen?.classList.remove("hide");

        // 2. PREPARIAMO TUTTE LE IMMAGINI DA CARICARE
        // Inserisci qui tutti i percorsi delle immagini che usi nel gioco
        const imagePaths = [
            './resources/matteJump1.png',
            './resources/matteJump2.png',
            './resources/matteFall1.png',
            './resources/matteFall2.png',
            './resources/matteHurt.png',
            './resources/rope.png',
            './resources/background.png'
        ];

        try {
            // 3. ASPETTIAMO CHE TUTTE SIANO IN RAM
            // Promise.all lancia il caricamento in parallelo per la massima velocità
            const loadedImages = await Promise.all(imagePaths.map(path => preloadImage(path)));

            console.log("Tutte le risorse sono state caricate in memoria RAM!");

            // (Opzionale) Puoi passare l'array loadedImages alla tua funzione initFlappyCelibe
            // se vuoi evitare di fare "new Image()" di nuovo al suo interno, ma 
            // anche se lo fai, il browser le prenderà istantaneamente dalla cache!

            // 4. NASCONDIAMO IL CARICAMENTO E AVVIAMO IL GIOCO
            loadingScreen?.classList.add("hide");
            console.log(loadingScreen?.classList.contains("hide"));

            initFlappyCelibe('flappyBirdCanvas', loadedImages, (finalScore) => {
                console.log(`Partita terminata! Punteggio sposo: ${finalScore}`);
            });

        } catch (error) {
            console.error("Errore durante il caricamento degli asset:", error);
            // Qui potresti mostrare un messaggio di errore all'utente se la rete cade
        }

    });

    closeFlappyCelibeOpeningDialog?.addEventListener("click", () => {
        flappyCelibeOpeningDialog.close();
        genericButtonSoundEffect.play();
    });

    closeFlappyCelibeBtn?.addEventListener("pointerdown", () => {
        destroyFlappyCelibe();
        chooseMinigameScreen?.classList.remove("hide");
        flappyBirdSection?.classList.add("hide");
        genericButtonSoundEffect.play();
    });

    //MEMORY WIFE
    memoryBtn?.addEventListener("click", () => {

        memoryOpeningDialog.showModal();
        dialogOpeningSoundEffect.play();

    });

    playMemoryBtn?.addEventListener("click", () => {

        memoryOpeningDialog.close();

        chooseMinigameScreen?.classList.add("hide");
        memorySection?.classList.remove("hide");
        genericButtonSoundEffect.play();

        initMemory('memoryContainer');
    });

    closeMemoryDialog?.addEventListener("click", () => {
        memoryOpeningDialog.close();
        genericButtonSoundEffect.play();
    });

    closeMemoryBtn?.addEventListener("pointerdown", () => {
        destroyMemory();
        chooseMinigameScreen?.classList.remove("hide");
        memorySection?.classList.add("hide");

        genericButtonSoundEffect.play();
    });


    //Final Boss
    finalBossBtn?.addEventListener("click", () => {
        finalBossOpeningDialog.showModal();
        dialogOpeningSoundEffect.play();
    });

    playfinalBossBtn?.addEventListener("click", () => {

        finalBossOpeningDialog.close();
        chooseMinigameScreen?.classList.add("hide");
        finalBossSection?.classList.remove('hide');
        genericButtonSoundEffect.play();
        initFinalBoss();
        //initChronologicMadness();

    });

    closefinalBossDialog?.addEventListener("click", () => {
        finalBossOpeningDialog.close();
        genericButtonSoundEffect.play();
    });

    closeFinalBossBtn?.addEventListener("pointerdown", () => {
        //destroyChronologicMadness();
        chooseMinigameScreen?.classList.remove("hide");
        finalBossSection?.classList.add('hide');
        genericButtonSoundEffect.play();
    });


    //Skin sbloccate
    openSkinDialogBtn?.addEventListener("click", () => {
        genericButtonSoundEffect.play();
        skinDialog.showModal();
    });

    closeSkinDialogBtn?.addEventListener("click", () => {
        genericButtonSoundEffect.play();
        skinDialog.close();
    });

    //Introduzione
    closeInitialDialogBtn?.addEventListener("click", () => {
        genericButtonSoundEffect.play();
        entryDialog.close();
    });
}