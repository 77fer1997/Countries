const modalPage = document.createElement('template')
modalPage.innerHTML = `
<style>
    :host {
        margin: 0;
        padding: 0;
        position: fixed;
        width: 100%;
        height: 100vh;
        display: none;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.8);
        cursor: pointer;
        z-index: 999;
    }
    .modal {
        padding: 1rem;
        min-width: 25rem;
        color: black;
        font-family: 'Work Sans', sans-serif;
        border-radius: 1rem;
        background-color: white;
        cursor: auto;
    }
    .name {
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: center;
    }
    .officialName {
        margin: 0;
        padding-bottom: 1rem;
        width: 100%;
        text-align: center;
        font-style: italic;
    }
</style>
<div class="modal">
    <h1 class="name"></h1>
    <p class="officialName"></p>
    <p class="continente"></p>
    <p class="subregion"></p>
    <p class="capital"></p>
    <p class="area"></p>
    <p class="poblacion"></p>
    <slot></slot>
</div>
`

class Modal extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
    }

    render() {
        this.shadowRoot.appendChild(modalPage.content.cloneNode(true))
        const modal = document.getElementById("modal")
        modal.addEventListener("click", () => { modal.style.display = "none" })
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldval, newVal) {
        if (name === "name") {
            this.shadowRoot.querySelector(".name").innerHTML = newVal
        } else if (name === "official") {
            this.shadowRoot.querySelector(".officialName").innerHTML = newVal
        } else if (name === "continente") {
            this.shadowRoot.querySelector(".continente").innerHTML = "Contiente: " + newVal
        } else if (name === "subregion") {
            this.shadowRoot.querySelector(".subregion").innerHTML = "Sub-region: " + newVal
        } else if (name === "capital") {
            this.shadowRoot.querySelector(".capital").innerHTML = "Capital: " + newVal
        } else if (name === "area") {
            this.shadowRoot.querySelector(".area").innerHTML = "Area: " + newVal + " m2"
        } else if (name === "poblacion") {
            this.shadowRoot.querySelector(".poblacion").innerHTML = "Poblacion: " + newVal
        }
    }

    static get observedAttributes() {
        return ['name', 'official', 'continente', 'subregion', 'capital', 'area', 'poblacion'];
    }
}

window.customElements.define('modal-element', Modal)