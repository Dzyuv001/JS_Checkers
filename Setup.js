var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
var lblHoriz = ["<div class=\"lblHoriz \">", "</div>"];
var lblVert = ["<div class=\"lblVert \">", "</div>"];
var board = ["<div id =  ", "></div>"];
var boardClass = ["class=\"b\"", "class=\"w\""];
var boardColour = false;
var smallBoardEleme = "<div class=\"smallBoardElem\"></div>";

function colourPick() {
    boardColour = !boardColour;
    if (boardColour) {
        return boardClass[1];
    } else {
        return boardClass[0];
    }
}

function makeletter() {
    $('#board').append(smallBoardEleme);
    for (var i = 0; i < 8; i++) {
        $("#board").append(lblHoriz[0] + letters[i] + lblHoriz[1]);
    }
    $('#board').append(smallBoardEleme);
}

function makeletterMore(index) {
    $("#board").append(lblVert[0] + numbers[7 - index] + lblVert[1]);
}

function ap(elem) {// shortening the $("#board").append
    $("#board").append(elem);
}

makeletter();
for (var i = 0; i < 8; i++) {
    makeletterMore(i);
    for (var j = 0; j < 8; j++) {
        $("#board").append(board[0] + "\"c" + i + "_" + j + "\"" + colourPick() + board[1]);
        if (!boardColour) {
            if (i > -1 && i < 3) {
                $("#c" + i + "_" + j + "")
                .append("<div class=\"chkb\" onclick=\"makeMove(" + i + "," + j + ")\">●</div>");
            }
            if (i > 4) {
                $(String("#c" + i + "_" + j + ""))
                .append("<div class=\"chkw\" onclick=\"makeMove(" + i + "," + j + ")\">●</div>");
            }
        }
    }
    boardColour = !boardColour;
    makeletterMore(i);
}
makeletter();