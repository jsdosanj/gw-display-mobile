// Ambient module shims for asset types the Metro/web bundler resolves at
// build time but plain `tsc --noEmit` doesn't know about out of the box.

declare module '*.css';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
