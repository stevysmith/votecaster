import { Frame, getFrameFlattened, FrameButton, FrameVersion, FrameButtonsType, FrameFlattened } from 'frames.js';
import type { Metadata } from 'next';
import { BASE_URL } from '../../../lib/constants';
import { getProposal } from '../../../lib/the-graph';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const proposal = await getProposal(id);

  if (!proposal) {
    return {
      title: `Proposal #${id}`,
      openGraph: {
        title: `Proposal #${id}`,
      },
      metadataBase: new URL(BASE_URL || ''),
    };
  }

  const fcMetadata: Record<string, any> = getFrameFlattened({
    version: "vNext" as FrameVersion,
    postUrl: `${BASE_URL}/api/proposals/${id}`,
    image: `${BASE_URL}/api/proposals/${id}/image`,
    buttons: [
      {
        label: 'against ❌',
        action: 'post', 
        target: `${BASE_URL}/api/proposals/${id}`
      },
      {
        label: 'for ✅',
        action: 'post',
        target: `${BASE_URL}/api/proposals/${id}`
      },
      {
        label: 'abstain ❔',
        action: 'post',
        target: `${BASE_URL}/api/proposals/${id}`
      },
    ],
  });

  return {
    title: `Proposal #${id}`,
    openGraph: {
      title: `Proposal #${id}`,
      images: [`${BASE_URL}/api/proposals/${id}/image`],
    },
    description: "Vote",
    other: {
      ...fcMetadata
    },
    metadataBase: new URL(BASE_URL || ''),
  };
}

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        padding: '3.5rem',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <a href="https://github.com/stevysmith/votecaster" target="_blank">
        <img src={`${BASE_URL}/votecaster-main.png`} height={32} width={104} />
      </a>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#c1808e',
          fontSize: '48px',
          textAlign: 'center',
          fontFamily: 'Raleway-ExtraBold',
        }}
      >
        Votecaster Frame
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#c1808e',
          fontSize: '24px',
          textAlign: 'center',
          fontFamily: 'Raleway-Bold',
        }}
      >
        Voting within Farcaster Frame
      </div>
    </div>
  );
}
