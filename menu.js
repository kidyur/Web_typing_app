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