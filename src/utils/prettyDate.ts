import { format, parse } from 'date-fns';

export default function prettyDate(date: string) {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(parsedDate, 'dd/MM/yyyy');
}
