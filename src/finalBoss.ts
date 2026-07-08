// finalBoss.ts

interface Question {
    text: string;
    options: string[];
    correctIndex: number;
}

// MOCK DI DOMANDE (Da sostituire con quelle vere)
const questions: Question[] = Array.from({ length: 10 }, (_, i) => ({
    text: `Questa è la domanda molto imbarazzante numero ${i + 1}?`,
    options: ['Risposta A', 'Risposta B', 'Risposta C', 'Risposta D'],
    correctIndex: Math.floor(Math.random() * 4) // Indice random per test
}));

// PERCORSI IMMAGINI (sostituisci con i tuoi path reali)
const AVATARS = {

    groom: {
        default: './resources/matteDefault.png',
        correct: './resources/matteCorretto.png',
        error: './resources/matteErrore.png'

    },

    bride: {
        default: './resources/elisaDefault.png',
        correct: './resources/elisaCorretto.png',
        error: './resources/elisaErrore.png'

    }
};

let currentQuestionIndex = 0;
let correctAnswers = 0;
let isAnimating = false;

// Riferimenti DOM
let section: HTMLElement;
let headerText: HTMLElement;
let questionBox: HTMLElement;
let optionsContainer: HTMLElement;
let groomAvatar: HTMLImageElement;
let brideAvatar: HTMLImageElement;
let dialog: HTMLDialogElement;
let dialogText: HTMLElement;
let dialogBtn: HTMLButtonElement;

export function initFinalBoss() {
    // 1. Recupero elementi DOM
    section = document.getElementById('finalBoss')!;
    headerText = document.getElementById('fb-header')!;
    questionBox = document.getElementById('fb-question-box')!;
    optionsContainer = document.getElementById('fb-options-container')!;
    groomAvatar = document.getElementById('fb-groom-avatar') as HTMLImageElement;
    brideAvatar = document.getElementById('fb-bride-avatar') as HTMLImageElement;
    dialog = document.getElementById('fb-result-dialog') as HTMLDialogElement;
    dialogText = document.getElementById('fb-dialog-text')!;
    dialogBtn = document.getElementById('fb-dialog-btn') as HTMLButtonElement;

    // 2. Reset stato iniziale
    currentQuestionIndex = 0;
    correctAnswers = 0;
    isAnimating = false;

    // Binding del pulsante del dialog
    dialogBtn.onclick = () => {
        dialog.close();
        if (correctAnswers === 10) {
            // LOGICA DI FINE GIOCO GLOBALE (chiudi definitivamente)
            section.classList.add('hide');
        } else {
            // RIPROVA
            initFinalBoss();
        }
    };

    // 3. Mostra la sezione e carica la prima domanda
    section.classList.remove('hide');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];

    // Reset UI
    headerText.innerText = `${currentQuestionIndex + 1}/10`;
    questionBox.innerText = q.text;
    optionsContainer.innerHTML = '';

    // Reset Avatar
    groomAvatar.src = AVATARS.groom.default;
    brideAvatar.src = AVATARS.bride.default;
    groomAvatar.classList.remove('animate-reaction');
    brideAvatar.classList.remove('animate-reaction');

    // Creazione bottoni
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(index, btn, q.correctIndex);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedIndex: number, btnElement: HTMLButtonElement, correctIndex: number) {
    if (isAnimating) return; // Evita spam di click durante l'animazione
    isAnimating = true;

    const isCorrect = selectedIndex === correctIndex;

    // Applica stili e cambia avatar
    if (isCorrect) {
        btnElement.classList.add('btn-correct');
        groomAvatar.src = AVATARS.groom.correct;
        brideAvatar.src = AVATARS.bride.correct;
        correctAnswers++;
    } else {
        btnElement.classList.add('btn-wrong');
        groomAvatar.src = AVATARS.groom.error;
        brideAvatar.src = AVATARS.bride.error;
    }

    groomAvatar.classList.add('animate-reaction');
    brideAvatar.classList.add('animate-reaction');

    // Attesa di 2 secondi
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < 10) {
            isAnimating = false;
            loadQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

function showResult() {
    dialogText.innerText = `Risposte corrette: ${correctAnswers}/10`;

    if (correctAnswers === 10) {
        dialogBtn.innerText = "Chiudi (Vittoria!)";
    } else {
        dialogBtn.innerText = "Riprova (Devi fare 10/10!)";
    }

    dialog.showModal();
}