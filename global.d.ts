// Ambient module shims for asset types the Metro/web bundler resolves at
// build time but plain `tsc --noEmit` doesn't know about out of the box.

declare module '*.css';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// react-native-svg-transformer resolves `.svg` imports to a React component
// (see metro.config.js) rather than an asset URI.
declare module '*.svg' {
  import type { FC } from 'react';
  import type { SvgProps } from 'react-native-svg';

  const content: FC<SvgProps>;
  export default content;
}
