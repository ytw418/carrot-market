import { Answer, Post, User } from "@prisma/client";
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { cls, makeImageUrl } from "../../libs/client/utils";
import useSWR, { useSWRConfig } from "swr";

import Button from "@components/button";
import Image from "next/image";
import Layout from "@components/layout";
import Link from "next/link";
import TextArea from "@components/textarea";
import client from "@libs/server/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../../libs/client/useMutation";
import { useRouter } from "next/router";
import useUser from "../../libs/client/useUser";

interface IAnswerFormProps {
  answer: string;
}

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: { answers: number; wondering: number };
  answers: AnswerWithUser[];
}

interface ICommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface IAnswerResponse {
  ok: boolean;
  answer: AnswerWithUser;
}

const CommunityPostDetail: NextPage<ICommunityPostResponse> = ({ post }) => {
  const { user } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { register, handleSubmit, reset } = useForm<IAnswerFormProps>();
  const { data, mutate: boundedMutate } = useSWR<ICommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [toggleWonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<IAnswerResponse>(`/api/posts/${router.query.id}/answers`);

  useEffect(() => {
    if (data && !data.ok) {
      router.push("/community");
    }
  }, [data, router]);

  const onWonderClick = () => {
    if (!data) return;
    boundedMutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            wondering: data.isWondering
              ? data?.post._count.wondering - 1
              : data?.post._count.wondering + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );

    if (!loading) {
      toggleWonder({});
    }
  };

  const onValid = (validForm: IAnswerFormProps) => {
    if (answerLoading) return;
    sendAnswer(validForm);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      // if (!data) return;
      // console.log(data);
      // mutate(
      //   {
      //     ...data,
      //     post: {
      //       ...data.post,
      //       answers: [...data.post.answers, { ...answerData.answer, user }],
      //       _count: {
      //         ...data.post._count,
      //         answers: data.post._count.answers + 1,
      //       },
      //     },
      //   },
      //   false
      // );
      boundedMutate();
    }
  }, [answerData, reset, boundedMutate]);

  return (
    <Layout seoTitle="동네질문" title="동네질문" canGoBack>
      <div className="space-y-4">
        <span className="ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <Link href={`/profile/${post?.userId}`}>
          <a className="flex items-center px-4 pb-3 mb-3 space-x-3 border-b">
            {post?.user?.avatar ? (
              <Image
                src={makeImageUrl(post.user.avatar, "avatar")}
                className="w-10 h-10 rounded-full bg-slate-300"
                width={48}
                height={48}
                alt="avatar"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-300" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {post?.user?.name}
              </p>
              <p className="text-xs font-medium text-gray-500">
                프로필 보기 &rarr;
              </p>
            </div>
          </a>
        </Link>
        <div>
          <div className="px-4 mt-2 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span>
            {post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  text-gray-700">
            <button
              className={cls(
                "flex items-center space-x-2 text-sm",
                data?.isWondering ? "text-orange-500" : ""
              )}
              onClick={onWonderClick}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post?._count?.wondering}</span>
            </button>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count?.answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {post?.answers?.map((answer) => (
            <div
              className="flex items-start space-x-3"
              key={`Answer:${answer.id}`}
            >
              {answer.user.avatar ? (
                <Image
                  src={makeImageUrl(answer.user.avatar, "avatar")}
                  className="w-8 h-8 rounded-full bg-slate-200"
                  width={48}
                  height={48}
                  alt="avatar"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-200" />
              )}
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="block text-xs text-gray-500 ">
                  {answer.createdAt.toString()}
                </span>
                <p className="mt-2 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            register={register("answer", { required: true })}
            placeholder="질문에 대답해주세요!"
            required
          />
          <Button text={"대답하기"} loading={answerLoading} />
        </form>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  const post = await client.post.findUnique({
    where: {
      id: +ctx.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
      answers: {
        select: {
          id: true,
          answer: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default CommunityPostDetail;
