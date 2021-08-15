const colorPicker = document.querySelector('#color');


const fromHEXToHSB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    var colorsInHSL = [];
    for (let i = 0; i <= 100; i = i + 4) {
        colorsInHSL.push('hsl(' + h + ', ' + s + '%, ' + i + '%)');
    }
    console.log(colorsInHSL);
    return colorsInHSL;
}

const addColorsToBody = (hex) => {

    let colors = fromHEXToHSB(hex);
    let container = document.querySelector('.container');
    container.innerHTML = '';

    colors.forEach((color, index) => {
        let colorText = document.createElement('span');
        let div = document.createElement('div');
        div.style.backgroundColor = color;
        div.classList.add('shade');
        colorText.textContent = div.style.backgroundColor;
        if (index > 11) {
            colorText.style.color = '#000'
        } else {
            colorText.style.color = '#fff'
        }
        div.appendChild(colorText);
        container.appendChild(div);
        div.addEventListener('click', () => {
            var textarea = document.createElement('textarea');
            textarea.textContent = colorText.textContent;
            document.body.appendChild(textarea);

            var selection = document.getSelection();
            var range = document.createRange();
            //  range.selectNodeContents(textarea);
            range.selectNode(textarea);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy')
            alert('copied successfully')
            selection.removeAllRanges();

            document.body.removeChild(textarea);

        })
    })
}

colorPicker.addEventListener('input', (e) => addColorsToBody(e.target.value));
