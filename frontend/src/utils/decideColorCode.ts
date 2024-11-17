const decideColorCode = (value: number) => {
  switch (value) {
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
