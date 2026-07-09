// finalBoss.ts
/*
DOMANDE

0.5) Qual è l'unico tipo di caffè che bevo?

a) Ginseng b) Orzo c) Arabica d) Normale

1) Qual è la data ufficiosa del nostro fidanzamento?

a) 16/09 b) 12/09 c) 24/07 d) 29/08

2) Quando ci si passa il filo interdentale?

a) Prima di lavarsi i denti b) Dopo essersi lavati i denti ma prima di usare il colluttorio c) Dopo essersi lavati i denti e dopo il colluttorio d) Il primo venerdì del mese

3) Qual è stata la nostra prima gita fatta insieme?

a) Torino b) Toscana c) Marocco d) Parigi

4) Quanti cugini consanguinei ho? 

a) 4 b) 6 c) 5 d) 3

5) Qual è la data in cui si sono sposati mia mamma e suo marito?

a) 16/09 b) 12/09 c) 24/07 d) 29/08

6) Qual è l'ingrediente di un colluttorio da evitare poiché macchia lo smalto dentale?

a) Clorexidina b) Alcool c) Cloruro di Cetilpiridinio d) Cherosene

7) Trova la coppia errata

a) Marco - Sara b) Alex - Nicoletta c) Marco - Adriana d) Michael - Jennifer

8) La prima volta che siamo usciti insieme, qual è la cosa che indossavi che non sopportavo?

a) Il colore dei pantaloni b) Le scarpe c) Gli occhiali da sole d) I calzini

9) Che tipo di liceo ho frequentato?

a) Liceo delle Scienze Umane b) Liceo Scientifico c) Liceo Linguistico d) Liceo Artistico

*/

import { SoundEffect } from "./flappyCelibe";

let soundtrack: SoundEffect | null = null;

