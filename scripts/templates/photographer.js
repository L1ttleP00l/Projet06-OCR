// This function defines a template for a photographer's data.
function photographerTemplate(data) {
    // Destructure the photographer's data.
    const { name, id, city, country, tagline, price, portrait } = data;

    // Construct the URL for the photographer's portrait image.
    const picture = `assets/photographers/${portrait}`;

    // Function to generate the DOM structure for a photographer card.
    function getUserCardDOM() {
        // Create the necessary HTML elements.
        const article = document.createElement('article');
        const a = document.createElement('a');
        a.setAttribute("href", "photographer.html?id=" + id);
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Portrait de " + name);
        img.setAttribute("aria-label", "Sélection du photographe ");
        const h2 = document.createElement('h2');
        const pcity = document.createElement('p');
        const ptagline = document.createElement('p');
        const pprice = document.createElement('p');
        
        // Set text content for the elements.
        h2.textContent = name;
        pcity.textContent = city + ", " + country;
        ptagline.textContent = tagline;
        pprice.textContent = price + "€/jour";
        
        // Append the elements to create the card structure.
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(pcity);
        article.appendChild(ptagline);
        article.appendChild(pprice);

        return article;
    }

    // Return an object with relevant data and the DOM generation function.
    return { name, picture, getUserCardDOM };
}