import { useCurrentFrame, interpolate, spring } from 'remotion';

interface VisualsProps {
  sceneId: string;
}

export const Visuals: React.FC<VisualsProps> = ({ sceneId }) => {
  const frame = useCurrentFrame();

  switch (sceneId) {
    case "hook":
      // Center a red "ERROR: Joke Not Understood" text block
      const errorOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
      });
      const errorScale = spring({
        frame,
        fps: 30,
        config: {
          damping: 200,
          stiffness: 100,
          mass: 0.5,
        },
      });

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
          <div style={{
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '40px',
            borderRadius: '8px',
            fontSize: '48px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            opacity: errorOpacity,
            transform: `scale(${errorScale})`,
            textAlign: 'center',
          }}>
            ERROR: Joke Not Understood
          </div>
        </div>
      );

    case "rules":
      // Typewriter effect showing if (input === "Hello") return "Hi";
      const codeText = 'if (input === "Hello") return "Hi";';
      const typewriterProgress = interpolate(frame, [0, 120], [0, 1], {
        extrapolateRight: 'clamp',
      });
      const visibleChars = Math.floor(typewriterProgress * codeText.length);
      const displayCode = codeText.slice(0, visibleChars);

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
          <div style={{
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            padding: '30px',
            borderRadius: '8px',
            fontSize: '32px',
            fontFamily: 'Monaco, Consolas, monospace',
            border: '1px solid #3e3e3e',
            minWidth: '600px',
            textAlign: 'left',
          }}>
            <pre style={{ margin: 0 }}>
              {displayCode}
              <span style={{
                opacity: frame % 60 < 30 ? 1 : 0,
                color: '#d4d4d4'
              }}>
                |
              </span>
            </pre>
          </div>
        </div>
      );

    case "explosion":
      // Spawn 20 variations of the if/else statement randomly across the screen, zooming out
      const variations = [
        'if (input === "Hey") return "Hi";',
        'if (input === "Sup") return "Hi";',
        'if (input === "Yo") return "Hi";',
        'if (input === "Hiya") return "Hi";',
        'if (input === "Greetings") return "Hi";',
        'if (input === "Howdy") return "Hi";',
        'if (input === "Aloha") return "Hi";',
        'if (input === "Salutations") return "Hi";',
        'if (input === "What\'s up") return "Hi";',
        'if (input === "Good day") return "Hi";',
        'if (input === "Hello there") return "Hi";',
        'if (input === "Hi there") return "Hi";',
        'if (input === "Hey there") return "Hi";',
        'if (input === "Greetings human") return "Hi";',
        'if (input === "Hello world") return "Hi";',
        'if (input === "Hey buddy") return "Hi";',
        'if (input === "Sup dude") return "Hi";',
        'if (input === "Yo man") return "Hi";',
        'if (input === "How\'s it going") return "Hi";',
        'if (input === "What\'s happening") return "Hi";',
      ];

      const zoomScale = interpolate(frame, [0, 240], [1, 0.4], {
        extrapolateRight: 'clamp',
      });

      const glowOpacity = interpolate(frame, [180, 240], [0, 0.6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      return (
        <div style={{
          height: '100%',
          width: '100%',
          transform: `scale(${zoomScale})`,
          transformOrigin: 'center',
          position: 'relative',
        }}>
          {/* Initial code block */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '24px',
            fontFamily: 'Monaco, Consolas, monospace',
            border: '1px solid #3e3e3e',
            boxShadow: `0 0 30px rgba(255, 0, 0, ${glowOpacity})`,
          }}>
            <pre style={{ margin: 0 }}>
              if (input === "Hello") return "Hi";
            </pre>
          </div>

          {/* Spawned variations */}
          {variations.slice(0, Math.floor((frame / 240) * variations.length)).map((variation, index) => {
            const x = 50 + (index % 5 - 2) * 300 + Math.sin(index) * 100;
            const y = 50 + Math.floor(index / 5) * 80 + Math.cos(index) * 50;

            return (
              <div key={index} style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '16px',
                fontFamily: 'Monaco, Consolas, monospace',
                border: '1px solid #3e3e3e',
                opacity: 0.8,
              }}>
                <pre style={{ margin: 0 }}>
                  {variation}
                </pre>
              </div>
            );
          })}
        </div>
      );

    case "context":
      // Draw an SVG line connecting "River Bank" and "Wall Street Bank" to a central "?", then snap the line
      const textOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
      });

      const lineProgress = interpolate(frame, [60, 150], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      const dashOffset = interpolate(lineProgress, [0, 0.9], [0, 1000], {
        extrapolateRight: 'clamp',
      });

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            left: '15%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#2d2d2d',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '28px',
            fontFamily: 'Arial, sans-serif',
            opacity: textOpacity,
          }}>
            River Bank
          </div>

          <div style={{
            position: 'absolute',
            right: '15%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#2d2d2d',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '28px',
            fontFamily: 'Arial, sans-serif',
            opacity: textOpacity,
          }}>
            Wall Street Bank
          </div>

          <svg
            width="70%"
            height="200"
            style={{
              position: 'absolute',
              left: '15%',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: textOpacity,
            }}
          >
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray="10,5"
              strokeDashoffset={dashOffset}
            />
            <circle cx="50%" cy="50%" r="25" fill="#ffffff" />
            <text x="50%" y="58%" textAnchor="middle" fill="#1e1e1e" fontSize="20" fontWeight="bold">?</text>
          </svg>
        </div>
      );

    case "cliffhanger":
      // Fade to a clean screen with "Next: The Guessing Game"
      const fadeOpacity = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: 'clamp',
      });

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#1e1e1e',
        }}>
          <div style={{
            color: '#ffffff',
            fontSize: '48px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            opacity: fadeOpacity,
          }}>
            Next: The Guessing Game
          </div>
        </div>
      );

    default:
      return null;
  }
};