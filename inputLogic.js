
const LEFT = -1;
const RIGHT = 1;
const CARET_ACTIVE_STYLE = "input__caret input__caret--blinking";
const CARET_INACTIVE_STYLE = "input__caret input__caret--hidden";


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

    function setCaretStyle(styles) {
        separated[caret] = `<span class="${styles}">|</span>`;
        updateExample();
    }

    function resetForm() {
        updateExample();
        setCaretStyle(CARET_INACTIVE_STYLE);
    }

    inputEl.addEventListener("input", () => {
        
        var newText = inputEl.value;
        var newLength = newText.length;
        var newSymbol = newText.at(-1);

        const BACKSPACE = (newLength < inputLength);
        const KEY = (newLength > inputLength);

        if (BACKSPACE) {
            var changes = inputLength - newLength;
            inputLength -= changes;
            // The cycle is way to deal with a CTRL+BACKSPACE case
            while (changes > 0) {
                paintSymbol(caret-1, "grey");
                moveCaretTo(LEFT);
                changes -= 1;
            }
        } else if (KEY) {
            var color = "red";
            // SYMBOLS MATCHED     
            if (newSymbol == text[caret+1]) {
                color = "green";
            }
            paintSymbol(caret+1, color);
            moveCaretTo(RIGHT);
            inputLength += 1;
        }

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

    inputEl.addEventListener("focus", () => {
        setCaretStyle(CARET_ACTIVE_STYLE);
    })

    inputEl.addEventListener("blur", () => {
        setCaretStyle(CARET_INACTIVE_STYLE);
    })

    resetForm();
}