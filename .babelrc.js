const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-flow',
];

const plugins = [
  'transform-function-bind',
  'transform-class-properties',
  '@babel/plugin-transform-runtime',
];

if (process.env.ENV === 'sources') {
  plugins.push([
    'module-resolver', {
      'root': ['./src'],
    }
  ]);
  plugins.push([
    'css-modules-transform', {
      'generateScopedName': '[hash:base64:7]',
      'extensions': ['.css'],
    }
  ]);
}

module.exports = { presets, plugins };
