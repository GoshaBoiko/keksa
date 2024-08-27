const Urls = {
    GET: 'https://32.javascript.htmlacademy.pro/kekstagram/data',
    POST: 'https://32.javascript.htmlacademy.pro/kekstagram',
};

export const makeRequest = (onSuccess, onFail, method, body) => {
    fetch(Urls[method], {
        method,
        body,
    })
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data)
        })
        .catch((e) => {
            onFail(e)
        })
};
