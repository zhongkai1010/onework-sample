import artistApi from './artist';
import workApi from './work';
import exhibitionApi from './exhibition';
import publishedWorkApi from './published-work';

export default [
  ...artistApi,
  ...workApi,
  ...exhibitionApi,
  ...publishedWorkApi
];
