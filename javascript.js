window.onload = function () {
	
	document.querySelector('body').style.opacity = 0;

	setTimeout(() => {
		document.querySelector('body').style.opacity = 1;
	});


	const body = document.querySelector('body'),
		tilesNumber = document.querySelector('#settings p span'),
		tilesInput = document.querySelector('#settings input'),
		startBtn = document.querySelector('#settings button[name=start]'),
		playArea = document.querySelector('#play-area');

	
	startBtn.addEventListener('click', () => {
		startBtn.setAttribute('disabled', '');
		tilesInput.setAttribute('disabled', '');
    

		
		for (let i = 0; i < tilesInput.value; i++) {
			playArea.innerHTML += '<div class="tile"><p></p></div>';
		}

		
		var numsToAssign = [];

		for (let i = 0; i < tilesInput.value / 2; i++) {
			numsToAssign.push(i, i);
		}

		
		var randomNum = Math.floor(Math.random() * tilesInput.value);
		var randomTile = document.querySelectorAll('.tile p')[randomNum];

		for (let i = 0; i < tilesInput.value; i++) {
			do {
				if (!randomTile.innerHTML) {
					randomTile.innerHTML = numsToAssign.shift();
				}

				randomNum = Math.floor(Math.random() * tilesInput.value);
				randomTile = document.querySelectorAll('.tile p')[randomNum];
			} while (randomTile.innerHTML && numsToAssign.length > 0)
		}

		startGame();
	});


	function startGame() {
		let tiles = document.querySelectorAll('.tile');
		let firstClickedTile;
		let secondClickedTile;

		
		for (let i = 0; i < tiles.length; i++) {
			tiles[i].addEventListener('click', matching);
		}

		function matching(e) {
			if (!firstClickedTile) {
				firstClickedTile = e.target.parentNode;
				firstClickedTile.firstChild.style.filter = 'blur(0px)';
			} else if (e.target.parentNode !== firstClickedTile) {
				secondClickedTile = e.target.parentNode;
				secondClickedTile.firstChild.style.filter = 'blur(0px)'

				
				if (firstClickedTile.firstChild.innerText == secondClickedTile.firstChild.innerText) {
					firstClickedTile.classList.add('matched');
					secondClickedTile.classList.add('matched');

					firstClickedTile.removeEventListener('click', matching);
					secondClickedTile.removeEventListener('click', matching);

					firstClickedTile.firstChild.style.filter = 'blur(0px)';
					secondClickedTile.firstChild.style.filter = 'blur(0px)';

					tilesClickDelayAndWinCheck();
				} else {
					setTimeout(() => {
						firstClickedTile.firstChild.style.filter = 'blur(50px)';
						secondClickedTile.firstChild.style.filter = 'blur(50px)';
					}, 400);

					tilesClickDelayAndWinCheck();
				}

				setTimeout(() => {
					firstClickedTile = undefined;
				}, 400);
			}
		}

		
		function tilesClickDelayAndWinCheck() {
			let notMatchedTiles = 0;

			for (let i = 0; i < tiles.length; i++) {
				tiles[i].removeEventListener('click', matching);

				if (!tiles[i].classList.contains('matched')) {
					notMatchedTiles++;
				}
			}

			if (notMatchedTiles === 0) {
				console.log('You won!');
				winMenu();
				return;
			}

			setTimeout(() => {
				for (let i = 0; i < tiles.length; i++) {
					tiles[i].addEventListener('click', matching);
				}
			}, 400);
		}

		function winMenu() {
			body.innerHTML += '<div id="winScreen"></div>';
			document.querySelector('#winScreen').innerHTML = '<p>WIN!</p>';

			setTimeout(() => {
				document.querySelector('#winScreen').style.background = 'rgba(0, 0, 0, .7)';
			}, 100);
			
			setTimeout(() => {
				body.removeChild(document.querySelector('#winScreen'));
			}, 2000);
		}
		
	}
}