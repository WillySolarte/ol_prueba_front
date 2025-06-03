

# Development
Pasos para levantar la app en desarrollo

1. Clonar o descargar el repositorio de git
 ``` https://github.com/WillySolarte/ol_prueba_front.git ```
2. Crear una copia de el .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm install``` para reconstruir los módulos de node
5. Ejecutar el comando ```npm run dev -- -p 3001``` para ejecutar aplicación en desarrollo
El proyecto se ejecuta en el puerto 3001 ya que el back de nest.js trabaja en el 3000

# NOTA

- Teniendo en cuenta que no se solicitó realizar la dockerización del proyecto, no se hizo.