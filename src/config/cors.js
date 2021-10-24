import { WHITE_LIST_DOMAIN } from '~/utilities/constants';

export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITE_LIST_DOMAIN.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
