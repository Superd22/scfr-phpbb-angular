// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  baseForumUrl: 'http://' + window.location.hostname + "/",
  reCaptchaKey: "6LfVmeUSAAAAACv_hIeVFhNxf4LPYr03GY8TnphL",
  websocket: 'ws://www.newforum.fr:8080',
  baseHref: "/",
};
