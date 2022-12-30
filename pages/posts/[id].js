import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'


// return a list of possible values for [id]
// like getStaticProps, getStaticPaths can fetch data from any data source. In this example,
// getAllPostIds may fetch from an API endpoint instead of the file system

// when you export a function called getStaticPaths(Static Site Generation) from a page 
// that uses dynamic routes, Next.js will statically pre-render all the paths specified
// by getStaticPaths.
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }){
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      
    </Layout>
  )
}