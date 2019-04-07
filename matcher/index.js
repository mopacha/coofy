
const toRegExp = (patterns =[])=> {
	return patterns.map(item=> {
		return new RegExp(item)
	})
}

const match = (patterns, str) => {
	const patterns = toRegExp(patterns)

	for(let i = 0; i < patterns.length; i++) {
	    pattern = patterns[i]
	    if (pattern.test(str)) {
	      return true
	    }
  	}
    return false
}

module.exports = {
  match
}