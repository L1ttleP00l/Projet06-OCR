    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        
        // fetch("data/photographers.json")
        //     .then(response => response.json())
        //     .then(data => console.table(data.photographers))
        //     .catch(error => console.log(error))

        const response = await fetch("data/photographers.json")
        const data = await response.json()
        return data

        // et bien retourner le tableau photographers seulement une fois récupéré
        // return ({
        //     })
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        console.log("test",photographers)

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            console.log(userCardDOM)
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();