class Buffer{
  constructor(x,y,size){
    this.value = [];
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  add(x){
    this.value.push(x);
  }
  
  delete(){
    this.value.splice(this.value.length-1,1);
  }
  
  show(){
    let t = "";
    let i = this.value.length-30;
    if(i<0)i=0;
    for(i ; i<this.value.length ; i++){
			t += String.fromCharCode(this.value[i]+65);      
    }
    push();
    fill(80);
    rect(this.x,this.y,width/2 -100,30);
    pop();
    fill(255);
    textAlign(LEFT,CENTER);
    textSize(this.sizeLetter);
    text(t,this.x+10,this.y+15);
  }
}
  