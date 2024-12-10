import React, { useState } from 'react';
import { parse, Proposition } from '../models/ConceptRepository';

interface AddPropositionFormProps {
    onAddConcept: (proposition: Proposition) => void;
}

export default function AddPropositionForm({ onAddConcept }: AddPropositionFormProps) {
    const [valid, setValidity] = useState(false);

    const addPropositionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValidity(!!parse(event.target.value));
    }

    const createProposition = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const proposition: Proposition | null = parse(event.target[0].value);

        if(proposition) {
            console.log(proposition);
            onAddConcept(proposition);
            // reset input
            event.target[0].value = '';
            setValidity(false);
        } else {
            console.log('Invalid proposition:', event.target[0].value);
        }
    }

    const exampleProposition = 'JavaScript <is a> Programming Language';
    return (
        <form id="add-proposition-form" onSubmit={createProposition} className={`${valid ? 'valid' : 'invalid'}`}>
            <input className="primary" type="text" id="add-proposition" onChange={addPropositionChanged} placeholder="JavaScript <is a> Programming Language" />
            <text id="example-proposition">example:<br/>{exampleProposition}</text>
            <button className="primary" type="submit" disabled={!valid}>Submit</button>
        </form>

    )
}
