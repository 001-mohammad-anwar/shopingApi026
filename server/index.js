require("dotenv").config();
const cors = require("cors")
const express = require("express");
const app = express();
const PORT = 8080;
const connectDb = require("./utils/DataBase");
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
app.use(cookieParser());
// password = AnwarSangrampu

const routes = require("./router/auth-router");
// const categoryRouter = require("./router/category-route.js")
// const userRoute = require('./router/user-route');
// const errorMiddleware = require("./midelware/error-middleware");
// const uploadRouter = require("./router/uploadImage-router");
// const subCategoryRouter = require("./router/subCategory-route.js");
// const productRouter = require("./router/product-route.js");
// const cartRouter = require("./router/cartRouter.js");
// const Addressrouter = require("./router/address.route.js");
// const OrderRouter = require("./router/order-route.js");


const corsOptions = { 
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173'|| 'http://another-origin.com' || '*'];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, PUT, POST, DELETE',
  credentials: true,
};


app.use(cors(corsOptions))

app.use(express.json());

app.use("/api/auth", routes);
// app.use("/api/user", userRoute);
// app.use("/api/category", categoryRouter);
// app.use("/file", uploadRouter)
// app.use("/api/subcategory", subCategoryRouter)
// app.use("/api/product", productRouter)
// app.use("/api/cart", cartRouter)
// app.use(errorMiddleware);
// app.use('/api/address', Addressrouter)
// app.use('/api/order' , OrderRouter)

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
