/* eslint-disable semi */
// export interface IProvider {
//   logo_path: string;
//   provider_id: number;
//   provider_name: string;
//   display_priority: number;
// }

import IProvider from './IProvider';

export default interface IWatchProvider {
  rent: IProvider[];
  buy: IProvider[];
}
