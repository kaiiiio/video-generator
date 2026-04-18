import { Audio } from 'remotion';

const VideoExplainer = ({ audioFile }) => {
  return (
    <div style={{ backgroundColor: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Audio src={audioFile} />
      <h1>Video Explainer Placeholder</h1>
    </div>
  );
};

export { VideoExplainer };