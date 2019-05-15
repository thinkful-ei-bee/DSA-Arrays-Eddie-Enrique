const Memory = require ('memory');

class Array{
    constructor(){
        this.length=0;
        this.ptr = Memory.allocate(this.length)
    }

    getArray(){
        Memory.get(this.ptr)
    }

    getArrayItem(index){
         Memory.get(index + this.ptr)
    }

    push(x){
         Memory.set(this.ptr+this.length, x);
            this.length++;
    }

    pop(x){
        Memory.free(this.pointer+this.length);
        this.length--;
    }


}