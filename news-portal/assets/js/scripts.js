

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
        // newess.sort(function (a, b) { return a - b });
        newess.forEach(news => {
            const row = document.createElement('div');
            row.classList.add('col-6');
            const { thumbnail_url, title, details, total_view, _id } = news;
            row.innerHTML = newsItem(thumbnail_url, title, details, news.author.img, news.author.name, total_view, _id);
            newsElement.appendChild(row);
        });
    } else {
        newsElement.innerHTML = `<div class="col-12 p-3"><div class="alert alert-danger text-center">No data found</div></div>`;
    }
    toggleSpinner(false);
}

const getNewsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => newsModal(data.data[0]));
}


const newsModal = newsdata => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalDiv.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${newsdata.title}</h5>
        </div>

        <div class="modal-body">
            <img class="image-fluid w-100" src="${newsdata.image_url}" alt="post Thumbnel">
            <div class="row pt-3">
                <div class="col-md-6 d-flex">
                    <img class="img-fluid w-25 rounded" src="${newsdata.author.img}" alt="Author">
                    <div class="athor-name px-2">
                        <span>${newsdata.author.name}</span>
                        <span>Jan 10, 2022</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <span><i class="fa-regular fa-eye"></i></span>
                    <span>${newsdata.total_view}</span>
                </div>
            </div>
            <p class="pt-3">${newsdata.details}</p>
        </div>
        <div class="modal-footer justify-content-center align-items-center">
            <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    modalContainer.appendChild(modalDiv);

    console.log(modalDiv);
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

const newsItem = (thumbnail_url, title, details, authorImg, authornName, total_view, _id) => {
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
                                            <div class="right-arrow position-absolute" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getNewsDetails('${_id}')">
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