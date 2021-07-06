import { FormControl } from '@angular/forms';
export class SelectConfig {
    constructor(params) {
        this.bubble = false;
        this.disabled = false;
        this.displayErrors = true;
        this.facade = false;
        this.helpText = '';
        this.height = 240;
        this.label = '';
        this.message = '';
        this.mode = 'select';
        this.minimal = false;
        this.name = 'name';
        this.noInitialValue = false;
        this.options = { values: [] };
        this.readonly = false;
        this.showTooltip = false;
        this.sort = false;
        this.tooltip = '';
        this.value = null;
        if (params)
            for (const i in params)
                this[i] = params[i];
        if (this.sort && this.options.values.length > 1) {
            if (typeof this.options.values[0].sort_order !== 'undefined') {
                this.options.values.sort((a, b) => {
                    if (a.sort_order < b.sort_order)
                        return -1;
                    if (a.sort_order > b.sort_order)
                        return 1;
                    return 0;
                });
            }
            else {
                this.options.values.sort((a, b) => {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                });
            }
        }
        if (this.options.empty)
            this.options.values.unshift({ value: this.options.empty.value, name: this.options.empty.name });
        if (!this.patch)
            this.patch = { field: '', duration: 750, path: '', disabled: false, businessId: 0 };
        if (!this.disabled)
            this.disabled = false;
        if (this.patch.displayIndicator !== false)
            this.patch.displayIndicator = true;
        if (this.noInitialValue)
            this.value = '';
        if (!this.control)
            this.setControl();
    }
    setControl() {
        this.control = (this.disabled
            ? new FormControl({ value: this.value, disabled: true })
            : new FormControl(this.value, (this.validators ? this.validators : [])));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWNvbmZpZy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BvcC1jb21tb24vc3JjL2xpYi9tb2R1bGVzL2Jhc2UvcG9wLWZpZWxkLWl0ZW0vcG9wLXNlbGVjdC9zZWxlY3QtY29uZmlnLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQXNDekQsTUFBTSxPQUFPLFlBQVk7SUFtQ3ZCLFlBQWEsTUFBOEI7UUFqQzNDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFHZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXJCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQsV0FBTSxHQUFJLEdBQUcsQ0FBQztRQUVkLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUVoQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixZQUFPLEdBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRzVDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUliLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFYixVQUFLLEdBQXVDLElBQUksQ0FBQztRQUkvQyxJQUFJLE1BQU07WUFBRyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU07Z0JBQUcsSUFBSSxDQUFFLENBQUMsQ0FBRSxHQUFHLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUMsVUFBVSxLQUFLLFdBQVcsRUFBRTtnQkFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFFO29CQUNuQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVU7d0JBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVO3dCQUFHLE9BQU8sQ0FBQyxDQUFDO29CQUMzQyxPQUFPLENBQUMsQ0FBQztnQkFDWCxDQUFDLENBQUUsQ0FBQzthQUNMO2lCQUFJO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJO3dCQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSTt3QkFBRyxPQUFPLENBQUMsQ0FBQztvQkFDL0IsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxDQUFFLENBQUM7YUFDTDtTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO1FBRTNILElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN0RyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssS0FBSztZQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQy9FLElBQUksSUFBSSxDQUFDLGNBQWM7WUFBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUdELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUUsSUFBSSxDQUFDLFFBQVE7WUFDMUIsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFFO1lBQzFELENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUUsQ0FDOUUsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRJdGVtT3B0aW9uLCBGaWVsZEl0ZW1PcHRpb25zLCBGaWVsZEl0ZW1QYXRjaEludGVyZmFjZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BvcC1jb21tb24ubW9kZWwnO1xuaW1wb3J0IHsgU2V0Q29udHJvbCB9IGZyb20gJy4uLy4uLy4uLy4uL3BvcC1jb21tb24tZG9tLm1vZGVscyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RDb25maWdJbnRlcmZhY2Uge1xuICBhdXRvRmlsbD86IGJvb2xlYW47XG4gIGJ1YmJsZT86IGJvb2xlYW47ICAgICAgICAgICAgICAgLy8gZmlyZSBldmVudHNcbiAgY29udHJvbD86IEZvcm1Db250cm9sOyAgICAgICAgICAvLyBUaGUgZm9ybSBjb250cm9sLiBJZiBub3QgcGFzc2VkIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXG4gIGRpc2FibGVkPzogYm9vbGVhbjsgICAgICAgICAgICAgLy8gTWFyayBhcyByZWFkb25seS5cbiAgZGlzcGxheUVycm9ycz86IGJvb2xlYW47ICAgICAgICAvLyBJZiBFcnJvciBtZXNzYWdlcyBzaG91bGQgYmUgZGlzcGxheWVkLlxuICBlbXB0eU9wdGlvbj86IEZpZWxkSXRlbU9wdGlvbjsgICAgICAvLyBTZXRzIGFuIGVtcHR5IG9yIGEgbnVsbCBvcHRpb24gdmFsdWUgYXMgdGhlIGZpcnN0IG9wdGlvblxuICBlbXB0eT86ICdDb252ZXJ0RW1wdHlUb051bGwnIHwgJ0NvbnZlcnRFbXB0eVRvWmVybyc7XG4gIGZhY2FkZT86IGJvb2xlYW47ICAgICAgICAgICAgICAgLy8gU2V0cyBhIGZsYWcgdGhhdCBzYXlzIHRoaXMgZmllbGRJdGVtcyByZWFsbHkgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGJhY2tlbmQsIGFuZCBqdXN0IHByZXRlbmQgdG8gaGl0IHRoZSBhcGlcbiAgaGVscFRleHQ/OiBzdHJpbmc7ICAgICAgICAgICAvLyBPbiBob3ZlciBoZWxwZXIgdGV4dC5cbiAgaGVpZ2h0PzogbnVtYmVyO1xuICBoaWRkZW4/OiBib29sZWFuOyAgICAgICAgICAgICAgICAvLyBIaWRlIGEgZmllbGQgYnkgc2V0dGluZyB0byB0cnVlO1xuICBpZD86IG51bWJlciB8IHN0cmluZzsgICAgICAgICAgIC8vIEEgbnVtYmVyIHRoYXQgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgZXZlbnRzIHNvIHlvdSBrbm93IHdoaWNoIGZpZWxkIGl0IGNhbWUgZnJvbS5cbiAgbGFiZWw/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAvLyBJbnB1dCBsYWJlbC5cbiAgbWV0YWRhdGE/OiBvYmplY3Q7ICAgICAgICAgICAgICAvLyBBcnJheSBvZiBvYmplY3RzLiBUbyBiZSBwYXNzZWQgYmFjayBvbiB0aGUgZXZlbnQgZW1pdHRlciBhbmQgaW5jbHVkZWQgaW4gYSBwYXRjaCBpZiBkZXNpcmVkLlxuICBtb2RlPzogJ3NlbGVjdCcgfCAnbGFiZWwnO1xuICBtaW5pbWFsPzogYm9vbGVhbjsgICAgICAgICAgICAgIC8vIEFsbG93cyB0aGUgaW5wdXQgdG8gZml0IGluIGEgdGlnaHRlciBzcGFjZSwgcmVtb3ZlcyBpbmRpY2F0b3JzIGFuZCBwYWRkaW5nXG4gIG5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAvLyAgbmFtZSBvZiBjb2x1bW5cbiAgbm9Jbml0aWFsVmFsdWU/OiBib29sZWFuOyAgICAgICAgLy8gU2V0IHRvIHRydWUgdG8gYWx3YXlzIGhhdmUgYW4gZW1wdHkgdmFsdWUgb24gbG9hZFxuICBvcHRpb25zPzogRmllbGRJdGVtT3B0aW9uczsgICAgICAgIC8vIEFycmF5IG9mIEZpZWxkT3B0aW9uc1xuICBwYXRjaD86IEZpZWxkSXRlbVBhdGNoSW50ZXJmYWNlOyAgICAgICAgIC8vIElmIGZpZWxkIHNob3VsZCBiZSBhdXRvLXBhdGNoZWQuXG4gIHJvdXRlPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgLy8gYSByb3V0ZXIgdXJsIHBhdGhcbiAgcmVhZG9ubHk/OiBib29sZWFuO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIHNlc3Npb24/OiBib29sZWFuOyAgICAgICAgICAgICAgICAvLyBJZiBmaWVsZCB2YWx1ZSBjaGFuZ2Ugc2hvdWxkIGJlIHN0b3JlZCB0byBjb3JlIGVudGl0eVxuICBzZXNzaW9uUGF0aD86IHN0cmluZzsgICAgICAgICAgICAgICAgLy8gSWYgc2Vzc2lvbiBwYXRoIGlmIG5vdCBzdG9yZWQgb24gcm9vdCBlbnRpdHlcbiAgc29ydD86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAvLyAgU2V0IHRvIHRydWUgaWYgeW91IHdhbnQgb3B0aW9ucyB0byBiZSBzb3J0ZWQgaW4gcHJpb3JpdHkgb2Ygc29ydF9vcmRlciwgbmFtZVxuICB0b29sdGlwPzogc3RyaW5nOyAgICAgICAgICAgICAgIC8vIFRvb2x0aXAgZm9yIGluZm9ybWF0aW9uIHRvIHNob3cgd2hlbiBpbnB1dCBpcyBmb2N1c2VkXG4gIHZhbGlkYXRvcnM/OiBBcnJheTxWYWxpZGF0b3JzPjsgLy8gQXJyYXkgb2YgVmFsaWRhdG9ycy5cbiAgdmFsdWU/OiBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyOyAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZS5cbn1cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29uZmlnIGltcGxlbWVudHMgU2V0Q29udHJvbCB7XG4gIGF1dG9GaWxsPzogYm9vbGVhbjtcbiAgYnViYmxlID0gZmFsc2U7XG4gIGNsZWFyTWVzc2FnZTtcbiAgY29udHJvbDogRm9ybUNvbnRyb2w7XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIGRpc3BsYXlFcnJvcnMgPSB0cnVlO1xuICBlbXB0eTtcbiAgZmFjYWRlID0gZmFsc2U7XG4gIGhlbHBUZXh0ID0gJyc7XG4gIGhpZGRlbjogZmFsc2U7XG4gIGhlaWdodD8gPSAyNDA7XG4gIGlkO1xuICBsYWJlbCA9ICcnO1xuICBtZXNzYWdlID0gJyc7XG4gIG1vZGUgPSAnc2VsZWN0JztcbiAgbWV0YWRhdGE7XG4gIG1pbmltYWwgPSBmYWxzZTtcbiAgbmFtZSA9ICduYW1lJztcbiAgbm9Jbml0aWFsVmFsdWUgPSBmYWxzZTtcbiAgb3B0aW9ucz86IEZpZWxkSXRlbU9wdGlvbnMgPSB7IHZhbHVlczogW10gfTtcbiAgcGF0Y2g6IEZpZWxkSXRlbVBhdGNoSW50ZXJmYWNlO1xuICByb3V0ZTtcbiAgcmVhZG9ubHkgPSBmYWxzZTtcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBzaG93VG9vbHRpcCA9IGZhbHNlO1xuICBzb3J0ID0gZmFsc2U7XG4gIHNlc3Npb24/OiBib29sZWFuO1xuICBzZXNzaW9uUGF0aD86IHN0cmluZztcbiAgdHJpZ2dlck9uQ2hhbmdlO1xuICB0b29sdGlwID0gJyc7XG4gIHZhbGlkYXRvcnM7XG4gIHZhbHVlPzogYm9vbGVhbiB8IHN0cmluZyB8IG51bWJlciB8IGFueVtdID0gbnVsbDtcblxuXG4gIGNvbnN0cnVjdG9yKCBwYXJhbXM/OiBTZWxlY3RDb25maWdJbnRlcmZhY2UgKXtcbiAgICBpZiggcGFyYW1zICkgZm9yKCBjb25zdCBpIGluIHBhcmFtcyApIHRoaXNbIGkgXSA9IHBhcmFtc1sgaSBdO1xuICAgIGlmKCB0aGlzLnNvcnQgJiYgdGhpcy5vcHRpb25zLnZhbHVlcy5sZW5ndGggPiAxICl7XG4gICAgICBpZiggdHlwZW9mIHRoaXMub3B0aW9ucy52YWx1ZXNbIDAgXS5zb3J0X29yZGVyICE9PSAndW5kZWZpbmVkJyApe1xuICAgICAgICB0aGlzLm9wdGlvbnMudmFsdWVzLnNvcnQoICggYSwgYiApID0+IHtcbiAgICAgICAgICBpZiggYS5zb3J0X29yZGVyIDwgYi5zb3J0X29yZGVyICkgcmV0dXJuIC0xO1xuICAgICAgICAgIGlmKCBhLnNvcnRfb3JkZXIgPiBiLnNvcnRfb3JkZXIgKSByZXR1cm4gMTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMub3B0aW9ucy52YWx1ZXMuc29ydCggKCBhLCBiICkgPT4ge1xuICAgICAgICAgIGlmKCBhLm5hbWUgPCBiLm5hbWUgKSByZXR1cm4gLTE7XG4gICAgICAgICAgaWYoIGEubmFtZSA+IGIubmFtZSApIHJldHVybiAxO1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9ICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCB0aGlzLm9wdGlvbnMuZW1wdHkgKSB0aGlzLm9wdGlvbnMudmFsdWVzLnVuc2hpZnQoIHsgdmFsdWU6IHRoaXMub3B0aW9ucy5lbXB0eS52YWx1ZSwgbmFtZTogdGhpcy5vcHRpb25zLmVtcHR5Lm5hbWUgfSApO1xuXG4gICAgaWYoICF0aGlzLnBhdGNoICkgdGhpcy5wYXRjaCA9IHsgZmllbGQ6ICcnLCBkdXJhdGlvbjogNzUwLCBwYXRoOiAnJywgZGlzYWJsZWQ6IGZhbHNlLCBidXNpbmVzc0lkOiAwIH07XG4gICAgaWYoICF0aGlzLmRpc2FibGVkICkgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGlmKCB0aGlzLnBhdGNoLmRpc3BsYXlJbmRpY2F0b3IgIT09IGZhbHNlICkgdGhpcy5wYXRjaC5kaXNwbGF5SW5kaWNhdG9yID0gdHJ1ZTtcbiAgICBpZiggdGhpcy5ub0luaXRpYWxWYWx1ZSApIHRoaXMudmFsdWUgPSAnJztcbiAgICBpZiggIXRoaXMuY29udHJvbCApIHRoaXMuc2V0Q29udHJvbCgpO1xuICB9XG5cblxuICBzZXRDb250cm9sKCl7XG4gICAgdGhpcy5jb250cm9sID0gKCB0aGlzLmRpc2FibGVkXG4gICAgICAgID8gbmV3IEZvcm1Db250cm9sKCB7IHZhbHVlOiB0aGlzLnZhbHVlLCBkaXNhYmxlZDogdHJ1ZSB9IClcbiAgICAgICAgOiBuZXcgRm9ybUNvbnRyb2woIHRoaXMudmFsdWUsICggdGhpcy52YWxpZGF0b3JzID8gdGhpcy52YWxpZGF0b3JzIDogW10gKSApXG4gICAgKTtcbiAgfVxufVxuIl19