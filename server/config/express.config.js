const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const Joi = require('joi');
const app = express();

app.use(helmet());
app.use(cors());

const mainRouter = require("./routing.config");

const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(router);
app.use(mainRouter);


app.use((req, res, next) => {
    next({
        code: 404,
        message: "Resource not found",
    });
});

app.use((error, req, res, next) => {
    console.log(error);

    let statusCode = error.code || 500;
    let data = error.data || null;
    let msg = error.message || "Internal server error";

    // Handle MySQL specific error codes
    if (error.code === 'ER_DUP_ENTRY') {
        statusCode = 400;
        msg = "Duplicate entry. This field should be unique.";
        data = {};
    }

    if (error instanceof Joi.ValidationError) {
        statusCode = 422;
        msg = "Validation Failed";
        data = {};
        const errorDetail = error.details;
        if (Array.isArray(errorDetail)) {
            errorDetail.forEach((errorObj) => {
                data[errorObj.context.label] = errorObj.message;
            });
        }
    }

    res.status(statusCode).json({
        result: data,
        message: msg,
        meta: null
    });
});

module.exports = app;
