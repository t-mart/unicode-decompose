import { UnicodeCharacter } from "./UnicodeCharacter";
import { EquationTerm } from "./EquationTerm";

interface Props {
  character: UnicodeCharacter;
}

export function EquationTermRHS(props: Props) {
  const { character } = props;

  const compartURL = `https://www.compart.com/en/unicode/${character.codepointString}`;

  return (
    <EquationTerm>
      <div class="font-mono">
        <a
          href={compartURL}
          class="underline hover:text-pink-500"
        >
          {character.codepointString}
        </a>
      </div>
      <div class="text-5xl">
        {character.toStringCombinedIfNecessary()}
      </div>
      <div class="capitalize">{character.name.toLowerCase()}</div>
    </EquationTerm>
  );
}
