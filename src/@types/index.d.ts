declare module "*.jpg";
declare module "*.png";
declare module "*.mp4";
declare module "*.webp";
// declare module "*.svg";
// eslint-disable-next-line no-useless-escape
declare module "*.svg" {
    const content: any;
    export default content;
}