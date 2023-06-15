//variable cards

let selected =null

//dom cards
const cards= document.getElementsByClassName('card-body')
const cardsContainer= document.querySelectorAll('.btn.card')


// Config cards

for(let card of cards){
    card.classList.add('card__align--center')

    const lastP=card.querySelector('p:last-child')
    lastP.classList.add('text-white')

    const nthChild = card.querySelector(':nth-child(3)')
    const b= document.createElement('b')
    b.innerText=nthChild.innerText
    nthChild.innerHTML= b.outerHTML

}


//utils cards
const colors= ['bg-primary','bg-warning', 'bg-success']
const transparent='bg-transparent'

const changeColor = (container, index,revert) =>{
    const i= Number(index)
    
    revert ? container.classList.replace(colors[i], transparent)
            : container.classList.replace(transparent, colors[i])

}
 
//events cards

const cardEnter= (e) => {
    const {index} = e.target.dataset 
    changeColor(e.target, index, false)
    
}

const cardLeave= (e)=> {
    const {index} = e.target.dataset 
    changeColor(e.target, index, true)

}

const cardClick= (e)=> {
    selected = e.currentTarget.dataset.index 
    eventAssignmentAll()
}

const eventCleaner = (container) => {
    container.removeEventListener('mouseenter', cardEnter)
    container.removeEventListener('mouseleave', cardLeave)
    container.removeEventListener('click', cardClick)


}


const eventAssignment=(container)=>{
    container.addEventListener('mouseenter', cardEnter)
    container.addEventListener('mouseleave', cardLeave)
    container.addEventListener('click', cardClick)

}

const eventAssignmentAll=()=>{
    for (let container of cardsContainer){
        eventCleaner(container)

        const {index}=container.dataset

        if (index !== selected){
            eventAssignment(container)
            changeColor(container,index,true)
        }
    }
}


eventAssignmentAll()


//variables form
let bouquetSelection = null //ramoSeleccion
let bouquetsNumber = null // cantidadRamos
let total = null

const price=2600
const categories = {
    a:{percent: 15, value: '0'},
    b:{percent: 20, value: '1'},
    c:{percent: 25, value: '2'}
}

const totalText = 'Total a pagar:$ '

const form = document.forms.form
const inputs = form.getElementsByTagName('input')
const select = form.getElementsByTagName('select')[0]

const totalTag = document.getElementById('total')

const resetBtn = document.getElementById('reset')
const submitBtn = document.getElementById('submit')

//config

totalTag.innerText = totalText


const totalPrice = () => {

    if (!bouquetSelection || !bouquetsNumber) return;

    const totalValue = price * bouquetsNumber
    const discount = (totalValue/100) * categories[bouquetSelection].percent

    total=totalValue - discount

    totalTag.innerText = totalText + total

}
totalPrice()

//Events
const resetCategories = ()=>{
    total = null
    selected = null
    totalTag.innerText=totalText
    eventAssignmentAll()

}

const setBouquetSelection = (e)=> {
    const option = e.target.value

    if(option ==='none'){
        resetCategories()
        return
    }

    bouquetSelection = option
    const index = categories[bouquetSelection].value
    const container = cardsContainer[index]

    selected = index
    changeColor(container,index)
    eventAssignmentAll()
   
    totalPrice()
}

const setBouquetsNumber = (e)=> {
    const {value} = e.target

    if(value < 0 || isNaN(value)){
        e.target.value = 0
        total = null
        return
    }

    bouquetsNumber = value
    totalPrice()

}


//Events: Buttons

const reset = (e) => {
    e.preventDefault()

    for(let input of inputs)
        input.value= ''
    select.value ='none'

    resetCategories()
}

const submit = (e) => {
    e.preventDefault()

    const {firstname,lastname,address,email,bouquetsNumber,bouquetSelection} = form

    const verified = {
        firstname:firstname.value !== '',
        lastname:lastname.value !== '' ,
        address:address.value !== '',
        email:email.value.includes('@'),
        bouquetsNumber:bouquetsNumber.value > 0,
        bouquetSelection: bouquetSelection.value !== 'none',

    }

    const values = Object.values(verified)
    const submitAccepted = values.every(value => value)

    submitAccepted 
    ? location.href = 'compraExitosa.html'
    : alert('Debes completar todos los campos correctamente')
}
form.addEventListener('submit', submit)
form.bouquetSelection.addEventListener('change', setBouquetSelection)
form.bouquetsNumber.addEventListener('change', setBouquetsNumber)
resetBtn.addEventListener('click', reset)