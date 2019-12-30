function getTitle() {
  return fetch("http://localhost:3000/msg/helloworld", {
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(res=>res.json());
}

async function upTitle() {
  const title = await getTitle();
  document.getElementById("title").innerText = title;
//   setCookie();
}

function setCookie()
{
    document.cookie="username=John Smith; expires=Thu, 18 Dec 2022 12:00:00 UTC"
}

upTitle();
