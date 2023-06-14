import * as THREE from 'three'

export default scene => {    

	const light = new THREE.AmbientLight()
	scene.add(light) 

	function update(time) {
	}
	return {
		update
	}
}
