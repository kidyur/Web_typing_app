let TEXT_CORRECT_COLOR = "var(--cur-correct-text-color)";
let TEXT_UNFILLED_COLOR = "var(--cur-empty-text-color)";
let TEXT_UNCORRECT_COLOR = "var(--cur-wrong-text-color)";
let CARET_ACTIVE_STYLE = "input__caret input__caret--blinking";
let CARET_INACTIVE_STYLE = "input__caret input__caret--hidden";

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
        this.inputEl.addEventListener("input", () => this.handleInput());
        this.inputEl.addEventListener("focus", () => this.setCaretStyle(CARET_ACTIVE_STYLE));
        this.inputEl.addEventListener("blur",  () => this.setCaretStyle(CARET_INACTIVE_STYLE));
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
    
    paintSymbol(symbolInd, color) {
        this.symbols[symbolInd].className = color;
    }
    
    setCaretStyle(styles) {
        this.symbols[this.caret].className = styles;
    }
    
    resetForm() {
        this.text = "|Пример текста, чтобы тренировать скорость печати";

        let textHTML = "";
        for (const c of this.text) {
            textHTML += "<span>" + c + "</span>";
        }
        this.exampleEl.innerHTML = textHTML;
        this.symbols = this.exampleEl.querySelectorAll('span');

        this.caret = 0;
        this.setCaretStyle(CARET_INACTIVE_STYLE);
        this.inputLength = 0;
        this.inputEl.value = "";
        this.inputEl.blur();
    }

    handleInput() {
        console.time('handleInput()')

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
            this.paintSymbol(this.caret + gap, color); 
            this.moveCaret(gap);
            diff -= gap;
        }
        console.timeEnd('handleInput()')
    }
}
// INPUT -- END

// DOCS -- BEGINNING
const DOCS_ACTIVE_STYLE = "header__btn docs-btn--active";
const DOCS_INACTIVE_STYLE = "header__btn docs-btn--inactive";

let isDocsVisible = true;

const docsMenuEl = document.getElementsByClassName("docs")[0];
const docsBtnEl = document.getElementsByClassName("docs-btn--active")[0];

function toogleDocs() {
    if (isDocsVisible) {
        docsMenuEl.style.visibility = "hidden";
        docsBtnEl.className = DOCS_INACTIVE_STYLE;
    } else {
        docsMenuEl.style.visibility = "visible";
        docsBtnEl.className = DOCS_ACTIVE_STYLE;
    }
    isDocsVisible = !isDocsVisible;
}

document.addEventListener("keydown", function setHotkeys(ev) {
    if (!ev.altKey) return 0;

    if (ev.code == "KeyR") {
        resetForm();
    } else if (ev.code == "KeyS") {
        inputEl.focus();
    } else if (ev.code == "KeyT") {
        toogleTheme();
    } else if (ev.code == "KeyH") {
        toogleDocs();
    }
})

docsBtnEl.addEventListener("click", () => {
    toogleDocs();
})
// DOCS -- END

// THEMES -- BEGINNING
const THEME_PROPERTIES = [
    "bg-color",
    "empty-text-color",
    "correct-text-color",
    "wrong-text-color"
];

let theme = "light";

function toogleTheme() {
    if (theme == "light") {
        setColors("dark");
        theme = "dark";
    } else {
        setColors("light");
        theme = "light";
    }
}

function setColors(newTheme) {
    const root = document.documentElement;
    const styles = window.getComputedStyle(root);
    for (property of THEME_PROPERTIES) {
        let newValue = styles.getPropertyValue(`--${newTheme}-${property}`);
        root.style.setProperty(`--cur-${property}`, newValue);
    }
}
// THEMES -- END 


window.addEventListener('DOMContentLoaded', () => {
    const input = new InputField();
})