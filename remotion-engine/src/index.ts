import { registerRoot, Composition, getInputProps } from 'remotion';
import { TheLanguageGap } from './TheLanguageGap';
import { scriptConfig } from './scriptConfig';

registerRoot(() => {
  const inputProps = getInputProps();
  const totalFrames = scriptConfig.reduce((sum, scene) => sum + scene.frames, 0);

  return (
    <Composition
      id="TheLanguageGap"
      component={TheLanguageGap}
      durationInFrames={totalFrames}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={inputProps}
    />
  );
});