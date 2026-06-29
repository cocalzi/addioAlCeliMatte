(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=document.getElementById(`dialogContent`),t=document.getElementById(`btnHome`),n=document.getElementById(`closeDialogBtn`),r=document.getElementById(`openSkinDialogBtn`),i=document.getElementById(`closeSkinDialogBtn`),a=document.getElementById(`dialogTitleContainer`),o=document.getElementById(`memeMemoryBtn`),s=document.getElementById(`thirdMinigameBtn`),c=document.getElementById(`dialog`),l=document.getElementById(`skinDialog`);t?.addEventListener(`click`,()=>{let t=document.getElementById(`home`),n=document.getElementById(`chooseMinigame`);t?.classList.toggle(`hide`),n?.classList.toggle(`hide`),o?.classList.add(`game-non-active`),s?.classList.add(`game-non-active`),e.innerText=`Caro Matteo,
 buongiorno e benvenuto in questo evento speciale.
    Da sempre ti sei contraddistinto per la tua grande abilità nel mondo videoludico. Il fatto che sia un talento, nonché una grandissima passione, è innegrabile.
    Perciò quest'oggi abbiamo deciso di sfidare queste innate abilità che hanno le tue dita (🤤) strutturando il tuo addio al celibato in una maniera un po' insolita.
    Sarai tenuto a giocare a 3 mini videogiochi che, al completamento di ciascuno, ti permetterano di sbloccare una skin.
    La skin ti permetterà di accedere all'attività vera e propria, poiché dovrai (e ripetiamo, dovrai) vestirti fisicamente di quella skin per sostenere l'attività relativa.
    Solo al compimento dei 3 videogiochi e delle 3 attività avrai accesso al Final Boss vero e proprio: Elisa.
    Questo addio al celibato tanto richiesto e tanto voluto dipende solo da te.
    

    Buon gioco.
    

    (Gay)
    
`,c.showModal(),a?.focus()}),r?.addEventListener(`click`,()=>{l.showModal()}),i?.addEventListener(`click`,()=>{l.close()}),n?.addEventListener(`click`,()=>{c.close()})}var t=document.getElementById(`chooseMinigame`),n=document.getElementById(`flappyBirdSection`);t?.classList.toggle(`hide`),n?.classList.toggle(`hide`),e();