interface Props {
  character: string;
}

export function EquationOperator(props: Props) {
  const { character } = props;
  return <div class="text-5xl flex-none flex flex-col justify-center">{character}</div>;
}
