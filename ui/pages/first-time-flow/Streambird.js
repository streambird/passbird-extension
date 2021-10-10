let requestId, emailId;

let headers = new Headers();
headers.append("Authorization", "ApiKey selzKQa3y5lGcdNKhVKvnZKts0jeb0O0ibXZeU85uhLNJ7Bw");
headers.append("Content-Type", "application/json");

const apiUrl = 'https://api-dev.streambird.io'

const loginOrCreate = async (email) => {
  console.log('email: ' + email)
  const body = JSON.stringify({
    "email": email,
    "expires_in": 60,
    "login_redirect_url": "https://passbird-server.herokuapp.com/finishLogin",
    "registration_redirect_url": "https://passbird-server.herokuapp.com/finishLogin"
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body,
    redirect: 'follow'
  };

  const res = await fetch(`${apiUrl}/v1/auth/magic_links/email/login_or_create`, requestOptions)
  const text = await res.text()
  const data = JSON.parse(text) 

  requestId = data.request_id
  emailId = data.email_id
  // requestId = 'hi'
  // emailId = 'lol'

  return { requestId, emailId }
}

const loginStatus = async () => {

  const body = JSON.stringify({
    "request_id": requestId,
    "email_id": emailId
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body,
    redirect: 'follow'
  };

  const res = await fetch(`${apiUrl}/v1/auth/magic_links/public/email/login_status`, requestOptions)
  const text = await res.text()
  const data = JSON.parse(text) 
  // const data = { wallets: [], wallet_pks: [ { pk: '0x53cee6c0392ed89cbb76ec4d5972dc4c176bb2321f477aeea41fc8ec89bf51ea' }]}
  return data
}

export { loginOrCreate, loginStatus }
