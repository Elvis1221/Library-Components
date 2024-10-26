import { useMemo } from 'react';

import { TableBodyColumnType, TableHeaderColumnType } from '../interfaces/table';

type TableColumnsType<T> = TableHeaderColumnType & TableBodyColumnType<T>;

type TableStructure<T> = {
  columnsHeader: TableHeaderColumnType[];
  columnsBody: TableBodyColumnType<T>[];
};

export const useTableStructure = <T>(
  initialColumns: TableColumnsType<T>[]
): TableStructure<T> => {
  return useMemo(() => (
    initialColumns.reduce(
      (acc, column) => {
        acc.columnsHeader.push({
          id: column.id,
          className: column.className || '',
          label: column.label || '',
        });

        acc.columnsBody.push({
          id: column.id,
          className: column.className || '',
          content: column.content,
          entityTransformer: column.entityTransformer,
        });

        return acc;
      },
      {
        columnsHeader: [],
        columnsBody: [],
      } as TableStructure<T>
    )), []);
};
