export interface ComponentType {
    type: string;
    localType: string;
    name: string;
    icon: string;
}

export interface ComponentTypeGroup {
    name: string;
    items: ComponentType[];
}

export const componentTypeGroups: ComponentTypeGroup[] = [
    {
        name: 'Recipe',
        items: [{
            type: 'Process',
            localType: 'Process',
            name: 'Recipe',
            icon: '/assets/imgs/svg-component/process.svg'
        }]
    },
    {
        name: 'Profile',
        items: [{
            type: 'Profile',
            localType: 'Xml',
            name: 'Xml Profile',
            icon: '/assets/imgs/svg-component/profileXML.svg'
        },
        {
            type: 'Profile',
            localType: 'json',
            name: 'Json Profile',
            icon: '/assets/imgs/svg-component/profileJSON.svg'
        }]
    },
    {
        name: 'Map',
        items: [{
            type: 'Map',
            localType: 'map-profile',
            name: 'Map',
            icon: '/assets/imgs/svg-component/map.svg'
        }]
    },
    {
        name: 'Operation',
        items: [{
            type: 'Operation',
            localType: 'SOAP',
            name: 'SOAP Operation',
            icon: '/assets/imgs/svg-component/soap-operation.svg'
        },
        {
            type: 'Operation',
            localType: 'Disk',
            name: 'Disk Operation',
            icon: '/assets/imgs/svg-component/disk.svg'
        },
        {
            type: 'Operation',
            localType: 'httpclient',
            name: 'Http Client Operation',
            icon: '/assets/imgs/svg-component/browser.svg'
        }]
    },
    {
        name: 'Connection',
        items: [{
            type: 'Connection',
            localType: 'SOAP',
            name: 'SOAP Connection',
            icon: '/assets/imgs/svg-component/soap-connection.svg'
        },
        {
            type: 'Connection',
            localType: 'Disk',
            name: 'Disk Connection',
            icon: '/assets/imgs/svg-component/disk.svg'
        },
        {
            type: 'Connection',
            localType: 'httpclient',
            name: 'Http Client Connection',
            icon: '/assets/imgs/svg-component/browser.svg'
        }]
    }
];
