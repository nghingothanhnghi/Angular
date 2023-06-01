
export function prepareProfile(profile): void {
    if (profile === null) {
        throw Error('Argument null exception. Argument: profile');
    }

    const localType = profile.localType ? profile.localType.toLowerCase() : '';

    function prepareProfileNode(profileNode): void {

        profileNode.__type = localType + '_node';
        if (profileNode.children) {
            profileNode.children.forEach(child => {
                prepareProfileNode(child);
            });
        }
    }

    if (profile.profile) {
        profile.profile.forEach(child => {
            prepareProfileNode(child);
        });
    }
}
