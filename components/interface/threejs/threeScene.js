import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { filt, tabi } from "../../../pages/jotaiAtom";
import { atom, useAtom } from 'jotai'
import { InteractionManager } from 'three.interactive';


var interactionManager;
export const ThreeScene = () => {

	const mountRef = useRef();
	const sceneRef = useRef();
	const cameraRef = useRef();
	const rendererRef = useRef();
	const width = 700
	const height = 300;
	
	const forms = [];
	const loadFlag = [false, false, false];

	console.log('starting');
	const [filter, setFilter] = useAtom(filt);

	useEffect(() => {
	// Setup scene and renderer
		console.log('starting');
		const scene = new THREE.Scene();
		sceneRef.current = scene;

		const fov = 40;
		const ratio = width / height;
		const near = 10;
		const far = 80;
		const camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
		camera.position.z = 63
		cameraRef.current = camera;
		
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

		renderer.setSize(width, height);
		renderer.render(scene, camera);
		rendererRef.current = renderer;

		const ambientLight = new THREE.AmbientLight();
		scene.add(ambientLight);

		mountRef.current.appendChild(renderer.domElement);
		interactionManager = new InteractionManager(
			renderer,
			camera,
			renderer.domElement
		);
		function update(time) {
			if(loadFlag[1]){
			interactionManager.update();
				for (let i = 0, j = forms.length; i < j; i++) {
					if(forms[i].rotation.y > 0) forms[i].rotation.y -= 0.02;
				}	
			}
		}
	
		// Render
		animate();
		function animate(){
			update();
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
	}
	} );



	useEffect(() => {
	const scene = sceneRef.current;
		let manager = new THREE.LoadingManager();
		let loaderJPG = new THREE.TextureLoader(manager);
		let objectsHover = [];

		fetch( 'http://192.168.1.180:3000//site_images.json').then(res => res.json())
		.then(data => {
			const apiList = (data);
			console.log('loading');
			let gridx = -55;
			let gridy = 16;
			let gridxI = 10.85; //x axis iterative distance
			for (let i = 0, j = apiList.length; i < j; i++) {
				let obj = JSON.parse(JSON.stringify(apiList[i]));
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
					console.log('\'' + pathClick + '\'');
					forms[i].addEventListener('click', (event) => {
						if(filter == pathClick) setFilter('');
						else setFilter(pathClick);
					});
					scene.add(forms[i]);
				}
			}
			// init controls/animation hear to avoid null array access
			manager.onLoad = function() {
				//formSet();
				//startKeyControls();
				//startScreenClick();
				//
				console.log(forms.length);
				loadFlag[1] = true;
			};
		}).catch((e) => {console.log(e)});
	});
	return <div id="threeJsTable" ref={mountRef}></div>;
};

