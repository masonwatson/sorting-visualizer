export function quickSort(array) {
    // Array of animations.
    const animations = [];

    // If the length of the array is 1 or 0, there is no data to sort.
    if (array.length <= 1) return array;

    // Creates a copy of the array generated in SortingVisualizer.js.
    let auxiliaryArray = array.slice();

    doQuick(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    
    return animations;
}

function doQuick(auxiliaryArray, low, high, animations) {
    if (low < high) {
        let pi = partition(auxiliaryArray, low, high, animations);

        doQuick(auxiliaryArray, low, pi - 1, animations);
        doQuick(auxiliaryArray, pi + 1, high, animations);
    }
}

function partition(auxiliaryArray, low, high, animations) {

    let pivot = auxiliaryArray[high];

    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (auxiliaryArray[j] < pivot) {
            i++;
            animations.push([i, auxiliaryArray[j]]);
            animations.push([j, auxiliaryArray[i]]);
            swap(auxiliaryArray, i, j);
        }
    }

    animations.push([i + 1, auxiliaryArray[high]]);
    animations.push([high, auxiliaryArray[i + 1]]);
    swap(auxiliaryArray, i + 1, high);

    return (i + 1);
}

function swap(auxiliaryArray, i, j) {
    let temp = auxiliaryArray[i];
    auxiliaryArray[i] = auxiliaryArray[j];
    auxiliaryArray[j] = temp;
}