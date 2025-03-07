import { RouteObject } from "react-router"

export type Routes = RouteObject & {
    children?: Routes;
}
