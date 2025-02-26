### Lista Completa de Endpoints

1. **Crear un nuevo servicio**
   - **Método:** POST
   - **Endpoint:** `/api/v1/servicios`
   - **Descripción:** Crea un nuevo servicio.

2. **Obtener un servicio por ID**
   - **Método:** GET
   - **Endpoint:** `/api/v1/servicios/{id}`
   - **Descripción:** Obtiene un servicio específico utilizando su ID.

3. **Listar todos los servicios**
   - **Método:** GET
   - **Endpoint:** `/api/v1/servicios`
   - **Descripción:** Devuelve una lista de todos los servicios.

4. **Buscar servicios por nombre**
   - **Método:** GET
   - **Endpoint:** `/api/v1/servicios/nombre/{nombre}`
   - **Descripción:** Busca servicios que coincidan con el nombre proporcionado.

5. **Buscar servicios por disponibilidad**
   - **Método:** GET
   - **Endpoint:** `/api/v1/servicios/disponibilidad/{disponibilidad}`
   - **Descripción:** Busca servicios según su disponibilidad.

6. **Buscar servicios por precio menor o igual**
   - **Método:** GET
   - **Endpoint:** `/api/v1/servicios/precio/{precioMaximo}`
   - **Descripción:** Busca servicios cuyo precio sea menor o igual al precio máximo proporcionado.

7. **Actualizar un servicio existente**
   - **Método:** PUT
   - **Endpoint:** `/api/v1/servicios/{id}`
   - **Descripción:** Actualiza un servicio existente utilizando su ID.

8. **Eliminar un servicio**
   - **Método:** DELETE
   - **Endpoint:** `/api/v1/servicios/{id}`
   - **Descripción:** Elimina un servicio específico utilizando su ID.

### Resumen de Endpoints
- **POST** `/api/v1/servicios` - Crear servicio
- **GET** `/api/v1/servicios/{id}` - Obtener servicio por ID
- **GET** `/api/v1/servicios` - Listar todos los servicios
- **GET** `/api/v1/servicios/nombre/{nombre}` - Buscar por nombre
- **GET** `/api/v1/servicios/disponibilidad/{disponibilidad}` - Buscar por disponibilidad
- **GET** `/api/v1/servicios/precio/{precioMaximo}` - Buscar por precio
- **PUT** `/api/v1/servicios/{id}` - Actualizar servicio
- **DELETE** `/api/v1/servicios/{id}` - Eliminar servicio