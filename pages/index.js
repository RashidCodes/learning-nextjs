import Head from 'next/head'
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date'

// this runs for every request in Dev
// because getStaticProps is meant to be run at build time,
// you won't be able to use data that's only available during request time 
// such as query params (.com/?rashid=100)
// getStaticProps is only allowed in page files.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}