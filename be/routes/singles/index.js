/**
 * Singles routes – re-exports all handlers for server_be.js.
 * Legacy names (with suffix) are kept for compatibility.
 */

export { registerUser, registerUser as registerUser_FFFFFFFF } from './register.js';
export { beVerifyLoginPassword } from './beVerifyLoginPassword.js';
export { getAllSingles, getAllSingles as getAllSingles_BBBBBBBB } from './getAllSingles.js';
export { getVettedSingles, getVettedSingles as getVettedSingles_CCCCCCCC } from './getVettedSingles.js';
export { getSinglesInterested, getSinglesInterested as getSinglesInterested_DDDDDDD } from './getSinglesInterested.js';
export { getSinglesRequest, getSinglesRequest as getSinglesRequest_EEEEEEEE } from './getSinglesRequest.js';
export { createPassword, createPassword as createPassword_GGGGGGGG } from './createPassword.js';
export { verifyPhone, verifyPhone as verifyPhone_HHHHHHHH } from './verifyPhone.js';
export { resendPhoneCode } from './resendPhoneCode.js';
export { beLoginBypass } from './beLoginBypass.js';
