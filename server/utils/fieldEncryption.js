// crypto-utils.js
import crypto from "crypto";

const key = Buffer.from(process.env.FIELD_ENC_KEY || "", "base64"); // expect 32 bytes
if (key.length !== 32) {
    throw new Error("FIELD_ENC_KEY must be 32 bytes (base64)");
}

export function encrypt(text) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([
        cipher.update(String(text), "utf8"),
        cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(data) {
    const b = Buffer.from(data, "base64");
    const iv = b.slice(0, 12);
    const tag = b.slice(12, 28);
    const encrypted = b.slice(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
}