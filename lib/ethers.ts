import { ethers } from 'ethers';
import { MODULE_ADDRESS, RPC_URL } from './constants';
import { ozGovernorABI } from './ABI';
import { getContractCallArgs } from './onchain-utils';
import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse } from "frames.js";
import { Abi, encodeFunctionData } from "viem";

export const getEthers = () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(process.env.WALLET_PVT_KEY!, provider);
  return {
    signer,
    provider,
  };
};

export async function castVoteOnProposal(
  proposalId: number, selectedVote: number
): Promise<NextResponse<TransactionTargetResponse>> {

  var nounsGovernor = "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d" as `0x${string}`;

  const calldata = encodeFunctionData({
    abi: ozGovernorABI as Abi,
    functionName: "castVote",
    args: [proposalId, selectedVote],
  });

  console.log(calldata)

  return NextResponse.json({
    chainId: "eip155:1",
    method: "eth_sendTransaction",
    params: {
      abi: ozGovernorABI as Abi,
      to: nounsGovernor,
      data: calldata,
      value: "0",
    },
  });
}

export const sendVoteTransaction = async (selectedVote: number, proposalId: string) => {
  console.log("hype")
  const { signer } = getEthers();
  console.log("hello")
  const contractInterface = new ethers.utils.Interface(ozGovernorABI);

  console.log('selectedVote', selectedVote);

  // castVote (uint256 proposalId, uint8 support)

  // 0 against
  // 1 for
  // 2 abstain
  var nounsGovernor = "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d";
  signer.sendTransaction({
    to: nounsGovernor,
    value: 0,
    gasLimit: 3000000,
    data: contractInterface.encodeFunctionData('castVote', [
      proposalId,
      selectedVote
    ]),
  });
};
