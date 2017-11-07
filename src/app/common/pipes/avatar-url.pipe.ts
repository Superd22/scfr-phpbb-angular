import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'avatarURL'
})
export class SCFRAvatarURL implements PipeTransform {

    transform(value: string): string {
        if (!value) return "https://starcitizen.fr/Forum/assets/images/default-avatar.jpg";

        if (value.indexOf("./download/file.php?") > -1) {
            value = value.replace("./download/file.php?", "https://starcitizen.fr/forum-api/download/file.php?");
        }

        if (value.indexOf("starcitizen.fr/Forum/download/file.php?") > -1) {
            value = value.replace("starcitizen.fr/Forum/download/", "starcitizen.fr/forum-api/download/");
        }

        return value;
    }
}
