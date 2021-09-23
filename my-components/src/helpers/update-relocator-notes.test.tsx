import { generateOnePerson, mockCurrentPerson } from '../mock/index';
import { updateRelocatorNotes } from './update-relocator-notes';

describe('update relocator notes', () => {
  it('should update relocator with new note', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2021-09-07').valueOf());
    const mockRelocator = generateOnePerson();
    const mockNote = {
      comment: 'mockRequestId',
      requestId: mockRelocator.requestId,
    };
    const updateRelocator = updateRelocatorNotes(
      mockNote,
      mockCurrentPerson,
      mockRelocator,
    );

    expect(updateRelocator.notes[0]).toStrictEqual({
      id: '',
      comment: mockNote.comment,
      date: new Date('2021-09-07'),
      author: mockCurrentPerson.enName,
      requestId: mockNote.requestId,
    });
  });
});
