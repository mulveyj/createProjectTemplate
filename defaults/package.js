const package = `{
  "name": <<NAME>>,
  "version": "1.0.0",
  "description": "",
  "main": <<MAIN>>,
  "scripts": {
    "test": "mocha ./spec",
    "lint": "eslint ./",
    "precommit": "npm run lint && npm test"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^3.5.0",
    "eslint": "^3.19.0",
    "eslint-plugin-jsx": "0.0.2",
    "eslint-plugin-react": "^6.10.3",
    "husky": "^0.13.3",
    "mocha": "^3.4.2"
  },
  "dependencies": {
    "async": "^2.4.1"
  }
}`

module.exports = package;
