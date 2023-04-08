import { faker } from '@faker-js/faker'

const namesArray = Array.from(Array(1000), () => {
  return faker.helpers.unique(faker.name.fullName)
})

export default namesArray
