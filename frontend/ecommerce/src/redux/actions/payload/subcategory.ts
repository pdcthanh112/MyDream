import { Subcategory } from "@models/SubcategoryModel";

export interface FetchSubcategoryStartPayload {
  params: { token: string };
}
export interface FetchSubcategorySucceededPayload {
  data: Subcategory[];
}
export interface FetchSubcategoryFailedPayload {
  error: string;
}
