/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Image from 'next/image';
import {
  Row,
  Badge,
  Carousel,
} from 'react-bootstrap';
// @ts-ignoreS
import Layout from '../layout.tsx';

interface portoDetailProps {
  portofolio: any;
}

const shimmer = (w:any, h:any) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
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

export default function portoDetail(props: portoDetailProps) {
  const { portofolio } = props;
  const [data, setstate] = useState(portofolio);
  return (
    <Layout pageTitle="Portofolio">
      <Row className="portoDetail">
        <div className="col-lg-6 col-sm-12">
          <Carousel fade interval={3000} variant="dark">
            {data.photo.map((picture:any) => (
              <Carousel.Item>
                <div className="imgWrap">
                  <Image
                    className="image"
                    layout="fill"
                    objectFit="contain"
                    src={picture.url}
                    alt={picture.alt}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475),
                    )}`}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-6 col-sm-12">
          <h3 className="title w-50">{portofolio.title}</h3>
          <Badge pill bg="primary">
            {portofolio.type}
          </Badge>
          {' '}
          <p>{portofolio.desc}</p>
          <footer className="blockquote-footer">{portofolio.event}</footer>
        </div>
      </Row>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://my-json-server.typicode.com/wandalisaa/myAPI/portofolio');
  const dataPortofolio = await res.json();

  const paths = dataPortofolio.map((portos: any) => ({
    params: {
      id: `${portos.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params;
  const res = await fetch(`https://my-json-server.typicode.com/wandalisaa/myAPI/portofolio/${id}`);
  const portofolio = await res.json();

  return {
    props: {
      portofolio,
    },
  };
}
