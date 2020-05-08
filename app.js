/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, active;

//Default settings
newgame();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (scores[0] < 100 && scores[1] < 100) {
        //1.Get random number
        var dice = Math.floor((Math.random() * 6)) + 1;

        //2.Display the no. with dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.opacity = '1';
        diceDOM.src = 'css/dice-' + dice + '.png';

        if (dice != 1) {
            //3.Update the RoundScore if no. is not equal to 1
            roundScores[active] += dice;
            document.querySelector('#currScore-' + active).textContent = roundScores[active];
        } else {
            //Round Score to zero
            round();
            //NEXT PLAYER
            nextplayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (scores[0] < 100 && scores[1] < 100) {
        //Add round score to global scores
        scores[active] += roundScores[active];

        //Display Scores in UI
        document.getElementById('score-' + active).textContent = scores[active];

        //Round score to zero
        round();

        //score>100 then winner
        if (scores[active] >= 100) {
            document.getElementById('player-' + active).textContent = 'WINNER!';
            document.querySelector('.dice').style.opacity = '0';
            document.querySelector('.panel-' + active).classList.add('winner');
            document.querySelector('.panel-' + active).classList.remove('active');
        } else {
            //NEXT PLAYER
            nextplayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function () {
    if (scores[0] >= 100 || scores[1] >= 100) {
        document.querySelector('.panel-' + active).classList.remove('winner');
    }
    //Default settings
    newgame();

    document.querySelector('.panel-0').classList.add('active');
    document.querySelector('.panel-1').classList.remove('active');

});

function nextplayer() {
    document.querySelector('.panel-0').classList.toggle('active');
    document.querySelector('.panel-1').classList.toggle('active');
    document.querySelector('.dice').style.opacity = '0';
    active = (active + 1) % 2;
}

function round() {
    roundScores[active] = 0;
    document.querySelector('#currScore-' + active).textContent = roundScores[active];

}

function newgame() {
    scores = [0, 0];
    roundScores = [0, 0];
    active = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('currScore-0').textContent = '0';
    document.getElementById('currScore-1').textContent = '0';
    document.querySelector('.dice').style.opacity = '0';
    document.getElementById('player-0').textContent = prompt('Player-1 Name');
    document.getElementById('player-1').textContent = prompt('Player-2 Name');
}