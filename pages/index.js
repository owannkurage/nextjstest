import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { client } from '../libs/client';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })
//SSGを使ってデータを取得(更新頻度の高くないページはSSG)
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: 'news',
  });
  console.log(data);//確認するとターミナルに表示される
//SSGを使うときはいかでデータをreturnさせる
  return {
    props: {
      news:data.contents,
    },
  };
};

//頻繁に行うSSR

//Linkについて。(めちゃくちゃ早く)
export default function Home({news}) {
  return (
    <div className={styles.main}>
      {news.map((news)=>(
        <li key={news.id}>
          <Link href={`news/${news.id}`}>
          {news.title}
          </Link>
        </li>
      ))}
    </div>
  )
}
