import { init } from "@sentry/browser";

console.group("Build Info");
console.log(`Branch: ${process.env.BRANCH}`);
console.log(`Revision: ${process.env.REVISION}`);
console.log(`Release: ${process.env.RELEASE}`);
console.log(`Node Environment: ${process.env.NODE_ENV}`);
console.groupEnd();

if (process.env.MONITORING === "true") {
  init({
    dsn: process.env.DSN,
    release: process.env.RELEASE,
    debug: process.env.NODE_ENV === "development"
  });
}
