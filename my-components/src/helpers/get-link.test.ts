import { getLink } from './get-link';

describe('getLink', () => {
  const mockLink = 'mylink/:id';
  const mockId = 'test';

  it('getLink change ":/id" to right id', () => {
    const changeLink = getLink(mockLink, mockId);

    expect(changeLink).toBe('mylink/test');
  });
});
