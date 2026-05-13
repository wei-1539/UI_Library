import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../composables/**/*.mdx",
    "../composables/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: "@storybook-vue/nuxt",
  viteFinal(config) {
    if (process.env.NODE_ENV === 'production') {
      config.base = '/UI_Library/';
    }
    return config;
  }
};
export default config;