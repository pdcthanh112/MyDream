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

// export const getDefaultState = async () => {
//   let defaultState: AppData = {
//     category: [],
//     subcategory: [],
//   };
//   await getAppData().then((response) => {
//     defaultState = {
//       category: response.category.data,
//       subcategory: response.subcategory.data,
//     };
//   });
//  return defaultState;
// };
