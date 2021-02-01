export function generateRandomID(): string  {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const randomID = randLetter + Date.now();
    return randomID;
}