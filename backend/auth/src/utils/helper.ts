export default function generateAccountAlias(name: string) {
  const nameParts = name.split(' ');
  const lastName = nameParts[nameParts.length - 1];
  const firstNameInitial = lastName.charAt(0);
  const remainingName = nameParts.slice(0, -1).join(' ');
  const remainingNameCapitalized = remainingName.substring(0, 1).toUpperCase() + remainingName.substring(1);

  return `${firstNameInitial}${remainingNameCapitalized}`;
}
