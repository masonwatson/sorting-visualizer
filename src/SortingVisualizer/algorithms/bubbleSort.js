export function bubbleSort(array) {
    // Array of animations.
    const animations = [];

    // If the length of the array is 1 or 0, there is no data to sort.
    if (array.length <= 1) return array;

    // Creates a copy of the array generated in SortingVisualizer.js.
    let auxiliaryArray = array.slice();

    doBubble(false, 0, auxiliaryArray, animations);
    
    return animations;
}

function doBubble(sorted, round, auxiliaryArray, animations) {
    while(!sorted) {
        sorted = true;

        for (let i = 0; i < auxiliaryArray.length - 1 - round; i++) {

            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([i, i + 1]);

            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push([i, i + 1]);

            if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {

                // We overwrite the value at index i in the original array with the
                // value at index i + 1 in the auxiliary array.
                animations.push([i, auxiliaryArray[i + 1]]);
                animations.push([i + 1, auxiliaryArray[i]]);

                let temp = auxiliaryArray[i];
                auxiliaryArray[i] = auxiliaryArray[i + 1];
                auxiliaryArray[i + 1] = temp;
            } else {
                animations.push([0, 0]);
                animations.push([0, 0]);
            }

            sorted = false;
        }
        round++;
    }
}