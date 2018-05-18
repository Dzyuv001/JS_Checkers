var turn = true; // who's turn it is.
var isGameEnded = false; // has the game ended
var player1 = 1, player2 = 1; // used to check if player has removed the enemy checkers
var aiDifficulty; // Ai dificulty level 
var previewIds = []; // stores the possible momvent locations
var attacked = []; // stores the elments on the baord that will be attacked and removed 
var yCoor, xCoor; //stores the current x and y of selected checker
var checkClass = "";// stores the class of selected checker 
var matricsX = [-1, 1]; // movment matreis for the x axis 
var matricsY = [-1, 1]; // movment matreis for the y axis 

function changeTurn() { //used to change turn
    turn = !turn;
}

function makeMove(y, x) {// used to set up the check for movement
    if (!isGameEnded) {
        clearPreview();
        cleanUp();
        yCoor = y;
        xCoor = x;
        checkClass = $("#c" + y + "_" + x).children().attr("class");
        getPossibleMoves(y, x);
        movePreview();
    }
}

function checkTeam(y, x) {// check what team's checker is being pressed
    if (((shortId(y, x).find(".chkw").length !== 0 || shortId(y, x).find(".chkW").length !== 0) && turn) ||
        ((shortId(y, x).find(".chkb").length !== 0 || shortId(y, x).find(".chkB").length !== 0) && !turn)) {
        return true;
    } else {
        return false;
    }
}

function checkType(y, x) {//check what type of checker was selected
    if (shortId(y, x).find(".chkw").length !== 0) {
        return 0;
    } else if (shortId(y, x).find(".chkb").length !== 0) {
        return 1;
    } else if (shortId(y, x).find(".chkB").length !== 0 || shortId(y, x).find(".chkW").length !== 0) {
        return 2;
    }
}

function getPossibleMoves(y, x) { //used to create an array of possible moves 
    if (checkTeam(y, x)) {
        var chekerType = checkType(y, x);
        if (chekerType < 2) {
            for (var i = 0; i < 2; i++) {
                if (isOnBoard(y + matricsY[chekerType], x + matricsX[i])) {
                    previewIds.push([y + matricsY[chekerType], x + matricsX[i]]);
                } else if (isOnBoard(y + matricsY[chekerType] * 2, x + matricsX[i] * 2)) {
                    previewIds.push([y + matricsY[chekerType] * 2, x + matricsX[i] * 2]);
                    attacked.push([y + matricsY[chekerType], x + matricsX[i]]);
                }
            }
        } else {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < chekerType; j++) {
                    if (isOnBoard(y + matricsY[i], x + matricsX[j])) {
                        previewIds.push([y + matricsY[i], x + matricsX[j]]);
                    } else if (isOnBoard(y + matricsY[i] * 2, x + matricsX[j] * 2)) {
                        previewIds.push([y + matricsY[i] * 2, x + matricsX[j] * 2]);
                        attacked.push([y + matricsY[i], x + matricsX[j]]);
                    }
                }
            }
        }
    }
}

function actMove(y, x) { //enacts the move
    var divClass = checkClass.charAt(3);
    var checkerType = "";
    if (divClass !== divClass.toUpperCase()) {
        checkerType = "●";
    } else {
        checkerType = "⍟";
    }
    $("#c" + y + "_" + x).append("<div class=" + checkClass +
        " onclick=\"makeMove(" + y + "," + x + ")\">" + checkerType + "</div>");
    cleanUp();
    $("#c" + yCoor + "_" + xCoor).empty();
    clearPreview();
    attack();
    upgrade(y, x);
    checkWin();
    changeTurn();
}

function cleanUp() { //removes preview moves
    $(".chkG").remove();
}

function clearPreview() {//clear the preview array 
    previewIds = [];
}

function movePreview() {// draw the preview move locations
    for (var i = 0; i < previewIds.length; i++) {
        $("#c" + previewIds[i][0] + "_" +
            previewIds[i][1]).append("<div class=\"chkG\" onclick=\"actMove(" +
                previewIds[i][0] + "," + previewIds[i][1] + ")\">●</div>");
    }
}

function isOnBoard(preY, preX) { // used to check if a move will be on the board
    if (-1 < preX && preX < 8 || -1 < preY && preY < 8) {
        return isCoordClear(preY, preX);
    }
    return false;
}

function isCoordClear(y, x) {// heck if the coordiante on the baord is clear
    var chks = [];
    if (turn) {
        chks.push(".chkB", ".chkb");
    } else {
        chks.push(".chkW", ".chkw");
    }
    if ((shortId(y, x).find(chks[0]).length == 0) && (shortId(y, x).find(chks[1]).length == 0)) {
        return true;
    } else {
        return false;
    }
}

function attack() { // will be used to remove enemy checkers and increment the players score
    for (var i = 0; i <= attacked.length - 1; i++) {
        $("#c" + attacked[i][0] + "_" + attacked[i][1]).empty();
        player2--;
        attacked = [];
    }
}

function shortId(y, x) { //used to clea-up element id location 
    return $("#c" + y + "_" + x);
}

function upgrade(y, x) { //will upgrade a regular cheker
    var divClass = checkClass.charAt(3);
    var yArea;
    if (turn) {
        yArea = 0;
    } else {
        yArea = 7;
    }
    if (divClass !== divClass.toUpperCase()) {
        if (-1 < x && x < 7 && y == yArea) {
            shortId(y, x).empty();
            shortId(y, x).append("<div class=" + checkClass.substring(0, 3) +
                divClass.toUpperCase() + " onclick=\"makeMove(" + y + "," + x + ")\">⍟</div>");
        }
    }
}

function updateScoreBoard() {// update score board
    $("#lblGameScore").text((12 - player1) + " - " + (12 - player1));
}

function checkWin() { //check if a player has won 
    if (turn) {
        if (player2 == 0) {
            $("#lblVict").text("Player 1 has won");
            isGameEnded = true;
        }
    } else {
        if (player1 == 0) {
            $("#lblVict").text("Player 2 has won");
            isGameEnded = true;
        }
    }
}