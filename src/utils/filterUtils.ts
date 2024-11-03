
export type Operator =
  | "equals"
  | "contains"
  | "starts_with"
  | "ends_with"
  | "greater_than"
  | "less_than";

export const filterFn = <T>(row: any, columnId: string, filterValue: { value: any, operator: Operator }): boolean => {
  const value = row.original[columnId as keyof T];
  if (value === null) {
    return false;
  }

  const valueStr = value.toString();
  const filterValueStr = filterValue.value.toString();

  switch (filterValue.operator) {
    case "equals":
      return valueStr === filterValueStr;
    case "less_than":
      if (isNaN(value) || isNaN(filterValue.value)) {
        return false;
      }
      return Number(value) < Number(filterValue.value);
    case "greater_than":
      if (isNaN(value) || isNaN(filterValue.value)) {
        return false;
      }
      return Number(value) > Number(filterValue.value);
    case "contains":
      return valueStr.includes(filterValueStr);
    case "starts_with":
      return valueStr.startsWith(filterValueStr);
    case "ends_with":
      return valueStr.endsWith(filterValueStr);
    default:
      return true;
  }
};
