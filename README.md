# prisma 설치

- npm i prisma -D
- npx prisma or npx prisma init
- extension: prisma install

npx prisma studio
pscale connect carrot-market
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
