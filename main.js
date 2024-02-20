const API_KEY=`b69bbdaa05d2405b8c8f9e574293bcba`
let newsList = [];
const getLatesNews = async() => {
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  //url인스턴스는 url에 필요한 함수와 변수들을 제공함 
  const response = await fetch(url) //url 내의 데이터를 가지고 옴
  const data = await response.json(); //json의 형태로 데이터를 만들어 줌
  newsList = data.articles;
  render();
  console.log(newsList);
};
getLatesNews();

const render=() => {
  const newsHTML = newsList.map((news) => `<div class="row news">
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
).join(' ') //string타입으로 바꿈으로써 배열의 ,제거
  document.getElementById('news-board').innerHTML = newsHTML;
}
