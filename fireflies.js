//Alice Wong
//Three.js file to make particle system of fireflies

//Function to create lots of particles to be fireflies
//Input: none, output: particle system
function createFireflies(){

  //total fireflies
  var firefliesCount = 500;
  
  //container for all the particles/fireflies
  var allFireflies = new THREE.Geometry();

  //fireflies material
  var firefliesMaterial = new THREE.ParticleBasicMaterial({
    color:0xFFFFFF,
    transparent: true,
    size: 10,
    map: new THREE.ImageUtils.loadTexture("glowing.jpg"),
    blending: THREE.AdditiveBlending});

  //Create the individual fireflies and add it to geometry
  var i;
  for (i=0; i < firefliesCount; i++){

    var firefliesX = Math.random()*3000-100;
    var firefliesY = Math.random()*500;
    var firefliesZ = Math.random()*3500-2000;
    var firefliesPosition = new THREE.Vector3(firefliesX, firefliesY, firefliesZ);
    firefliesPosition.velocityY = (Math.random()*0.3);
    firefliesPosition.velocityZ = (Math.random()*0.5);
    firefliesPosition.velocityX = Math.random()*0.5;

    allFireflies.vertices.push(firefliesPosition);
  }

  
  var firefliesSystem = new THREE.ParticleSystem(allFireflies, firefliesMaterial);

  //Fireflies are depth sorted from far to near based on camera when this is true
  firefliesSystem.sortParticles = true;

  return firefliesSystem;
}