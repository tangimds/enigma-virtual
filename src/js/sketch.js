let rotors = [];
let kb;
let helpLightKeyboard;

function setup() {

  COLOR_KEY = color(100);
  COLOR_KEY_TXT = color(70);
  COLOR_LIGHTBULB = color("#ffeb3b");
  COLOR_LIGHTBULB_TXT = color(20);


  COLOR_PLUG_STD = color(100);
  COLOR_STROKE_STD = color(0);
  COLOR_MAGNET_PLUG = color(255,0,0);
  COLOR_PLUG_LINKED = color('#ff9800');
  COLOR_STROKE_LINKED = color(255,255,255);
  WEIGHT_STROKE_STD = 2;
  WEIGHT_STROKE_LINKED = 5;

  COLOR_QUESTIONMARK = color(150);
  COLOR_INFO = color(150);
  
  posXRotors = 50;
  posYRotors = 80;

  pressingKey = false;

  createCanvas(window.innerWidth, window.innerHeight);

	for(let i=0; i<5 ; i++){
    rotors[i] = new Rotor(i);
  }

  // rotors with their internal connections, name and id
  rotors[0].set([21, 9, 10, 11, 12, 24, 25, 18, 22, 23, 17, 0, 1, 2, 3, 13, 5, 6, 8, 19, 20, 14, 15, 16, 4, 7],'I');
  rotors[1].set([18, 12, 24, 25, 17, 0, 1, 22, 10, 8, 2, 3, 19, 11, 7, 23, 13, 5, 6, 20, 14, 15, 16, 4, 21, 9],'II');
  rotors[2].set([11, 20, 14, 7, 5, 6, 22, 21, 9, 23, 18, 10, 8, 2, 3, 19, 15, 16, 4, 12, 24, 25, 17, 0, 1, 13],'III');
  rotors[3].set([7, 5, 17, 0, 1, 13, 21, 9, 23, 6, 22, 18, 25, 4, 12, 24, 10, 8, 2, 3, 19, 11, 20, 14, 16, 15],'IV');
  rotors[4].set([4, 12, 24, 6, 20, 21, 9, 23, 25, 16, 15, 10, 8, 2, 14, 22, 18, 7, 5, 17, 0, 1, 13, 3, 19, 11],'V');
  
  // refractor
  ref1 = new Reflector([15, 22, 23, 4, 3, 10, 25, 16, 9, 8, 5, 24, 20, 14, 13, 0, 7, 19, 21, 17, 12, 18, 1, 2, 11, 6]);
  
  // set default rotors
  rotor1 = rotors[0];
  rotor2 = rotors[1];
  rotor3 = rotors[2];

  // keyboard, lighting letters crypted
  kb = new Keyboard(50, 200, 30);

  // panel with cables linking 2 letters
  panel = new Panel(50, 400, 30,[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
  // initial links
  panel.link(0, 5);
  panel.link(3, 2);
  panel.link(10, 9);
  panel.link(21, 25);
  panel.link(19, 12);
  panel.link(20, 15);
  panel.link(13, 14);
  panel.link(18, 11);

  // buffer (display input and output text)
  bufClear = new Buffer(width / 2, 20, 20);
  bufCrypted = new Buffer(width / 2, 60, 20);


  
  // hints and informations
  helpRotors = new Help(130,80,"Those are the rotors.\nYou can set up their initial position by clicking on the '+' and '-' buttons."+
   						"\nYou can change the rotor by clicking on its number.\nThere are 5 (I,II,III,IV,IV) different rotors.");
  helpBuf1 = new Help(window.innerWidth/2+width/2 - 80,35,"Clear Text.");
  helpBuf2 = new Help(window.innerWidth/2+width/2 - 80,75,"Crypted Text");
  helpLightKeyboard = new Help(kb.x+(3*kb.r)+7*3*kb.r,kb.y+(4*kb.r),"Those are the lightbulbs.\nThe crypted letter will light up when pressing a key.");
  helpPanel = new Help(panel.x+(3*panel.r)+7*3*panel.r,panel.y+(4*panel.r),"A line represent a connection between 2 letters.\n"+
              "You can change the disposition\nby clicking on a plug(letter)\nand choose another letter to bind to.");
}

function draw() {
  background(200);
  rotor3.show(posXRotors, posYRotors);
  rotor2.show(posXRotors+30, posYRotors);
  rotor1.show(posXRotors+60, posYRotors);
  bufClear.show();
  bufCrypted.show();
  kb.show();
  panel.show();

  helpRotors.display();
  helpBuf1.display();
  helpBuf2.display();
  helpLightKeyboard.display();
  helpPanel.display();

  //hand for mouse
  let showhand1 = false;
  let d3P = dist(mouseX, mouseY, posXRotors, posYRotors-20);
  let d3M = dist(mouseX, mouseY, posXRotors, posYRotors+20);
  let d2P = dist(mouseX, mouseY, posXRotors+30, posYRotors-20);
  let d2M = dist(mouseX, mouseY, posXRotors+30, posYRotors+20);
  let d1P = dist(mouseX, mouseY, posXRotors+60, posYRotors-20);
  let d1M = dist(mouseX, mouseY, posXRotors+60, posYRotors+20);
  let d3Change = dist(mouseX, mouseY, posXRotors, posYRotors-40);
  let d2Change = dist(mouseX, mouseY, posXRotors+30, posYRotors-40);
  let d1Change = dist(mouseX, mouseY, posXRotors+60, posYRotors-40);
  for (let i = 0; i < panel.plugs.length; i++) {
    let d = dist(mouseX, mouseY, panel.plugs[i].x, panel.plugs[i].y);
    if(d<panel.r) showhand1=true;
  }

  if(d1P < 10 ||d1M < 10 ||d2P < 10 ||d2M < 10 ||d3P < 10 ||d3M < 10 ||d1Change < 10 ||d2Change < 10 ||d3Change < 10)
  showhand2=true;
  else showhand2=false;
  
  if(showhand1 || showhand2)cursor(HAND);
  else cursor(ARROW);
}

function mousePressed() {
  if (mouseY < panel.y - 100) {
    //for rotors
    let d3P = dist(mouseX, mouseY, posXRotors, posYRotors-20);
    let d3M = dist(mouseX, mouseY, posXRotors, posYRotors+20);
    let d2P = dist(mouseX, mouseY, posXRotors+30, posYRotors-20);
    let d2M = dist(mouseX, mouseY, posXRotors+30, posYRotors+20);
    let d1P = dist(mouseX, mouseY, posXRotors+60, posYRotors-20);
    let d1M = dist(mouseX, mouseY, posXRotors+60, posYRotors+20);
		let d3Change = dist(mouseX, mouseY, posXRotors, posYRotors-40);
    let d2Change = dist(mouseX, mouseY, posXRotors+30, posYRotors-40);
    let d1Change = dist(mouseX, mouseY, posXRotors+60, posYRotors-40);

    if(d1P < 10) rotor1.turn()
    if(d1M < 10) rotor1.back()
		if(d2P < 10) rotor2.turn()
    if(d2M < 10) rotor2.back()
    if(d3P < 10) rotor3.turn()
    if(d3M < 10) rotor3.back()
    if(d1Change < 10) changeRotor(1);
    if(d2Change < 10) changeRotor(2);
    if(d3Change < 10) changeRotor(3);
  } else {
    //for panel
    panel.mousePressed(); 
  }
}

function changeRotor(rotor){
	do{
    if(rotor === 1)rotor1 = rotors[(rotor1.getId()+1)%5];
    if(rotor === 2)rotor2 = rotors[(rotor2.getId()+1)%5];
    if(rotor === 3)rotor3 = rotors[(rotor3.getId()+1)%5];
  }while(rotor1 === rotor2 || rotor1=== rotor3 || rotor2===rotor3)
}

function getThroughRotors(key) {
  print("pressed is ", String.fromCharCode(key + 65));

  let out1 = rotor1.through(key);
  let in2 = rotor1.nextIn(out1);

  let out2 = rotor2.through(in2);
  let in3 = rotor2.nextIn(out2);

  let out3 = rotor3.through(in3);
  let inR = rotor3.nextIn(out3);

  let outref = ref1.connections[inR];
  print("outref", outref);

  let rout3 = rotor3.rThrough(outref);
  let rin2 = rotor3.nextIn(rout3);

  let rout2 = rotor2.rThrough(rin2);
  let rin1 = rotor2.nextIn(rout2);

  let rout1 = rotor1.rThrough(rin1);
  let encoded = rotor1.nextIn(rout1);
  print("rout1", rout1);


  print("encoded is ", String.fromCharCode(encoded + 65));
  print("------------------");
  return encoded;
}

function turnRotors() {
  rotor1.turn();
  if (rotor1.head === 0) {
    rotor2.turn();
    if (rotor2.head === 0) {
      rotor3.turn();
    }
  }
}

function backRotors() {
  rotor1.back();
  if (rotor1.head === rotor1.connections.length - 1) {
    rotor2.back();
    if (rotor2.head === rotor2.connections.length - 1) {
      rotor3.back();
    }
  }
}

function getThroughPanel(x) {
  return panel.wires[x];
}

function keyPressed() {
  if (!pressingKey) {
    let key = keyCode - 65;
    print("PRESSED :: ", key);
    if (key === -57 && bufClear.value.length>0) {
      // 'del' pressed
      if(bufClear.value[bufClear.value.length-1] !== -33){
        backRotors();
      }
      bufCrypted.delete();
      bufClear.delete();
      
    } else if(key === -33){
      // 'spacebar' pressed
      bufClear.add(-33);
      bufCrypted.add(-33);
    } else if(key>=0 && key <=25){
      bufClear.add(key);
      key = getThroughPanel(key);
      key = getThroughRotors(key);
      key = getThroughPanel(key);
      print(String.fromCharCode(key + 65) + " added to bufcrypted");
      bufCrypted.add(key);
      let i = kb.letters.indexOf(key);
      kb.keys[i].lightOn();
      turnRotors();
    } else{
      print("not a letter");
    }
    pressingKey = true;
  }
}

function keyReleased() {
  kb.allLightsOff();
  pressingKey = false;
}
