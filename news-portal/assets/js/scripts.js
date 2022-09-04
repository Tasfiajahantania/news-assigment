

const getCategory = () => {

    // api request url
    const url = "https://openapi.programming-hero.com/api/news/categories";
    // api call
    fetch(url).then(res => res.json()).then(response => categoryShow(response.data.news_category));

}


const categoryShow = (categories) => {
    // access menu element
    const menu = document.getElementById('nav-menu');
    categories.forEach(category => {
        const span = document.createElement('span');
        span.innerHTML = `<li class="nav-menu-item" onclick="getNews(this)" category-id="${category.category_id}">${category.category_name}</li>`;
        menu.appendChild(span);
    });
}

const getNews = (e = '') => {
    toggleSpinner(true);

    const categoryId = e == '' ? "08" : e.getAttribute('category-id');

    const category = e == '' ? "All News" : e.innerText;

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url).then(res => res.json()).then(response => displayNews(response.data, category));

}
const displayNews = (newess, category) => {
    const newsElement = document.getElementById('news');
    document.getElementById('result').innerHTML = `${newess.length} items found for category <span class="text-primary">${category}</span>`;
    newsElement.innerHTML = null;
    if (newess.length > 0) {
        newess.forEach(news => {
            const row = document.createElement('div');
            row.classList.add('col-6');
            const { thumbnail_url, title, details, total_view } = news;
            row.innerHTML = newsItem(thumbnail_url, title, details, news.author.img, news.author.name, total_view);
            newsElement.appendChild(row);
        });
    } else {
        newsElement.innerHTML = `<div class="alert alert-danger text-center">
                        No found data
                    </div>`;
    }
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const newsItem = (thumbnail_url, title, details, authorImg, authornName, total_view) => {
    return `<div class="card mb-3 shadow-sm news-item">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${thumbnail_url}" class="img-fluid rounded-start p-3" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title news-title">${title}</h5>
                                        <p class="card-text news-description">${details.substr(0, 50) + '...'}</p>
                                        <div class="new-item-bottom position-relative">
                                            <div class="author d-flex position-relative">
                                                <div class="avatar">
                                                    <img src="${authorImg}" alt="author-avatar">
                                                </div>
                                                <div class="details position-absolute">
                                                    <span class="name fw-bold">${authornName == '' ? 'Unknown' : authornName}</span>
                                                    <p class="published-date text-muted">Jan 10, 2022</p>
                                                </div>
                                            </div>
                                            <div class="total-view d-flex position-absolute">
                                                <span class="icon text-muted">
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                </span>
                                                <span class="fw-bold ms-2">${total_view}</span>
                                            </div>
                                            <div class="right-arrow position-absolute">
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
    </div>`;
}
getCategory();
getNews();