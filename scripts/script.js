const Scene = require('Scene');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');
const Diagnostics = require('Diagnostics');


var mug_ctrl = Scene.root.find('mug_controller');
var planeTracker = Scene.root.find('planeTracker0');


TouchGestures.onTap().subscribe(function(gesture) {
	//Diagnostics.log(mug_ctrl.transform.scaleX);
	planeTracker.trackPoint(gesture.location);

	var lastScaleY = mug_ctrl.transform.scaleY.lastValue;
	mug_ctrl.transform.scaleY = Reactive.mul(lastScaleY, 0.9);
});

TouchGestures.onPan(planeTracker).subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location, gesture.state);
});

TouchGestures.onPinch().subscribe(function(gesture) {
	var lastScaleX = mug_ctrl.transform.scaleX.lastValue;
	mug_ctrl.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

	var lastScaleY = mug_ctrl.transform.scaleY.lastValue;
	mug_ctrl.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

	var lastScaleZ = mug_ctrl.transform.scaleZ.lastValue;
	mug_ctrl.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
});

TouchGestures.onRotate(mug_ctrl).subscribe(function(gesture) {
  var lastRotationY = mug_ctrl.transform.rotationY.lastValue;
  mug_ctrl.transform.rotationY = Reactive.add(lastRotationY, Reactive.mul(-1, gesture.rotation));
});

TouchGestures.onLongPress().subscribe(function(gesture) {
	planeTracker.trackPoint(gesture.location);
});
