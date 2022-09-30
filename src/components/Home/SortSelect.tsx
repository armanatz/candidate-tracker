import { Select, Option } from 'components/DS';

type SelectedValue = 'none' | CandidateSortKeys;

type SortSelectProps = {
  selectedValue: SelectedValue;
  onChange: (value: SelectedValue) => void;
};

export default function SortSelect({
  selectedValue,
  onChange,
}: SortSelectProps) {
  return (
    <>
      <label htmlFor="sorting">Sort By:</label>
      <Select
        ariaLabel="Sort by"
        placeholder="Select sorting..."
        name="sorting"
        value={selectedValue}
        onChange={(value: 'none' | CandidateSortKeys) => onChange(value)}
      >
        <Option value="none">None</Option>
        <Option value="position_applied">Position Applied</Option>
        <Option value="year_of_experience">Years of Experience</Option>
        <Option value="application_date">Application Date</Option>
      </Select>
    </>
  );
}
