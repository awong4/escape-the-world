//Alice Wong
//Three.js file of a magician, based off the clown assignment
//Origin is at the feet of the magician

//Create the colors and materials for the clown parts
//Colors are created separately so that someone may change them easily
//at a later time without needing to change it directly in the material code
var bodyHatColor = 0x6495ed; //Cornflower blue for body, arms and hat
var facialFeaturesColor = 0x27408b//Royal blue for eyes and ears
var headColor = 0xbbffff; //Pale turquoise for the head
var smileColor = 0xffaeb9 //Light Pink for smile
var shoulderLegColor = 0xff00ff //Magenta for the shoulder and legs
var handFeetColor = 0x00fa9a //Medium Spring Green for hands and feet

 // var magicBallMat = new THREE.MeshPhongMaterial({color: THREE.ColorKeywords.grey, 
 //                      ambient: THREE.ColorKeywords.grey, 
 //                      specular: THREE.ColorKeywords.grey, shininess: 20, emissive: 0x000000});

var bodyHatMaterial = new THREE.MeshPhongMaterial({color: bodyHatColor, ambient: bodyHatColor});
var facialFeaturesMaterial = new THREE.MeshPhongMaterial({color: facialFeaturesColor, ambient: facialFeaturesColor});
var headMaterial = new THREE.MeshPhongMaterial({color: headColor, ambient:headColor});
var smileMaterial = new THREE.MeshPhongMaterial({color: smileColor, ambient:smileColor});
var shoulderLegMaterial = new THREE.MeshPhongMaterial({color: shoulderLegColor, ambient:shoulderLegColor});
var handFeetMaterial = new THREE.MeshPhongMaterial({color: handFeetColor, ambient:handFeetColor});

//Function to create the nose of the clown
//Input: Parameters of the clown
//Output: returns the nose object 
function createNose(params) {
  var sd = params.sphereDetail;
  var radius = params.noseRadius;
  var noseGeometry = new THREE.SphereGeometry(radius, sd, sd);
  var noseMesh = new THREE.Mesh(noseGeometry, facialFeaturesMaterial);
  return noseMesh;
}

//Function to add the nose
//Input: the head of the clown, parameters of the clown
//Output: returns the head of the clown
//This function creates a nose frame and then a nose. The
//nose is adjusted by position and then added to the frame
//then the frame is rotated and the frame is added to the head
function addNose(head, params){
  var noseframe = new THREE.Object3D();
  var nose = createNose(params);
  var radius = params.headRadius;
  nose.position.z = radius;
  noseframe.add(nose);
  var angle = params.noseRotation;
  noseframe.rotation.x = angle;
  head.add(noseframe);
  return head;
}

//This function creates the ear
//Input: parameters of the clown
//Output: Returns the earmesh
//This function creates the ear by making a sphere mesh and scales
//the ear and then returns the earmesh
function createEar(params){
  var sd = params.sphereDetail;
  var radius = params.earRadius;
  var earGeometry = new THREE.SphereGeometry(radius, sd, sd);
  var earMesh = new THREE.Mesh(earGeometry, facialFeaturesMaterial);
  earMesh.scale.z = params.earScale;
  return earMesh;
}

//This function adds the ear to the clown
//Input: the head of the clown, the parameters of the clown and the
//int in which will indicate the side we are creating (1 or -1)
//Output: Returns the head
//This function creates an ear frame and then creates the ear
//Then it will rearrange the ear to be in the correct position via
//position and rotation and then add the ear to the earframe and then
//add the earframe to the head and return the head
function addEar(head, params, side){
  var earframe = new THREE.Object3D();
  var ear = createEar(params);
  var radius = params.headRadius;
  var angle = params.earAngle;
  ear.position.x = side*radius;
  ear.rotation.z = side*angle;
  earframe.add(ear);
  head.add(earframe);
  return head;
}

//This function creates the eye
//Input: the parameters of the clown
//Output: the eye mesh
//This function creates a sphere mesh to be returned as an eye
function createEye(params){
  var sd = params.sphereDetail;
  var radius = params.eyeRadius;
  var eyeGeometry = new THREE.SphereGeometry(radius, sd, sd);
  var eyeMesh = new THREE.Mesh(eyeGeometry, facialFeaturesMaterial);
  return eyeMesh;
}

