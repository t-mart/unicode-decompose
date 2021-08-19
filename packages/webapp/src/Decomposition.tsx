import { Character } from "./Character";
import { CharacterEquation } from "./CharacterEquation";
import { codepointNames } from "./CodepointNames";

/**
 *
 * @param text Input string to break up into character groups
 * @returns
 */
function groupFromText(text: string) {
  const groups: Character[][] = [];
  let thisGroup: Character[] = [];

  for (const character of text.normalize("NFD").split("")) {
    const codepoint = character.codePointAt(0)!;
    const { isCombiner, name } = codepointNames[codepoint.toString()];
    if (!isCombiner) {
      groups.push(thisGroup);
      thisGroup = [{ s: character, isCombiner: false, name }];
    } else {
      thisGroup.push({ s: character, isCombiner: true, name });
    }
  }
  groups.push(thisGroup);
  return groups
    .filter((group) => group.length > 0)
    .map((group) => <CharacterEquation characters={group} />);
}

interface Props {
  text: string;
}

export function Decomposition(props: Props) {
  const { text } = props;
  const groupTiles = groupFromText(text);
  return <div class="flex flex-col space-y-8">{groupTiles}</div>;
}
