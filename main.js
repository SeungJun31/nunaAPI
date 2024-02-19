const API_KEY=`b69bbdaa05d2405b8c8f9e574293bcba`
let news = [];
const getLatesNews = async() => {
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  //url인스턴스는 url에 필요한 함수와 변수들을 제공함 
  const response = await fetch(url) //url 내의 데이터를 가지고 옴
  const data = await response.json(); //json의 형태로 데이터를 만들어 줌
  news = data.articles;
  console.log(news);
};
getLatesNews();
