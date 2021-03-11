function tickets(peopleInLine){
	let res = 'NO';
  if(peopleInLine[0] != 25){
		res = 'NO';
		return res;
	}
	let sd = 0;
	for(let i = 0; i < peopleInLine.length; i++	){
		if(peopleInLine[i] === 25){
			sd +=25;
			res = 'YES';
		} 

		if(peopleInLine[i] > 25){
			if (sd >= peopleInLine[i] - 25){
				sd  = sd + peopleInLine[i] - (peopleInLine[i] - 25);
				res = 'YES';
			} else {
				res = 'NO';
				return res;
			}
		}
		
		
		console.log(sd+res);
	}
	return res;
}

console.log(tickets([25,50,25,100,25,25,25,100,25,25,25,100,25,100,25]));