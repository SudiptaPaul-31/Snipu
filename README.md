# Snipu - Bitcoin Script VM in Cairo

**Revolutionizing Code Sharing in Web3 with Blockchain-Powered Collaboration**
![Snipu Logo](https://raw.githubusercontent.com/SudiptaPaul-31/Snipu/refs/heads/main/images/logo.jpg)

<p align="center">
  <a href="https://github.com/SudiptaPaul-31/Snipu"><img src="https://img.shields.io/badge/BUILD-PASSING-brightgreen?style=for-the-badge&logo=github&logoColor=white&labelColor=black" alt="BUILD"></a>
  <a href="https://www.cairo-lang.org/"><img src="https://img.shields.io/badge/CAIRO-1a1a1a?style=for-the-badge&logo=cairo&logoColor=white" alt="CAIRO"></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="REACT"></a>
</p>

<p align="center">
  <a href="https://github.com/SudiptaPaul-31"><img src="https://img.shields.io/badge/EXPLORATION_TEAM-212121?style=for-the-badge" alt="EXPLORATION TEAM"></a>
  <a href="https://t.me/snipu_code"><img src="https://img.shields.io/badge/TELEGRAM-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="TELEGRAM"></a>
</p>

## Overview

Snipu is an innovative Bitcoin Script Virtual Machine implemented in Cairo, designed to bring Bitcoin's scripting capabilities to Layer 2 solutions. This project enables developers to execute and verify Bitcoin scripts within the Cairo environment, facilitating advanced interoperability between Bitcoin and other blockchain platforms.

## Website Workflow

The Snipu platform offers a streamlined experience for developers looking to work with Bitcoin scripts in Cairo:

1. **Home Page**: Users are greeted with an overview of Snipu's capabilities and key features.

2. **Script Editor**:

   - Write custom Bitcoin scripts directly in the browser
   - Access a library of template scripts for common use cases
   - Syntax highlighting and error checking in real-time

3. **Compiler Interface**:

   - Compile Bitcoin scripts into Cairo-compatible format
   - View detailed compilation logs and debugging information
   - Export compiled scripts for integration with other projects

4. **Testing Environment**:

   - Execute compiled scripts in a sandboxed environment
   - Provide custom inputs and witness data for script execution
   - View execution results and stack states

5. **Documentation Center**:

   - Access comprehensive guides on using Snipu
   - Reference materials for Bitcoin Script opcodes and their Cairo implementations
   - Step-by-step tutorials for common development scenarios

6. **Community Hub**:
   - Connect with other developers using Snipu
   - Share custom scripts and implementations
   - Discuss best practices and technical challenges

## Features

### Core VM Implementation

- Full implementation of Bitcoin Script opcodes in Cairo
- Stack-based execution environment matching Bitcoin's processing model
- Accurate handling of Bitcoin's execution constraints and edge cases

### Script Compilation

- Bitcoin Script to Cairo transpilation with optimization
- Support for both legacy and SegWit script formats
- Preservation of script semantics across languages

### Verification Tools

- Zero-knowledge proof generation for script execution
- On-chain verification of Bitcoin script execution on Layer 2
- Cryptographic linking between Bitcoin and Cairo execution environments

### Developer Tools

- Comprehensive API for integrating Snipu into existing applications
- CLI tools for batch processing and automation
- Detailed execution logs for debugging complex scripts

### Interoperability Features

- Cross-chain messaging capabilities using Bitcoin scripts
- Bitcoin transaction verification on Layer 2 platforms
- Bridge mechanisms for Bitcoin-based assets

### Security Components

- Formal verification of core VM components
- Comprehensive test suite covering edge cases
- Security audit-ready architecture

## Technologies Used

### Core Technologies

- **Cairo Language** (v1.0.0): Zero-knowledge friendly programming language for VM implementation
- **Bitcoin Script**: Native Bitcoin scripting language supported by the VM
- **React** (v18.2.0): Frontend framework for the web interface
- **TypeScript** (v4.9.5): Type-safe language for frontend development
- **Node.js** (v16.20.0): Runtime environment for development tools

### Backend Stack

- **Rust** (v1.70.0): Performance-critical components and optimization
- **Scarb** (v0.7.0): Cairo package manager
- **StarkNet** (v0.13.0): Layer 2 integration for on-chain verification

### Frontend Libraries

- **Redux** (v8.1.0): State management for the application
- **Material UI** (v5.13.0): Component library for consistent UI
- **Monaco Editor** (v0.40.0): Code editor for script writing
- **Web3.js** (v1.10.0): Blockchain interaction library
- **D3.js** (v7.8.5): Data visualization for script execution

### Development Tools

- **Docker** (v24.0.5): Containerization for consistent development and deployment
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment
- **Jest** (v29.5.0): Testing framework for frontend components
- **Starknet.js** (v5.14.1): Client library for StarkNet integration
- **ESLint** (v8.40.0): Code quality and style enforcement

### Security Tools

- **Slither**: Smart contract static analyzer
- **Cairo-Test**: Cairo-specific testing framework
- **OpenZeppelin Contracts**: Secure, reusable smart contract components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Rust (v1.70 or higher)
- Starknet wallet (ArgentX or Braavos)
- Yarn/NPM/PNPM/Bun

### Installation

1. Clone the repository:

````bash
git clone https://github.com/SudiptaPaul-31/Snipu.git
cd Snipu

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snipu.git
````

2. Install dependencies :

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

3. Running locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Setup Guidelines
# Setting up the Project

This guide provides instructions for setting up and running the project on your local machine

Make sure you have the following prerequisites installed on your system:

- **npm** 

## Setting Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/SudiptaPaul-31/Snipu.git
   cd snipu
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create and switch into you own branch:
    ```bash
   git branch <your-branch>
   git checkout <your-branch>
   ```

## Running the Entire Project

To run the entire project, including both smart contracts and the frontend:

1. Build commands:
   ```bash
   npm run dev
   ```

The frontend should now be running at `http://localhost:3000`


## Notes for Contributors

- Follow our contributor's guide given [here](./CONTRIBUTING.md).
- Make sure to follow the respective commands for working on either the smart contracts or the frontend.
- Ensure the code is properly building, passing tests and formatted using `npm run check` at the root directory before making a pull request.
 
 ## Contribution Guidelines
 Thank you for your interest in contributing to this project! Please read the following rules carefully before applying to work on an issue.
 
 ## Application Process
 
 When applying to work on an issue:
 
 1. Provide a brief background about yourself.
 2. Explain how you plan to approach the issue.
 3. Share your estimated time of arrival (ETA) for completing the task.
 
 ## Deadlines and Communication
 
 - If you cannot complete the task within your ETA + 1 day, **you must inform me** on Telegram (@SoarinSkySagar). Failure to do so will result in you being unassigned from the issue.
 - Contributors can reach out for help regarding the project anytime via:
   - My Telegram: [@Sudipta_31](https://t.me/sudipta_31)
   - Project Telegram: [Snipu](https://t.me/snipu_code)
   - Our project's Telegram group.
 
 ## Workflow Requirements
 
 1. **Work on a Separate Branch**
    - Always create a new branch for your work and submit your pull requests (PRs) from there.
 
 2. **Run Checks Before Submitting a PR**
    - Make sure to run the following command in the root directory:
      ```bash
      npm run check
      ```
    - Ensure there are no errors before submitting your PR.
 
 3. **PR Validation**
    - If any checks fail on your PR, you must fix them before it can be merged.
    - The only exception is **Vercel deployments**, which require my authorization.
 
 ## Project Setup
 
 Refer to the [SETUP.md](./SETUP.md) file in the same directory for detailed instructions on setting up the project.
 
 By following these guidelines, you help ensure a smooth contribution process for everyone involved. Thank you for contributing!

<!-- CONTRIBUTORS-START -->
## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/SudiptaPaul-31">
        <img src="https://avatars.githubusercontent.com/u/117905151?v=4" width="64" height="64" alt="SudiptaPaul-31"><br />
        <sub><b>SudiptaPaul-31</b></sub>
      </a><br />
      <sub>55 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/gchyuli">
        <img src="https://avatars.githubusercontent.com/u/114550704?v=4" width="64" height="64" alt="gchyuli"><br />
        <sub><b>gchyuli</b></sub>
      </a><br />
      <sub>10 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/josephchimebuka">
        <img src="https://avatars.githubusercontent.com/u/87217051?v=4" width="64" height="64" alt="josephchimebuka"><br />
        <sub><b>josephchimebuka</b></sub>
      </a><br />
      <sub>8 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/caxtonacollins">
        <img src="https://avatars.githubusercontent.com/u/166155946?v=4" width="64" height="64" alt="caxtonacollins"><br />
        <sub><b>caxtonacollins</b></sub>
      </a><br />
      <sub>8 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/gethsun1">
        <img src="https://avatars.githubusercontent.com/u/56596995?v=4" width="64" height="64" alt="gethsun1"><br />
        <sub><b>gethsun1</b></sub>
      </a><br />
      <sub>6 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/chiscookeke11">
        <img src="https://avatars.githubusercontent.com/u/137373308?v=4" width="64" height="64" alt="chiscookeke11"><br />
        <sub><b>chiscookeke11</b></sub>
      </a><br />
      <sub>6 commits</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/anneyomeje">
        <img src="https://avatars.githubusercontent.com/u/103583132?v=4" width="64" height="64" alt="anneyomeje"><br />
        <sub><b>anneyomeje</b></sub>
      </a><br />
      <sub>3 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Dannynsikak">
        <img src="https://avatars.githubusercontent.com/u/141313914?v=4" width="64" height="64" alt="Dannynsikak"><br />
        <sub><b>Dannynsikak</b></sub>
      </a><br />
      <sub>3 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Michelle031">
        <img src="https://avatars.githubusercontent.com/u/70325824?v=4" width="64" height="64" alt="Michelle031"><br />
        <sub><b>Michelle031</b></sub>
      </a><br />
      <sub>3 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Haroldwonder">
        <img src="https://avatars.githubusercontent.com/u/194428112?v=4" width="64" height="64" alt="Haroldwonder"><br />
        <sub><b>Haroldwonder</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/solowiseCV">
        <img src="https://avatars.githubusercontent.com/u/105504678?v=4" width="64" height="64" alt="solowiseCV"><br />
        <sub><b>solowiseCV</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/shrestha-das">
        <img src="https://avatars.githubusercontent.com/u/178530177?v=4" width="64" height="64" alt="shrestha-das"><br />
        <sub><b>shrestha-das</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/shamoo53">
        <img src="https://avatars.githubusercontent.com/u/170348515?v=4" width="64" height="64" alt="shamoo53"><br />
        <sub><b>shamoo53</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/omsant02">
        <img src="https://avatars.githubusercontent.com/u/102831123?v=4" width="64" height="64" alt="omsant02"><br />
        <sub><b>omsant02</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/czDamian">
        <img src="https://avatars.githubusercontent.com/u/65533328?v=4" width="64" height="64" alt="czDamian"><br />
        <sub><b>czDamian</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Davidemulo">
        <img src="https://avatars.githubusercontent.com/u/161654052?v=4" width="64" height="64" alt="Davidemulo"><br />
        <sub><b>Davidemulo</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Cyber-Mitch">
        <img src="https://avatars.githubusercontent.com/u/61045265?v=4" width="64" height="64" alt="Cyber-Mitch"><br />
        <sub><b>Cyber-Mitch</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/archanadby05">
        <img src="https://avatars.githubusercontent.com/u/121479321?v=4" width="64" height="64" alt="archanadby05"><br />
        <sub><b>archanadby05</b></sub>
      </a><br />
      <sub>2 commits</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/yashtech00">
        <img src="https://avatars.githubusercontent.com/u/141262414?v=4" width="64" height="64" alt="yashtech00"><br />
        <sub><b>yashtech00</b></sub>
      </a><br />
      <sub>1 commits</sub>
    </td>
    <td align="center">
      <a href="https://github.com/apps/github-actions">
        <img src="https://avatars.githubusercontent.com/in/15368?v=4" width="64" height="64" alt="github-actions[bot]"><br />
        <sub><b>github-actions[bot]</b></sub>
      </a><br />
      <sub>1 commits</sub>
    </td>
  </tr>
</table>
<!-- CONTRIBUTORS-END -->

