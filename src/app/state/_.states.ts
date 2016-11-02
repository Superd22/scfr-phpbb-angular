import { psoAdm } from './phpbb-seo/adm/adm.state';
import { psoViewForum } from './phpbb-seo/viewforum.state';
import { psoViewTopic } from './phpbb-seo/viewtopic.state';
import { psoIndex } from './phpbb-seo/index.state';
import { PhpbbSeo } from './phpbb-seo.state';
import { PhpbbLegacy } from './phpbb-legacy.state';
import { defaultState } from './default.state';

export let STATES = [
    defaultState, PhpbbLegacy, PhpbbSeo, psoIndex, psoViewForum, psoViewTopic, psoAdm
];