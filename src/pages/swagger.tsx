import { GetStaticProps } from 'next';
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const app = (props): JSX.Element => <SwaggerUI url={props.url} />;

export const getStaticProps: GetStaticProps = async () => {
  const url =
    process.env.SWAGGER_URL ||
    'https://raw.githubusercontent.com/Judahh/VUTT/express/swagger.json';
  return {
    props: { url: url },
  };
};

export default app;
