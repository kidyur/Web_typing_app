function swap(a, b) {
    if (typeof a != typeof b) {
        throw new Error("swap(A, B) : A and B must be the same type variables");
    }
    [a, b] = [b, a];
}

class InputField {
    LEFT = -1;
    RIGHT = 1;
    TEXT_CORRECT_COLOR = "var(--cur-correct-text-color)";
    TEXT_UNFILLED_COLOR = "var(--cur-empty-text-color)";
    TEXT_UNCORRECT_COLOR = "var(--cur-wrong-text-color)";
    CARET_ACTIVE_STYLE = "input__caret input__caret--blinking";
    CARET_INACTIVE_STYLE = "input__caret input__caret--hidden";
    text = "|Пример текста, чтобы тренировать скорость печати";
    separated = text.split('');
    caret = 0;
    inputLength = 0;
    exampleEl = document.getElementsByClassName("text-example")[0];
    inputEl = document.getElementById("input-field")[0];
    static #instance;

    constructor() {
        if (InputField.#instance) {
            return InputField.#instance;
        }
        this.inputEl.addEventListener("input", () => handleInput());
        this.inputEl.addEventListener("focus", () => setCaretStyle(CARET_ACTIVE_STYLE));
        this.inputEl.addEventListener("blur",  () => setCaretStyle(CARET_INACTIVE_STYLE));
        this.resetForm();
        InputField.#instance = this;
        return this;
    }

    moveCaret(side) {
        swap(this.separated[this.caret], this.separated[this.caret + side]);
        this.caret += side;
    }
    
    paintSymbol(symbolInd, color) {
        var shift = 0;
        // Backspace case needs shift in texts symbol matching
        if (color == TEXT_UNFILLED_COLOR) {
            shift = 1;
        }
        this.separated[symbolInd] = `<span style="color: ${color};">${this.text[symbolInd + shift]}</span>`;
    }
    
    updateExample() {
        this.exampleEl.innerHTML = separated.join('');
    }
    
    setCaretStyle(styles) {
        this.separated[this.caret] = `<span class="${styles}">|</span>`;
        this.updateExample();
    }
    
    resetForm() {
        this.text = "|Пример текста, чтобы тренировать скорость печати";
        this.separated = text.split('');
        this.caret = 0;
        this.setCaretStyle(CARET_INACTIVE_STYLE);
        this.inputLength = 0;
        this.inputEl.value = "";
        this.inputEl.blur();
        this.updateExample();
    }

    handleInput() {
        let diff = this.inputEl.value.length - this.inputLength;
        const gap = 1 * diff / Math.abs(diff);
        this.inputLength += diff;
        // The cycle is way to deal with a CTRL+BACKSPACE case
        while (diff != 0) {
            let color = TEXT_UNCORRECT_COLOR;
            if (gap == -1) {
                color = TEXT_UNFILLED_COLOR;
            } else if (newSymbol == text[this.caret + gap]) {
                color = TEXT_CORRECT_COLOR;
            } 
            this.paintSymbol(this.caret + gap, color); 
            this.moveCaret(gap);
            diff -= gap;
        }

        // /* Preventing key holding */ 
        // const IS_KEY_MISSED = (newSymbol == ' ' && text[caret] != ' ');
        // const IS_SPACE_MISSED = (newSymbol != ' ' && text[caret] == ' ');
        // if (IS_KEY_MISSED || IS_SPACE_MISSED) {
        //     paintSymbol(caret-1, TEXT_UNFILLED_COLOR);
        //     moveCaret(LEFT);
        //     inputLength -= 1;
        //     inputEl.value = newText.slice(0, -1);
        // }
        this.updateExample();
    }
}
