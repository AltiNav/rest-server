import { Router, Request, Response, NextFunction, type RequestHandler, type ErrorRequestHandler } from 'express'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      locals: Record<string, any>
    }
  }
}

class RestError extends Error {
  status: number
  contentType: 'json' | 'text'
  constructor(status: number, message: string, contentType: 'json' | 'text' = 'json') {
    super(message)
    this.status = status
    this.contentType = contentType
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFoundRequestHandler: RequestHandler = (_req, res, _next) => {
  res.status(404).send('Not Found')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorRequestHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof RestError) {
    if (err.contentType === 'json') {
      return res.status(err.status).json({ error: err.message })
    }
    return res.status(err.status).send(err.message)
  }
  return res.status(500).send('Internal Server Error')
}

type RestRoutes = Record<
  string,
  {
    req?: {
      params?: any
      body?: any
      query?: any
      headers?: Record<string, any>
    }
    res?: any
  }
>

type OrError<T> = any extends T
  ? {
      error?: string
    }
  : T

type Res<T> = T extends { res: infer U } ? U : never
type Req<T> = T extends { req: infer U } ? U : never
type Params<T> = T extends { params: infer U } ? U : never
type Query<T> = T extends { query: infer U } ? U : never
type Headers<T> = T extends { headers: infer U } ? U : Record<string, string>
type Body<T> = T extends { body: infer U } ? U : never

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
const remissioPeccatorum =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼 👼
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

const useRestRoutes = <T extends RestRoutes>(router: Router) => {
  const restRoutes = <K extends keyof T>(
    routeName: K,
    ...handlers: ((
      req: Request<
        Params<Req<T[K]>>,
        Response<OrError<Res<T[K]>>>,
        Body<Req<T[K]>>,
        Query<Req<T[K]>>,
        Headers<Req<T[K]>> & Record<string, any>
      >,
      res: Response<OrError<Res<T[K]>>>,
      next: NextFunction
    ) => void)[]
  ) => {
    const [method, path] = (routeName as string).split(' ')
    router[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](
      path,
      ...(handlers as RequestHandler[]).map((handler) => remissioPeccatorum(handler))
    )
  }

  return restRoutes
}

export { useRestRoutes, RestRoutes, RestError }
