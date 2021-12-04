import { GetStaticProps } from 'next';
import React from 'react';
import ReactDom from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Doc from '../styles/doc';

const app = (props: { url: string; data: string }): JSX.Element => {
  if (typeof window !== 'undefined')
    return ReactDom.render(
      <Doc>
        <ReactMarkdown
          children={props.data}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        />
      </Doc>,
      document.body
    );
  return (
    <>
      <ReactMarkdown
        children={props.data}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const url =
    process.env.README_URL ||
    'https://raw.githubusercontent.com/Judahh/VUTT/main/README.md';
  const response = await axios.get(url);
  return {
    props: { url: url, data: response.data },
  };
};
export default app;
