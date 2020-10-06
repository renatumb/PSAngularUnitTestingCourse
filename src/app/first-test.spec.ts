describe('My first Test', () => {

  let sut;

  beforeEach(() => {

    sut = {};
  });


  it('should be true if true', () => {

    sut.a = false;
    sut.a = true;

    expect(sut.a).toBe(true);
  });

});
