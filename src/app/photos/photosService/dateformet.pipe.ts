import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformet'
})
export class DateformetPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    //01/20
    const date = new Date()
    let datearray:any = value.split('/')
    let newDate:any = date.setMonth(parseInt(datearray[0])-1);
    newDate =  date.toLocaleString('en-US', { month: 'long' })
    return newDate+  " " +datearray[1];
  }

}
