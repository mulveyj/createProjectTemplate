const gitIgnore = `node_modules
    **/node_modules
    .DS_Store
    **/.DS_Store
    *.log
    **/*.log
    .vscode
    **/.vscode
    .idea/*
    **/.idea/*
    **/bundle.js
    **/bundle.js.map`

module.exports = gitIgnore;