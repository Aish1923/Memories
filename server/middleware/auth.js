import jwt,{decode} from "jsonwebtoken";

//only if auth middleware confirms actions are allowed

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.verify(token);
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {
    console.log("error in authentication", error);
  }
};

export default auth;