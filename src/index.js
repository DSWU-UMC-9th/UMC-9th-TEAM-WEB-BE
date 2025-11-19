import express from 'express'; 
import cors from "cors";
import dotenv from "dotenv";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(cors()); 
app.use(express.static('public'));
app.use(express.json());                 
app.use(express.urlencoded({ extended: false }));



app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "PAGE PARTNER",
      description: "UMC 9th Mini Project WEB TEAM",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})