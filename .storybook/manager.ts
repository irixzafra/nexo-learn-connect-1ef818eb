
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Customize Storybook's UI theme
addons.setConfig({
  theme: themes.dark,
});
