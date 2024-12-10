export const formRoutes = [
    { key: "step1", title: "ActionForm" },
    { key: "step2", title: "LocationForm" },
    { key: "step3", title: "PropertyForm" },
    { key: "step4", title: "BuyForm" },
    { key: "step5", title: "SituationForm" },
    { key: "step6", title: "DateForm" },
    { key: "step7", title: "LoanForm" },
    { key: "step8", title: "GiftFundForm" },
  ]

 export const formatNumberWithCommas = (number: number): string => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  export const formatDate = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  