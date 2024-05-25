import {ProblemDetails, Violation} from "../types/problemDetails.js";
import {Validation} from "../errors/validation.js";
import {Unauthorized} from "../errors/Unauthorized.js";

export const globalErrorHandler = () => {
  return (err, req, res, _next) => {
    console.error('Error caught in global error handler', err)

    if (err instanceof Validation) {
      return res.status(400).json(validationErrorHandler(err))
    }

    if (err instanceof Unauthorized) {
      return res.status(401).json(new ProblemDetails({
        type: 'api/sign-in-unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail: err.message
      }));
    }

    return res.status(500).json(new ProblemDetails({
      type: 'api/internal-server-error',
      title: 'Internal Server Error',
      detail: 'Something broke!',
      status: 500
    }));
  }
}

const validationErrorHandler = (error) => {
  const violations = error.e.array()
    .filter(error => error.type === 'field')
    .map(error => new Violation({
      property: error.path,
      type: error.msg
    }))

  return new ProblemDetails({
    type: 'api/bad-request',
    title: 'Bad Request',
    detail: 'Request failed validations',
    status: 400,
    violations
  })
}