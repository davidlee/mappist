import { expect, test } from 'vitest'
import ConceptRepository from './ConceptRepository.js'

test('ConceptRepository exists', () => {
    const repository = ConceptRepository();
    expect(repository).toBeDefined();
});

test('ConceptRepository constructor :: empty', () => {
    const repository = ConceptRepository();
    expect(repository.propositions).toEqual([]);
    expect(repository.concepts).toEqual([]);
    expect(repository.relations).toEqual([]);
    expect(repository.conceptsByName).toEqual(new Map());
});

test('ConceptRepository constructor :: parse', () => {
    const repository = ConceptRepository();
    expect(repository.parse('JavaScript <is a> Programming Language')).toEqual({
        subject: 'JavaScript',
        predicate: 'is a',
        object: 'Programming Language'
    });

    expect(repository.parse('my cat\'s breath smells like cat food')).toEqual(null);
    expect(repository.parse('Arrows -> goes -> thisaways')).toEqual(null);
    expect(repository.parse('<XML><is /></XML>')).toEqual(null);
});

test('ConceptRepository add :: a simple proposition', () => {
    const repository = ConceptRepository();
    repository.add('JavaScript <is a> Programming Language');
    expect(repository.propositions.length).toEqual(1); 
    const proposition = repository.propositions[0];
    expect(proposition?.subject).toEqual('JavaScript');
    expect(proposition?.predicate).toEqual('is a');
    expect(proposition?.object).toEqual('Programming Language');
    expect(repository.concepts.length).toEqual(2);
    const js = repository.concepts.find(c => c.name === 'JavaScript');
    const pl = repository.concepts.find(c => c.name === 'Programming Language');
    expect(js?.name).toEqual('JavaScript');
    expect(pl?.name).toEqual('Programming Language');
    expect(js?.relations.length).toEqual(1);
    const relation = js?.relations[0];    
    expect(relation?.predicate).toEqual('is a');
    expect(relation?.objects.length).toEqual(1);
    expect(relation?.objects[0]?.name).toEqual('Programming Language');
    expect(relation?.objects[0]).toEqual(pl);
    expect(pl?.relations.length).toEqual(0);
});


test('ConceptRepository add :: propositions with the same subject', () => {
    const repository = ConceptRepository();

    repository.add('JavaScript <is a> Programming Language');
    repository.add('JavaScript <is a> Functional Programming Language');
    repository.add('JavaScript <has> Prototypical Inheritance');
    repository.add('JavaScript <is> Statically Typed');

    expect(repository.concepts.length).toEqual(5);
    expect(repository.relations.length).toEqual(3);
    const is_a = repository.relations.find(r => r.predicate === 'is a');
    expect(is_a?.objects.length).toEqual(2);
    expect(is_a?.objects[0]?.name).toEqual('Programming Language');
    expect(is_a?.objects[1]?.name).toEqual('Functional Programming Language');
    const has = repository.relations.find(r => r.predicate === 'has');
    expect(has?.objects.length).toEqual(1);
    expect(has?.objects[0]?.name).toEqual('Prototypical Inheritance');
    const is = repository.relations.find(r => r.predicate === 'is');
    expect(is?.objects.length).toEqual(1);
    expect(is?.objects[0]?.name).toEqual('Statically Typed');
});

test('ConceptRepository toString', () => {
    const repository = ConceptRepository();
    repository.add('JavaScript <is a> Programming Language');
    repository.add('JavaScript <is a> Functional Programming Language');
    repository.add('JavaScript <has> Prototypical Inheritance');
    repository.add('JavaScript <is> Statically Typed');
    console.log(repository.toString());
    expect(repository.asStrings()).toEqual(
        [
            'JavaScript <is a> Programming Language',
            'JavaScript <is a> Functional Programming Language',
            'JavaScript <has> Prototypical Inheritance',
            'JavaScript <is> Statically Typed'
        ]
    );
    expect(repository.toString()).toEqual(
        'JavaScript <is a> Programming Language\n'+
        'JavaScript <is a> Functional Programming Language\n'+
        'JavaScript <has> Prototypical Inheritance\n'+
        'JavaScript <is> Statically Typed'
    );
});

test('ConceptRepository add :: no duplicates', () => {
    const repository = ConceptRepository();
    repository.add('JavaScript <is a> Programming Language');
    repository.add('JavaScript <is a> Programming Language');
    expect(repository.concepts.length).toEqual(2);
    expect(repository.relations.length).toEqual(1);
    repository.add('Haskell <is a> Programming Language');
    expect(repository.concepts.length).toEqual(3);
    expect(repository.relations.length).toEqual(2);
    repository.add('Haskell <is a> Functional Programming Language');
    repository.add('JavaScript <is a> Functional Programming Language');
    console.log(repository.asStrings());
    expect(repository.concepts.length).toEqual(4);
    expect(repository.relations.length).toEqual(2);
    expect(repository.propositions.length).toEqual(4);
    expect(repository.asStrings()).toEqual(
        [
            'JavaScript <is a> Programming Language',
            'Haskell <is a> Programming Language',
            'Haskell <is a> Functional Programming Language',
            'JavaScript <is a> Functional Programming Language',
        ]
    );
}); 

test('ConceptRepository traversal', () => {
   // expect().pending() 
})