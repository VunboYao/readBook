# jest 配置

- `npm install --save-dev jest`

## package.json

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## Using Babel

`npm install --save-dev babel-jest @babel/core @babel/preset-env`

## babel.config.js

```js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

## Using TypeScript

`npm install --save-dev @babel/preset-typescript`

```js
// bable.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

## Type definitions

`npm install --save-dev @types/jest`