//Alice Wong
//Three.js file of a train

var trainParam = {
  len: 300,
  height: 100,
  dep: 100,
  botLen: 304,
  botHeight: 50,
  botDep: 102,
  doorLen: 50,
  doorHeight: 100,
  doorDep: 2,
  windowLen: 35,
  windowHeight: 30,
  windowDep: 3,
  topLen: 300,
  topHeight: 10,
  topDep:100,
  wheelRad: 20,
  wheelHeight: 15
};

//Function to make the train parts
function makeBox(len, height, depth, col, trans){
  var boxGeom =  new THREE.BoxGeometry(len, height, depth);
  var boxMat = new THREE.MeshPhongMaterial({color: col, 
                                           ambient: col,
                                           specular: col,
                                           shininess: 50});
  if(trans == true){
    boxMat.transparent = true;
    boxMat.opacity = 0.5;
  }

  var boxMesh = new THREE.Mesh(boxGeom,boxMat);
  return boxMesh;
}

//Function to make the wheel
function makeWheel(){
    var wheelGeom = new THREE.CylinderGeometry(trainParam.wheelRad, trainParam.wheelRad, trainParam.wheelHeight);
  var wheelMat = new THREE.MeshPhongMaterial({color: 0x403B3A, 
                                           ambient: 0x403B3A,
                                           specular: 0x403B3A,
                                           shininess: 20});
  var wheel = new THREE.Mesh(wheelGeom, wheelMat);
  return wheel;
}

//Function to create the actual train
//Origin is at the bottom of the train in the center of the rectangle of the bottom
function createTrain(){
  var train = new THREE.Object3D();

  var outerTrain = makeBox(trainParam.len, trainParam.height, trainParam.dep, 0xFF9D1C, false);
  outerTrain.position.set((trainParam.len-trainParam.botLen)/2,trainParam.height/1.5,0);
  
  var botTrain = makeBox(trainParam.botLen, trainParam.botHeight, trainParam.botDep, 0x7F4F0E, false);
  botTrain.position.set(0,trainParam.botHeight/2,0);

  var trainDoor = makeBox(trainParam.doorLen, trainParam.doorHeight, trainParam.doorDep, 0xFFBE68, false);
  trainDoor.position.set(-trainParam.len*.2, trainParam.doorHeight/2, trainParam.botDep/2);



  //I know this is ineffcient. I'm not sure if I'll have time to come back and fix it up...
  var glassWindow = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindow.position.set(-trainParam.len*.2, trainParam.doorHeight/2 + trainParam.windowHeight, trainParam.botDep/2);
  var glassWindowOpp = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindowOpp.position.set(-trainParam.len*.2, trainParam.doorHeight/2 + trainParam.windowHeight, -trainParam.botDep/2);

  var glassWindow1 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindow1.position.set(-trainParam.len*.4, trainParam.doorHeight/2 + trainParam.windowHeight, trainParam.botDep/2);  
  var glassWindowOpp1 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindowOpp1.position.set(-trainParam.len*.4, trainParam.doorHeight/2 + trainParam.windowHeight, -trainParam.botDep/2);  


  var glassWindow2 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindow2.position.set(trainParam.len*.2, trainParam.doorHeight/2 + trainParam.windowHeight, trainParam.botDep/2);  
  var glassWindowOpp2 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindowOpp2.position.set(trainParam.len*.2, trainParam.doorHeight/2 + trainParam.windowHeight, -trainParam.botDep/2);  


  var glassWindow3 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindow3.position.set(trainParam.len*.4, trainParam.doorHeight/2 + trainParam.windowHeight, trainParam.botDep/2);
  var glassWindowOpp3 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindowOpp3.position.set(trainParam.len*.4, trainParam.doorHeight/2 + trainParam.windowHeight, -trainParam.botDep/2);

  var glassWindow4 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindow4.position.set(trainParam.len*.005, trainParam.doorHeight/2 + trainParam.windowHeight, trainParam.botDep/2);  
  var glassWindowOpp4 = makeBox(trainParam.windowLen, trainParam.windowHeight, trainParam.windowDep, 0x93A0FF, true);
  glassWindowOpp4.position.set(trainParam.len*.005, trainParam.doorHeight/2 + trainParam.windowHeight, -trainParam.botDep/2);  


  var topTrain = makeBox(trainParam.topLen, trainParam.topHeight, trainParam.topDep, 0x7F4F0E, false);
  topTrain.position.set(0,trainParam.height+trainParam.topHeight*2,0);


  var wheel1 = makeWheel();
  wheel1.position.set(-trainParam.len/2,-trainParam.wheelHeight/2,trainParam.dep/2);
  wheel1.rotation.x = Math.PI/2;

  var wheel2 = makeWheel();
  wheel2.position.set(-trainParam.len/2,-trainParam.wheelHeight/2,-trainParam.dep/2);
  wheel2.rotation.x = Math.PI/2;

  var wheel3 = makeWheel();
  wheel3.position.set(trainParam.len/2,-trainParam.wheelHeight/2,-trainParam.dep/2);
  wheel3.rotation.x = Math.PI/2;

  var wheel4 = makeWheel();
  wheel4.position.set(trainParam.len/2,-trainParam.wheelHeight/2,trainParam.dep/2);
  wheel4.rotation.x = Math.PI/2;



  train.add(botTrain);
  train.add(outerTrain);
  train.add(trainDoor);
  train.add(glassWindow);
  train.add(glassWindow1);
  train.add(glassWindow2);
  train.add(glassWindow3);
  train.add(glassWindow4);
  train.add(glassWindowOpp);
  train.add(glassWindowOpp1);
  train.add(glassWindowOpp2);
  train.add(glassWindowOpp3);
  train.add(glassWindowOpp4);
  train.add(topTrain);
  train.add(wheel1);
  train.add(wheel2);
  train.add(wheel3);
  train.add(wheel4);
  return train;
}

