export function parseCustomError(error: any, contract: any) {
  if (error?.revert) {
    return error.revert;
  }
  const data = error.data;
  if (typeof data !== "string" || !data.startsWith("0x")) {
    return null;
  }
  const selector = data.substring(0, 10);
  const fragment = contract.interface.fragments.find((fragment: any) => fragment.selector === selector);
  if (!fragment) {
    return null;
  }
  return {
    name: fragment.name,
    signature: fragment.format(),
    args: contract.interface.decodeErrorResult(fragment, data),
  };
}
