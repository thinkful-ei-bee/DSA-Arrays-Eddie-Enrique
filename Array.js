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

  console.log(arr);
}
main()
module.exports = Array;