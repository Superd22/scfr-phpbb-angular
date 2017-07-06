# RealSpaceV7

## Front-end build
- clone repo
- `ng serve --host www.newforum.fr` 


### Different domain
*if front&back are not on same domain, need disable cross-domain check*

change `app/services/phpbb-api.service` `const baseUrl` to new domain (@todo set this in environement)


## Back-end build
- phpbb >3.2.x
- required extensions :
  - *clone in `ext/scfr/`*
  - [scfr/phpbbJsonTemplate](https://github.com/Superd22/phpbb-json-template)
  - [scfr/wsbb](https://github.com/Superd22/PHPBB-Websocket)
  - [scfr/sibylla](https://github.com/Superd22/phpbb-sibylla)
  - [scfr/main](https://github.com/Superd22/phpbb-scfr-main)
- activate all extensions.
- (*opt*) launch websocket server via `php server/main.php` in `ext/scfr/wsbb`
