TEXT_CORRECT_COLOR = "var(--cur-correct-text-color)";
TEXT_UNFILLED_COLOR = "var(--cur-empty-text-color)";
TEXT_UNCORRECT_COLOR = "var(--cur-wrong-text-color)";
CARET_ACTIVE_STYLE = "input__caret input__caret--blinking";
CARET_INACTIVE_STYLE = "input__caret input__caret--hidden";

// INPUT -- BEGINNING
class InputField {
    text = "";
    separated = [];
    caret = 0;
    inputLength = 0;
    exampleEl = document.getElementsByClassName("text-example")[0];
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
        const tmp = this.separated[this.caret];
        this.separated[this.caret] = this.separated[this.caret + side];
        this.separated[this.caret + side] = tmp;        
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
        this.exampleEl.innerHTML = this.separated.join('');
    }
    
    setCaretStyle(styles) {
        this.separated[this.caret] = `<span class="${styles}">|</span>`;
        this.updateExample();
    }
    
    resetForm() {
        this.text = "|Пример текста, чтобы тренировать скорость печати";
        this.separated = this.text.split('');
        this.caret = 0;
        this.setCaretStyle(CARET_INACTIVE_STYLE);
        this.inputLength = 0;
        this.inputEl.value = "";
        this.inputEl.blur();
        this.updateExample();
    }

    handleInput() {
        let diff = this.inputEl.value.length - this.inputLength;
        // Preventing key holding
        if (diff == 1 && this.text[this.caret+diff] == ' ' && this.inputEl.value.at(-1) != ' ') {
            this.inputEl.value = this.inputEl.value.slice(0, -1);
            return;
        }
        const gap = 1 * diff / Math.abs(diff);
        this.inputLength += diff;
        // The cycle is way to deal with a CTRL+BACKSPACE case
        while (diff != 0) {
            let color = TEXT_UNCORRECT_COLOR;
            if (gap == -1) {
                color = TEXT_UNFILLED_COLOR;
            } else if (this.inputEl.value.at(-1) == this.text[this.caret + gap]) {
                color = TEXT_CORRECT_COLOR;
            } 
            this.paintSymbol(this.caret + gap, color); 
            this.moveCaret(gap);
            diff -= gap;
        }
        this.updateExample();
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