/* eslint-disable no-unused-vars */
import { Card, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
// @ts-ignore
import Layout from '../layout.tsx';

// effect shimmer for image loading
const shimmer = (w: any, h: any) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#fffff" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: any) => (typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str));

export async function getStaticProps() {
  const res = await fetch('https://my-json-server.typicode.com/wandalisaa/myAPI/portofolio?_limit=3');
  const dataPortofolio = await res.json();

  return {
    props: {
      dataPortofolio,
    },
  };
}

interface portoProps{
  dataPortofolio: [];
}

export default function portofolio(props: portoProps) {
  const route = useRouter();
  const { dataPortofolio } = props;
  const [data, setstate] = useState(dataPortofolio as any[]);
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = await fetch(
      `https://my-json-server.typicode.com/wandalisaa/myAPI/portofolio?_start=${posts.length}&_limit=3`,
    );
    const newPosts = await res.json();
    setPosts((post) => [...post, ...newPosts]);
  };

  return (
    <Layout pageTitle="Portofolio">
      <Row className="portofolio">
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePost}
          hasMore={hasMore}
          className="row"
          loader={<br />}
        >
          {posts.map((porto) => (
            <div className="col-lg-4 col-sm-12" key={porto.id}>
              <Card>
                <div className="bgWarp">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={porto.photo[0].url}
                    placeholder="blur"
                    quality={2}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475),
                    )}`}
                    alt={porto.title}
                  />
                </div>
              </Card>
              <Card className="desc">
                <Card.Body
                  onClick={() => route.push(`/portofolio/${porto.id}`)}
                  className="click"
                >
                  <span>{porto.types}</span>
                  <blockquote className="blockquote mb-0">
                    <p>{porto.title}</p>
                    <footer className="blockquote-footer">
                      {' '}
                      <cite title="Source Title">{porto.event}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </div>
          ))}
        </InfiniteScroll>
      </Row>
    </Layout>
  );
}
