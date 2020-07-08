var keysArr = ["samochód", "myszka", "pegout"];
var key = keysArr[(Math.floor(Math.random()*3))];
var arrLetters = new Array(35);
var numberOfFails = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

arrLetters[0] = "A";
arrLetters[1] = "Ą";
arrLetters[2] = "B";
arrLetters[3] = "C";
arrLetters[4] = "Ć";
arrLetters[5] = "D";
arrLetters[6] = "E";
arrLetters[7] = "Ę";
arrLetters[8] = "F";
arrLetters[9] = "G";
arrLetters[10] = "H";
arrLetters[11] = "I";
arrLetters[12] = "J";
arrLetters[13] = "K";
arrLetters[14] = "L";
arrLetters[15] = "Ł";
arrLetters[16] = "M";
arrLetters[17] = "N";
arrLetters[18] = "Ń";
arrLetters[19] = "O";
arrLetters[20] = "Ó";
arrLetters[21] = "P";
arrLetters[22] = "Q";
arrLetters[23] = "R";
arrLetters[24] = "S";
arrLetters[25] = "Ś";
arrLetters[26] = "T";
arrLetters[27] = "U";
arrLetters[28] = "V";
arrLetters[29] = "W";
arrLetters[30] = "X";
arrLetters[31] = "Y";
arrLetters[32] = "Z";
arrLetters[33] = "Ż";
arrLetters[34] = "Ź";

key = key.toUpperCase();

var key_length = key.length;

var dashed_key = "";

for (i = 0; i < key_length; i++) 
{
    if (key.charAt(i)==" ") 
    {
        dashed_key+= " ";
    }
    else
    {
        dashed_key+= "-";
    }
}

function write_key()
{
    document.getElementById("board").innerHTML = dashed_key;
}

window.onload = start;

function start()
{
    var divText = "";

    for(i=0;i<35;i++)
    {
        var element = "lit" + i;
        divText += '<div class="letter" onclick="check('+ i +')" id="' + element + '">'+arrLetters[i]+'</div>';
        if((i+1)%7==0)
        {
            divText += '<div style="clear:both;"></div>';
        }
    }

    document.getElementById("alphabet").innerHTML = divText;

    write_key();
}

String.prototype.changeToLetter = function(location, character)
{
    if(location > this.length - 1) return this.toString();
    else return this.substr(0, location) + character + this.substr(location + 1);
}

function check(numberToCheck)
{
    var exist = false;

    for(i=0; i<key_length; i++)
    {
        if(key.charAt(i) == arrLetters[numberToCheck])
        {
            dashed_key = dashed_key.changeToLetter(i, arrLetters[numberToCheck]);
            exist = true;
        }
    }

    if(exist)
    {
        yes.play();
        var element = "lit" + numberToCheck;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        write_key();
    }
    else
    {
        no.play();
        var element = "lit" + numberToCheck;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");

        numberOfFails++;
        var picture = "img/s" + numberOfFails + ".jpg";
        document.getElementById("hangman").innerHTML = '<img src="'+picture+'" alt="" />';
    }

    //win
    if(key == dashed_key)
    {
        document.getElementById("alphabet").innerHTML = 'Great! You got the key: <br/><br/>' + key + '<br/><br/><span class="reset" onclick="location.reload()">One more time?</span>'
    }
    //lose
    if(numberOfFails>=9)
    {
        document.getElementById("alphabet").innerHTML = 'GAME OVER!<br/><br/>You are dead!<br/><br/><span class="gameOver" onclick="location.reload()">Another try?</span>'
    }
}