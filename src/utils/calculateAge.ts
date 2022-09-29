import { differenceInYears, parse } from 'date-fns';

export default function calculateAge(
  birthDate: string,
  currentDate = new Date(),
) {
  const date = parse(birthDate, 'yyyy-MM-dd', currentDate);
  const age = differenceInYears(currentDate, date);
  return age;
}
