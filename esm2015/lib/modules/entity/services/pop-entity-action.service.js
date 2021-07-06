import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { PopLog, PopTemplate, ServiceInjector, } from '../../../pop-common.model';
import { EvaluateWhenConditions, FieldItemModel, ParseLinkUrl, ParseModelValue } from '../pop-entity-utility';
import { FieldItemGroupConfig } from '../../base/pop-field-item-group/pop-field-item-group.model';
import { DeepMerge, DynamicSort, GetHttpResult, IsCallableFunction, IsDefined, IsNumber, IsObject, IsString, JsonCopy, SnakeToPascal, TitleCase } from '../../../pop-common-utility';
import { PopEntityUtilFieldService } from './pop-entity-util-field.service';
import { PopExtendService } from '../../../services/pop-extend.service';
import { MatDialog } from '@angular/material/dialog';
import { PopActionDialogComponent } from '../../base/pop-dialogs/pop-action-dialog/pop-action-dialog.component';
import * as i0 from "@angular/core";
export class PopEntityActionService extends PopExtendService {
    constructor() {
        super();
        this.name = 'PopEntityActionService';
        this.srv = {
            dialog: ServiceInjector.get(MatDialog),
            field: ServiceInjector.get(PopEntityUtilFieldService)
        };
        this.asset = {
            dialogRef: undefined,
            field: ServiceInjector.get(PopEntityUtilFieldService)
        };
    }
    do(core, action, extension, blockEntity = false) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!this.asset.dialogRef && this._checkArgs(core, action)) {
                this.asset.dialogRef = this.srv.dialog.open(PopActionDialogComponent, {
                    disableClose: true,
                    width: extension && extension.width ? (IsNumber(extension.width) ? `${extension.width}px` : `${extension.width}`) : '400px',
                    data: {
                        core: core,
                        extension: extension,
                        actionName: IsString(action, true) ? action : null,
                        action: IsObject(action, true) ? action : null,
                    },
                    panelClass: 'sw-mat-dialog-flex'
                });
                this.dom.setSubscriber('pop-action-dialog-close', this.asset.dialogRef.beforeClosed().subscribe((res) => {
                    res = GetHttpResult(res);
                    this.asset.dialogRef = null;
                    return resolve(res);
                }));
            }
            else {
                return resolve(null);
            }
        }));
    }
    _checkArgs(core, action, extension) {
        if (IsObject(core, ['params', 'access'])) {
            if (IsString(action, true) || IsObject(action, ['name'])) {
                return true;
            }
        }
        return false;
    }
    /**
     * A helper method that sets up a FieldGroupConfig for a create/new pop-table-dialog
     * @param entityConfig
     * @param goToUrl
     */
    doAction(core, actionName, extension) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            PopTemplate.buffer();
            if (IsObject(core.repo.model.action, [actionName]) && IsObject(core.repo.model.action[actionName], true)) {
                const action = core.repo.model.action[actionName];
                PopLog.info(this.name, `doAction`, { core: core, actionName: actionName, action: action, extension: extension });
                const actionItems = [];
                let needsResource = false;
                let model;
                const actionFieldItems = {};
                // start with getting fields labeled for new doAction
                if (IsObject(action.fields, true)) {
                    Object.keys(action.fields).map((name) => {
                        let field = {};
                        if (name in core.repo.model.field) {
                            field = core.repo.model.field[name];
                        }
                        model = {};
                        if (field.when)
                            model.when = JsonCopy(field.when);
                        if (IsObject(field.model, true)) {
                            model = Object.assign(model, field.model);
                        }
                        let actionTransformation;
                        if (IsObject(action.fields[name], true)) {
                            actionTransformation = IsString(action.fields[name].transformation, true) ? action.fields[name].transformation : null;
                            model = Object.assign(model, action.fields[name]);
                        }
                        // delete model.metadata;
                        delete model.transformation;
                        if (actionTransformation)
                            model.transformation = actionTransformation; // only want to apply transformation if it was set directly on action
                        model.value = IsDefined(model.value) ? ParseModelValue(model.value, core) : null;
                        // model.value = IsDefined( model.value ) ? ParseModelValue(model.value, core) : null;
                        if (!model.value && IsObject(model.options, ['defaultValue'])) {
                            model.value = ParseModelValue(model.options.defaultValue, core);
                        }
                        model.hidden = !EvaluateWhenConditions(core, model.when, core);
                        if (IsObject(extension, true) && model.name in extension) {
                            model.value = ParseModelValue(extension[model.name]);
                            model.readonly = true;
                        }
                        model.tabOnEnter = true;
                        actionFieldItems[name] = model;
                        if (model.options && model.options.resource) {
                            needsResource = true;
                        }
                    });
                }
                // if needsMetadata go grab it before you try to build out the fields
                if (needsResource) {
                    const resource = yield core.repo.getUiResource(core);
                    if (IsObject(resource, true))
                        DeepMerge(core.resource, resource);
                    PopLog.init(this.name, `doAction:needed resource`, resource);
                    Object.keys(actionFieldItems).map((name) => {
                        const actionItemModel = FieldItemModel(core, actionFieldItems[name], false);
                        const actionItem = this.srv.field.buildCoreFieldItem(core, actionItemModel);
                        if (IsObject(actionItem.config, true)) {
                            actionItem.config.facade = true;
                            if (IsObject(actionItem.config.patch)) {
                                const patch = actionItem.config.patch;
                                patch.duration = 0;
                                patch.path = null;
                                patch.displayIndicator = false;
                            }
                        }
                        actionItems.push(actionItem);
                    });
                    PopTemplate.clear();
                    console.log('actionItems', actionItems);
                    return resolve(this.getActionDialogConfig(core, action, actionItems, core.resource));
                }
                else {
                    // no metadata was needed for any of these fields
                    Object.keys(actionFieldItems).map((name) => {
                        const actionItemModel = FieldItemModel(core, actionFieldItems[name], false);
                        const actionItem = this.srv.field.buildCoreFieldItem(core, actionItemModel);
                        if (IsObject(actionItem.config, true)) {
                            actionItem.config.facade = true;
                            if (IsObject(actionItem.config.patch)) {
                                const patch = actionItem.config.patch;
                                patch.duration = 0;
                                patch.path = null;
                                patch.displayIndicator = false;
                            }
                        }
                        actionItems.push(actionItem);
                    });
                    PopTemplate.clear();
                    console.log('actionItems', actionItems);
                    const actionConfig = this.getActionDialogConfig(core, action, actionItems, (IsObject(core.entity, true) ? core.entity.ui : {}));
                    PopLog.info(this.name, `doAction: config`, actionConfig);
                    return resolve(actionConfig);
                }
            }
            else {
                PopTemplate.clear();
                PopTemplate.error({ message: `${TitleCase(actionName)} not configured.`, code: 500 });
                return resolve(null);
            }
        }));
    }
    /**
     * Callback helper to newEntity
     * @param entityConfig
     * @param fields
     * @param metadata
     * @param goToUrl
     */
    getActionDialogConfig(core, action, actionFieldItems, metadata, extension) {
        if (!IsObject(extension))
            extension = {};
        actionFieldItems.sort(DynamicSort('sort'));
        let goToUrl = IsString(extension.goToUrl, true) ? extension.goToUrl : (action.goToUrl ? action.goToUrl : null);
        if (goToUrl)
            goToUrl = ParseModelValue(goToUrl, core, true);
        let postUrl = IsString(extension.postUrl, true) ? extension.postUrl : (action.postUrl ? ParseLinkUrl(String(action.postUrl).slice(), (IsObject(core.entity, true) ? core.entity : {})) : core.params.path);
        if (postUrl)
            postUrl = ParseModelValue(postUrl, core, true);
        const dialogConfig = new FieldItemGroupConfig({
            id: action.name,
            params: core.params,
            fieldItems: actionFieldItems,
            metadata: metadata,
            inDialog: {
                postUrl: postUrl,
                postUrlVersion: 1,
                submit: TitleCase(action.submitText),
                title: action.header ? action.header : `${TitleCase(action.name)} ${SnakeToPascal(core.repo.getDisplayName())}`,
                goToUrl: goToUrl,
                callback: IsCallableFunction(action.callback) ? action.callback : null
            }
        });
        PopLog.init(this.name, `ActionDialog`, dialogConfig);
        return dialogConfig;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
PopEntityActionService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PopEntityActionService_Factory() { return new PopEntityActionService(); }, token: PopEntityActionService, providedIn: "root" });
PopEntityActionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
PopEntityActionService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLWVudGl0eS1hY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BvcC1jb21tb24vc3JjL2xpYi9tb2R1bGVzL2VudGl0eS9zZXJ2aWNlcy9wb3AtZW50aXR5LWFjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFHb0IsTUFBTSxFQUMvQixXQUFXLEVBQUUsZUFBZSxHQUM3QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlHLE9BQU8sRUFBRSxvQkFBb0IsRUFBaUMsTUFBTSw0REFBNEQsQ0FBQztBQUNqSSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsYUFBYSxFQUNiLFNBQVMsRUFDVixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7O0FBTWhILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxnQkFBZ0I7SUFlMUQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQWZWLFNBQUksR0FBRyx3QkFBd0IsQ0FBQztRQUd0QixRQUFHLEdBQUc7WUFDZCxNQUFNLEVBQWEsZUFBZSxDQUFDLEdBQUcsQ0FBRSxT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LEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O1lBeE5GLFVBQVUsU0FBRTtnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29yZUNvbmZpZywgRW50aXR5LCBFbnRpdHlBY3Rpb25EYXRhSW50ZXJmYWNlLCBFbnRpdHlBY3Rpb25JbnRlcmZhY2UsIEVudGl0eUV4dGVuZEludGVyZmFjZSxcbiAgRmllbGRJbnRlcmZhY2UsXG4gIEZpZWxkSXRlbVBhdGNoSW50ZXJmYWNlLCBQb3BMb2csXG4gIFBvcFRlbXBsYXRlLCBTZXJ2aWNlSW5qZWN0b3IsXG59IGZyb20gJy4uLy4uLy4uL3BvcC1jb21tb24ubW9kZWwnO1xuaW1wb3J0IHsgRXZhbHVhdGVXaGVuQ29uZGl0aW9ucywgRmllbGRJdGVtTW9kZWwsIFBhcnNlTGlua1VybCwgUGFyc2VNb2RlbFZhbHVlIH0gZnJvbSAnLi4vcG9wLWVudGl0eS11dGlsaXR5JztcbmltcG9ydCB7IEZpZWxkSXRlbUdyb3VwQ29uZmlnLCBGaWVsZEl0ZW1Hcm91cERpYWxvZ0ludGVyZmFjZSB9IGZyb20gJy4uLy4uL2Jhc2UvcG9wLWZpZWxkLWl0ZW0tZ3JvdXAvcG9wLWZpZWxkLWl0ZW0tZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHtcbiAgRGVlcE1lcmdlLFxuICBEeW5hbWljU29ydCxcbiAgR2V0SHR0cFJlc3VsdCxcbiAgSXNDYWxsYWJsZUZ1bmN0aW9uLFxuICBJc0RlZmluZWQsXG4gIElzTnVtYmVyLFxuICBJc09iamVjdCxcbiAgSXNTdHJpbmcsXG4gIEpzb25Db3B5LFxuICBTbmFrZVRvUGFzY2FsLFxuICBUaXRsZUNhc2Vcbn0gZnJvbSAnLi4vLi4vLi4vcG9wLWNvbW1vbi11dGlsaXR5JztcbmltcG9ydCB7IFBvcEVudGl0eVV0aWxGaWVsZFNlcnZpY2UgfSBmcm9tICcuL3BvcC1lbnRpdHktdXRpbC1maWVsZC5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcEV4dGVuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9wb3AtZXh0ZW5kLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgUG9wQWN0aW9uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vYmFzZS9wb3AtZGlhbG9ncy9wb3AtYWN0aW9uLWRpYWxvZy9wb3AtYWN0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuXG5cbkBJbmplY3RhYmxlKCB7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSApXG5leHBvcnQgY2xhc3MgUG9wRW50aXR5QWN0aW9uU2VydmljZSBleHRlbmRzIFBvcEV4dGVuZFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBuYW1lID0gJ1BvcEVudGl0eUFjdGlvblNlcnZpY2UnO1xuXG5cbiAgcHJvdGVjdGVkIHNydiA9IHtcbiAgICBkaWFsb2c6IDxNYXREaWFsb2c+U2VydmljZUluamVjdG9yLmdldCggTWF0RGlhbG9nICksXG4gICAgZmllbGQ6IDxQb3BFbnRpdHlVdGlsRmllbGRTZXJ2aWNlPlNlcnZpY2VJbmplY3Rvci5nZXQoIFBvcEVudGl0eVV0aWxGaWVsZFNlcnZpY2UgKVxuICB9O1xuXG4gIHByb3RlY3RlZCBhc3NldCA9IHtcbiAgICBkaWFsb2dSZWY6IDxNYXREaWFsb2dSZWY8UG9wQWN0aW9uRGlhbG9nQ29tcG9uZW50Pj51bmRlZmluZWQsXG4gICAgZmllbGQ6IDxQb3BFbnRpdHlVdGlsRmllbGRTZXJ2aWNlPlNlcnZpY2VJbmplY3Rvci5nZXQoIFBvcEVudGl0eVV0aWxGaWVsZFNlcnZpY2UgKVxuICB9O1xuXG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICB9XG5cblxuICBkbyggY29yZTogQ29yZUNvbmZpZywgYWN0aW9uOiBzdHJpbmcgfCBFbnRpdHlBY3Rpb25JbnRlcmZhY2UsIGV4dGVuc2lvbj86IEVudGl0eUV4dGVuZEludGVyZmFjZSwgYmxvY2tFbnRpdHkgPSBmYWxzZSApOiBQcm9taXNlPEVudGl0eT57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEVudGl0eT4oIGFzeW5jKCByZXNvbHZlICkgPT4ge1xuICAgICAgaWYoICF0aGlzLmFzc2V0LmRpYWxvZ1JlZiAmJiB0aGlzLl9jaGVja0FyZ3MoIGNvcmUsIGFjdGlvbiApICl7XG4gICAgICAgIHRoaXMuYXNzZXQuZGlhbG9nUmVmID0gdGhpcy5zcnYuZGlhbG9nLm9wZW4oIFBvcEFjdGlvbkRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgICAgICB3aWR0aDogZXh0ZW5zaW9uICYmIGV4dGVuc2lvbi53aWR0aCA/ICggSXNOdW1iZXIoIGV4dGVuc2lvbi53aWR0aCApID8gYCR7ZXh0ZW5zaW9uLndpZHRofXB4YCA6IGAke2V4dGVuc2lvbi53aWR0aH1gICkgOiAnNDAwcHgnLFxuICAgICAgICAgIGRhdGE6IDxFbnRpdHlBY3Rpb25EYXRhSW50ZXJmYWNlPntcbiAgICAgICAgICAgIGNvcmU6IGNvcmUsXG4gICAgICAgICAgICBleHRlbnNpb246IGV4dGVuc2lvbixcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6IElzU3RyaW5nKCBhY3Rpb24sIHRydWUgKSA/IGFjdGlvbiA6IG51bGwsXG4gICAgICAgICAgICBhY3Rpb246IElzT2JqZWN0KCBhY3Rpb24sIHRydWUgKSA/IGFjdGlvbiA6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYW5lbENsYXNzOiAnc3ctbWF0LWRpYWxvZy1mbGV4J1xuICAgICAgICB9ICk7XG5cbiAgICAgICAgdGhpcy5kb20uc2V0U3Vic2NyaWJlciggJ3BvcC1hY3Rpb24tZGlhbG9nLWNsb3NlJywgdGhpcy5hc3NldC5kaWFsb2dSZWYuYmVmb3JlQ2xvc2VkKCkuc3Vic2NyaWJlKCAoIHJlczogYW55ICkgPT4ge1xuICAgICAgICAgIHJlcyA9IEdldEh0dHBSZXN1bHQoIHJlcyApO1xuICAgICAgICAgIHRoaXMuYXNzZXQuZGlhbG9nUmVmID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSggcmVzICk7XG4gICAgICAgIH0gKSApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCBudWxsICk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH1cblxuXG4gIHByaXZhdGUgX2NoZWNrQXJncyggY29yZTogQ29yZUNvbmZpZywgYWN0aW9uOiBzdHJpbmcgfCBFbnRpdHlBY3Rpb25JbnRlcmZhY2UsIGV4dGVuc2lvbj86IEVudGl0eUV4dGVuZEludGVyZmFjZSApe1xuICAgIGlmKCBJc09iamVjdCggY29yZSwgWyAncGFyYW1zJywgJ2FjY2VzcycgXSApICl7XG4gICAgICBpZiggSXNTdHJpbmcoIGFjdGlvbiwgdHJ1ZSApIHx8IElzT2JqZWN0KCBhY3Rpb24sIFsgJ25hbWUnIF0gKSApe1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRoYXQgc2V0cyB1cCBhIEZpZWxkR3JvdXBDb25maWcgZm9yIGEgY3JlYXRlL25ldyBwb3AtdGFibGUtZGlhbG9nXG4gICAqIEBwYXJhbSBlbnRpdHlDb25maWdcbiAgICogQHBhcmFtIGdvVG9VcmxcbiAgICovXG4gIGRvQWN0aW9uKCBjb3JlOiBDb3JlQ29uZmlnLCBhY3Rpb25OYW1lOiBzdHJpbmcsIGV4dGVuc2lvbj86IEVudGl0eUV4dGVuZEludGVyZmFjZSApOiBQcm9taXNlPEZpZWxkSXRlbUdyb3VwQ29uZmlnPntcbiAgICByZXR1cm4gbmV3IFByb21pc2UoIGFzeW5jKCByZXNvbHZlICkgPT4ge1xuICAgICAgUG9wVGVtcGxhdGUuYnVmZmVyKCk7XG4gICAgICBpZiggSXNPYmplY3QoIGNvcmUucmVwby5tb2RlbC5hY3Rpb24sIFsgYWN0aW9uTmFtZSBdICkgJiYgSXNPYmplY3QoIGNvcmUucmVwby5tb2RlbC5hY3Rpb25bIGFjdGlvbk5hbWUgXSwgdHJ1ZSApICl7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gY29yZS5yZXBvLm1vZGVsLmFjdGlvblsgYWN0aW9uTmFtZSBdO1xuICAgICAgICBQb3BMb2cuaW5mbyggdGhpcy5uYW1lLCBgZG9BY3Rpb25gLCB7IGNvcmU6IGNvcmUsIGFjdGlvbk5hbWU6IGFjdGlvbk5hbWUsIGFjdGlvbjogYWN0aW9uLCBleHRlbnNpb246IGV4dGVuc2lvbiB9ICk7XG4gICAgICAgIGNvbnN0IGFjdGlvbkl0ZW1zID0gW107XG4gICAgICAgIGxldCBuZWVkc1Jlc291cmNlID0gZmFsc2U7XG4gICAgICAgIGxldCBtb2RlbDtcblxuICAgICAgICBjb25zdCBhY3Rpb25GaWVsZEl0ZW1zID0ge307XG5cbiAgICAgICAgLy8gc3RhcnQgd2l0aCBnZXR0aW5nIGZpZWxkcyBsYWJlbGVkIGZvciBuZXcgZG9BY3Rpb25cbiAgICAgICAgaWYoIElzT2JqZWN0KCBhY3Rpb24uZmllbGRzLCB0cnVlICkgKXtcbiAgICAgICAgICBPYmplY3Qua2V5cyggYWN0aW9uLmZpZWxkcyApLm1hcCggKCBuYW1lICkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZWxkID0gPEZpZWxkSW50ZXJmYWNlPnt9O1xuICAgICAgICAgICAgaWYoIG5hbWUgaW4gY29yZS5yZXBvLm1vZGVsLmZpZWxkICl7XG4gICAgICAgICAgICAgIGZpZWxkID0gPGFueT5jb3JlLnJlcG8ubW9kZWwuZmllbGRbIG5hbWUgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGVsID0ge307XG4gICAgICAgICAgICBpZiggZmllbGQud2hlbiApIG1vZGVsLndoZW4gPSBKc29uQ29weSggZmllbGQud2hlbiApO1xuXG4gICAgICAgICAgICBpZiggSXNPYmplY3QoIGZpZWxkLm1vZGVsLCB0cnVlICkgKXtcbiAgICAgICAgICAgICAgbW9kZWwgPSBPYmplY3QuYXNzaWduKCBtb2RlbCwgZmllbGQubW9kZWwgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBhY3Rpb25UcmFuc2Zvcm1hdGlvbjtcbiAgICAgICAgICAgIGlmKCBJc09iamVjdCggYWN0aW9uLmZpZWxkc1sgbmFtZSBdLCB0cnVlICkgKXtcbiAgICAgICAgICAgICAgYWN0aW9uVHJhbnNmb3JtYXRpb24gPSBJc1N0cmluZyggYWN0aW9uLmZpZWxkc1sgbmFtZSBdLnRyYW5zZm9ybWF0aW9uLCB0cnVlICkgPyBhY3Rpb24uZmllbGRzWyBuYW1lIF0udHJhbnNmb3JtYXRpb24gOiBudWxsO1xuICAgICAgICAgICAgICBtb2RlbCA9IE9iamVjdC5hc3NpZ24oIG1vZGVsLCBhY3Rpb24uZmllbGRzWyBuYW1lIF0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBtb2RlbC5tZXRhZGF0YTtcbiAgICAgICAgICAgIGRlbGV0ZSBtb2RlbC50cmFuc2Zvcm1hdGlvbjtcbiAgICAgICAgICAgIGlmKCBhY3Rpb25UcmFuc2Zvcm1hdGlvbiApIG1vZGVsLnRyYW5zZm9ybWF0aW9uID0gYWN0aW9uVHJhbnNmb3JtYXRpb247IC8vIG9ubHkgd2FudCB0byBhcHBseSB0cmFuc2Zvcm1hdGlvbiBpZiBpdCB3YXMgc2V0IGRpcmVjdGx5IG9uIGFjdGlvblxuXG4gICAgICAgICAgICBtb2RlbC52YWx1ZSA9IElzRGVmaW5lZCggbW9kZWwudmFsdWUgKSA/IFBhcnNlTW9kZWxWYWx1ZSggbW9kZWwudmFsdWUsIGNvcmUgKSA6IG51bGw7XG4gICAgICAgICAgICAvLyBtb2RlbC52YWx1ZSA9IElzRGVmaW5lZCggbW9kZWwudmFsdWUgKSA/IFBhcnNlTW9kZWxWYWx1ZShtb2RlbC52YWx1ZSwgY29yZSkgOiBudWxsO1xuICAgICAgICAgICAgaWYoICFtb2RlbC52YWx1ZSAmJiBJc09iamVjdCggbW9kZWwub3B0aW9ucywgWyAnZGVmYXVsdFZhbHVlJyBdICkgKXtcbiAgICAgICAgICAgICAgbW9kZWwudmFsdWUgPSBQYXJzZU1vZGVsVmFsdWUoIG1vZGVsLm9wdGlvbnMuZGVmYXVsdFZhbHVlLCBjb3JlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RlbC5oaWRkZW4gPSAhRXZhbHVhdGVXaGVuQ29uZGl0aW9ucyggY29yZSwgbW9kZWwud2hlbiwgY29yZSApO1xuXG4gICAgICAgICAgICBpZiggSXNPYmplY3QoIGV4dGVuc2lvbiwgdHJ1ZSApICYmIG1vZGVsLm5hbWUgaW4gZXh0ZW5zaW9uICl7XG4gICAgICAgICAgICAgIG1vZGVsLnZhbHVlID0gUGFyc2VNb2RlbFZhbHVlKCBleHRlbnNpb25bIG1vZGVsLm5hbWUgXSApO1xuICAgICAgICAgICAgICBtb2RlbC5yZWFkb25seSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vZGVsLnRhYk9uRW50ZXIgPSB0cnVlO1xuICAgICAgICAgICAgYWN0aW9uRmllbGRJdGVtc1sgbmFtZSBdID0gbW9kZWw7XG4gICAgICAgICAgICBpZiggbW9kZWwub3B0aW9ucyAmJiBtb2RlbC5vcHRpb25zLnJlc291cmNlICl7XG4gICAgICAgICAgICAgIG5lZWRzUmVzb3VyY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5lZWRzTWV0YWRhdGEgZ28gZ3JhYiBpdCBiZWZvcmUgeW91IHRyeSB0byBidWlsZCBvdXQgdGhlIGZpZWxkc1xuICAgICAgICBpZiggbmVlZHNSZXNvdXJjZSApe1xuICAgICAgICAgIGNvbnN0IHJlc291cmNlID0gYXdhaXQgY29yZS5yZXBvLmdldFVpUmVzb3VyY2UoIGNvcmUgKTtcbiAgICAgICAgICBpZiggSXNPYmplY3QoIHJlc291cmNlLCB0cnVlICkgKSBEZWVwTWVyZ2UoIGNvcmUucmVzb3VyY2UsIHJlc291cmNlICk7XG4gICAgICAgICAgUG9wTG9nLmluaXQoIHRoaXMubmFtZSwgYGRvQWN0aW9uOm5lZWRlZCByZXNvdXJjZWAsIHJlc291cmNlICk7XG4gICAgICAgICAgT2JqZWN0LmtleXMoIGFjdGlvbkZpZWxkSXRlbXMgKS5tYXAoICggbmFtZSApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbkl0ZW1Nb2RlbCA9IEZpZWxkSXRlbU1vZGVsKCBjb3JlLCBhY3Rpb25GaWVsZEl0ZW1zWyBuYW1lIF0sIGZhbHNlICk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25JdGVtID0gdGhpcy5zcnYuZmllbGQuYnVpbGRDb3JlRmllbGRJdGVtKCBjb3JlLCBhY3Rpb25JdGVtTW9kZWwgKTtcbiAgICAgICAgICAgIGlmKCBJc09iamVjdCggYWN0aW9uSXRlbS5jb25maWcsIHRydWUgKSApe1xuICAgICAgICAgICAgICBhY3Rpb25JdGVtLmNvbmZpZy5mYWNhZGUgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiggSXNPYmplY3QoIGFjdGlvbkl0ZW0uY29uZmlnLnBhdGNoICkgKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IDxGaWVsZEl0ZW1QYXRjaEludGVyZmFjZT5hY3Rpb25JdGVtLmNvbmZpZy5wYXRjaDtcbiAgICAgICAgICAgICAgICBwYXRjaC5kdXJhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgcGF0Y2gucGF0aCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcGF0Y2guZGlzcGxheUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3Rpb25JdGVtcy5wdXNoKCBhY3Rpb25JdGVtICk7XG4gICAgICAgICAgfSApO1xuXG4gICAgICAgICAgUG9wVGVtcGxhdGUuY2xlYXIoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnYWN0aW9uSXRlbXMnLCBhY3Rpb25JdGVtcyk7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoIHRoaXMuZ2V0QWN0aW9uRGlhbG9nQ29uZmlnKCBjb3JlLCBhY3Rpb24sIGFjdGlvbkl0ZW1zLCBjb3JlLnJlc291cmNlLCApICk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgLy8gbm8gbWV0YWRhdGEgd2FzIG5lZWRlZCBmb3IgYW55IG9mIHRoZXNlIGZpZWxkc1xuICAgICAgICAgIE9iamVjdC5rZXlzKCBhY3Rpb25GaWVsZEl0ZW1zICkubWFwKCAoIG5hbWUgKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25JdGVtTW9kZWwgPSBGaWVsZEl0ZW1Nb2RlbCggY29yZSwgYWN0aW9uRmllbGRJdGVtc1sgbmFtZSBdLCBmYWxzZSApO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uSXRlbSA9IHRoaXMuc3J2LmZpZWxkLmJ1aWxkQ29yZUZpZWxkSXRlbSggY29yZSwgYWN0aW9uSXRlbU1vZGVsICk7XG5cbiAgICAgICAgICAgIGlmKCBJc09iamVjdCggYWN0aW9uSXRlbS5jb25maWcsIHRydWUgKSApe1xuICAgICAgICAgICAgICBhY3Rpb25JdGVtLmNvbmZpZy5mYWNhZGUgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiggSXNPYmplY3QoIGFjdGlvbkl0ZW0uY29uZmlnLnBhdGNoICkgKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IDxGaWVsZEl0ZW1QYXRjaEludGVyZmFjZT5hY3Rpb25JdGVtLmNvbmZpZy5wYXRjaDtcbiAgICAgICAgICAgICAgICBwYXRjaC5kdXJhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgcGF0Y2gucGF0aCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcGF0Y2guZGlzcGxheUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3Rpb25JdGVtcy5wdXNoKCBhY3Rpb25JdGVtICk7XG4gICAgICAgICAgfSApO1xuICAgICAgICAgIFBvcFRlbXBsYXRlLmNsZWFyKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FjdGlvbkl0ZW1zJywgYWN0aW9uSXRlbXMpO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbkNvbmZpZyA9IHRoaXMuZ2V0QWN0aW9uRGlhbG9nQ29uZmlnKCBjb3JlLCBhY3Rpb24sIGFjdGlvbkl0ZW1zLCAoIElzT2JqZWN0KCBjb3JlLmVudGl0eSwgdHJ1ZSApID8gY29yZS5lbnRpdHkudWkgOiB7fSApIClcbiAgICAgICAgICBQb3BMb2cuaW5mbyggdGhpcy5uYW1lLCBgZG9BY3Rpb246IGNvbmZpZ2AsIGFjdGlvbkNvbmZpZyApO1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKCBhY3Rpb25Db25maWcgKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIFBvcFRlbXBsYXRlLmNsZWFyKCk7XG4gICAgICAgIFBvcFRlbXBsYXRlLmVycm9yKCB7IG1lc3NhZ2U6IGAke1RpdGxlQ2FzZSggYWN0aW9uTmFtZSApfSBub3QgY29uZmlndXJlZC5gLCBjb2RlOiA1MDAgfSApO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSggbnVsbCApO1xuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGhlbHBlciB0byBuZXdFbnRpdHlcbiAgICogQHBhcmFtIGVudGl0eUNvbmZpZ1xuICAgKiBAcGFyYW0gZmllbGRzXG4gICAqIEBwYXJhbSBtZXRhZGF0YVxuICAgKiBAcGFyYW0gZ29Ub1VybFxuICAgKi9cbiAgZ2V0QWN0aW9uRGlhbG9nQ29uZmlnKCBjb3JlOiBDb3JlQ29uZmlnLCBhY3Rpb246IEVudGl0eUFjdGlvbkludGVyZmFjZSwgYWN0aW9uRmllbGRJdGVtcywgbWV0YWRhdGEsIGV4dGVuc2lvbj86IEVudGl0eUV4dGVuZEludGVyZmFjZSApOiBGaWVsZEl0ZW1Hcm91cENvbmZpZ3tcbiAgICBpZiggIUlzT2JqZWN0KCBleHRlbnNpb24gKSApIGV4dGVuc2lvbiA9IHt9O1xuICAgIGFjdGlvbkZpZWxkSXRlbXMuc29ydCggRHluYW1pY1NvcnQoICdzb3J0JyApICk7XG4gICAgbGV0IGdvVG9VcmwgPSBJc1N0cmluZyggZXh0ZW5zaW9uLmdvVG9VcmwsIHRydWUgKSA/IGV4dGVuc2lvbi5nb1RvVXJsIDogKCBhY3Rpb24uZ29Ub1VybCA/IGFjdGlvbi5nb1RvVXJsIDogbnVsbCApO1xuICAgIGlmKCBnb1RvVXJsICkgZ29Ub1VybCA9IFBhcnNlTW9kZWxWYWx1ZSggZ29Ub1VybCwgY29yZSwgdHJ1ZSApO1xuXG4gICAgbGV0IHBvc3RVcmwgPSBJc1N0cmluZyggZXh0ZW5zaW9uLnBvc3RVcmwsIHRydWUgKSA/IGV4dGVuc2lvbi5wb3N0VXJsIDogKCBhY3Rpb24ucG9zdFVybCA/IFBhcnNlTGlua1VybCggU3RyaW5nKCBhY3Rpb24ucG9zdFVybCApLnNsaWNlKCksICggSXNPYmplY3QoIGNvcmUuZW50aXR5LCB0cnVlICkgPyBjb3JlLmVudGl0eSA6IHt9ICkgKSA6IGNvcmUucGFyYW1zLnBhdGggKTtcbiAgICBpZiggcG9zdFVybCApIHBvc3RVcmwgPSBQYXJzZU1vZGVsVmFsdWUoIHBvc3RVcmwsIGNvcmUsIHRydWUgKTtcblxuICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBGaWVsZEl0ZW1Hcm91cENvbmZpZygge1xuICAgICAgaWQ6IGFjdGlvbi5uYW1lLFxuICAgICAgcGFyYW1zOiBjb3JlLnBhcmFtcyxcbiAgICAgIGZpZWxkSXRlbXM6IGFjdGlvbkZpZWxkSXRlbXMsXG4gICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICBpbkRpYWxvZzogPEZpZWxkSXRlbUdyb3VwRGlhbG9nSW50ZXJmYWNlPntcbiAgICAgICAgcG9zdFVybDogcG9zdFVybCxcbiAgICAgICAgcG9zdFVybFZlcnNpb246IDEsXG4gICAgICAgIHN1Ym1pdDogVGl0bGVDYXNlKCBhY3Rpb24uc3VibWl0VGV4dCApLFxuICAgICAgICB0aXRsZTogYWN0aW9uLmhlYWRlciA/IGFjdGlvbi5oZWFkZXIgOiBgJHtUaXRsZUNhc2UoIGFjdGlvbi5uYW1lICl9ICR7IFNuYWtlVG9QYXNjYWwoIGNvcmUucmVwby5nZXREaXNwbGF5TmFtZSgpICkgfWAsXG4gICAgICAgIGdvVG9Vcmw6IGdvVG9VcmwsXG4gICAgICAgIGNhbGxiYWNrOiBJc0NhbGxhYmxlRnVuY3Rpb24oIGFjdGlvbi5jYWxsYmFjayApID8gYWN0aW9uLmNhbGxiYWNrIDogbnVsbFxuICAgICAgfVxuICAgIH0gKTtcblxuICAgIFBvcExvZy5pbml0KCB0aGlzLm5hbWUsIGBBY3Rpb25EaWFsb2dgLCBkaWFsb2dDb25maWcgKTtcblxuICAgIHJldHVybiBkaWFsb2dDb25maWc7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCl7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG5cbn1cblxuXG4iXX0=