export const baseError = (error: Error, res: any) => {
  return res.status(500).json({
    message: error.stack,
  });
};
