import esbuild from "esbuild";
import babel from "esbuild-plugin-babel";

build({
  entryPoints: [`builds/cdn.js`],
  outfile: `dist/alpinejs-twmerge.cdn.js`,
  plugins: [babel()],
  platform: "browser",
  define: { CDN: "true" },
});

build({
  entryPoints: [`builds/module.js`],
  outfile: `dist/alpinejs-twmerge.esm.js`,
  platform: "neutral",
  mainFields: ["main", "module"],
});

build({
  entryPoints: [`builds/module.js`],
  outfile: `dist/alpinejs-twmerge.cjs.js`,
  target: ["node10.4"],
  platform: "node",
});

function build(options) {
  options.define || (options.define = {});

  return esbuild.build({ ...options, minify: true, bundle: true }).catch(() => process.exit(1));
}
