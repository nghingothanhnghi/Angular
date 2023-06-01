// (200303.24)
export interface IElement {
    id?: string,
    xPath: string,
    label: string,
    prefix?: string,
    namespace: string,
    typeName: string,
    comments: string,
    required: boolean,
    minOccurs: string,
    maxOccurs: string,
    loopingOption: string,
    fieldLengthValidation: boolean,
    minLength: number,
    maxLength: number,
    dataType: string,
    dateFormat: string,
    numberFormat: string,
    signed: string,
    impliedDecimals: string,
    namespaceDeclarations: any[],
    typeNamespace: string,
    children?: any[]
}

export class Element implements IElement{
    xPath = '';
    label = '';
    prefix = '';
    namespace ='' ;
    typeName = null;
    comments = null;
    required = false;
    minOccurs = '0';
    maxOccurs = '1';
    loopingOption = 'u';
    fieldLengthValidation = false;
    minLength = null;
    maxLength = null;    
    dataType = 'c';
    dateFormat = 'MMddyyyy';
    numberFormat = '#,###,###,##0.00';
    signed = null;
    impliedDecimals = null;
    namespaceDeclarations = [];
    typeNamespace = null;
    children = [];  //(*)
    constructor(name?){
        this.label= (name? name :'element')
    }
}

export interface IJsonElement {
    label: string;
    valueType: string;          // s:simple, ar:array-repeating, aa:array-absolute, o:object
    required: boolean,          // absolute
    minOccurs: number,          // repeating,
    maxOccurs: number,          // repeating
    fieldLengthValidation: boolean;
    minLength: number;
    maxLength: number;
    dataType: string;
    dateFormat: string;   // (190503.42353) format
    numberFormat: string;
    signed: boolean;
    impliedDecimals: number
}
