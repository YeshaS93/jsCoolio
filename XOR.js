/**
  QUESTION: Given an array A of n numbers and array Q having q queries (each having start and end), calculate the XOR between
  all numbers from A[start] to A[end], for all queries. i.e.
  A = [1, 2, 3, 4, 5], Q = [1, 4]
  XOR(A, Q) = [A[1] ^ A[2] ^ A[3] ^ A[4]] = [4]
    
  CONCEPT: 
  Truth table for XOR:
    0 ^ 0 = 0
    1 ^ 0 = 1
    0 ^ 1 = 1
    1 ^ 1 = 0
  
  Some properties of XOR
  1. x ^ 0 = 0
  2. x ^ -1 = ~x (1's complement)
  3. x ^ x = 0
  4. (x ^ y) ^ z = x ^ (y ^ z) (Associative property)
  
  APPROACH: The solution will do some sort of pre-computation based on the 4th property. We will derive the answer from 
  the pre-computed values in O(1) time based on the 3rd property.
**/


function XOR(A, Q) {
  const 
    n = A.length,
    X = Array(n);
  
  /** 
    Precompute XOR values such that X[i] = XOR of all values from 0 to i. i.e. 
      X[i] = X[0] ^ X[1] ^ ... ^ X[i]
  **/
  
  // XOR of first value is the value itself
  X[0] = A[0];
  
  // Use Associative property to calculate the current value based on previous values
  for(i=1; i<n; i++) {
    X[i] = X[i-1] ^ A[i];
  }
  
  const ans = Array(Q.length);
  
  for(q=0; q<Q.length; q++) {
    const [i, j] = Q[q];
    /**
      We know that X[j] consists of XOR from 0 to j.
      Using the 3rd property above, we know that XORing a value with itself will nullify that value. Hence,
        a ^ (a ^ b) = (a ^ a) ^ b = 0 ^ b = b (Using property 1 and 3 above)
      If we XOR X[j] with X[i-1], we will nullify X[i-1] (XOR of all values from 0 to i-1) from the sum.
        A[i] ^ A[i+1] ^ ... ^ A[j] 
      = (A[0] ^ A[1] ^ ... ^ A[i-1]) ^ (A[0] ^ A[1] ^ ... ^ A[i-1]) ^ (A[i] ^ A[i+1] ^ ... ^ A[j])
      = X[i-1] ^ X[j]
    **/
    ans[q] = i > 0 ? X[j] ^ X[i-1] : X[j];
  }
  
  return ans;
}
