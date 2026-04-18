import { Sequence } from 'remotion';
import { scriptConfig } from './scriptConfig';
import { Visuals } from './Visuals';

interface SubtitleProps {
  text: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffffff',
      padding: '20px 40px',
      borderRadius: '8px',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: '1.4',
    }}>
      {text}
    </div>
  );
};

export const TheLanguageGap: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      {scriptConfig.map((scene, index) => {
        const startFrame = scriptConfig.slice(0, index).reduce((sum, s) => sum + s.frames, 0);
        return (
          <Sequence
            key={scene.id}
            from={startFrame}
            durationInFrames={scene.frames}
          >
            <Visuals sceneId={scene.id} />
            <Subtitle text={scene.text} />
          </Sequence>
        );
      })}
    </div>
  );
};