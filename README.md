# Proyecto Robotica
Universidad de Nariño, Ingeniería de Sistemas, Robotica

Ptoyecto final de la materia Robotica de decimo semestre del programa de ingenieria de sistemas de la Universidad de Nariño.

## Stack usado
* NodeJS
* TypeScript
* Pug
* GraphQL
* Docker

El proyecto simula el movimiento de un brazo robotico de 3 grados de libertad, al deplegar el servicio por el puerto 4000 se visualiza el brazo en 3D haciendo uso de las libreria ml-matrix de npm.

## Ejecutar servicio

### Instalar dependencias
```bash
yarn install
# or 
npm install
 ```
### Ejecutar el contenedor del servicio
 > Para la contenerizacion del servicio estamos usando Docker, para ello es requerido instalar docker y docker-compose en el sistema operativo

```bash
docker-compose up -d
```

### Probar el servicio
Desde cualquier navegador accediendo a `localhost:4000` sera posible visualizar el brazo robotico en 3D con todas las opciones libres de movimiento y el calculo de los valores de la posición.
