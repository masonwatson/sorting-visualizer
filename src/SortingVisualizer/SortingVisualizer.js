import React, { useState, useEffect } from "react";
import * as ms from "./algorithms/mergeSort";
import * as qs from "./algorithms/quickSort";
import * as bs from "./algorithms/bubbleSort";
import "./SortingVisualizer.css";

const MERGE_SORT_ANIMATION_SPEED_MS = 2;
const QUICK_SORT_ANIMATION_SPEED_MS = 5;
const BUBBLE_SORT_ANIMATION_SPEED_MS = 0.3;
const NUMBER_OFARRAY_BARS = 120;

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  // On mount.
  useEffect(() => {
    setArray(getInitialArray());
  }, []);

  function resetArray() {
    setArray(getResetArray(array));
  }

  function runMergeSort() {
    const animations = ms.mergeSort(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      // Every third animation will be false.
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        // Every first color change will be to red.
        // Every second color change will be back to white.
        const color = i % 3 === 0 ? "red" : "white";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * MERGE_SORT_ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * MERGE_SORT_ANIMATION_SPEED_MS);
      }
    }
  }

  function runQuickSort() {
    const animations = qs.quickSort(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * QUICK_SORT_ANIMATION_SPEED_MS);
    }
  }

  // function runHeapSort() {}

  function runBubbleSort() {
    const animations = bs.bubbleSort(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      // Every third and fourth animation will be false.
      let isColorChange = true;
      if (i % 4 === 2 || i % 4 === 3) isColorChange = false;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        // Every first color change will be to red.
        // Every second color change will be back to white.
        const color = i % 4 === 0 ? "red" : "white";

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * BUBBLE_SORT_ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * BUBBLE_SORT_ANIMATION_SPEED_MS);
      }
    }
  }

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      draggable="false"
    >
      <div className="sorting-visualizer-wrapper">
        <div className="array-container d-flex align-items-start flex-column">
          {/* <div className="array postion-absolute absolute-bottom w-100"> */}
          <div className="array mb-auto">
            {array.map((value, idx) => {
              return (
                <div
                  className="array-bar"
                  key={idx}
                  style={{ height: `${value}px` }}
                />
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-clear inline-block-content"
          onClick={() => resetArray()}
        >
          Generate New Array
        </button>
        <button
          type="button"
          className="btn btn-clear inline-block-content"
          onClick={() => runMergeSort()}
        >
          Merge Sort
        </button>
        <button
          type="button"
          className="btn btn-clear inline-block-content"
          onClick={() => runQuickSort()}
        >
          Quick Sort
        </button>
        {/* <button type="button"
            className="btn btn-clear inline-block-content" onClick={() => runHeapSort()}>Heap Sort</button> */}
        <button
          type="button"
          className="btn btn-clear inline-block-content"
          onClick={() => runBubbleSort()}
        >
          Bubble Sort
        </button>
      </div>
    </div>
  );
}

const getInitialArray = () => {
  const array = [];
  for (let i = 0; i < NUMBER_OFARRAY_BARS; i++) {
    array.push(randomIntFromInterval(5, 730));
  }
  return array;
};

const getResetArray = (array) => {
  array = [];
  for (let i = 0; i < NUMBER_OFARRAY_BARS; i++) {
    array.push(randomIntFromInterval(5, 730));
  }
  return array;
};

function randomIntFromInterval(min, max) {
  // min and max are included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
