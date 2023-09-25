declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

declare var globalThis: typeof globalThis & {
  prisma: any;
};
