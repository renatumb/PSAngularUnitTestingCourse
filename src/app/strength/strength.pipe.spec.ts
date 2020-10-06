import {StrengthPipe} from './strength.pipe';

describe('strength.pipe', () => {
  it('should display week if strengh is 5', () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display week if strengh is 10', () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });

  it('should display week if strengh is >20', () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(100)).toEqual('100 (unbelievable)');
  });
});
