const { run } = require("node-run-cmd");
const path = require("path");
class MoveIndexHtml {
  apply(compiler) {
    compiler.hooks.done.tap("MoveIndexHtml", () => {
      run(
        `mv ${path.resolve(__dirname, "./")} ${path.resolve(
          __dirname,
          "dist/index.html"
        )}`
      );
    });
  }
}

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    resolve: {
      extensions: [".md"],
    },
    plugins: [new MoveIndexHtml()],
  },
  publicPath: "/", //使用相对路径
  outputDir: "dist",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();

    config.plugin("preload").tap((args) => {
      args[0].fileBlacklist.push(/\.css/, /\.js/);
      return args;
    });
    config
      .plugin("inline-source")
      .use(require("html-webpack-inline-source-plugin"));
    config.plugin("html").tap((args) => {
      args[0].chunksSortMode = "none";
      args[0].inlineSource = "(.css|.js$)";
      return args;
    });
  },
  css: {
    extract: false,
  },
};
