# Votecaster Frame

This Votecaster Frame allows users to vote on a Votecaster from a Frame.
It leverages the `frame.js` framework for the frame part, a `Safe Module` for proposals and voting management, and `The Graph` for indexing voting data from the blockchain.

## Features

- **On-Chain Voting**: Enable direct voting on on-chain proposals. A Proposal is a transfer of a certain token amount to an address receiver at the moment.
- **Real-Time Indexing**: Use The Graph to index voting data from the chain, ensuring up-to-date information using our subgraph
- **Safe Module**: Utilize a Safe Module for secure and efficient vote handling.
  
## References
- our Frame: http://localhost:3000/proposals/6
- Nouns Governor: 0x6f3E6272A167e8AcCb32072d08E0957F9c79223d
- Subgraph: https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12.x or higher recommended)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

1. **Clone the repository:**

git clone https://github.com/stevysmith/votecaster.git

cd your-repo-name

2. **Install dependencies:**
yarn

3. **Set up env variables:**
Set up environment (.env file) variables

4. **Run the project:**
yarn dev

# License
The project is released under MIT license, feel free to fork and improve the projects






