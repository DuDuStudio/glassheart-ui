import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.css',
  output: {
    file: 'dist/index.css',
    format: 'es'
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      plugins: [
        postcssImport,
        postcssNested,
        autoprefixer
      ]
    })
  ]
};
