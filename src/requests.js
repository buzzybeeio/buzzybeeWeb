/* eslint-env browser */

const POST = options => (
  new Promise((resolve, reject) => {
    window.$.ajax({
      type: 'POST',
      url: options.url,
      data: JSON.stringify(options.data),
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
