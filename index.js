const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');

// Get shader sources from HTML script tags
const vertexShaderSource = document.getElementById('vertexShader').textContent.trim();
const fragmentShaderSource = document.getElementById('fragmentShader').textContent.trim();

// Create shaders, compile and attach to a program
const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`An error occurred while compiling the shader: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Set canvas resolution based on device pixel ratio
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
gl.viewport(0, 0, canvas.width, canvas.height);

// Define vertices and bind them to a buffer
const positions = [
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0,
  -1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
];
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// Get attribute and uniform locations
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

const inkColor = gl.getUniformLocation(program, 'u_inkColor');
const cubeColor = gl.getUniformLocation(program, 'u_cubeColor');

gl.uniform3f(inkColor, 0.9, 0.0, 0.0); // blue
gl.uniform3f(cubeColor, 0.8, 0.8, 1.0); // white

const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
const u_y = gl.getUniformLocation(program, 'u_y');
const u_x = gl.getUniformLocation(program, 'u_x');
const u_ygota2 = gl.getUniformLocation(program, 'u_ygota2');
const u_zCam = gl.getUniformLocation(program, 'u_zCam');

// valores iniciais
let y = 3.0;
let ygota2 = -1.7;
let x = 1.0;
let zCam = 5.5;
let ydir = 'up';

const updateUniforms = () => {
  y -= 0.04
  x += 0.04
    
    if(ydir=='up'){
        ygota2 += 0.02
    }else{
        ygota2 -= 0.02
    }
    
    if(ygota2 >= -1.7){
        ydir = 'down'
    }
    if(ygota2 <= -3.2){
        ydir = 'up'
    }

    if( x>= 6.0){
        x = 0.0
    }
    
    if( y <= -3.0) {
        y = 3.0
    }

    gl.uniform1f(u_y, y);
    gl.uniform1f(u_x, x);
    gl.uniform1f(u_ygota2, ygota2);
    gl.uniform1f(u_zCam, zCam);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(updateUniforms);
}

requestAnimationFrame(updateUniforms);

