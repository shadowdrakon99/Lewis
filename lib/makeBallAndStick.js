import * as THREE from "three";
import ExpoTHREE from "expo-three";

export default ({color}, rx, ry, rz) => {
      const material = new THREE.MeshPhongMaterial({ color });
      let ballAndStickGeometry = new THREE.Geometry();
      const ballGeometry = new THREE.SphereGeometry( 3, 32, 32 );
      const stickGeometry = new THREE.CylinderGeometry(1, 1, 5, 24, 20);
      let ballMesh = new THREE.Mesh(ballGeometry, material);
      let stickMesh = new THREE.Mesh(stickGeometry, material);
      ballMesh.position.set(0,8,0);
      stickMesh.position.set(0,4,0);

      ballAndStickGeometry.mergeMesh(ballMesh)
      ballAndStickGeometry.mergeMesh(stickMesh)

      let ballAndStickMesh = new THREE.Mesh(ballAndStickGeometry, material)

      if(rx) ballAndStickMesh.rotateX(rx)
      if(ry) ballAndStickMesh.rotateY(ry)
      if(rz) ballAndStickMesh.rotateZ(rz)

      return ballAndStickMesh
    }
