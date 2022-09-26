import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

import client from "@libs/server/client";
import mail from "@sendgrid/mail";
import twilio from "twilio";

mail.setApiKey(process.env.SENDGRID_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE as string,
  //     body: `당신의 로그인 토큰 : ${payload} 입니다.`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const email = await mail.send({
  //     from: "ytw418@gmail.com",
  //     to: "ytw418@gmail.com",
  //     subject: "캐럿마켓 인증 이메일",
  //     text: `당신의 로그인 토큰 : ${payload}`,
  //     html: `<strong>당신의 로그인 토큰 : ${payload} 입니다.<strong>`,
  //   });
  //   console.log(email);
  // }

  return res.json({
    ok: true,
  });
}
export default withHandler("POST", handler);
