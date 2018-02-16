gulp.task("build", async () => {
  const data = await Service.compileFile(project.getFile("src/main.rs"), "rust", "wasm", "-g -O3");
  const outWasm = project.newFile("out/main.wasm", "wasm", true);
  outWasm.setData(data);
});

gulp.task("default", ["build"], async () => {});