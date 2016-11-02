import { psoViewProfile } from './phpbb-seo/memberlist-viewprofile.state';
import { psoTeam } from './phpbb-seo/memberlist-team.state';
import { psoMemberList } from './phpbb-seo/memberlist.state';
import { psoViewOnline } from './phpbb-seo/viewonline.state';
import { psoAdm } from './phpbb-seo/adm/adm.state';
import { psoViewForum } from './phpbb-seo/viewforum.state';
import { psoViewTopic } from './phpbb-seo/viewtopic.state';
import { psoIndex } from './phpbb-seo/index.state';
import { PhpbbSeo } from './phpbb-seo.state';
import { PhpbbLegacy } from './phpbb-legacy.state';
import { defaultState } from './default.state';

export let STATES = [
    defaultState, PhpbbLegacy, PhpbbSeo, psoIndex, psoViewForum, psoViewTopic, psoAdm,
    psoViewOnline, psoMemberList, psoTeam, psoViewProfile
];