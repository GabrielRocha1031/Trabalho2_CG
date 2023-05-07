// Configura a cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cria a esfera
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Cria a luz
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0);
sphere.add(light);

// Adiciona a sombra
sphere.castShadow = true;
sphere.receiveShadow = true;
light.castShadow = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Renderiza a cena
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  light.position.x = 5 * Math.sin(Date.now() * 0.001);
  light.position.y = 5 * Math.cos(Date.now() * 0.001);

  renderer.render(scene, camera);
}
animate();
