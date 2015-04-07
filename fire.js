//Alice Wong
//Three.js file to make fire

//Function to build an individual log
//Input: none, Output: log mesh
//Creates a log with texture on it and rotate it 
//90 degrees around the z axis.
function buildLog(){
  var logGeom = new THREE.CylinderGeometry(10,10,300,32);
  var logTexture = new THREE.ImageUtils.loadTexture("log.jpg");
  var logMaterial = new THREE.MeshPhongMaterial({color: 0x663300,
                                                ambient: 0x663300,
                                                shininess: 2,
                                                map: logTexture});
  var logMesh = new THREE.Mesh(logGeom, logMaterial);
  logMesh.rotation.z = Math.PI/2;
  return logMesh;
}

//Function to make all the logs placed correctly
//on top of each other in a circle like a teepee but flat
//Input: number of logs to be created
//Output: all the logs in a container
function makeLogsForFire(numLogs){
  //Container for the logs
  var allLogs = new THREE.Object3D();
  var count;

  for (count=0; count<numLogs; count++){
    //half of the logs on one side made
    var singleLog = buildLog();
    singleLog.rotation.y = Math.PI/count;
    allLogs.add(singleLog);
    
    //other half
    var oppositeLog = buildLog();
    oppositeLog.rotation.y = -Math.PI/count;
    allLogs.add(oppositeLog);
  }
  return allLogs;
}

//FLAMES
//Control points for individual flame
var points = [[10, 0, 0],
              [15, 0, 10],
              [18, 0, 20],
              [8, 0, 35],
              [0, 0, 50] ];

//Function provided by Scott to get
//the points and push them onto an array
//for lathe geometry
function getPoints() {
  var i;
  var pts = [];
  for( i=0; i<points.length; i++) {
    var p = new THREE.Vector3();
    p.x = points[i][0];
    p.y = points[i][1];
    p.z = points[i][2];
    pts.push( p );
  }
  return pts;
}

//Function to make a single flame using
//lathe geometry
//Input: color, Output: flame mesh
function makeFlames(flameColor) {
  var flameGeom = new THREE.LatheGeometry(getPoints());
  var flameMaterial = new THREE.MeshPhongMaterial({color: flameColor, specular:flameColor,
                                                      transparent: false});
  flameMesh = new THREE.Mesh(flameGeom, flameMaterial);
  return flameMesh;
}

//Function to make a ring of flames
//Inputs: number of flames, amt to scale X by, amt to scale Y by, amt to scale Z
//by for flame, distance from the origin, flame color
//Output: a container of flames
function fireRing(numFlames, scaleX, scaleY, scaleZ, distFromCenter, flameColor){
  var allFlames = new THREE.Object3D();
  var counter;

  //Increment the angle by 45 degrees in a unit circle to
  //have logs all the way around the circle
  var angleIncrement = Math.PI/4;
  var position = 0;

  //for loop to scale the flames to appropriate size and 
  //position them correctly in a circle
  for (counter=0; counter<numFlames; counter++){
    var singleFlame = makeFlames(flameColor);
    singleFlame.scale.set(scaleX,scaleY,scaleZ);

    singleFlame.position.set(Math.cos(position)*distFromCenter, 
     Math.sin(position)*distFromCenter, 15);
    allFlames.add(singleFlame);
    position = position + angleIncrement;
  }
  //rotate all the flames by -45 degrees to have the tips
  //pointing upward
  allFlames.rotation.x = -Math.PI/2;
  return allFlames;
}