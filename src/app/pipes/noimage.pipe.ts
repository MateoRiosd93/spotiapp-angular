import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
})
export class NoimagePipe implements PipeTransform {
  transform(value: any[]): string {
    let noImageRout = 'assets/img/noimage.png';
     
    if (value.length) {
      return value[0].url;
    } else {
      return noImageRout;
    }
  }
}
