export default function getCurrentSearchParams(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams.entries());
}
