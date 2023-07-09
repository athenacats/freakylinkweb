import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";
//import { OrderController } from "../controllers/order.controller";

const router = Router();
router.use(auth);

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;
    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send("Cart Is Empty");
      return;
    }
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
    console.log(newOrder);
  })
);

router.get(
  "/newOrderForCurrentUser",
  asyncHandler(async (req: any, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
  })
);

router.post(
  "/pay",
  asyncHandler(async (req: any, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);

    if (!order) {
      res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAID;
    await order.save();

    res.send(order._id);
    console.log(paymentId);
  })
);

router.get(
  "/track/:id",
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
  })
);

//const orderController = new OrderController();

//router.get("/", orderController.getAllOrders);

router.get(
  "/",
  asyncHandler(async (req: any, res: any) => {
    const order = await getAllOrderForCurrentUser(req);

    if (order.length === 0) {
      res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
      console.error("Failed to retrieve user orders:");
      return;
    }
    res.send({ order });
  })
);

export default router;
async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}

async function getAllOrderForCurrentUser(req: any) {
  const orders = await OrderModel.find({
    user: req.user.id,
  });
  console.log(orders);
  return orders || [];
}
