// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Route {
  export type Body<BODY> = {
    req: {
      body: BODY
    }
  }

  export type Query<KEY extends string[]> = {
    req: {
      query: {
        [KEY_NAME in KEY[number]]: string
      }
    }
  }

  export type OptionalQuery<KEY extends string[]> = {
    req: {
      query: {
        [KEY_NAME in KEY[number]]?: string
      }
    }
  }

  export type Params<PARAM extends string[]> = {
    req: {
      params: {
        [PARAM_NAME in PARAM[number]]: string
      }
    }
  }

  export type OptionalParams<PARAM extends string[]> = {
    req: {
      params: {
        [PARAM_NAME in PARAM[number]]?: string
      }
    }
  }

  export type Headers<HEADERS extends string[]> = {
    req: {
      headers: {
        [HEADER_NAME in HEADERS[number]]: string
      }
    }
  }

  export type OptionalHeaders<HEADERS extends string[]> = {
    req: {
      headers: {
        [HEADER_NAME in HEADERS[number]]?: string
      }
    }
  }

  export type Res<T> = {
    res: T
  }
}
