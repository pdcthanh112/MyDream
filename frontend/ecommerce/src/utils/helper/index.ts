import { getAppData } from '@apis/appApi';
import { AppData } from '@models/AppDataModel';

export const roundNumber = (value: number) => {
  if (value > 1000) {
    const roundedValue = Math.round(value / 100) / 10;
    return `${roundedValue}k`;
  } else {
    return value.toString();
  }
};

// export const getDefaultState = () => {
//   let defaultState: AppData;
//   const response = getAppData().then((response) => {
//      defaultState = {
//       category: response.category.data,
//       subcategory: response.subcategory.data,
//     };
//     return defaultState
//   })
//   return response.then(res => res);
// };

export const getDefaultState = () => {
  let defaultState: AppData = {
    category: [],
    subcategory: [],
  };

  getAppData().then((response) => {
    defaultState = {
      category: response.category.data,
      subcategory: response.subcategory.data,
    };
  });
  console.log('RRRRRRRRRRRRRRRRRRRRRRRR', defaultState);

  return defaultState;
};
