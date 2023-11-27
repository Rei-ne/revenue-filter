export type Metadata = {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };

  export type ApiResponse = {
    amount: number;
    metadata: Metadata;
    payment_reference: string;
    status: string;
    type: string;
    date: string;
  };

  export type TransactionResponse = {
    Transactions: ApiResponse[];
  };

  export type TransactionSort = 'status' | 'priceAsc' | 'priceDesc';