# 🐸 The Frog Games - Frontend

frontend desarrollado para una tienda digital de videojuegos que permite a usuarios explorar, comprar y gestionar productos, y a administradores controlar ventas y catálogos. El sistema incluye autenticación con JWT, envio de contacto
con emailJs y una pasarela de pagos (aun en construccion)

---


### Autenticación
- **Registro de usuario**: Interfaz para que los usuarios se registren enviando datos al endpoint `POST /register`.
- **Inicio de sesión**: Formulario de login que consume el endpoint `POST /login` para autenticar usuarios y obtener un token.

### Juegos
- **Lista de juegos**: Página que muestra todos los juegos disponibles, consumiendo `GET /games`.
- **Crear juego**: Formulario para administradores que permite crear un nuevo juego mediante `POST /games` (requiere autenticación y rol de Admin/Sysadmin).
- **Detalle de juego**: Vista detallada de un juego específico, obteniendo datos desde `GET /games/:id`.

### Usuarios
- **Listado de usuarios**: Panel de administración que muestra todos los usuarios, utilizando `GET /users` (requiere autenticación y rol de Admin).
- **Eliminar usuario**: Funcionalidad para administradores que permite eliminar un usuario mediante `DELETE /user/:id` (requiere autenticación y rol de Admin).

### Órdenes
- **Crear compra**: Interfaz para que los usuarios realicen una compra, enviando datos al endpoint `POST /orders`.
- **Historial de compras**: Página que muestra el historial de compras de un usuario, consumiendo `GET /orders/user/:userId`.

### Plataformas
- **Lista de plataformas**: Sección que muestra todas las plataformas disponibles, utilizando `GET /platforms`.
- **Crear plataforma**: Formulario para administradores que permite crear una nueva plataforma mediante `POST /platforms`.

### Favoritos
- **Añadir a favoritos**: Funcionalidad para que los usuarios añadan un juego a sus favoritos, enviando datos a `POST /favorites`.
- **Ver favoritos**: Página que muestra los juegos favoritos de un usuario, consumiendo `GET /favorites/:id`.

### Carrito
- **Carrito de compras**: Interfaz para gestionar el carrito (sin endpoints específicos definidos en `cart.routes.js`, pero probablemente interactúa con componentes locales del frontend y endpoints de órdenes como `POST /orders`).
