'use strict';

// URLify a string
function urlify(string){
  let newString='';
  for (let i = 0;i<string.length;i++){
    if (string[i]===' '){
      newString += '%20';
    } else{
      newString += string[i];
    }
  }
  return newString;
}

console.log(urlify('tauhida parveen'));
console.log(urlify('www.thinkful.com /tauh ida parv een'));

// Filtering an array
function filter(arr){
  const newArr = [];
  for(let i=0;i<arr.length;i++){
    if (arr[i]>=5){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

const arr = [1,2,3,4,5,6,7,8,2];
console.log(filter(arr));

// Max sum in the array

function maxSum(arr){
  if (arr.length === 1){
    return arr[0];
  }
  let sum = 0;
  let tempArr = arr;
  for (let j =0; j< arr.length; j++){
    let temp = 0;
    for (let i=0;i<tempArr.length;i++){
      temp += tempArr[i];
      if (temp > sum){
        sum = temp;
      }
    }
    tempArr.shift();
  }
  return sum;
}

console.log(maxSum([4, 6, -3, 5, -2, 1]));
console.log(maxSum([-2, 6, -3, 5, -2, 1]));

// Merge Arrays

function sort(arr1,arr2){
  const output = [];
  let index1 = 0;
  let index2 = 0;
  while (index1 <= arr1.length -1 && index2 <= arr2.length -1 ){
    if (arr1[index1] < arr2[index2]){
      output.push(arr1[index1]);
      index1++;
    } else if(arr1[index1] > arr2[index2]){
      output.push(arr2[index2]);
      index2++;
    }else{
      output.push(arr1[index1]);
      index1++;
      output.push(arr2[index2]);
      index2++;
    }
  }
  
  if(index2 === arr2.length){
    output.push(...arr1.slice(index1));
  }
  else if (index1 === arr1.length){
    output.push(...arr2.slice(index2));
  }
  return output;
}

console.log(sort([1, 3, 6, 8, 11],[2, 3, 5, 8, 9, 10]));


function removeChar(str, char){
  let output='';
  let string= str
  for(let j=0; j< char.length; j++){
     output='';
    for(let i=0; i<string.length; i++){
      if(string[i] !== char[j]){
        output += string[i]
      }
    }
    string = output;
  }
  return output;
}

console.log(removeChar('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))

function products(arr){
  const output = [];
  for(let i=0; i<arr.length; i++){
    let prod = 1;
    for (let j=0; j< arr.length; j++){
      if (j!== i){
        prod *= arr[j];
      }
    }
    output.push(prod);
  }
  return output;
}


console.log(products([1, 3, 9, 4]))