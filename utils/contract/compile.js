const fs = require('fs');
const solc = require('solc');
const { resolve } = require('path');

// contractPath: "../../contract_0x51--etc.sol"
const compileContract = (contractID, className) => {
    const sources = {}
    const contractPath = resolve(`./user_contracts/${contractID}`)

    compileImports(contractPath, sources);

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
  
    const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
    console.log(tempFile);
    const contractFile = tempFile.contracts[contractPath][className];

    // exports the abi for later use 
    fs.writeFileSync(`${resolve(`./user_contracts_abi/${contractID.split('.')[0]}_abi.json`)}`, JSON.stringify(contractFile.abi));
    
    console.log('saved abi file')

    return contractFile;
}

const compileImports = (root, sources) => {
    sources[root] = { content: fs.readFileSync(root, 'utf-8')};
    const imports = getLibraryImports(root);
    for (let i = 0; i < imports.length; i++) {
        compileImports(imports[i], sources);
    }
}

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

const completeFullPath = (parent, path) => {
    let curDir = parent.substr(0, parent.lastIndexOf("/")); //i.e. ./node/.../ERC721
    if (path.startsWith("./")) {
      return curDir + "/" + path.substr(2);
    }
  
    while (path.startsWith("../")) {
      curDir = curDir.substr(0, curDir.lastIndexOf("/"));
      path = path.substr(3);
    }
  
    return curDir + "/" + path;
}

const getWalletAddress = (contractPath) => {
    return contractPath.split('/')[3].split('.')[0]
}

module.exports = compileContract;