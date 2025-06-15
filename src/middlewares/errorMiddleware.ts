// error middelware || NEXT function
const errorMiddelware = (err: any, req: any, res: any, next: any) => {
  console.log(err);
  res.status(400).send({
    success: false,
    message: "Something Went Wrong",
    err,
  });
};

export default errorMiddelware;
