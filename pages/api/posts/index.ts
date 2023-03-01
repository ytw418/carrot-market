import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const {
      query: { page = 1 },
    } = req;

    // const parsedLatitude = parseFloat(latitude.toString());
    // const parsedLongitude = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            answers: true,
            wondering: true,
          },
        },
      },
      take: 10,
      skip: page ? (+page - 1) * 10 : 0,
      // where: {
      //   latitude: {
      //     gte: parsedLatitude - 0.01,
      //     lte: parsedLatitude + 0.01,
      //   },
      //   longitude: {
      //     gte: parsedLongitude - 0.01,
      //     lte: parsedLongitude + 0.01,
      //   },
      // },
    });
    const postCount = await client.product.count();

    res.json({
      ok: true,
      posts,
      pages: Math.ceil(postCount / 10),
    });
  }
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    try {
      await res.revalidate("/community");
      return res.json({ ok: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], isPrivate: false, handler })
);
