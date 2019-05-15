'use strict';
const Memory = require ('memory');

class Array{
  constructor(){
    this.length=0;
    this.ptr = Memory.allocate(this.length);
    this.capacity = 50;
  }

  getArray(){
    Memory.get(this.ptr);
  }

  get(index){
    if (index < 0 || index >= this.length){
      throw new Error('Index error');
    }
    return Memory.get(index + this.ptr);
  }

  push(x){
    if (this.length >= this.capacity){
      this.resize((this.length+1)* Array.SIZE_RATIO);
    }
    Memory.set(this.ptr+this.length, x);
    this.length++;
  }

  pop(x){
    if (this.length === 0 ){
      throw new Error('Index error');
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value){
    if (index < 0 || index >=this.length){
      throw new Error('Index error');
    }
    if (this.length >= this.capacity){
      this.resize((this.length+1)* Array.SIZE_RATIO);
    }
    Memory.copy(this.ptr+index+1 ,this.ptr + index ,this.length - index );
    Memory.set(this.ptr+index,value);
    this.length++;
  }

  remove(index){
    if (index < 0 || index >=this.length){
      throw new Error('Index error');
    }
    Memory.copy(this.ptr+index,this.ptr+index+1, this.length - index - 1);
    this.length--;
  }

  resize(size){
    const prevPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr===null){
      throw new Error('Out of memory');
    }
    Memory.copy(this.ptr,prevPtr,this.length);
    Memory.free(prevPtr);
    this.capacity = size;
  }

}
Array.SIZE_RATIO = 3;

module.exports = Array;