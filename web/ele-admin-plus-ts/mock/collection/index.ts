import ledgerApi from './ledger';
import repairApi from './repair';
import imageApi from './image';
import cancellationApi from './cancellation';
import accidentApi from './accident';
import catalogApi from './catalog';
import bookApi from './book';

export default [
  ...ledgerApi,
  ...repairApi,
  ...imageApi,
  ...cancellationApi,
  ...accidentApi,
  ...catalogApi,
  ...bookApi
];
