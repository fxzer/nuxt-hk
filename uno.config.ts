import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-col', 'flex flex-col'],
    ['f-s-c', 'flex justify-start items-center'],
    ['f-c-c', 'flex justify-center items-center'],
    ['f-b-c', 'flex justify-between items-center'],
    ['f-c-s', 'flex justify-center items-stretch'],
    ['f-b-s', 'flex justify-between items-stretch'],
    ['f-r-c', 'flex justify-around items-center'],
    // 宽高相同
    [/^wh-(.+)$/, ([, c]) => `w-${c}  h-${c}`],
  ],
  rules: [
    [/^sd-(\d+)-(\d+)$/, ([, d, a]) => ({
      'box-shadow': `0 0 ${d}px rgba(0, 0, 0, 0.${a})`,
    })],
  ],
  theme: {
    colors: {
      nx: '#00DC82',
    },
  },
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerDirectives(), // @apply, @screen, @variants
    transformerVariantGroup(), // 样式分组
  ],
})
