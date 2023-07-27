const slugify = require('slugify');

exports.getQueryParams = (query) => {

  // page
  let page = 1;
  if (query?.page && !isNaN(+query?.page)) {
    page = +query?.page;
  }

  // limit
  let limit = Number(process.env.PER_PAGE) || 10;
  if (query?.limit && (query?.limit === "all" || !isNaN(+query?.limit))) {
    limit = query.limit === "all" ? "all" : +query?.limit;
  }

  // search
  let search = null;
  if(query?.search) {
    search = query.search.trim();
  }

  // orderby
  let orderby = "id";
  if(query?.orderby) {
    orderby = query.orderby;
  }

  // orderdir
  let orderdir = "DESC";
  const orderdirs = ["DESC","ASC"];
  if(query?.orderdir) {
    if (orderdirs.includes(query.orderdir.trim().toUpperCase())) {
      orderdir = query.orderdir.trim().toUpperCase();
    }
  }

  return { page, limit, orderby, orderdir, search };
}

exports.pageResults = (totalItems, perPage, currentPage) => {
  if (perPage == "all") {
    return { totalItems, perPage };
  } else {
    const totalPages = Math.ceil(totalItems / perPage);
    return { totalItems, perPage, totalPages, currentPage };
  }
};

exports.slug = (str) => {
  return slugify(str, {
    lower: true,
    strict: true
  });
};

exports.randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomDarkColor = () => {

  // random numbers to create a HSL color
  let h = this.randomNumber(0, 360);
  let s = this.randomNumber(30, 80);
  let l = 50;

  // convert HSL color to RGB
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

exports.err = (status, message) => {
  throw Object.assign(new Error(message), { status });
};