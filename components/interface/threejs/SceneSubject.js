import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';

export default temp  => {    
	var scene = temp[0];
	var interactionManager = temp[1];
	var forms = [];
	var apiList;
	var loadFlag = [false, false];

	fetch( 'http://192.168.1.180:3000//site_images.json').then(res => res.json())
		.then(data => { apiList = (data); }).catch((e) => {console.log(e)});

	function update(time) {
		interactionManager.update();
		if(!loadFlag[0]){
			if (apiList != null) {
				loadFlag[0] = true;
				loadThenRun(apiList);
			}
		}
		if(loadFlag[1]){
			for (let i = 0, j = forms.length; i < j; i++) {
				if(forms[i].rotation.y > 0) forms[i].rotation.y -= 0.02;
			}	
		}
	}

	var manager = new THREE.LoadingManager();
	var loaderJPG = new THREE.TextureLoader(manager);
	var objectsHover = [];
	function loadThenRun(files) {
		let gridx = -40;
		let gridy = 16;
		let gridxI = 10.85; //x axis iterative distance
		const clock = new THREE.Clock();
		for (let i = 0, j = files.length; i < j; i++) {
			var obj = JSON.parse(JSON.stringify(apiList[i]));
			let path = ('siteBanner/' + JSON.stringify(obj.path)).replace("\"", "").replace("\"", "");
			let pathClick = (JSON.stringify(obj.title)).replace("\"", "").replace("\"", "");

			let img = new Image();
			img.src = path;	
			img.onload = function(){
				let material = new THREE.MeshLambertMaterial({map:loaderJPG.load(path), transparent: true});
				var plane = new THREE.PlaneGeometry( 10, 10, 1);

				forms[i] = new THREE.Mesh(plane,material);
				forms[i].position.x += gridx + ((i+1) * gridxI); //grid placement
				forms[i].position.y += gridy;                    //
				forms[i].name = JSON.stringify(obj.title);
				forms[i].userData = { URL: pathClick};

				//initial animation
				forms[i].rotation.y = 1;

				forms[i].addEventListener('mouseover', (event) => {
					if (forms[i].material) {
						forms[i].userData.materialEmissiveHex = forms[i].material.emissive.getHex();
						forms[i].material.emissive.setHex(0xff0000);
						forms[i].material.emissiveIntensity = 0.1;

						forms[i].rotation.x += .2;
					}
				});

				forms[i].addEventListener('mouseout', (event) => {
					if (forms[i].material) {
						forms[i].material.emissive.setHex( forms[i].userData.materialEmissiveHex );

						forms[i].rotation.x -= .2;
					}
				});

				interactionManager.add(forms[i]);
				forms[i].addEventListener('click', (event) => {window.open('http://www.' + pathClick)});
				scene.add(forms[i]);
				if(i == j-1) loadFlag[1] = true;
			}
		}
		// init controls/animation hear to avoid null array access
		manager.onLoad = function() {
			//formSet();
			//startKeyControls();
			//startScreenClick();
			loadFlag[1] = true;
		};
	}

    return {
        update
    }
}

/*root@crystal.hair
꒱࿐♡ ˚.*ೃ*/
