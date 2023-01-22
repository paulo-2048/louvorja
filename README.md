# Louvor JA

## Main dependencies

- Vue JS 3 (using composition API preferably) with vite
- Vuetify 3 (next)
- Fastify (server)
- Electron (desktop app)


## Development environment

Clone repository using:

```sh
git clone https://github.com/louvorja/louvorja.git
```

or

```sh
git clone git@github.com:louvorja/louvorja.git
```

Go to project folder created by git:

```sh
cd .\louvorja\
```

Checkout (change to) next develop branch:

```sh
git checkout develop-next
```

Install dependencies and run in development mode:

```sh
yarn
yarn dev
```

Now you can see the running project on your browser:

```
http://localhost:5175/ (App)
http://localhost:5174/ (Server)
```


## Themes

To create a new color theme just copy one of available themes on `src/plugins/themes` and change the colors according your liking.

Just be carefull with:

- Theme id will be filename without extension:
  ```json
  id: id(import.meta)
  ```
- Theme human readable name will be by default the file name (without extension) in word uppercase:
  ```json
  name: name(import.meta)
  ```
- For available colors and options for theme customization go to Vurtify theme instructions: [https://next.vuetifyjs.com/en/features/theme/]()

## Routes

Add a new file to `server/routes` directory, as follow:

```js
export async function install(router, applyPrefix) {
  router.get(applyPrefix("/ping"), function (request, reply) {
    reply.send("pong");
  });
}
```

Change or add routes as you see fit (https://www.fastify.io/docs/latest/Reference/Routes/).

All routes will be prefixed with the module basename (filename without extension) to avoid colision.