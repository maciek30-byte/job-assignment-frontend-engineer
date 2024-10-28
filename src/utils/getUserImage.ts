export const DEFAULT_PLACEHOLDER = "http://i.imgur.com/Qr71crq.jpg";

export const getUserImage = (image: string): string => {
    return image || DEFAULT_PLACEHOLDER;
};