const decideLabel = (timeCategory: number) => {
  switch (timeCategory) {
    case 0:
      return '短時間';
    case 1:
      return '数時間';
    case 2:
      return '1日';
    default:
      return '短時間';
  }
}
