import * as Home from "./home";

const chooseMinigameScreen = document.getElementById("chooseMinigame");
const flappyBirdSection = document.getElementById("flappyBirdSection");
const memorySection = document.getElementById("memorySection");
const chronoMadnessSection = document.getElementById("chronoMadnessSection");
const loadingScreen = document.getElementById('loadingScreen');
const finalBossSection = document.getElementById("finalBoss");

chooseMinigameScreen?.classList.add("hide");
flappyBirdSection?.classList.add("hide");
memorySection?.classList.add("hide");
chronoMadnessSection?.classList.add("hide");
loadingScreen?.classList.add("hide");
finalBossSection?.classList.add("hide");
Home.initHome();
