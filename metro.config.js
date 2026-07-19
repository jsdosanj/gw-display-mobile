const { getDefaultConfig } = require('expo/metro-config');

// react-native-svg-transformer: lets `import Icon from './icon.svg'` resolve
// to a component (SvgProps) instead of an opaque asset URI — used for the
// two profile-silhouette SVGs ported from the web repo and for any future
// inline iconography. See global.d.ts for the matching `*.svg` type shim.
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
