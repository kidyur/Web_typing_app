
class Timer {
    static #instance;

    startMoment;
    time;
    clockEl = document.getElementById('clock');

    constructor() {
        if (Timer.#instance) {
            return Timer.#instance;
        }
        Timer.#instance = this;
        return this;
    }

    start() {
        this.startMoment = performance.now();
        this.clockEl.style.animationPlayState = 'running';
    }

    stop() {
        this.time = performance.now() - this.startMoment;
        this.clockEl.style.animationPlayState = 'paused';
    }
}

// INPUT -- BEGINNING
class InputField {
    text = "";
    caret = 0;
    inputLength = 0;
    exampleEl = document.getElementsByClassName("text-example")[0];
    symbols = [];
    inputEl = document.getElementById("input-field");
    
    static #instance;

    constructor() {
        if (InputField.#instance) {
            return InputField.#instance;
        }
        this.exampleEl.addEventListener('click', () => this.inputEl.focus());
        this.inputEl.addEventListener("input",   () => this.handleInput());
        this.inputEl.addEventListener("focus",   () => { this.symbols[this.caret].className = "input__caret input__caret--blinking" });
        this.inputEl.addEventListener("blur",    () => { this.symbols[this.caret].className = "input__caret input__caret--hidden" });
        this.resetForm();
        InputField.#instance = this;
        return this;
    }

    moveCaret(side) {
        const nextSymbol = this.symbols[this.caret+side].textContent;
        const nextSymbolStyle = this.symbols[this.caret+side].className;
        const caretStyles = this.symbols[this.caret].className;

        this.symbols[this.caret+side].textContent = "|";
        this.symbols[this.caret+side].className = caretStyles;

        this.symbols[this.caret].textContent = nextSymbol;
        this.symbols[this.caret].className = nextSymbolStyle;

        this.caret += side;
    }
    
    resetForm() {
        this.text = "|Losto Caradhras, sedho, hodo, nuitho i 'ruith!";
        let textHTML = "";
        for (const c of this.text) {
            textHTML += "<span>" + c + "</span>";
        }
        this.exampleEl.innerHTML = textHTML;
        this.symbols = this.exampleEl.querySelectorAll('span');
        this.caret = 0;
        this.symbols[this.caret].className = "input__caret input__caret--hidden";
        this.inputLength = 0;
        this.inputEl.value = "";
        this.inputEl.blur();
    }

    handleInput() {
        console.time('handleInput()');

        let diff = this.inputEl.value.length - this.inputLength;
        // Preventing key holding
        if (diff == 1 && this.text[this.caret+diff] == ' ' && this.inputEl.value.at(-1) != ' ') {
            this.inputEl.value = this.inputEl.value.slice(0, -1);
            console.timeEnd('handleInput()')
            return;
        }
        const gap = 1 * diff / Math.abs(diff);
        this.inputLength += diff;
        // The cycle is way to deal with a CTRL+BACKSPACE case
        while (diff != 0) {
            let color = "miss_color";
            if (gap == -1) {
                color = "empty_color";
            } else if (this.inputEl.value.at(-1) == this.text[this.caret + gap]) {
                color = "match_color";
            } 
            this.symbols[this.caret + gap].className = color;
            this.moveCaret(gap);
            diff -= gap;
        }
        console.timeEnd('handleInput()')
    }
}
// INPUT -- END

window.addEventListener('DOMContentLoaded', () => {
    const input = new InputField();
    const timer = new Timer();
})