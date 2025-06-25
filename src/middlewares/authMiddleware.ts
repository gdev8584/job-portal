import JWT from "jsonwebtoken";

const userAuth = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.startsWith("Bearer")) {
    next("Auth failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload: any = JWT.verify(token, String(process.env.JWT_SECRET));
    req.user = { userId: payload?.userId };
    next();
  } catch (error) {
    next("Authntication fail");
  }
};

export default userAuth;
