// criando a cena
const scene = new THREE.Scene();

// criando a câmera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// definindo a posição da câmera
camera.position.z = 10;

// criando o renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// criando a esfera
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereGeometry2 = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial);
scene.add(sphere);
scene.add(sphere2);





// criando a luz pontual
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(1, 1, 1);


// Cria uma SphereGeometry para representar a luz
const lightSphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const lightSphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff });
const lightSphereMesh = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);
lightSphereMesh.position.copy(pointLight.position);


scene.add(pointLight);
scene.add(lightSphereMesh);

// Variáveis para controlar a rotação da luz
let angle = 0;
const radius = 5;



// animando a cena
function animate() {
  requestAnimationFrame(animate);

  // girando a esfera
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  // Atualiza a posição da luz
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  pointLight.position.set(x, y, y);
  lightSphereMesh.position.copy(pointLight.position);

  // Rotaciona a luz
  angle += 0.01;

  renderer.render(scene, camera);
}
animate();




const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor da luz, intensidade
scene.add(ambientLight);