# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

## 1. Project structure and defined
 Todo App เป็นโปรเจ็คที่ใช้ ReactJS ในการทำ UI Frontend โดยใช้ MUI Library เพื่อเป็นฟีเจอร์ต่างๆในโปรเจ็ค
 ในโปรเจ็คจะประกอบด้วยหน้า Login from, Dasgboard ซึ่งสามารถ GET, Create, Update, Delete todo list ได้
 ซึ่งทางฝั่ง Back-end จะใช้ Node.JS express ในการทำ web service เพื่อให้ระบบสามารถ REST API ได้
   - Login จะมีการนำ JWT token จาก API response และเมื่อ Login แล้วจะ expiresIn ภายใน 1Hr.

### Neversitup Candidate Test

## 2.Show coding logic and unit test Permutations (Choose your the most skilled)

import React, { Component } from 'react';

class PermutationsGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: '',
      permutations: [],
    };
  }

  generatePermutations = (input) => {
    const permutations = new Set();

    const backtrack = (inputArr, start) => {
      if (start === inputArr.length - 1) {
        permutations.add(inputArr.join(''));
      } else {
        for (let i = start; i < inputArr.length; i++) {
          [inputArr[start], inputArr[i]] = [inputArr[i], inputArr[start]]; // Swap characters
          backtrack([...inputArr], start + 1);
          [inputArr[start], inputArr[i]] = [inputArr[i], inputArr[start]]; // Backtrack
        }
      }
    };

    const inputArr = input.split('');
    backtrack(inputArr, 0);

    return Array.from(permutations);
  };

  handleInputChange = (event) => {
    const inputString = event.target.value;
    const permutations = this.generatePermutations(inputString);
    this.setState({ inputString, permutations });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter a string"
          value={this.state.inputString}
          onChange={this.handleInputChange}
        />
        <ul>
          {this.state.permutations.map((permutation, index) => (
            <li key={index}>{permutation}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PermutationsGenerator;
#####

## 3. Show coding logic and unit test Find the odd int (Choose your the most skilled)
import React, { Component } from 'react';

class FindOddInt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArray: '',
      result: null,
    };
  }

  findOddInt = (arr) => {
    const countMap = {};
    for (const num of arr) {
      countMap[num] = (countMap[num] || 0) + 1;
    }

    for (const num in countMap) {
      if (countMap[num] % 2 !== 0) {
        return parseInt(num);
      }
    }

    return null;
  };

  handleInputChange = (event) => {
    const inputArray = event.target.value.split(',').map((str) => parseInt(str.trim(), 10));
    const result = this.findOddInt(inputArray);
    this.setState({ inputArray, result });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter an array of integers (e.g., 1,2,3)"
          value={this.state.inputArray.join(',')}
          onChange={this.handleInputChange}
        />
        {this.state.result !== null && (
          <p>
            The integer that appears an odd number of times is: {this.state.result}
          </p>
        )}
      </div>
    );
  }
}

export default FindOddInt;

