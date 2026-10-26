'use strict';

class First {
    hello (){
        console.log('Привет я метод родителя!');
    }
    
}
const one = new First

class Second extends First { 
 constructor() {
    super()
  }
  hello() {
    super.hello()
    console.log("А я наследуемый метод!");
  }

}

const two = new Second
two.hello()

