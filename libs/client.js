import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: '1490qd8lda',  // service-domain は XXXX.microcms.io の XXXX 部分
    apiKey: process.env.API_KEY,///envファイルに隠す(みられてはいけないデータ)
  });

