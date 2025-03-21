import { BasicTable } from 'shared/ui/Table';

export type DiaryProps<T extends object & { id: string }> = {
  operations?: T[] | null;
};

export const Diary = <T extends object & { id: string }>(
  props: DiaryProps<T>,
) => {
  const { operations } = props;

  return <BasicTable operations={operations} />;
};
