document.getElementById('homeNotConnected').style.display = 'flex';
document.getElementById('HomeLobby').style.display = 'none';
document.getElementById('duringQuizz').style.display = 'none';
document.getElementById('endQuizz').style.display = 'none';


document.getElementById("enter_Quizz").addEventListener("click", (event) => {
    event.preventDefault();
    var quizzPin = document.getElementById('pin_quizz').value;
    var pseudo = document.getElementById('pseudo').value;
    var oScore = {name: pseudo,
                score : 0};

                
    var answer1 = document.getElementById('answer1');           
    var answer2 = document.getElementById('answer2');          
    var answer3 = document.getElementById('answer3');            
    var answer4 = document.getElementById('answer4');
    
    answer1.addEventListener("click", () => {
        socket.emit("response", {resp : 1, pseudo : pseudo});
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    });

    answer2.addEventListener("click", () => {
        socket.emit("response", {resp : 2, pseudo : pseudo});
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    });

    answer3.addEventListener("click", () => {
        socket.emit("response", {resp : 3, pseudo : pseudo});
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    });

    answer4.addEventListener("click", () => {
        socket.emit("response", {resp : 4, pseudo : pseudo});
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    });

    var socket = io('/quizz'+quizzPin);
    socket.on('ackConnection', function() {
            document.getElementById('homeNotConnected').style.display = 'none';
            document.getElementById('HomeLobby').style.display = 'flex';
            socket.emit('Eventpseudo', pseudo);
    });

    socket.on('Players', function(players) {
        var Listplayers = document.getElementById('id_li_Connected_player');
        Listplayers.innerHTML = "";        
        for(var i=0;i<players.length; i++){
            Listplayers.innerHTML += '<li>'+players[i]+'</li>';
        }
    });
    
    socket.on('go',(time) => {
        document.getElementById('HomeLobby').style.display = 'none';
        document.getElementById('duringQuizz').style.display = 'flex';
        document.getElementById('Text_question').innerHTML = '<h2>The battle will begin in '+time+' second</h2>';
        var timeLeft = time;
        var IntQuest = setInterval(() => {
            timeLeft --;  
            document.getElementById('Text_question').innerHTML = '<h2>The battle will begin in '+timeLeft+' second</h2>';
            if (timeLeft <= 0){
                clearInterval(IntQuest);
            }
        }, 1000);
    });

    socket.on('question', (oQuest) => {
            var textQuest = oQuest.quest.text;
            var aAnswer = [oQuest.quest.response[0],oQuest.quest.response[1],oQuest.quest.response[2],oQuest.quest.response[3]];
            var duration = oQuest.time;
            var answer = 0;

            document.getElementById('Text_question').innerHTML = '<h2>'+textQuest+'</h2>';
            document.getElementById('Time_Left').innerHTML =  oQuest.time;

            answer1.innerText = aAnswer[0];
            answer2.innerText = aAnswer[1];
            answer3.innerText = aAnswer[2];
            answer4.innerText = aAnswer[3];
            answer1.disabled = false;
            answer2.disabled = false;
            answer3.disabled = false;
            answer4.disabled = false;

            var timeLeft = oQuest.time;
            var IntQuest = setInterval(() => { 
                timeLeft --;  
                document.getElementById('Time_Left').innerHTML = timeLeft;
                
                if (timeLeft <= 0){
                    clearInterval(IntQuest);
                }
            }, 1000);
    });


    socket.on('Correct', (message) => {
        document.getElementById('IsAnswerCorrect').innerHTML = message.text;
        if(message.text == 'This is a right Answer' && oScore.name == message.pseudo){
            console.log(oScore.score);
            oScore.score = oScore.score + 1;   
        } 
        document.getElementById('point').innerHTML =  "Current score : "+oScore.score;
    });


    socket.on('quizzDone', () => {
        socket.emit('result', oScore);
        document.getElementById('duringQuizz').style.display = 'none';
        document.getElementById('endQuizz').style.display = 'flex';
        document.getElementById('finalScore').innerHTML = "Your score : "+oScore.score;
    });

});