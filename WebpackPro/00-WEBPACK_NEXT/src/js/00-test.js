const FIRSTNAME = 'Vunbo'
const LASTNAME = 'Yao'
const AGE = 29

const getFullName = () => {
	return `${FIRSTNAME} ${LASTNAME} ${AGE}`
}

const component = (name) => {
  const element = document.createElement('div')
  element.innerHTML = name
  element.classList.add('name')
  return element
}

export default {
  getFullName,
  component,
}
