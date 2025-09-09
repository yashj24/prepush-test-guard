import { add } from '../src/add';
import { expect } from 'chai';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).to.equal(5);
    expect(add(-1, 1)).to.equal(0);
  });
});
