class Reflector{
  constructor(c){
    this.connections = c;
  }
  
  link(a,b){
    for (var i = 0, len = this.wires.length; i < len; i++) {
      if(this.wires[i] === a || this.wires[i] === b){
       	 this.wires[i] = i;
      }
    }
    
    this.wires[a] = b;
    this.wires[b] = a;
  }
}