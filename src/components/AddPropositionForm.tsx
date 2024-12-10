import React, { useState } from 'react';
import { parse, Proposition } from '../models/ConceptRepository';

export default function AddPropositionForm() {
    const [valid, setValidity] = useState(false);

    const addPropositionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValidity(!!parse(event.target.value));
    }

    const createProposition = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const proposition: Proposition | null = parse(event.target[0].value);

        if(proposition) {
            console.log(proposition); // TODO: Add to scene
            event.target[0].value = '';
        } else {
            console.log('Invalid proposition:', event.target[0].value);
        }
    }

    return (
        <form id="add-proposition-form" onSubmit={createProposition} className={`${valid ? 'valid' : 'invalid'}`}>
            <input className="primary" type="text" id="add-proposition" onChange={addPropositionChanged} placeholder="JavaScript <is a> Programming Language" />
            <button className="primary" type="submit" disabled={!valid}>Submit</button>
        </form>
    )
}