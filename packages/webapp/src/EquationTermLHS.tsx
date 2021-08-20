import { EquationTerm } from "./EquationTerm";
import { UnicodeCharacter } from "./UnicodeCharacter";


interface Props {
  group: UnicodeCharacter[];
}

export function EquationTermLHS(props: Props) {
  const { group } = props;

  let combinedArray: string[] = group.map((char) => char.toString())

  if (group[0].isCombiner) {
    combinedArray.unshift("◌")
  }
  const combined = combinedArray.join("");

  return (
    <EquationTerm>
      <div class="text-7xl font-bold">{combined}</div>
    </EquationTerm>
  );
}
