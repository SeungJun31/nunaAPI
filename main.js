//const API_KEY = `b69bbdaa05d2405b8c8f9e574293bcba`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
const sideMenuList = document.querySelectorAll(".side-menu-list");
const magnifyingGlass = document.getElementById("magnifying-glass");

menus.forEach((menu) =>
  menu.addEventListener("click", () => getNewsByCategory(event))
);
sideMenuList.forEach((menu) =>
  menu.addEventListener("click", () => getNewsByCategory(event))
  //sideMenuList의 querySelectorAll를 배열로 변환한다음 for문으로 함수 작성 후 closeNav() 붙이기??
);

const getLatesNews = async () => {
  const url = new URL(
    `https://nuna-api.netlify.app/top-headlines`
     //https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}
  );
  //url인스턴스는 url에 필요한 함수와 변수들을 제공함
  const response = await fetch(url); //url 내의 데이터를 가지고 옴
  const data = await response.json(); //json의 형태로 데이터를 만들어 줌
  newsList = data.articles;
  render();
};
getLatesNews();

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `https://nuna-api.netlify.app/top-headlines?category=${category}`
  );
  const response = await fetch(url); 
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getNewsBySearch = async () => {
  const keyword = document.getElementById("input-search").value;
  const url = new URL(
    `https://nuna-api.netlify.app/top-headlines?q=${keyword}`
  );
  const response = await fetch(url); 
  const data = await response.json(); 
  newsList = data.articles;
  render();
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

magnifyingGlass.addEventListener("click", openSearch = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") { //span태그는 inline
    inputArea.style.display = "none"; //감추기
  } else {
    inputArea.style.display = "inline"; //보이게 하기
  }
});

const openNav = () => {
  const open = document.getElementById("mySidenav").style.width = "250px";
  // document.getElementsByClassName("menus").style.display = none;
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0px";
};