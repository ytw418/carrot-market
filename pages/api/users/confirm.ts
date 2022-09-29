import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	console.log("api/confirm req.session 요청 세션", req.session);

	const { token } = req.body;
	const foundToken = await client.token.findUnique({
		//유저 정보를 가져오는 코드
		where: {
			payload: token,
		},
		// include: { user: true },
	});
	if (!foundToken) return res.status(400).end();

	req.session.user = {
		id: foundToken.userId,
	};
	await req.session.save();
	await client.token.deleteMany({
		where: {
			userId: foundToken.userId,
		},
	});

	//유저 정보가 없다면 400 에러 리턴
	console.log(
		"api/confirm  foundToken 토큰값으로 디비에서 찾은 유저",
		foundToken
	);
	console.log("api/confirm req.body token 토큰 :", token);
	res.json({
		ok: true,
	});
}

export default withApiSession(
	withHandler({ methods: ["POST"], handler, isPrivate: false })
);
//아이언 세션 핸들러
