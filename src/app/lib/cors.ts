// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";

// const allowUrl = [
//   /^https:\/\/reception-system.*\.vercel\.app$/,
//   'http://localhost:3000',
// ];

// export const cors = (req: NextRequest, res: NextResponse) => {
//   const origin = req.headers.origin;

//   // リクエストのオリジンが許可リストに含まれているかチェック
//   if (origin && allowUrl.some(url => (typeof url === 'string' ? url === origin : url.test(origin)))) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// }
