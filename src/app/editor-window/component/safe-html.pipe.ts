import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'safeHtml',
  pure: true,
})
/** Allows the insertion of tags with attributes into the DOM (otherwise the attributes are striped). */
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) { }

  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}