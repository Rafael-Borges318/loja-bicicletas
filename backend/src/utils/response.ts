import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export const sendSuccess = <T>(res: Response, statusCode: number, message: string, data?: T) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, statusCode: number, message: string, errorDetails?: any) => {
  const response: ApiResponse = {
    success: false,
    message,
    error: errorDetails,
  };
  return res.status(statusCode).json(response);
};
