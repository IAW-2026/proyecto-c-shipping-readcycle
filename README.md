# Shipping App

Aplicación Shipping App del Proyecto IAW 2026 — comisión ReadCycle.

Esta app corresponde al módulo de gestión logística y seguimiento de envíos del proyecto tipo C (Marketplace).

## Descripción

Shipping App es la aplicación utilizada por operadores logísticos, transportistas y administradores de ReadCycle para gestionar el ciclo completo de los envíos asociados a las órdenes del marketplace.

La plataforma permite:

* Crear y administrar envíos.
* Asignar transportistas a los envíos.
* Actualizar estados de seguimiento.
* Consultar historial de movimientos y eventos logísticos.
* Visualizar métricas operativas y estadísticas de distribución.
* Gestionar usuarios y permisos del sistema.
* Supervisar el estado general de las operaciones logísticas.

## Deploy

La aplicación está disponible en: [Vercel](https://proyecto-c-shipping-readcycle.vercel.app/)

## Credenciales de prueba

### Usuario administrador

Email: [admin+clerktest@iaw.com](mailto:admin+clerktest@iaw.com)

Contraseña: iawuser#

### Usuario operador

Email: [operator+clerktest@iaw.com](mailto:operator+clerktest@iaw.com)

Contraseña: iawuser#

### Usuario transportista

Email: [carrier+clerktest@iaw.com](mailto:carrier+clerktest@iaw.com)

Contraseña: iawuser#

## Roles del sistema

### Administrador

Posee acceso completo a la plataforma.

Puede:

* Gestionar usuarios.
* Activar o desactivar cuentas.
* Crear operadores y transportistas.
* Consultar métricas globales.
* Supervisar todos los envíos.

### Operador

Responsable de la gestión operativa de los envíos.

Puede:

* Modificar información de envíos.
* Asignar transportistas.
* Consultar el estado de todos los envíos.
* Actualizar información logística.

### Transportista

Responsable de la ejecución del proceso de entrega.

Puede:

* Consultar envíos asignados.
* Actualizar estados de seguimiento.
* Registrar eventos logísticos.
* Marcar entregas exitosas o fallidas.

## Instrucciones extra

Los usuarios creados por un administrador deberán completar el proceso de autenticación al iniciar sesión por primera vez.

Para acceder a las funcionalidades de la aplicación es necesario que el usuario se encuentre activo dentro del sistema.

Se puede simular la creacion de envios mediante el panel administrador.

Las métricas y estadísticas mostradas en el dashboard se calculan a partir de los envíos registrados en la base de datos.