//This function adds the eye to the head
//Input: the head of the clown, parameters of the clown and the int
//that is indicating the side we are creating (1 or -1)
//Output: returns the head
//This function creates an eye frame and then creates the eye
//It positions the eye and then rotates the eyes to be the correct
//position. Then it will add the eye to the eyeframe and then add
//the eye frame to the head and return the head
function addEye(head, params, side){
  var eyeframe = new THREE.Object3D();
  var eye = createEye(params);
  var radius = params.headRadius;

  eye.position.z = radius;
  var angleX = params.eyeAngleX;
  var angleY = params.eyeAngleY;
  eyeframe.rotation.x = angleX;
  eyeframe.rotation.y = side * angleY;
  eyeframe.add(eye);
  head.add(eyeframe);
  return head;
}

//Function that creates the hat base
//Input: the parameters of the clown
//Output: returns the hatbase
//This function creates a sphere geometry to be returned
function createHatBase(params){
  var sd = params.sphereDetail;
  var radius = params.hatBaseRadius;
  var hatBaseGeometry = new THREE.SphereGeometry(radius,sd,sd);
  var hatBase = new THREE.Mesh(hatBaseGeometry, bodyHatMaterial);

  return hatBase;
}

//Function that adds the hat base
//Input: head of the clown object, parameters of the clown
//Output: nothing is returned
//This function creates the hat base and then scales, positions
//and rotates it and then adds the hatbase to the head
function addHatBase(head, params){
  var hatBase = createHatBase(params);
  hatBase.scale.y = params.hatBaseScale;
  hatBase.position.y = params.hatPositionShift;
  hatBase.rotation.z = params.hatBaseAngle;
  head.add(hatBase);
}

//Function creates the hat
//Input: parameters of the clown
//Output: nothing is returned
//Function creates a object that will have a cylinder mesh that will
//be returned
function createHat(params){
  var hat = new THREE.Object3D();
  var top = params.hatTopRadius;
  var bot = params.hatBottomRadius;
  var len = params.hatLength;
  var cd  = params.cylinderDetail;

    var hatGeometry = new THREE.CylinderGeometry(top,bot,len,cd);
    var hatMesh = new THREE.Mesh( hatGeometry, bodyHatMaterial );


    return hatMesh;
  }

//This function adds the hat to the head
//Input: the head of the clown and the parameters of the clown
//Output: returns the hat
//This function creates the hat and then sets the position and rotation
//to position it correctly on the head, adds the head and returns the hat
  function addHat(head,params){
    var hat = createHat(params);
    hat.position.y = params.hatPositionShift2;
    hat.rotation.z = params.hatBaseAngle;

    head.add(hat);

    return hat;
  }

//This function creates the smile
//Input: the parameters of the clown
//Output: returns the smile
//This function creates the smile by creating a torus. Then returns the mesh
  function createSmile(params){
    var smRadius = params.smileRadius;
    var smAngle = params.smileAngle;
    var smileGeometry = new THREE.TorusGeometry(smRadius, 3, 8, 6, smAngle);
    var smileMesh = new THREE.Mesh(smileGeometry, smileMaterial);
    return smileMesh;
  }

//This function adds the smile onto the clown
//Input: head of the clown and the parameters of the clown
//Output: returns the head
//This function creates the smile and scales it down to fit the face
//Then it positions it and adds it to the head and returns the head.
  function addSmile(head,params){
    var smile = createSmile(params);
    smile.scale.x = .05;
    smile.scale.y = .05;
    smile.scale.z = .1;
    smile.position.z = params.headRadius;
    smile.position.y = params.bodyRadius-6;
    head.add(smile);
    return head;
  }

//This function creates the head
//Input: the clown's parameters
//Output: returns the head of the clown
//This function creates an object to be the clown's head. It will
//add a sphere mesh to be the head and then add the nose, ears, eyes,
//smile, and hat. Then it will return the head.
function createHead(params) {
  var head = new THREE.Object3D();

  var sd = params.sphereDetail;
  var radius = params.headRadius;
  var headGeometry = new THREE.SphereGeometry(radius, sd, sd);
  var headMesh = new THREE.Mesh(headGeometry, headMaterial);
  head.add(headMesh);

    addNose(head,params);

    addEar(head,params,1);
    addEar(head,params, -1);

    addEye(head, params, 1);
    addEye(head, params, -1);

    addSmile(head,params);

    addHatBase(head, params);

    addHat(head,params);

 return head;
}

