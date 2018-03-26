import Expo from "expo";
import React, { Component } from "react";
import {Text, View } from 'react-native';
import * as THREE from "three";
import ExpoTHREE from "expo-three";

import makeBallAndStick from '../lib/makeBallAndStick';

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

    const { bonded:[up, left, right] } = this.props

    if(up) group.add(makeBallAndStick({color: up.color}))
    if(left) group.add(makeBallAndStick({color: left.color},0, 0, 2.09599366))
    if(right) group.add(makeBallAndStick({color: right.color},0, 0 , -2.09599366))
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
