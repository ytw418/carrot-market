import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id = "" },
    session: { user },
  } = req;
  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
    console.log(`유저아이디:${user?.id}, 상품아이디 : ${id}
    좋아요 삭제`);
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
    console.log(`유저아이디:${user?.id}, 상품아이디 : ${id}
    좋아요 추가`);
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
