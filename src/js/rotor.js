class Rotor{
  constructor(id){
    this.id = id;
  }
  
  set(connections,name){
  	this.connections = connections;
    this.rConnections = [];
    this.head = 0;
    this.name = name;
    for (var i = 0, len = this.connections.length; i < len; i++) {
      this.rConnections[this.connections[i]] = i;
    }
  }
  
  getId(){
    return this.id;
  }
  
  show(x,y){
    fill(50);
    textAlign(CENTER,CENTER);
    text(this.head,x,y);
    text(this.name,x,y-40);
		circle(x,y-20,10);
    circle(x,y+20,10);
    push();
    textSize(20);
    fill(255);
    text('+',x,y-20);
    text('-',x,y+20);
		pop();

  }
  
  setHead(h){
    this.head = h;
  }
  
  turn(){
    this.head = ((this.head + 1) % this.connections.length);
  }
  
  back(){
    this.head = (this.head - 1);
    if(this.head < 0)this.head = this.connections.length-1;
  }
  
  through(x){
    let out1 = this.connections[(this.head + x) % this.connections.length];
    print(((this.head + x) % this.connections.length)+"->"+out1);
    return out1;
  }
  
  rThrough(x){
    let out1 = this.rConnections[(this.head + x) % this.connections.length];
    print(((this.head + x) % this.connections.length)+"->"+out1);
    return out1;
  }

	nextIn(x){
    let entry2;
    let entry2temp = (x - this.head);
    if(entry2temp < 0) entry2 = this.connections.length+entry2temp;
    else entry2 = entry2temp;
    return entry2;
  }
  
  nextInR(x){
    let entry2 = (x + this.head)%this.connections.length;
    return entry2;
  }
}