//Alice Wong
//Three.js file of No Face from Spirited Away

var noFaceMaskPoints = [
    [ [.7,3,0],  [2,5,1],  [4,5,1],  [5.1, 3, 0] ],
    [ [0.5,2,0], [2,4,1],  [4,2,1],  [5.4, 2, 0] ],
    [ [0.5,1,0], [2,1,1],  [4,1,1],  [5.4, 1, 0] ],
    [ [.7,0,0],  [1.5,-4,0], [4.5,-4,0], [5.1, 0, 0] ]
];

//Function to make the facial features of No face
//Makes a bezier surface of the mask and we will use it as a 
//basis for other facial features
function makeNoFaceMask(facialFeatureColor){
  var noFaceMaskGeom = new THREE.BezierSurfaceGeometry( noFaceMaskPoints.reverse(), 8, 8 );
  var noFaceMaskMat  = new THREE.MeshPhongMaterial( { color: facialFeatureColor,
                                              ambient: facialFeatureColor,
                                              specular: facialFeatureColor,
                                              shininess: 5,
                                              wireframe: false,
                                              linewidth: 2,
                                              side: THREE.DoubleSide} );

  var noFaceMask = new THREE.Mesh( noFaceMaskGeom, noFaceMaskMat );
  return noFaceMask;
}

//Makes the eye of No face
function makeNoFaceEye(){
  var noFaceEye = makeNoFaceMask(0x000000);
  noFaceEye.scale.set(0.1,0.055,0.1);
  return noFaceEye;
}

//Makes the mouth of No face
function makeNoFaceMouth(){
  var halfSmile = makeNoFaceMask(0x000000);
  halfSmile.scale.set(0.2,0.045,0.075);
  return halfSmile;
}

//Makes the triangles of no face, for eyes
function makeTriangle(){
  var triangleFace = new THREE.Geometry();

  var triV1 = new THREE.Vector3(0.1,0.1,0);
  var triV2 = new THREE.Vector3(0.5,0.1,0);
  var triV3 = new THREE.Vector3(0.25,1.5,0);

  triangleFace.vertices.push(triV1);
  triangleFace.vertices.push(triV2);
  triangleFace.vertices.push(triV3);

  triangleFace.faces.push(new THREE.Face3(0,1,2));
  triangleFace.computeFaceNormals();
  
  var triMat = new THREE.MeshPhongMaterial({color:0xB58EFF,
                                            ambient: 0xB58EFF,
                                            specular: 0xB58EFF,
                                            side: THREE.DoubleSide});
  var triMesh = new THREE.Mesh(triangleFace, triMat);
  return triMesh;
}

//Makes the eye bag of No face
function makeEyeBag(){
  var eyeBag = makeNoFaceMask(0x000000);
  eyeBag.scale.set(0.1,0.015,0.075);
  return eyeBag;
}

//Makes the chin shadow of no face
function makeChinShadow(){
  var chin = makeNoFaceMask(0xB58EFF);
  chin.scale.set(0.1, 0.015, 0.075);
  return chin;
}

//Makes the actual face of no face
//Origin is at the left middle side of the head
function makeNoFaceHead(){
var noFaceHead = new THREE.Object3D();

var noFaceMask = makeNoFaceMask(0xFFFFFF);

var noFaceLeftEye = makeNoFaceEye();
var noFaceRightEye = makeNoFaceEye();

noFaceRightEye.position.set(3.75,1.5,0.625);
noFaceRightEye.rotation.y = Math.PI/20;

noFaceLeftEye.position.set(1.5,1.5,0.5);
noFaceLeftEye.rotation.y = -Math.PI/20;

var noFaceMouth = makeNoFaceMouth();
noFaceMouth.position.set(2.3,-1.25,0.3);

var noFaceLEBottomTri = makeTriangle();
noFaceLEBottomTri.scale.set(1,-1,1);
noFaceLEBottomTri.position.set(1.5,1,0.6);
noFaceLEBottomTri.rotation.x = Math.PI/18;

var noFaceLETopTri = makeTriangle();
noFaceLETopTri.scale.set(1,0.75,1);
noFaceLETopTri.position.set(1.5,2,0.65);
//noFaceLETopTri.rotation.x = -Math.PI/60;

var noFaceREBottomTri = makeTriangle();
noFaceREBottomTri.scale.set(1,-1,1);
noFaceREBottomTri.position.set(3.75,1,0.65);
noFaceREBottomTri.rotation.x = Math.PI/18;

var noFaceRETopTri = makeTriangle();
noFaceRETopTri.scale.set(1,0.75,1);
noFaceRETopTri.position.set(3.75,2,0.65);
//noFaceRETopTri.rotation.x = -Math.PI/60;

var noFaceLEEyeBag = makeEyeBag();
noFaceLEEyeBag.position.set(1.5,1.15,0.6);

var noFaceREEyeBag = makeEyeBag();
noFaceREEyeBag.position.set(3.75,1.15,0.6);

var noFaceChin = makeChinShadow();
noFaceChin.position.set(2.6,-1.55,0.3);


noFaceHead.add(noFaceMask);
noFaceHead.add(noFaceLeftEye);
noFaceHead.add(noFaceRightEye);
noFaceHead.add(noFaceMouth);
noFaceHead.add(noFaceLEBottomTri);
noFaceHead.add(noFaceREBottomTri);
noFaceHead.add(noFaceLETopTri);
noFaceHead.add(noFaceRETopTri);
noFaceHead.add(noFaceLEEyeBag);
noFaceHead.add(noFaceREEyeBag);
noFaceHead.add(noFaceChin);


return noFaceHead;
}

//Function to make the bottom part of his body
function makeNoFaceBottomBody(){
  var bottomBodyGeom = new THREE.CylinderGeometry(3,4,27,50);
  var bodyTexture = new THREE.ImageUtils.loadTexture("noface.png");
  bodyTexture.wrapS = THREE.RepeatWrapping;
  bodyTexture.wrapT = THREE.RepeatWrapping;
  bodyTexture.repeat.set(1,1);
  var bottomBodyMaterial = new THREE.MeshBasicMaterial({color: 0x000000,
                                                        transparent: true,
                                                        opacity: 0.8,
                                                        map: bodyTexture,
                                                      });
  var bottomBodyMesh = new THREE.Mesh(bottomBodyGeom, bottomBodyMaterial);
  return bottomBodyMesh;
}

//Function to make the top of his head roundish
function makeNoFaceTopBody(){
  var topBodyGeom = new THREE.SphereGeometry(3,32,32);
  var topBodyMaterial = new THREE.MeshBasicMaterial({color:0x000000,
                                                      transparent: true,
                                                        opacity: 0.7,
                                                      });
  var topBodyMesh = new THREE.Mesh(topBodyGeom, topBodyMaterial);
  return topBodyMesh;
}

//Function to put all the parts of no face together
//Origin is at the center of No face's body
function makeNoFace(){
  var noFaceFinal = new THREE.Object3D();

  var noFaceBottomBody = makeNoFaceBottomBody();
  var noFaceTopBody = makeNoFaceTopBody();
  noFaceTopBody.position.set(0,13,0);

  var noFaceHead = makeNoFaceHead();
  noFaceHead.position.set(-3,10,3);
  noFaceHead.rotation.x = -Math.PI/25;

  noFaceFinal.add(noFaceBottomBody);
  noFaceFinal.add(noFaceTopBody);
  noFaceFinal.add(noFaceHead);

  return noFaceFinal;
}