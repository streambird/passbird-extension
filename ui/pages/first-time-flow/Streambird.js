let requestId, userId;

let headers = new Headers();
headers.append("Authorization", "ApiKey selzKQa3y5lGcdNKhVKvnZKts0jeb0O0ibXZeU85uhLNJ7Bw");
headers.append("Content-Type", "application/json");

const apiUrl = 'https://api-dev.streambird.io'

const loginOrCreate = async (email) => {
  console.log('email: ' + email)
  const body = JSON.stringify({
    "email": email,
    "expires_in": 60,
    "login_redirect_url": "http://localhost:8081/signin/authenticate",
    "registration_redirect_url": "http://localhost:8081/register/authenticate"
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
  userId = data.user_id

  return { requestId, userId }
}

const loginStatus = async () => {

  const body = JSON.stringify({
    "request_id": requestId,
    "email_id": userId
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
  // console.log(data)
  return data
}

export { loginOrCreate, loginStatus }
