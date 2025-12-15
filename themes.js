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

