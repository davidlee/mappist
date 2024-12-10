import './App.css';
import { useState } from 'react';
import { Stage } from '@pixi/react';
import { AddPropositionForm, Concept } from './components';
import { Proposition } from './models/ConceptRepository';

interface ConceptData {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const App = () => {

    const [concepts, setConcepts] = useState<ConceptData[]>([
        { text: 'Hello', x: 100, y: 100, width: 100, height: 100 },
        { text: 'World', x: 200, y: 200, width: 100, height: 100 },
    ]);

    const handleAddConcept = (proposition: Proposition) => {
        const newConcept = {
            text: `${proposition.subject} ${proposition.predicate} ${proposition.object}`,
            x: 5,
            y: concepts.length * 40 + 5,
            width: 200,
            height: 30,
        };
        setConcepts(prevConcepts => [...prevConcepts, newConcept]);
    };

    return (
    <>
      <Stage width={800} height={600} options={{ background: 0xeeeeee }}>
       {concepts.map((concept, index) => (
          <Concept key={index} {...concept} />
        ))}
      </Stage>
      <AddPropositionForm onAddConcept={handleAddConcept} />
      <div id="raw">
      </div>
    </>
  );
};

export default App;
