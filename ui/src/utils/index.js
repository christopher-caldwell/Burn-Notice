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