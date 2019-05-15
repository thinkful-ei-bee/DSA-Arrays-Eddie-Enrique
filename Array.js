'use strict';
const Memory = require ('./memory.js');
const memory = new Memory();

class Array{
  constructor(){
    this.length=0;
    this.ptr = memory.allocate(this.length);
    this._capacity = 0;
  }

  getArray(){
    memory.get(this.ptr);
  }

  get(index){
    if (index < 0 || index >= this.length){
      throw new Error('Index error');
    }
    return memory.get(index + this.ptr);
  }

  push(value){
    if (this.length >= this._capacity){
      this._resize((this.length+1)* Array.SIZE_RATIO);
    }
    memory.set(this.ptr+this.length, value);
    this.length++;
  }

  pop(){
    if (this.length === 0 ){
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value){
    if (index < 0 || index >=this.length){
      throw new Error('Index error');
    }
    if (this.length >= this._capacity){
      this._resize((this.length+1)* Array.SIZE_RATIO);
    }
    memory.copy(this.ptr+index+1 ,this.ptr + index ,this.length - index );
    memory.set(this.ptr+index,value);
    this.length++;
  }

  remove(index){
    if (index < 0 || index >=this.length){
      throw new Error('Index error');
    }
    memory.copy(this.ptr+index,this.ptr+index+1, this.length - index - 1);
    this.length--;
  }

  _resize(size){
    const prevPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr===null){
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr,prevPtr,this.length);
    memory.free(prevPtr);
    this._capacity = size;
  }

}
Array.SIZE_RATIO = 3;

function main(){

  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  // What is the length, capacity and memory address of your array?
  // length :1, capacity:3, ptr:0
  //


  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  //What is the length, capacity and memory address of your array? 
  //Explain the result of your program after adding the new lines of code.
  //Array { length: 6, ptr: 3, _capacity: 12 }
  // The length is six because there are six items pushed into the array
  // The pointer is 3 because it was set there when we had resize after the 4th call to push into array
  // The capacity is 12 because when the array was resized it added +1 to length and multiplied it by 3
  
  
  
  arr.pop();
  arr.pop();
  arr.pop();
  arr.pop();
  arr.pop();
  arr.pop();
 // What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
  //Array { length: 3, ptr: 3, _capacity: 12 }
  // The length is three because pop removes the last of the array and it was invoked 3 times
  // The pointer is 3 because it only gets adjusted when the array is resized and this doesn't occur with pop method
  // The capacity is 12 because it only gets adjusted when the array is resized and this doesn't occur with pop method

  arr.push("tauhida");
  //Print this 1 item that you just added. What is the result? Can you explain your result?
  // Result: NaN
  // Memory is implemented in a manner that only accepts floating numbers and, so, cannot read a string
  

//What is the purpose of the _resize() function in your Array class?
  // It makes the memory storage bigger if the Array we are trying to insert does not fit in its current allocation

  console.log(arr.get(0));
}
main()
module.exports = Array;