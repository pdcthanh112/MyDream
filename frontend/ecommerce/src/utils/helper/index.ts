import { gql, useQuery } from "@apollo/client";

export const roundNumber = (value: number) => {
  if (value > 1000) {
    const roundedValue = Math.round(value / 100) / 10;
    return `${roundedValue}k`;
  } else {
    return value.toString();
  }
};

export const getStartedData = () => {
  const { data: category } = useQuery(gql`
    {
      category {
        id
        name
      }
    }
  `);
  const { data: subcategory } = useQuery(gql`
    {
      subcategory {
        id
        name
        category {
          id
          name
        }
      }
    }
  `);
  return { category, subcategory };
}