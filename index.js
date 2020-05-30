const endPoint = 'https://www.googleapis.com/books/v1/volumes?q=';

let utils = {
  getGenres() {
    return JSON.parse(localStorage.getItem('genres')) || [];
  },

  setGenres(bookGenres) {
    let books = new Set(bookGenres);
    localStorage.setItem('genres', JSON.stringify(Array.from(books).slice(0,5)));
  },

  storeCategories(book) {
    let categories = this.getGenres();
    let bookGenres = book.volumeInfo.categories || [];
    this.setGenres([ ...bookGenres, ...categories ])
  },
}

let bookStore = {

  skeleton: '', 

  query(selector) {
    return document.querySelector(selector);
  },

  initialize() {
    this.skeletonBooks();
    let genres = utils.getGenres();
    if (genres.length>0) {
      let randomGenre = genres[Math.floor(Math.random() * genres.length-1)];
      this.getResults(randomGenre);
    }
    this.query('#form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.getResults(this.query('#searchTerm').value);
    });
  },

  skeletonBooks() {
    let count = 0;
    while(count<10) {
      this.skeleton+= `<div class="card book flex flex-row w-30 p-0 mt-2 mb-2 mb-sm-0 mb-xs-0 mb-md-0">
        <div class="img" style="width: 120px;"></div>
        <div class="card-body p-0 pr-2 pl-2">
          <p class="card-title mb-1 pt-2 font-weight-bolder author">.........</p>
          <p class="fs-7 mb-1"> By .....</p>
          <p class="card-text  desc"> """"""""""""""""""""""""""""""<br/>""""""""""""""""""""""""""""""</p>
        </div>
      </div>`;
      count++;
    }   
  },

  renderBook(book) {
    let thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
    let description = book.volumeInfo.description ? book.volumeInfo.description.slice(0, 50) + '...' : '';
    let author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : '';
    return `<div class="card book flex flex-row w-30 p-0 mt-2 mb-2 mb-sm-0 mb-xs-0 mb-md-0">
    <div class="class="img"></div>  
    <img style="width: 120px;" src="${thumbnail}" class="card-img-top" alt="">
      <div class="card-body p-0 pr-2 pl-2">
        <p class="card-title mb-1 pt-2 font-weight-bolder author">${book.volumeInfo.title}</p>
        <p class="fs-7 mb-1"> By ${author}</p>
        <p class="card-text  desc">${description}</p>
      </div>
    </div>`;
  },

  renderBooks(list) {
    let books = '';
    list && list.forEach((book) => books += this.renderBook(book));
    this.query("#books").innerHTML = books!='' ? books : this.skeleton;
  },

  getResults(genre) {
    this.renderBooks();
    fetch(`${endPoint}${genre}`).then(async (res) => {
      let data = await res.json();
      utils.storeCategories(data.items[0]);
      this.renderBooks(data.items);
    })
  }

};

window.onload = () => {
  bookStore.initialize();  
};