export function initFinalBoss() {

    soundtrack = new SoundEffect('./resources/pokemonRed.mp3', 0.3, true);

    setTimeout(() => {
        soundtrack?.play();
    }, 2000);

    interface Option {
        text: string;
        correct: boolean;
    }

    interface Question {
        text: string;
        options: Option[];
    }

    const questions: Question[] = [
        {
            text: "Qual è l'unico tipo di caffè che bevo",
            options: [
                {
                    text: "Ginseng",
                    correct: true
                },
                {
                    text: "Orzo",
                    correct: false
                },
                {
                    text: "Arabica",
                    correct: false
                },
                {
                    text: "Normale",
                    correct: false
                }
            ],
        },
        {
            text: "Qual è la data ufficiosa del nostro fidanzamento?",
            options: [
                {
                    text: "12/09",
                    correct: true
                },
                {
                    text: "16/09",
                    correct: false
                },
                {
                    text: "24/07",
                    correct: false
                },
                {
                    text: "29/08",
                    correct: false
                }
            ]
        },
        {
            text: "Quando ci si passa il filo interdentale?",
            options: [
                {
                    text: "Prima di lavarsi i denti",
                    correct: true
                },
                {
                    text: "Dopo essersi lavati i denti ma prima di usare il colluttorio",
                    correct: false
                },
                {
                    text: "Dopo essersi lavati i denti e dopo il colluttorio",
                    correct: false
                },
                {
                    text: "Il primo venerdì del mese",
                    correct: false
                }
            ],
        },
        {
            text: "Qual è stata la nostra prima gita fatta insieme?",
            options: [
                {
                    text: "Torino",
                    correct: false
                },
                {
                    text: "Toscana",
                    correct: true
                },
                {
                    text: "Marocco",
                    correct: false
                },
                {
                    text: "Parigi",
                    correct: false
                }
            ],
        },
        {
            text: "Quanti cugini consanguinei ho?",
            options: [
                {
                    text: "4",
                    correct: true
                },
                {
                    text: "6",
                    correct: false
                },
                {
                    text: "5",
                    correct: false
                },
                {
                    text: "3",
                    correct: false
                }
            ],
        },
        {
            text: "Qual è la data in cui si sono sposati mia mamma e suo marito?",
            options: [
                {
                    text: "16/09",
                    correct: true
                },
                {
                    text: "12/09",
                    correct: false
                },
                {
                    text: "24/07",
                    correct: false
                },
                {
                    text: "29/08",
                    correct: false
                }
            ],
        },
        {
            text: "Qual è l'ingrediente di un colluttorio da evitare poiché macchia lo smalto dentale?",
            options: [
                {
                    text: "Clorexidina",
                    correct: true
                },
                {
                    text: "Alcool",
                    correct: false
                },
                {
                    text: "Cloruro di Cetilpiridinio",
                    correct: false
                },
                {
                    text: "Cherosene",
                    correct: false
                }
            ],
        },
        {
            text: "Trova la coppia errata",
            options: [
                {
                    text: "Stefano - Jessica",
                    correct: true
                },
                {
                    text: "Marco - Sara",
                    correct: false
                },
                {
                    text: "Alex - Nicoletta",
                    correct: false
                },
                {
                    text: "Marco - Adriana",
                    correct: false
                }
            ],
        },
        {
            text: "La prima volta che siamo usciti insieme, qual è la cosa che indossavi che non sopportavo?",
            options: [
                {
                    text: "Gli occhiali da sole",
                    correct: true
                },
                {
                    text: "Il colore dei pantaloni",
                    correct: false
                },
                {
                    text: "Le scarpe",
                    correct: false
                },
                {
                    text: "I calzini",
                    correct: false
                }
            ],
        },
        {
            text: "Che tipo di liceo ho frequentato?",
            options: [
                {
                    text: "Liceo delle Scienze Umane",
                    correct: true
                },
                {
                    text: "Liceo Scientifico",
                    correct: false
                },
                {
                    text: "Liceo Linguistico",
                    correct: false
                },
                {
                    text: "Liceo Artistico",
                    correct: false
                }
            ],
        }
    ];

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

    // 1. Recupero elementi DOM
    section = document.getElementById('finalBoss')!;
    headerText = document.getElementById('fb-header')!;
    questionBox = document.getElementById('fb-question-box')!;
    optionsContainer = document.getElementById('fb-options-container')!;

    //Avatar
    groomAvatar = document.getElementById('fb-groom-avatar') as HTMLImageElement;
    brideAvatar = document.getElementById('fb-bride-avatar') as HTMLImageElement;

    //Dialog
    dialog = document.getElementById('fb-result-dialog') as HTMLDialogElement;
    dialogText = document.getElementById('fb-dialog-text')!;
    dialogBtn = document.getElementById('fb-dialog-btn') as HTMLButtonElement;

    //Dialog MIO
    const endgameDialog = document.getElementById("finalBossEndGameDialog") as HTMLDialogElement;
    let endgameDialogText = document.getElementById("endgameFinalBossDialogContent") as HTMLParagraphElement;
    let dialogButtonText = document.getElementById("finalBossTextButton") as HTMLLabelElement;
    const endgameDialogBtn = document.getElementById("quitFinalBossGameBtn");

    // 2. Reset stato iniziale
    currentQuestionIndex = 0;
    correctAnswers = 0;
    isAnimating = false;

    // Binding del pulsante del dialog
    endgameDialogBtn!.onclick = () => {
        endgameDialog.close();
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
        let shuffledOptions = shuffle(q.options);

        for (let i = 0; i < q.options.length; i++) {
            const btn = document.createElement('button');
            btn.innerText = shuffledOptions[i].text;
            btn.onclick = () => handleAnswer(btn, shuffledOptions[i].correct);
            optionsContainer.appendChild(btn);
        }

        /*
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => handleAnswer(index, btn, q.correctIndex);
            optionsContainer.appendChild(btn);
        });*/

    }

    function handleAnswer(btnElement: HTMLButtonElement, isCorrect: boolean) {
        if (isAnimating) return; // Evita spam di click durante l'animazione
        isAnimating = true;

        //const isCorrect = selectedIndex === correctIndex;

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
        }, 1500);
    }

    function showResult() {
        endgameDialogText.innerText = `Risposte corrette: ${correctAnswers}/10`;

        if (correctAnswers === 10) {
            dialogButtonText.innerText = "Chiudi";
        } else {
            dialogButtonText.innerText = "Riprova (Devi fare 10/10!)";
        }

        endgameDialog.showModal();
    }

    function shuffle<T>(array: T[]): T[] {

        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }


}

export function destroyFinalBoss(): void {
    soundtrack?.stop();
    soundtrack = null;
}