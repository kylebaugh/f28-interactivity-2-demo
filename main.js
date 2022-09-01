console.log('connected')

// STEP 1: Select and Element
const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

// STEP 2: Write out the function

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

const getAllChars = () => {
  clearCharacters()

  axios.get(`${baseURL}/characters`)
    .then((res) => {
      console.log(res.data)
      let characterArray = res.data

      for(let i = 0; i < characterArray.length; i++){
        createCharacterCard(characterArray[i])
      }
      
    })
    .catch((error) => {
      console.log(error)
    })
}

const getOneChar = (event) => {
  clearCharacters()

  axios.get(`${baseURL}/character/${event.target.id}`)
    .then((res) => {
    console.log(res.data)
    const singleChar = res.data
    createCharacterCard(singleChar)
    })
    .catch((error) => {
    console.log(error)
    })
}

const addNewChar = (event) => {
  event.preventDefault()

  clearCharacters()

  let newLikes = [...newLikesText.value.split(',')]
  console.log(newLikes)

  let bodyObj = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value, 
    likes: newLikes
  }

  axios.post(`${baseURL}/character`, bodyObj)
    .then((res) => {
      let newArr = res.data

      for(let i = 0; i < newArr.length; i++){
        createCharacterCard(newArr[i])
      }

      newFirstInput.value = ''
      newLastInput.value = ''
      newGenderDropDown.value = 'female'
      newAgeInput.value = ''
      newLikesText.value = ''
    })
    .catch((err) => {
      console.log(err)
    })
}

const getOldChars = (event) => {
  event.preventDefault()

  clearCharacters()

  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
    .then((res) => {
      let oldChars = res.data

      for(let i = 0; i < oldChars.length; i++){
        createCharacterCard(oldChars[i])
      }
      ageInput.value = ''
    })
    .catch((err) => {
      console.log(err)
    })
}

// STEP 3: Combine Steps 1 and 2 using addEventListener

getAllBtn.addEventListener('click', getAllChars)

for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click', getOneChar)
}

createForm.addEventListener('submit', addNewChar)

ageForm.addEventListener('submit', getOldChars)
