const paisPage = document.createElement('template')

const handleClickOpenModal = (name, continente, officialName, subregion, capital, area, poblacion) => {
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
class Pais extends HTMLElement {
    constructor() {
        super()
        this.name = ""
        this.capital = ""
        this.population = ""
        this.image = ""
        this.region = ""
        this.subregion = "-"
        this.area = ""
        this.oficial = ""
        this.attachShadow({ mode: "open" })
    }

    render() {
        paisPage.innerHTML = `
        ${this.getStyle()}
        <div id="card" class="card" >
            <h3 onclick="handleClickOpenModal('${this.name}', '${this.region}', '${this.oficial}', '${this.subregion}', '${this.capital}', '${this.area}', ${this.population});"  class="name"  ></h3>
            <p  class="capital"></p>
            <div  class="populationDiv">
                <img title="PeopleIcon" id="peopleIcon" class="peopleIcon" src="./icons/person-solid.svg">
                <p class="population"></p>
            </div>
        </div>
        `
        this.shadowRoot.appendChild(paisPage.content.cloneNode(true))
        this.shadowRoot.querySelector(".name").innerHTML = this.name
        this.shadowRoot.querySelector(".capital").innerHTML = this.capital
        this.shadowRoot.querySelector(".population").innerHTML = this.population
        this.shadowRoot.getElementById("card").style.backgroundImage = `url('${this.image}')`
    }
    getStyle() {
        const style = `
            <style>
            :host {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                padding: 1rem .5rem 1rem .5rem;
                height: 8rem;
                width: 100%;
                max-width: 18rem;
                display: flex;
                flex-direction: column;
                color: white;
                font-family: 'Work Sans', sans-serif;
                font-size: 1.1rem;
                font-weight: normal;
                text-shadow: -1px -1px 2px black, 1px 1px 5px black;
                border-radius: 1rem;
                border: 1px  white;
                background-size: auto;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                box-shadow: 6px 6px 15px #424242;
                overflow:hidden;
                position: relative;
                animation-name: initialanimation;
                animation-duration: 2s;
                transition: all 0.3s ease-out;
                
            }
            
            .card:hover  {
                transform: scale(1.2);  
            }
            .card:hover .name {
                text-decoration: underline;
                cursor: pointer;
            }
            
            @keyframes initialanimation{
                from { 
                    left: -100px;
                    opacity: 0;
                }
                to{
                    left: 0;
                    opacity: 1;
                }
            }
            .population {
                margin: 0;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                height: 100%;
            }
            .populationDiv {
                margin: 0;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                height: 100%;
            }
            .capital {
                margin: 0;
            }
            .name {
                margin: 0;
                
            }
            .peopleIcon {
                margin: 0;
                padding-right: .5rem;
                width: .8rem;
            }
        </style>
        `
        return style
    }
    connectedCallback() {
        console.log(typeof this.action);
        this.render()
    }

    attributeChangedCallback(name, oldval, newVal) {
        if (name === "name") {
            this.name = newVal
        } else if (name === "capital") {
            this.capital = newVal
        } else if (name === "population") {
            this.population = newVal
        } else if (name === "image") {
            this.image = newVal
        } else if (name === "region") {
            this.region = newVal
        } else if (name === "subregion") {
            this.subregion = newVal
        } else if (name === "area") {
            this.area = newVal
        } else if (name === "oficial") {
            this.oficial = newVal
        }
    }

    static get observedAttributes() {
        return ['name', 'capital', 'population', 'image', 'region', 'subregion', 'area', 'oficial'];
    }
}

window.customElements.define('pais-element', Pais)