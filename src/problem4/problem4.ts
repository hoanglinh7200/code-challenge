function sum_to_n_a(n: number): number {
	/***
		- Using the mathematical formula: arithmetic progression - the sum of the first n integers.
		- Efficiency: This is the most efficient approach to summation, especially for very large n.
	***/
	if (n > 0) {
		//integer
		return (n * (n + 1)) / 2
	}
	if (n < 0) {
		//negative integer
		return -((n * (n - 1)) / 2)
	}
	return 0
}

function sum_to_n_b(n: number): number {
	/***
		- Using a loop.
		- Efficiency: This method is straightforward and works well for small to medium values n. 
					  However, it can be slow for very large due to the linear iteration.
	***/
	let total = 0
	if (n > 0) {
		// integer
		for (let index = 1; index <= n; index++) {
			total += index
		}
	}
	if (n < 0) {
		//negative integer
		for (let index = 0; index >= n; index--) {
			total += index
		}
	}
	return total
}

function sum_to_n_c(n: number): number {
	/***
		- Using recursion.
		- Efficiency: elegant and readable but this method is less efficient for large n 
					  due to potential stack overflow errors in environments with limited stack size.
	***/
	if (n === 0) return 0
	if (n > 0) return n + sum_to_n_c(n - 1) //integer
	return n + sum_to_n_c(n + 1) //negative integer
}