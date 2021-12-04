import { GetStaticProps } from 'next';
import React from 'react';
import AsyncAPIModule from '../modules/asyncAPI.module';
import ReactDom from 'react-dom';

const app = (props: { url: string }): JSX.Element => {
  if (typeof window !== 'undefined')
    return ReactDom.render(
      <AsyncAPIModule url={props.url}/>,
      document.body
    );
  return (
    <></>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  const url =
    process.env.ASYNC_API_URL ||
    'https://raw.githubusercontent.com/Judahh/VUTT/next/asyncapi.json';
  return {
    props: { url: url },
  };
};

export default app;
