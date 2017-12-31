/* eslint-env browser */

const POST = (url, data) => (
  new Promise((resolve, reject) => {
    window.$.ajax({
      type: 'POST',
      url,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: resolve,
      error: reject,
    });
  })
);

const GET = url => (
  new Promise((resolve, reject) => {
    window.$.ajax({
      type: 'GET',
      url,
      dataType: 'json',
      success: resolve,
      error: reject,
    });
  })
);

export { GET, POST };
