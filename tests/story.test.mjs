import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialState,scenes,advance,validSave,outcome,roles,interpolate} from '../lib/story.mjs';
import {characterContext,capabilities} from '../lib/provider.mjs';
const profile={name:'Ari',role:'envoy',pronouns:'they',style:'obsidian'};
const save=state=>({version:2,profile,state});
let endings=[];let reached=new Set();
function walk(state){assert.ok(validSave(save(state)));reached.add(state.scene);if(state.scene==='ending'){endings.push(state);return;}scenes[state.scene].choices.forEach((_,i)=>walk(advance(state,i)));}
test('every authored route terminates and every reachable save replays',()=>{walk(structuredClone(initialState));assert.equal(reached.size,Object.keys(scenes).length);assert.ok(endings.length>50);console.log(`${endings.length} complete paths verified across ${reached.size} scenes`);});
test('exposure changes outcome depending on authenticated evidence',()=>{const poor=advance(advance(advance(advance(initialState,0),1),1),2);const end=advance(poor,0);assert.equal(end.ending,'expose');assert.match(outcome(end).title,/witness/);const rich=advance(advance(advance(advance(advance(initialState,0),1),0),0),2);assert.match(outcome(advance(rich,0)).title,/crack/);});
test('knowledge is character specific and provider context excludes others',()=>{const state=advance(advance(initialState,0),1);assert.deepEqual(state.knowledge.vance,['wafer']);assert.deepEqual(state.knowledge.aldric,[]);assert.deepEqual(characterContext(state,'aldric').sharedFacts,[]);assert.equal(capabilities.ai,false);assert.equal(capabilities.freeText,false);});
test('invalid choices and tampered saves are rejected without mutation',()=>{const original=JSON.stringify(initialState);assert.throws(()=>advance(initialState,99));assert.equal(JSON.stringify(initialState),original);const state=advance(initialState,0);state.relations.vance=999;assert.equal(validSave(save(state)),false);assert.equal(validSave({version:1}),false);assert.equal(validSave({...save(initialState),profile:{...profile,role:'__proto__'}}),false);assert.equal(validSave({...save(initialState),state:{...initialState,history:[{scene:'ending',index:0}]}}),false);});
test('all roles interpolate personalized prose without unresolved tokens',()=>{for(const role of Object.keys(roles))for(const scene of Object.values(scenes))for(const [,line]of scene.lines)assert.doesNotMatch(interpolate(line,{...profile,role},initialState),/\{\w+\}/);});
