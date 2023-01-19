<template>
  <div class="d-flex flex-nowrap justify-center">
    <v-card variant="tonal" class="v-col-auto d-none d-sm-block">
      <template v-slot:prepend>
        <v-icon size="x-large">mdi-church</v-icon>
      </template>
      <template v-slot:title>Liturgy</template>
      <template v-slot:subtitle>
        <span class="d-none d-md-block">
          Your church service well organized
        </span>
      </template>

      <template v-slot:text>
        <span class="d-none d-md-block">
          Use this options to create a structured schedule
        </span>
      </template>
      <template v-slot:actions>
        <v-btn block :to="{ name: 'liturgy' }">Acessar</v-btn>
      </template>
    </v-card>

    <div class="v-col-auto text-center text-primary logo-wrapper">
      <div class="logo"></div>

      <h1 class="text-h4 pa-10">Louvor JA</h1>
      <p class="text-h6">Bem vindo!</p>
    </div>

    <v-card variant="tonal" class="v-col-auto d-none d-sm-block">
      <template v-slot:append>
        <v-icon size="x-large">mdi-toolbox</v-icon>
      </template>
      <template v-slot:title>Tools</template>
      <template v-slot:subtitle>
        <span class="d-none d-md-block"> All tools at your disposal </span>
      </template>

      <template v-slot:text>
        <span class="d-none d-md-block">
          Use this options to access all tools independently
        </span>
      </template>
      <template v-slot:actions>
        <v-btn block :to="{ name: 'tools' }">Acessar</v-btn>
      </template>
    </v-card>
  </div>
</template>

<script></script>
<style scoped lang="scss">
.logo-wrapper {
  position: relative;
}
.logo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(images/louvor-ja.svg);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 10%;
}
</style>
