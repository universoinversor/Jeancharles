// Lanzador para ver la página en local: revisa Node, instala, busca un puerto
// libre, arranca Next y abre el navegador. Lo usan ver-local.command / ver-local.bat.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import net from "node:net";
import { platform } from "node:os";

const [maj, min] = process.versions.node.split(".").map(Number);
if (maj < 20 || (maj === 20 && min < 9)) {
  console.error(`\n✖ Tu Node.js es ${process.versions.node} y hace falta 20.9 o más nuevo.`);
  console.error("  Instala la versión LTS desde https://nodejs.org y vuelve a abrir este archivo.\n");
  process.exit(1);
}

const win = platform() === "win32";
const npm = win ? "npm.cmd" : "npm";

if (!existsSync("node_modules/next")) {
  console.log("→ Instalando dependencias (solo la primera vez, 1–3 minutos)…");
  const r = spawnSync(npm, ["install", "--no-audit", "--no-fund"], { stdio: "inherit", shell: win });
  if (r.status !== 0) {
    console.error("\n✖ Falló la instalación. Revisa tu conexión a internet y vuelve a intentarlo.\n");
    process.exit(1);
  }
}

const openBrowser = (url) => {
  const [cmd, args] = win ? ["cmd", ["/c", "start", "", url]] : platform() === "darwin" ? ["open", [url]] : ["xdg-open", [url]];
  try {
    const opener = spawn(cmd, args, { stdio: "ignore", detached: true });
    opener.on("error", () => {}); // sin navegador por defecto: no pasa nada, la página sigue arriba
    opener.unref();
  } catch { /* idem */ }
};

// ¿Ya está corriendo (doble clic dos veces)? Entonces solo abrimos el navegador.
for (let p = 3000; p < 3010; p++) {
  try {
    const res = await fetch(`http://localhost:${p}/`, { signal: AbortSignal.timeout(1500) });
    if (res.ok && (await res.text()).includes("Jean Charles")) {
      console.log(`✔ La página ya está abierta en http://localhost:${p} — abriendo el navegador.`);
      openBrowser(`http://localhost:${p}`);
      process.exit(0);
    }
  } catch { /* puerto libre o de otra app */ }
}

const free = (port) => new Promise((ok) => {
  const s = net.createServer().once("error", () => ok(false)).once("listening", () => s.close(() => ok(true)));
  s.listen(port, "127.0.0.1");
});
let port = 3000;
while (!(await free(port)) && port < 3020) port++;
const url = `http://localhost:${port}`;

console.log(`→ Arrancando la página en ${url} …`);
const child = spawn(npm, ["run", "dev", "--", "-p", String(port)], { stdio: "inherit", shell: win });
child.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => { child.kill(sig); process.exit(0); });

// Esperamos a que la página responda de verdad (incluye la primera compilación) y abrimos el navegador.
const t0 = Date.now();
while (Date.now() - t0 < 180_000) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
    if (res.ok) break;
  } catch { /* aún arrancando */ }
  await new Promise((r) => setTimeout(r, 1500));
}
console.log(`\n✔ Lista en ${url}\n  Si el navegador no se abre solo, copia esa dirección en Chrome o Safari.\n  Para apagarla, cierra esta ventana.\n`);
openBrowser(url);
