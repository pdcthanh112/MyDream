// import { NextApiRequest, NextApiResponse } from 'next';
// import httpProxy from 'http-proxy';
// import { cookies } from 'next/headers';

// const proxy = httpProxy.createProxyServer();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
//   return new Promise((reslove) => {
//     const accessToken = cookies().get('access_token');
//     if (accessToken) {
//       req.headers.authorization = `Bearer ${accessToken}`;
//     }
//     req.headers.cookie = '';

//     proxy.web(req, res, {
//       target: process.env.NEXTAUTH_URL,
//       changeOrigin: true,
//       selfHandleResponse: false,
//     });

//     proxy.once('proxyRes', () => {
//       reslove(true);
//     });
//   });
// }
