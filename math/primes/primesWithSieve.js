/**
  QUESTION: Find prime numbers from 1 to n.
  
  APPROACH: We will be using the Sieve of Eratosthenes method for this. 
  Reference: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
  
  TIME COMPLEXITY: 
  1. Initialise Array A and fill with true ................ O(n)
  2. Go from 2 to sqrt(n) markig off the multiples ........ O(nlog(logn))
  3. Print the prime numbers .............................. O(n)
  
  Hence, total complexity: O(nlog(logn))
  
  SPACE COMPLEXITY: O(n)
  
  Note: The number of primes less than a given number are about n/logn.
  Reference: https://primes.utm.edu/howmany.html#1
**/


function markMultiplesAsFalse(A, k) {
  for(i=k*k; i<A.length; i+=k) {
    A[i] = false;
  }
}

function findPrimes(n) {
  if(n < 2) {
    return false;
  }
  
  const A = Array(n).fill(true), // ......................................................................................(1)
    sqrt = Math.sqrt(n);
  
  /**
    0 and 1 are not primes so mark them as false.
  **/
  A[0] = A[1] = false;
  
  /**
    We will start from the smallest number, 2. We wll cross off every multiple of 2 and then move to the next uncrossed 
    number, i.e. the next prime number. 
    We will keep going until we reach the squareroot of n. (All the composite numbers larger than the squareroot will have 
    been already covered as a multiple by the earlier numbers)
  **/
  let i = 2;
  
  while (i < sqrt) { // ..................................................................................................(2)
    markMultiplesAsFalse(A, i);
    i++;
    while(!A[i] && i < sqrt) {
      i++;
    }
  }
  
  const ans = [];
  let j = 0;
  
  /**
    All the numbers still marked as true in the list are prime numbers smaller than n.
  **/
  while(j < n) { // ......................................................................................................(3)
    if(A[j]) {
      ans.push(j);
    }
    j++;
  }
  
  return ans;
}
