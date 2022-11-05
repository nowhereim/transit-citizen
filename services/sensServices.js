// 네이버 센스 sms 서비스
require('dotenv').config();
const request = require('request');
const CryptoJS = require('crypto-js');

class SendMessage {
  send_message = (phone, message) => {
    var user_phone_number = phone;                 // 수신 번호
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID;            // 서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY;  // Secret Key
    const accessKey = process.env.NCP_KEY;         // Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;  // 메시지 발송 요청 url
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request({
      method: method,
      json: true,
      uri: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        countryCode: "82",
        from: "01022760716", // 발신 번호
        content: message,    // 문자 내용
        messages: [
          { to: `${user_phone_number}`, },],
      },
    },
      function (err, res, html) {
        if (err) console.log(err);
        else { resultCode = 200; console.log(html); }
      }
    );
    return resultCode;
  }
}


module.exports = SendMessage;