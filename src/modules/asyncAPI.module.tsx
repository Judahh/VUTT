// import App from 'next/app';
import React from 'react';
import AsyncApiComponent from '@asyncapi/react-component';
import "@asyncapi/react-component/lib/styles/fiori.css";

const asyncAPIModule = (props:{url:string}): JSX.Element => <AsyncApiComponent schema={props.url} />;
export default asyncAPIModule;
