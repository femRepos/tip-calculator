export default function setCaret(target) {
    let start = target.value.length
    let end = start
    focusout()
    target.focus();

    // update the position of the caret
    setTimeout(() => {
        target.setSelectionRange(start, end);
    }, 0)
}

function focusout() {
    var tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
}