# This issue has been resolved since `next@16.0.0-canary.17`

# How to reproduce Next.js mangle bug

1. Run `npm install`
2. Run `npm run build`, it crashes with the following error:

```bash
% npm run build

> nextjs-mangle-reproduction@1.0.0 build
> next build

  ▲ Next.js 16.0.0-canary.15 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 5.6s
✓ Finished TypeScript in 964.4ms
✓ Collecting page data in 120.1ms
Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
ReferenceError: randomKey2 is not defined
    at __TURBOPACK__module__evaluation__ (.next/server/chunks/ssr/[root-of-the-server]__e1e09896._.js:118:9919)
    at instantiateModule (.next/server/chunks/ssr/[turbopack]_runtime.js:715:9)
    at getOrInstantiateModuleFromParent (.next/server/chunks/ssr/[turbopack]_runtime.js:738:12)
    at Context.esmImport [as i] (.next/server/chunks/ssr/[turbopack]_runtime.js:228:20)
    at __TURBOPACK__module__evaluation__ (.next/server/chunks/ssr/[root-of-the-server]__12752159._.js:1:12607)
    at instantiateModule (.next/server/chunks/ssr/[turbopack]_runtime.js:715:9)
    at getOrInstantiateModuleFromParent (.next/server/chunks/ssr/[turbopack]_runtime.js:738:12)
    at Context.commonJsRequire [as r] (.next/server/chunks/ssr/[turbopack]_runtime.js:249:12) {
  digest: '2173096396'
}
Export encountered an error on /page: /, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
```

3. Run `npm run build --webpack` also fails:

```bash
% npm run build -- --webpack

> nextjs-mangle-reproduction@1.0.0 build
> next build --webpack

  ▲ Next.js 16.0.0-canary.15 (webpack)

  Creating an optimized production build ...
✓ Compiled successfully in 9.4s
✓ Finished TypeScript in 832.2ms
✓ Collecting page data in 184.1ms
Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
ReferenceError: dist_randomKey is not defined
    at 28232 (.next/server/app/page.js:1174:9917)
    at g (.next/server/webpack-runtime.js:1:151)
    at 39992 (.next/server/app/page.js:5728:13567)
    at Object.g [as require] (.next/server/webpack-runtime.js:1:151) {
  digest: '1499872500'
}
Export encountered an error on /page: /, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
```

# `--no-mangling` solves the crash

1. Run `npm install`
2. Run `npm run build -- --no-mangling` it builds successfully
3. Run `npm run build -- --webpack --no-mangling` also builds successfully

The `--no-mangling` flag isn't necessary in 15.5.6 and earlier, including v15 canary builds. It's unclear exactly which canary of v16 where the regression was introduced.
