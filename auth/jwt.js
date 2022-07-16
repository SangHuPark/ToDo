const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/*exports.authToken = async (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다',
      });
    }
  }
};*/

const token = () => {
  return{
    access(id){
      return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
    },
    refresh(id){
      return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "180 days",
      });
    }
  }
}

async function autenticate(req, res, next) {

  if(req.query.id === "id"){
    req.authData = {
      status : 200,
      message : '인증에 성공하였습니다.',
      jwt:{
        accessToken : token().access(req.query.id),
        refreshToken : token().refresh(req.query.id)
      }
    };
  }
  else {
    req.authData = {
      status : 400,
      message : '인증에 실패하였습니다.'
    };
  }

  next();
}