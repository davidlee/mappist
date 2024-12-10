
export interface Proposition {
    subject: string;
    predicate: string;
    object: string;
}

export interface Concept {
    name: string;
    relations: Relation[];
    description: string;
}

export interface Relation {
    subject: Concept;
    predicate: string;
    objects: Concept[];
}

interface ConceptRepository {
    propositions: string[];
    concepts: Concept[];
    relations: Relation[];
    conceptsByName: Map<string, Concept>;
    relationNames: string[];
}

export function Proposition(props: {
    self: string;
    relationship: string;
    other: string;
}) {
    return {
        self: props.self,
        relationship: props.relationship,
        other: props.other
    }
}

const VALID_PROPOSITION_REGEX = /^(?<subject>[^<]+) <(?<predicate>[^<]+)> (?<object>[^<]+)$/;

export function parse (string: string) { 
    const match = string.trim().match(VALID_PROPOSITION_REGEX);
    if(match && 
        match.groups && 
        match.groups.subject && 
        match.groups.predicate && 
        match.groups.object) {
        return ({
            subject: match.groups.subject,
            predicate: match.groups.predicate,
            object: match.groups.object
        });
    }
    return null;
}


export default function ConceptRepository() {
    const propositions: Proposition[] = [];
    const concepts: Concept[] = [];
    const relations: Relation[] = [];
    const conceptsByName: Map<string, Concept> = new Map();
    const relationNames: string[] = [];

    const add = (string: string) => {
        const proposition = parse(string);
        if(proposition && !propositions.some(p => p.subject === proposition.subject && p.predicate === proposition.predicate && p.object === proposition.object)) {
            propositions.push(proposition);
            let subject = conceptsByName.get(proposition.subject);
            if (!subject) {
                subject = { name: proposition.subject, relations: [], description: '' };
                concepts.push(subject);
                conceptsByName.set(proposition.subject, subject);
            }

            let object = conceptsByName.get(proposition.object);
            if (!object) {
                object = { name: proposition.object, relations: [], description: '' };
                concepts.push(object);
                conceptsByName.set(proposition.object, object);
            }

            let relation = subject.relations.find(r => r.predicate === proposition.predicate);
            if (relation) {
                if (!relation.objects.includes(object)) {
                    relation.objects.push(object);
                }
            } else {
                relation = { subject: subject, predicate: proposition.predicate, objects: [object] };
                relations.push(relation);
                relationNames.push(proposition.predicate);
                subject.relations.push(relation);
            }
        } else {
            console.error(`Invalid proposition: ${string}`);
            return null;
        } 
    }

    const asStrings = () => {
        return propositions.map(p => `${p.subject} <${p.predicate}> ${p.object}`);
    }

    const toString = () => {
        return asStrings().join('\n');
    }

    return {
        propositions,
        concepts,
        relations,
        conceptsByName,
        relationNames,
        parse,
        add,
        asStrings,
        toString
    }

}