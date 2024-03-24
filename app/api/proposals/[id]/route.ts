import { NextRequest, NextResponse } from 'next/server';
import { PROPOSAL_ID } from '../../../../lib/constants';
import { FrameActionPayload, validateFrameMessage, getAddressForFid, getFrameMessage } from 'frames.js';
import { sendVoteTransaction, castVoteOnProposal  } from '../../../../lib/ethers';
import {
  alreadyVotedResponse,
  invalidFidResponse,
  resultsResponse,
  thresholdReachedResponse,
  tryAgainResponse,
} from '../../../../lib/frame-responses';
import { getProposal, getDelegates, hasVoted } from '../../../../lib/the-graph';
import { FidRequest } from '@farcaster/core';

async function getResponse(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();
  const id = params.id;

  // const { isValid, message } = await validateFrameMessage(body);

  const message = await getFrameMessage(body);

  // if (!isValid) {
  //   console.error('Error: invalid message');
  //   return new NextResponse(tryAgainResponse(id));
  // }

  console.log(message)

  const proposal = await getProposal(id);

  if (!proposal) {
    console.error(`Proposal with ID ${id} not found`);
    return new NextResponse(tryAgainResponse(id));
  }

  // if (
  //   parseInt(proposal.forVotes) >= parseInt(proposal.proposalThreshold) ||
  //   parseInt(proposal.againstVotes) >= parseInt(proposal.proposalThreshold)
  // ) {
  //   console.error(`Proposal threshold reached`);
  //   return new NextResponse(thresholdReachedResponse(id));
  // }
  
  const fid = message?.castId?.fid as number;

  // check user address is part of delegates
  var address = message.connectedAddress
  // var address = await getAddressForFid({ fid: fid, options: { fallbackToCustodyAddress: true }});
  const delegates = await getDelegates();

  // if (delegates !== null) {
  //   if (!delegates.find((delegate) => delegate.id === address)) {
  //     console.error('Error: Noun not found', { fid: fid, minFid: proposal?.proposalThreshold });
  //     return new NextResponse(
  //       invalidFidResponse(fid.toString(), parseInt(proposal?.proposalThreshold!), id),
  //     );
  //   }
  // }

  try {
    console.log('Sending vote transaction');
    await castVoteOnProposal(message.buttonIndex - 1, parseInt(id));
    console.log('Vote transaction sent');

    return new NextResponse(resultsResponse(id));
  } catch (e) {
    console.error('Error creating safe', e);
    return new NextResponse(tryAgainResponse(id));
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  return getResponse(req, { params });
}

export const dynamic = 'force-dynamic';