//This function creates the shoulder/connector between arm and body
//Input: parameters of the clown
//Output: return a shoulderconnector
//This function creates an object and adds a sphere mesh to be the
//shoulder connector. It will also return the shoulder connector.
function createShoulderConnector(params){
  var shoulderConnector = new THREE.Object3D();
  var radius = params.connectorRadius;
  var sd = params.sphereDetail;

  var shoulderConnectorGeom = new THREE.SphereGeometry(radius, sd, sd);
  var shoulderConnectorMesh = new THREE.Mesh(shoulderConnectorGeom, shoulderLegMaterial);

  shoulderConnector.add(shoulderConnectorMesh);
  return shoulderConnector;
}

//Function that creates the shoulder connecting the arm and body
//Input: the clown that we will add the connector to, the clown's parameters,
//the integer that will indicate what side which we will be creating (-1 or 1)
//Output: the function has no output. it only adds the shoulderconnector to 
//the clown
//This function creates the connector and positions it to be between the arm
//and the body. Then adds it to the clown.
function addShoulderConnector(clown, params,side) {
  var shoulderConnector = createShoulderConnector(params);
  var sx = params.shoulderWidth;
  var sy = params.shoulderHeight;
  shoulderConnector.position.set(side*sx*2, sy, 0);
  clown.add(shoulderConnector);
  return shoulderConnector;
}

//Function that creates the hands
//The input is the clown's parameters
//The output is the hand object created
//This function creates an object that will have a sphere mesh
//added to it and return the hand object
function createHand(params){
  var hand = new THREE.Object3D();
  var radius = params.handRadius;
  var sd = params.sphereDetail;

  var handGeometry = new THREE.SphereGeometry(radius, sd, sd);
  var handMesh = new THREE.Mesh(handGeometry, handFeetMaterial);

  hand.add(handMesh);
  return hand;
}

//This function adds a hand to the clown
//Input: A clown body part where the hand will be added to, the clown's parameters,
//the integer 1 or -1 which the integer will indicate what side it will be on
//Output: Nothing returned, it will just add the hand to the clown
//The function will create the hand and then set the position so that it will be
//on the arm
function addHand(clown, params, side){
  var hand = createHand(params);
  var sx = params.shoulderWidth*1.5;
  var sy = params.shoulderHeight*.5;
  hand.position.set(side * sx*2, -sy, 0 );
  clown.add(hand);
  return hand;
}

//Function to create foot
//Input clown parameters
//Output returns a foot
//This function creates an object for a half sphere to be added
//It returns a foot.
function createFoot(params){
  var foot = new THREE.Object3D();
  var radius = params.footRadius;
  var sd = params.sphereDetail;

  var footGeometry = new THREE.SphereGeometry(radius, sd, sd, Math.PI, Math.PI*2 ,0, Math.PI/2);
  var footMesh = new THREE.Mesh(footGeometry, handFeetMaterial);

  foot.add(footMesh);
  return foot;
}

//Function to add a foot
//Input: clown to add the foot to, parameters of the clown and the side that
//we want to create the object in
//Output: nothing returned
//The foot is created and then the position is set so that the foot will intersect
//the leg enough to look like shoes. Then the foot is added to the clown
function addFoot(clown, params, side){
  var foot = createFoot(params);
  var sx = side*params.hipWidth*.8;
  var sy = params.hipHeight-params.legLength+params.footRadius*.5;
  foot.position.set(sx, sy,0);
  clown.add(foot);
}

//Function to create the arm
//Input: parameters of the clown
//Output: returns an arm object
//The function creates a new object for the arm and then creates
//a cylinder mesh to add to it. The arm is adjusted to position it
//correctly in the clown object
function createArm(params) {
    var arm = new THREE.Object3D();
    var top = params.armRadiusTop;
    var bot = params.armRadiusBottom;
    var len = params.armLength;
    var cd  = params.cylinderDetail;

    var armGeom = new THREE.CylinderGeometry(top,bot,len,cd);
    var armMesh = new THREE.Mesh( armGeom, bodyHatMaterial );
    armMesh.position.y = -len/2;
    arm.add(armMesh);

    return arm;
  }

