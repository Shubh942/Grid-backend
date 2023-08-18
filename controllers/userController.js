const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

exports.allUsers = catchAsync(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(keyword);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(201).json({ users });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.find({ name: req.params.name })
    .populate("friends")
    .populate("friendsRequest");
  res.status(203).json({ user });
});
