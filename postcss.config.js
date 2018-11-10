module.exports = {
  plugins: {
    'postcss-pseudoelements': {},
    'postcss-import': {
      path: 'src/styles',
    },
    'postcss-mixins': {},
    'postcss-preset-env': {
      features: {
        'custom-properties': {
          preserve: false,
        },
      },
    },
    'postcss-nested': {},
    'postcss-hexrgba': {},
    'postcss-calc': {},
    'postcss-custom-media': {},
    'cssnano': {},
  },
};
