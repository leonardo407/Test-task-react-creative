export interface IMainStore {
  beerList: IBeerItem[];
  isSendingRequest: boolean;
}

export interface IBeerItem {
  name: string;
  image_url: string;
  description: string;
  abv: string;
}
