
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

    let input = document.getElementsByClassName("input-field")[0];
    input.addEventListener("input", () => {
        
        var newText = input.value;
        var newLength = newText.length;
        var newSymbol = newText.at(-1);
        // BACKSPACE KEY
        if (newLength < inputLength) {
            var changes = inputLength - newLength;
            // The cycle is way to deal with a CTRL+BACKSPACE case
            while (changes > 0) {
                paintSymbol(caret-1, "grey");
                moveCaretTo(LEFT);
                changes -= 1;
            }
            // SYMBOL KEY
        } else if (newLength > inputLength) {
            var color = "red";
            // SYMBOLS MATCHED     
            if (newSymbol == text[caret+1]) {
                color = "green";
            }
            paintSymbol(caret+1, color);
            moveCaretTo(RIGHT);
        }

        // Accepts space only if it is necessary
        // To avoid space pressing error
        if (newSymbol == ' ' && text[caret] != ' ') {
            paintSymbol(caret-1, "grey");
            moveCaretTo(LEFT);
            newLength -= 1;
            input.value = newText.slice(0, -1);
        }

        // Updates value of visible text element
        exampleEl.innerHTML = separated.join('');

        inputLength = newLength;
    })

}