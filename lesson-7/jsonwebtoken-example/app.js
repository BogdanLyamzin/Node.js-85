import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "655cf5337e6328547169d35c"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, JWT_SECRET);
    // console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWNmNTMzN2U2MzI4NTQ3MTY5ZDM1YyIsImlhdCI6MTcwMDU5MTkwNywiZXhwIjoxNzAwNjc0NzA3fQ.a8j-CIzr1o7zzE30fwryTG0njgwahDDL5obuzmdCHcu";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}