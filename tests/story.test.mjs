import test from 'node:test';
import assert from 'node:assert/strict';
import {advance,initialState,scenes,validSave} from '../lib/story.mjs';
test('all four choice paths reach a valid ending',()=>{for(let a=0;a<2;a++)for(let b=0;b<2;b++){const state=advance(advance(initialState,a),b);assert.equal(state.scene,'alliance');assert.equal(state.trust+state.influence,4);assert.ok(validSave({version:1,name:'Ari',pronouns:'they',state}));}});
test('invalid and terminal choices are rejected',()=>{assert.throws(()=>advance(initialState,9));assert.throws(()=>advance({scene:'alliance'},0));});
test('corrupted saves are rejected',()=>{for(const save of [null,{}, {version:1,name:'Ari',pronouns:'they',state:{scene:'toString',trust:0,influence:0}}, {version:1,name:'Ari',pronouns:'they',state:{scene:'arrival',trust:4,influence:0}}])assert.equal(validSave(save),false);});
test('every story link resolves',()=>{for(const scene of Object.values(scenes))for(const choice of scene.choices)assert.ok(Object.hasOwn(scenes,choice.next));});
