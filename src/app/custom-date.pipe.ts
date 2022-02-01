/**
  * Usage: dateString | localDate:'format'
 **/

 import { Pipe, PipeTransform } from '@angular/core';
 import { formatDate } from '@angular/common';
import { LangSettingsService } from './lang-settings.service';
import { format } from 'date-fns';
 @Pipe({
     name: 'customDate',
     pure: false
 })
 export class CustomDatePipe implements PipeTransform {
 
     constructor(private setting:LangSettingsService) { }
 
     transform(value: any, formatString?: string) {
      
         if (!value) { return ''; }
         if (!formatString) { formatString = 'mediumDate'; }
 
         return format(new Date(), 'EEEE,MMMM do, yyyy hh:mm a', {locale: this.setting.getDateF()})
        //  return formatDate(value, formatString, this.setting.getLanguage());       
     }
 }