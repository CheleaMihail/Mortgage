// api.ts
export const fetchMortgageData = (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ property_type: "Single Family Home", loan_amount: 13000, own_situation:"Practicing Hospital",purchase_date:"25 Dec 2024" });
      }, 1000);
    });
  };

  