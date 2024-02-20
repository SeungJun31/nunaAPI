const API_KEY = `b69bbdaa05d2405b8c8f9e574293bcba`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");

menus.forEach((menu) =>
  menu.addEventListener("click", () => getNewsByCategory(event))
);

const getLatesNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
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
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url); 
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getNewsBySearch = async () => {
  const keyword = document.getElementById("input-search").value;
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
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
