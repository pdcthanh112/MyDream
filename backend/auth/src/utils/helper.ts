export default function generateAccountAlias(name: string): string {
  let result = '';

  const nameParts = name.split(' ');
  const lastName = nameParts[nameParts.length - 1];
  result = result + removeAccents(lastName);

  for (let i = 0; i < nameParts.length - 1; i++) {
    const name = nameParts[i];
    if (name.length > 0) {
      let letter = name.charAt(0).toUpperCase();
      result += removeAccents(letter);
    }
  }

  return result;
}

function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
