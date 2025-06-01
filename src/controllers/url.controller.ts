import { API_ENDPOINT, CREATED, OK } from "../constants";
import { CustomError } from "../middlewares";
import { UrlModel } from "../models";
import { asyncHandler, generateNanoId } from "../utils";
import { createShortUrlSchema, redirectToOriginalUrlSchema } from "../validations/url.validation";

export const createShortUrlController = asyncHandler(async (req, res, next) => {
    // take input from request
    const input = createShortUrlSchema.parse({ ...req.body, userId: req.userId })
    const { originalUrl, userId } = input;

    // generate nano id
    const nanoId = generateNanoId();

    // generate short url for the original url
    const shortUrl = `${API_ENDPOINT}/urls/${nanoId}`;
    const url = await UrlModel.findOneAndUpdate({ originalUrl }, { originalUrl, shortUrl, userId }, { upsert: true, new: true, setDefaultsOnInsert: true });

    // generate data
    const data = {
        originalUrl,
        shortUrl,
        userId,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        clicks: url.clicks,
        _id: url._id
    }

    res.status(CREATED).json({
        success: true, message: "Short url generated successfully!", data
    })
});

export const redirectToOriginalUrlController = asyncHandler(async (req, res, next) => {
    // take input from the request
    const { nanoId } = redirectToOriginalUrlSchema.parse({ ...req.params });

    const shortUrl = `${API_ENDPOINT}/urls/${nanoId}`;
    const url = await UrlModel.findOneAndUpdate({ shortUrl }, { $inc: { clicks: 1 } });

    if (!url) {
        throw new CustomError(404, "Url not found!");
    }

    res.redirect(url.originalUrl);
})

export const getAllUrlsControllers = asyncHandler(async (req, res, next) => {
    // take input from the request
    const userId = req.userId;

    // find all urls with the userId
    const urls = await UrlModel.find({ userId });

    res.status(OK).json({ success: true, message: "Urls retrived successfully!", data: { urls } })
})