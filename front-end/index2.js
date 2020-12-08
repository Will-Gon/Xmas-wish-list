const h1 = document.querySelector('h1')
let loggedIn = false
let loggedInUser = 0
const  formContainer = document.querySelector('#form-container')
const show = document.querySelector('#show-container')
const list = document.querySelector('#li-container')
const loginBtn = document.querySelector('button')
const login = document.querySelector('#login-container')
const form = document.querySelector('.new-toy-form')
const editForm = document.querySelector('.edit-toy-form')
const ul = document.createElement('ul')


loginBtn.addEventListener('click', (e) => {
    fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            user: e.target.parentElement.querySelector('input').value
        })
    })
    .then(res => res.json())
    .then(user => {
        buildUser(user)
        if (loggedIn === false){
            postToy(user)
            loggedIn = true
        }
    })
})


function buildUser(user){
    //list.innerHTML = ''
    countDown()
    login.innerHTML = ""
    h1.textContent = `Merry Christmas, ${user.name}!`
    let h3 = document.querySelector('h3')
    h3.textContent = 'Add New Toys!'

    let backForm = document.createElement('form')
    let backBtn = document.createElement('input')
    backBtn.setAttribute('type', 'submit')
    backBtn.setAttribute('value', 'Logout')
    backForm.append(backBtn)
    backBtn.addEventListener('submit', (e) => goBack(e))
    login.append(backForm)

    let h2 = document.querySelector('h2')
    h2.textContent = `${user.name}'s X-mas List`

    let nameLabel = document.createElement('label')
    nameLabel.textContent = 'Toy Name:'

    let nameInput = document.createElement('input')
    nameInput.placeholder = "Enter a toy's name..."

    let imgLabel = document.createElement('label')
    imgLabel.textContent = 'Add Toy Image:'

    let imgInput = document.createElement('input')
    imgInput.placeholder = "Enter a toy's image URL..."

    let descriptionLabel = document.createElement('label')
    descriptionLabel.textContent = 'Toy Description:'

    let descriptionInput = document.createElement('input')
    descriptionInput.placeholder = "Toy description..."

    let btn = document.createElement('input')
    btn.setAttribute('type', 'submit')

    form.append(nameLabel, nameInput, imgLabel, imgInput, descriptionLabel, descriptionInput, btn)
    user.toys.forEach(toy => buildLi(toy, user))

}

function buildLi(toy, user){
    //list.innerHTML = ""
    let li = document.createElement('li')
    let deleteBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    li.name = toy.name
    li.id = toy.id
    li.class = 'toy-li'
    li.textContent = toy.name
    deleteBtn.textContent = 'Remove'
    editBtn.textContent = 'Edit'

    li.append(deleteBtn, editBtn)
    ul.append(li)
    list.append(ul)

    li.addEventListener('click', () => displayToy(toy))
    deleteBtn.addEventListener('click', () => deleteToy(toy.id, li, user))
    editBtn.addEventListener('click', () => buildEditForm(toy, user))
}

function postToy(user){
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/toys',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: e.target[0].value,
                img_url: e.target[1].value,
                description: e.target[2].value,
                user_id: user.id
            })
        })
        .then(res => res.json())
        .then(toy => {
            buildLi(toy)
            displayToy(toy)
            form.reset()
        })
    })
}

function displayToy(toy){
    show.innerHTML = ''
    //showDiv.innerHTML = ''
    let image = document.createElement('img')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')

    h2.textContent = toy.name
    image.src = toy.img_url
    p.textContent = toy.description

    show.append(h2, image, p)
}

function deleteToy(id, li, user){
    fetch(`http://localhost:3000/toys/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        li.remove()
        //div.remove()
    })
}


function buildEditForm(toy, user){
    let editNameLabel = document.createElement('label')
    editNameLabel.textContent = 'Toy Name:'

    let editNameInput = document.createElement('input')
    editNameInput.value = toy.name

    let editImgLabel = document.createElement('label')
    editImgLabel.textContent = 'Add Toy Image:'

    let editImgInput = document.createElement('input')
    editImgInput.value = toy.img_url

    let editDescriptionLabel = document.createElement('label')
    editDescriptionLabel.textContent = 'Toy Description:'

    let editDescriptionInput = document.createElement('input')
    editDescriptionInput.value = toy.description

    let editBtn = document.createElement('input')
    editBtn.setAttribute('type', 'submit')
    editBtn.setAttribute('value', 'Edit')

    editForm.append(editNameLabel, editNameInput, editImgLabel, editImgInput, editDescriptionLabel, editDescriptionInput, editBtn)
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        patchToy(e, toy.id, user)
    })
}

function patchToy(e, id, user){
    fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name: e.target[0].value,
            img_url: e.target[1].value,
            description: e.target[2].value
        })
    })
    .then(res => res.json())
    .then(toy => {
        editForm.innerHTML = ""
        list.innerHTML = ""
        buildLi(toy, user)
        //debugger
        displayToy(toy)

    })
}

function countDown(){
    let footH2 = document.querySelector('#demo-h2')
    footH2.textContent = 'Countdown till Christmas:'
    let countDownDate = new Date("Dec 25, 2020").getTime();
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        document.querySelector('#demo').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    
        if (distance < 0) {
            clearInterval(x);
            document.querySelector('#demo').innerHTML = "Merry Christmas!";
        }
    }, 1000);

}
