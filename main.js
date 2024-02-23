//const API_KEY = `b69bbdaa05d2405b8c8f9e574293bcba`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
const sideMenuList = document.querySelectorAll(".side-menu-list");
const magnifyingGlass = document.getElementById("magnifying-glass");

menus.forEach((menu) =>
  menu.addEventListener("click", () => getNewsByCategory(event))
);
sideMenuList.forEach(
  (menu) => menu.addEventListener("click", () => getNewsByCategory(event))
  //sideMenuList의 querySelectorAll를 배열로 변환한다음 for문으로 함수 작성 후 closeNav() 붙이기??
);

let url = new URL(`https://nuna-api.netlify.app/top-headlines`);

const getNews = async () => {
  try {
    //소스코드 작성 - 에러 발생하면
    const response = await fetch(url); //url 내의 데이터를 가지고 옴

    const data = await response.json(); //json의 형태로 데이터를 만들어 줌
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    //catch가 에러 잡음
    errorRender(error.message);
  }
};
const getLatestNews = async () => {
  url = new URL(
    `https://nuna-api.netlify.app/top-headlines` //재할당
    //https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}
  ); //url인스턴스는 url에 필요한 함수와 변수들을 제공함
  getNews();
};
getLatestNews();

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://nuna-api.netlify.app/top-headlines?category=${category}`
  );
  getNews();
};

const getNewsBySearch = async () => {
  const keyword = document.getElementById("input-search").value;
  url = new URL(`https://nuna-api.netlify.app/top-headlines?q=${keyword}`);
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size"
    src=${news.urlToImage}>
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name} * ${news.publishedAt}</div>
  </div>
</div>`
    )
    .join(" "); //string타입으로 바꿈으로써 배열의 ,제거
  document.getElementById("news-board").innerHTML = newsHTML;
};

magnifyingGlass.addEventListener(
  "click",
  (openSearch = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      //span태그는 inline
      inputArea.style.display = "none"; //감추기
    } else {
      inputArea.style.display = "inline"; //보이게 하기
    }
  })
);

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}!
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const openNav = () => {
  const open = (document.getElementById("mySidenav").style.width = "250px");
  // document.getElementsByClassName("menus").style.display = none;
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0px";
};
