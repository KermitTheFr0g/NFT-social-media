const fs = require('fs');
const solc = require('solc');
const { resolve } = require('path');

// * function to compile contract
const compileContract = (contractID, className) => {
    const sources = {}
    const contractPath = resolve(`./user_contracts/${contractID}`)

    compileImports(contractPath, sources);

    // * setting the input for compiling
    var input = {
      language: "Solidity",
      sources: sources,
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };
    

    // * creating the temporary file compiled with solc
    const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
    const contractFile = tempFile.contracts[contractPath][className];

    // * exports the abi
    fs.writeFileSync(`${resolve(`./user_contracts_abi/${contractID.split('.')[0]}_abi.json`)}`, JSON.stringify(contractFile.abi));
    
    // * returns the contract file to be used for deployment
    return contractFile;
}

// * loops through all imports and compiles them ready for the main file compilation
const compileImports = (root, sources) => {
    sources[root] = { content: fs.readFileSync(root, 'utf-8')};
    const imports = getLibraryImports(root);
    for (let i = 0; i < imports.length; i++) {
        compileImports(imports[i], sources);
    }
}


// * gets the library imports from file which need to be compiled
const getLibraryImports = (path) => {
    const file = fs.readFileSync(path, 'utf-8');
    const files = new Array();
    file
        .toString()
        .split('\n')
        .forEach((line, index, arr) => {
            if((index == arr.length - 1 && line == "") ||
            !line.trim().startsWith('import')
            ) {
                return;
            }

            const relativePath = line.substring(8, line.length - 2);
            const fullPath = completeFullPath(path, relativePath);
            files.push(fullPath);
        })
    return files;
}


// * creates the full path for 
const completeFullPath = (parent, path) => {
    let curDir = parent.substr(0, parent.lastIndexOf("/")); 
    if (path.startsWith("./")) {
      return curDir + "/" + path.substr(2);
    }
  
    while (path.startsWith("../")) {
      curDir = curDir.substr(0, curDir.lastIndexOf("/"));
      path = path.substr(3);
    }
  
    return curDir + "/" + path;
}


module.exports = compileContract;