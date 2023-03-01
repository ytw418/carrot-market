## 접속 링크 https://carrot-market-umber.vercel.app/
## 로그인 방법 이메일을 입력하고 콘솔에 찍히는 토큰을 입력

`npm install`

# prisma 설치

- npm i prisma -D
- npx prisma or npx prisma init
- extension: prisma install

윈도우 버전 플래닛스케일 CLI
scoop bucket add pscale https://github.com/planetscale/scoop-bucket.git
scoop install pscale mysql

다른 문제는 설치 Microsoft Visual C++ 2015 Redistributable하면 이 문제가 해결될 것이라고 제안하므로 설치해 보세요

또는 맥버전
brew install planetscale/tap/pscale
선택 사항: pscale특정 명령에 대해 MySQL 클라이언트가 필요합니다. 다음을 실행하여 설치할 수 있습니다.

brew install mysql-client
최신 버전으로 업그레이드하려면:

brew upgrade pscale

npx prisma studio
pscale connect pro
npx prisma db push
npx prisma generate

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

# PlanetScale

mySql 과 호환되는 서버리스 데이터베이스 플랫폼

## Installation

#### 출처 [링크](https://github.com/planetscale/cli/blob/main/README.md#macos)

####

#### macOS

`pscale` is available via a Homebrew Tap, and as downloadable binary from the [releases](https://github.com/planetscale/cli/releases/latest) page:

```
brew install planetscale/tap/pscale
```

Optional: `pscale` requires the MySQL Client for certain commands. You can install it by running:

```
brew install mysql-client
```

To upgrade to the latest version:

```
brew upgrade pscale
```

터미널 pscale 입력 후 출력 내용 확인

pscale is a CLI library for communicating with PlanetScale's API.

Usage:
pscale [command]

Available Commands:
audit-log List audit logs
auth Login and logout via the PlanetScale API
backup Create, list, show, and delete branch backups
branch Create, delete, diff, and manage branches
completion Generate completion script for your shell
connect Create a secure connection to a database and branch for a local client
data-imports Create, list, and delete branch data imports
database Create, read, delete, and dump/restore databases
deploy-request Create, review, diff, revert, and manage deploy requests
help Help about any command
org List, show, and switch organizations
password Create, list, and delete branch passwords
region List regions
service-token Create, list, and manage access for service tokens
shell Open a MySQL shell instance to a database and branch
signup Signup for a new PlanetScale account

Flags:
--api-token string The API token to use for authenticating against the PlanetScale API.
--api-url string The base URL for the PlanetScale API. (default "https://api.planetscale.com/")
--config string Config file (default is $HOME/.config/planetscale/pscale.yml)
--debug Enable debug mode
-f, --format string Show output in a specific format. Possible values: [human, json, csv] (default "human")
-h, --help help for pscale
--no-color Disable color output
--service-token string Service Token for authenticating.
--service-token-id string The Service Token ID for authenticating.
--version Show pscale version

Use "pscale [command] --help" for more information about a command.

ap-northeast

디비 연결

```
pscale connect carrot-market
```

DATABASE_URL="mysql://127.0.0.1:3306/carrot-market"

`디비에 연결후 푸쉬`

```
npx prisma db push
```

`studio 설치`

```
npx prisma studio
```

`클라이언트 설치`

```
npm install @prisma/client
```

`타입생성 설치`

```
npx prisma generate
```

# Vitess

mySql을 쉽게 스케일링 할 수 있게 해주는 오픈소스 라이브러리

#### import 혹시나 적용 바로 안 되시는 분들은 아래처럼 해보세요!

[MacOs + vscode 기준]
ㄴ Cmd+Shift+P > Typescript: Restart TS Server

## Token의 user가 자동완성 되지 않고 referentialIntegrity를 주석처리해도 자동 완성이 되지 않을 때에는 우선 저장을 해둔 뒤에 콘솔창에 npx prisma format을 입력하시면 됩니다.

## 강의를 듣는 중간에

Unique constraint failed on the (not available)
이 오류가 떠서 진행 못하신 분들은 강의를 끝까지 보시면 해결됩니다ㅠㅠ
payload를 그냥 숫자로 해놔서 뜨는 에러였네요...
중간에 오타있나 해서 몇시간동안 끙끙 앓다가 알고보니 payload 때문에 ㅠㅠ..
git source에 보시면 니코썜이 payload를 랜덤넘버로 바꾸어 놓으셨네요.

ㅡㅡㅡ추가 에러정리ㅡㅡㅡ

1. token이나 user에서 type에서 type에러가 뜬다면
   -npx prisma db push
   -npx prisma generator (클라이언트 새로생성) -서버 껏다켜기
   -prisma 업데이트 ( prisma와 prisma/client 두개다 업데이트 해야함!!) -컴퓨터재부팅

이걸로 대부분 해결될겁니다, 저는 마지막 경우네요
다들 저처럼 고통받지 마시고 참고하시길...

SendGrid가 너무 오래걸릴 것 같아 테스트 용으로 nodeMailer를 사용했습니다. 네이버 아이디만 있으면 사용 가능합니다.

1. 네이버 이메일 -> 내 메일함 오른쪽 설정버튼 클릭 -> 상단 메뉴들 중 'POP/IMAP 설정' -> 바로 아래에 'IMAP/SMTP 설정' -> 사용함, 동기화 메일 제한은 1000으로 해놓았습니다.

2. 하단에 보시면 SMTP 서버 명, SMTP 포트가 표시되어있습니다.

3. server폴더 내에 email.ts를 만들어줍니다.

4. npm install --save nodemailer @types/nodemailer

5. email.ts에

---

import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
service: "Naver",
host: "smtp.naver.com",
port: 587,
auth: {
user: process.env.MAIL_ID,
pass: process.env.MAIL_PASSWORD,
},
tls: {
rejectUnauthorized: false,
},
});

