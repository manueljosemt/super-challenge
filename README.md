# Pasos a seguir para el backend: NESTJS + POSTGRESQL

`npm i`
`npm run build `
`npm run typeorm migration:generate ./src/users/entities/Users`
MOVER LA MIGRACION A LA CARPETA MIGRATIONS 😆
`npm run typeorm migration:run`
`npm run start:dev`

#### postgres + postgres admin
`docker-compose up`

```
host: db
database: user-name
user: user-name
password: strong-password
```

# Pasos a seguir para el frontend: NEXTJS

`npm i`
`npm run dev`
