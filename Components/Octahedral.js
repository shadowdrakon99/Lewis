import Expo from "expo";
import React, { Component } from "react";
import {Text, View } from 'react-native';
import * as THREE from "three";
import ExpoTHREE from "expo-three";

export default class extends Component {

  _onGLContextCreate = async gl => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1,1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);


    makeBallAndStick = ({color}, rx, ry, rz) => {
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

    var geometrySphere = new THREE.SphereGeometry( 3, 32, 32 );
    var materialSphere = new THREE.MeshPhongMaterial( {color: '#40e0d0'} );
    var sphere = new THREE.Mesh( geometrySphere, materialSphere);

    let group = new THREE.Group();
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );

    group.add(makeBallAndStick({color: "#4286f4"},0,0,1.5708))
    group.add(makeBallAndStick({color: "#4286f4"},0, 0,-1.5708))
    group.add(makeBallAndStick({color: "#4286f4"},0, 0, 3.14))
    group.add(makeBallAndStick({color: "#4286f4"},0, 1.5708, 1.5708))
    group.add(makeBallAndStick({color: "#4286f4"},0, -1.5708, 1.5708))
    group.add(makeBallAndStick({color: "#4286f4"}))
    group.add(sphere);

    scene.add( directionalLight );
    scene.add( group );


    camera.position.z = 15;

    const render = () => {
      requestAnimationFrame(render);
      let {x,y} = this.props.pan.__getValue();
      group.rotation.y += x/1000;
      group.rotation.x += y/1000;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  render = () => (<Expo.GLView style={{ flex: 1 }} onContextCreate={this._onGLContextCreate}/>)
}