//Function to add an arm
//Input: clown that you will attach the arm to, parameters of the clown
//and an integer to determine which side you are creating
//Output: Nothing returned
//The function creates the arms and then sets the position of the arm
//to be coming out of the shoulder connectors. Then it adds the arm to
//the body of the clown. The arm is "rotated" because depending on the
//side we may want it flipped across the axis
  function addArm(clown,params,side) {
    var arm = createArm(params);
    var sx = params.shoulderWidth;
    var sy = params.shoulderHeight;
    arm.position.set(side*sx*2, sy, 0);
    arm.rotation.z = side*Math.PI/8;
    clown.add(arm);
    return arm;
  }

//Function to create a leg 
//Input is the radius of the top of the leg, radius of the bottom of
//the leg, the length of the leg and the clown's parameters
//Output is the leg object
//The function creates a leg object which is essentially a cylinder
//and then creates a leg mesh which is added to the leg object.
//It also adjusts the leg's position to be right above the origin
  function createLeg(radiusTop, radiusBottom, length, params) {
    var leg = new THREE.Object3D();
    var cd  = params.cylinderDetail;

    var legGeom = new THREE.CylinderGeometry(radiusTop,radiusBottom,length,cd);
    var legMesh = new THREE.Mesh( legGeom, shoulderLegMaterial);

    legMesh.position.y = -length/2;
    leg.add(legMesh);
    return leg;
  }

//Function to add a leg to an object
//Input: clown, params, side. Clown is the part of the clown
//that the object is being added to. Params is the parameters of
//the clown and side is used to determine the left or the right side
//Output: Nothing is returned, only a leg added to the clown
  function addLeg(clown,params,side) {
    var top = params.legRadiusTop;
    var bot = params.legRadiusBottom;
    var len = params.legLength;
    var leg = createLeg(top,bot,len,params);

    var radius = params.bodyRadius;
    var scale = params.bodyScaleY; 
    var hx = side*params.hipWidth*.8;
    var hy = params.hipHeight*.8;
    leg.position.set(hx, hy, 0 );
    clown.add(leg);
  }

//Function to create the body of the clown
//Input: Parameters of the clown
//Output: Body object
//The function creates the body object and then
//creates the arms, shoulder connectors, hands,
//legs, and feet to attach to it. Then sets the position of the body
//above the origin. For those methods that have 1 and -1,
//it is to create one on the left and one on the right
var leftArm;
var rightArm;
var leftShoulder;
var rightShoulder;
var leftHand;
var rightHand;

function createBody(params){
  var body = new THREE.Object3D();
  var radius = params.bodyRadius;
  var sd = params.sphereDetail;
  var bodyGeom = new THREE.SphereGeometry(radius, sd, sd);
  var bodyMesh = new THREE.Mesh(bodyGeom, bodyHatMaterial);
  bodyMesh.scale.y = params.bodyScaleY;
  bodyMesh.scale.x = params.bodyScaleX;

  body.add(bodyMesh);

  leftArm = addArm(body, params, 1);
  rightArm = addArm(body, params, -1);

  leftShoulder = addShoulderConnector(body,params,1);
  rightShoulder = addShoulderConnector(body,params,-1);
  
  leftHand = addHand(body, params,1);
  rightHand = addHand(body,params,-1);
  
  addLeg(body, params, 1);
  addLeg(body, params, -1);
  
  addFoot(body, params, 1);
  addFoot(body,params, -1);
  
  var distFromOrigin = radius*3;
  body.position.set(0, distFromOrigin, 0);
  return body;
}

//Function to create a clown object
//Input is the the parameters of the clown
//Output is a clown object
//The function creates the body and then adds the body to the
//clown, creates the head and adds the head to the clown obj
function createClown (params) {
  var clown = new THREE.Object3D();  
  var body = createBody(params);
  clown.add(body);

  var head = createHead(params);
  var bs = params.bodyScaleY;
  var br = params.bodyRadius*2.9;
  var hr = params.headRadius;

    //calculate the position for the center of the head
    head.position.y = bs*br+hr;
    clown.add(head);
    return clown;
  }