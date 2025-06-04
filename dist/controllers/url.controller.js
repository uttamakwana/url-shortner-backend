"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUrlsControllers = exports.redirectToOriginalUrlController = exports.createShortUrlController = void 0;
const constants_1 = require("../constants");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const utils_1 = require("../utils");
const url_validation_1 = require("../validations/url.validation");
exports.createShortUrlController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    // take input from request
    const input = url_validation_1.createShortUrlSchema.parse({ ...req.body, userId: req.userId });
    const { originalUrl, userId } = input;
    // generate nano id
    const nanoId = (0, utils_1.generateNanoId)();
    // generate short url for the original url
    const shortUrl = `${constants_1.API_ENDPOINT}/urls/${nanoId}`;
    const url = await models_1.UrlModel.findOneAndUpdate({ originalUrl }, { originalUrl, shortUrl, userId }, { upsert: true, new: true, setDefaultsOnInsert: true });
    // generate data
    const data = {
        originalUrl,
        shortUrl,
        userId,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        clicks: url.clicks,
        _id: url._id
    };
    res.status(constants_1.CREATED).json({
        success: true, message: "Short url generated successfully!", data
    });
});
exports.redirectToOriginalUrlController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    // take input from the request
    const { nanoId } = url_validation_1.redirectToOriginalUrlSchema.parse({ ...req.params });
    const shortUrl = `${constants_1.API_ENDPOINT}/urls/${nanoId}`;
    const url = await models_1.UrlModel.findOneAndUpdate({ shortUrl }, { $inc: { clicks: 1 } });
    if (!url) {
        throw new middlewares_1.CustomError(404, "Url not found!");
    }
    res.redirect(url.originalUrl);
});
exports.getAllUrlsControllers = (0, utils_1.asyncHandler)(async (req, res, next) => {
    // take input from the request
    const userId = req.userId;
    // find all urls with the userId
    const urls = await models_1.UrlModel.find({ userId });
    res.status(constants_1.OK).json({ success: true, message: "Urls retrived successfully!", data: { urls } });
});
//# sourceMappingURL=url.controller.js.map