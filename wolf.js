//Alice Wong
//Three.js file of a wolf
//Origin is at the bottom of the wolf's stomach

var wolfParams ={
  headRadius: 20,
  bottomEarRadius: 0,
  topEarRadius: 5,
  earHeight: 15,
  facialFeatureRadius: 4,
  bodyRadius: 20,
  bodyX: 2.5,
  bodyZ: 1.5,
  legRadius: 4,
  legHeight: 25,
  footRadius: 5,
  tailBottomRadius: 0,
  tailTopRadius: 5,
  tailHeight:15,
  footScaleX:1.5,
  earRotation: Math.PI/6,
  eyeScale: 0.1,
  eyeRotation: Math.PI/10,
  noseScale: 0.7,
  tailRotation: -Math.PI/4
}

//loading fur texture
var furTexture = new THREE.ImageUtils.loadTexture("fur.png");
furTexture.wrapS = THREE.RepeatWrapping;
furTexture.wrapT = THREE.RepeatWrapping;
furTexture.repeat.set(1,1);



//Function to create the head of the wolf.
//No input, Output: head mesh
function createWolfHead() {
  var headGeom = new THREE.SphereGeometry(wolfParams.headRadius,10,10);
  var headMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,
    ambient: 0xFFFFFF,
    specular: 0xFFFFFF,
    shininess: 5,
    map: furTexture});
  var headMesh = new THREE.Mesh(headGeom, headMaterial);
  headMesh.position.set(0,55,0);
  return headMesh;
}

//Function that creates an ear of the wolf
//No inputs, Returns an ear mesh
function createWolfEar(){
  var earGeom = new THREE.CylinderGeometry(wolfParams.bottomEarRadius,
                                           wolfParams.topEarRadius,
                                           wolfParams.earHeight);
  var earMaterial = new THREE.MeshPhongMaterial({color:0x7F7770,
                                                 ambient: 0x7F7770,
                                                 specular: 0x7F7770,
                                                 shininess: 5,
                                                 map: furTexture});
  var earMesh = new THREE.Mesh(earGeom, earMaterial);
  return earMesh;
}

//Function to create the facial features (eyes, nose) of the wolf
//Input none. output facialfeature
function createWolfFacialFeature(){
  var facialFeatureGeom = new THREE.SphereGeometry(wolfParams.facialFeatureRadius,20,10);
  var facialFeatureMat = new THREE.MeshPhongMaterial({color: 0x000000,
                                                   ambient: 0x000000,
                                                 specular: 0x000000,
                                                 shininess: 5,});
  var facialFeature = new THREE.Mesh(facialFeatureGeom, facialFeatureMat);
  return facialFeature;
}

//Function to create body of the wolf
//Input: none, output: body mesh
function createWolfBody(){
  var bodyGeom = new THREE.SphereGeometry(wolfParams.bodyRadius, 10, 10);
  var bodyMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,
                                                  ambient: 0xFFFFFF,
                                                 specular: 0xFFFFFF,
                                                 shininess: 5,
                                                  map: furTexture});
  var bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
  bodyMesh.position.set(47, 27, 0);
  bodyMesh.rotation.z = -Math.PI/20;
  bodyMesh.scale.x = wolfParams.bodyX;
  bodyMesh.scale.z = wolfParams.bodyZ;
  return bodyMesh;
}

//Function to make legs of the wolf
//Input: none, Output: leg mesh
function createWolfLeg(){
  var legGeom = new THREE.CylinderGeometry(wolfParams.legRadius, 
                                           wolfParams.legRadius, 
                                           wolfParams.legHeight);
  var legMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,
                                                  ambient: 0xFFFFFF,
                                                 specular: 0xFFFFFF,
                                                 shininess: 5,
                                                 map: furTexture});
  var legMesh = new THREE.Mesh(legGeom, legMaterial);
  return legMesh;
}

