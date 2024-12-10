export interface IMortgageData{
    loanAmount:number,
    ownSituation:string,
    propertyType:string,
    purchaseDate:string
  }

export enum ActionType {
    Buy,
    Refinance,
  }

export enum PropertyType {
    SingleFamilyHome,
    TownHome,
    Condominium,
    Apartment,
    Other
  }

  export enum SituationEnum {
    PracticingHospitalist,
    ExitingResidency,
    ExitingFollowship,
    SelfEmployedClinician
  }
