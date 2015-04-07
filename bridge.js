var railParam = {
  outerLen: 200,
  outerRad: 2,
  innerLen: 30,
  innerRad: 1.5,
  enterRailLen: 50,
  enterRailRad: 3
}

var bridgeParam ={
  planeLen: 200,
  planeWid:80,
  planeHeight:3
}

var bridgeTexture = new THREE.ImageUtils.loadTexture("bridgewood.jpg");
//bridgeTexture.repeat.set(10,1);


function createRailPart(rad, len){
  var outerRailGeom = new THREE.CylinderGeometry(rad, rad, len);
  var outerRailMat = new THREE.MeshPhongMaterial({color: 0x7F0000, 
                                                  ambient: 0x7F0000,
                                                  specular: 0x7F0000,
                                                  shininess: 50});
  var outerRailMesh = new THREE.Mesh(outerRailGeom, outerRailMat);
  return outerRailMesh;
}

//Function that creates a bridge side
//No input, returns the side of the bridge
//Origin: Radius of the left post on the bottom
function createBridgeSide(){
  var bridgeSide = new THREE.Object3D();

  var post1 = createRailPart(railParam.enterRailRad, railParam.enterRailLen);
  post1.position.set(0,railParam.enterRailLen/2,0);

  var post2 = createRailPart(railParam.enterRailRad, railParam.enterRailLen);
  post2.position.set(railParam.outerLen,railParam.enterRailLen/2,0);

  var outerRailTop = createRailPart(railParam.outerRad, railParam.outerLen);
  outerRailTop.rotation.z = Math.PI/2;
  outerRailTop.position.set(railParam.outerLen/2,railParam.enterRailLen/5,0);

  var outerRailBot = createRailPart(railParam.outerRad, railParam.outerLen);
  outerRailBot.rotation.z = Math.PI/2;
  outerRailBot.position.set(railParam.outerLen/2,railParam.enterRailLen*4/5,0);

  //Not really sure why the for loop required hard numbers... It just didn't let
  //me make variables as parameters for some reaosn.
   var i;
   var innerRail = createRailPart(railParam.innerRad, railParam.innerLen);
   var j = 10;
  for(i=10; i < 200; i = i+10){
   var innerRail1 = innerRail.clone();
   innerRail1.position.set(j, 25, 0);
   bridgeSide.add(innerRail1);
   j = j + 10;
  };

  bridgeSide.add(post1);
  bridgeSide.add(post2);

  bridgeSide.add(outerRailTop);
  bridgeSide.add(outerRailBot);

  return bridgeSide;
}

function createBridge(){
  var bridge = new THREE.Object3D();
  var bridgeLeftSide = createBridgeSide();
  var bridgeRightSide = createBridgeSide();
  bridgeRightSide.position.set(0,0,bridgeParam.planeWid);

  var bridgePlaneGeom = new THREE.BoxGeometry(bridgeParam.planeWid, bridgeParam.planeLen,bridgeParam.planeHeight);
  var bridgePlaneMat = new THREE.MeshLambertMaterial({color: 0xFFB996,
                                                      ambient: 0xFFB996,
                                                      side: THREE.DoubleSide,
                                                      map: bridgeTexture});
  var bridgePlaneMesh = new THREE.Mesh(bridgePlaneGeom, bridgePlaneMat);
    bridgePlaneMesh.position.set(bridgeParam.planeLen/2,bridgeParam.planeHeight/2,bridgeParam.planeWid/2);
  bridgePlaneMesh.rotation.x = Math.PI/2;
  bridgePlaneMesh.rotation.z = Math.PI/2;

  bridge.add(bridgePlaneMesh);
  
  bridge.add(bridgeLeftSide);
  bridge.add(bridgeRightSide);

  return bridge;
}