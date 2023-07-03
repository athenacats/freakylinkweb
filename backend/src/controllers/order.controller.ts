// order.controller.ts
import { Request, Response } from "express";
import { Order } from "../../../frontend/src/app/shared/models/order";
import { OrderModel } from "../models/order.model";

export class OrderController {
  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id; // Assuming you have user authentication implemented

      const orders: Order[] = await OrderModel.find({ user: userId });
      res.json(orders);
      res.statusMessage = "ghj";
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
