import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGL1Renderer()

    camera.position.z = 30;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.TorusGeometry(10,3,16,100);
    const material = new THREE.MeshStandardMaterial( { color: 0x187a3e } );
    const torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(5,5,5)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight, ambientLight)

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50)

    scene.add(lightHelper, gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
      const star = new THREE.Mesh(geometry, material);

      const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
      star.position.set(x,y, z);
      scene.add(star)
    }

    Array(200).fill().forEach(addStar)

    const animate = function () {
      requestAnimationFrame( animate );
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
      controls.update();

      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div />
    )
  }
}

export default App;