## export default smtpTransport;

6. enter.tsx에 돌아오셔서

---

if (email) {
const mailOptions = {
from: process.env.MAIL_ID,
to: email,
subject: "Nomad Carrot Authentication Email",
text: `Authentication Code : ${payload}`,
};
const result = await smtpTransport.sendMail(
mailOptions,
(error, responses) => {
if (error) {
console.log(error);
return null;
} else {
console.log(responses);
return null;
}
}
);
smtpTransport.close();
console.log(result);
}

---

여기서 메일 옵션의 from은 제 아이디를 써야 동작하는 것 같더라구요...
carrot@noreply.com 같은 존재하지 않는 이름으로 해보았는데 오류가 발생해서
테스트 용으로 사용할 거니까 일단 제 메일주소로 진행했더니 정상적으로 보내집니다.

혹시 저처럼 sendgrid에서 메일 오는 것 기다리기 지치신 분들은 sendgrid사용 전에 이렇게 해서 테스트해보시는것도 추천드립니다...

혹시 글이 부족하다면 'nodemailer 네이버 연동'으로 검색하시면 어렵지 않게 사용법 확인 가능합니다!

커밋테스트-1
커밋테스트-2
커밋테스트-3
계정변경 108725393
커밋테스트-4 = email-holicreact
커밋테스트-5 = all holicreact
커밋테스트-6 = 윈도우
커밋테스트-7 = 윈도우

### 10/8(목) 14.4

### 채팅창의 스크롤을 맨 밑으로 유지하는 법

-[ ] 채팅 스크롤 처리

아무런 처리를 해주지 않으면 처음 채팅 화면에 진입할 때 스크롤이 맨 위에 위치하고
새 메세지를 보낼 때 스크롤이 밑으로 늘어나지만 화면은 그대로인 상태가 됩니다
평소 사용하는 채팅 앱 등을 생각해보면 스크롤을 항상 맨 아래로 당겨줘야 합니다

useRef와 scrollIntoView 를 사용해서 해결할 수 있습니다.

```
// useRef로 스크롤할 DOM을 선택하고 useEffect와 scrollIntoView로 스크롤합니다
const scrollRef = useRef<HTMLDivElement>(null);
useEffect(() => {
scrollRef?.current?.scrollIntoView();
});
...
// 메세지들 목록 맨 밑에 빈 div를 만들어 ref를 설정합니다.
{data?.stream.messages.map...}
<div ref={scrollRef}/>
```

체팅 관련 깃 https://github.com/SM0413/carrotMarket/commit/759c48054004d498eb8573944535b59f3f6ebe64

C

useSWR() 옵션

refreshInterval
기본적으로 비활성화됨 => refreshInterval = 0
숫자를 설정하면 밀리초 간격으로 polling합니다.
함수로 설정하면 함수는 최신 데이터를 받고, 밀리초 단위로 리턴합니다.
ex) useSWR('/api/todos', fetcher, { refreshInterval: 1000 })
https://swr.vercel.app/docs/options#options
https://swr.vercel.app/ko/docs/options

Revalidate on Interval
https://swr.vercel.app/docs/revalidation#revalidate-on-interval

2

phgst1 month ago
window 는 채팅창 스크롤바가 너무 거슬려서 커스텀할 수 있는 플러그인을 찾았습니다.

설치
npm install --save-dev tailwind-scrollbar

세팅
tailwind.congfig.js 파일에 아래와 같이 추가

plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
// 위 코드처럼 기존 plugins array 안에 require("tailwind-scrollbar") 를 추가하면 됨

커스텀참고
https://tailwind-scrollbar-example.adoxography.repl.co/

1

knotehow5 months ago
mutate를 false로 설정해뒀을때 api에러가 나면 어떻게 처리하면 좋을까요? false이기 때문에 UI가 바로 갱신되어서 사용자입장에서는 에러로 느낄 수 없는데 실제로는 에러로 인해 db에 데이터가 생기지 않아서 refresh를 하게되면 문제가 생길것 같은데 이런경우에 어떻게 처리하면 좋을지 궁금합니다.

