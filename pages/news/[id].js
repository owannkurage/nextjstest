import { client } from '../../libs/client';
import styles from "../../styles/Home.module.scss";
//SSGの関数を使用
//contextは引数で渡さないと受け取れない
export async function getStaticProps(context) {
    //IDを取得
    const id=context.params.id;//URLのパラメタのIDヲシュトク
    const data = await client.get({
      endpoint: 'news',
      contentId: id,
    });
    console.log(data);//確認するとターミナルに表示される
  //SSGを使うときはいかでデータをreturnさせる
    return {
      props: {
        news:data,//今回は一覧では無いので、dataのみ
      },
    };
  };

  //どこのIDかの判別をつけるためにおまじない
  export const getStaticPaths= async () => {
    //パスを取得する方法
    const data = await client.get({
        endpoint: 'news'
      });
    const paths=data.contents.map((content)=>`/news/${content.id}`);//SSGしたいパス
    return {
        paths,
        fallback: false, // can also be true or 'blocking'
      };

  };

  //引数のnewsはpropsのキーから取得
export default function NewsId({news}){
return <main className={styles.main}>
    <h1 className={styles.title}>タイトル：{news.title}</h1>
    <p className={styles.publishedAt}>公開日:{news.publishedAt}</p>
    <div  className={styles.post} dangerouslySetInnerHTML={{__html:`${news.content}`}}></div>
</main>;
}