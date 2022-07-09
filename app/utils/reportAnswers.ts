import { GLOBAL_VALUES } from "./constants";

function reportRemoval(id: string) {
  return {
    code: 200,
    success: true,
    message: `Successfully deleted`,
    id: id,
  };
}

function reportNotFound(id: string) {
  return {
    code: 404,
    success: false,
    message: "Not Found ",
    id: id,
  };
}

function reportError(err: any) {
  return {
    code: err.extensions.response.status,
    success: false,
    message: err.extensions.response.body,
    id: "",
  };
}

function reportAccessDenied() {
  return {
    code: 403,
    success: false,
    message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
    id: "",
  };
}

export { reportRemoval, reportNotFound, reportError, reportAccessDenied };
