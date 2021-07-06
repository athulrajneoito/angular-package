import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from './button-config.model';
export class PopButtonComponent {
    constructor() {
        this.config = new ButtonConfig();
        this.events = new EventEmitter();
        this.name = 'PopButtonComponent';
    }
    ngOnInit() {
    }
    onClick(event) {
        this.emitInputEvent(this.config.event);
    }
    emitInputEvent(name, message = null) {
        if (this.config.bubble)
            this.events.emit({ source: this.name, type: 'field', name: name, config: this.config, message: message });
    }
    ngOnDestroy() {
    }
}
PopButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-pop-button',
                template: "<!--<div class=\"pop-button-container\" [ngClass]=\"{'sw-hidden': config.hidden}\">-->\n<!--  <button [type]=config.type-->\n<!--          matTooltipClass=\"button-tooltip-background\"-->\n<!--          [hidden]=config.hidden>-->\n<!--    {{config.label}}-->\n<!--  </button>-->\n<!--</div>-->\n\n<div class=\"pop-button-container\" [ngClass]=\"{'sw-hidden': config.hidden}\">\n  <button *ngIf=\"config.type !== 'mat-flat-button'\"\n      [style.borderRadius.px]=\"config.radius\"\n      mat-raised-button\n      [style.height.px]=\"config.size\"\n      [style.minWidth.px]=\"config.width\"\n      matTooltipClass=\"button-tooltip-background\"\n      [hidden]=config.hidden\n      [disabled]=config.disabled\n      [color]=config.color\n      (click)=\"onClick($event)\">\n    <div class=\"pop-button-content\"\n         [style.fontSize.px]=\"config.text\"\n         [style.lineHeight.px]=\"config.text\">\n      <span *ngIf=\"config.value\">{{ config.value }}</span>\n      <div *ngIf=\"config.icon && config.value\" class=\"sw-mar-hrz-xs\"></div>\n      <mat-icon\n          *ngIf=\"config.icon\"\n          [style.fontSize.px]=\"config.text\"\n          [color]=config.iconColor>\n        {{ config.icon }}\n      </mat-icon>\n    </div>\n  </button>\n  <button *ngIf=\"config.type === 'mat-flat-button'\"\n          [style.borderRadius.px]=\"config.radius\"\n          mat-flat-button\n          [style.height.px]=\"config.size\"\n          [style.minWidth.px]=\"config.width\"\n          matTooltipClass=\"button-tooltip-background\"\n          [hidden]=config.hidden\n          [disabled]=config.disabled\n          [color]=config.color\n          (click)=\"onClick($event)\">\n    <div class=\"pop-button-content\"\n         [style.fontSize.px]=\"config.text\"\n         [style.lineHeight.px]=\"config.text\">\n      <span *ngIf=\"config.value\">{{ config.value }}</span>\n      <div *ngIf=\"config.icon && config.value\" class=\"sw-mar-hrz-xs\"></div>\n      <mat-icon\n        *ngIf=\"config.icon\"\n        [style.fontSize.px]=\"config.text\"\n        [color]=config.iconColor>\n        {{ config.icon }}\n      </mat-icon>\n    </div>\n  </button>\n</div>\n",
                styles: [":host ::ng-deep .mat-raised-button{min-width:0;padding:0 5px!important;line-height:normal!important}:host ::ng-deep .mat-raised-button mat-icon{width:auto;line-height:normal}:host ::ng-deep button{flex:1;justify-content:space-around;align-items:center;font-size:1em!important;line-height:normal;outline:0;border:1px solid var(--border)!important}.pop-button-content{display:flex;align-items:center;justify-content:space-between;padding:5px;box-sizing:border-box}:host ::ng-deep .mat-icon{height:auto!important;width:auto!important}"]
            },] }
];
PopButtonComponent.propDecorators = {
    config: [{ type: Input }],
    events: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wb3AtY29tbW9uL3NyYy9saWIvbW9kdWxlcy9iYXNlL3BvcC1maWVsZC1pdGVtL3BvcC1idXR0b24vcG9wLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBU3JELE1BQU0sT0FBTyxrQkFBa0I7SUFML0I7UUFNVyxXQUFNLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekMsV0FBTSxHQUF3QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBFLFNBQUksR0FBRSxvQkFBb0IsQ0FBQztJQW1CcEMsQ0FBQztJQWhCQyxRQUFRO0lBQ1IsQ0FBQztJQUdELE9BQU8sQ0FBQyxLQUFLO1FBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQWtCLElBQUk7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBR0QsV0FBVztJQUNYLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsb29FQUEwQzs7YUFFM0M7OztxQkFFRSxLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbkNvbmZpZyB9IGZyb20gJy4vYnV0dG9uLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBQb3BCYXNlRXZlbnRJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9wb3AtY29tbW9uLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItcG9wLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3AtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL3BvcC1idXR0b24uY29tcG9uZW50LnNjc3MnIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBvcEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY29uZmlnOiBCdXR0b25Db25maWcgPSBuZXcgQnV0dG9uQ29uZmlnKCk7XG4gIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxQb3BCYXNlRXZlbnRJbnRlcmZhY2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBuYW1lID0nUG9wQnV0dG9uQ29tcG9uZW50JztcblxuXG4gIG5nT25Jbml0KCl7XG4gIH1cblxuXG4gIG9uQ2xpY2soZXZlbnQpe1xuICAgIHRoaXMuZW1pdElucHV0RXZlbnQodGhpcy5jb25maWcuZXZlbnQpO1xuICB9XG5cblxuICBlbWl0SW5wdXRFdmVudChuYW1lLCBtZXNzYWdlOiBzdHJpbmcgPSBudWxsKTogdm9pZHtcbiAgICBpZiggdGhpcy5jb25maWcuYnViYmxlICkgdGhpcy5ldmVudHMuZW1pdCh7IHNvdXJjZTogdGhpcy5uYW1lLCB0eXBlOiAnZmllbGQnLCBuYW1lOiBuYW1lLCBjb25maWc6IHRoaXMuY29uZmlnLCBtZXNzYWdlOiBtZXNzYWdlIH0pO1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpe1xuICB9XG59XG4iXX0=