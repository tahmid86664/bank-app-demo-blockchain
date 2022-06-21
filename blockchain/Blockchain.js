const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 8;
  }

  createGenesisBlock() {
    return new Block(0, "21/11/2021", "Genesis block", "0".repeat(64));
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    // newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  // validating the chain
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previouBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previouBlock.hash) {
        return false;
      }

      if (currentBlock.nonce === 0) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
