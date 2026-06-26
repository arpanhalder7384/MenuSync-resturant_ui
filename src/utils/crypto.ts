// Synchronous pure-JS SHA-256 implementation
function sha256(str: string): string {
  const MASK = 0xffffffff;
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  const words: number[] = [];
  for (let i = 0; i < str.length * 8; i += 8) {
    words[i >> 5] |= (str.charCodeAt(i / 8) & 0xff) << (24 - (i % 32));
  }

  const len = str.length * 8;
  words[len >> 5] |= 0x80 << (24 - (len % 32));
  words[(((len + 64) >> 9) << 4) + 15] = len;

  for (let i = 0; i < words.length; i += 16) {
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    let f = H[5];
    let g = H[6];
    let h = H[7];

    const w: number[] = [];
    for (let j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] || 0;
      } else {
        const s0 = (rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3)) & MASK;
        const s1 = (rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10)) & MASK;
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) & MASK;
      }

      const S1 = (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) & MASK;
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[j] + w[j]) & MASK;
      const S0 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) & MASK;
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) & MASK;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) & MASK;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) & MASK;
    }

    H[0] = (H[0] + a) & MASK;
    H[1] = (H[1] + b) & MASK;
    H[2] = (H[2] + c) & MASK;
    H[3] = (H[3] + d) & MASK;
    H[4] = (H[4] + e) & MASK;
    H[5] = (H[5] + f) & MASK;
    H[6] = (H[6] + g) & MASK;
    H[7] = (H[7] + h) & MASK;
  }

  function rightRotate(v: number, n: number) {
    return (v >>> n) | (v << (32 - n));
  }

  return H.map(v => ("00000000" + (v >>> 0).toString(16)).slice(-8)).join("");
}

const SECURITY_SALT = "plateproject_secret_salt_2026";

/**
 * Generates a unique, deterministic, secure 24-character code from a mobile number.
 */
export function generateRestaurantCode(mobileNumber: string): string {
  const cleanMobile = mobileNumber.replace(/\s+/g, "").replace(/\+/g, "");
  const hash = sha256(`${cleanMobile}:${SECURITY_SALT}`);
  return hash.slice(0, 24);
}

/**
 * Generates a unique, deterministic, secure 12-character code from a mobile number and table number.
 */
export function generateTableCode(mobileNumber: string, tableNumber: string): string {
  const cleanMobile = mobileNumber.replace(/\s+/g, "").replace(/\+/g, "");
  const cleanTable = tableNumber.trim();
  const hash = sha256(`${cleanMobile}:${cleanTable}:${SECURITY_SALT}`);
  return hash.slice(0, 12);
}
