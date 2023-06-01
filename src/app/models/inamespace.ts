// (200303)
export interface INamespace {
    label: string,
    prefix: string,
    comments: string,
    children?: any[];
}

export class Namespace implements INamespace{
    label = 'namespace';
    prefix = null;
    comments = null;
    children = [];
    constructor(name?){
        this.label= (name? name :'namespace')
    }
}
