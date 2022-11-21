let startnumber, numstep, maxValueInput, minValueInput, minValue, maxValue, answerNumber, orderNumber, orderNumberField, answerField, gameRun
const startGame = document.querySelector('.text');
const startBtn = document.querySelector('.start-go')
const screens = document.querySelectorAll('.screen')

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    gameRun = true
})


document.querySelector('#submit').addEventListener('click', () => {
    startBtn.classList.add('hover')
    minValueInput = document.getElementsByTagName("input")[0].value
    maxValueInput = document.getElementsByTagName("input")[1].value 
    minValue = parseInt(minValueInput)
    maxValue = parseInt(maxValueInput)
    if (isNaN(minValue) || isNaN(maxValue)) { //если в инпуте не цифры то устанавливаются дефолтные значения
        minValue = 0;
        maxValue = 100
    } else { //если больше 999 
        maxValue = (maxValue>999) ? 999 : maxValue 
        minValue = (minValue<-999) ? -999 : minValue
    }
    //подсчёт максимальнгого колличества шагов
    startnumber = maxValue - minValue
    numstep = Math.ceil(Math.log(startnumber) / Math.log(2))

    startGame.querySelector('p').innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    orderNumberField = document.getElementById('orderNumberField');
    answerField = document.getElementById('answerField');
    answerField.innerText = `Вы загадали число ${numberToString(answerNumber)}?`;
}) 

let text = document.querySelector('.text')
const btnRetry = document.getElementById('btnRetry')
btnRetry.addEventListener('click', () => {
    text.classList.add('hovered')
    screens[0].classList.add('down')
    setTimeout(function(){
        location.reload();
    }, 900);
})

const phraseLuse = ['Вы загадали неправильное число!\n\u{1F610}', 'Я сдаюсь..\n\u{1F61E}', 'Мне слишком сложно \n\u{1F620}']
const phraseQer = ['Вы загадали число', 'Я надеюсь, что число', 'Ваше число']
const phraseWin = ['Я знал \n\u{1F60E}', 'Всегда угадываю \n\u{1F607}', 'Eeeasily \n\u{1F61C}']
//кнопка больше
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (numstep == orderNumber) { //превышение максимального колличества шагов
            const answerPhrase = phraseLuse[Math.floor(Math.random() * phraseLuse.length)]
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            minValue == answerNumber;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const qerPhrase = phraseQer[Math.floor(Math.random() * phraseQer.length)]
            answerField.innerText = qerPhrase + ' ' + `${numberToString(answerNumber)}?`;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (numstep == orderNumber){ //превышение максимального колличества шагов
            const answerPhrase = phraseLuse[Math.floor(Math.random() * phraseLuse.length)]
            answerField.innerText = answerPhrase;
            console.log('Упс, ты всё сломав\(\:')
            gameRun = false;
        } else {
            maxValue = answerNumber ;
            maxValue == answerNumber;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const qerPhrase = phraseQer[Math.floor(Math.random() * phraseQer.length)]
            answerField.innerText = qerPhrase + ' ' + `${numberToString(answerNumber)}?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const winPhrase = phraseWin[Math.floor(Math.random() * phraseWin.length)]
        answerField.innerText = winPhrase
        gameRun = false;
    }
})


function numberToString(number){ //цифры прописью
    let ones = ['один','два','три','четыре','пять','шесть','семь','восемь','девять','десять',
    'одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать','двадцать'];
    let tens = ['двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
    let hundreds = ['сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот']
    let result = "";

    let modul = Math.abs(number); // модуль числа
    if (modul == 0) // 0
        result = 0 
    else if (modul < 21)  // 0...20
        result = ones[modul - 1]
    // 21...99
    else if (modul < 100) { 
        let level2 = Math.floor(modul/10) - 2;
        result =  modul%10!=0 ? `${tens[level2]} ${ones[modul%10-1]}` : tens[level2]; 
    }
    // 100...999
    else {
        level3 = Math.floor(modul / 100) - 1; 
        rest = modul%100; // остаток от деления на 100
        if(rest == 0) // x00
            result =  hundreds[level3];
        // x01...x20
        else if (rest <= 20) {
            result = `${hundreds[level3]} ${ones[rest - 1]}`; 
        }
        // x21...x99
        else {
            let level2 = Math.floor(modul%100/10) - 2;
            if (number%10 == 0)
                result = `${hundreds[level3]} ${tens[level2]}`;
            else
                result = `${hundreds[level3]} ${tens[level2]} ${ones[number%10-1]}`;
        } 
    }
    if (result.length < 20) {
        return (number < 0) ? `минус ${result}` : result;
    } else {
        return number
    }
    
}

