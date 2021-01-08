# VUTT

![Publish](https://github.com/Judahh/VUTT/workflows/Publish/badge.svg)

A simple repository for managing tools with their names, links, descriptions and
tags

## [SWAGGER](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/Judahh/VUTT/main/swagger.json)

## Unity Tests

```bash
$ npm install
$ npm test
```

or

```bash
$ yarn
$ yarn test
```

## Integration Tests

To run the test suite, first install Docker and dependencies, then run
`docker-compose up -d` and `npm test`:

```bash
$ docker-compose up -d
$ npm install
$ npm integration
```

or

```bash
$ docker-compose up -d
$ yarn
$ yarn integration
```

## Manual Tests

To run the server on localhost, first install Docker and dependencies, then run
`docker-compose up -d` and `npm dev` or `npm build` and `npm start`:

```bash
$ docker-compose up -d
$ npm install
$ npm dev
```

or

```bash
$ docker-compose up -d
$ yarn
$ yarn dev
```

It will run on port 3000


## Environment

- Staging: [https://vutt-git-development.judahh.vercel.app](https://vutt-git-development.judahh.vercel.app)
- Production: [https://vutt.vercel.app](https://vutt.vercel.app)

## People

The original author of Journaly is [Judah Lima](https://github.com/Judahh)

[List of all contributors](https://github.com/Judahh/VUTT/graphs/contributors)
