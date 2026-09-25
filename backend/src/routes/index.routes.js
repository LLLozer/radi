import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { comentarioRoutes } from "./comentario.routes.js";
import { publicacionRoutes } from "./publicacion.routes.js";
import { recursosRoutes } from "./recursos.routes.js";

export const routes = Router()

routes.use(authRoutes)
routes.use(comentarioRoutes)
routes.use(publicacionRoutes)
routes.use(recursosRoutes)