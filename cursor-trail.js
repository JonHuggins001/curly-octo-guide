const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let points = [];

window.addEventListener('mousemove', e => {
  points.push({ x: e.clientX, y: e.clientY, age: 0 });
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = points.filter(p => p.age < 20);
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255,${1 - p.age / 20})`;
    ctx.fill();
    p.age++;
  });
  requestAnimationFrame(animate);
}

animate();