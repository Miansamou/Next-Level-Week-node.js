function localAPI(url, localSelect){
    fetch(url)
    .then(res => res.json())
    .then(local => {
        for(const places of local){
            localSelect.innerHTML += `<option value="${places.id}">${places.nome}</option>`
        }
    })
}

function populateUFs (){
    const ufSelect = document.querySelector("select[name=uf]")
    const ufUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

    localAPI(ufUrl, ufSelect)
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const cityUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    localAPI(cityUrl, citySelect)

    citySelect.disabled = false
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

document
    .querySelector("select[name=city]")
    .addEventListener("change", (event) => {
        const cityInput = document.querySelector("input[name=city]")
        
        const indexOfSelectedCity = event.target.selectedIndex 
        cityInput.value = event.target.options[indexOfSelectedCity].text
    })


const itemsToCollect = document.querySelectorAll(".items-grid li")

const collectedItems = document.querySelector("input[name=items]")
let selectItems = []

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = itemLi.dataset.id
    itemLi.classList.toggle("Selected")

    const alreadySelected = selectItems.findIndex( item => {
        return item == itemId
    })

    if (alreadySelected >= 0){
        const filterdItems = selectItems.filter( item => {
            return (item != itemId)
        })

        selectItems = filterdItems
    }else {
        selectItems.push(itemId)
    }
    collectedItems.value = selectItems
}