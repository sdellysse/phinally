function phinally (cb) {
    return this
    .then(function (value) {
        return Promise.resolve(cb())
        .then(function () {
            return value;
        });
    })
    .catch(function (error) {
        return Promise.resolve(cb())
        .then(function () {
            return Promise.reject(error);
        });
    });
}

module.exports = phinally;
