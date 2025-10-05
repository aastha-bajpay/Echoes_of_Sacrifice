document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const sacrificeModal = document.getElementById('sacrifice-modal');
    const winModal = document.getElementById('win-modal');
    const sacrificeOptions = document.getElementById('sacrifice-options');
    const restartButton = document.getElementById('restart-button');

    // Game state
    const TILE_SIZE = 30;
    const LEVEL_WIDTH = 15;
    const LEVEL_HEIGHT = 15;

    // 0 = Path, 1 = Wall, 2 = Player Start, 3 = Altar, 4 = Exit
    const levelMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 3, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 4, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 3, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    let playerPos = { x: 0, y: 0 };
    let abilities = {
        ArrowUp: true,
        ArrowDown: true,
        ArrowLeft: true,
        ArrowRight: true,
    };

    // --- Game Setup ---
    function initializeGame() {
        gameContainer.style.gridTemplateColumns = `repeat(${LEVEL_WIDTH}, ${TILE_SIZE}px)`;
        gameContainer.style.gridTemplateRows = `repeat(${LEVEL_HEIGHT}, ${TILE_SIZE}px)`;
        
        for (let y = 0; y < LEVEL_HEIGHT; y++) {
            for (let x = 0; x < LEVEL_WIDTH; x++) {
                if (levelMap[y][x] === 2) {
                    playerPos = { x, y };
                }
                const tile = document.createElement('div');
                tile.id = `tile-${x}-${y}`;
                tile.classList.add('tile');
                gameContainer.appendChild(tile);
            }
        }
        render();
        initialReveal(); // Reveal the maze at the start
        window.addEventListener('keydown', handleKeyPress);
        restartButton.addEventListener('click', () => location.reload());
    }

    // --- Rendering ---
    function render() {
        for (let y = 0; y < LEVEL_HEIGHT; y++) {
            for (let x = 0; x < LEVEL_WIDTH; x++) {
                const tile = document.getElementById(`tile-${x}-${y}`);
                // Clear previous classes
                tile.className = 'tile';
                
                switch (levelMap[y][x]) {
                    case 1: tile.classList.add('wall'); break;
                    case 3: tile.classList.add('altar'); break;
                    case 4: tile.classList.add('exit'); break;
                }
            }
        }
        // Draw player
        document.getElementById(`tile-${playerPos.x}-${playerPos.y}`).classList.add('player');
    }

    // --- Player Movement ---
    function handleKeyPress(e) {
        if (sacrificeModal.classList.contains('modal-visible') || winModal.classList.contains('modal-visible')) return; // Don't move if a modal is open

        let newPos = { ...playerPos };
        if (e.key === 'ArrowUp' && abilities.ArrowUp) newPos.y--;
        else if (e.key === 'ArrowDown' && abilities.ArrowDown) newPos.y++;
        else if (e.key === 'ArrowLeft' && abilities.ArrowLeft) newPos.x--;
        else if (e.key === 'ArrowRight' && abilities.ArrowRight) newPos.x++;
        else return; // Not a valid key or ability is sacrificed

        // Collision detection
        if (levelMap[newPos.y][newPos.x] !== 1) {
            playerPos = newPos;
            render();
            checkTile();
        }
    }

    // --- Tile Interaction ---
    function checkTile() {
        const currentTileType = levelMap[playerPos.y][playerPos.x];
        if (currentTileType === 3) { // Altar
            showSacrificeModal();
        } else if (currentTileType === 4) { // Exit
            winGame();
        }
    }

    // --- Sacrifice Mechanic ---
    function showSacrificeModal() {
        sacrificeModal.classList.remove('modal-hidden');
        sacrificeModal.classList.add('modal-visible');
        sacrificeOptions.innerHTML = ''; // Clear old options
        
        for (const ability in abilities) {
            if (abilities[ability]) {
                const button = document.createElement('button');
                button.textContent = `Sacrifice ${ability.replace('Arrow', '')}`;
                button.className = 'sacrifice-button';
                button.onclick = () => performSacrifice(ability);
                sacrificeOptions.appendChild(button);
            }
        }
    }

    function performSacrifice(abilityKey) {
        abilities[abilityKey] = false;
        levelMap[playerPos.y][playerPos.x] = 0; // Change altar to path after use

        sacrificeModal.classList.remove('modal-visible');
        sacrificeModal.classList.add('modal-hidden');
        
        // Update UI
        const abilityUI = document.getElementById(`ability-${abilityKey.replace('Arrow', '').toLowerCase()}`);
        abilityUI.classList.remove('ability-active');
        abilityUI.classList.add('ability-sacrificed');

        revealMaze();
    }

    function revealMaze() {
        const walls = document.querySelectorAll('.wall');
        walls.forEach(wall => wall.classList.add('visible'));

        setTimeout(() => {
            walls.forEach(wall => wall.classList.remove('visible'));
        }, 2000); // Maze is visible for 2 seconds
    }

    function initialReveal() {
        const walls = document.querySelectorAll('.wall');
        walls.forEach(wall => wall.classList.add('visible'));

        setTimeout(() => {
            walls.forEach(wall => wall.classList.remove('visible'));
        }, 5000); // Maze is visible for 5 seconds at the start
    }

    function winGame() {
        window.removeEventListener('keydown', handleKeyPress);
        winModal.classList.remove('modal-hidden');
        winModal.classList.add('modal-visible');
    }

    // --- Start the game ---
    initializeGame();
});