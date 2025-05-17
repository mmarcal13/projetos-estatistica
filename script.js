function calculate() {
    const valuesInput = document.getElementById('values').value;
    const valuesArray = valuesInput.split(',').map(value => parseFloat(value.trim())).filter(value => !isNaN(value));

    if (valuesArray.length === 0) {
        alert("Por favor, insira alguns valores separados por vírgula.");
        return;
    }

    const meanValue = calculateMean(valuesArray);
    const medianValue = calculateMedian(valuesArray);
    const modeValue = calculateMode(valuesArray);

    document.getElementById('mean').textContent = meanValue.toFixed(2);
    document.getElementById('median').textContent = medianValue.toFixed(2);
    document.getElementById('mode').textContent = modeValue.join(', ') || 'Nenhuma moda encontrada';
}

function calculateMean(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return sum / arr.length;
}

function calculateMedian(arr) {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
        const middle1 = sortedArr[middleIndex - 1];
        const middle2 = sortedArr[middleIndex];
        return (middle1 + middle2) / 2;
    } else {
        return sortedArr[middleIndex];
    }
}

function calculateMode(arr) {
    const frequencyMap = {};
    let maxFrequency = 0;
    let modes = [];

    for (const num of arr) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        if (frequencyMap[num] > maxFrequency) {
            maxFrequency = frequencyMap[num];
            modes = [num];
        } else if (frequencyMap[num] === maxFrequency && !modes.includes(num)) {
            modes.push(num);
        }
    }

    if (modes.length === Object.keys(frequencyMap).length && modes.length === arr.length) {
        return []; // No mode if all numbers appear only once
    }

    return modes;
}