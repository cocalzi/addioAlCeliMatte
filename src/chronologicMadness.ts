import { SoundEffect } from "./flappyCelibe";


let scrollAnimationFrame: number | null = null;
let scrollSpeed = 0;
const SCROLL_ZONE_HEIGHT = 200; // Altezza della hotzone in pixel (es. i primi e ultimi 100px)
const MAX_SCROLL_SPEED = 10;    // Velocità massima di scroll

const avatarMatte = document.getElementById("avatarChronoMadnessMatte");
const avatarElisa = document.getElementById("avatarChronoMadnessElisa");


let soundtrack: SoundEffect | null = null;

const eventiCronologici = [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
    { id: 7, text: "7" },
    { id: 8, text: "8" },
    { id: 9, text: "9" },
    { id: 10, text: "10" },
    { id: 11, text: "11" }

];

export function initChronologicMadness() {

    const cachedImages = [
        './resources/matteDefault.png',
        './resources/matteCorretto.png',
        './resources/matteErrore.png',
        './resources/elisaDefault.png',
        './resources/elisaCorretto.png',
        './resources/elisaErrore.png',
    ];

    cachedImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    soundtrack = new SoundEffect("./resources/pokemonRed.mp3", 0.3, true);

    setTimeout(() => {
        soundtrack?.play();
    }, 2000);

    const container = document.getElementById("chronoMadnessContainer") as HTMLElement;
    // Mischia l'array in modo efficiente
    const eventiMischiati = [...eventiCronologici].sort(() => Math.random() - 0.5);

    container.innerHTML = `
    <ul id="lista-eventi">
      ${eventiMischiati.map(e =>
        `<li class="evento-item" draggable="true" data-id="${e.id}">${e.text}</li>`
    ).join('')}
    </ul>
          <button id="verifica-btn" style="margin-top: 10px;">Verifica Ordine</button>
    <p id="risultato"></p>
  `;

    /*
  
    */

    setupDragAndDrop();
    setupValidation();
}

function setupDragAndDrop() {
    const lista = document.getElementById('lista-eventi') as HTMLUListElement;
    const scrollContainer = document.getElementById('chronoMadnessContainer') as HTMLDivElement;
    let dragSrcEl: HTMLElement | null = null;

    lista.addEventListener('dragstart', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('evento-item')) {
            dragSrcEl = target;
            target.classList.add('dragging');
            e.dataTransfer!.effectAllowed = 'move';
        }
    });

    scrollContainer.addEventListener('dragover', (e) => {
        e.preventDefault();

        // --- INIZIO LOGICA AUTO-SCROLL ---
        const rect = scrollContainer.getBoundingClientRect();
        //console.log(rect);
        const y = e.clientY - rect.top; // Posizione Y del mouse relativa al container
        //console.log(y);
        if (y < SCROLL_ZONE_HEIGHT) {
            // Mouse nella zona alta: calcola una velocità negativa (verso l'alto) proporzionale alla vicinanza al bordo
            const intensita = 1 - (y / SCROLL_ZONE_HEIGHT);
            scrollSpeed = -MAX_SCROLL_SPEED * intensita;
            startAutoScroll(scrollContainer);
        }
        else if (y > rect.height - SCROLL_ZONE_HEIGHT) {
            // Mouse nella zona bassa: calcola una velocità positiva (verso il basso)
            const distanzaDalFondo = rect.height - y;
            const intensita = 1 - (distanzaDalFondo / SCROLL_ZONE_HEIGHT);
            scrollSpeed = MAX_SCROLL_SPEED * intensita;
            startAutoScroll(scrollContainer);
        }
        else {
            // Mouse nella zona morta centrale: ferma lo scroll
            stopAutoScroll();
        }
        // --- FINE LOGICA AUTO-SCROLL ---

        // --- LOGICA DI SCAMBIO ELEMENTI (Già presente) ---
        const target = e.target as HTMLElement;
        if (target.classList.contains('evento-item') && target !== dragSrcEl && dragSrcEl) {
            const bounding = target.getBoundingClientRect();
            const offset = e.clientY - bounding.top;

            if (offset > bounding.height / 2) {
                target.after(dragSrcEl);
            } else {
                target.before(dragSrcEl);
            }
        }
    });

    // Ferma lo scroll e resetta le classi quando rilasci l'elemento
    lista.addEventListener('dragend', (e) => {
        const target = e.target as HTMLElement;
        target.classList.remove('dragging');
        stopAutoScroll(); // Cruciale: ferma il loop!
    });

    // Ferma lo scroll se esci dal container col mouse
    lista.addEventListener('dragleave', (e) => {
        // Un controllo base per evitare che si fermi se passi sopra a un elemento figlio
        if (e.target === lista) {
            stopAutoScroll();
        }
    });
}

function setupValidation() {
    const btn = document.getElementById('verifica-btn') as HTMLButtonElement;
    const risultato = document.getElementById('risultato') as HTMLParagraphElement;

    btn.addEventListener('click', () => {
        const items = document.querySelectorAll('.evento-item');
        const ordineAttuale = Array.from(items).map(li => Number(li.getAttribute('data-id')));

        // Verifica se gli ID sono in ordine rigorosamente crescente
        const isCorretto = ordineAttuale.every((val, i, arr) => !i || (val > arr[i - 1]));

        playAvatarsAnimation(isCorretto);

        risultato.style.color = isCorretto ? 'green' : 'red';
        risultato.innerText = isCorretto ? "Perfetto! Hai riordinato correttamente. 🎉" : "Manca poco, riprova! ❌";
    });
}

function playAvatarsAnimation(correct: boolean): void {
    const animClass = correct ? 'anim-correct' : 'anim-error';
    avatarMatte?.classList.add(`${animClass}-matte`);
    avatarElisa?.classList.add(`${animClass}-elisa`);
    setTimeout(() => {
        avatarMatte?.classList.remove(`${animClass}-matte`);
        avatarElisa?.classList.remove(`${animClass}-elisa`);
    }, 1000);
}

function startAutoScroll(container: HTMLElement) {
    // Se l'animazione è già in corso, non fare nulla
    if (scrollAnimationFrame) return;

    function scrollStep() {
        container.scrollTop += scrollSpeed;
        scrollAnimationFrame = requestAnimationFrame(scrollStep);
    }

    // Avvia il loop
    scrollAnimationFrame = requestAnimationFrame(scrollStep);
}

function stopAutoScroll() {
    if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = null;
    }
    scrollSpeed = 0;
}

export function destroyChronologicMadness(): void {
    soundtrack?.stop();
}