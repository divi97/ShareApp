const ErrorResponse = require('../utils/errorResponse');
const fileShareModel = require('../models/fileshare')
const fileModel = require('../models/file')

// Upload Files
exports.uploadFiles = async (req, res, next) => {
    try {
        const files = req.files;
        console.log(files);

        if (files.length === 0) {
            const error = new Error("Please select a File");
            error.httpStatusCode = 400;
            return next(error);
        }

        for (let i = 0; i < files.length; i++) {
            const createdFile = await fileModel.create({
                filename: req.files[i].originalname,
                mimetype: req.files[i].mimetype,
                size: req.files[i].size,
                filepath: req.files[i].path,
                userid: req.params.id,
            });

        //     const user = await User.findById(req.userData.id);
        //     user.files.push(createdFile._id);
        //     // console.log(user.files);
        //     await User.findByIdAndUpdate(req.userData.id, {
        //         files: user.files,
        //     });
        }
        res.status(201).json({
            msg: "Files Uploaded Successfully to your Drive",
        });
    } catch (err) {
        return next(
            new ErrorResponse(`Error in file uploading: ${err.message}`, 400)
        );
    }
};
