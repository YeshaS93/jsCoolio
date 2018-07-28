/**
  QUESTION: Find the greatest common divisor between given 2 numbers
  
  CONCEPT: The Greatest Common Divisor (GCD) of two numbers is the largest integer that divides both of them without leaving
  a remainder. 
  
  APPROACH: According to Number Theory, the greatest common divisor of two numbers does not change if the larger number is 
  replaced by its remainder when divided with the smaller number. i.e. 
    GCD(a, b) = GCD(a, b mod a), b > a
    
  The solution known as Euclid's algorithm is based on the above principle.
  
  NOTE: This code depicts the above approach for only 2 numbers but it can be extended to more than 2 numbers using the
  associative principle for GCD: GCD(a, b, c) = GCD(a, GCD(b, c)) = GCD(GCD(a, b), c) = GCD(GCD(a, c), b)
  
  REFERENCE: https://en.wikipedia.org/wiki/Euclidean_algorithm
**/

function GCD(a, b) {
  /**
    Convert both numbers to positive numbers.
    GCD(a, b) = GCD(|a|, |b|)
  **/
  a = Math.abs(a);
  b = Math.abs(b);
  
  let 
    largerNumber = Math.max(a, b),
    smallerNumber = Math.min(a, b),
    remainder = largerNumber % smallerNumber;
  
  /**
    Keep replacing the larger number with the remainder of the larger number when divided by the smaller number.
    Exit from the loop when the remainder becomes 0. The smaller number at this time is the GCD of the original numbers.
  **/
  
  while(remainder) {
    largerNumber = smallerNumber;
    smallerNumber = remainder;
    remainder = largerNumber % smallerNumber;
  }
  
  return smallerNumber;
}
