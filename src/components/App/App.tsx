import VideoWrapper from '../VideoWrapper';
import Scrollable from '@/elements/Scrollable';

const App = () => {
  return (
    <Scrollable>
      <VideoWrapper />
      <VideoWrapper />
    </Scrollable>
  );
};

export default App;
