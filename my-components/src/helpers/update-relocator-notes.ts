import { ICurrentPerson } from 'components/user-info/user-info';
import { INotesRequest } from 'pages/edit-request/components/add-notes/add-notes';
import { IResult } from 'pages/relocation/relocation.const';

export const updateRelocatorNotes = (
  note: INotesRequest,
  currentPerson: ICurrentPerson,
  relocator: IResult,
): IResult => {
  const updatedRelocator = { ...relocator };
  updatedRelocator.notes.unshift({
    id: '',
    comment: note.comment,
    date: new Date(Date.now()),
    author: currentPerson.enName,
    requestId: note.requestId,
  });

  return updatedRelocator;
};
