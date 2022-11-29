module.exports = function(schema) {
    return function(req, res, next) {
        try {
            const validatedData = schema.validate(req.body);
            if (validatedData.error) {
                res.status(422).send(validatedData.error.details[0].message);
            } else {
                next();
            }
        } catch(error) {
            console.log(error.name);
            console.log(error.message);
            next(error);
        }
    }
}
