import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: number): string {
    if (!+value) return '0 Bytes'
    let decimals=2;
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(value) / Math.log(k))
    return `${parseFloat((value / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

}
