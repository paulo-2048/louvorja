# Louvor JA

## Main dependencies

- Vue JS 3 (using composition API preferably) with vite
- Vuetify 3 (next)
- Lodash for utilities


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

```sh
http://localhost:5173/
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
