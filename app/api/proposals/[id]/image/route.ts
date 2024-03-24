import sharp from 'sharp';
import { generateInitImageSvg } from '../../../../../lib/satori';
import { getProposal } from '../../../../../lib/the-graph';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  const proposal = await getProposal(id);

  if (!proposal) {
    return new Response('Proposal not found', { status: 404 });
  }

  console.log(proposal)

  const svg = await generateInitImageSvg(
    proposal.id.toString(),
    proposal.proposalThreshold.toString(),
    proposal.title.toString(),
  );

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

  // Set the content type to PNG and send the response
  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=10',
    },
  });
};

export const dynamic = 'force-dynamic';
