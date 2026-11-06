// Provider boundary: the released chapter always uses deterministic authored scenes.
// A future AI provider must run on a server, authorize requests, filter knowledge
// to the addressed character, and validate returned choices before persisting them.
import {advance, scenes} from './story.mjs';
export const scriptedProvider={mode:'scripted',async act(state,choiceIndex){return advance(state,choiceIndex);}};
export function characterContext(state,character){if(!Object.hasOwn(state.knowledge,character))throw Error('Unknown character');return {scene:state.scene,location:scenes[state.scene].place,relationship:state.relations[character],sharedFacts:[...state.knowledge[character]]};}
// Free-text actions deliberately remain disabled until a real server provider exists.
export const capabilities={freeText:false,ai:false};
