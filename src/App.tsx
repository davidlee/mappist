import './App.css';

import { Stage } from '@pixi/react';
import { AddPropositionForm, Concept } from './components';

const App = () => {

  return (
    <>
      <Stage width={800} height={600} options={{ background: 0xeeeeee }}>
       <Concept text={"Cat Food"} x={5} y={5} width={200} height={30} />
      </Stage>
      <AddPropositionForm />
      <div id="raw">
      </div>
    </>
  );
};

export default App;