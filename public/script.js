import setCaret from './caret.js'
import calculator from './calculator.js'

let resetButton = document.querySelector('[value="Reset"]')
resetButton.disabled = true

// make sure the caret appends the whole input
document.querySelectorAll("[type='text']").forEach(input => {
    input.addEventListener('mousedown', event => {
        if (event.target.value)
            setCaret(event.target)
    })
})

// make sure the buttons can be selected
let buttons = Array.from(document.getElementsByClassName('btn'))
buttons.forEach(el => {
    el.addEventListener('mousedown', event => {
        if (!event.target.classList.contains('selected'))
            event.target.classList.add('selected')

        // make sure only the current target is selected
        document.querySelectorAll('.selected').forEach(select => {
            if (select != event.target)
                select.classList.remove('selected')
        })
    })
})

// take the custom input into account
document.querySelector('.buttons input').addEventListener('focus', e => {
    // make sure no other button is selected
    document.querySelectorAll('.btn').forEach(button => {
        if (button.classList.contains('selected')) button.classList.remove('selected')
    })
})

// validate number of people to avoid divided by zero error
function alertError(e) {
    if (!e.target.value || e.target.value == 0 || !e.key) {
        e.target.parentElement.classList.add('error')
        e.target.classList.add('error')
    } else if (Number(e.target.value) > 0) {
        e.target.parentElement.classList.remove('error')
        e.target.classList.remove('error')
    }
}

document.getElementById('people').addEventListener('keydown', (e) => {
    setTimeout(alertError, 0, e)
})

// make sure all values have been entered
function checkAllValues() {
    let bill = document.querySelectorAll('[type="text"]')[0].value
    let people = document.querySelectorAll('[type="text"]')[2].value
    let selectedTip
    try {
        selectedTip = document.querySelector('.selected').dataset.value
    } catch (e) {
        selectedTip = document.querySelectorAll('[type="text"]')[1].value
    }

    if (Number(bill) >= 0 && Number(people) > 0 && selectedTip) {
        let waiter = calculator(bill, selectedTip, people)
        let totalElement = document.getElementById('total')
        let tipElement = document.getElementById('tip')

        // update output elements
        totalElement.innerHTML = '$' + waiter.getTotal()
        tipElement.innerHTML = '$' + waiter.getTip()

        // enable reset button
        resetButton.disabled = false
    }
}

// always be alert for when all values have been entered
document.addEventListener('mousedown', () => {
    setTimeout(checkAllValues, 5)
})
document.addEventListener('keydown', () => {
    setTimeout(checkAllValues, 5)
})

// reset all values
resetButton.addEventListener('click', () => {
    document.querySelectorAll('[type="text"]').forEach(el => {
        el.value = null
    })

    // remove the selected buttons
    document.querySelectorAll('.selected').forEach(selected => {
        selected.classList.remove('selected')
    })

    // reset outputs
    let resetValue = '$0.00'
    document.getElementById('tip').innerHTML = resetValue
    document.getElementById('total').innerHTML = resetValue

    resetButton.disabled = true
})