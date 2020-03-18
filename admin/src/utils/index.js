import { format } from 'date-fns'

const formatStringDate = 'MM/dd/yy'
const formatStringDateTime = 'MM/dd/yy h:mm aa'

export const capitalize = lowerCasedWord => {
  const firstLetter = lowerCasedWord.substr(0,1).toUpperCase()
  const restOfWord = lowerCasedWord.substr(1).toLowerCase()
  return firstLetter + restOfWord
}

export const mapBoolToText = bool => {
	return bool 
		? 'Yes'
		: 'No'
}

export const filterObjects = (objects, searchTerm) => {
	return new Promise((res, reject) => {
		try {
			const filteredSet = objects.filter(individualObject => {
				let doesPass = false
				const keysOfObject = Object.keys(individualObject) 
				for(let key of keysOfObject){
					// coerce to string for numeric values
					const stringVersionOfDataProperty = individualObject[key].toString().toLowerCase()
					if(stringVersionOfDataProperty.includes(searchTerm.toLowerCase())){
						doesPass = true
						break
					}
				}
				return doesPass
			})
			return res(filteredSet)
		} catch(error){
			return reject(error)
		}
	})
}

export const formatDate = dateString => {
	const parsedDate = new Date(dateString)
	return format(parsedDate, formatStringDate)
}

export const formatDateTime = dateString => {
	const parsedDate = new Date(dateString)
	return format(parsedDate, formatStringDateTime)
}