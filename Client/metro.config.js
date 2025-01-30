const { getDefaultConfig } = require("./$node_modules/expo/metro-config.js");
const { withNativeWind } = require("./$node_modules/nativewind/dist/metro/index.js");
const { wrapWithReanimatedMetroConfig } = require('./$node_modules/react-native-reanimated/metro-config/index.js');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = config.resolver;
  
  const svgConfig = {
    ...config,
    transformer: {
      ...config.transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      ...config.resolver,
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };

  const nativeWindConfig = withNativeWind(svgConfig, { input: "./app/global.css" });
  return wrapWithReanimatedMetroConfig(nativeWindConfig);
})();