/* eslint-disable filenames/match-regex */
import App from 'next/app';

export default class MyApp extends App {
  /*readonly*/ state = {
    loading: true,
  };
  render() {
    const { Component, pageProps } = this.props;

    const page = (
      <>
        <Component {...pageProps} />
      </>
    );
    return page;
  }
}
