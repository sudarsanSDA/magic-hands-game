document.addEventListener('DOMContentLoaded', () => {

    // --- Get All HTML Elements ---
    const screens = {
        // intro screen is removed
        welcome: document.getElementById('welcome-screen'),
        game: document.getElementById('game-screen'),
        end: document.getElementById('end-screen'),
    };
    
    const buttons = {
        start: document.getElementById('start-button'),
        restart: document.getElementById('restart-button'),
    };
    
    const instructionText = document.getElementById('instruction-text');
    const handDisplayArea = document.getElementById('hand-display-area');
    
    const sfx = {
        welcome: document.getElementById('sfx-welcome'),
        begin: document.getElementById('sfx-begin'),
        r1_index: document.getElementById('sfx-r1_index'),
        r1_middle: document.getElementById('sfx-r1_middle'),
        r1_ring: document.getElementById('sfx-r1_ring'),
        r1_little: document.getElementById('sfx-r1_little'),
        r1_rev_start: document.getElementById('sfx-r1_rev_start'),
        r1_rev_little: document.getElementById('sfx-r1_rev_little'),
        r1_rev_ring: document.getElementById('sfx-r1_rev_ring'),
        r1_rev_middle: document.getElementById('sfx-r1_rev_middle'),
        r1_rev_index: document.getElementById('sfx-r1_rev_index'),
        r2_start: document.getElementById('sfx-r2_start'),
        r3_start: document.getElementById('sfx-r3_start'),
        prayer_start: document.getElementById('sfx-prayer_start'),
        prayer_sway: document.getElementById('sfx-prayer_sway'),
        shake: document.getElementById('sfx-shake'),
        end: document.getElementById('sfx-end'),
    };
    
    // --- Helper Functions ---
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }
    
    function showHandImage(imageID, animationClass = '') {
        handDisplayArea.querySelectorAll('img').forEach(img => img.classList.remove('active', 'sway-animation', 'shake-animation'));
        const targetImage = document.getElementById(imageID);
        if (targetImage) {
            targetImage.classList.add('active');
            if (animationClass) {
                targetImage.classList.add(animationClass);
            }
        }
    }
    
    async function playSound(audioElement, extraDelay = 500) {
        const duration = audioElement.duration * 1000;
        audioElement.currentTime = 0;
        audioElement.play();
        await sleep(duration + extraDelay);
    }
    
    // --- App Flow ---

    // The main game sequence
    async function runGame() {
        showScreen('game');
        instructionText.textContent = ''; // Clear text initially
        
        await playSound(sfx.begin, 1000);
        
        // --- Round 1: Forward ---
        instructionText.textContent = "Touch your index finger.";
        showHandImage('hand-index');
        await playSound(sfx.r1_index, 1000);

        instructionText.textContent = "Touch your middle finger.";
        showHandImage('hand-middle');
        await playSound(sfx.r1_middle, 1000);

        instructionText.textContent = "Touch your ring finger.";
        showHandImage('hand-ring');
        await playSound(sfx.r1_ring, 1000);

        instructionText.textContent = "Touch your little finger.";
        showHandImage('hand-little');
        await playSound(sfx.r1_little, 1000);

        // --- Round 1: Reverse ---
        instructionText.textContent = "Now, let's go in reverse!";
        showHandImage('hand-notouching');
        await playSound(sfx.r1_rev_start, 1000);

        instructionText.textContent = "Touch your little finger again.";
        showHandImage('hand-little');
        await playSound(sfx.r1_rev_little, 1000);

        instructionText.textContent = "Touch your ring finger again.";
        showHandImage('hand-ring');
        await playSound(sfx.r1_rev_ring, 1000);
        
        instructionText.textContent = "Touch your middle finger again.";
        showHandImage('hand-middle');
        await playSound(sfx.r1_rev_middle, 1000);

        instructionText.textContent = "Touch your index finger again.";
        showHandImage('hand-index');
        await playSound(sfx.r1_rev_index, 1000);

        // --- Prayer Pose ---
        showHandImage('hand-notouching');
        await sleep(500);
        
        instructionText.textContent = "Now, press your palms together.";
        showHandImage('hand-prayer');
        await playSound(sfx.prayer_start, 1000);
        
        instructionText.textContent = "Gently move side to side.";
        showHandImage('hand-together', 'sway-animation');
        await playSound(sfx.prayer_sway, 5000);

        // --- Shake Hands ---
        instructionText.textContent = "Finally, let's shake it out!";
        showHandImage('hand-notouching', 'shake-animation');
        await playSound(sfx.shake, 5000);
        
        // --- Game End ---
        showScreen('end');
        instructionText.textContent = "";
        await playSound(sfx.end);
    }
    
    // --- Event Listeners ---
    buttons.start.addEventListener('click', async () => {
        // The game now starts after the welcome sound.
        await playSound(sfx.welcome, 100);
        runGame();
    });
    
    buttons.restart.addEventListener('click', runGame);

    // --- The app now starts by showing the welcome screen. No intro function is called. ---

});