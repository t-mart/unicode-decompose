import CodepointNamesJSON from "./data/codepoint-names.json";

export const codepointNames: Record<
  string,
  { name: string; isCombiner: boolean }
> = CodepointNamesJSON;
