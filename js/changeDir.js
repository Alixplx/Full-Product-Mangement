// Check Language If rtl or ltr

let getLang = localStorage.getItem('langDirection')

if (getLang) {

    if (getLang == 'rtl') {

        changeDirection('rtl')

    } else {

        changeDirection('ltr')
    }
}

// Change Direction of Whole Website

let enLang = document.getElementById('en_lang')
let arLang = document.getElementById('ar_lang')

enLang.addEventListener('click', () => changeDirection('ltr'))
arLang.addEventListener('click', () => changeDirection('rtl'))

function changeDirection(dir) {

    document.documentElement.setAttribute('dir', dir)
    localStorage.setItem('langDirection', dir)
}