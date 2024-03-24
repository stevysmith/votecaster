import { NextRequest, NextResponse } from 'next/server';
import { PROPOSAL_ID } from '../../../../lib/constants';
import { FrameActionPayload, validateFrameMessage, getAddressForFid } from 'frames.js';
import { sendVoteTransaction } from '../../../../lib/ethers';
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

  console.log('Received message', body);

  const { isValid, message } = await validateFrameMessage(body);

  console.log(message)

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(tryAgainResponse(id));
  }

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

  console.log("TEST")
  console.log(message)
  const fid = message?.data.fid!;
  
  console.log(fid)
  console.log("WE HERE")

  // check user address is part of delegates
  var address = await getAddressForFid({ fid: fid, hubClient: null, options: { fallbackToCustodyAddress: true }});
  const delegates = await getDelegates();

  if (delegates !== null) {
    if (!delegates.find((delegate) => delegate.id === address)) {
      console.error('Error: invalid fid', { fid: fid, minFid: proposal?.proposalThreshold });
      return new NextResponse(
        invalidFidResponse(fid.toString(), parseInt(proposal?.proposalThreshold!), id),
      );
    }
  }

  try {
    console.log('Sending vote transaction');
    await sendVoteTransaction(body.trustedData.messageBytes, id);
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
