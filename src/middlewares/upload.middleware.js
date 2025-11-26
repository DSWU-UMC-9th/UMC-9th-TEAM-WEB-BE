import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from 'multer-s3'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    acl: 'public-read',
    region: "ap-northeast-2"
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const originalFileName = file.originalname; // 원본 파일명
            const ext = path.extname(originalFileName); // 파일 확장자 추출
            const basename = path.basename(originalFileName, ext); // 원본 파일명에서 확장자를 제외한 부분
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // 고유한 접미사
            const fileName = `${basename}-${uniqueSuffix}${ext}`; // 원본 파일명 + 접미사 + 확장자            
            cb(null, `books/${fileName}`) // 파일명을 그대로 사용
            
        }
    })
})

export default upload.fields([
    {name: 'image', maxCount: 1}
]);