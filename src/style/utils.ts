import { ResponsiveValue } from 'styled-system';

const keys = ['_', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

export function asResponsiveArray<T>(
  value: ResponsiveValue<T>
): ResponsiveValue<T> {
  return isStyleObject(value) ? createArrayFromValues(value) : value;
}

type StyleObject<T> = Record<typeof keys[number], T>;

function isStyleObject<T>(value: ResponsiveValue<T>): value is StyleObject<T> {
  return !Array.isArray(value) && value !== null && typeof value === 'object';
}

function createArrayFromValues<T>(value: StyleObject<T>) {
  return keys.map((key) => value[key]) as ResponsiveValue<T>;
}
