import multer, { diskStorage } from "multer";
import { ExtendedRequest } from "../interfaces/request.interface";

const storage = diskStorage({
  destination({ user }: ExtendedRequest, __, cb: any) {
    const PATH_STORAGE = `${process.cwd()}/public/${user?._id}`;
    cb(null, PATH_STORAGE);
  },
  filename(_, file: Express.Multer.File, cb: any) {
    const fileName = file?.originalname;
    cb(null, fileName);
  },
});

const fileMiddleware = multer({ storage });

export default fileMiddleware;
