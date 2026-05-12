interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  charge: number;
  label: string;
}

function createParticle(label: string): Particle {
  return {
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 - 2,
    mass: Math.random() * 5 + 0.5,
    charge: Math.random() > 0.5 ? 1 : -1,
    label,
  };
}

function distance(a: Particle, b: Particle): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function computeForce(a: Particle, b: Particle): [number, number] {
  const dist = Math.max(distance(a, b), 0.1);
  const magnitude = (a.charge * b.charge) / (dist * dist);
  const dx = (b.x - a.x) / dist;
  const dy = (b.y - a.y) / dist;
  return [-magnitude * dx, -magnitude * dy];
}

function stepSimulation(particles: Particle[], dt: number): void {
  const forces = particles.map(() => ({ fx: 0, fy: 0 }));

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const [fx, fy] = computeForce(particles[i], particles[j]);
      forces[i].fx += fx;
      forces[i].fy += fy;
      forces[j].fx -= fx;
      forces[j].fy -= fy;
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.vx += (forces[i].fx / p.mass) * dt;
    p.vy += (forces[i].fy / p.mass) * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
}

function kineticEnergy(p: Particle): number {
  return 0.5 * p.mass * (p.vx ** 2 + p.vy ** 2);
}

function totalEnergy(particles: Particle[]): number {
  return particles.reduce((sum, p) => sum + kineticEnergy(p), 0);
}

function formatParticle(p: Particle): string {
  const pos = `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`;
  const vel = `(${p.vx.toFixed(2)}, ${p.vy.toFixed(2)})`;
  const chr = p.charge > 0 ? "+" : "-";
  return `  ${p.label.padEnd(6)} ${chr}  pos=${pos.padEnd(20)} vel=${vel.padEnd(20)} m=${p.mass.toFixed(2)}`;
}

function main() {
  const names = ["alpha", "beta", "gamma", "delta", "zeta", "eta", "theta", "iota"];
  const particles = names.map((n) => createParticle(n));
  const steps = 20;
  const dt = 0.1;

  console.log("=== Particle Simulation ===\n");
  console.log(`Particles: ${particles.length}  |  dt: ${dt}  |  steps: ${steps}\n`);

  for (let step = 0; step <= steps; step++) {
    if (step % 5 === 0) {
      console.log(`--- Step ${String(step).padStart(3)} --- KE: ${totalEnergy(particles).toFixed(4)}`);
      particles.forEach((p) => console.log(formatParticle(p)));
      console.log();
    }
    stepSimulation(particles, dt);
  }

  console.log("Simulation complete.");
}

main();
