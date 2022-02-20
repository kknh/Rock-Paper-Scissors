const mainScreen = document.getElementById('main-screen')
const choiceScreen = document.getElementById('choice-screen')
const weapons = document.querySelector('.weapons')
const resultAnnounce = document.getElementById('result-announce')
const replayBtn = document.getElementById('replay-btn')
// Creating players factory
function createPlayer() {
	let score = 0
	let weapon = ''
	return { score, weapon }
}

// Start new game factory
function startNewGame() {
	return {
		player: createPlayer(),
		computer: createPlayer(),
		roundResult: '',
	}
}

function replay() {
	choiceScreen.classList.remove('hide')
	mainScreen.classList.add('hide')
}

function computerChooseWeapon() {
	const weapons = ['rock', 'paper', 'scissors']
	const random = Math.floor(Math.random() * weapons.length)
	game.computer.weapon = weapons[random]
}

function checkWinner() {
	if (game.player.weapon === 'rock') {
		if (game.computer.weapon === 'rock') {
			game.roundResult = 'tie'
			showResult()
			return
		}
		if (game.computer.weapon === 'scissors') {
			game.roundResult = 'win'
			showResult()
			return
		}
		if (game.computer.weapon === 'paper') {
			game.roundResult = 'lost'
			showResult()
			return
		}
	}
	if (game.player.weapon === 'paper') {
		if (game.computer.weapon === 'paper') {
			game.roundResult = 'tie'
			showResult()
			return
		}
		if (game.computer.weapon === 'rock') {
			game.roundResult = 'win'
			showResult()
			return
		}
		if (game.computer.weapon === 'scissors') {
			game.roundResult = 'lost'
			showResult()
			return
		}
	}
	if (game.player.weapon === 'scissors') {
		if (game.computer.weapon === 'scissors') {
			game.roundResult = 'tie'
			showResult()
			return
		}
		if (game.computer.weapon === 'paper') {
			game.roundResult = 'win'
			showResult()
			return
		}
		if (game.computer.weapon === 'rock') {
			game.roundResult = 'lost'
			showResult()
			return
		}
	}
}

// Check, add and show result Function
function showResult() {
	if (game.roundResult === 'tie') {
		resultAnnounce.classList.remove('red')
		resultAnnounce.classList.remove('green')
		resultAnnounce.innerText = "It's a tie! 🤣"
		return
	}
	if (game.roundResult === 'win') {
		resultAnnounce.classList.remove('red')
		resultAnnounce.classList.add('green')
		resultAnnounce.innerText = 'You Won! 😍'
		return
	}
	if (game.roundResult === 'lost') {
		resultAnnounce.classList.remove('green')
		resultAnnounce.classList.add('red')
		resultAnnounce.innerText = 'You lost! 😢'
		return
	}
}

// Starting new game initialy
let game = startNewGame()

weapons.addEventListener('click', (e) => {
	if (e.target.closest('[data-weapon')) {
		//Player chooses weapon
		const weapon = e.target.dataset.weapon
		game.player.weapon = weapon
		//Computer chooses weapon
		computerChooseWeapon()
		//Checking who won
		checkWinner()
		//Show main screen
		mainScreen.classList.remove('hide')
		choiceScreen.classList.add('hide')
	}
})

replayBtn.addEventListener('click', replay)
