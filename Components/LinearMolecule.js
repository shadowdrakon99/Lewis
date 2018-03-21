import Expo from "expo";
import React, { Component } from "react";
import {Text, View} from 'react-native';
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

    const geometry = new THREE.CylinderGeometry(1, 1, 5, 24, 20);
    const material = new THREE.MeshPhongMaterial({ color: '#40e0d0'});
    const cylinder = new THREE.Mesh(geometry, material);
    const cylinder2 = new THREE.Mesh(geometry, material);


    var geometrySphere = new THREE.SphereGeometry( 3, 32, 32 );
    var materialSphere = new THREE.MeshPhongMaterial( {color: this.props.color} );
    var sphere = new THREE.Mesh( geometrySphere, materialSphere);
    var sphere2 = new THREE.Mesh( geometrySphere, materialSphere);
    var sphere3 = new THREE.Mesh( geometrySphere, materialSphere);

    var group = new THREE.Group();

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );


    cylinder.position.set(0,-4,0);
    cylinder2.position.set(0,4,0);

    sphere2.position.set(0,-8,0);
    sphere3.position.set(0,8,0);

    group.add( cylinder);
    group.add( cylinder2);
    group.add( sphere);
    group.add( sphere2);
    group.add( sphere3);
    group.rotateZ(1.5707);
    scene.add( directionalLight );
    scene.add( group );


    camera.position.z = 15;

    const render = () => {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  render() {


    return(
       <Expo.GLView
           style={{ flex: 1 }}
           onContextCreate={this._onGLContextCreate}
        />
    )

  }
}