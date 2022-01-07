// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { comments } from "../../../data/comment";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const { comment } = req.body;
    const { nama } = req.body;
    const date = Date.now();
    const newComment = {
      id: toString(date),
      name: nama + '',
      text: comment + '',
      time: toString(date),
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
