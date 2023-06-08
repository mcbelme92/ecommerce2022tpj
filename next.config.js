const {
  ESBuildPlugin,
  // ESBuildMinifyPlugin
} = require("esbuild-loader");
const withPlugins = require("next-compose-plugins");
//const withOptimizedImages = require("next-optimized-images");

//const tsconfig = require("./tsconfig.json");
module.exports = {
  //Se configura para poder usar el componente Image de Next, ya que asi puede comprimir correctamente las imagenes que lleguen
  //En este caso como todas las imagenes vienen de este dominio asi se configuro
  images: {
    domains: ["game-ecommerce2022.s3.amazonaws.com"],
  },
};
