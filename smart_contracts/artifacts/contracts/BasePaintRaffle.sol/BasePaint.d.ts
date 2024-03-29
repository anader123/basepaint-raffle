// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface BasePaint$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "BasePaint",
  "sourceName": "contracts/BasePaintRaffle.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "indexes",
          "type": "uint256[]"
        }
      ],
      "name": "authorWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "day",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "pixels",
          "type": "bytes"
        }
      ],
      "name": "paint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "today",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "contracts/BasePaintRaffle.sol:BasePaint",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<BasePaint$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "contracts/BasePaintRaffle.sol:BasePaint",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<BasePaint$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "contracts/BasePaintRaffle.sol:BasePaint",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<BasePaint$Type["abi"]>>;
}
