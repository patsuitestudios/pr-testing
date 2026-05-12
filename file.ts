type Matrix = number[][];

function createIdentityMatrix(size: number): Matrix {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
  );
}

function multiplyMatrices(a: Matrix, b: Matrix): Matrix {
  const rows = a.length;
  const cols = b[0].length;
  const shared = b.length;
  const result: Matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < shared; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function transposeMatrix(m: Matrix): Matrix {
  return m[0].map((_, col) => m.map((row) => row[col]));
}

function determinant(m: Matrix): number {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let det = 0;
  for (let col = 0; col < n; col++) {
    const sub: Matrix = m.slice(1).map((row) =>
      row.filter((_, j) => j !== col)
    );
    det += (col % 2 === 0 ? 1 : -1) * m[0][col] * determinant(sub);
  }
  return det;
}

function scaleMatrix(m: Matrix, scalar: number): Matrix {
  return m.map((row) => row.map((val) => val * scalar));
}

function addMatrices(a: Matrix, b: Matrix): Matrix {
  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}

function formatMatrix(m: Matrix): string {
  const strs = m.map((row) => row.map((v) => v.toFixed(2).padStart(8)));
  return strs.map((row) => `│${row.join("")} │`).join("\n");
}

function randomMatrix(rows: number, cols: number, max: number = 10): Matrix {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * max) - Math.floor(max / 2))
  );
}

function trace(m: Matrix): number {
  return m.reduce((sum, row, i) => sum + row[i], 0);
}

function isSymmetric(m: Matrix): boolean {
  return m.every((row, i) => row.every((val, j) => val === m[j][i]));
}

function main() {
  const a = randomMatrix(3, 3);
  const b = randomMatrix(3, 3);

  console.log("This is Matrix A:");
  console.log(formatMatrix(a));
  console.log(`\n  det(A) = ${determinant(a)}`);
  console.log(`  tr(A)  = ${trace(a)}`);
  console.log(`  symmetric? ${isSymmetric(a)}\n`);

  console.log("This is Matrix B:");
  console.log(formatMatrix(b));

  console.log("\nA × B:");
  console.log(formatMatrix(multiplyMatrices(a, b)));

  console.log("\nA + B:");
  console.log(formatMatrix(addMatrices(a, b)));

  console.log("\nTranspose(A):");
  console.log(formatMatrix(transposeMatrix(a)));

  console.log("\n3 × A:");
  console.log(formatMatrix(scaleMatrix(a, 3)));

  console.log("\nIdentity(3):");
  console.log(formatMatrix(createIdentityMatrix(3)));
}

main();
