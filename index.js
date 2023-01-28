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
    try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        if (res.status === 200) {
            const data = await res.json()
            const countries = data.slice(0, 12)
            return countries
        }
    } catch (error) {
        console.log(error);
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
            let name = value.name.common || "-"
            let capital = value.capital || "-";
            let population = value.population || 0
            let flag = value.flags.png || "-"
            let region = value.region || "-"
            let subregion = value.subregion || "-"
            let area = value.area || "-"
            htmlData += `<pais-element name='${name}' capital="${capital}" population="${population}" image="${flag}" region="${region}" subregion="${subregion}" area="${area}" oficial="${value.name.official.replace("'", "")} " > </pais-element>`
        })
        appPage.innerHTML = htmlData
        this.render()
    }

    connectedCallback() {
        this.htmlData()
    }

}

window.customElements.define('content-element', Content)