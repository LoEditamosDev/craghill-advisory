declare module "country-telephone-data" {
  export type CountryTelephoneData = {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    format?: string;
  };

  export const allCountries: CountryTelephoneData[];
}
