const appPage = document.createElement('template')
let htmlData = `
<style>
:host {
    display: grid;
    padding: 2rem;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    background-color: #F7F8FC;
}
</style>
`

const getData = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all')
    if (res.status === 200) {
        const data = await res.json()
        const countries = data.slice(0, 12)
        return countries
    }
}
const handleClick = (name, continente, officialName, subregion, capital, area, poblacion) => {
    const modal = document.getElementById("modal")
    modal.style.display = 'flex'
    modal.setAttribute('name', name)
    modal.setAttribute('continente', continente)
    modal.setAttribute('official', officialName)
    modal.setAttribute('subregion', subregion)
    modal.setAttribute('capital', capital)
    modal.setAttribute('area', area)
    modal.setAttribute('poblacion', poblacion)
}


class Content extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    render() {
        this.shadowRoot.appendChild(appPage.content.cloneNode(true))
        const modal = document.getElementById("modal")
    }

    htmlData = async () => {
        const countries = await getData()
        countries.map((value, index) => {
            let name = value.name.common
            let capital = value.capital
            let population = value.population
            let flag = value.flags.png
            if (name === undefined) {
                name = ""
                console.warn(`No se encontro el nombre en el indice: ${index} de los datos recuperados`)
            }
            if (capital === undefined) {
                capital = ""
                console.warn(`No se encontro la capital de ${name} en el indice: ${index} de los datos recuperados`)
            }
            if (population === undefined) {
                population = ""
                console.warn(`No se encontro la poblacion de ${name} en el indice: ${index} de los datos recuperados`)
            }
            if (flag === undefined) {
                flag = ""
                console.warn(`No se encontro la imagen de ${name} en el indice: ${index} de los datos recuperados`)
            }

            htmlData += `<pais-element name='${name}' capital="${capital}" population="${population}" image="${flag}" onclick="handleClick('${name}', '${value.region}', '${value.name.official.replace("'", "")}', '${value.subregion}', '${capital}', '${value.area}', ${population});"></pais-element>`
        })
        appPage.innerHTML = htmlData
        this.render()
    }

    connectedCallback() {
        function hola() {
            const suma = 1 + 1;
            console.log(suma)
        }
        console.log(typeof hola);
        this.htmlData()
    }

}

window.customElements.define('content-element', Content)