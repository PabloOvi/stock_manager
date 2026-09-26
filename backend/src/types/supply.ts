export interface Supply {
  id: number;
  name: string;
  brand: string;
  mainCategory: string;
  subcategories: string[];
  amount: number;
  dateToExpire: string;
  status: boolean;
}

export interface CreateSupply {
  name: string;
  brand: string;
  mainCategory: string;
  amount: number;
  dateToExpire: string;
}