//Alice Wong
//Creates a lamp

//Function to create the lamp parts
function makeLampBody(col, length, height, depth, opac){
    var lampGeometry = new THREE.BoxGeometry(length,height,depth);
    var lampMaterial = new THREE.MeshPhongMaterial({color: col,
                                                    ambient: col,
                                                    specular: col,
                                                    transparency: true,
                                                    opacity: opac,

                                                  });
    var lampMesh = new THREE.Mesh(lampGeometry, lampMaterial);
    return lampMesh;
  }

//Function to make the string of the lamp to appear as if it is
//floating
function makeLampString(col){
  var lampStringGeom = new THREE.CylinderGeometry(.1,.1, 10);
  var lampStringMat = new THREE.MeshBasicMaterial({color: col});
  var lampStringMesh = new THREE.Mesh(lampStringGeom, lampStringMat);
  return lampStringMesh;
}

//Function that makes the actual lamp and puts it together
//Origin is at the center of the inside of the lamp
function makeGlowingLamp(){
  var lamp = new THREE.Object3D();
  var lampBody = makeLampBody(0xFFE79A,4,10,4,0.3);

  var lampBottomFrame = makeLampBody(0x0000000,5,0.5,5,1);
  lampBottomFrame.position.set(0,-5,0);

  var lampTopFrame = makeLampBody(0x0000000, 5,0.5,5,1);
  lampTopFrame.position.set(0,5,0);

  var lampSideFrame1 = makeLampBody(0x0000000,0.5,11,0.5,1);
  lampSideFrame1.position.set(2,0,2);

  var lampSideFrame2 = makeLampBody(0x0000000,0.5,11,0.5,1);
  lampSideFrame2.position.set(-2,0,-2);
    
  var lampSideFrame3 = makeLampBody(0x0000000,0.5,11,0.5,1);
  lampSideFrame3.position.set(-2,0,2);
    
  var lampSideFrame4 = makeLampBody(0x0000000,0.5,11,0.5,1);
  lampSideFrame4.position.set(2,0,-2);

  var lampString = makeLampString(0x0000000);
  lampString.position.set(0,5,0);

  lamp.add(lampBody);
  lamp.add(lampBottomFrame);
  lamp.add(lampTopFrame);
  lamp.add(lampSideFrame1);
  lamp.add(lampSideFrame2);
  lamp.add(lampSideFrame3);
  lamp.add(lampSideFrame4);
  lamp.add(lampString);
  return lamp;
}