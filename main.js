const main_display = document.querySelector('main');
const div_colors = document.getElementById('colors');
const chose_button = document.getElementById('chose');

let codeLength = 4;
let trys = 8;
let colors = ['blue', 'green', 'red', 'yellow', 'pink', 'aqua'];

let random_code = [];
let crackTry = 1;

init();

function init() {
    random_code = [];
    crackTry = 1;
    main_display.innerHTML = '';
    div_colors.innerHTML = '';



    for (let i = 1; i <= trys; i++) {
        let div_try = document.createElement('div');
        div_try.setAttribute('id', 'try-' + i);
        div_try.setAttribute('class', 'try');
        let div_left = document.createElement('div');
        div_left.setAttribute('class', 'left');
        let div_right = document.createElement('div');
        div_right.setAttribute('class', 'right');

        for (let i = 1; i <= codeLength; i++) {
            let div_l = document.createElement('div');
            let div_r = document.createElement('div');
            div_left.append(div_l);
            div_right.append(div_r);
        }

        div_try.append(div_left);
        div_try.append(div_right);
        main_display.prepend(div_try);

    }

    for (let i = 1; i <= codeLength; i++) {
        let div_select = document.createElement('div');
        div_select.setAttribute('class', 'select');
        let select = document.createElement('select');

        for (let color of colors) {
            let option = document.createElement('option');
            option.setAttribute('style', 'background-color:' + color);
            option.setAttribute('value', color);
            select.append(option);
        }
        select.setAttribute('style', 'background-color:' + colors[0]);

        select.addEventListener('change', (e) => {
            e.target.setAttribute('style', 'background-color:' + e.target.value);

        });

        div_select.append(select);
        div_colors.append(div_select);

    }
    createRandomCode();

}

function createRandomCode() {
    for (let i = 1; i <= codeLength; i++) {
        let random_color = colors[Math.floor(Math.random() * colors.length)]
        random_code.push(random_color);

    }
    console.log(random_code);

}

chose_button.addEventListener('click', (e) => {
    let input_colors = document.querySelectorAll('.select>select');
    let input_colors_arr = [];
    for (let v of input_colors) {
        input_colors_arr.push(v.value);
    }
    show('left', input_colors_arr);
    correction_Array = createCorrectionArray(input_colors_arr);
    show('right', correction_Array);
    crackTry++;

    checkWin(correction_Array);

})

function show(type, colors) {
    let tryView = document.querySelectorAll('#try-' + crackTry + '>.' + type + '>div');
    tryView.forEach((v, i) => {
        v.setAttribute('style', 'background-color:' + colors[i]);
        if (type === 'right') {
            v.classList.remove('red', 'white');
            v.classList.add(colors[i]);
        }
    });
}

function createCorrectionArray(input_colors_arr) {
    let correction_Array = [];

    for (let i = 0; i < codeLength; i++) {
        if (random_code[i] == input_colors_arr[i]) {
       
            correction_Array.push('red');
        } else {
            correction_Array.push(null);
        }
    }

    for (let i = 0; i < codeLength; i++) {
        if (correction_Array[i] !== 'red') {
            let index = random_code.indexOf(input_colors_arr[i]);
            if (index !== -1) {
                
                correction_Array[i] = 'white';
            }
        }
    }

    return correction_Array;
}


function checkWin(correction_Array) {
    let countCorrect = 0;

    for (let v of correction_Array) {
        if (v === 'red') {
            countCorrect++;
        }
    }

    if (countCorrect === codeLength) {
        alert('¡Has Ganado!');
        init();
    } else if (crackTry > trys) {
        alert('Has perdido, vuelve a intentarlo');
        init();
    }
}





