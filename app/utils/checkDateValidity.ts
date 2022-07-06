function checkDateValidity(date: string) {
  const re = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
  const found = date.match(re);
  if (!found || found.length !== 1) {
    return {
      code: 400,
      success: false,
      message: "Date is not valid",
      artist: null,
    };
  }
}

export { checkDateValidity };
