/**
 * Hash a password with bcrypt (same as app uses for login).
 * Usage: node scripts/hash-password.js [password]
 * Default: "passworda"
 * Copy the output into singles.password_hash in the DB.
 */
import bcrypt from 'bcrypt';

const plain = process.argv[2] || 'passworda';
const hash = await bcrypt.hash(plain, 6);
console.log('Plain:', plain);
console.log('Hash (for password_hash):', hash);
