//fetch all the class to update in the UI.
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

//creating Variable
let currentPlayer;
let gameGrid; //

//make an array of all possible winning outcomes.
const winningPosition = [
    [0,1,2],
    [3,4,6],
    [7,8,9],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets make a function to initialize the game;

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI ko empty krna hoga boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents="all";
        box.classList = `box box${index+1}`;
   });
    newgamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){ //swap turn wala function
    if(currentPlayer=="X"){
        currentPlayer = "O";
    }
    else
    currentPlayer="X";
   // UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`; //lastly UI update and current player bhi update ho jayega.
}

function checkGameOver(){
    // newgamebtn.classList.add("active");
    let answer = "";

    winningPosition.forEach((position) => {
        //All three boxes are non empty and the values are same
        if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "")
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]]==="X")
            answer = "X";
            else
            answer = "O";

            //disable pointer events.
            boxes.forEach((box) => {
                box.style.pointerEvents="none";
            });

            //now we know X/O who is the winner then make the background green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer != ""){
        gameInfo.innerText = `Winning Player - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }  

    let fillcount = 0;
    gameGrid.forEach((box) => {
        if(box != "")
        fillcount++;
    });

    if(fillcount === 9){
        gameInfo.innerText = `Game Tied !`;
        newgamebtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer; //update on UI . It shows ki konsa box me fill ho gya
        gameGrid[index]=currentPlayer; //update on backend part yaani ki line no.26 me update kr dega ki uska wo box fill ho gya
        boxes[index].style.pointerEvents="none"; //pointerevents lagane ke peeche yeh karan ki jaha jaha mera box fill ho gya ab wala cursor pointer nhi rhega.

        //turn ko swap krne ke liye swapTurn function
        swapTurn();

        //Checking ki game over toh nhi ho gya toh uske liye function
        checkGameOver();
    }
}


//Event listener in all boxes
boxes.forEach((box,index) => {
    box.addEventListener("click", () => { //onClick wala eventListener add kiye and index isliye pass kiye taaaki pata chale konsa box me exactly click kiye
        handleClick(index);
    })
})

newgamebtn.addEventListener("click", initGame);