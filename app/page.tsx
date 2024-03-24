import { BASE_URL } from '../lib/constants';

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
        Votecaster
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
