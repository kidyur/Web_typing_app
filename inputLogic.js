
const LEFT = -1;
const RIGHT = 1;


window.onload = () => {
    function moveCaretTo(side) {
        [separated[caret], separated[caret + side]] = [separated[caret + side], separated[caret]];
        caret += side;
    }

    function paintSymbol(symbolInd, color) {
        var shift = 0;
        // Backspace case needs shift in texts symbol matching
        if (color == "grey") {
            shift = 1;
        }
        separated[symbolInd] = `<span style="color: ${color};">${text[symbolInd + shift]}</span>`;
    }

    let exampleEl = document.getElementsByClassName("text-example")[0];

        
    let text = "|Пример текста, чтобы тренировать скорость печати";
    let separated = text.split('')

    exampleEl.textContent = text;

    let caret = 0;
    let inputLength = 0;

    let inputField = document.getElementsByClassName("input-field")[0];
    inputField.addEventListener('input', () => {
        var newInputLength = inputField.value.length;
        // BACKSPACE KEY
        if (newInputLength < inputLength) {
            paintSymbol(caret-1, "grey");
            moveCaretTo(LEFT);
        // SYMBOL KEY
        } else if (newInputLength > inputLength) {
            var color = "red";
            // SYMBOLS MATCHED     
            if (inputField.value[caret] == text[caret+1]) {
                color = "green";
            }
            paintSymbol(caret+1, color);
            moveCaretTo(RIGHT);
        }

        // Updates value of visible text element
        exampleEl.innerHTML = separated.join('');

        inputLength = newInputLength;
    })

}