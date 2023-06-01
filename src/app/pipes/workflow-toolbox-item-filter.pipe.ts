import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workflowToolboxItemFilter'
})
export class WorkflowToolboxItemFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
