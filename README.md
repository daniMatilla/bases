## 🚧 

### dev
----------

1.  Crear archivo `.env` basado en las claves de [envs.service.ts](src/plugins/envs.service.ts)
2.  Ejecutar:  
    ```
    npm i
    ```
3.  **Para las base de datos es necesario docker**.  
    Levantarlas con:
    ```
    docker compose up -d
    ```
4.  Reconstruir la base de datos de Postgres con:
    ```
    npx prisma migrate dev
    ```
5.  Levantar el server de desarrollo con:
    ```
    npm run json:server
    ```
6.  Levantar la app con:
    ```
    npm run dev
    ```