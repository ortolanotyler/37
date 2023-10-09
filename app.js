const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('A query key "nums" with a comma-separated list of numbers is required.', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  // Check for potential issues in the input
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mean",
    result: findMean(nums)
  }

  return res.send(result);
});

app.get('/median', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('A query key "nums" with a comma-separated list of numbers is required.', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  // Check for potential issues in the input
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    result: findMedian(nums)
  }

  return res.send(result);
  
});

app.get('/mode', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('A query key "nums" with a comma-separated list of numbers is required.', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  // Check for potential issues in the input
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw a new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums)
  }

  return res.send(result);
 
});

/** General error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // Pass the error to the next piece of middleware
  return next(err);
});

/** General error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(3000, function() {
  console.log(`Server is starting on port 3000`);
});
