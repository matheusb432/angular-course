import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // TODO ? createEmbeddedView(template) creates the view of this directive's element.
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // TODO ? clear() destroys all views that are attached to this directive
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
