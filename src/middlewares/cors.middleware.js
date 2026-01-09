import cors from "cors";

const corsConfig = {
  origin: "http://localhost:3000",
};

export default cors(corsConfig)