1

haloo5 months ago
@knotehow SWRConfig 옵션에:

"rollbackOnError: true"를 넣어주세요.

rollbackOnError 뜻: should the cache rollback if the remote mutation errors.

jinyinshu1 month ago
라이브 챗에서 메세지를 입력해도 라이브챗 창에서 스크롤이 맨 아래로 자동적으로
안가는데, 혹시 메세지 입력시마다 라이브 챗 창이 맨아래로 유지되게 하는 방법이
있을까요??

0

serranoarevalo1 month ago
@jinyinshu You can use `useRef` and put it on the scroll component. Then you can do scrollTop = scrollHeight

coho2 months ago
니코샘, refreshInterval을 한번 동작시키면
다른 페이지로 이동해도 계속 동작하는 것을 확인했습니다.
refreshInterval을 해당 페이지에서만 동작 시키고 싶으면
어떻게 해야할까요?

0

serranoarevalo2 months ago
@coho You mean you don't want to refresh when you are away?

coho2 months ago
@serranoarevalo
yes
page A - useSWR();
page B - useSWR({ refreshInterval: 1000 });

I want
page A(not refersh) -> page B(refersh) -> page A(not refersh)

serranoarevalo2 months ago
@coho You need to set 'revalidateOnFocus' to false.

coho2 months ago
@serranoarevalo
감사합니다 니코샘!

wlsdnr1292 months ago
nico, Can't use real-time communication using nextjs and socketio?

0

serranoarevalo2 months ago
@wlsdnr129 SocketIO needs a server to keep the connections open. The functions in NextJS are serverless which means that they only run when called and then the server is killed.

This means we can't use SocketIO.

BUT I'm working on a bonus where we use Cloudflare and Durable Objects to get realtime + serverless.

What Cloudflare is doing for serverless is mindblowing.

The bonus is coming soon, but if you want to you can check out the code:

https://developers.cloudflare.com/workers/learning/using-durable-objects/
https://developers.cloudflare.com/workers/learning/using-websockets/

wlsdnr1292 months ago
@serranoarevalo thanks a lot !!!

horrorkist3 months ago
채팅 입력 방식을 개선할 수 있을까요? 현재는 짧은 시간 내에 여러번 채팅을 입력하면 loading의 상태에 따라 그냥 입력이 안 되게 하는데, 큐 등을 이용해서 loading 중에 입력이 발생하면 입력 큐에 해당 요청을 집어넣고 이전 요청이 처리되면 큐 안의 요청을 처리하는 식으로 구현해보고 싶네요

0

serranoarevalo3 months ago
@horrorkist You could disable the onSubmit function if the mutation is `loading`

horrorkist3 months ago
@serranoarevalo Thx for replying! But I was wondering if you could keep the submit in a waiting queue when the loading is true, then deal with it as soon as the previous request is over. That would be a better user experience than just ignoring all the submits during the loading state.

serranoarevalo3 months ago
@horrorkist I think it depends how long does it take to submit the message, if you submit the message and the input gets cleaned the user will have to type another message, in that time the message request must have finished.
Anyhow, if you still want a queue you will need to look for something serverless like: https://quirrel.dev/

Or you could deploy a Worker https://developers.cloudflare.com/workers/platform/cron-triggers/

horrorkist3 months ago
@serranoarevalo Yes I was thinking of a situation where a user submitting short messages less than like 5 times in a row, which is not for a toxic purpose. Quirrel looks simple and great, but it's hard to understand what cloudflare worker does :( I'll be looking forward to the bonus cloudflare workers lecture! Thank you for the detailed reply!!

serranoarevalo3 months ago
@horrorkist I think it that case is better to do WebSockets. See you on the bonus!

jiunkim4 months ago
Hi Nico.
Where is the amazing part uploaded?

0

serranoarevalo4 months ago
@jiunkim Which part :)

jiunkim3 months ago
@serranoarevalo The realtime!?? Every 1sec refreshInterval is that?

serranoarevalo3 months ago
@jiunkim Serverless Realtime will be on the bonus using Cloudflare Workers and Durable Objects. I'm working on it :)

배포과정과 배포 후에 겪은 문제.

문제-프로덕션에서 폰트를 정상적으로 불러오지 못함. (dev에서는 작동함)
해결- https://fontsource.org/ 사용

문제- 배포 후 OG가 정상적으로 그려지지 않음
해결- 강의과정에서 진행한 middleware의 isBot 기능이 OG 데이터를 수집하려는 플랫폼을 막는 듯 함. isBot 기능 제거 후 작동.

문제- 동적 라우팅의 sitemap 작성
해결- https://cottonwood-moa.tistory.com/137
