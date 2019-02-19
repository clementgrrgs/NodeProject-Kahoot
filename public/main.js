var question = ({numQuestion}) =>
      `
      <div id="div_question_${numQuestion}">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="question_${numQuestion}">
                        <label class="mdl-textfield__label" for="question_${numQuestion}">Question...</label>
                    </div>
                </div>

                <div id="div_response_${numQuestion}">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response1_${numQuestion}">
                        <label class="mdl-textfield__label" for="response1_${numQuestion}">Response 1...</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response2_${numQuestion}">
                        <label class="mdl-textfield__label" for="response2_${numQuestion}">Response 2...</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response3_${numQuestion}">
                        <label class="mdl-textfield__label" for="response3_${numQuestion}">Response 3...</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="response4_${numQuestion}">
                        <label class="mdl-textfield__label" for="response4_${numQuestion}">Response 4...</label>
                    </div>
                </div>

                <div id="div_duration_${numQuestion}">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="duration_${numQuestion}">
                        <label class="mdl-textfield__label" for="duration_${numQuestion}">duration...</label>
                        <span class="mdl-textfield__error">Input is not a number!</span>
                    </div>
                </div>
      `;

var numQuestion = 0;

document.getElementById('btn_Add_Question').addEventListener('click', (event) => {
        event.preventDefault();
        numQuestion++;
        var divQuestion = document.getElementById('questions');
        var newQuestion = question({numQuestion});
        divQuestion.appendChild(newQuestion);
});