/* eslint-disable import/extensions */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-unresolved
import { comments } from '../../../data/comment';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const { comment } = req.body;
    const { nama } = req.body;
    const date = Date.now();
    const newComment = {
      id: `${date}`,
      name: `${nama}`,
      text: `${comment}`,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
