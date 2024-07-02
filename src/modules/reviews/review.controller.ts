/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ReviewServices } from "./review.service";

const addReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const reviewData = req.body;
  const result = await ReviewServices.addReview(slug, reviewData);

  res.json({
    success: true,
    message: 'Review is created successfully!',
    data: result,
  });
});

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewServices.getAllReviews(req.params.slug);

    res.status(200).json({
      success: true,
      message: "Reviews are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch reviews!",
      error: err,
    });
  }
};

const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ReviewServices.getReviewBySlug(id);

    res.status(200).json({
      success: true,
      message: "Reviews are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch reviews!",
      error: err,
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await ReviewServices.updateReview(slug, req.body);

    res.status(200).json({
      success: true,
      message: "Reviews are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch reviews!",
      error: err,
    });
  }
};

// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.deleteReview(slug);

//     res.status(200).json({
//       success: true,
//       message: "Reviews are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch reviews!",
//       error: err,
//     });
//   }
// };

export const ReviewControllers = {
  addReview,
    getAllReviews,
    getReviewById,
    updateReview,
  //   deleteReview,
};
