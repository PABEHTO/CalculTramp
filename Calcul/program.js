document.getElementById('showButton').addEventListener('click', function() {
    var inputType = document.getElementById('inputType').value;
    if (inputType === 'side') {
        document.getElementById('trapezoidImage').src = 'sideImage.png';
        document.getElementById('sideInput').style.display = 'block';
        document.getElementById('angleInput').style.display = 'none';
    } else if (inputType === 'angle') {
        document.getElementById('trapezoidImage').src = 'angleImage.png';
        document.getElementById('sideInput').style.display = 'none';
        document.getElementById('angleInput').style.display = 'block';
    }
});

function clearError(fieldId) {
    document.getElementById(fieldId).classList.remove('error');
    document.getElementById(fieldId + '-error').textContent = '';
}

document.getElementById('a').addEventListener('focus', function() { clearError('a'); });
document.getElementById('b').addEventListener('focus', function() { clearError('b'); });
document.getElementById('c').addEventListener('focus', function() { clearError('c'); });
document.getElementById('alpha').addEventListener('focus', function() { clearError('alpha'); });

function clearCheckboxError() {
    document.getElementById('checkbox-error').textContent = '';
}

document.getElementById('angleBetweenDiagonals').addEventListener('change', clearCheckboxError);
document.getElementById('height').addEventListener('change', clearCheckboxError);
document.getElementById('diagonals').addEventListener('change', clearCheckboxError);

function clearAllErrors() {
    clearError('a');
    clearError('b');
    clearError('c');
    clearError('alpha');
    document.getElementById('checkbox-error').textContent = '';
}

document.getElementById('calculateButton').addEventListener('click', function() {
    var inputType = document.getElementById('inputType').value;
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    var hasError = false;

    clearAllErrors();

    var a = parseFloat(document.getElementById('a').value);
    var b = parseFloat(document.getElementById('b').value);
    
    if (isNaN(a) || a <= 0) {
        document.getElementById('a').classList.add('error');
        document.getElementById('a-error').textContent = 'Значение должно быть больше 0';
        hasError = true;
    }
    if (isNaN(b) || b <= 0) {
        document.getElementById('b').classList.add('error');
        document.getElementById('b-error').textContent = 'Значение должно быть больше 0';
        hasError = true;
    } else if (b <= a) {
        document.getElementById('b').classList.add('error');
        document.getElementById('b-error').textContent = 'b должно быть больше a';
        hasError = true;
    }

    var h;
    if (inputType === 'side') {
        var c = parseFloat(document.getElementById('c').value);
        if (isNaN(c) || c <= 0) {
            document.getElementById('c').classList.add('error');
            document.getElementById('c-error').textContent = 'Значение должно быть больше 0';
            hasError = true;
        } else {
            h = Math.sqrt(c * c - Math.pow((b - a) / 2, 2));
            if (isNaN(h) || h <= 0) { // c < (b - a)/2
                document.getElementById('c').classList.add('error');
                document.getElementById('c-error').textContent = 'c слишком мало для данной трапеции';
                hasError = true;
            }
        }
    } else if (inputType === 'angle') {
        var alpha = parseFloat(document.getElementById('alpha').value);
        if (isNaN(alpha) || alpha <= 0) {
            document.getElementById('alpha').classList.add('error');
            document.getElementById('alpha-error').textContent = 'Значение должно быть больше 0';
            hasError = true;
        } else if (alpha >= 90) {
            document.getElementById('alpha').classList.add('error');
            document.getElementById('alpha-error').textContent = 'Угол должен быть меньше 90°';
            hasError = true;
        } else {
            var alphaRad = alpha * Math.PI / 180;
            h = ((b - a) / 2) * Math.tan(alphaRad);
        }
    }

    if (hasError) {
        outputDiv.innerHTML = 'Пожалуйста, исправьте ошибки в вводе.';
        return;
    }

    var computeAngle = document.getElementById('angleBetweenDiagonals').checked;
    var computeHeight = document.getElementById('height').checked;
    var computeDiagonals = document.getElementById('diagonals').checked;

    if (!computeAngle && !computeHeight && !computeDiagonals) {
        document.getElementById('checkbox-error').textContent = 'Выберите хотя бы одну характеристику';
        return;
    }

    var output = '';
    if (computeHeight) {
        output += 'Высота: ' + h.toFixed(2) + '<br>';
    }
    if (computeDiagonals) {
        var d = Math.sqrt(Math.pow((a + b) / 2, 2) + h * h);
        output += 'Диагонали: ' + d.toFixed(2) + '<br>';
    }
    if (computeAngle) {
        var cosTheta = (-Math.pow((a + b) / 2, 2) + h * h) / (Math.pow((a + b) / 2, 2) + h * h);
        var theta = Math.acos(cosTheta);
        var thetaDeg = theta * 180 / Math.PI;
        output += 'Угол между диагоналями: ' + thetaDeg.toFixed(2) + ' градусов<br>';
    }

    outputDiv.innerHTML = output;
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('c').value = '';
    document.getElementById('alpha').value = '';
    clearAllErrors();
    document.getElementById('output').innerHTML = '';
});