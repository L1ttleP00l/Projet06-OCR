function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    // const url = window.location.href

    function getUserCardDOM() {
        const article = document.createElement('article');
        const a = document.createElement('a')
        a.setAttribute("href", "photographer.html?id=" + id)
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait de " + name)
        img.setAttribute("aria-label", "Sélection du photographe " + name)
        const h2 = document.createElement('h2');
        const pcity = document.createElement('p');
        pcity.setAttribute("class", "city")
        const ptagline = document.createElement('p')
        ptagline.setAttribute("class", "tagline")
        const pprice = document.createElement('p')
        pprice.setAttribute("class", "price")
        h2.textContent = name;
        pcity.textContent = city + ", " + country
        ptagline.textContent = tagline
        pprice.textContent = price + "€/jour"
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(pcity);
        article.appendChild(ptagline);
        article.appendChild(pprice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}