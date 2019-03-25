class Panel extends Keyboard {
  constructor(x, y, r, w) {
    super();
    let taille = r*27;
    while(taille > window.innerWidth - r*2){
      r -= 1;
      taille = r*27;
    }
    x = window.innerWidth/2 - taille/2;

    let hauteur = r*4;
    print(kb.y + hauteur + 100*r);
    while(y < kb.y + hauteur + 4*r){
      y++;
    }
    this.x = x;
    this.y = y;
    this.r = r;

    this.plugs = [];
    this.letters = [0, 25, 4, 17, 19, 24, 20, 8, 14, 15, 16, 18, 3, 5, 6, 7, 9, 10, 11, 12, 22, 23, 2, 21, 1, 13];
    for (let i = 0; i < 10; i++) {
      let k = new Plug(this.letters[i], x + i * 3 * r, y, r, 3*r / 5);
      this.plugs.push(k);
    }
    for (let i = 0; i < 9; i++) {
      let k = new Plug(this.letters[i + 10], x + (3 * r / 2) + i * 3 * r, y + (2 * r), r, 3*r / 5);
      this.plugs.push(k);
    }
    for (let i = 0; i < 7; i++) {
      let k = new Plug(this.letters[i + 19], x + (3 * r) + i * 3 * r, y + (4 * r), r, 3*r / 5);
      this.plugs.push(k);
    }
    this.wires = w;
    this.magnetPlug = false;
  }

  getPlug(x) {
    for (let i = 0; i < this.plugs.length; i++) {
      if (this.plugs[i].id === x) {
        return this.plugs[i];
      }
    }
  }

  link(a, b) {
    for (var i = 0, len = this.wires.length; i < len; i++) {
      if (this.wires[i] === a || this.wires[i] === b) {
        this.wires[i] = i;
      }
    }

    this.wires[a] = b;
    this.wires[b] = a;
  }

  mousePressed() {
    for (let i = 0; i < this.plugs.length; i++) {
      let d = dist(mouseX, mouseY, this.plugs[i].x, this.plugs[i].y);
      if (d < this.r) {
        print("click sur un plug");
        let plugClicked = this.plugs[i];
        let keySelected = plugClicked.id;
        let connected = (this.wires[keySelected] !== keySelected);
        print(plugClicked);
        if (this.magnetPlug === false) {
          print("pas de mouseLine");
          //print(connected);
          if (connected) {
            print("le plug etait connecte");
            plugClicked.pressed = true;
            this.magnetPlug = this.getPlug(this.wires[keySelected]);
            this.link(keySelected, keySelected);
          }
        } else {
          print("mouseLine");
          //mouseLine = true
          if ((plugClicked !== this.magnetPlug) && !connected) {
            print("nouvelle connection");
            this.link(keySelected, this.magnetPlug.id);
            plugClicked.pressed = false;
            this.magnetPlug = false;
          }
        }
      } else {
        print("click pas sur un plug");
        this.plugs[i].pressed = false;
      }
    }
    print("---------");
  }

  show() {
    for (let i = 0; i < this.plugs.length; i++) {
      this.plugs[i].show(COLOR_PLUG_STD,COLOR_STROKE_STD,WEIGHT_STROKE_STD);
    }

    for (let i = 0; i < this.wires.length; i++) {
      let a = i;
      let b = this.wires[i];
      if (a !== b) {
        //there is a wire not already drawn
        push();
        stroke(color(255,255,255,50));
        strokeWeight(3);
        let plugFrom = this.getPlug(a);
        let plugTo = this.getPlug(b);
        if(plugFrom !== this.magnetPlug && plugTo !==this.magnetPlug){
          line(plugFrom.x, plugFrom.y, plugTo.x, plugTo.y);
        }
        pop();
        plugFrom.show(COLOR_PLUG_LINKED,COLOR_STROKE_LINKED,WEIGHT_STROKE_LINKED);
        plugTo.show(COLOR_PLUG_LINKED,COLOR_STROKE_LINKED,WEIGHT_STROKE_LINKED);
      }
    }
    
    if(this.magnetPlug !== false){
      push();
      stroke(color(255,0,0,50));
      strokeWeight(4);
      line(this.magnetPlug.x, this.magnetPlug.y, mouseX, mouseY);
      pop();
      this.magnetPlug.show(COLOR_MAGNET_PLUG,WEIGHT_STROKE_LINKED,WEIGHT_STROKE_LINKED);
    }
  }
}

class Plug {
  constructor(letter, x, y, r, size) {
    this.letter = String.fromCharCode(letter + 65)
    this.id = letter;
    this.x = x;
    this.y = y;
    this.r = r;
    this.sizeLetter = size;
    this.pressed = false;
  }

  show(colfond, colStrokeAndText, strokeSize) {
    push();
    fill(colfond);
    stroke(colStrokeAndText);
    strokeWeight(strokeSize);
    circle(this.x, this.y, this.r);

    push();
    textAlign(CENTER, CENTER)
    fill(colStrokeAndText);
    noStroke();
    textSize(this.sizeLetter);
    text(this.letter, this.x, this.y);
    pop();
    if(panel.wires[this.id] !== this.id){
      push();
      textAlign(CENTER, CENTER)
      fill(colStrokeAndText);
      noStroke();
      textSize(this.sizeLetter/2);
      text(String.fromCharCode(panel.wires[this.id] + 65), this.x, this.y+this.sizeLetter);
      pop();
    }
    pop();
  }
}