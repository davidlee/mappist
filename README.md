# concept mapping

## Use Cases (Reqs)

- MUST
  - enter a proposition
  - change the focal concept
  - edit / rename a Concept
  - delete a Concept & any relations (confirm)
  - delete a Relation
- SHOULD
  - entry autocomplete on both Concepts and Relation
  - zoom
  - search for a node or relationship
  - export text (D2, Graphviz / dot, and/or Mermaid)
  - browser history support (back button > previously focused concept)
  - load graph from text import
- COULD
  - add description / definition field to Concept, and editing
  - versioning
  - auth
  - persistence 
    - local
    - cloud
  - select to show / hide nodes from view
  - add sliders
    - change the radius of shown connections (Kevin Bacon number)
    - change the gravity, repulsion, spring force
  - manual (tweak) drag & drop layout mode
  - persistence of manually tweaked layouts
  - export image (can just screenshot)
  - track where you've been so you know whether you've traversed the whole thing (explain mode)
  - maybe: fancy search on node / relationships (like LINQ / postgres JSON search?)

## Dependencies:
- Graph layout (the hard bit)
  - implement forces for force-directed layout
    - gravity
    - spring force
    - node repulsion
  - Orientation?
    - LR / TD / radial?
  - Accumulate a collection to render 
    - by traversing the items in the viewport from the Concept with focus 


## Done / Resolved
- How do we do layout?
  - force directed graph?
  - human laid out?
    - how to deal with traversal?
    - kinda redundant ...
- How we do data
  - data structure that represents a concept
    - name
    - definition / describe 
    - markdown?
      - we don't wanna build obsidian / tags / etc
  - treelike hierarchy of things
    - bubble things with no subject relations to the top?
    - re-render the thing when the data structure changes
  - relation
    - subject
    - predicate
    - object
- ConceptA -> is a -> ConceptB
- Do we render or just prepare a DSL? 
  - DSL + 
    - maybe easier
    - jankier / poor fps
  - rendering
    - more custom
    - more harderer, prolly
- How do we render?
  - what do we render to?
    - PNG
    - DOM
    - canvas
    - webGL
    - desktop / vulkan / openGL / etc
    - WASM
