import React from 'react'
import { Rocket} from 'lucide-react';
import { title } from 'process';
import { info } from 'console';
 import logo from "../Comments/"




const LandingPage = () => {
  return (
    <>

    
<img className='w-[100px] mx-auto' src="https://i.postimg.cc/mrmNqjP5/logo.jpg" alt="My image" />


  {/* //TOP SECTION */}

    <div className='grid items-center text-center justify-around gap-4 '>
        {/* <img src={logo} alt="" /> */}
      <p className='text-sm text-[#ef9c60] mt-2 mb-6 '>Bitcoin Script VM in Cairo</p>
      <h1 className='text-5xl text-gray-100'>Revolutionizing Code Sharing in Web3</h1>
      <h2 className='text-gray-200 text-4xl my-4'>With Blockchain-powered Collaboration</h2>
      <button className='my-20 flex  pt-2 mx-auto justify-center bg-[#36a7b9] text-3xl w-[300px] h-[50px] gap-2 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105'>Let's get started<Rocket className='w-8 h-8' /></button>
      <p className='text-gray-400 w-[77%] justify-center text-center text-xl mx-auto mb-4'>Snipu is a Decentralized Code snippet Hub built on Starknet That Redefines How Developers Store, share, and Collacorate on Code. By leveraging Blockchain Technology. The platform Ensures That code Snippets are stored securely On-chain  While offering seamless acces to aglobal Community  Of Developers. Users Aurthenticate with popular Starknet wallets Such as Bravos and Argent, Manage their persoonall snippets, And Share Them With ease Through Sharable links. </p>
      <hr className='w-[50%] mx-auto my-4' />
    </div>

{/* KEY FEATURES SECTION */}
<div className='my-20 '>
  <h1 className='mx-auto text-5xl  text-center font-bold text-[#ef9c60] my-[4rem]'>Key Features</h1>
 <div className='grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
  <div className='bg-gradient-to-b from-[#1a2127] to-[#1a1a1a] mx-auto p-8 rounded-3xl w-[500px] transition-transform duration-300 ease-in-out transform hover:scale-105' >
    <h1 className='text-3xl text-gray-100 underline'>Core EVM Implementation</h1>
    <ul className=' text-gray-400 text-2xl py-4 list-disc pl-5'>
      <li> Full Implementation Of Bitcoin Script Opcodes In Cairo</li>
      <li>Stack-Based Execution Environment Matching BItcoins Processing Model</li>
      <li>Accurate Handling Of Bitcoin's Execution Constraints and Edge cases</li>
    
    </ul>

  </div>


  <div className='bg-gradient-to-b from-[#1a2127] to-[#1a1a1a] mx-auto p-8 rounded-3xl w-[500px] ransition-transform duration-300 ease-in-out transform hover:scale-105' >
    <h1 className='text-3xl text-gray-100 underline'>Script Compilation</h1>
    <ul className=' text-gray-400 text-2xl py-4 list-disc pl-5'>
      <li> Bitcoin script to cairo Transpilation with Optimization</li>
      <li>Support for both legacy and segWit script fomarts</li>
      <li>Preservation of Script semantics across Languages</li>
    
    </ul>

  </div>
  <div className='bg-gradient-to-b from-[#1a2127] to-[#1a1a1a] mx-auto p-8 rounded-3xl w-[500px] ransition-transform duration-300 ease-in-out transform hover:scale-105' >
    <h1 className='text-3xl text-gray-100 underline'>Verification Tools</h1>
    <ul className=' text-gray-400 text-2xl py-4 list-disc pl-5'>
      <li>Zero-knowledge Proof forscript Execution</li>
      <li>On-chain Verification of Bitcoin script Execution layer 2 </li>
      <li>Cryptographic Linking between Bitcoin and Cairo Execution Environments</li>
    
    </ul>

  </div>
  <div className='bg-gradient-to-b from-[#1a2127] to-[#1a1a1a] mx-auto p-8 rounded-3xl w-[500px] ransition-transform duration-300 ease-in-out transform hover:scale-105' >
    <h1 className='text-3xl text-gray-100 underline'>Developer Tools</h1>
    <ul className=' text-gray-400 text-2xl py-4 list-disc pl-5'>
      <li>Comprehensive API for integrating Snipu into existing applications</li>
      <li>CLI  tools for batch processing and automation</li>
      <li>Detailed Execution Logs for Debugging complex scripts</li>
    
    </ul>

  </div>
  <div className='bg-gradient-to-b from-[#1a2127] to-[#1a1a1a] mx-auto p-8 rounded-3xl w-[500px] ransition-transform duration-300 ease-in-out transform hover:scale-105' >
    <h1 className='text-3xl text-gray-100 underline'>Interoperability Features</h1>
    <ul className=' text-gray-400 text-2xl py-4 list-disc pl-5'>
      <li> Cross-chain messaging capabilities using bitcoin Scripts</li>
      <li>Bitcoin Transaction verification on layer 2 platforms</li>
      <li>Bridge Mechanism for Bitcoin Based assets</li>
    
    </ul>

  </div>
  <div className='bg-gradient-to-b from-[#1a2127] to-[#1a1a1a] mx-auto p-8 rounded-3xl w-[500px] ransition-transform duration-300 ease-in-out transform hover:scale-105' >
    <h1 className='text-3xl text-gray-100 underline'>Security Component</h1>
    <ul className=' text-gray-400 text-2xl py-4 list-disc pl-5'>
      <li> formal Verification of core VM components</li>
      <li>Comprehesive test suite covering Edge cases</li>
      <li>Security Audit-Ready Architecture</li>
    
    </ul>

  </div>
  

 </div>
</div>
</>



  )
}

export default LandingPage
