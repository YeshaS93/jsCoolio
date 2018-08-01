/**
  QUESTION: Find prime numbers from 1 to n.
  
  INTENTION: 
  There are 2 problems with the Sieve of Eratosthenes method:
  1. Its space complexity is O(n) which can go out of hands when n is really large.
  2. Its cache use is highly suboptimal. The algorithm exhibits almost no locality of reference.
  
  APPROACH: We will be using the Segmented Sieve method for this. 
  
  This approach uses the Sieve of Eratosthenes but broken down over several intervals each of length less than or equal to 
  sqrt(n).
  
  1. Divide the number into segments of length sqrt(n).
  2. Find primes in first segment using Sieve of Eratosthenes
  3. For each of the other segments, 
      a. Cross off multiples of using primes found so far.
      b. The numbers not crossed off yet are primes, add them to the primes list.
  
  TIME COMPLEXITY: 
  Same as Sieve of Eratosthenes: O(nlog(logn))
  
  SPACE COMPLEXITY: O(sqrt(n))
  
  Reference: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Segmented_sieve
**/

import findPrimesBySieve from './primesWithBasicSieve';

/**
  Marks off mutliples of prime number given in the given range (from, to]
**/
function markAsMultiples(A, from, to, prime) {
  /**
    Start from the smallest multiple present in the range
  **/
  const quo = Math.ceil((from+1)/prime);
  for(let i = quo * prime; i <= to; i += prime) {
    A[i-from] = false;
  }
}

/**
  Returns primes between `from` to `to` based on the previous primes found so far. Exclude `from`.
**/
function findPrimesBetween(from, to, prevPrimes) {
  /**
    For any number k between from and to, A[k-from] = index of k in the array A.
  **/
  const 
    len = to - from + 1,
    A = Array(len).fill(true);
  
  /**
    Cross off multiples present between `from` to `to` for primes found previously
  **/
  for(let i=0; i < prevPrimes.length; i++) {
    markAsMultiples(A, from, to, prevPrimes[i]);
  }
    
  const acc = [];
  
  /**
    Accumulate all the numbers not crossed off yet in the range.
  **/
  let j = 1;
  while(j<len) {
    if(A[j]) {
    /**
      For any index k between in A, k+from = number being represented by the index.
    **/
      acc.push(j+from); 
    }
    j++;
  }
  
  return acc;
}

/**
  Returns primes less than or equal to given number using segmented sieve method.
**/
function findPrimesLessThanOrEqualTo(n) {
  /**
    No primes less than or equal to 2
  **/
  if(n < 2) {
    return [];
  }
  
  /**
    Segmented Sieve:
    1. Divide the number into segments of length sqrt(n).
    2. Find primes in first segment using Sieve of Eratosthenes
    3. For each of the other segments, 
      a. Cross off multiples of using primes found so far.
      b. The numbers not crossed off yet are primes, add them to the primes list.
  **/
  const 
    delta = Math.floor(Math.sqrt(n)),
    primes = findPrimesBySieve(delta);
    
  let m = delta;
  
  /**
    `m` is the start of the segment.
    Carry on while `m` is less than or equal to given number.
  **/
  while(m <= n) {
    /**
      Find primes between m to m+delta, excluding m.
    **/
    primes.push(...findPrimesBetween(m, Math.min(m+delta, n), primes));
    m+=delta;
  }
  return primes;
}
