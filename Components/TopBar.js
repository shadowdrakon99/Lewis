import React, { Component } from "react";




<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 0 ;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #696;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: '14px' '16px';
  text-decoration: none;
  font-size: '17px';
}

.topbar a:hover {
  background-color: #ddd;
  color: black;
}

.active {
  background-color: '#4CAF50';
  color: white;
}

.topbar .icon {
  display: none;
}

@media screen and (max-width: '600px') {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: '600px') {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>



<div class="topbar" id="myTopbar">
  <a href="#carbon" >C</a>
  <a href="#hydrogen">H</a>
  <a href="#oxygen">O</a>

  <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a>
</div>



<script>
function myFunction() {
    var x = document.getElementById("myTopbar");
    if (x.className === "topbar") {
        x.className += " responsive";
    } else {
        x.className = "topbar";
    }
}
