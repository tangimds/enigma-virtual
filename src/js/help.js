class Help{
 constructor(x,y,t){
   this.over = false;
   this.text = t;
   this.x = x;
   this.y = y;
 }
  
  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    this.over = d < 10;
  }
  
  display() {   
    this.rollover(mouseX,mouseY);
    textAlign(CENTER,CENTER);
    fill(COLOR_QUESTIONMARK);
    text('?', this.x, this.y);
    if (this.over) {
      push();
      fill(COLOR_INFO);
      textAlign(LEFT,TOP);
      text(this.text, this.x+10, this.y + 10);
      pop();
    }
  }
}