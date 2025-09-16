
const LEFT = -1;
const RIGHT = 1;


window.onload = () => {
    const exampleEl = document.getElementsByClassName("text-example")[0];
    const inputEl = document.getElementsByClassName("input-field")[0];

    let text = "|Пример текста, чтобы тренировать скорость печати";
    let separated = text.split('');
    let caret = 0;
    let inputLength = 0;

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

    function updateExample() {
        exampleEl.innerHTML = separated.join('');
    }

    updateExample()

    inputEl.addEventListener("input", () => {
        
        var newText = inputEl.value;
        var newLength = newText.length;
        var newSymbol = newText.at(-1);
        // BACKSPACE KEY
        if (newLength < inputLength) {
            var changes = inputLength - newLength;
            inputLength -= changes;
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
            inputLength += 1;
        }

        // Accepts space only if it is necessary
        // To avoid space pressing error
        const IS_KEY_MISSED = (newSymbol == ' ' && text[caret] != ' ');
        const IS_SPACE_MISSED = (newSymbol != ' ' && text[caret] == ' ');
        if (IS_KEY_MISSED || IS_SPACE_MISSED) {
            paintSymbol(caret-1, "grey");
            moveCaretTo(LEFT);
            inputLength -= 1;
            inputEl.value = newText.slice(0, -1);
        }

        updateExample();
    })

}