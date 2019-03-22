class Keyboard{
  constructor(x,y,r){
    // créer un array
    let taille = r*27;
    while(taille > window.innerWidth - r*2){
      r -= 1;
      taille = r*27;
    }
    x = window.innerWidth/2 - taille/2;
    this.x = x;
    this.y = y;
    this.r = r;
    this.keys=[];
    this.letters = [0, 25, 4, 17, 19, 24, 20, 8, 14, 15, 16, 18, 3, 5, 6, 7, 9, 10, 11, 12, 22, 23, 2, 21, 1, 13];
  	for(let i=0 ; i<10 ; i++){
      let k = new Key(this.letters[i],x+i*3*r,y,r,r)
    	this.keys.push(k);
    }
    for(let i=0 ; i<9 ; i++){
      let k = new Key(this.letters[i+10],x+(3*r/2)+i*3*r,y+(2*r),r,r)
    	this.keys.push(k);
    }
    for(let i=0 ; i<7 ; i++){
      let k = new Key(this.letters[i+19],x+(3*r)+i*3*r,y+(4*r),r,r)
      this.keys.push(k);
    }
  }
  
  show(){
    for(let i=0 ; i<this.keys.length ; i++){
      this.keys[i].show();
    }
  }
  
  allLightsOff(){
    // eteindre toutes les touches
    for(let k in this.keys){
      this.keys[k].lightOff();
    }
  }
}

class Key{
  constructor(letter,x,y,r,size){
    this.letter = String.fromCharCode(letter+65)
    this.light = false;
    this.x = x;
    this.y = y;
    this.r = r;
    this.sizeLetter = size;
  }
  
  lightOn(){
  	this.light = true;
  }
  
  lightOff(){
  	this.light = false;
  }
  
  show(){
    let col;
    if(this.light) col = COLOR_LIGHTBULB;
    else col = COLOR_KEY;
    fill(col);
    circle(this.x,this.y,this.r);
    
    push();
    textAlign(CENTER,CENTER)
    fill(0);
    textSize(this.sizeLetter);
    text(this.letter,this.x,this.y);
    pop();
  }
}