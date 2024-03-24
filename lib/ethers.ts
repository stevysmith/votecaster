import { ethers } from 'ethers';
import { MODULE_ADDRESS, RPC_URL } from './constants';
import { ozGovernorABI } from './ABI';
import { getContractCallArgs } from './onchain-utils';

export const getEthers = () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(process.env.WALLET_PVT_KEY!, provider);
  return {
    signer,
    provider,
  };
};

export const sendVoteTransaction = async (messageBytes: string, proposalId: string) => {
  const { signer } = getEthers();
  const contractInterface = new ethers.utils.Interface(ozGovernorABI);

  const args = getContractCallArgs(messageBytes);

  console.log(args)

  // castVote (uint256 proposalId, uint8 support)

  // 0 against
  // 1 for
  // 2 abstain

  // var nounsGovernor = "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d";
  // signer.sendTransaction({
  //   to: nounsGovernor,
  //   value: 0,
  //   gasLimit: 3000000,
  //   data: contractInterface.encodeFunctionData('castVote', [
  //     proposalId,
  //     args[0],
  //     args[1],
  //     args[2],
  //     args[3],
  //   ]),
  // });
};
