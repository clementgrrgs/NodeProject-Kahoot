
var question = ({numQuestion}) =>
    `
      <div id="div_question_${numQuestion}">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="question_${numQuestion}" name="questions[${numQuestion}][text]">
                        <label class="mdl-textfield__label" for="question_${numQuestion}">Question...</label>
                    </div>
                </div>

                <div id="div_response_${numQuestion}">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response1_${numQuestion}" name="questions[${numQuestion}][response][0]">
                        <label class="mdl-textfield__label" for="response1_${numQuestion}">Response 1...</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response2_${numQuestion}" name="questions[${numQuestion}][response][1]">
                        <label class="mdl-textfield__label" for="response2_${numQuestion}">Response 2...</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response3_${numQuestion}" name="questions[${numQuestion}][response][2]">
                        <label class="mdl-textfield__label" for="response3_${numQuestion}">Response 3...</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response4_${numQuestion}" name="questions[${numQuestion}][response][3]">
                        <label class="mdl-textfield__label" for="response4_${numQuestion}">Response 4...</label>
                    </div>
                </div>

                <div id="div_select_${numQuestion}">
                    <h6>Choose the right answer !!</h6>
                    <select name="questions[${numQuestion}][answer]">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
      `;

var numQuestion = 0;

document.getElementById('btn_Add_Question').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('questions').innerHTML += (question({numQuestion}));
    numQuestion++;
});