import Expo from "expo";
import React, { Component } from "react";
import {Text, View } from 'react-native';
import * as THREE from "three";
import ExpoTHREE from "expo-three";

import { makeBallAndStick, makeED } from '../lib/makeBallAndStick';

export default class extends Component {

  _onGLContextCreate = async gl => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1,1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    var geometrySphere = new THREE.SphereGeometry( 3, 32, 32 );
    var materialSphere = new THREE.MeshPhongMaterial( {color: this.props.center.color} );
    var sphere = new THREE.Mesh( geometrySphere, materialSphere);

    let group = new THREE.Group();
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );

    const { bonded, molecular } = this.props
    if(molecular) {
      if(bonded[0]) group.add(makeBallAndStick({color:  bonded[0].color},0,0,1.5708)) // LEFT
      if(bonded[1]) group.add(makeBallAndStick({color:  bonded[1].color},0, 0,-1.5708)) // RIGHT
      if(bonded[2]) group.add(makeBallAndStick({color:  bonded[2].color},0, 1.5708, 1.5708)) // FORWARD?
      if(bonded[3]) group.add(makeBallAndStick({color:  bonded[3].color},0, -1.5708, 1.5708)) // BACK?
      if(bonded[4]) group.add(makeBallAndStick({color:  bonded[4].color},0, 0, 3.14)) // DOWN
      if(bonded[5]) group.add(makeBallAndStick({color:  bonded[5].color})) // UP
    } else {
      group.add(makeED(0,0,1.5708))
      group.add(makeED(0, 0,-1.5708))
      group.add(makeED(0, 1.5708, 1.5708))
      group.add(makeED(0, -1.5708, 1.5708))
      group.add(makeED(0, 0, 3.14))
      group.add(makeED())
    }
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
