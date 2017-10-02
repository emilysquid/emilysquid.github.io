/**
 * Created by Emily Saliba :)
 */
var container;

var camera, controls, scene, renderer, material, mesh;
var octaCount = 1000;
var shapes = [];
var xDir = [];
var yDir = [];
var zDir = [];
var randomInt = 0;
var time = 0;

var geometry = new THREE.OctahedronGeometry(30, 1);


init();
render();


function animate() {

    time += 1;
    requestAnimationFrame(animate);
    controls.update();

    //var lsrInput = 5;

    var influence = (5 - 100)* .00005;


    //scene.fog.color.setHex(influence * 0xFFFFFF);
    //mesh.material.color.setHex(influence * 0xffffff);
    //mesh.material.opacity = (1 - alphaInput);


    light.color.setHex( 0xc1c1c1);

    //initial directions
    if (time == 1)
    {
        for (var i = 0; i < octaCount; i++)
        {

            randomInt = ( Math.random() - 0.5 );
            xDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            yDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            zDir[i] = randomInt;

        }
    }
    //set group 1's directions ever 80 frames
    else if (time % 80 == 0)
    {
        for (var i = 0; i < 300; i++)
        {
            randomInt = ( Math.random() - 0.5 );
            xDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            yDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            zDir[i] = randomInt;
        }
    }
    //set group 2's directions every 120 frames
    else if (time % 120 == 0)
    {
        for (var i = 300; i < 650; i++)
        {
            randomInt = ( Math.random() - 0.5 );
            xDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            yDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            zDir[i] = randomInt;
        }
    }
    //set group 3's directions every 180 frames
    else if (time % 180 == 0)
    {
        for (var i = 650; i < 1000; i++)
        {
            randomInt = ( Math.random() - 0.5 );
            xDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            yDir[i] = randomInt;
            randomInt = ( Math.random() - 0.5 );
            zDir[i] = randomInt;
        }
    }
    else
    {
        for ( var i = 0; i < octaCount; i ++ ) {
            shapes[i].position.x += xDir[i];
            shapes[i].position.y += yDir[i];
            shapes[i].position.z += zDir[i];
        }
    }


//make sure things to don't disappear out of bounds
   for ( var i = 0; i < octaCount; i ++ ) {
        //fade out
       if (shapes[i].position.x > 450 || shapes[i].position.x < -450 ||
           shapes[i].position.y > 450 || shapes[i].position.y < -450 ||
           shapes[i].position.z > 450 || shapes[i].position.z < -450)
       {

           shapes[i].material.opacity -= .05;

       }
        //disappear and reappear inside of the viewport
       if (shapes[i].position.x > 600 || shapes[i].position.x < -600 ||
           shapes[i].position.y > 600 || shapes[i].position.y < -600 ||
           shapes[i].position.z > 600 || shapes[i].position.z < -600)
       {

           shapes[i].material.opacity = 0;
           shapes[i].position.x = ( Math.random() - 0.5 ) * 1000;
           shapes[i].position.y = ( Math.random() - 0.5 ) * 1000;
           shapes[i].position.z = ( Math.random() - 0.5 ) * 1000;


       }
       //fade in
       shapes[i].material.opacity += .01;

       shapes[i].updateMatrix();

   }
    render();
}

function init() {
//set the scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcce4ff, 0.002 );
//0x000033
//set up the camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.z = 700;


//set up objects




    // now create the individual particles
    for ( var i = 0; i < octaCount; i ++ ) {
        material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.FlatShading });
        material.transparent = true;
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = ( Math.random() - 0.5 ) * 1000;
        mesh.position.y = ( Math.random() - 0.5 ) * 1000;
        mesh.position.z = ( Math.random() - 0.5 ) * 1000;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        mesh.velocity = new THREE.Vector3(0, 0, 0);

        mesh.updateMatrix();
        mesh.matrixAutoUpdate = true;
        shapes[i] = mesh;
        scene.add(mesh);
    }

//lighting goes here later
    dlight = new THREE.DirectionalLight( 0xffffff );
    dlight.position.set( 1, 1, 1 );
    scene.add( dlight );

    ddlight = new THREE.DirectionalLight( 0x002288 );
    ddlight.position.set( -1, -1, -1 );
    scene.add( ddlight );

    light = new THREE.AmbientLight( 0x222222 );
    scene.add( light );

//rendering
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

//set up controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    controls.addEventListener('change', render);



    animate();
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function render() {

    //mirrorCube.visible = false;
    //mirrorCubeCamera.updateCubeMap( renderer, scene );
    //mirrorCube.visible = false;

    renderer.render( scene, camera );

}