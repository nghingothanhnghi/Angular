import { ComponentModel } from './component';
import { v4 as uuid } from 'uuid';
import { CreationComponentInfo } from './creation-component-info';

export class Recipe extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Process', localType: 'Process' }) {
    super(info);

    this.data = {
      nodes: [
        {
          id: uuid(),
          type: 'Start',
          text: 'Start',
          name: 'Start',
          left: 50,
          top: 50,
          w: 120,
          h: 70,
          imgUrl: 'assets/imgs/svg-component/flag-start-point.svg'
        },
        {
          id: uuid(),
          type: 'End',
          text: 'End',
          name: 'End',
          left: 50,
          top: 200,
          w: 120,
          h: 70,
          imgUrl: 'assets/imgs/svg-component/flag-end-point.svg'
        }
      ]
    };
  }
}
