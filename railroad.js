//Alice Wong
//Three.js file of railroad tracks
//Origin is at the beginning of the tracks on the left metal bar corner

var railroadParam = {
  len: 10,
  height: 10,
  depth: 1500,
  dist: 100,
  innerLen: 5,
  innerDepth:3,
  innerHeight:100
};


var innerRailTexture = new THREE.ImageUtils.loadTexture("log.jpg");

//Function to create the side of the railroad
//Takes in a col, len height and depth
//returns a rail
function createRailRoadSide(col, len, height, dep, map){
  var outerRailGeom = new THREE.BoxGeometry(len, height, dep);
  var outerRailMat = new THREE.MeshPhongMaterial({color: col, 
                                                  ambient: col,
                                                  specular: col,
                                                  shininess: 50});
  if(map == true){
    outerRailMat.map = innerRailTexture;
  }
  var outerRailMesh = new THREE.Mesh(outerRailGeom, outerRailMat);
  return outerRailMesh;
}



function createRailRoad(){
  var railRoad = new THREE.Object3D();

  var railroadLeftSide = createRailRoadSide(0x787F7F,railroadParam.len, railroadParam.height, railroadParam.depth, false);
  railroadLeftSide.position.set(0,0,railroadParam.depth/2);
  var railroadRightSide = createRailRoadSide(0x787F7F,railroadParam.len, railroadParam.height, railroadParam.depth, false);
  railroadRightSide.position.set(railroadParam.dist,0,railroadParam.depth/2);

  var i;
   var innerRailroad = createRailRoadSide(0x7F4837,railroadParam.innerLen, railroadParam.innerHeight, railroadParam.innerDepth ,true);
   var j = 50;
  for(i=50; i < 1500; i = i+50){
   var innerRailroad = innerRailroad.clone();
   innerRailroad.position.set(railroadParam.innerHeight/2, 0, j);
   innerRailroad.rotation.z = Math.PI/2;
   railRoad.add(innerRailroad);
   j = j + 50;
  };

  railRoad.add(railroadRightSide);
  railRoad.add(railroadLeftSide);

  railRoad.position.set(0,railroadParam.height/2, 0);
  return railRoad;
}

