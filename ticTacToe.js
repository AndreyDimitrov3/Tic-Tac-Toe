document.addEventListener('DOMContentLoaded', function() {
    let maininnerHtml = "";
    let clicks = 0;
    let validation;
    let gameOver = false;

    function resetValidation() {
        validation = [];
        for(let i = 0; i < 9; i++) {
            if(i % 3 === 0) {
                validation.push([i + 1]);
            } else {
                validation[validation.length - 1].push(i + 1);
            }
        }
        gameOver = false;
    }
    resetValidation();

    for(let i = 1; i <= 9; i++) {
        maininnerHtml += `
            <div class="square" data-currentsquare="${i}"></div>
        `
    }
    document.getElementById("main").innerHTML += maininnerHtml;


    document.querySelectorAll("[data-currentsquare]").forEach(el => {
        el.addEventListener("click", function() {
            if(!gameOver && !el.classList.contains("xBackgroundImage") && !el.classList.contains("oBackgroundImage")){
                clicks % 2 === 0 ? el.classList.add("xBackgroundImage") : el.classList.add("oBackgroundImage")

                let player = clicks % 2 === 0 ? "x" : "o";
                addElementsToArray(el);
                winnerCheckerVertical(el, player);
                winnerCheckerHorizontal(el, player);
                winnerCheckerDiagonal(el, player);

                clicks++;
                if (!gameOver) {
                    draw();
                }
            }
        });
    });

    function addElementsToArray(el) {
        for(let i = 0; i < validation.length; i++) {
            for(let j = 0; j < validation[i].length; j++) {
                if(el.dataset.currentsquare == validation[i][j]){
                    validation[i][j] = clicks % 2 === 0 ? "x" : "o";
                    break;
                }
            }
        }
    }

    function winnerCheckerVertical(el, player) {
        let winner = true;
        const currentColumn = (el.dataset.currentsquare - 1) % 3;

        for(let i = 0; i < validation.length; i++) {
            if(validation[i][currentColumn] !== player) {
                winner = false;
                break;
            }
        }
        if(winner === true) gameWinner(player);
    }

    function winnerCheckerHorizontal(el, player) {
        let winner = true;
        const currentRow = Math.floor((el.dataset.currentsquare - 1) / 3);
        
        for(let i = 0; i < validation[currentRow].length; i++) {
            if(validation[currentRow][i] !== player) {
                winner = false;
                break;
            }
        }
        if(winner === true) gameWinner(player);
    }

    function winnerCheckerDiagonal(el, player) {
        const currentSquare = Number(el.dataset.currentsquare);
        let winner = true;
        let leftCheck = 0;
        let rightCheck = 2;

        if(currentSquare % 2 === 0) return;

        if(currentSquare === 1 || currentSquare === 5 || currentSquare === 9) {
            for(let i = 0; i < 3; i++) {
                if(validation[i][leftCheck] !== player) {
                    winner = false;
                    break;
                }
                leftCheck += 1;
            }
        }
        
        if(currentSquare === 3 || currentSquare === 5 || currentSquare === 7) {
            for(let i = 0; i < 3; i++) {
                if(validation[i][rightCheck] !== player) {
                    winner = false;
                    break;
                }
                rightCheck -= 1;
            }
        }

        if(winner === true) gameWinner(player);
    }

    function restartGame() {
        clicks = 0;
        resetValidation();
        document.querySelectorAll("[data-currentsquare]").forEach(el => {
            el.classList.remove("xBackgroundImage", "oBackgroundImage")
        });
    }

    function gameWinner(player) {
        gameOver = true;
        setTimeout(() => {
            alert(`${player.toUpperCase()} is the winner!`);
            restartGame();
        }, 50);
    }

    function draw() {
        if (clicks === 9 && !gameOver) {
            setTimeout(() => {
                alert("It's a draw!");
                restartGame();
            }, 50);
        }
    }
})
