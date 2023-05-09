const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');

const vertexShaderSource = document.getElementById('vertexShader').text;
const fragmentShaderSource = document.getElementById('fragmentShader').text;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
gl.viewport(0, 0, canvas.width, canvas.height);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);


//daqui p baixo


const sphereColor = gl.getUniformLocation(program, 'u_sphereColor');
const cubeColor = gl.getUniformLocation(program, 'u_cubeColor');
const obstacleColor = gl.getUniformLocation(program, 'u_obstacleColor');

gl.uniform3f(sphereColor, 0.1, 0.1, 0.7); // azul
gl.uniform3f(cubeColor, 1.0, 1.0, 1.0); // azul
gl.uniform3f(obstacleColor, 0.3, 0.3, 1.0); // verde

function fract(x) {
    return x - Math.floor(x);
}
const xObstacle = gl.getUniformLocation(program, 'u_xObstacle')



const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

const u_y = gl.getUniformLocation(program, 'u_y');
gl.uniform1f(u_y, 0.0);

const u_x = gl.getUniformLocation(program, 'u_x');
gl.uniform1f(u_x, 0.0);

const u_ygota2 = gl.getUniformLocation(program, 'u_ygota2');
gl.uniform1f(u_ygota2, 0.0);

const u_zCam = gl.getUniformLocation(program, 'u_zCam');

var time = 0
var y = 3.0
var ygota2 = -1.0
var x= 1.0
var zCam = 5.2
var ydir = 'up'



function render() {
    time += 0.001;

    y -= 0.02
    x += 0.0185
    
    if(ydir=='up'){
        ygota2 += 0.01
    }else{
        ygota2 -= 0.01
    }
    

    if(ygota2 >= -1.5){
        ydir = 'down'
    }
    if(ygota2 <= -3.0){
        ydir = 'up'
    }

    if( x>= 5.5){
        x = 0.0
    }
    
    if( y <= -3.0) {
        y = 3.0
    }

    gl.uniform1f(u_y, y);
    gl.uniform1f(u_x, x);
    gl.uniform1f(u_ygota2, ygota2);
    gl.uniform1f(u_zCam, zCam);
    gl.uniform1f(timeUniformLocation, time);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);