//Function to create a foot
//Input: none, Output: foot mesh
function createWolfFoot(){
  var footGeom = new THREE.SphereGeometry(wolfParams.footRadius,5,5);
  var footMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,
                                                  ambient: 0xFFFFFF,
                                                 specular: 0xFFFFFF,
                                                 shininess: 5,
                                                map: furTexture});
  var footMesh = new THREE.Mesh(footGeom, footMaterial);
  footMesh.scale.x = wolfParams.footScaleX;
  return footMesh;
}

//Function that creates a tail
//Input: none, Output: tail mesh
function createWolfTail(){
  var tailGeom = new THREE.CylinderGeometry(wolfParams.tailBottomRadius, 
                                            wolfParams.tailTopRadius, 
                                            wolfParams.tailHeight);
  var tailMaterial = new THREE.MeshPhongMaterial({color:0x7F7770,
                                                  ambient: 0x7F7770,
                                                 specular: 0x7F7770,
                                                 shininess: 5,
                                                  map: furTexture});
  var tailMesh = new THREE.Mesh(tailGeom, tailMaterial);
  return tailMesh;
}

//Function that creates a container for the wolf and adds
//positions the body parts corretly on the wolf
//Input: none, Output: wolf object
function createWolf(){
  var wolf = new THREE.Object3D(); //Container for wolf

  var head = createWolfHead();
  wolf.add(head);

  //Create and position left ear
  var leftEar = createWolfEar();
  leftEar.position.set(0,70,-15);
  leftEar.rotation.x = -wolfParams.earRotation;

  //Create and position right ear
  var rightEar = createWolfEar();
  rightEar.position.set(0,70,15);
  rightEar.rotation.x = wolfParams.earRotation;

  wolf.add(leftEar);
  wolf.add(rightEar);

  //Creates the left eye
  var leftEye = createWolfFacialFeature();
  leftEye.position.set(-19,60,-7);
  leftEye.rotation.x = -wolfParams.eyeRotation;
  leftEye.scale.x = wolfParams.eyeScale;
  leftEye.scale.y = wolfParams.eyeScale;
  wolf.add(leftEye);

  //Creates the right eye
  var rightEye = createWolfFacialFeature();
  rightEye.position.set(-19,60,7);
  rightEye.rotation.x = wolfParams.eyeRotation;
  rightEye.scale.x = wolfParams.eyeScale;
  rightEye.scale.y = wolfParams.eyeScale;
  wolf.add(rightEye);

  //Creates the nose
  var nose = createWolfFacialFeature();
  nose.position.set(-19,50,0);
  nose.scale.set(wolfParams.noseScale, 
                 wolfParams.noseScale, 
                 wolfParams.noseScale);
  wolf.add(nose);

  //Creates the body
  var body = createWolfBody();
  wolf.add(body);

  //Creates the front legs and feet
  var leftLeg = createWolfLeg();
  leftLeg.position.set(8,13,-10);
  var rightLeg = createWolfLeg();
  rightLeg.position.set(8,13,10);
  var leftFoot = createWolfFoot();
  leftFoot.position.set(2,5,-10);
  var rightFoot = createWolfFoot();
  rightFoot.position.set(2,5,10);

  wolf.add(leftLeg);
  wolf.add(rightLeg);
  wolf.add(leftFoot);
  wolf.add(rightFoot);

  //Creates the back legs and feet
  var leftBackLeg = createWolfLeg();
  leftBackLeg.position.set(85,13,-10);
  var rightBackLeg = createWolfLeg();
  rightBackLeg.position.set(85,13,10);
  var leftBackFoot = createWolfFoot();
  leftBackFoot.position.set(80,5,-10);
  var rightBackFoot = createWolfFoot();
  rightBackFoot.position.set(80,5,10);

  wolf.add(leftBackLeg);
  wolf.add(leftBackFoot);
  wolf.add(rightBackLeg);
  wolf.add(rightBackFoot);

  //Creates the tail
  var tail = createWolfTail();
  tail.position.set(95,35,0);
  tail.rotation.z = wolfParams.tailRotation;
  wolf.add(tail);

  return wolf;
}