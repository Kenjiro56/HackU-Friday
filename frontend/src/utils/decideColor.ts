export const decideColorCode = (timeCategory: number) => {
  switch (timeCategory) {
    case 0:
      return '#fcc605';
    case 1:
      return '#6cb9ff';
    case 2:
      return '#fc842e';
    default:
      return '#fcc605';
  }
}


export const decideColorTextClass = (prefix: string ,timeCategory: number) => {
  return `${prefix}-${decideColorCode(timeCategory)}`;
}
